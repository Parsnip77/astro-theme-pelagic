// Global Language Map
export const langMap = {
  'de': ['de-DE'],
  'en': ['en-US'],
  'es': ['es-ES'],
  'fr': ['fr-FR'],
  'ja': ['ja-JP'],
  'ko': ['ko-KR'],
  'pl': ['pl-PL'],
  'pt': ['pt-BR'],
  'ru': ['ru-RU'],
  'zh': ['zh-CN'],
  'zh-tw': ['zh-TW'],
} as const

// Supported Languages
export type Language = keyof typeof langMap

// Giscus Language Map
// https://giscus.app/
export const giscusLocaleMap: Record<Language, string> = {
  'de': 'de',
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'ja': 'ja',
  'ko': 'ko',
  'pl': 'pl',
  'pt': 'pt',
  'ru': 'ru',
  'zh': 'zh-CN',
  'zh-tw': 'zh-TW',
}
