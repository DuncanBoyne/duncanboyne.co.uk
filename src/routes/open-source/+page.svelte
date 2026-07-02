<script lang="ts">
	import { ArrowUpRight, ExternalLink } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import { projects, projectKindLabel } from '$lib/projects';

	const openSourceProjects = projects.filter((project) => project.kind === 'open-source');
	const publicProjects = projects.filter((project) => project.kind === 'public-project');
	const communityProjects = projects.filter((project) => project.kind === 'community');

	const stats = [
		{ label: 'Featured repos', value: projects.length.toString() },
		{ label: 'MIT licensed', value: openSourceProjects.length.toString() },
		{ label: 'Power BI and AI focused', value: '4' }
	];
</script>

<Seo
	title="Open Source & GitHub Projects | Duncan Boyne"
	description="Selected GitHub repositories, open-source tools, Claude Code skills, Power BI experiments and community site projects by Duncan Boyne."
	path="/open-source"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream os-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle os-hero-disc"></span>
		<span class="b-shape os-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">GitHub &amp; Open Source</p>
		<h1 class="page-title">Things I<br><span class="accent-line">build in public</span></h1>
		<p class="hero-copy">
			Some of this is polished. Some of it is practical. The common thread is that it is useful enough to share:
			Power BI resources, AI workflows, Claude skills, community sites and reusable starter projects.
		</p>
		<div class="hero-actions">
			<a href="https://github.com/DuncanBoyne" target="_blank" rel="noopener noreferrer" class="btn-inv">
				<Github class="ico" aria-hidden="true" />
				View GitHub profile
				<ArrowUpRight class="ico" aria-hidden="true" />
			</a>
		</div>
	</div>
</section>

<!-- Stats — utility strip, not a poster field -->
<section class="stats-strip">
	<div class="wrap">
		<div class="stat-grid">
			{#each stats as stat}
				<div class="stat-tile">
					<span class="stat-tile-value">{stat.value}</span>
					<span class="stat-tile-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══ OPEN SOURCE — cream field, 3-col tiles ═══════════════════════════ -->
<section class="band band--cream">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle os-mit-disc"></span>
	</div>
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Open source</p>
			<h2 class="section-title">MIT-licensed tools and skills</h2>
			<p class="section-copy">
				These are the repos I am most comfortable calling open source: they have an explicit MIT license
				and are intended for other people to fork, adapt, learn from or contribute to.
			</p>
		</div>

		<ul class="tile-grid os-grid">
			{#each openSourceProjects as project}
				<li class="tile">
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="tile-link">
						<span class="tile-corner" aria-hidden="true"></span>
						<span class="tile-kind"><Github class="ico" aria-hidden="true" /> {projectKindLabel(project.kind)}</span>
						<h3 class="tile-name">{project.name}</h3>
						<span class="tile-repo">{project.repo}{#if project.license} · {project.license}{/if}</span>
						<p class="tile-desc">{project.description}</p>
						<div class="repo-tags" aria-label="{project.name} topics">
							{#each project.tags as tag}<span class="repo-tag">{tag}</span>{/each}
						</div>
						<ArrowUpRight class="tile-arrow ico" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ PUBLIC REPOS — surface field, always-visible rows ═══════════════ -->
<section class="band band--surface">
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Public project repos</p>
			<h2 class="section-title">Source I keep visible</h2>
			<p class="section-copy">
				These are public repositories for experiments, starter projects and this site. Some are reference material,
				some are useful examples, and some are simply a record of the way I build.
			</p>
		</div>

		<ul class="pub-list">
			{#each publicProjects as project}
				<li class="pub-row">
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="pub-row-link">
						<span class="pub-row-marker" aria-hidden="true"></span>
						<div class="pub-row-main">
							<span class="pub-row-kind">{projectKindLabel(project.kind)}</span>
							<h3 class="pub-row-name">{project.name}</h3>
							<p class="pub-row-desc">{project.description}</p>
						</div>
						<div class="pub-row-meta">
							{#if project.language}<span>{project.language}</span>{/if}
							<span>{project.repo}</span>
						</div>
						<ArrowUpRight class="pub-row-arrow ico" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ COMMUNITY BUILDS — gold field, 2-col tiles ═══════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape os-comm-bar"></span>
	</div>
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Community builds</p>
			<h2 class="section-title">Sites behind the groups</h2>
			<p class="section-copy">
				Community work has code behind it too: event sites, user group pages and the practical bits that make
				people able to find the next thing.
			</p>
		</div>

		<ul class="tile-grid">
			{#each communityProjects as project}
				<li class="tile">
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="tile-link">
						<span class="tile-corner" aria-hidden="true"></span>
						<span class="tile-kind">{projectKindLabel(project.kind)}</span>
						<h3 class="tile-name">{project.name}</h3>
						<p class="tile-desc">{project.description}</p>
						<div class="repo-tags" aria-label="{project.name} topics">
							{#each project.tags as tag}<span class="repo-tag">{tag}</span>{/each}
						</div>
						<ExternalLink class="tile-arrow ico" aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle os-cta-disc"></span>
		<span class="b-shape os-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Found something useful?</p>
		<a href="https://github.com/DuncanBoyne" target="_blank" rel="noopener noreferrer" class="cta-main">
			<span>Fork it, raise an issue, or nick the idea</span>
			<ArrowUpRight class="cta-ico" aria-hidden="true" />
		</a>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, tile-grid,
	   stat-grid, buttons, and the CTA pattern live in app.css (Bauhaus
	   poster kit). This block keeps only what's specific to Open Source's
	   own layout and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.os-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.os-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.os-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 8rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 1.5rem; max-width: 10ch; }
	.accent-line { color: var(--color-accent); }
	.hero-copy { color: var(--color-muted); font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.7; max-width: 62ch; margin: 0; }
	.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }

	/* ══ STATS ══════════════════════════════════════════════════════ */
	.stats-strip { padding: clamp(2rem, 4vw, 3rem) 0; background: var(--color-surface); border-bottom: 1px solid var(--color-border); }

	/* ══ SECTION HEADS ══════════════════════════════════════════════ */
	.section-head { margin-bottom: 2rem; max-width: 68ch; }
	.section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--field-accent); margin: 0; }
	.section-title { font-size: clamp(1.8rem, 4vw, 3.5rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1; color: var(--fg); margin: 0.6rem 0 1rem; }
	.section-copy { color: var(--fg-muted); font-size: 0.98rem; line-height: 1.7; margin: 0; }

	/* ══ OPEN SOURCE TILES ══════════════════════════════════════════ */
	.os-mit-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); right: clamp(-8rem, -9vw, -4rem);
	}
	.tile-kind { display: inline-flex; align-items: center; gap: 0.4rem; }
	.os-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	@media (max-width: 900px) { .os-grid { grid-template-columns: 1fr; } }

	/* ══ PUBLIC REPOS ═══════════════════════════════════════════════ */
	.pub-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--rule-strong); }
	.pub-row { border-bottom: 1.5px solid var(--rule-soft); }
	.pub-row-link {
		display: grid; grid-template-columns: 0.7rem minmax(0, 1fr) auto 1rem; align-items: center;
		gap: 1.5rem; padding: 1.25rem 0; text-decoration: none;
	}
	.pub-row-marker { width: 0.7rem; height: 0.7rem; background: var(--field-accent); transition: transform 0.4s ease; }
	.pub-row-link:hover .pub-row-marker { transform: rotate(45deg); }
	.pub-row-main { min-width: 0; }
	.pub-row-kind { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-muted); }
	.pub-row-name { color: var(--fg); font-size: clamp(1.05rem, 2vw, 1.35rem); font-weight: 800; margin: 0.25rem 0; transition: color 0.2s; }
	.pub-row-link:hover .pub-row-name { color: var(--field-accent); }
	.pub-row-desc { color: var(--fg-muted); font-size: 0.9rem; line-height: 1.6; margin: 0; max-width: 70ch; }
	.pub-row-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem; color: var(--fg-muted); font-size: 0.72rem; font-weight: 700; text-align: right; min-width: 0; overflow-wrap: anywhere; }
	.pub-row-arrow { color: var(--fg-muted); transition: color 0.2s, transform 0.2s; }
	.pub-row-link:hover .pub-row-arrow { color: var(--field-accent); transform: translate(2px, -2px); }

	/* ══ COMMUNITY BUILDS ═══════════════════════════════════════════ */
	.os-comm-bar { width: clamp(5rem, 14vw, 11rem); height: 0.85rem; background: var(--color-on-accent); top: 0; right: 0; opacity: 0.5; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.cta-main { max-width: 13ch; overflow-wrap: anywhere; }
	.cta-main span { min-width: 0; }
	.os-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); left: clamp(-6rem, -8vw, -2rem);
	}
	.os-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; right: 0; }

	@media (max-width: 720px) {
		.pub-row-link { grid-template-columns: 0.7rem minmax(0, 1fr) 1rem; }
		.pub-row-meta { grid-column: 1 / -1; grid-row: 2; align-items: flex-start; text-align: left; padding-left: 1.7rem; }
	}
	@media (max-width: 640px) {
		.hero-actions { align-items: stretch; }
		.btn-inv { justify-content: center; width: 100%; }
	}
</style>
