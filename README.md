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

The goal is to make future ChatGPT-generated writeups directly publishable as Markdown without editing generated HTML.

## Migration policy

The old Hexo-generated site has been removed from the repository. Only historical posts whose content could be verified from the existing repository were migrated. Articles with no recoverable正文 were removed rather than replaced with invented content.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```
