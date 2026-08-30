<p align="center">
  <img src="public/icons/pelagic-mark.svg" width="88" alt="Pelagic 波浪标志">
</p>

<h1 align="center">Pelagic</h1>

<p align="center">
  为随笔、笔记与研究写作设计的排版优先、多语言 Astro 博客主题。
</p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="https://leanderc.com">在线演示</a>
</p>

<p align="center">
  <a href="https://github.com/Parsnip77/astro-theme-pelagic/actions/workflows/verify.yml"><img alt="验证状态" src="https://github.com/Parsnip77/astro-theme-pelagic/actions/workflows/verify.yml/badge.svg"></a>
  <a href="https://astro.build/"><img alt="Astro 6" src="https://img.shields.io/badge/Astro-6-BC52EE?logo=astro&logoColor=white"></a>
  <a href="LICENSE"><img alt="MIT 许可证" src="https://img.shields.io/badge/License-MIT-3B82F6"></a>
</p>

![Pelagic 文章页面](docs/images/article-desktop.jpg)

## 设计取向

Pelagic 延续了 [Retypeset](https://github.com/radishzzz/astro-theme-retypeset) 对字体与留白的克制，但进一步把重心从展示个人博客身份转向去个人化、沉浸式的阅读体验。它尽量让以作者为中心的模块退居幕后，使文章本身成为界面的主体；同一套排版既能容纳人文社科中的长篇论述、多语言文本与注释，也能稳定呈现自然科学和计算机科学写作中的公式、代码、表格与图表。文章页的动态侧边目录会随阅读位置高亮当前章节，并在需要时展开下级标题，在不打断阅读节奏的前提下提高长文定位和回看的效率。公开默认配置不包含[在线演示博客](https://leanderc.com)的个人内容。

## 功能概览

- **有意识的字体系统：** 拉丁标题和可选正文使用 EB Garamond，中文采用协调的回退字体，并可分别调整正文、公式与代码字号。
- **面向长文的导航：** 宽正文栏、自适应两级侧边目录、紧凑的角落导航、可滚动的宽表格与图表，以及专注的移动端布局。
- **兼容随笔与研究写作：** 支持 Markdown、MDX、KaTeX、Mermaid、代码高亮、提示块、折叠块、脚注和媒体嵌入。
- **多语言且默认尊重隐私：** 提供英文与简体中文示例、11 种界面语言、本地字体、无统计基线和可选的 Giscus 评论。
- **带有安全检查的静态发布：** 包含 RSS/Atom、站点地图、Open Graph 图片、GitHub Pages 根路径与子路径推导，以及内容、生成链接和响应式布局验证。

![Pelagic 公式、代码与 Mermaid 渲染](docs/images/features-desktop.jpg)

## 快速开始

需要 Node.js 22 或更高版本，以及 pnpm 11。

```bash
git clone https://github.com/Parsnip77/astro-theme-pelagic.git my-blog
cd my-blog
pnpm install
pnpm dev
```

打开 `http://localhost:4321`。正式发布前建议依次完成：

1. 在 `src/config.ts` 修改站点信息、语言、排版、布局与页脚链接。
2. 如果启用了 `site.i18nTitle`，在 `src/i18n/ui.ts` 修改各语言的站点标题与副标题。
3. 替换 `src/content/` 下的 About 页面和示例文章。
4. 按需替换 `public/` 下的 favicon 与社交分享资源。
5. 运行 `pnpm verify:release`。

## 新建文章

```bash
pnpm new-post my-first-post
```

命令会在 `src/content/posts/` 创建草稿。公开文章必须填写摘要、语言和稳定的 `abbrlink`。

```yaml
---
title: 我的第一篇文章
published: 2026-01-20
description: 用于文章列表、订阅源和搜索元数据的简短摘要。
tags:
  - 随笔
draft: false
toc: true
bodyFont: garamond
bodyFontSize: 18
bodyAuxFontSize: 16
lang: zh
abbrlink: my-first-post
---
```

同一篇文章的不同语言版本应共用 `abbrlink`，并填写不同的 `lang`。语言切换器只会列出实际存在的译文。

## 配置概览

绝大多数站点配置集中在一个文件中：

```ts
export const themeConfig = {
  site: { title: 'Pelagic', author: 'Your Name', i18nTitle: true },
  locale: { default: 'en', additional: ['zh'] },
  typography: { postBodyFont: 'garamond' },
  layout: { articleWidth: '50rem', tocWidth: '16rem' },
  comments: { enabled: false },
}
```

完整选项参见[配置参考](docs/zh-CN/configuration.md)，主题支持的 Markdown 写法参见[内容写作指南](docs/zh-CN/content.md)。

## 部署到 GitHub Pages

仓库内置工作流会在每次推送到 `main` 后构建和部署。

1. 将仓库推送到 GitHub。
2. 打开 **Settings → Pages**。
3. 将发布来源设为 **GitHub Actions**。
4. 再次推送，或在 Actions 页面手动运行 **Deploy to GitHub Pages**。

Pelagic 会自动区分 `<owner>.github.io` 用户站点与 `my-blog` 这类项目仓库。自定义域名通过仓库变量 `SITE_URL` 与 `public/CNAME` 配置。各种场景的详细步骤见[部署指南](docs/zh-CN/deployment.md)。

## 验证与测试

```bash
pnpm check             # Astro 与 TypeScript 检查
pnpm build             # 生产构建及生成链接验证
pnpm verify            # 代码、配置、文档、构建与响应式浏览器测试
pnpm verify:release    # 在 verify 基础上增加 GitHub 项目子路径构建
```

CI 会检查文章元数据与地址稳定性、文档链接、根路径和子路径构建、canonical 与内部链接、草稿隔离、图片替代文字，以及 390、1280、1440、1920 像素宽度下的响应式布局。完整矩阵见[测试说明](docs/zh-CN/testing.md)。

## 文档

| 简体中文 | English |
| --- | --- |
| [配置参考](docs/zh-CN/configuration.md) | [Configuration](docs/configuration.md) |
| [内容写作](docs/zh-CN/content.md) | [Content authoring](docs/content.md) |
| [部署指南](docs/zh-CN/deployment.md) | [Deployment](docs/deployment.md) |
| [测试说明](docs/zh-CN/testing.md) | [Testing](docs/testing.md) |
| [截图与效果](docs/zh-CN/showcase.md) | [Screenshot gallery](docs/showcase.md) |

## 项目结构

```text
src/config.ts             站点、字体、布局与功能配置
src/i18n/                 界面翻译和多语言路由
src/content/about/        各语言 About 页面
src/content/posts/        Markdown 与 MDX 文章
src/components/           Astro 组件与功能部件
src/styles/               主题与排版样式
public/                   字体、图标、订阅资源和可选 CNAME
scripts/                  写作和验证工具
tests/                    响应式布局回归测试
.github/workflows/        自动验证与 GitHub Pages 部署
```

## 致谢与许可证

Pelagic 基于 [Retypeset](https://github.com/radishzzz/astro-theme-retypeset) 继续开发，源代码采用 MIT 许可证。项目保留了 Retypeset 原始版权声明；Pelagic 修改部分版权 © 2026 Parsnip77。内置字体与 Giscus 主题基础文件分别遵循各自的许可证。

详见 [LICENSE](LICENSE)、[NOTICE.md](NOTICE.md) 与 [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)。
