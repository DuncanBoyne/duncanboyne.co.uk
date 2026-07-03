<script lang="ts">
	import { ArrowLeft, ArrowUpRight, Check } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reports } from '$lib/reports';
	import type { PageData } from './$types';

	export let data: PageData;

	$: report = data.report;
	$: related = reports.filter((r) => r.category === report.category && r.slug !== report.slug);
</script>

<Seo
	title="{report.title} | Report Demo | Duncan Boyne"
	description={report.summary}
	path="/reports/{report.slug}"
	image={report.thumbnail ?? '/headshot.png'}
	type="article"
/>

<article>
	<!-- Back link -->
	<div class="post-nav">
		<div class="wrap">
			<a href="/reports" class="back-link">
				<ArrowLeft class="w-4 h-4" /> Report demos
			</a>
		</div>
	</div>

	<div class="wrap">
		<header class="post-header">
			<p class="post-eyebrow">
				<span>{report.platform}</span>
				<span class="meta-sep" aria-hidden="true"></span>
				<span>{report.category}</span>
			</p>
			<h1 class="post-title">{report.title}</h1>
			{#if report.tags?.length}
				<div class="post-tags">
					{#each report.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<!-- Embed -->
		{#if report.embedUrl}
			<div class="embed" style="aspect-ratio: {report.aspectRatio ?? '16 / 9'}">
				<iframe
					title="{report.title} — interactive Power BI report"
					src={report.embedUrl}
					frameborder="0"
					allowfullscreen
					loading="lazy"
				></iframe>
			</div>
		{:else}
			<div class="embed embed--pending" style="aspect-ratio: {report.aspectRatio ?? '16 / 9'}">
				<div class="embed-placeholder">
					<span class="embed-badge">Coming soon</span>
					<p class="embed-msg">The live, interactive Power BI report will appear here.</p>
				</div>
			</div>
		{/if}

		<div class="report-body">
			<p class="report-summary">{report.summary}</p>

			{#if report.highlights?.length}
				<h2 class="body-head">What this report demonstrates</h2>
				<ul class="highlights">
					{#each report.highlights as item}
						<li><span class="hl-ico"><Check class="ico" aria-hidden="true" /></span> <span>{item}</span></li>
					{/each}
				</ul>
			{/if}

			{#if report.dataNote}
				<p class="data-note">{report.dataNote}</p>
			{/if}
		</div>

		{#if related.length}
			<div class="related">
				<h2 class="body-head">Same report, other platforms</h2>
				<ul class="related-list">
					{#each related as r}
						<li>
							<a href="/reports/{r.slug}" class="related-link">
								<span class="related-marker" aria-hidden="true"></span>
								<span class="related-platform">{r.platform}</span>
								<span class="related-arrow"><ArrowUpRight class="ico" /></span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="post-footer">
			<a href="/reports" class="back-link"><ArrowLeft class="w-4 h-4" /> All report demos</a>
		</div>
	</div>
</article>

<style>
	.wrap {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 5vw, 3.5rem);
	}

	/* Nav */
	.post-nav {
		border-bottom: 1px solid var(--color-border);
		padding: 1rem 0;
		background: var(--color-surface);
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.3s;
	}
	.back-link:hover { color: var(--color-accent); }

	/* Header */
	.post-header {
		padding: clamp(2.5rem, 5vw, 4rem) 0 2rem;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 2.5rem;
	}
	.post-eyebrow {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.meta-sep { display: inline-block; width: 0.4rem; height: 0.4rem; background: var(--color-bauhaus); }
	.post-title {
		font-size: clamp(1.8rem, 5vw, 3.5rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0 0 1.25rem;
	}
	.post-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
	.tag {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.25rem 0.6rem;
		border: 1.5px solid var(--color-border);
		color: var(--color-muted);
	}

	/* Embed */
	.embed { width: 100%; border: 1px solid var(--color-border); background: var(--color-surface); margin-bottom: 2.5rem; }
	.embed iframe { width: 100%; height: 100%; display: block; border: 0; }
	.embed--pending { display: grid; place-items: center; }
	.embed-placeholder { text-align: center; padding: 1.5rem; }
	.embed-badge {
		display: inline-block; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
		text-transform: uppercase; padding: 0.3rem 0.7rem; margin-bottom: 0.85rem;
		background: var(--color-accent); color: var(--color-on-accent);
	}
	.embed-msg { color: var(--color-muted); font-size: 0.95rem; margin: 0; max-width: 34ch; }

	/* Write-up */
	.report-body { max-width: 68ch; }
	.report-summary { font-size: 1.15rem; line-height: 1.7; color: var(--color-text); margin: 0 0 2rem; }
	.body-head { font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 800; letter-spacing: -0.02em; color: var(--color-text); margin: 0 0 1rem; }
	.highlights { list-style: none; margin: 0 0 2rem; padding: 0; display: flex; flex-direction: column; gap: 0.65rem; }
	.highlights li { display: flex; align-items: flex-start; gap: 0.6rem; color: var(--color-text); line-height: 1.6; }
	.hl-ico { color: var(--color-accent); flex-shrink: 0; margin-top: 0.2rem; display: inline-flex; }
	.data-note {
		font-size: 0.82rem; color: var(--color-muted); margin: 0; font-style: italic;
		padding: 0.85rem 1.1rem;
		border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-accent) 5%, transparent);
	}

	/* Related */
	.related { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--color-border); }
	.related-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--color-border); }
	.related-list li { border-bottom: 1.5px solid var(--color-border); }
	.related-link {
		display: grid; grid-template-columns: 0.7rem 1fr 1rem; align-items: center; gap: 1rem;
		padding: 1rem 0; text-decoration: none;
	}
	.related-marker { width: 0.7rem; height: 0.7rem; background: var(--color-accent); transition: transform 0.4s ease; }
	.related-link:hover .related-marker { transform: rotate(45deg); }
	.related-platform { font-size: clamp(1.05rem, 2vw, 1.3rem); font-weight: 800; color: var(--color-text); transition: color 0.2s; }
	.related-link:hover .related-platform { color: var(--color-accent); }
	.related-arrow { color: var(--color-muted); display: inline-flex; align-items: center; transition: color 0.2s, transform 0.2s; }
	.related-link:hover .related-arrow { color: var(--color-accent); transform: translate(2px, -2px); }

	/* Footer */
	.post-footer { padding: 3rem 0 4rem; border-top: 1px solid var(--color-border); margin-top: 3rem; }
</style>
