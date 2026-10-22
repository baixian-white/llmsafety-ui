# 腾讯云 Docker 部署记录

核验日期：2026-10-21（Asia/Shanghai）。

## 当前部署

- 服务器：腾讯云北京 CVM，`49.232.37.167`，SSH 别名 `tencent-49`。
- 网站首页：`http://49.232.37.167:18020/`。
- 虚拟仿真实验：`http://49.232.37.167:18020/experiment`。
- Git 分支：`feat/virtual-experiment`。
- 基础提交：`53c64645fb64ce082d4e10a1bd70010d94472f76`。
- 本次包含该分支当前工作区未提交的三阶段实验改动，完整源码快照已归档；不能仅凭基础提交复现本次发布。
- 发布编号：`20261021-53c6464-worktree-01`。
- 发布目录：`/opt/llmsafety-ui/releases/20261021-53c6464-worktree-01`。
- Docker Compose 项目、容器名称均为 `llmsafety-ui`。
- 镜像：`llmsafety-ui:20261021-53c6464-worktree-01`。
- 实际镜像 ID：`sha256:4f12b20485cad108f155669933d1049341924d1d4797ebdd7421613c21a8bfdb`。

访问链路：公网 TCP 18020 → 宿主机 Nginx → `127.0.0.1:18200` → Docker 容器 8080。

宿主机配置为 `/etc/nginx/conf.d/llmsafety-ui.conf`，对应仓库文件 `deploy/tencent-nginx.conf`。
容器使用 `deploy/nginx.conf`，支持 Vue 路由直接访问和刷新，案例数据由镜像内静态文件提供。
本项目无服务端数据库或上传目录，实验进度保存在访问者浏览器的 localStorage 中。不同服务器/端口属于不同来源，浏览器实验进度不会自动迁移。

## 发布输入与校验

本地快照目录：`G:\CODE2\大模型安全\tmp\tencent-deploy-20261021-01`。
发布目录中保存以下文件：

| 文件 | SHA-256 / 用途 |
| --- | --- |
| `source.tar.gz` | `9357c45a35e06158879e5939c63476f8d7f7948bd732b25b3c348bd86c922307`；构建前的完整项目快照，不含 node_modules、Git 元数据和本地密钥 |
| `runtime.tar.gz` | `80e8759062697fb40fddfe5a0375eaf3aadb01c59a4686761438c97a51bfee91`；已构建的 index 与容器配置 |
| `release.env` | 指定本次镜像、`127.0.0.1` 绑定地址和内部映射端口 18200，无凭据 |
| `tencent-nginx.conf` | 最终宿主机入口配置；在首次源码归档后单独添加 |
| `release-manifest.json` | 发布来源、网络入口和验证结果 |

构建使用 Node.js 22.17.1、npm 10.9.2 和项目现有锁定依赖。Vite 产物目录为 `index`。
Nginx 基础镜像通过摘要固定：
`nginx@sha256:970364228b1e4f932abc22d321932816782cca8a20b85a77552a7cfe9acfb3b5`。
Docker 构建仅复制前端产物；镜像内没有源码、凭据或构建工具。
容器以 nginx 用户运行，根文件系统只读，限制 128 MiB 内存、0.5 CPU，并配置健康检查和自动重启。

## 本次验证

- `npm run typecheck`、`npm test`、`npm run build` 均通过；5 个测试文件、43 项测试通过。
- 新镜像先在独立临时容器验证 Nginx 语法、健康接口和深层路由，验证后删除临时容器。
- 公网首页、`/healthz`、`/experiment`、`/experiment/run`、越狱与幻觉案例 JSON 均为 HTTP 200。
- 从本机和另一台云服务器验证公网健康接口成功。
- 真实浏览器在公网入口完成越狱测试、幻觉测试、防御开关、同案例复测、证据保存与评分；阶段得分 30 / 30 / 40，报告总分 100。
- 生成实验报告后刷新页面，三个阶段记录与分数保留；浏览器控制台错误数为 0。
- 原有“人工智能安全测试平台”页面正常加载。
- 验收截图：`output/playwright/tencent-release-report.png`。
- 最终容器状态 `running / healthy`，`RestartCount=0`、`OOMKilled=false`。

## 常用运维命令

以下命令在服务器上执行：

```bash
sudo docker compose --env-file /opt/llmsafety-ui/releases/20261021-53c6464-worktree-01/release.env -f /opt/llmsafety-ui/releases/20261021-53c6464-worktree-01/deploy/compose.yaml ps
sudo docker logs --tail 50 llmsafety-ui
curl --fail http://127.0.0.1:18020/healthz
```

重新部署时，创建新的发布目录与版本标签，保留当前发布件作为回退版本；先完成类型检查、测试、构建和校验，再更新该项目的 Compose 配置。只操作 `llmsafety-ui` 服务。
宿主机 Nginx 配置改变时，先执行 `sudo nginx -t`，通过后执行 `sudo systemctl reload nginx`。

## 网络记录与同机服务

最初尝试 Docker 直接发布公网 18200，但外部请求超时。该服务器部署文档另有 Docker 公网转发与透明代理回包冲突的记录，因此最终采用宿主机 Nginx 终止公网连接、转发到 Docker 回环端口的结构。
18020 此前已停止监听；本次作为独立网站入口重新使用。用户于 2026-10-21 在腾讯云控制台放行入站 TCP 18020，随后公网验证通过。
Docker 18200 仅绑定回环地址，无需对公网放行。

同机 Open edX 的 18000、18010、18120 入口、容器和数据，以及 social-growth 原有 80 端口站点均保留。本次未改动原阿里云服务器上的旧站。
