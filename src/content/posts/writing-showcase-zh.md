---
title: Pelagic 写作功能示例
published: 2026-01-10
description: 用一个紧凑页面展示 Pelagic 的 Markdown、字体、提示块、数学公式、流程图和代码效果。
tags:
  - Pelagic
  - Markdown
draft: false
pin: 0
toc: true
bodyFont: sans
bodyFontSize: 16
bodyAuxFontSize: 16
lang: zh
abbrlink: writing-showcase
---

这个页面既是一份可读的示例，也是一项视觉冒烟测试。改造主题时可以暂时保留；当自己的文章准备好以后，也可以直接删除。

## 正文与强调

Pelagic 支持**粗体**、*斜体*、~~删除线~~、[链接](https://astro.build/)、行内 `code`、脚注[^note]和普通引用块。

> 好的字体排版并不会让每一句话都显得戏剧化。它只是让结构清楚，让持续阅读更加舒适。

### 列表与任务

- 一条简短的无序列表
- 带有**强调内容**的第二项
  - 一条嵌套说明

1. 写出论证草稿。
2. 修改文章结构。
3. 预览生产构建后再发布。

- [x] 配置站点
- [x] 在本地预览
- [ ] 替换示例内容

## 结构化信息

较宽的表格默认保持单行，并在必要时允许横向滚动。如果希望内容紧凑换行，作者可以手动插入换行。

| 功能 | 默认行为 | 单篇文章设置 |
| --- | --- | --- |
| 正文字体 | EB Garamond | `bodyFont: garamond` 或 `sans` |
| 阅读宽度 | 50 rem | 全局布局配置 |
| 文章目录 | 开启 | `toc: true` 或 `false` |
| 评论 | 关闭 | 全局 Giscus 配置 |

:::tip[谨慎使用提示块]
提示块最适合说明真正的例外、警告或补充信息，不应取代文章本身的标题层级。
:::

:::warning[草稿仅供本地查看]
设置为 `draft: true` 的文章会在开发环境中出现，但不会进入生产页面、订阅源或社交分享图片。
:::

:::fold[还可以使用哪些提示块？]
在开头的 `:::` 后使用 `note`、`tip`、`important`、`warning` 或 `caution`。折叠块 `fold` 必须在方括号中提供标题。
:::

## 数学公式与代码

行内公式 $e^{i\pi}+1=0$ 使用辅助字号。行间公式由 KaTeX 渲染：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}.
$$

代码块提供语法高亮、行号、横向溢出和复制按钮：

```ts
interface Note {
  title: string
  published: Date
  tags: string[]
}

export function isRecent(note: Note, now = new Date()) {
  const days = (now.valueOf() - note.published.valueOf()) / 86_400_000
  return days <= 30
}
```

### 流程图

Mermaid 图表会在构建时渲染；过宽时可以横向滚动，不会为了塞进正文而缩小到难以辨认。

```mermaid
flowchart LR
  Draft[撰写草稿] --> Preview[本地预览]
  Preview --> Verify[运行验证]
  Verify --> Publish[部署静态文件]
```

## 最后检查

发布正式文章前，请确认简介、稳定的 `abbrlink`、语言、图片替代文本和译文链接。仓库内置的验证器会自动发现最常见的遗漏。

[^note]: 脚注适合放置那些会打断正文脉络、但仍值得保留的背景信息。
