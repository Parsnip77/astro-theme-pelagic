import type { ThemeConfig } from '@/types'
import process from 'node:process'

function normalizeBasePath(value: string) {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '/') {
    return '/'
  }
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`
}

export function resolveDeployment(environment: NodeJS.ProcessEnv = process.env) {
  const explicitSiteURL = environment.SITE_URL?.trim()
  const explicitBasePath = environment.BASE_PATH?.trim()
  const [repositoryOwner, repositoryName] = (environment.GITHUB_REPOSITORY ?? '').split('/')
  const isGitHubActions = environment.GITHUB_ACTIONS === 'true'

  // Project Pages can infer their public origin and repository subpath.
  // Local builds deliberately use example.com until the owner configures a URL.
  const url = explicitSiteURL
    || (isGitHubActions && repositoryOwner
      ? `https://${repositoryOwner}.github.io`
      : 'https://example.com')

  const inferredBase = isGitHubActions
    && repositoryOwner
    && repositoryName
    && repositoryName !== `${repositoryOwner}.github.io`
    ? `/${repositoryName}`
    : '/'

  // An explicit SITE_URL normally means a root deployment or custom domain.
  // Set BASE_PATH as well when deploying beneath a subdirectory on that origin.
  const base = normalizeBasePath(
    explicitBasePath || (explicitSiteURL ? '/' : inferredBase),
  )

  const parsedURL = new URL(url)
  if (!['http:', 'https:'].includes(parsedURL.protocol)) {
    throw new Error('[Pelagic config] SITE_URL must use http or https.')
  }
  if (parsedURL.pathname !== '/' || parsedURL.search || parsedURL.hash) {
    throw new Error('[Pelagic config] SITE_URL must be an origin without a path, query, or hash. Use BASE_PATH for a subdirectory.')
  }

  return {
    base,
    url: parsedURL.origin,
  }
}

const deployment = resolveDeployment()

/**
 * Pelagic's main public configuration.
 *
 * Environment variables override deployment-only values:
 *   SITE_URL=https://blog.example.com
 *   BASE_PATH=/notes
 *
 * See docs/configuration.md for every option and docs/deployment.md for hosts.
 */
export const themeConfig: ThemeConfig = {
  site: {
    title: 'Pelagic',
    subtitle: 'Notes, Essays & Research',
    description: 'A typography-first multilingual blog built with Pelagic and Astro.',
    author: 'Your Name',
    url: deployment.url,
    base: deployment.base,
    favicon: '/favicon.svg',

    // When true, title/subtitle/description come from src/i18n/ui.ts.
    i18nTitle: true,
  },

  color: {
    mode: 'light', // light | dark | auto
    light: {
      primary: 'oklch(0.24 0.0172 280.05)',
      secondary: 'oklch(0.40 0.0172 280.05)',
      background: 'oklch(0.98 0.0172 280.05)',
      highlight: 'oklch(0.72 0.18 248 / 0.42)',
    },
    dark: {
      primary: 'oklch(0.92 0.0172 280.05)',
      secondary: 'oklch(0.79 0.0172 280.05)',
      background: 'oklch(0.24 0.0172 280.05)',
      highlight: 'oklch(0.72 0.18 248 / 0.26)',
    },
  },

  locale: {
    default: 'en',
    additional: ['zh'],
  },

  typography: {
    interfaceStyle: 'sans', // sans | serif
    postBodyFont: 'garamond', // garamond | sans
    postBodyFontSize: {
      garamond: 18,
      sans: 16,
    },
    // Size for CJK fallback glyphs, inline code, code blocks, and math in Garamond posts.
    postBodyAuxFontSize: 16,
  },

  layout: {
    articleWidth: '50rem',
    tocWidth: '16rem',
    tocGap: '4.5rem',
    // Positive values move the article/TOC group to the right on wide screens.
    desktopShift: '6rem',
    topBarInset: 'max(2rem, 5vw)',
  },

  features: {
    dateFormat: 'YYYY-MM-DD',
    toc: true,
    katex: true,
    reduceMotion: false,
  },

  comments: {
    enabled: false,
    giscus: {
      repo: '',
      repoId: '',
      category: 'Announcements',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '0',
      emitMetadata: '0',
      inputPosition: 'bottom',
    },
  },

  footer: {
    links: [
      { name: 'GitHub', url: 'https://github.com/Parsnip77/astro-theme-pelagic' },
      { name: 'RSS', url: '/rss.xml' },
    ],
    startYear: 2026,
  },
}

export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base
export const defaultLocale = themeConfig.locale.default
export const moreLocales = themeConfig.locale.additional
export const allLocales = [defaultLocale, ...moreLocales]

if (moreLocales.includes(defaultLocale)) {
  throw new Error(
    `[Pelagic config] locale.additional must not include the default locale "${defaultLocale}".`,
  )
}

if (new Set(moreLocales).size !== moreLocales.length) {
  throw new Error('[Pelagic config] locale.additional must not contain duplicates.')
}

if (themeConfig.comments.enabled) {
  const requiredGiscusFields = ['repo', 'repoId', 'category', 'categoryId'] as const
  const missingFields = requiredGiscusFields.filter(
    field => !themeConfig.comments.giscus?.[field]?.trim(),
  )
  if (missingFields.length > 0) {
    throw new Error(
      `[Pelagic config] comments.enabled requires Giscus fields: ${missingFields.join(', ')}.`,
    )
  }
}
