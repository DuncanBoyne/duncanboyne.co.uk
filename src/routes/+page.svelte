<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { ArrowUpRight } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import { featuredProjects, projectKindLabel } from '$lib/projects';
	import type { PageData } from './$types';

	export let data: PageData;

	const services = [
		{ num: '01', title: 'Power BI & Data Visualisation', desc: 'Dashboards people actually open. Built around the two questions you really have, not the twelve an imagined power user might ask.' },
		{ num: '02', title: 'Automation', desc: "The Monday-morning copy-paste. The email approval chase. The report someone rebuilds by hand every month. I kill those, quietly, so nobody misses them." },
		{ num: '03', title: 'AI Readiness', desc: "AI is only as good as the data under it. So before the shiny part, the unglamorous part: clean it, connect it, make it trustworthy. (Yes, that's the bit nobody sells you.)" }
	];

	let ready = false;

	// A null band means its build/nav-time fetch failed; the band shows its
	// error state with a retry that re-runs the load.
	$: posts = data.posts ?? [];
	$: postsError = data.posts === null;
	$: events = data.events ?? [];
	$: eventsError = data.events === null;

	onMount(() => {
		setTimeout(() => { ready = true; }, 60);
	});
</script>

<Seo
	title="Duncan Boyne | Power BI Consultant in Norfolk (Norwich & Great Yarmouth)"
	description="Power BI consultant based in Norfolk, working across Norwich and Great Yarmouth. Dashboards people actually open, automation, and data & AI readiness for finance and manufacturing teams."
	path="/"
/>

<!-- ══ HERO — poster cover ════════════════════════════════════════════ -->
<section class="hero" class:ready>
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle hero-disc"></span>
		<span class="b-shape hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="hero-grid">
			<div class="cell cell--name">
				<div class="modules" aria-hidden="true">
					<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
				</div>
				<p class="eyebrow">Power BI Consultant · Great Yarmouth, Norfolk</p>
				<h1 aria-label="Duncan Boyne">
					<span class="n-duncan">Duncan</span>
					<span class="n-boyne">Boyne</span>
				</h1>
			</div>
			<div class="cell cell--geo geo-cell-1" aria-hidden="true"><span class="geo geo-quarter geo-gold"></span></div>
			<div class="cell cell--portrait"><img src="/headshot.webp" alt="Duncan Boyne" class="portrait-img" width="660" height="702" fetchpriority="high" /></div>
			<div class="cell cell--geo geo-cell-2" aria-hidden="true"><span class="geo geo-tri geo-red"></span></div>
			<div class="cell cell--tag">
				<p class="tagline">Your data has a story.<br><strong>Let's tell it properly.</strong></p>
				<div class="hero-actions">
					<a href="/services" class="btn-inv">Work with me</a>
					<a href="/contact" class="btn-ghost">Get in touch <ArrowUpRight class="ico" /></a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══ 01 SERVICES — gold field ═══════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle s-disc"></span>
	</div>
	<div class="wrap">
		<header class="phead">
			<span class="phead-index" aria-hidden="true">01</span>
			<div class="phead-main">
				<h2 class="phead-title">What<br>I Do</h2>
				<a href="/services" class="phead-all">All services <ArrowUpRight class="ico" /></a>
			</div>
		</header>

		<ul class="svc-grid">
			{#each services as svc, i}
				<li class="svc-card">
					<div class="svc-card-top">
						<span class="svc-num">{svc.num}</span>
						<span class="svc-glyph geo-glyph-{i}" aria-hidden="true"></span>
					</div>
					<h3 class="svc-title">{svc.title}</h3>
					<p class="svc-desc">{svc.desc}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ 02 WRITING — inverse field ═════════════════════════════════════ -->
<section class="band band--inverse">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle w-disc"></span>
		<span class="b-shape b-circle w-dot"></span>
	</div>
	<div class="wrap">
		<header class="phead">
			<span class="phead-index" aria-hidden="true">02</span>
			<div class="phead-main">
				<h2 class="phead-title">Writing</h2>
				<a href="/blog" class="phead-all">All posts <ArrowUpRight class="ico" /></a>
			</div>
		</header>

		{#if postsError}
			<div class="msg-block" role="alert">
				<p class="msg-empty">That didn't load. Probably me, not you.</p>
				<button type="button" class="msg-retry" on:click={() => invalidateAll()}>Try again <ArrowUpRight class="ico" /></button>
			</div>
		{:else if posts.length === 0}
			<p class="msg-empty">Nothing published yet — the first piece is coming.</p>
		{:else}
			<ul class="row-list">
				{#each posts as post}
					<li class="row-item">
						<a href="/blog/{post.slug}" class="row-link">
							<div class="row-top">
								<span class="row-marker" aria-hidden="true"></span>
								<span class="row-date">{formatDate(post.published_at ?? post.created_at)}</span>
								<span class="row-title">{post.title}</span>
								<ArrowUpRight class="row-arrow ico" />
							</div>
							<div class="row-expand"><div class="row-expand-in">
								{#if post.featured_image}
									<div class="row-thumb-wrap"><img src={post.featured_image} alt={post.title} class="row-thumb" /></div>
								{/if}
								{#if post.excerpt}<p class="row-excerpt">{post.excerpt}</p>{/if}
							</div></div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- ══ 03 OPEN SOURCE — surface field, block tiles ════════════════════ -->
<section class="band band--surface">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle os-disc"></span>
	</div>
	<div class="wrap">
		<header class="phead">
			<span class="phead-index" aria-hidden="true">03</span>
			<div class="phead-main">
				<h2 class="phead-title">Open<br>Source</h2>
				<a href="/open-source" class="phead-all">All projects <ArrowUpRight class="ico" /></a>
			</div>
		</header>

		<ul class="tile-grid">
			{#each featuredProjects as project}
				<li class="tile">
					<a href={project.href} target="_blank" rel="noopener noreferrer" class="tile-link">
						<span class="tile-corner" aria-hidden="true"></span>
						<span class="tile-kind">{project.license ? `${project.license} repo` : projectKindLabel(project.kind)}</span>
						<h3 class="tile-name">{project.name}</h3>
						<span class="tile-repo">{project.repo}</span>
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

<!-- ══ 04 SPEAKING — cream field, timeline track ══════════════════════ -->
<section class="band band--cream">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sp-disc"></span>
		<span class="b-shape sp-bar"></span>
	</div>
	<div class="wrap">
		<header class="phead phead--right">
			<span class="phead-index" aria-hidden="true">04</span>
			<div class="phead-main">
				<h2 class="phead-title">Speaking</h2>
				<a href="/events" class="phead-all">All events <ArrowUpRight class="ico" /></a>
			</div>
		</header>

		{#if eventsError}
			<div class="msg-block" role="alert">
				<p class="msg-empty">Couldn't pull the calendar just now.</p>
				<button type="button" class="msg-retry" on:click={() => invalidateAll()}>Try again <ArrowUpRight class="ico" /></button>
			</div>
		{:else if events.length === 0}
			<p class="msg-empty">Nothing on the calendar right now. Past talks live in <a href="/talks" class="msg-link">the archive</a> — or <a href="/contact" class="msg-link">invite me to your event</a>.</p>
		{:else}
			<ol class="timeline">
				{#each events as ev}
					<li class="tl-node">
						<span class="tl-dot" aria-hidden="true"></span>
						<span class="tl-date">{ev.event_date ? formatDate(ev.event_date) : 'TBC'}</span>
						<h3 class="tl-title">{ev.title}</h3>
						{#if ev.location}<span class="tl-loc">{ev.location}</span>{/if}
						<div class="tl-actions">
							{#if ev.event_url}
								<a href={ev.event_url} target="_blank" rel="noopener" class="ev-btn ev-btn--primary">Sign up <ArrowUpRight class="ico" /></a>
							{/if}
							{#if ev.talk_slug}
								<a href="/talks/{ev.talk_slug}" class="ev-btn ev-btn--ghost">View talk <ArrowUpRight class="ico" /></a>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
		{/if}
	</div>
</section>

<!-- ══ CTA — inverse closer ═══════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle cta-disc"></span>
		<span class="b-shape cta-bar"></span>
		<span class="b-shape b-circle cta-dot"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Got a dashboard nobody opens?</p>
		<a href="mailto:duncan@duncanboyne.co.uk" class="cta-main">Let's talk <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">duncan@duncanboyne.co.uk</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, row-list,
	   tile-grid, timeline, buttons, loading/empty/error states, and the
	   CTA pattern all live in app.css (Bauhaus poster kit). This block
	   keeps only what's specific to the homepage identity lockup and its
	   own bleed-shape positions. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.hero {
		position: relative;
		overflow: hidden;
		padding-top: clamp(2.5rem, 6vw, 5rem);
		padding-bottom: clamp(3rem, 6vw, 5rem);
		border-bottom: 3px solid var(--color-text);
	}
	/* Giant gold disc bleeding off the right; red bar lower-left */
	.hero-disc {
		width: clamp(18rem, 42vw, 40rem);
		height: clamp(18rem, 42vw, 40rem);
		background: var(--color-accent);
		top: 50%;
		right: clamp(-18rem, -16vw, -8rem);
		transform: translateY(-50%);
		opacity: 0.16;
	}
	.hero-bar {
		width: clamp(6rem, 20vw, 16rem);
		height: 0.85rem;
		background: var(--color-bauhaus);
		bottom: clamp(1.5rem, 3vw, 2.5rem);
		left: 0;
	}

	.hero-grid {
		display: grid;
		gap: 1.5px;
		background: var(--color-text);
		border: 1.5px solid var(--color-text);
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto minmax(0, 1fr) auto;
		grid-template-areas:
			"name name name geo1"
			"name name name port"
			"geo2 tag  tag  port";
	}
	.cell {
		background: var(--color-bg);
		position: relative;
		opacity: 0;
		transform: translateY(14px);
		transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.hero.ready .cell { opacity: 1; transform: none; }
	.hero.ready .cell--name { transition-delay: 0.05s; }
	.hero.ready .geo-cell-1 { transition-delay: 0.22s; }
	.hero.ready .cell--portrait { transition-delay: 0.34s; }
	.hero.ready .geo-cell-2 { transition-delay: 0.44s; }
	.hero.ready .cell--tag { transition-delay: 0.5s; }

	.cell--name { grid-area: name; padding: clamp(1.25rem, 3vw, 2.25rem); display: flex; flex-direction: column; justify-content: center; }
	.modules { margin-bottom: clamp(0.9rem, 2vw, 1.5rem); }
	.eyebrow {
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--color-accent); margin: 0 0 clamp(0.75rem, 1.5vw, 1.25rem);
	}
	h1 { margin: 0; line-height: 0.82; letter-spacing: -0.04em; }
	/* Cap tuned so "Duncan" (the wider word at this weight) never exceeds the
	   3-column name cell once the 1100px wrap maxes out (~667px usable). */
	.n-duncan { display: block; font-size: clamp(3rem, 13vw, 11rem); font-weight: 200; color: var(--color-text); }
	.n-boyne { display: block; font-size: clamp(3rem, 13vw, 11rem); font-weight: 900; color: var(--color-accent); }

	.cell--geo { min-height: 88px; overflow: hidden; }
	.geo-cell-1 { grid-area: geo1; }
	.geo-cell-2 { grid-area: geo2; }
	.geo { display: block; width: 100%; height: 100%; }

	.cell--portrait { grid-area: port; overflow: hidden; min-height: 220px; background: var(--color-accent); }
	.portrait-img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }

	.cell--tag { grid-area: tag; padding: clamp(1.1rem, 2.5vw, 1.75rem); display: flex; flex-direction: column; gap: 1.1rem; justify-content: center; }
	.tagline { font-size: clamp(1rem, 1.9vw, 1.35rem); font-weight: 400; line-height: 1.45; color: var(--color-text); margin: 0; }
	.tagline strong { font-weight: 800; color: var(--color-accent2); }
	.hero-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }

	@media (max-width: 767px) {
		.hero-grid {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas: "name name" "port geo1" "tag  tag";
		}
		.geo-cell-2 { display: none; }
		.cell--portrait { min-height: 200px; }
		.cell--geo { min-height: 100px; }
	}

	/* ══ 01 SERVICES bleeds + cards ═════════════════════════════════ */
	.s-disc {
		width: clamp(14rem, 34vw, 30rem); height: clamp(14rem, 34vw, 30rem);
		background: var(--color-text); opacity: 0.14;
		top: clamp(-10rem, -14vw, -6rem); left: clamp(-8rem, -10vw, -4rem);
	}
	.svc-grid {
		list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr);
		gap: 1.5px; background: var(--rule-soft); border: 1.5px solid var(--rule-soft);
	}
	.svc-card { background: var(--field-surface); padding: clamp(1.25rem, 2.5vw, 1.85rem); display: flex; flex-direction: column; min-height: 13rem; }
	.svc-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.1rem; }
	.svc-num { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; line-height: 0.8; letter-spacing: -0.04em; color: var(--fg); opacity: 0.85; }
	.svc-glyph { width: 2rem; height: 2rem; flex-shrink: 0; background: var(--fg); }
	.geo-glyph-0 { border-radius: 50%; }
	.geo-glyph-1 { clip-path: polygon(50% 0, 100% 100%, 0 100%); }
	.geo-glyph-2 { border-radius: 100% 0 0 0; background: var(--color-bauhaus); }
	.svc-title { font-size: clamp(1.05rem, 2.2vw, 1.4rem); font-weight: 800; line-height: 1.15; color: var(--fg); margin: 0 0 0.6rem; }
	.svc-desc { font-size: 0.9rem; line-height: 1.6; color: var(--fg); opacity: 0.82; margin: 0; }
	@media (max-width: 720px) { .svc-grid { grid-template-columns: 1fr; } .svc-card { min-height: 0; } }

	/* ══ 02 WRITING bleeds ══════════════════════════════════════════ */
	.w-disc {
		width: clamp(16rem, 40vw, 34rem); height: clamp(16rem, 40vw, 34rem);
		background: var(--color-bauhaus); opacity: 0.92;
		top: clamp(-9rem, -12vw, -5rem); right: clamp(-13rem, -14vw, -7rem);
	}
	.w-dot {
		width: clamp(3rem, 7vw, 5.5rem); height: clamp(3rem, 7vw, 5.5rem);
		background: var(--color-accent); opacity: 0.9;
		bottom: clamp(-1.5rem, -2vw, -1rem); left: clamp(3rem, 14vw, 11rem);
	}

	/* ══ 03 OPEN SOURCE bleeds ══════════════════════════════════════ */
	.os-disc {
		width: clamp(14rem, 32vw, 28rem); height: clamp(14rem, 32vw, 28rem);
		background: var(--color-text); opacity: 0.07;
		bottom: clamp(-10rem, -14vw, -6rem); left: clamp(-7rem, -8vw, -3rem);
	}

	/* ══ 04 SPEAKING bleeds ═══════════════════════════════════════════ */
	.sp-disc {
		width: clamp(15rem, 38vw, 32rem); height: clamp(15rem, 38vw, 32rem);
		background: var(--color-accent); opacity: 0.16;
		top: 50%; right: clamp(-15rem, -16vw, -8rem); transform: translateY(-50%);
	}
	.sp-bar { width: clamp(5rem, 14vw, 11rem); height: 0.8rem; background: var(--color-bauhaus); top: clamp(2rem, 5vw, 4rem); left: 0; }

	/* ══ CTA bleeds ═══════════════════════════════════════════════════ */
	.cta-disc {
		width: clamp(12rem, 30vw, 24rem); height: clamp(6rem, 15vw, 12rem);
		background: var(--color-accent); border-radius: 100% 100% 0 0;
		bottom: 0; right: clamp(-2rem, 4vw, 5rem);
	}
	.cta-bar { width: clamp(5rem, 14vw, 11rem); height: 0.95rem; background: var(--color-bauhaus); top: 0; left: 0; }
	.cta-dot { width: clamp(2.5rem, 6vw, 4.5rem); height: clamp(2.5rem, 6vw, 4.5rem); background: var(--color-bauhaus); top: clamp(2.5rem, 6vw, 5rem); right: clamp(2rem, 16vw, 13rem); opacity: 0.9; }
</style>
