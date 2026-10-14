// src/lib/articles.ts
// ---------------------------------------------------------
// 功能：
// 1) 读取 /public/articles/articles_manifest.json（分类、相对路径等元信息）
// 2) 拉取指定 Markdown，并把其中的**相对图片路径**重写为可直接访问的
//    绝对 URL（/articles/.../_md_files/...），确保前端渲染图片正常
// 3) 提供常用工具函数：按分类过滤、生成详情页路由参数、解码参数等
//
// 兼容字段：我为你生成的 manifest 包含：
// {
//   "version": 1,
//   "base_public_path": "/articles",
//   "count": 18,
//   "categories": ["分析", "工具"],
//   "articles": [{
//      "category": "工具",
//      "article_folder": "工具/某篇文章",          // 文章所在目录（相对 /articles）
//      "file_path": "工具/某篇文章/文件名.md",     // md 相对路径（相对 /articles）
//      "file_name": "文件名.md",
//      "title": "标题",
//      "images": 2,
//      "words": 1530,
//      "headings": 12,
//      "estimate_minutes": 5,
//      "assets_dir": "工具/某篇文章/文件名_md_files" // 如果存在
//   }, ...]
// }
// ---------------------------------------------------------

export interface ArticleMeta {
  category?: string;        // 例如：'分析' | '工具'
  article_folder?: string;  // 文章所在目录，相对 /articles
  file_path: string;        // md 文件相对路径（相对 /articles）
  file_name: string;        // md 文件名
  title: string;            // 从首个 # 标题解析来的标题
  images: number;
  words: number;
  headings: number;
  estimate_minutes: number;
  assets_dir?: string;      // 与该 md 同名的 _md_files 目录（若存在）
}

export interface ArticlesManifest {
  version?: number;
  base_public_path?: string;  // 默认 '/articles'
  count?: number;
  categories?: string[];
  articles: ArticleMeta[];
}

/** 站点下文章资源的公共前缀（与 public/articles 对应） */
export const ARTICLES_BASE = '/articles';

/** URL 安全编码/解码：用于在路由 params 中携带文件相对路径 */
export function encodePath(p: string) {
  return encodeURIComponent(p);
}
export function decodePath(s: string) {
  return decodeURIComponent(s);
}

/** 统一的 fetch 包装：带错误信息 */
async function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Fetch ${typeof input === 'string' ? input : input.toString()} failed: ${res.status} ${res.statusText} ${txt || ''}`);
  }
  return res;
}

/** 读取 manifest：默认从 /articles/articles_manifest.json */
export async function fetchManifest(): Promise<ArticlesManifest> {
  // 防止缓存：给 query 带时间戳
  const url = `${ARTICLES_BASE}/articles_manifest.json?_=${Date.now()}`;
  const res = await safeFetch(url, { cache: 'no-cache' });
  const data = (await res.json()) as ArticlesManifest;
  // 兜底：确保必要字段存在
  if (!data || !Array.isArray(data.articles)) {
    return { articles: [] };
  }
  return data;
}

/** 按分类取文章列表（例：'工具' 或 '分析'） */
export function filterByCategory(list: ArticleMeta[], category: string) {
  return list.filter(a => (a.category || '') === category);
}

/** 构建某篇 md 的**公开访问 URL**（基于 /public/articles） */
export function buildArticleUrl(filePath: string) {
  // 处理可能的 windows 反斜杠
  const normalized = filePath.replace(/\\/g, '/').replace(/^\/+/, '');
  return `${ARTICLES_BASE}/${normalized}`;
}

/** 构建某篇 md 内**资源文件**（图片等）的公开 URL */
export function buildAssetUrl(articleDir: string, relPath: string) {
  // articleDir: 相对 /articles 的目录（不含文件名）
  const aDir = articleDir.replace(/\\/g, '/').replace(/^\/+/, '');
  const rel = relPath.replace(/\\/g, '/');
  const full = normalizePath(aDir, rel);
  return `${ARTICLES_BASE}/${full}`;
}

/**
 * 读取 Markdown 并**重写图片相对路径**为可直接访问的绝对 URL。
 * - 仅重写相对路径（不以 http(s): / data: / / 开头）
 * - 既处理 ![alt](path) 也处理 <img src="path"> 形式
 * 返回：
 *  - markdown: 重写后的文本
 *  - publicDir: 此 md 所在目录的公开前缀（/articles/子目录…），可用于调试
 */
export async function fetchMarkdownWithPatchedImages(
  filePath: string
): Promise<{ markdown: string; publicDir: string }> {
  const articleUrl = buildArticleUrl(filePath);
  const res = await safeFetch(`${articleUrl}?_=${Date.now()}`, { cache: 'no-cache' });
  const raw = await res.text();

  // 计算 md 所在目录（相对 /articles）
  const articleDir = dirnamePosix(filePath); // 可能为 ""（位于根）
  const publicDir = articleDir ? `${ARTICLES_BASE}/${articleDir}` : ARTICLES_BASE;

  // 1) Markdown 图片语法：![...](path)
  let patched = raw.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|data:|\/)([^)]+)\)/g, // 只处理“相对路径”
    (_m, alt, relPath) => {
      const absUrl = buildAssetUrl(articleDir, relPath);
      return `![${alt}](${absUrl})`;
    }
  );

  // 2) HTML img 标签：<img src="path">
  patched = patched.replace(
    /<img\s+([^>]*?)src=["'](?!https?:\/\/|data:|\/)([^"']+)["']([^>]*?)>/gi,
    (_m, pre, relPath, post) => {
      const absUrl = buildAssetUrl(articleDir, relPath);
      return `<img ${pre}src="${absUrl}"${post}>`;
    }
  );

  return { markdown: patched, publicDir };
}

/** 便捷方法：返回“工具”分类的清单（若 manifest 未加载，可配合 fetchManifest 使用） */
export function getToolArticles(manifest: ArticlesManifest) {
  return filterByCategory(manifest.articles || [], '工具');
}

/** 便捷方法：返回“分析”分类的清单 */
export function getAnalysisArticles(manifest: ArticlesManifest) {
  return filterByCategory(manifest.articles || [], '分析');
}

/* ======================= 辅助：路径处理 ======================= */

/** posix 风格的 dirname（'a/b/c.md' -> 'a/b'；'a.md' -> ''） */
function dirnamePosix(p: string) {
  const norm = p.replace(/\\/g, '/').replace(/^\/+/, '');
  const i = norm.lastIndexOf('/');
  return i === -1 ? '' : norm.slice(0, i);
}

/** 规范化相对路径：把 "当前目录 + 相对段" 解析成 去掉 ./ 与处理 ../ 的路径 */
function normalizePath(currentDir: string, rel: string) {
  const base = currentDir ? currentDir.split('/').filter(Boolean) : [];
  const segs = rel.split('/');

  const stack: string[] = [...base];
  for (const s of segs) {
    if (!s || s === '.') continue;
    if (s === '..') {
      if (stack.length) stack.pop();
      continue;
    }
    stack.push(s);
  }
  return stack.join('/');
}
