# Liu Huikang — Security Research Blog

Astro-based static blog for security research, penetration testing, OSCP notes and technical writeups.

## Stack

- Astro 7
- TypeScript
- Markdown / MDX content
- GitHub Pages + GitHub Actions
- Light / dark mode
- RSS, sitemap and robots.txt
- Content-driven archive, categories and tags
- Client-side search

## Content

Articles live under `src/content/posts/` and use typed frontmatter:

- `title`
- `description`
- `pubDate`
- `type`: `oscp | pentest | research | notes`
- `platform`
- `os`
- `difficulty`
- `tags`

The content layer is designed so future OSCP writeups generated from ChatGPT conversations can be published directly as Markdown instead of editing generated HTML.

## Routes

- `/` — latest research
- `/oscp/`, `/pentest/`, `/research/`, `/notes/` — content categories
- `/posts/<slug>/` — article pages
- `/tags/` and `/tags/<tag>/` — tags
- `/archives/` — chronological archive
- `/search/` — client-side search
- `/rss.xml` — RSS feed
- `/sitemap.xml` — XML sitemap

## Migration policy

The old Hexo-generated site has been removed from `main`. Only content that could be verified from the repository was migrated; articles without recoverable substantive content were intentionally deleted rather than reconstructed. Bandit 1–34 and Natas 1–10 are now maintained as Markdown content.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```
