<script lang="ts">
	import { ArrowUpRight, LayoutDashboard } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reports, reportCategories, reportPlatforms } from '$lib/reports';

	let activeCategory: string = 'all';
	let activePlatform: string = 'all';

	$: filtered = reports.filter(
		(r) =>
			(activeCategory === 'all' || r.category === activeCategory) &&
			(activePlatform === 'all' || r.platform === activePlatform)
	);
</script>

<Seo
	title="Live Report Demos | Duncan Boyne"
	description="A gallery of live, interactive Power BI report demos for ERP and CRM platforms — Sage 200, Dynamics 365, Epicor, Infor Visual and more. Built on demo data, embedded and explorable in the browser."
	path="/reports"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream rp-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle rp-hero-disc"></span>
		<span class="b-shape rp-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Report demos</p>
		<h1 class="page-title">Live reports<br /><span class="accent-line">you can click into</span></h1>
		<p class="hero-copy">
			Interactive Power BI reports for the ERP and CRM systems finance and operations teams actually run —
			Sage 200, Dynamics 365, Epicor, Infor Visual and more. Filter by platform or report type, open one,
			and explore the real thing. Every report is built on fictional demo data.
		</p>
	</div>
</section>

<!-- Filters — utility strip, not a poster field -->
<section class="filters-bar">
	<div class="wrap">
		<div class="filter-group">
			<span class="filter-label">Report type</span>
			<div class="filter-list" role="tablist" aria-label="Filter by report type">
				<button
					class="filter-btn"
					class:active={activeCategory === 'all'}
					role="tab"
					aria-selected={activeCategory === 'all'}
					on:click={() => (activeCategory = 'all')}
				>
					All
				</button>
				{#each reportCategories as category}
					<button
						class="filter-btn"
						class:active={activeCategory === category}
						role="tab"
						aria-selected={activeCategory === category}
						on:click={() => (activeCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<div class="filter-group">
			<span class="filter-label">Platform</span>
			<div class="filter-list" role="tablist" aria-label="Filter by platform">
				<button
					class="filter-btn"
					class:active={activePlatform === 'all'}
					role="tab"
					aria-selected={activePlatform === 'all'}
					on:click={() => (activePlatform = 'all')}
				>
					All
				</button>
				{#each reportPlatforms as platform}
					<button
						class="filter-btn"
						class:active={activePlatform === platform}
						role="tab"
						aria-selected={activePlatform === platform}
						on:click={() => (activePlatform = platform)}
					>
						{platform}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══ GRID — surface field ═════════════════════════════════════════════ -->
<section class="band band--surface">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle rp-grid-disc"></span>
	</div>
	<div class="wrap">
		{#if filtered.length === 0}
			<p class="msg-empty">No reports match that combination yet — more are on the way.</p>
		{:else}
			<ul class="tile-grid reports-grid">
				{#each filtered as report (report.slug)}
					<li class="tile" class:tile--pending={!report.embedUrl}>
						<a href="/reports/{report.slug}" class="tile-link">
							<span class="tile-corner" aria-hidden="true"></span>
							{#if report.thumbnail}
								<span class="report-thumb">
									<img src={report.thumbnail} alt="{report.title} preview" loading="lazy" />
								</span>
							{/if}
							<div class="report-head">
								<span class="tile-kind"><LayoutDashboard class="ico" aria-hidden="true" /> {report.platform}</span>
								{#if !report.embedUrl}<span class="report-status">Coming soon</span>{/if}
							</div>
							<h2 class="tile-name">{report.title}</h2>
							<p class="tile-desc">{report.summary}</p>
							<div class="repo-tags" aria-label="{report.title} topics">
								{#each report.tags as tag}<span class="repo-tag">{tag}</span>{/each}
							</div>
							<ArrowUpRight class="tile-arrow ico" />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle rp-cta-disc"></span>
		<span class="b-shape rp-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want one of these on your data?</p>
		<a href="/contact" class="cta-main">
			<span>Let's build your report</span>
			<ArrowUpRight class="cta-ico" aria-hidden="true" />
		</a>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, tile-grid, buttons,
	   filter-btn base and the CTA pattern live in app.css (Bauhaus poster kit).
	   This block keeps only what's specific to the Reports gallery. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.rp-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.rp-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.rp-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(2.5rem, 9vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 1.5rem; }
	.accent-line { color: var(--color-accent); }
	.hero-copy { color: var(--color-muted); font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.7; max-width: 64ch; margin: 0; }

	/* ══ FILTERS ════════════════════════════════════════════════════ */
	.filters-bar { padding: 1.25rem 0; border-bottom: 1px solid var(--color-border); background: var(--color-surface); }
	.filter-group { display: flex; align-items: baseline; gap: 0.9rem; flex-wrap: wrap; }
	.filter-group + .filter-group { margin-top: 0.85rem; }
	.filter-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); min-width: 6.5rem; }
	.filter-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.filter-btn {
		padding: 0.4rem 0.9rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em;
		border: 1.5px solid var(--color-border); color: var(--color-muted); background: transparent;
		cursor: pointer; transition: border-color 0.3s, color 0.3s, background 0.3s;
	}
	.filter-btn:hover { color: var(--color-text); border-color: var(--color-text); }
	.filter-btn.active { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }

	/* ══ GRID ═══════════════════════════════════════════════════════ */
	.rp-grid-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); right: clamp(-8rem, -9vw, -4rem);
	}
	.reports-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	.report-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
	.tile-kind { display: inline-flex; align-items: center; gap: 0.4rem; }
	.report-status {
		font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
		padding: 0.2rem 0.5rem; border: 1.5px solid var(--rule-soft); color: var(--fg-muted); white-space: nowrap;
	}
	.tile--pending .tile-link { opacity: 0.85; transition: opacity 0.3s; }
	.tile--pending .tile-link:hover { opacity: 1; }
	.report-thumb { display: block; aspect-ratio: 16 / 9; overflow: hidden; margin-bottom: 1rem; border: 1px solid var(--rule-soft); }
	.report-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
	@media (max-width: 900px) { .reports-grid { grid-template-columns: 1fr; } }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.rp-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); left: clamp(-6rem, -8vw, -2rem);
	}
	.rp-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; right: 0; }

	@media (max-width: 560px) {
		.filter-group { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
		.filter-label { min-width: 0; }
	}
</style>
