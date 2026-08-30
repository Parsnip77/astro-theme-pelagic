import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'
import { parse } from 'node-html-parser'
import { base, defaultLocale, themeConfig } from '../src/config'
import { getDraftRoutes, loadSourcePosts } from './lib/posts'

const distDir = path.resolve('dist')
const siteOrigin = new URL(themeConfig.site.url).origin
const diagnostics: string[] = []

function report(file: string, message: string) {
  diagnostics.push(`${file}: ${message}`)
}

async function exists(target: string) {
  try {
    return (await fs.stat(target)).isFile()
  }
  catch {
    return false
  }
}

async function resolveBuiltTarget(pathname: string) {
  const decoded = decodeURIComponent(pathname)
  const withoutBase = base && decoded.startsWith(`${base}/`)
    ? decoded.slice(base.length)
    : decoded
  const relative = withoutBase.replace(/^\/+|\/+$/g, '')
  const candidates = [
    path.join(distDir, relative),
    path.join(distDir, relative, 'index.html'),
    path.join(distDir, `${relative}.html`),
  ]

  for (const candidate of candidates) {
    if (await exists(candidate)) {
      return candidate
    }
  }
  return undefined
}

async function validateURL(sourceFile: string, rawURL: string, documentURL: URL) {
  if (!rawURL || /^(?:data|javascript|mailto|tel):/i.test(rawURL)) {
    return
  }

  let url: URL
  try {
    url = new URL(rawURL, documentURL)
  }
  catch {
    report(sourceFile, `invalid URL: ${rawURL}`)
    return
  }

  if (url.origin !== siteOrigin && url.origin !== documentURL.origin) {
    return
  }

  const target = await resolveBuiltTarget(url.pathname)
  if (!target) {
    report(sourceFile, `broken local reference: ${rawURL}`)
    return
  }

  if (url.hash && target.endsWith('.html')) {
    const root = parse(await fs.readFile(target, 'utf8'))
    const id = decodeURIComponent(url.hash.slice(1))
    if (id && !root.querySelectorAll('[id]').some(element => element.getAttribute('id') === id)) {
      report(sourceFile, `missing fragment target: ${rawURL}`)
    }
  }
}

async function validateHTML(relativeFile: string) {
  const file = path.join(distDir, relativeFile)
  const pathname = relativeFile === 'index.html'
    ? '/'
    : `/${relativeFile.replace(/index\.html$/, '')}`
  const documentURL = new URL(pathname, themeConfig.site.url)
  const root = parse(await fs.readFile(file, 'utf8'))

  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if (!canonical || new URL(canonical, documentURL).origin !== siteOrigin) {
    report(relativeFile, 'missing or non-production canonical URL')
  }

  for (const element of root.querySelectorAll('[href], [src]')) {
    const url = element.getAttribute('href') ?? element.getAttribute('src') ?? ''
    await validateURL(relativeFile, url, documentURL)
  }

  for (const image of root.querySelectorAll('img')) {
    if (image.getAttribute('alt') === undefined) {
      report(relativeFile, 'rendered <img> is missing alt text')
    }
  }
}

async function validateDraftIsolation() {
  const posts = await loadSourcePosts()
  for (const route of getDraftRoutes(posts)) {
    const prefix = route.lang === defaultLocale ? '' : `/${route.lang}`
    const pagePath = `${prefix}/posts/${route.slug}/`
    if (await resolveBuiltTarget(pagePath)) {
      report('dist', `draft page was emitted: ${pagePath}`)
    }
  }

  for (const post of posts.filter(item => item.draft)) {
    if (await resolveBuiltTarget(`/og/${post.id}.png`)) {
      report('dist', `draft OG image was emitted: /og/${post.id}.png`)
    }
  }
}

async function main() {
  const htmlFiles = await glob('**/*.html', { cwd: distDir })
  for (const file of htmlFiles) {
    await validateHTML(file)
  }
  await validateDraftIsolation()

  if (diagnostics.length > 0) {
    console.error(`Build validation failed with ${diagnostics.length} issue(s):`)
    diagnostics.forEach(message => console.error(`- ${message}`))
    process.exit(1)
  }

  console.log(`Build validation passed: ${htmlFiles.length} HTML files and all local references checked.`)
}

await main()
