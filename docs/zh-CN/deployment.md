# 部署指南

Pelagic 会在 `dist/` 生成完全静态的网站。只要平台能够在构建时运行 Node.js、并托管静态文件，就可以部署。

[English](../deployment.md)

## 部署变量

| 变量 | 示例 | 含义 |
| --- | --- | --- |
| `SITE_URL` | `https://blog.example.com` | 只填写公开域名源，不要包含路径。 |
| `BASE_PATH` | `/notes` | 公开子目录；根路径部署填写 `/`。 |

这些值会影响 canonical、订阅源、站点地图、字体、图标、站内链接和 Giscus 主题地址。它们是公开的构建配置，不是 Secret。

## GitHub Pages

内置的 `.github/workflows/deploy.yml` 使用 Astro 与 GitHub Pages 官方 Action，每次推送到 `main` 都会部署。

1. 创建 GitHub 仓库，将 Pelagic 推送到 `main`。
2. 打开 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **GitHub Actions**。
4. 推送新提交，或在 Actions 页面手动运行 **Deploy to GitHub Pages**。

### 标准 GitHub 地址

以下两种情况无需设置仓库变量：

| 仓库 | 最终地址 | 自动推导的 base |
| --- | --- | --- |
| `alice/alice.github.io` | `https://alice.github.io/` | `/` |
| `alice/my-blog` | `https://alice.github.io/my-blog/` | `/my-blog` |

GitHub Actions 构建时，Pelagic 会从 `GITHUB_REPOSITORY` 自动区分用户站点与项目站点。

### 自定义域名

以 `https://blog.example.com/` 为例：

1. 打开 **Settings → Secrets and variables → Actions → Variables**。
2. 新建 `SITE_URL`，值为 `https://blog.example.com`。
3. 可选地新建 `BASE_PATH`，值为 `/`；显式设置 `SITE_URL` 时根路径已是默认值。
4. 新建 `public/CNAME`，内容只能是一行 `blog.example.com`。
5. 在 **Settings → Pages** 配置域名和 DNS。

根域名同理，CNAME 文件只填写 `example.com`。DNS 记录和 HTTPS 应以 GitHub 当前页面给出的步骤为准，不要照抄过时的 IP 地址。

### 自定义域名下的子路径

如果托管平台将站点放在子目录，两个变量都要设置：

```text
SITE_URL=https://example.com
BASE_PATH=/notes
```

不要写成 `SITE_URL=https://example.com/notes`；路径只属于 `BASE_PATH`，Pelagic 会拒绝含路径的 `SITE_URL`。

## 其他静态托管平台

通用构建设置：

```text
安装命令：pnpm install --frozen-lockfile
构建命令：pnpm build
输出目录：dist
Node.js：22 或更高版本
```

将 `SITE_URL` 设为最终生产域名；除非站点明确挂在子目录下，否则 `BASE_PATH` 使用 `/`。Cloudflare Pages、Netlify 和 Vercel 等平台都可在项目构建设置中添加这些变量。

## 本地生产构建

根路径部署：

```bash
SITE_URL=https://blog.example.com BASE_PATH=/ pnpm build
pnpm preview
```

子路径部署：

```bash
SITE_URL=https://example.com BASE_PATH=/my-blog pnpm build
pnpm preview
```

`pnpm build` 会检查生成链接和资源。`pnpm verify` 还会运行代码检查与响应式浏览器测试；`pnpm verify:release` 会额外模拟一次 GitHub 项目站点构建，并检查所有子路径链接。

## 上线前检查

- 替换 `Your Name`、示例描述和页脚链接。
- 检查生成 HTML 中的 canonical 地址。
- 打开 RSS、Atom、sitemap、`robots.txt`、Open Graph 图片和两种语言。
- 在嵌套文章 URL 上直接刷新，确认不会 404。
- 如启用了 Giscus，确认生产域名上的仓库 ID 与自定义主题地址。
- DNS 生效后在托管平台启用 HTTPS。
