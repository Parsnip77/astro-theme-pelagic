# Configuration

Pelagic keeps the settings most site owners need in `src/config.ts`. Deployment-only values can be overridden with environment variables so the same source can build for local preview, a GitHub project page, or a custom domain.

[简体中文](zh-CN/configuration.md)

## Site identity

| Option | Purpose |
| --- | --- |
| `site.title` | Site name used when localized titles are disabled. |
| `site.subtitle` | Short line shown below the home-page title. A literal `\n` creates a visual line break. |
| `site.description` | Default meta and feed description. |
| `site.author` | Footer, feed, and author metadata. |
| `site.url` | Resolved production origin. Normally leave this as `deployment.url`. |
| `site.base` | Resolved deployment subpath. Normally leave this as `deployment.base`. |
| `site.favicon` | File under `public/`, beginning with `/`, or an external URL. |
| `site.i18nTitle` | Use localized title, subtitle, and description from `src/i18n/ui.ts`. |

When `i18nTitle` is `true`, changing only `site.title` or `site.subtitle` will not affect the visible localized header. Edit the active language entries in `src/i18n/ui.ts` as well.

## Deployment resolution

`SITE_URL` must be an origin such as `https://blog.example.com`, without a path. `BASE_PATH` is `/` for a root site or a path such as `/notes`.

Resolution order:

1. Explicit `SITE_URL` and `BASE_PATH` environment variables.
2. On GitHub Actions, the repository owner and name. Project sites automatically receive `/<repository-name>`.
3. Local fallback: `https://example.com` and `/`.

The fallback is safe for local development but must not be used for a real production site. See `docs/deployment.md`.

## Locales

```ts
const locale = {
  default: 'en',
  additional: ['zh'],
}
```

The default locale has no path prefix. Additional locales use prefixes such as `/zh/`. Do not repeat the default locale in `additional`.

Supported locale codes are `de`, `en`, `es`, `fr`, `ja`, `ko`, `pl`, `pt`, `ru`, `zh`, and `zh-tw`. Enabling a locale also requires:

- a suitable entry in `src/i18n/ui.ts` (already supplied for all supported codes);
- an About page named `about-<locale>.md` if that route should exist;
- posts carrying that `lang` value.

## Colors

`color.mode` accepts `light`, `dark`, or `auto`. Each palette uses CSS color values for:

- `primary`: headings and strong interface text;
- `secondary`: body and muted interface text;
- `background`: page background;
- `highlight`: marker-style hover and active decoration.

The defaults use OKLCH because it gives predictable perceptual adjustments, but ordinary hex, RGB, or HSL colors also work.

## Typography

```ts
const typography = {
  interfaceStyle: 'sans',
  postBodyFont: 'garamond',
  postBodyFontSize: { garamond: 18, sans: 16 },
  postBodyAuxFontSize: 16,
}
```

- Titles and home-page summaries keep Pelagic's EB Garamond display treatment.
- `postBodyFont` selects the default article body face.
- `postBodyFontSize` stores the recommended visual size for each body face.
- `postBodyAuxFontSize` separately sizes CJK fallback glyphs, math, inline code, and code blocks inside Garamond articles.
- A post can override `bodyFont`, `bodyFontSize`, and `bodyAuxFontSize` in front matter.

## Article layout

The desktop article and TOC geometry is configurable without editing CSS:

| Option | Default | Effect |
| --- | --- | --- |
| `layout.articleWidth` | `50rem` | Maximum reading-column width. |
| `layout.tocWidth` | `16rem` | Floating TOC width. |
| `layout.tocGap` | `4.5rem` | Gap between article and TOC. |
| `layout.desktopShift` | `6rem` | Moves the complete article/TOC group right when positive. |
| `layout.topBarInset` | `max(2rem, 5vw)` | Distance from the viewport's right edge to article navigation. |

Use valid CSS lengths. After changing geometry, run `pnpm test:layout`; large combinations can exceed a 1280-pixel viewport.

## Features

| Option | Values | Purpose |
| --- | --- | --- |
| `features.dateFormat` | One of the formats in `ThemeConfig` | Dates on lists and article pages. |
| `features.toc` | Boolean | Default for new posts and omitted post front matter. |
| `features.katex` | Boolean | Load KaTeX styles for mathematical notation. |
| `features.reduceMotion` | Boolean | Disable decorative motion in addition to system preferences. |

## Comments

Comments are disabled by default. To use Giscus:

1. Enable Discussions in the destination GitHub repository.
2. Install and configure the Giscus GitHub app at <https://giscus.app/>.
3. Copy the generated `repo`, `repoId`, `category`, and `categoryId` into `comments.giscus`.
4. Set `comments.enabled` to `true`.

Pelagic hosts its light and dark Giscus themes under `public/giscus/`. Do not enable comments with empty repository identifiers; the component refuses to render an incomplete configuration.

## Footer

`footer.links` accepts external URLs, root-relative internal paths, `/rss.xml` or `/atom.xml`, and bare email addresses. Internal and feed links are localized automatically; bare email addresses become `mailto:` links. Set `startYear` to the first year of your site.
