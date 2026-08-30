# 配置参考

Pelagic 将站点维护者最常修改的设置集中在 `src/config.ts`。部署相关值可以通过环境变量覆盖，因此同一份源码可用于本地预览、GitHub 项目站点或自定义域名。

[English](../configuration.md)

## 站点信息

| 选项 | 用途 |
| --- | --- |
| `site.title` | 关闭多语言标题时使用的站点名称。 |
| `site.subtitle` | 主页标题下的短句；字符串中的 `\n` 会显示为换行。 |
| `site.description` | 默认页面元数据与订阅源描述。 |
| `site.author` | 页脚、订阅源和作者元数据。 |
| `site.url` | 最终生产环境域名，通常保持为 `deployment.url`。 |
| `site.base` | 部署子路径，通常保持为 `deployment.base`。 |
| `site.favicon` | `public/` 下以 `/` 开头的文件路径，或外部 URL。 |
| `site.i18nTitle` | 是否从 `src/i18n/ui.ts` 读取各语言的标题、副标题和描述。 |

当 `i18nTitle` 为 `true` 时，只修改 `site.title` 或 `site.subtitle` 不会改变当前语言下的可见标题，还需修改 `src/i18n/ui.ts` 中相应语言的条目。

## 部署地址推导

`SITE_URL` 必须是 `https://blog.example.com` 这样的域名源，不得包含路径。`BASE_PATH` 在根路径部署时为 `/`，在子目录部署时可设为 `/notes`。

优先级如下：

1. 明确设置的 `SITE_URL` 和 `BASE_PATH` 环境变量。
2. GitHub Actions 中的仓库所有者与仓库名；项目站点自动使用 `/<仓库名>`。
3. 本地回退值 `https://example.com` 与 `/`。

本地回退值只为安全开发准备，不应作为正式生产地址。详细场景见[部署指南](deployment.md)。

## 语言

```ts
const locale = {
  default: 'en',
  additional: ['zh'],
}
```

默认语言不带路径前缀，其他语言使用 `/zh/` 之类的前缀。不要在 `additional` 中重复默认语言，也不要填写重复项。

可用语言代码为 `de`、`en`、`es`、`fr`、`ja`、`ko`、`pl`、`pt`、`ru`、`zh` 和 `zh-tw`。启用一种语言时还应确认：

- `src/i18n/ui.ts` 中存在对应界面文字（上述语言已经内置）；
- 如需 About 页面，存在 `about-<语言>.md`；
- 文章 front matter 使用对应的 `lang`。

## 配色

`color.mode` 可设为 `light`、`dark` 或 `auto`。亮暗两套调色板分别包含：

- `primary`：标题和重要界面文字；
- `secondary`：正文和弱化界面文字；
- `background`：页面背景；
- `highlight`：荧光笔式悬停与当前位置装饰。

默认使用 OKLCH，以便更稳定地调整视觉明度；也可以使用普通的 Hex、RGB 或 HSL 颜色。

## 字体与字号

```ts
const typography = {
  interfaceStyle: 'sans',
  postBodyFont: 'garamond',
  postBodyFontSize: { garamond: 18, sans: 16 },
  postBodyAuxFontSize: 16,
}
```

- 标题和主页摘要固定采用 Pelagic 的 EB Garamond 展示风格。
- `postBodyFont` 设置文章正文默认使用 `garamond` 或 `sans`。
- `postBodyFontSize` 分别保存两种正文字体的推荐字号。
- `postBodyAuxFontSize` 独立控制 Garamond 文章内的中文回退字形、行内代码、代码块与公式字号。
- 单篇文章可通过 `bodyFont`、`bodyFontSize` 和 `bodyAuxFontSize` 覆盖默认值。

## 文章布局

| 选项 | 默认值 | 作用 |
| --- | --- | --- |
| `layout.articleWidth` | `50rem` | 正文栏最大宽度。 |
| `layout.tocWidth` | `16rem` | 浮动目录宽度。 |
| `layout.tocGap` | `4.5rem` | 正文与目录之间的空隙。 |
| `layout.desktopShift` | `6rem` | 正值会将正文与目录组成的整体向右移动。 |
| `layout.topBarInset` | `max(2rem, 5vw)` | 文章顶栏距离视口右边缘的距离。 |

这些值必须是合法 CSS 长度。修改布局后运行 `pnpm test:layout`；过大的组合可能无法容纳在 1280 像素宽的窗口中。

## 功能

| 选项 | 值 | 用途 |
| --- | --- | --- |
| `features.dateFormat` | `ThemeConfig` 中列出的格式 | 列表与文章页日期格式。 |
| `features.toc` | 布尔值 | 新文章和未填写 `toc` 的文章是否默认显示目录。 |
| `features.katex` | 布尔值 | 是否加载 KaTeX 数学样式。 |
| `features.reduceMotion` | 布尔值 | 除系统偏好外，主动关闭装饰动画。 |

## 评论

评论默认关闭。启用 Giscus：

1. 在目标 GitHub 仓库启用 Discussions。
2. 在 <https://giscus.app/> 安装并配置 Giscus GitHub App。
3. 将页面生成的 `repo`、`repoId`、`category` 和 `categoryId` 填入 `comments.giscus`。
4. 将 `comments.enabled` 设为 `true`。

Pelagic 在 `public/giscus/` 内置亮暗两套主题。仓库标识为空时不要启用评论，组件会拒绝渲染不完整配置。

## 页脚

`footer.links` 支持外部 URL、以 `/` 开头的站内路径、`/rss.xml`、`/atom.xml` 和纯邮箱地址。站内与订阅链接会自动加上语言前缀，邮箱会转换为 `mailto:`。`startYear` 应填写站点开始年份。
