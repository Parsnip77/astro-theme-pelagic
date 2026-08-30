import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  site: {
    // site title
    title: 'Pelagic',
    // site subtitle
    subtitle: 'Notes, Essays & Research',
    // site description
    description: 'Pelagic | A typography-first Astro blog theme',
    // use i18n title/subtitle/description from src/i18n/ui.ts instead of static ones above
    i18nTitle: true, // true | false
    // author name
    author: 'Site Author',
    // site url
    url: 'https://example.com/',
    // base path
    // root directory for all pages and assets
    base: '/', // e.g., '/blog', '/docs'
    // favicon url
    // recommended formats: svg, png or ico
    favicon: '/favicon.svg', // or https://example.com/favicon.svg
  },
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  color: {
    // default theme mode
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
  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  global: {
    // default language; do not repeat it in moreLocales
    locale: 'en', // de | en | es | fr | ja | ko | pl | pt | ru | zh | zh-tw
    // more languages
    // not fill in the locale code above again, can be an empty array []
    moreLocales: ['zh'], // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
    // post font style
    fontStyle: 'sans', // sans | serif
    // default post body typography; individual posts can override both values in front matter
    postBodyFont: 'garamond', // garamond | sans
    postBodyFontSize: {
      garamond: 18, // recommended visual match for EB Garamond
      sans: 16, // recommended visual match for the original sans-serif stack
    },
    // Base size for CJK fallback glyphs, math and code inside Garamond posts
    postBodyAuxFontSize: 16,
    // post date format
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MMM D YYYY | D MMM YYYY
    // enable table of contents
    toc: true, // true | false
    // enable katex math rendering
    katex: true, // true | false
    // reduce motion
    reduceMotion: false, // true | false
  },
  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  comment: {
    // enable comment system
    enabled: false, // true | false
    // giscus
    // https://giscus.app/
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
  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  footer: {
    // social links
    links: [
      // {
      //  name: 'RSS',
      //  url: '/rss.xml', // or /rss.xml
      // },
      {
        name: 'GitHub',
        url: 'https://github.com/Parsnip77/astro-theme-pelagic',
      },
      {
        name: 'RSS',
        url: '/rss.xml',
      },
    ],
    // year of website start
    startYear: 2026,
  },
  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

}

export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base.replace(/\/$/, '')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales

if (moreLocales.includes(defaultLocale)) {
  throw new Error(
    `[Blog config] global.moreLocales must not include the default locale "${defaultLocale}".`,
  )
}

export const allLocales = [defaultLocale, ...moreLocales]
