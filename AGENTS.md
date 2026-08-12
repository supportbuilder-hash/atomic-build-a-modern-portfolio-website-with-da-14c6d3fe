# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

## Goal
Build a modern dark-mode portfolio website with animated hero, projects showcase, about, and contact pages using Next.js 14 App Router and TypeScript.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0f0f0f`, `--card: #1a1a1a`, `--border: #2e2e2e`, `--foreground: #f5f5f5`, `--muted-foreground: #a1a1aa`, `--primary: #a855f7`, `--accent: #d8b4fe`, `--brand-primary: #18181b`, `--brand-on-primary: #ffffff`, `--brand-secondary: #3f3f46`, `--brand-accent: #a855f7`, `--brand-background: #0f0f0f`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `contact`, `cta`, `footer`, `hero`, `nav`, `projects`, `testimonials`, `values`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
