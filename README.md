# duncanboyne.co.uk (legacy SvelteKit site — RETIRED)

**This repo no longer serves duncanboyne.co.uk.** The live site has been the
Astro build in the private repo `DuncanBoyne/duncanboyne-site`, deployed to
Cloudflare Pages, since the domain cutover on 18 July 2026. Make live-site
changes there, not here.

The GitHub Pages deploy workflow (daily cron + push) was removed on
2 September 2026: it shared the Supabase blog with the live site, so newly
published posts referencing pages and cover images that only exist in the
Astro build made the prerender here fail every morning. Nothing consumed the
GitHub Pages output after the cutover, so the workflow was retired rather
than patched. It is recoverable from git history
(`.github/workflows/static.yml`) if this build is ever needed again.

Kept as an archive: the SvelteKit source remains the reference for the
personal sections (reading, anime, gaming, gallery, talks) that were
deliberately not ported to the consultancy site.
