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

<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">GitHub &amp; Open Source</p>
		<h1 class="page-title">Things I<br><span class="accent-line">build in public</span></h1>
		<p class="hero-copy">
			Some of this is polished. Some of it is practical. The common thread is that it is useful enough to share:
			Power BI resources, AI workflows, Claude skills, community sites and reusable starter projects.
		</p>
		<div class="hero-actions">
			<a href="https://github.com/DuncanBoyne" target="_blank" rel="noopener noreferrer" class="btn-primary-link">
				<Github class="icon" aria-hidden="true" />
				View GitHub profile
				<ArrowUpRight class="icon-small" aria-hidden="true" />
			</a>
		</div>
	</div>
</section>

<section class="stats-section">
	<div class="wrap">
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-item">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="projects-section">
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Open source</p>
			<h2 class="section-title">MIT-licensed tools and skills</h2>
			<p class="section-copy">
				These are the repos I am most comfortable calling open source: they have an explicit MIT license
				and are intended for other people to fork, adapt, learn from or contribute to.
			</p>
		</div>

		<div class="project-grid">
			{#each openSourceProjects as project}
				<article class="project-card featured-card">
					<div class="project-top">
						<div>
							<p class="project-kind">{projectKindLabel(project.kind)}</p>
							<h3>{project.name}</h3>
						</div>
						<Github class="project-icon" aria-hidden="true" />
					</div>
					<p class="project-description">{project.description}</p>
					<div class="tag-list" aria-label="{project.name} topics">
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<div class="project-meta">
						<span>{project.repo}</span>
						{#if project.license}<span>{project.license}</span>{/if}
					</div>
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="project-link">
						View repo <ArrowUpRight class="icon-small" aria-hidden="true" />
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="projects-section projects-section--alt">
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Public project repos</p>
			<h2 class="section-title">Source I keep visible</h2>
			<p class="section-copy">
				These are public repositories for experiments, starter projects and this site. Some are reference material,
				some are useful examples, and some are simply a record of the way I build.
			</p>
		</div>

		<div class="project-list">
			{#each publicProjects as project}
				<a href={project.href} target="_blank" rel="noopener noreferrer" class="project-row">
					<div class="project-row-main">
						<span class="project-row-kind">{projectKindLabel(project.kind)}</span>
						<h3>{project.name}</h3>
						<p>{project.description}</p>
					</div>
					<div class="project-row-meta">
						{#if project.language}<span>{project.language}</span>{/if}
						<span>{project.repo}</span>
					</div>
					<ArrowUpRight class="row-icon" aria-hidden="true" />
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="projects-section">
	<div class="wrap">
		<div class="section-head">
			<p class="section-label">Community builds</p>
			<h2 class="section-title">Sites behind the groups</h2>
			<p class="section-copy">
				Community work has code behind it too: event sites, user group pages and the practical bits that make
				people able to find the next thing.
			</p>
		</div>

		<div class="community-grid">
			{#each communityProjects as project}
				<article class="community-card">
					<p class="project-kind">{projectKindLabel(project.kind)}</p>
					<h3>{project.name}</h3>
					<p>{project.description}</p>
					<div class="tag-list" aria-label="{project.name} topics">
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="project-link">
						View repo <ExternalLink class="icon-small" aria-hidden="true" />
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="cta-section">
	<div class="wrap">
		<p class="cta-pre">Found something useful?</p>
		<a href="https://github.com/DuncanBoyne" target="_blank" rel="noopener noreferrer" class="cta-main">
			<span>Fork it, raise an issue, or nick the idea</span>
			<ArrowUpRight class="cta-icon" aria-hidden="true" />
		</a>
	</div>
</section>

<style>
	.wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3.5rem); }

	.page-hero {
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(2.5rem, 5vw, 4rem);
		border-bottom: 3px solid var(--color-accent3);
	}
	.eyebrow,
	.section-label,
	.project-kind,
	.project-row-kind,
	.cta-pre {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0;
	}
	.page-title {
		font-size: clamp(3rem, 10vw, 8rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 0.9;
		color: var(--color-text);
		margin: 0.75rem 0 1.5rem;
		max-width: 10ch;
	}
	.accent-line { color: var(--color-accent); }
	.hero-copy {
		color: var(--color-muted);
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.7;
		max-width: 62ch;
		margin: 0;
	}
	.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
	.btn-primary-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: var(--color-text);
		color: var(--color-bg);
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 800;
	}
	.btn-primary-link:hover { opacity: 0.85; }
	:global(.icon) { width: 1rem; height: 1rem; }
	:global(.icon-small) { width: 0.9rem; height: 0.9rem; flex-shrink: 0; }

	.stats-section {
		padding: clamp(2rem, 4vw, 3rem) 0;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		background: var(--color-border);
		border: 1px solid var(--color-border);
	}
	.stat-item {
		background: var(--color-bg);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.stat-value {
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 900;
		line-height: 1;
		color: var(--color-text);
	}
	.stat-label { font-size: 0.78rem; font-weight: 700; color: var(--color-muted); }

	.projects-section {
		padding: clamp(3rem, 6vw, 5rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.projects-section--alt { background: var(--color-surface); }
	.section-head { margin-bottom: 2rem; max-width: 68ch; }
	.section-title {
		font-size: clamp(1.8rem, 4vw, 3.5rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-text);
		margin: 0.6rem 0 1rem;
	}
	.section-copy {
		color: var(--color-muted);
		font-size: 0.98rem;
		line-height: 1.7;
		margin: 0;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}
	.project-card,
	.community-card {
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100%;
		min-width: 0;
	}
	.featured-card { border-top: 3px solid var(--color-accent); }
	.project-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}
	:global(.project-icon) { width: 1.25rem; height: 1.25rem; color: var(--color-accent); flex-shrink: 0; }
	.project-card h3,
	.community-card h3 {
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--color-text);
		margin: 0.35rem 0 0;
	}
	.project-description,
	.community-card p {
		color: var(--color-muted);
		font-size: 0.9rem;
		line-height: 1.65;
		margin: 0;
	}
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
	.tag {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--color-muted);
		border: 1px solid var(--color-border);
		padding: 0.3rem 0.55rem;
	}
	.project-meta {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		color: var(--color-muted);
		font-size: 0.75rem;
		font-weight: 700;
		word-break: break-word;
	}
	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 800;
		text-decoration: none;
	}
	.project-link:hover { color: var(--color-accent2); }

	.project-list {
		border-top: 1px solid var(--color-border);
	}
	.project-row {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto 1rem;
		gap: 1.5rem;
		align-items: center;
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--color-border);
		text-decoration: none;
	}
	.project-row-main h3 {
		color: var(--color-text);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		font-weight: 800;
		margin: 0.25rem 0;
		transition: color 0.2s;
	}
	.project-row-main p {
		color: var(--color-muted);
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
		max-width: 70ch;
	}
	.project-row-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
		color: var(--color-muted);
		font-size: 0.72rem;
		font-weight: 700;
		text-align: right;
		min-width: 0;
		overflow-wrap: anywhere;
	}
	:global(.row-icon) {
		color: var(--color-muted);
		width: 1rem;
		height: 1rem;
		transition: color 0.2s, transform 0.2s;
	}
	.project-row:hover h3 { color: var(--color-accent2); }
	.project-row:hover :global(.row-icon) {
		color: var(--color-accent2);
		transform: translate(2px, -2px);
	}

	.community-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.cta-section { padding: clamp(5rem, 10vw, 9rem) 0; }
	.cta-pre { color: var(--color-muted); margin-bottom: 1rem; }
	.cta-main {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: clamp(2rem, 6vw, 5rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.3s;
		max-width: 13ch;
		overflow-wrap: anywhere;
	}
	.cta-main:hover { color: var(--color-accent2); }
	.cta-main span { min-width: 0; }
	:global(.cta-icon) {
		width: clamp(1.5rem, 4vw, 3rem);
		height: clamp(1.5rem, 4vw, 3rem);
		flex-shrink: 0;
	}

	@media (max-width: 900px) {
		.project-grid { grid-template-columns: 1fr; }
		.community-grid { grid-template-columns: 1fr; }
		.project-row { grid-template-columns: minmax(0, 1fr) 1rem; }
		.project-row-main { min-width: 0; }
		.project-row-meta {
			grid-column: 1 / -1;
			grid-row: 2;
			align-items: flex-start;
			text-align: left;
		}
	}

	@media (max-width: 640px) {
		.stats-grid { grid-template-columns: 1fr; }
		.hero-actions { align-items: stretch; }
		.btn-primary-link { justify-content: center; width: 100%; }
	}
</style>
