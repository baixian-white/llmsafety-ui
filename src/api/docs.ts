// src/api/docs.ts
import axios, { AxiosError } from "axios"

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000"

const http = axios.create({
  baseURL: API_BASE,
  // 若你没有用 cookie/凭证就别带 withCredentials，避免 CORS 跨域踩坑
  withCredentials: false,
})

export interface DocListItem {
  id: number
  slug: string
  title: string
  excerpt: string
  tags: string[]
  version: number
  created_at: string
  updated_at: string
  summary: string;  
  cover_url: string
}




/** ---- 数据类型，与后端 DocOut/更新返回 对齐 ---- */
export interface DocOut {
  id: number
  slug: string
  title: string
  content: string
  tags: string[]
  version: number
  created_at: string
  updated_at: string
  summary: string;  
  cover_url: string
}
export interface UpdateResp { ok: boolean; version: number }

// 工具
function toForm(data: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams()
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.append(k, String(v))
  })
  return sp
}

/** ---- 获取文档（详情）---- */
export async function getDoc(idOrSlug: string): Promise<DocOut> {
  const { data } = await http.get(`/api/docs/${encodeURIComponent(idOrSlug)}`)
  return data
}

/** ---- 创建文档（表单：x-www-form-urlencoded）---- */
// 创建
export async function createDoc(
  title: string,
  content: string,
  tagsArr: string[] = [],
  summary = "",
  cover_url = ""                       // ← 新增
): Promise<DocOut> {
  const tags = tagsArr.join(",")
  const form = toForm({ title, summary, cover_url, content, tags })
  const { data } = await http.post(`/api/docs`, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  return data as DocOut
}

/** ---- 更新文档（表单：x-www-form-urlencoded）---- */
export async function updateDoc(
  key: string,
  title?: string,
  content?: string,
  version?: number,
  tagsArr?: string[],
  summary?: string,
  cover_url?: string                   // ← 新增
): Promise<{ ok: boolean; version: number }> {
  const tags = tagsArr ? tagsArr.join(",") : undefined
  const form = toForm({ title, summary, cover_url, content, version, tags })
  const { data } = await http.put(`/api/docs/${encodeURIComponent(key)}`, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  return data as { ok: boolean; version: number }
}

export async function uploadCover(
  key: string,
  file: File
): Promise<{ ok: boolean; cover_url: string; version: number }> {
  const fd = new FormData()
  fd.append("file", file)
  try {
    const { data } = await http.post(`/api/docs/${encodeURIComponent(key)}/cover`, fd)
    return data as { ok: boolean; cover_url: string; version: number }
  } catch (e) {
    handleAxiosError(e)
  }
}

/** ---- 上传资源（multipart/form-data）---- */
export async function uploadAsset(key: string, file: File): Promise<{ url: string }> {
  const fd = new FormData()
  fd.append("file", file)
  try {
    const { data } = await http.post(`/api/docs/${encodeURIComponent(key)}/assets`, fd)
    return data as { url: string }
  } catch (e) {
    handleAxiosError(e)
  }
}

export async function fetchDocs(
  q?: string,
  limit: number = 10,
  offset: number = 0
): Promise<DocListItem[]> {
  const params: Record<string, any> = { limit, offset }
  if (q !== undefined) params.q = q
  try {
    const { data } = await http.get("/api/docs", { params })
    return data as DocListItem[]
  } catch (e) {
    const err = e as AxiosError
    if (err.response) throw new Error(`${err.response.status} ${JSON.stringify(err.response.data)}`)
    throw new Error(String(err))
  }
}

/** ---- 列表（可选，用得到再加）---- */
// export async function listDocs(params?: { q?: string; limit?: number; offset?: number }) {
//   const { data } = await http.get(`/api/docs`, { params })
//   return data as Array<{
//     id: number; slug: string; title: string; excerpt: string;
//     tags: string[]; version: number; created_at: string; updated_at: string
//   }>
// }

/** ---- 统一错误处理 ---- */
function handleAxiosError(e: unknown): never {
  const err = e as AxiosError
  // 让调用方能依据 409/422 等做 UI 反馈（你的 Editor.vue 已经做了）
  if (err.response) {
    const status = err.response.status
    const body = err.response.data
    throw new Error(`${status} ${JSON.stringify(body)}`)
  }
  throw new Error(String(err))
}
