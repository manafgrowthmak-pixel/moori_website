# Moori Website

Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript and Tailwind CSS v4.

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                   |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start the dev server           |
| `npm run build`     | Create a production build      |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | Run ESLint                     |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Project structure

```
src/
  app/            Routes, layouts and global styles (App Router)
    layout.tsx    Root layout, fonts and site metadata
    page.tsx      Home page
    globals.css   Tailwind import and theme tokens
  components/     Homepage sections (hero, selected work, process, form, footer…)
  content/
    site.ts       All homepage copy and data, sourced from the research docs
public/
  images/         Optimised project photography used on the site
```

Import from `src/` using the `@/` alias, e.g. `import { Button } from "@/components/button"`.

## Environment variables

Put local secrets in `.env.local`. It is git-ignored. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
