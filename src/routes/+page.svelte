<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import { getPosts, getEvents } from '$lib/supabase';
	import type { Post, Event } from '$lib/types';
	import Seo from '$lib/components/Seo.svelte';

	const services = [
		{ num: '01', title: 'Power BI & Data Visualisation', desc: 'Dashboards people actually open. Built around the two questions you really have, not the twelve an imagined power user might ask.' },
		{ num: '02', title: 'Automation', desc: "The Monday-morning copy-paste. The email approval chase. The report someone rebuilds by hand every month. I kill those, quietly, so nobody misses them." },
		{ num: '03', title: 'AI Readiness', desc: "AI is only as good as the data under it. So before the shiny part, the unglamorous part: clean it, connect it, make it trustworthy. (Yes, that's the bit nobody sells you.)" }
	];

	let posts: Post[] = [];
	let events: Event[] = [];
	let ready = false;

	onMount(async () => {
		setTimeout(() => { ready = true; }, 60);
		const [p, e] = await Promise.all([getPosts(4), getEvents(true)]);
		posts = p || [];
		events = (e || []).slice(0, 3);
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

<!-- ── HERO ─────────────────────────────────────────────────────────── -->
<section class="hero" class:ready>
	<div class="wrap">

		<div class="hero-body">

			<!-- Name block -->
			<div class="name-block">
				<p class="eyebrow">Power BI Consultant · Great Yarmouth, Norfolk</p>
				<h1 aria-label="Duncan Boyne">
					<span class="n-duncan">Duncan</span>
					<span class="n-boyne">Boyne</span>
				</h1>
			</div>

			<!-- Portrait -->
			<div class="portrait-wrap">
				<div class="portrait-offset"></div>
				<img src="/headshot.png" alt="Duncan Boyne" class="portrait-img" />
			</div>

		</div>

		<!-- Footer strip -->
		<div class="hero-strip">
			<p class="tagline">Your data has a story.<br><strong>Let's tell it properly.</strong></p>
			<div class="hero-actions">
				<a href="/services" class="btn-inv">Work with me</a>
				<a href="/contact" class="btn-ghost">Get in touch <ArrowUpRight class="ico" /></a>
			</div>
		</div>

	</div>
</section>

<!-- ── SERVICES — gold block ─────────────────────────────────────────── -->
<section class="services-block">
	<div class="wrap">

		<div class="sb-head">
			<span class="sb-label">What I Do</span>
			<a href="/services" class="sb-all">All services <ArrowUpRight class="ico" /></a>
		</div>

		<ul class="svc-list">
			{#each services as svc}
				<li class="svc-row">
					<div class="svc-top">
						<span class="svc-num">{svc.num}</span>
						<span class="svc-title">{svc.title}</span>
						<ArrowUpRight class="svc-arrow ico" />
					</div>
					<div class="svc-expand"><div class="svc-expand-in">
						<p class="svc-desc">{svc.desc}</p>
					</div></div>
				</li>
			{/each}
		</ul>

	</div>
</section>

<!-- ── WRITING ───────────────────────────────────────────────────────── -->
<section class="content-block">
	<div class="wrap">

		<div class="cb-head">
			<h2 class="cb-title">Writing</h2>
			<a href="/blog" class="cb-all">All posts <ArrowUpRight class="ico" /></a>
		</div>

		<ul class="row-list">
			{#each posts as post}
				<li class="row-item">
					<a href="/blog/{post.slug}" class="row-link">
						<div class="row-top">
							<span class="row-date">{formatDate(post.published_at ?? post.created_at)}</span>
							<span class="row-title">{post.title}</span>
							<ArrowUpRight class="row-arrow ico" />
						</div>
						<div class="row-expand"><div class="row-expand-in">
							{#if post.featured_image}
								<div class="row-thumb-wrap">
									<img src={post.featured_image} alt={post.title} class="row-thumb" />
								</div>
							{/if}
							{#if post.excerpt}
								<p class="row-excerpt">{post.excerpt}</p>
							{/if}
						</div></div>
					</a>
				</li>
			{/each}
		</ul>

	</div>
</section>

<!-- ── SPEAKING ──────────────────────────────────────────────────────── -->
{#if events.length > 0}
<section class="content-block content-block--alt">
	<div class="wrap">

		<div class="cb-head">
			<h2 class="cb-title">Speaking</h2>
			<a href="/events" class="cb-all">All events <ArrowUpRight class="ico" /></a>
		</div>

		<ul class="row-list">
			{#each events as ev}
				<li class="row-item">
					<div class="row-link event-row">
						<div class="row-top">
							<span class="row-date">{ev.event_date ? formatDate(ev.event_date) : 'TBC'}</span>
							<span class="row-title">{ev.title}</span>
							{#if ev.location}<span class="row-loc">{ev.location}</span>{/if}
							<ArrowUpRight class="row-arrow ico" />
						</div>
						<div class="row-expand"><div class="row-expand-in">
							<div class="ev-actions">
								{#if ev.event_url}
									<a href={ev.event_url} target="_blank" rel="noopener" class="ev-btn ev-btn--primary">
										Sign up <ArrowUpRight class="ico" />
									</a>
								{/if}
								{#if ev.talk_slug}
									<a href="/talks/{ev.talk_slug}" class="ev-btn ev-btn--ghost">
										View talk <ArrowUpRight class="ico" />
									</a>
								{/if}
							</div>
						</div></div>
					</div>
				</li>
			{/each}
		</ul>

	</div>
</section>
{/if}

<!-- ── CTA ───────────────────────────────────────────────────────────── -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Got a dashboard nobody opens?</p>
		<a href="mailto:duncanboyne@hotmail.co.uk" class="cta-main">
			Let's talk <ArrowUpRight class="cta-ico" />
		</a>
		<p class="cta-sub">duncanboyne@hotmail.co.uk</p>
	</div>
</section>

<style>
	/* ── Base ───────────────────────────────────────────────────────── */
	.wrap {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 5vw, 3.5rem);
	}

	:global(.ico) {
		width: 0.9em;
		height: 0.9em;
		flex-shrink: 0;
		display: inline-block;
	}

	/* ── Hero ───────────────────────────────────────────────────────── */
	.hero {
		padding-top: clamp(3rem, 7vw, 6rem);
		border-bottom: 3px solid var(--color-accent);
	}

	/* Eyebrow */
	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 clamp(1rem, 2vw, 2rem);
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	.hero.ready .eyebrow { opacity: 1; transform: translateY(0); }

	/* Name */
	h1 {
		margin: 0;
		line-height: 0.85;
		letter-spacing: -0.04em;
	}

	.n-duncan {
		display: block;
		font-size: clamp(3.5rem, 16vw, 17rem);
		font-weight: 200;
		color: var(--color-text);
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s;
	}
	.n-boyne {
		display: block;
		font-size: clamp(3.5rem, 16vw, 17rem);
		font-weight: 900;
		color: var(--color-accent);
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.7s ease 0.22s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s;
	}
	.hero.ready .n-duncan,
	.hero.ready .n-boyne {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hero layout — mobile: name full width, portrait below */
	.hero-body {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.name-block { width: 100%; }

	/* Portrait — hidden on mobile, shown on md+ alongside name */
	.portrait-wrap {
		display: none;
	}

	@media (min-width: 768px) {
		.hero-body {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}

		.name-block { flex: 1; }

		.portrait-wrap {
			display: block;
			position: relative;
			flex-shrink: 0;
			width: clamp(160px, 18vw, 280px);
			align-self: flex-end;
			opacity: 0;
			transform: translateY(20px);
			transition: opacity 0.7s ease 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s;
		}
		.hero.ready .portrait-wrap { opacity: 1; transform: translateY(0); }
	}

	.portrait-offset {
		position: absolute;
		bottom: 0.75rem;
		right: -0.75rem;
		width: 100%;
		height: 85%;
		background: var(--color-accent);
		z-index: 0;
	}

	.portrait-img {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		object-position: top center;
	}

	/* 3px rule — accent3 (10%) */
	.hero { border-bottom-color: var(--color-accent3); }

	/* Hero strip */
	.hero-strip {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.5rem;
		padding: clamp(1.5rem, 3vw, 2.5rem) 0 clamp(1.5rem, 3vw, 2.5rem);
		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
	}
	.hero.ready .hero-strip { opacity: 1; transform: translateY(0); }

	.tagline {
		font-size: clamp(1rem, 2vw, 1.4rem);
		font-weight: 400;
		line-height: 1.5;
		color: var(--color-text);
		margin: 0;
	}
	/* "Let's tell it properly." — accent2 (30%) */
	.tagline strong { font-weight: 700; color: var(--color-accent2); }

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-shrink: 0;
	}

	.btn-inv {
		display: inline-flex;
		align-items: center;
		padding: 0.65rem 1.5rem;
		background: var(--color-text);
		color: var(--color-bg);
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity 0.2s;
	}
	.btn-inv:hover { opacity: 0.8; }

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		padding: 0.65rem 1.5rem;
		border: 1.5px solid var(--color-border);
		color: var(--color-text);
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: border-color 0.2s;
	}
	.btn-ghost:hover { border-color: var(--color-text); }

	/* ── Services block (gold) ──────────────────────────────────────── */
	.services-block {
		background: var(--color-accent);
		padding: clamp(3rem, 6vw, 5rem) 0;
	}

	.sb-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.sb-label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-on-accent);
		opacity: 0.6;
	}

	.sb-all {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-on-accent);
		text-decoration: none;
		opacity: 0.7;
		transition: opacity 0.2s;
	}
	.sb-all:hover { opacity: 1; }

	.svc-list { list-style: none; margin: 0; padding: 0; }

	.svc-row {
		border-top: 1.5px solid rgba(0,0,0,0.15);
		padding: 1.1rem 0;
	}
	.svc-row:last-child { border-bottom: 1.5px solid rgba(0,0,0,0.15); }

	.svc-top {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.svc-num {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-on-accent);
		opacity: 0.5;
		width: 2rem;
		flex-shrink: 0;
	}

	.svc-title {
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		font-weight: 700;
		color: var(--color-on-accent);
		flex: 1;
		transition: opacity 0.4s;
	}
	/* Services hover — accent2 tint (30%) */
	.svc-row:hover .svc-title { opacity: 0.75; }

	.svc-arrow {
		color: var(--color-on-accent);
		opacity: 0.5;
		flex-shrink: 0;
		transition: opacity 0.6s ease, transform 0.6s ease;
	}
	.svc-row:hover .svc-arrow { opacity: 1; transform: translate(2px,-2px); }

	.svc-expand {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.9s ease;
	}
	.svc-row:hover .svc-expand { grid-template-rows: 1fr; }
	.svc-expand-in { overflow: hidden; }

	.svc-desc {
		margin: 0.6rem 0 0.2rem 3.25rem;
		font-size: 0.9rem;
		color: var(--color-on-accent);
		line-height: 1.65;
		max-width: 52ch;
		transform: translateY(3px);
		transition: transform 0.7s ease 0.15s, opacity 0.7s ease 0.15s;
		opacity: 0;
	}
	.svc-row:hover .svc-desc { transform: translateY(0); opacity: 0.75; }

	/* ── Content blocks ─────────────────────────────────────────────── */
	.content-block {
		padding: clamp(3rem, 6vw, 5rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.content-block--alt {
		background: var(--color-surface);
	}

	.cb-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.cb-title {
		font-size: clamp(1.6rem, 4vw, 3rem);
		font-weight: 900;
		color: var(--color-text);
		letter-spacing: -0.03em;
		margin: 0;
	}

	.cb-all {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	/* Section "all" links — accent3 (10%) */
	.cb-all:hover { color: var(--color-accent3); }

	/* ── Row list ───────────────────────────────────────────────────── */
	.row-list { list-style: none; margin: 0; padding: 0; }

	.row-item { border-top: 1px solid var(--color-border); }
	.row-item:last-child { border-bottom: 1px solid var(--color-border); }

	.row-link {
		display: block;
		padding: 1.1rem 0;
		text-decoration: none;
	}

	.row-top {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.row-date {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--color-muted);
		white-space: nowrap;
		width: 7rem;
		flex-shrink: 0;
	}

	.row-title {
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		font-weight: 600;
		color: var(--color-text);
		flex: 1;
		transition: color 0.6s ease;
	}
	/* Row hover titles — accent2 (30%) */
	.row-link:hover .row-title,
	.event-row:hover .row-title { color: var(--color-accent2); }

	.row-loc {
		font-size: 0.72rem;
		color: var(--color-muted);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.row-arrow {
		color: var(--color-muted);
		flex-shrink: 0;
		transition: color 0.6s ease, transform 0.6s ease;
	}
	/* Row arrows — accent2 (30%) */
	.row-link:hover .row-arrow,
	.event-row:hover .row-arrow {
		color: var(--color-accent2);
		transform: translate(2px,-2px);
	}

	/* Row expand */
	.row-expand {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.9s ease;
	}
	.row-link:hover .row-expand,
	.event-row:hover .row-expand { grid-template-rows: 1fr; }
	.row-expand-in { overflow: hidden; }

	/* Thumbnail */
	.row-thumb-wrap {
		width: 100%;
		aspect-ratio: 16 / 5;
		overflow: hidden;
		margin: 0.75rem 0 0.25rem;
		opacity: 0;
		transform: translateY(3px);
		transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.row-link:hover .row-thumb-wrap { opacity: 1; transform: translateY(0); }

	.row-thumb { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }

	.row-excerpt {
		margin: 0.5rem 0 0.25rem;
		font-size: 0.875rem;
		color: var(--color-muted);
		line-height: 1.6;
		max-width: 70ch;
		opacity: 0;
		transform: translateY(3px);
		transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}
	.row-link:hover .row-excerpt { opacity: 1; transform: translateY(0); }

	/* Event row */
	.event-row {
		display: block;
		padding: 1.1rem 0;
		cursor: default;
	}
	.event-row:hover .row-expand { grid-template-rows: 1fr; }

	.ev-actions {
		display: flex;
		gap: 0.75rem;
		padding: 0.75rem 0 0.25rem;
		opacity: 0;
		transform: translateY(3px);
		transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.event-row:hover .ev-actions { opacity: 1; transform: translateY(0); }

	.ev-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		font-weight: 700;
		padding: 0.4rem 1rem;
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity 0.2s;
	}
	.ev-btn--primary { background: var(--color-accent); color: var(--color-on-accent); }
	.ev-btn--primary:hover { opacity: 0.85; }
	.ev-btn--ghost { border: 1.5px solid var(--color-border); color: var(--color-text); }
	.ev-btn--ghost:hover { border-color: var(--color-text); }

	/* ── CTA ────────────────────────────────────────────────────────── */
	.cta-block {
		padding: clamp(5rem, 10vw, 9rem) 0;
	}

	.cta-pre {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-muted);
		margin: 0 0 1.25rem;
	}

	.cta-main {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: clamp(2.8rem, 9vw, 8rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.3s;
	}
	/* CTA hover — accent2 (30%) */
	.cta-main:hover { color: var(--color-accent2); }

	.cta-ico {
		width: clamp(2rem, 5vw, 5rem);
		height: clamp(2rem, 5vw, 5rem);
	}

	.cta-sub {
		margin: 1.25rem 0 0;
		font-size: 0.85rem;
		color: var(--color-muted);
	}
</style>
