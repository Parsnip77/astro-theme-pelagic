import fs from 'node:fs/promises'
import path from 'node:path'
import glob from 'fast-glob'
import { parse as parseYaml } from 'yaml'
import { allLocales } from '../../src/config'

export interface SourcePost {
  body: string
  draft: boolean
  file: string
  id: string
  lang: string
  metadata: Record<string, unknown>
  slug: string
}

export interface PublishedRoute {
  lang: string
  slug: string
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

export async function loadSourcePosts(): Promise<SourcePost[]> {
  const files = await glob('**/*.{md,mdx}', {
    cwd: 'src/content/posts',
    absolute: false,
  })

  return Promise.all(files.sort().map(async (relativeFile) => {
    const file = path.posix.join('src/content/posts', relativeFile)
    const source = await fs.readFile(file, 'utf8')
    const match = source.match(frontmatterPattern)
    if (!match) {
      throw new Error(`${file}: missing YAML front matter`)
    }

    let metadata: Record<string, unknown>
    try {
      const parsed = parseYaml(match[1])
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('front matter must be a mapping')
      }
      metadata = parsed as Record<string, unknown>
    }
    catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`${file}: invalid YAML front matter: ${message}`)
    }

    const id = relativeFile.replace(/\.(md|mdx)$/i, '')
    const abbrlink = typeof metadata.abbrlink === 'string' ? metadata.abbrlink.trim() : ''
    const lang = typeof metadata.lang === 'string' ? metadata.lang.trim() : ''

    return {
      body: source.slice(match[0].length),
      draft: metadata.draft === true,
      file,
      id,
      lang,
      metadata,
      slug: abbrlink || id,
    }
  }))
}

export function getPublishedRoutes(posts: SourcePost[]): PublishedRoute[] {
  return posts
    .filter(post => !post.draft)
    .flatMap(post => (post.lang ? [post.lang] : allLocales)
      .map(lang => ({ lang, slug: post.slug })))
    .sort((a, b) => a.slug.localeCompare(b.slug) || a.lang.localeCompare(b.lang))
}

export function getDraftRoutes(posts: SourcePost[]): PublishedRoute[] {
  return posts
    .filter(post => post.draft)
    .flatMap(post => (post.lang ? [post.lang] : allLocales)
      .map(lang => ({ lang, slug: post.slug })))
}
