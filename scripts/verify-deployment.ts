import { spawn } from 'node:child_process'
import process from 'node:process'

const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const child = spawn(command, ['build'], {
  env: {
    ...process.env,
    BASE_PATH: '',
    GITHUB_ACTIONS: 'true',
    GITHUB_REPOSITORY: 'pelagic-test/pelagic-project',
    SITE_URL: '',
  },
  stdio: 'inherit',
})

child.once('error', (error) => {
  console.error(error)
  process.exit(1)
})

child.once('exit', (code, signal) => {
  if (signal) {
    console.error(`Project Pages build terminated by ${signal}.`)
    process.exit(1)
  }
  if (code !== 0) {
    process.exit(code ?? 1)
  }
  console.log('Project Pages deployment validation passed at /pelagic-project/.')
})
