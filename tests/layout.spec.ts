import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(?:api\.github\.com|giscus\.app|platform\.twitter\.com)\//, route => route.abort())
})

test('homepage and article layout remain inside the viewport', async ({ page }, testInfo) => {
  const width = testInfo.project.use.viewport?.width ?? 0

  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('main')).toBeVisible()

  const siteTitleFont = await page.locator('#site-title-link').evaluate(
    element => getComputedStyle(element).fontFamily,
  )
  expect(siteTitleFont).toContain('EB Garamond')

  const postURL = await page.locator('a[href*="/posts/"]').first().getAttribute('href')
  expect(postURL, 'the homepage needs at least one published article for layout testing').toBeTruthy()

  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(homeOverflow).toBeLessThanOrEqual(1)
  await page.screenshot({
    animations: 'disabled',
    fullPage: true,
    path: testInfo.outputPath(`homepage-${width}.png`),
  })

  await page.goto(postURL!)
  await page.evaluate(() => document.fonts.ready)
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  })

  await expect(page.locator('.post-title')).toBeVisible()
  const geometry = await page.evaluate(() => {
    const article = document.querySelector('article')?.getBoundingClientRect()
    const title = document.querySelector('.post-title > span')?.getBoundingClientRect()
    const tocElement = document.querySelector<HTMLElement>('#toc-container')
    const toc = tocElement?.getBoundingClientRect()
    const topbar = document.querySelector('.post-topbar')?.getBoundingClientRect()
    const tocVisible = tocElement ? getComputedStyle(tocElement).display !== 'none' : false

    return {
      article: article && { left: article.left, right: article.right, width: article.width },
      documentOverflow: document.documentElement.scrollWidth - window.innerWidth,
      titleTop: title?.top,
      toc: toc && { left: toc.left, right: toc.right, top: toc.top, width: toc.width },
      tocVisible,
      topbar: topbar && { left: topbar.left, right: topbar.right, top: topbar.top },
      viewportWidth: window.innerWidth,
    }
  })

  expect(geometry.documentOverflow).toBeLessThanOrEqual(1)
  expect(geometry.article).toBeTruthy()
  expect(geometry.topbar).toBeTruthy()
  expect(geometry.article!.left).toBeGreaterThanOrEqual(0)
  expect(geometry.article!.right).toBeLessThanOrEqual(geometry.viewportWidth + 1)
  expect(geometry.topbar!.top).toBeGreaterThanOrEqual(0)
  expect(geometry.topbar!.right).toBeLessThanOrEqual(geometry.viewportWidth + 1)

  if (width >= 1280) {
    expect(geometry.tocVisible).toBe(true)
    expect(geometry.toc).toBeTruthy()
    expect(geometry.article!.width).toBeGreaterThanOrEqual(790)
    expect(geometry.article!.width).toBeLessThanOrEqual(810)
    expect(geometry.toc!.left - geometry.article!.right).toBeGreaterThanOrEqual(8)
    expect(geometry.toc!.right).toBeLessThanOrEqual(geometry.viewportWidth + 1)
    expect(geometry.article!.left).toBeGreaterThan(geometry.viewportWidth - geometry.toc!.right)
    expect(Math.abs(geometry.toc!.top - geometry.titleTop!)).toBeLessThanOrEqual(2)
  }
  else {
    expect(geometry.tocVisible).toBe(false)
  }

  await testInfo.attach('layout-geometry', {
    body: JSON.stringify(geometry, null, 2),
    contentType: 'application/json',
  })
  await page.screenshot({
    animations: 'disabled',
    fullPage: true,
    path: testInfo.outputPath(`article-${width}.png`),
  })
})

test('article language alternates point to real translations', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'layout-1440', 'SEO metadata only needs one browser project')

  await page.goto('/posts/attention-and-finitude/')
  const metadata = await page.locator('link[rel="alternate"][hreflang]').evaluateAll(links => links.map(link => ({
    href: (link as HTMLLinkElement).href,
    lang: link.getAttribute('hreflang'),
  })))

  expect(metadata).toEqual([
    { href: 'https://example.com/posts/attention-and-finitude/', lang: 'en' },
    { href: 'https://example.com/zh/posts/attention-and-finitude/', lang: 'zh' },
    { href: 'https://example.com/posts/attention-and-finitude/', lang: 'x-default' },
  ])
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://example.com/posts/attention-and-finitude/',
  )
})
