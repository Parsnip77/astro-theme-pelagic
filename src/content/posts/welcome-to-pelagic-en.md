---
title: Welcome to Pelagic
published: 2026-01-15
description: A short introduction to Pelagic and the ideas behind its typography-first reading experience.
tags:
  - Pelagic
  - Guide
draft: false
pin: 1
toc: true
bodyFont: garamond
lang: en
abbrlink: welcome-to-pelagic
---

Pelagic is a minimal, multilingual Astro blog theme for writing that should feel calm on screen. It keeps the home page quiet and gives long articles a wide reading column, restrained navigation, and a margin table of contents on large screens.

## Begin with the essentials

The site is intentionally useful before you add integrations. Replace the identity fields in `src/config.ts`, edit the About pages, and start writing in `src/content/posts/`. Analytics, a CMS, profile cards, and comments are all optional.

:::note[Two default languages]
This starter includes English and Simplified Chinese. They demonstrate translated routes without forcing every post to have a translation.
:::

## Typography is part of the content

Latin titles use EB Garamond. Article prose can use the same face or the original sans-serif stack, selected globally or in a post's front matter. CJK glyphs, code, and mathematics retain an independently tuned auxiliary size so mixed writing stays balanced.

> A theme should give words a place to breathe, then get out of their way.

## Make it yours

The next useful steps are deliberately small:

1. Set the site title, author, footer links, and languages.
2. Replace the example About pages.
3. Write a draft with `pnpm new-post my-first-post`.
4. Run `pnpm verify` before publishing.
5. Follow the deployment guide for GitHub Pages or another static host.

The companion [writing showcase](../writing-showcase/) demonstrates the supported Markdown extensions. Repository documentation covers [configuration](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/configuration.md), [content authoring](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/content.md), and [deployment](https://github.com/Parsnip77/astro-theme-pelagic/blob/main/docs/deployment.md).
