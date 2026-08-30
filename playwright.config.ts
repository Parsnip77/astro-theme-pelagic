import process from 'node:process'
import { defineConfig } from '@playwright/test'
import { base } from './src/config'

const viewports = [390, 1280, 1440, 1920]
const previewURL = `http://127.0.0.1:4321${base}/`

export default defineConfig({
  testDir: './tests',
  outputDir: 'artifacts/playwright',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['line'], ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }]]
    : 'line',
  use: {
    baseURL: previewURL,
    browserName: 'chromium',
    colorScheme: 'light',
    locale: 'en-US',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: viewports.map(width => ({
    name: `layout-${width}`,
    use: { viewport: { width, height: 900 } },
  })),
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: previewURL,
  },
})
