---
title: 欢迎使用 Pelagic
published: 2026-01-15
description: 简要介绍 Pelagic，以及这个主题以字体和阅读体验为中心的设计思路。
tags:
  - Pelagic
  - 指南
draft: false
pin: 1
toc: true
bodyFont: sans
lang: zh
abbrlink: welcome-to-pelagic
---

Pelagic 是一个极简的多语言 Astro 博客主题，适合希望文字在屏幕上保持安静、从容的写作者。首页尽量克制；进入长文后，页面会提供更宽的正文栏、简洁导航，以及在宽屏上显示的侧边目录。

## 从必要设置开始

这个主题不添加额外服务也可以正常使用。修改 `src/config.ts` 中的站点信息，重写“关于”页面，然后在 `src/content/posts/` 中写作即可。统计、在线 CMS、个人资料卡和评论系统都不是必需条件。

:::note[默认提供两种语言]
示例站点启用了英文和简体中文，用来展示多语言路由；但主题并不要求每篇文章都必须有译文。
:::

## 排版本身也是内容的一部分

拉丁字母标题使用 EB Garamond。文章正文可以全局或逐篇选择同一字体，也可以使用原有的无衬线字体。中文、代码和数学公式使用独立调校的辅助字号，让混合排版保持平衡。

> 一个好的主题，应当先给文字留下呼吸的空间，然后安静地退到一旁。

## 把它变成自己的博客

建议依次完成这些小步骤：

1. 设置站点标题、作者、页脚链接和语言。
2. 替换示例“关于”页面。
3. 使用 `pnpm new-post my-first-post` 创建草稿。
4. 发布前运行 `pnpm verify`。
5. 根据部署文档发布到 GitHub Pages 或其他静态托管平台。

配套的[写作功能示例](../writing-showcase/)展示了主题支持的 Markdown 扩展。仓库文档则详细介绍了[配置](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/configuration.md)、[内容写作](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/content.md)和[部署](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/deployment.md)。
