import type { Language } from '@/i18n/config'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { themeConfig } from '@/config'
import { langMap } from '@/i18n/config'

// Content may contain translations that are not currently enabled for routing.
// `themeConfig.locale.additional` controls generated pages, not valid front matter.
const contentLocales = Object.keys(langMap) as [Language, ...Language[]]

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    // required
    title: z.string(),
    published: z.date(),
    // optional
    description: z.string().optional().default(''),
    updated: z.preprocess(
      val => val === '' ? undefined : val,
      z.date().optional(),
    ),
    tags: z.array(z.string()).optional().default([]),
    // Advanced
    draft: z.boolean().optional().default(false),
    pin: z.number().int().min(0).max(99).optional().default(0),
    toc: z.boolean().optional().default(themeConfig.features.toc),
    bodyFont: z.enum(['garamond', 'sans']).optional(),
    bodyFontSize: z.number().min(14).max(24).optional(),
    bodyAuxFontSize: z.number().min(12).max(24).optional(),
    lang: z.enum(['', ...contentLocales]).optional().default(''),
    abbrlink: z.string().optional().default('').refine(
      abbrlink => !abbrlink || /^[a-z0-9\-]*$/.test(abbrlink),
      { message: 'Abbrlink can only contain lowercase letters, numbers and hyphens' },
    ),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['', ...contentLocales]).optional().default(''),
  }),
})

export const collections = { posts, about }
