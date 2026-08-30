import type { APIRoute } from 'astro'
import { base } from '@/config'

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(`${base}/sitemap-index.xml`, site)

  const robotsTxt = `${[
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapURL.href}`,
  ].join('\n')}\n`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
