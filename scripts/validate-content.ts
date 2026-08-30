import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import MarkdownIt from 'markdown-it'
import { allLocales } from '../src/config'
import { getPublishedRoutes, loadSourcePosts } from './lib/posts'

interface RouteManifest {
  routes: Array<{ lang: string, slug: string }>
  version: number
}

const manifestPath = 'content-route-manifest.json'
const markdown = new MarkdownIt({ html: true })
const diagnostics: string[] = []

function report(file: string, message: string) {
  diagnostics.push(`${file}: ${message}`)
}

function collectMarkdownResources(body: string) {
  const resources: Array<{ alt?: string, url: string, type: 'image' | 'link' }> = []
  const visit = (tokens: ReturnType<typeof markdown.parse>) => {
    for (const token of tokens) {
      if (token.type === 'image') {
        resources.push({ alt: token.content, url: token.attrGet('src') ?? '', type: 'image' })
      }
      else if (token.type === 'link_open') {
        resources.push({ url: token.attrGet('href') ?? '', type: 'link' })
      }
      if (token.children) {
        visit(token.children)
      }
    }
  }
  visit(markdown.parse(body, {}))
  return resources
}

function isLocalAsset(url: string) {
  return /\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(url)
    && !/^(?:[a-z]+:)?\/\//i.test(url)
}

async function validateLocalAsset(file: string, url: string) {
  const cleanURL = decodeURIComponent(url.split(/[?#]/)[0])
  const target = cleanURL.startsWith('/')
    ? path.join('public', cleanURL.replace(/^\/+/, ''))
    : path.resolve(path.dirname(file), cleanURL)

  try {
    await fs.access(target)
  }
  catch {
    report(file, `local asset does not exist: ${url}`)
  }
}

async function validateManifest(routes: RouteManifest['routes'], writeManifest: boolean) {
  const nextManifest: RouteManifest = { version: 1, routes }
  if (writeManifest) {
    await fs.writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`)
    console.log(`Updated ${manifestPath} with ${routes.length} published routes.`)
    return
  }

  let current: RouteManifest
  try {
    current = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as RouteManifest
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    report(manifestPath, `cannot read route manifest (${message}); run pnpm content:manifest`)
    return
  }

  if (JSON.stringify(current.routes) !== JSON.stringify(routes)) {
    report(
      manifestPath,
      'published URL set changed; review the change, then run pnpm content:manifest to accept it',
    )
  }
}

export async function validateContent(writeManifest = false) {
  diagnostics.length = 0
  const posts = await loadSourcePosts()
  const routeOwners = new Map<string, string>()

  for (const post of posts) {
    const { metadata } = post
    if (!post.draft) {
      if (!post.lang) {
        report(post.file, 'published posts must declare lang explicitly')
      }
      if (typeof metadata.abbrlink !== 'string' || !metadata.abbrlink.trim()) {
        report(post.file, 'published posts must declare a stable abbrlink')
      }
      if (typeof metadata.description !== 'string' || !metadata.description.trim()) {
        report(post.file, 'published posts must have a non-empty description')
      }
    }

    if (post.lang && !allLocales.includes(post.lang as typeof allLocales[number])) {
      report(post.file, `lang "${post.lang}" is not enabled in src/config.ts`)
    }

    const languages = post.lang ? [post.lang] : allLocales
    for (const lang of languages) {
      const routeKey = `${lang}/${post.slug}`
      const owner = routeOwners.get(routeKey)
      if (owner) {
        report(post.file, `duplicates route ${routeKey} already owned by ${owner}`)
      }
      routeOwners.set(routeKey, post.file)
    }

    for (const resource of collectMarkdownResources(post.body)) {
      if (resource.type === 'image' && !resource.alt?.trim()) {
        report(post.file, `Markdown image requires useful alt text: ${resource.url}`)
      }
      if (resource.url && isLocalAsset(resource.url)) {
        await validateLocalAsset(post.file, resource.url)
      }
    }

    for (const match of post.body.matchAll(/<img\b([^>]*)>/gi)) {
      if (!/\balt\s*=\s*(["']).*?\1/i.test(match[1])) {
        report(post.file, 'raw HTML <img> must include an alt attribute')
      }
    }
  }

  const publishedRoutes = getPublishedRoutes(posts)
  // Never bless a new public URL set while another content error is present.
  if (!writeManifest || diagnostics.length === 0) {
    await validateManifest(publishedRoutes, writeManifest)
  }

  if (diagnostics.length > 0) {
    console.error(`Content validation failed with ${diagnostics.length} issue(s):`)
    diagnostics.forEach(message => console.error(`- ${message}`))
    process.exitCode = 1
    return
  }

  console.log(`Content validation passed: ${posts.length} posts, ${publishedRoutes.length} published routes.`)
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isDirectRun) {
  await validateContent(process.argv.includes('--write-manifest'))
}
