import type { Language } from '@/i18n/config'

interface Translation {
  title: string
  subtitle: string
  description: string
  posts: string
  tags: string
  about: string
  toc: string
}

export const ui: Record<Language, Translation> = {
  'de': {
    title: 'Pelagic',
    subtitle: 'Notizen, Essays & Forschung',
    description: 'Pelagic | Notizen, Essays & Forschung',
    posts: 'Beiträge',
    tags: 'Schlagwörter',
    about: 'Über',
    toc: 'Inhaltsverzeichnis',
  },
  'en': {
    title: 'Pelagic',
    subtitle: 'Notes, Essays & Research',
    description: 'Pelagic | A typography-first Astro blog theme',
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    toc: 'Table of Contents',
  },
  'es': {
    title: 'Pelagic',
    subtitle: 'Notas, ensayos e investigación',
    description: 'Pelagic | Notas, ensayos e investigación',
    posts: 'Artículos',
    tags: 'Etiquetas',
    about: 'Sobre',
    toc: 'Índice',
  },
  'fr': {
    title: 'Pelagic',
    subtitle: 'Notes, essais et recherche',
    description: 'Pelagic | Notes, essais et recherche',
    posts: 'Articles',
    tags: 'Étiquettes',
    about: 'À propos',
    toc: 'Table des matières',
  },
  'ja': {
    title: 'Pelagic',
    subtitle: 'ノート、エッセイ、研究',
    description: 'Pelagic | ノート、エッセイ、研究',
    posts: '記事',
    tags: 'タグ',
    about: '概要',
    toc: '目次',
  },
  'ko': {
    title: 'Pelagic',
    subtitle: '노트, 에세이 및 연구',
    description: 'Pelagic | 노트, 에세이 및 연구',
    posts: '게시물',
    tags: '태그',
    about: '소개',
    toc: '목차',
  },
  'pl': {
    title: 'Pelagic',
    subtitle: 'Notatki, eseje i badania',
    description: 'Pelagic | Notatki, eseje i badania',
    posts: 'Artykuły',
    tags: 'Tagi',
    about: 'O stronie',
    toc: 'Spis treści',
  },
  'pt': {
    title: 'Pelagic',
    subtitle: 'Notas, ensaios e pesquisa',
    description: 'Pelagic | Notas, ensaios e pesquisa',
    posts: 'Artigos',
    tags: 'Tags',
    about: 'Sobre',
    toc: 'Sumário',
  },
  'ru': {
    title: 'Pelagic',
    subtitle: 'Заметки, эссе и исследования',
    description: 'Pelagic | Заметки, эссе и исследования',
    posts: 'Посты',
    tags: 'Теги',
    about: 'О себе',
    toc: 'Оглавление',
  },
  'zh': {
    title: 'Pelagic',
    subtitle: '笔记、随笔与研究',
    description: 'Pelagic｜注重字体与排版的 Astro 博客主题',
    posts: '文章',
    tags: '标签',
    about: '关于',
    toc: '目录',
  },
  'zh-tw': {
    title: 'Pelagic',
    subtitle: '筆記、隨筆與研究',
    description: 'Pelagic｜注重字體與排版的 Astro 部落格主題',
    posts: '文章',
    tags: '標籤',
    about: '關於',
    toc: '目錄',
  },
}
