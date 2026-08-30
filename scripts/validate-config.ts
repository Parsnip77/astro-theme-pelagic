import process from 'node:process'
import { resolveDeployment } from '../src/config'

interface DeploymentCase {
  expected: { base: string, url: string }
  environment: NodeJS.ProcessEnv
  name: string
}

const cases: DeploymentCase[] = [
  {
    name: 'local fallback',
    environment: {},
    expected: { url: 'https://example.com', base: '/' },
  },
  {
    name: 'GitHub user site',
    environment: {
      GITHUB_ACTIONS: 'true',
      GITHUB_REPOSITORY: 'pelagic-test/pelagic-test.github.io',
    },
    expected: { url: 'https://pelagic-test.github.io', base: '/' },
  },
  {
    name: 'GitHub project site',
    environment: {
      GITHUB_ACTIONS: 'true',
      GITHUB_REPOSITORY: 'pelagic-test/my-blog',
    },
    expected: { url: 'https://pelagic-test.github.io', base: '/my-blog' },
  },
  {
    name: 'custom root domain',
    environment: { SITE_URL: 'https://blog.example.org' },
    expected: { url: 'https://blog.example.org', base: '/' },
  },
  {
    name: 'custom subpath',
    environment: {
      BASE_PATH: 'notes/',
      SITE_URL: 'https://example.org',
    },
    expected: { url: 'https://example.org', base: '/notes' },
  },
]

for (const testCase of cases) {
  const actual = resolveDeployment(testCase.environment)
  if (actual.url !== testCase.expected.url || actual.base !== testCase.expected.base) {
    throw new Error(
      `${testCase.name}: expected ${JSON.stringify(testCase.expected)}, received ${JSON.stringify(actual)}`,
    )
  }
}

const invalidURLs = [
  'ftp://example.org',
  'https://example.org/blog',
  'https://example.org/?preview=1',
  'https://example.org/#intro',
]

for (const url of invalidURLs) {
  let rejected = false
  try {
    resolveDeployment({ SITE_URL: url })
  }
  catch {
    rejected = true
  }
  if (!rejected) {
    throw new Error(`invalid SITE_URL was accepted: ${url}`)
  }
}

console.log(`Configuration validation passed: ${cases.length} deployment scenarios and ${invalidURLs.length} invalid URLs checked.`)

process.exit(0)
