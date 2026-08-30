import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'

const markdownFiles = await glob(['*.md', 'docs/**/*.md'], { onlyFiles: true })
const diagnostics: string[] = []

function stripFencedBlocks(source: string) {
  const output: string[] = []
  let fence = ''

  for (const line of source.split('\n')) {
    const trimmed = line.trimStart()
    if (fence) {
      if (trimmed.startsWith(fence)) {
        fence = ''
      }
      continue
    }

    const marker = trimmed[0]
    if (marker === '`' || marker === '~') {
      let length = 0
      while (trimmed[length] === marker) {
        length += 1
      }
      if (length >= 3) {
        fence = marker.repeat(length)
        continue
      }
    }
    output.push(line)
  }

  return output.join('\n')
}

function isExternal(target: string) {
  return /^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(target)
}

async function validateTarget(sourceFile: string, rawTarget: string) {
  const target = rawTarget.trim().replace(/^<|>$/g, '')
  if (!target || isExternal(target)) {
    return
  }

  const pathOnly = target.split(/[?#]/, 1)[0]
  let decoded: string
  try {
    decoded = decodeURIComponent(pathOnly)
  }
  catch {
    diagnostics.push(`${sourceFile}: invalid encoded path ${target}`)
    return
  }

  const resolved = path.resolve(path.dirname(sourceFile), decoded)
  try {
    await fs.access(resolved)
  }
  catch {
    diagnostics.push(`${sourceFile}: missing local reference ${target}`)
  }
}

for (const file of markdownFiles) {
  const source = await fs.readFile(file, 'utf8')
  // Examples inside fenced code blocks are syntax demonstrations, not links in
  // the rendered documentation. Backtick and tilde fences are both supported.
  const renderedSource = stripFencedBlocks(source)
  const markdownLinks = renderedSource.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)
  const htmlLinks = renderedSource.matchAll(/(?:href|src)="([^"]+)"/g)

  for (const match of [...markdownLinks, ...htmlLinks]) {
    await validateTarget(file, match[1])
  }
}

if (diagnostics.length > 0) {
  console.error(`Documentation validation failed with ${diagnostics.length} issue(s):`)
  diagnostics.forEach(message => console.error(`- ${message}`))
  process.exit(1)
}

console.log(`Documentation validation passed: ${markdownFiles.length} Markdown files and all local references checked.`)
