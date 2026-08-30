# 内容写作

文章位于 `src/content/posts/`，About 页面位于 `src/content/about/`。两者均支持 Markdown（`.md`）与 MDX（`.mdx`）。

[English](../content.md)

## 新建草稿

```bash
pnpm new-post notes/my-new-essay
```

命令会创建 `src/content/posts/notes/my-new-essay.md`。新文件默认为草稿，并继承 `src/config.ts` 中的默认语言与字体配置。

## 文章 front matter

| 字段 | 发布必需 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面显示和元数据标题。 |
| `published` | 是 | YAML 日期或完整 ISO 时间。 |
| `description` | 是 | 用于文章列表、订阅源和元数据。 |
| `updated` | 否 | 最近一次重要修订日期。 |
| `tags` | 否 | 标签数组。 |
| `draft` | 否 | 草稿只在开发环境显示，默认 `false`。 |
| `pin` | 否 | `1`–`99` 表示置顶及顺序，`0` 表示不置顶。 |
| `toc` | 否 | 是否显示文章侧边目录。 |
| `bodyFont` | 否 | `garamond` 或 `sans`。 |
| `bodyFontSize` | 否 | 14 至 24 像素的正文字号。 |
| `bodyAuxFontSize` | 否 | 12 至 24 像素的中文、代码和公式字号。 |
| `lang` | 是 | 已启用的语言；`''` 表示各语言共用。 |
| `abbrlink` | 是 | 由小写字母、数字和连字符组成的稳定 URL。 |

只要 `abbrlink` 不变，修改文件名不会改变公开地址；删除或修改 `abbrlink` 属于公开 URL 变更，会被 `content-route-manifest.json` 检测。

## 多语言文章

译文使用相同的 `abbrlink` 和不同的 `lang`：

```text
my-essay-en.md  → lang: en, abbrlink: my-essay
my-essay-zh.md  → lang: zh, abbrlink: my-essay
```

语言切换器和 alternate 元数据只包含真实存在的版本。`lang: ''` 表示同一内容有意对所有语言共用，请仅在内容确实完全相同时使用。

## Markdown 功能

标准 Markdown 支持标题、强调、链接、有序/无序列表、任务列表、引用、表格、围栏代码和脚注。

### 提示块

```md
:::note[可选自定义标题]
补充信息。
:::

:::tip
一条实用建议。
:::
```

类型包括 `note`、`tip`、`important`、`warning` 和 `caution`。同时识别 GitHub 风格的 `> [!NOTE]` 引用块。

### 折叠块

```md
:::fold[展开详细内容]
读者展开前隐藏的内容。
:::
```

标题不可省略；摘要文字会跟随当前文章的正文字体。

### 数学公式

行内公式使用 `$...$`，行间公式使用 `$$...$$`。KaTeX 默认启用。

```md
$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$
```

不要把行间公式分隔符与周围正文放在同一行。复杂注释可能产生过深的 TeX 盒子并被裁切；优先使用简短的 `\text{标签}`，或将长说明移到公式下方。

### Mermaid

````md
```mermaid
flowchart LR
  Draft --> Review --> Publish
```
````

图表在构建阶段渲染。过宽图表会横向滚动，不会无限缩小文字。

### 媒体指令

Pelagic 支持下列叶指令：

```md
::github{repo="withastro/astro"}
::youtube{id="VIDEO_ID"}
::bilibili{id="BV_ID"}
::tweet{url="https://x.com/user/status/ID"}
::codepen{url="https://codepen.io/user/pen/SLUG"}
::spotify{url="https://open.spotify.com/track/ID"}
```

这些嵌入会在读者浏览器中连接第三方服务。若希望站点完全本地、尽量减少外部请求，请不要使用它们。

## 图片

文章图片建议放入 `src/content/posts/_images/`，再从文章中使用相对路径引用。Astro 可以据此优化图片，订阅源生成器也能建立绝对地址。

```md
![有意义的图片描述](./_images/example.jpg "可选标题")
```

每张图片都应有有效替代文字。仅在有意隐藏可见图注时，在 alt 开头添加 `_`；无障碍替代文字仍会保留。

从 `public/` 引用的文件必须考虑部署子路径，因此对可能部署在 GitHub 仓库子目录的主题而言，文章本地图片更安全。

## 表格与手动换行

表格使用内容决定的列宽，并在过宽时横向滚动，避免代码、公式和复杂度表达式被任意拆行。如果某个单元格应换行，请在语义合适的位置手动插入 `<br>`。

## 发布清单

1. 将 `draft` 改为 `false`。
2. 填写 `description`、`lang` 和 `abbrlink`。
3. 如公开路由有意变化，运行 `pnpm content:manifest`。
4. 运行 `pnpm verify`；正式版本建议运行 `pnpm verify:release`。
5. 将文章、本地图片和更新后的路由清单一并提交。
