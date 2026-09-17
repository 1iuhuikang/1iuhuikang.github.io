# Liu Huikang — Security Research Blog

This repository is the static site for security research, penetration testing, OSCP notes and technical writeups.

## Architecture

- Astro static site
- Markdown/MDX content under `src/content/posts/`
- Typed content schema in `src/content.config.ts`
- UI/layout under `src/layouts/` and `src/pages/`
- GitHub Actions builds and deploys the generated `dist/` directory to GitHub Pages

## Content model

Each post has structured frontmatter:

- `title`
- `description`
- `pubDate`
- `type`: `oscp | pentest | research | notes`
- `platform`
- `os`
- `difficulty`
- `tags`
- `legacyPath`
- `migrated`

The goal is to make future ChatGPT-generated writeups directly publishable as Markdown without editing generated HTML.

## Migration policy

The old Hexo output remains untouched on `main` until the Astro replacement is reviewed. Historical posts are migrated only from content that can be verified in the existing repository. Missing source Markdown is not reconstructed from memory; those posts are marked for later recovery.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```
