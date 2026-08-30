/**
 * Create a new post with frontmatter
 * Usage: pnpm new-post <title>
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import process from 'node:process'
import { themeConfig } from '../src/config'

// Process file path
const rawPath = process.argv[2] ?? 'new-post'
const baseName = basename(rawPath).replace(/\.(md|mdx)$/, '')
const defaultSlug = baseName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
const targetFile = ['.md', '.mdx'].includes(extname(rawPath))
  ? rawPath
  : `${rawPath}.md`
const fullPath = join('src/content/posts', targetFile)

// Check if file already exists
if (existsSync(fullPath)) {
  console.error(`❌ File already exists: ${fullPath}`)
  process.exit(1)
}

// Create directory structure
mkdirSync(dirname(fullPath), { recursive: true })

// Prepare file content
const content = `---
title: ${JSON.stringify(baseName)}
published: ${new Date().toISOString()}
description: ''
updated: ''
tags:
  - Tag
draft: true
pin: 0
toc: ${themeConfig.global.toc}
bodyFont: ${themeConfig.global.postBodyFont}
bodyFontSize: ${themeConfig.global.postBodyFontSize[themeConfig.global.postBodyFont]}
bodyAuxFontSize: ${themeConfig.global.postBodyAuxFontSize}
lang: ${themeConfig.global.locale}
abbrlink: ${defaultSlug}
---
`

// Write to file
try {
  writeFileSync(fullPath, content)
  console.log(`✅ Post created: ${fullPath}`)
}
catch (error) {
  console.error('❌ Failed to create post:', error)
  process.exit(1)
}
