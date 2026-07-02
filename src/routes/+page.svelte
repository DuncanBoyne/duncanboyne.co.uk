<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import { getPosts, getEvents } from '$lib/supabase';
	import type { Post, Event } from '$lib/types';
	import Seo from '$lib/components/Seo.svelte';
	import { featuredProjects, projectKindLabel } from '$lib/projects';

	const services = [
		{ num: '01', title: 'Power BI & Data Visualisation', desc: 'Dashboards people actually open. Built around the two questions you really have, not the twelve an imagined power user might ask.' },
		{ num: '02', title: 'Automation', desc: "The Monday-morning copy-paste. The email approval chase. The report someone rebuilds by hand every month. I kill those, quietly, so nobody misses them." },
		{ num: '03', title: 'AI Readiness', desc: "AI is only as good as the data under it. So before the shiny part, the unglamorous part: clean it, connect it, make it trustworthy. (Yes, that's the bit nobody sells you.)" }
	];

	let posts: Post[] = [];
	let events: Event[] = [];
	let postsLoading = true;
	let eventsLoading = true;
	let postsError = false;
	let eventsError = false;
	let ready = false;

	// Fetched independently so one failing band never blanks the other.
	async function loadPosts() {
		postsLoading = true;
		postsError = false;
		try {
			posts = (await getPosts(4)) || [];
		} catch (e) {
			postsError = true;
			console.error('Failed to load posts', e);
		} finally {
			postsLoading = false;
		}
	}

	async function loadEvents() {
		eventsLoading = true;
		eventsError = false;
		try {
			events = ((await getEvents(true)) || []).slice(0, 3);
		} catch (e) {
			eventsError = true;
			console.error('Failed to load events', e);
		} finally {
			eventsLoading = false;
		}
	}

	onMount(() => {
		setTimeout(() => { ready = true; }, 60);
		loadPosts();
		loadEvents();
	});

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	}
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
			<div class="cell cell--portrait"><img src="/headshot.png" alt="Duncan Boyne" class="portrait-img" /></div>
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

		{#if postsLoading}
			<ul class="row-list" aria-hidden="true">
				{#each [1, 2, 3, 4] as n}
					<li class="row-item skeleton"><span class="sk-date"></span><span class="sk-title"></span></li>
				{/each}
			</ul>
		{:else if postsError}
			<div class="msg-block" role="alert">
				<p class="msg-empty">That didn't load. Probably me, not you.</p>
				<button type="button" class="msg-retry" on:click={loadPosts}>Try again <ArrowUpRight class="ico" /></button>
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

		{#if eventsLoading}
			<ol class="timeline" aria-hidden="true">
				{#each [1, 2, 3] as n}
					<li class="tl-node skeleton-node"><span class="tl-dot"></span><span class="sk-date"></span><span class="sk-title"></span></li>
				{/each}
			</ol>
		{:else if eventsError}
			<div class="msg-block" role="alert">
				<p class="msg-empty">Couldn't pull the calendar just now.</p>
				<button type="button" class="msg-retry" on:click={loadEvents}>Try again <ArrowUpRight class="ico" /></button>
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
		<a href="mailto:duncanboyne@hotmail.co.uk" class="cta-main">Let's talk <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">duncanboyne@hotmail.co.uk</p>
	</div>
</section>

<style>
	/* ── Base ───────────────────────────────────────────────────────── */
	.wrap {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 5vw, 3.5rem);
		position: relative;
		z-index: 1;
	}
	:global(.ico) { width: 0.9em; height: 0.9em; flex-shrink: 0; display: inline-block; }

	/* ── Field system ───────────────────────────────────────────────── */
	/* Every band exposes the same set of tokens so inner blocks restyle
	   automatically per colour field. Charcoal = ink, gold = signal,
	   red = compositional only. */
	.band {
		position: relative;
		overflow: hidden;
		padding: clamp(3.5rem, 8vw, 7rem) 0;
		--fg: var(--color-text);
		--fg-muted: var(--color-muted);
		--rule-strong: var(--color-text);
		--rule-soft: var(--color-border);
		--field-accent: var(--color-accent2);
		--field-surface: var(--color-bg);
	}
	.band--cream { background: var(--color-bg); --field-surface: var(--color-bg); }
	.band--surface { background: var(--color-surface); --field-surface: var(--color-surface); }
	.band--gold {
		background: var(--color-accent);
		--fg: var(--color-on-accent);
		--fg-muted: color-mix(in srgb, var(--color-on-accent) 72%, transparent);
		--rule-strong: rgba(0, 0, 0, 0.42);
		--rule-soft: rgba(0, 0, 0, 0.2);
		--field-accent: var(--color-on-accent);
		--field-surface: var(--color-accent);
	}
	.band--inverse {
		background: var(--color-text);
		--fg: var(--color-bg);
		--fg-muted: color-mix(in srgb, var(--color-bg) 66%, transparent);
		--rule-strong: var(--color-bg);
		--rule-soft: color-mix(in srgb, var(--color-bg) 26%, transparent);
		--field-accent: var(--color-bauhaus);
		--field-surface: var(--color-text);
	}

	/* ── Bleeding geometry ──────────────────────────────────────────── */
	.bleeds { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
	.b-shape { position: absolute; display: block; }
	.b-circle { border-radius: 50%; }

	/* ── Poster header ──────────────────────────────────────────────── */
	.phead {
		position: relative;
		display: flex;
		align-items: flex-end;
		gap: clamp(1rem, 3vw, 2.5rem);
		margin-bottom: clamp(2.25rem, 5vw, 3.5rem);
	}
	.phead--right { flex-direction: row-reverse; }
	.phead-index {
		font-size: clamp(4.5rem, 14vw, 12rem);
		font-weight: 900;
		line-height: 0.6;
		letter-spacing: -0.05em;
		color: transparent;
		-webkit-text-stroke: 2px var(--field-accent);
		-webkit-text-fill-color: transparent;
		flex-shrink: 0;
		user-select: none;
	}
	.phead-main { display: flex; flex-direction: column; gap: 0.55rem; padding-bottom: 0.35rem; }
	.phead--right .phead-main { align-items: flex-end; text-align: right; }
	.phead-title {
		font-size: clamp(2.2rem, 7vw, 5.5rem);
		font-weight: 900;
		line-height: 0.82;
		letter-spacing: -0.04em;
		margin: 0;
		color: var(--fg);
	}
	.phead-all {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--fg-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.phead-all:hover { color: var(--field-accent); }

	@media (max-width: 600px) {
		.phead, .phead--right { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
		.phead--right .phead-main { align-items: flex-start; text-align: left; }
		.phead-index { line-height: 0.7; }
	}

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
	.modules { display: flex; gap: 0.4rem; margin-bottom: clamp(0.9rem, 2vw, 1.5rem); }
	.mod { width: 0.9rem; height: 0.9rem; flex-shrink: 0; }
	.mod-ink { background: var(--color-text); }
	.mod-gold { background: var(--color-accent); }
	.mod-red { background: var(--color-bauhaus); }
	.eyebrow {
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--color-accent); margin: 0 0 clamp(0.75rem, 1.5vw, 1.25rem);
	}
	h1 { margin: 0; line-height: 0.82; letter-spacing: -0.04em; }
	.n-duncan { display: block; font-size: clamp(3rem, 13vw, 13rem); font-weight: 200; color: var(--color-text); }
	.n-boyne { display: block; font-size: clamp(3rem, 13vw, 13rem); font-weight: 900; color: var(--color-accent); }

	.cell--geo { min-height: 88px; overflow: hidden; }
	.geo-cell-1 { grid-area: geo1; }
	.geo-cell-2 { grid-area: geo2; }
	.geo { display: block; width: 100%; height: 100%; }
	.geo-gold { background: var(--color-accent); }
	.geo-red { background: var(--color-bauhaus); }
	.geo-quarter { border-radius: 0 0 0 100%; }
	.geo-tri { clip-path: polygon(0 100%, 100% 100%, 100% 0); }

	.cell--portrait { grid-area: port; overflow: hidden; min-height: 220px; background: var(--color-accent); }
	.portrait-img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }

	.cell--tag { grid-area: tag; padding: clamp(1.1rem, 2.5vw, 1.75rem); display: flex; flex-direction: column; gap: 1.1rem; justify-content: center; }
	.tagline { font-size: clamp(1rem, 1.9vw, 1.35rem); font-weight: 400; line-height: 1.45; color: var(--color-text); margin: 0; }
	.tagline strong { font-weight: 800; color: var(--color-accent2); }
	.hero-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
	.btn-inv {
		display: inline-flex; align-items: center; padding: 0.65rem 1.5rem;
		background: var(--color-text); color: var(--color-bg);
		font-size: 0.85rem; font-weight: 700; text-decoration: none; letter-spacing: 0.02em; transition: opacity 0.2s;
	}
	.btn-inv:hover { opacity: 0.82; }
	.btn-ghost {
		display: inline-flex; align-items: center; gap: 0.2rem; padding: 0.65rem 1.5rem;
		border: 1.5px solid var(--color-text); color: var(--color-text);
		font-size: 0.85rem; font-weight: 700; text-decoration: none; letter-spacing: 0.02em; transition: background 0.2s, color 0.2s;
	}
	.btn-ghost:hover { background: var(--color-text); color: var(--color-bg); }

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

	/* ── Row list (field-aware) ─────────────────────────────────────── */
	.row-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--rule-strong); }
	.row-item { border-bottom: 1.5px solid var(--rule-soft); }
	.row-link { display: block; padding: 1.15rem 0; text-decoration: none; }
	.row-top { display: flex; align-items: center; gap: 1rem; }
	.row-marker { width: 0.7rem; height: 0.7rem; flex-shrink: 0; background: var(--field-accent); transition: transform 0.4s ease; }
	.row-link:hover .row-marker { transform: rotate(45deg); }
	.row-date { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; color: var(--fg-muted); white-space: nowrap; width: 6.5rem; flex-shrink: 0; }
	.row-title { font-size: clamp(0.95rem, 2vw, 1.25rem); font-weight: 700; color: var(--fg); flex: 1; transition: opacity 0.4s ease; }
	.row-link:hover .row-title { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
	.row-arrow { color: var(--fg-muted); flex-shrink: 0; transition: color 0.4s ease, transform 0.4s ease; }
	.row-link:hover .row-arrow { color: var(--field-accent); transform: translate(2px, -2px); }
	.row-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.9s ease; }
	.row-link:hover .row-expand { grid-template-rows: 1fr; }
	.row-expand-in { overflow: hidden; }
	.row-thumb-wrap {
		width: 100%; aspect-ratio: 16 / 5; overflow: hidden; margin: 0.75rem 0 0.25rem; margin-left: 1.7rem;
		opacity: 0; transform: translateY(3px); transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.row-link:hover .row-thumb-wrap { opacity: 1; transform: translateY(0); }
	.row-thumb { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
	.row-excerpt {
		margin: 0.5rem 0 0.25rem 1.7rem; font-size: 0.875rem; color: var(--fg-muted); line-height: 1.6; max-width: 70ch;
		opacity: 0; transform: translateY(3px); transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}
	.row-link:hover .row-excerpt { opacity: 1; transform: translateY(0); }

	/* ══ 03 OPEN SOURCE bleeds + tiles ══════════════════════════════ */
	.os-disc {
		width: clamp(14rem, 32vw, 28rem); height: clamp(14rem, 32vw, 28rem);
		background: var(--color-text); opacity: 0.07;
		bottom: clamp(-10rem, -14vw, -6rem); left: clamp(-7rem, -8vw, -3rem);
	}
	.tile-grid {
		list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr);
		border-top: 2px solid var(--rule-strong); border-left: 2px solid var(--rule-strong);
	}
	.tile { border-right: 2px solid var(--rule-strong); border-bottom: 2px solid var(--rule-strong); }
	.tile-link { position: relative; display: flex; flex-direction: column; gap: 0.45rem; padding: clamp(1.25rem, 2.5vw, 1.85rem); height: 100%; text-decoration: none; overflow: hidden; }
	.tile-corner { position: absolute; top: 0; right: 0; width: 1.75rem; height: 1.75rem; background: var(--fg); clip-path: polygon(100% 0, 100% 100%, 0 0); transition: background 0.3s ease; }
	.tile-link:hover .tile-corner { background: var(--color-bauhaus); }
	.tile-kind { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-muted); }
	.tile-name { font-size: clamp(1.1rem, 2.2vw, 1.45rem); font-weight: 800; color: var(--fg); margin: 0; letter-spacing: -0.02em; transition: color 0.3s ease; }
	.tile-link:hover .tile-name { color: var(--field-accent); }
	.tile-repo { font-size: 0.75rem; color: var(--fg-muted); }
	.tile-desc { font-size: 0.9rem; line-height: 1.6; color: var(--fg-muted); margin: 0.35rem 0 0; }
	.repo-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.85rem; }
	.repo-tag { font-size: 0.7rem; font-weight: 700; color: var(--fg-muted); border: 1px solid var(--rule-soft); padding: 0.22rem 0.5rem; }
	.tile-arrow { color: var(--fg-muted); margin-top: auto; align-self: flex-end; transition: color 0.3s ease, transform 0.3s ease; }
	.tile-link:hover .tile-arrow { color: var(--field-accent); transform: translate(2px, -2px); }
	@media (max-width: 720px) { .tile-grid { grid-template-columns: 1fr; } }

	/* ══ 04 SPEAKING bleeds + timeline ══════════════════════════════ */
	.sp-disc {
		width: clamp(15rem, 38vw, 32rem); height: clamp(15rem, 38vw, 32rem);
		background: var(--color-accent); opacity: 0.16;
		top: 50%; right: clamp(-15rem, -16vw, -8rem); transform: translateY(-50%);
	}
	.sp-bar { width: clamp(5rem, 14vw, 11rem); height: 0.8rem; background: var(--color-bauhaus); top: clamp(2rem, 5vw, 4rem); left: 0; }

	.timeline { list-style: none; margin: 0; padding: 2rem 0 0; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 1.5px; position: relative; }
	.timeline::before { content: ''; position: absolute; top: 2rem; left: 0; right: 0; height: 2px; background: var(--rule-strong); }
	.tl-node { position: relative; padding: 1.5rem 1.25rem 0 0; display: flex; flex-direction: column; gap: 0.4rem; }
	.tl-dot { position: absolute; top: calc(-1rem - 7px); left: 0; width: 16px; height: 16px; background: var(--color-bauhaus); border: 2px solid var(--rule-strong); }
	.tl-date { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--field-accent); }
	.tl-title { font-size: clamp(1rem, 2vw, 1.3rem); font-weight: 800; color: var(--fg); margin: 0; line-height: 1.2; }
	.tl-loc { font-size: 0.78rem; color: var(--fg-muted); }
	.tl-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.55rem; }
	.ev-btn { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.95rem; text-decoration: none; letter-spacing: 0.02em; transition: opacity 0.2s, background 0.2s, color 0.2s; }
	.ev-btn--primary { background: var(--color-accent); color: var(--color-on-accent); }
	.ev-btn--primary:hover { opacity: 0.85; }
	.ev-btn--ghost { border: 1.5px solid var(--fg); color: var(--fg); }
	.ev-btn--ghost:hover { background: var(--fg); color: var(--field-surface); }
	@media (max-width: 720px) {
		.timeline { grid-auto-flow: row; grid-auto-columns: auto; padding-left: 1.6rem; gap: 1.75rem; }
		.timeline::before { top: 0; bottom: 0; left: 7px; right: auto; width: 2px; height: auto; }
		.tl-node { padding: 0; }
		.tl-dot { top: 0.35rem; left: calc(-1.6rem + 1px); }
	}

	/* ── Loading / empty / error states (field-aware) ───────────────── */
	.skeleton { display: flex; align-items: center; gap: 1.25rem; padding: 1.15rem 0; }
	.skeleton-node { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 1.5rem; }
	.sk-date, .sk-title { height: 0.85rem; background: var(--rule-soft); position: relative; overflow: hidden; }
	.sk-date { width: 7rem; flex-shrink: 0; }
	.sk-title { flex: 1; max-width: 22rem; }
	.skeleton-node .sk-title { width: 80%; }
	.sk-date::after, .sk-title::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, var(--field-surface), transparent); animation: sk-shimmer 1.4s ease-in-out infinite; }
	@keyframes sk-shimmer { 100% { transform: translateX(100%); } }
	.msg-empty { padding: 2.5rem 0; margin: 0; color: var(--fg-muted); font-size: 0.95rem; line-height: 1.6; max-width: 52ch; }
	.msg-link { color: var(--field-accent); text-decoration: underline; text-underline-offset: 2px; }
	.msg-block { padding: 2.5rem 0; display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
	.msg-block .msg-empty { padding: 0; }
	.msg-retry { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.55rem 1.25rem; border: 1.5px solid var(--fg); background: transparent; color: var(--fg); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.02em; cursor: pointer; transition: background 0.2s, color 0.2s; }
	.msg-retry:hover { background: var(--fg); color: var(--field-surface); }
	.msg-retry:focus-visible { outline: 2px solid var(--field-accent); outline-offset: 2px; }
	@media (prefers-reduced-motion: reduce) { .sk-date::after, .sk-title::after { animation: none; } }

	/* ══ CTA bleeds + type ══════════════════════════════════════════ */
	.cta-block { padding: clamp(5rem, 11vw, 9rem) 0; }
	.cta-disc {
		width: clamp(12rem, 30vw, 24rem); height: clamp(6rem, 15vw, 12rem);
		background: var(--color-accent); border-radius: 100% 100% 0 0;
		bottom: 0; right: clamp(-2rem, 4vw, 5rem);
	}
	.cta-bar { width: clamp(5rem, 14vw, 11rem); height: 0.95rem; background: var(--color-bauhaus); top: 0; left: 0; }
	.cta-dot { width: clamp(2.5rem, 6vw, 4.5rem); height: clamp(2.5rem, 6vw, 4.5rem); background: var(--color-bauhaus); top: clamp(2.5rem, 6vw, 5rem); right: clamp(2rem, 16vw, 13rem); opacity: 0.9; }
	.cta-pre { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg); opacity: 0.7; margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2.8rem, 9vw, 8rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--fg); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent); }
	.cta-ico { width: clamp(2rem, 5vw, 5rem); height: clamp(2rem, 5vw, 5rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.85rem; color: var(--fg); opacity: 0.65; }
</style>
