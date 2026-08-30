# 测试与发布验证

Pelagic 将生成结果和响应式布局视为公开接口的一部分，因此仓库同时检查源码、内容、文档、构建产物和浏览器布局。

[English](../testing.md)

## 命令

| 命令 | 检查内容 |
| --- | --- |
| `pnpm check` | Astro 组件、内容集合和 TypeScript。 |
| `pnpm lint` | TypeScript、Astro、脚本、测试和 Markdown 代码围栏。 |
| `pnpm validate:config` | 本地、GitHub 用户站点、项目站点、自定义域名和子路径的部署推导。 |
| `pnpm validate:content` | 必填 front matter、唯一地址、译文分组与已提交的路由清单。 |
| `pnpm validate:docs` | 根目录和 `docs/` Markdown 中的相对链接与图片。 |
| `pnpm build` | 内容、Astro、静态构建、图片占位与生成站点检查。 |
| `pnpm test:layout` | 390、1280、1440、1920 像素下的 Playwright 布局测试。 |
| `pnpm test:deployment` | 在 `/pelagic-project/` 下完成一次 GitHub 项目站点构建。 |
| `pnpm verify` | 日常开发与 Pull Request 的完整检查。 |
| `pnpm verify:release` | 包含项目子路径构建的发布级检查。 |

## 生成站点检查

Astro 写入 `dist/` 后，`validate-build.ts` 会检查：

- 所有指向本站的 HTML `href` 和 `src`；
- canonical 域名和页面片段锚点；
- 图片替代文字；
- 草稿页面和草稿 Open Graph 图片未被输出；
- `robots.txt` 中的 sitemap 地址；
- 根路径与配置后的 base path 解析。

该检查不会发起网络请求，因此正式发布前仍应人工查看外部链接。

## 路由清单

`content-route-manifest.json` 记录预期公开文章路由。文章有意新增、删除或修改地址时运行：

```bash
pnpm content:manifest
```

检查差异后，将清单与文章修改一并提交。只要 `abbrlink` 不变，文件名变化不影响公开路由。

## 浏览器覆盖

Playwright 会启动生产预览，检查代表性的主页、文章、译文、目录、表格、Mermaid 和溢出行为。测试使用 Chromium 与亮色模式；失败截图和 trace 保存在 `artifacts/`，GitHub Actions 会将其上传。

正式发布前仍建议在真实手机和桌面浏览器中分别查看亮暗主题。自动化几何测试无法判断不同操作系统间的字形渲染差异。

## CI

`.github/workflows/verify.yml` 会在推送到 `main`、Pull Request 和手动触发时运行 `pnpm verify:release`。部署工作流还会单独构建最终将发布到 Pages 的产物。

发布或打标签前，可从干净工作区执行：

```bash
pnpm install --frozen-lockfile
pnpm verify:release
git status --short
```
