<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSessionizeSessions } from '$lib/sessionize';
	import { getTalks, getFeaturedFeedback } from '$lib/supabase';
	import { ArrowUpRight, ChevronDown } from 'lucide-svelte';
	import { marked } from 'marked';
	import type { SessionizeSession } from '$lib/sessionize';
	import type { Talk, TalkFeedback } from '$lib/types';

	function normalize(s: string) {
		return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
	}

	let sessions: SessionizeSession[] = [];
	let workshops: Talk[] = [];
	let featuredFeedback: TalkFeedback[] = [];
	let imageMap: Record<number, string> = {};
	let loading = true;
	let error: string | null = null;
	let openId: number | null = null;
	let carouselIndex = 0;
	let carouselTimer: ReturnType<typeof setInterval>;

	function toggle(id: number) {
		openId = openId === id ? null : id;
	}

	function carouselNext() {
		carouselIndex = (carouselIndex + 1) % featuredFeedback.length;
	}

	function carouselPrev() {
		carouselIndex = (carouselIndex - 1 + featuredFeedback.length) % featuredFeedback.length;
	}

	function carouselGoto(i: number) {
		carouselIndex = i;
		clearInterval(carouselTimer);
		carouselTimer = setInterval(carouselNext, 6000);
	}

	onMount(async () => {
		try {
			const [sz, supabaseTalks, feedback] = await Promise.all([
				getSessionizeSessions(),
				getTalks(),
				getFeaturedFeedback()
			]);
			featuredFeedback = feedback || [];
			if (featuredFeedback.length > 1) {
				carouselTimer = setInterval(carouselNext, 6000);
			}
			sessions = sz;
			workshops = (supabaseTalks || []).filter(t => t.type === 'workshop');

			const titleToImage: Record<string, string> = {};
			for (const t of (supabaseTalks || []) as Talk[]) {
				if (t.image) titleToImage[normalize(t.title)] = t.image;
			}

			for (const s of sessions) {
				const szNorm = normalize(s.title);
				const match = Object.entries(titleToImage).find(([dbNorm]) =>
					szNorm === dbNorm || szNorm.startsWith(dbNorm) || dbNorm.startsWith(szNorm)
				);
				if (match) imageMap[s.id] = match[1];
			}
		} catch (e) {
			error = 'Failed to load talks.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	onDestroy(() => clearInterval(carouselTimer));
</script>

<svelte:head>
	<title>Speaking — Duncan Boyne</title>
	<meta name="description" content="Conference talks and workshops by Duncan Boyne on Power BI, data visualization, and the Power Platform." />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">Speaking</p>
		<h1 class="page-title">Talks &amp;<br><span class="accent-line">Sessions</span></h1>
		<p class="page-sub">Power BI, data storytelling, accessibility, and the Power Platform — at conferences and user groups across the UK and Europe.</p>
	</div>
</section>

<!-- Feedback carousel -->
{#if featuredFeedback.length > 0}
<section class="feedback-section">
	<div class="wrap">
		<div class="carousel">
			{#each featuredFeedback as item, i}
				<div class="carousel-slide" class:active={i === carouselIndex} aria-hidden={i !== carouselIndex}>
					<blockquote class="carousel-quote">"{item.quote}"</blockquote>
					<div class="carousel-attr">
						{#if item.attribution_url}
							<a href={item.attribution_url} target="_blank" rel="noopener noreferrer" class="carousel-name">{item.attribution_name}</a>
						{:else}
							<span class="carousel-name">{item.attribution_name}</span>
						{/if}
						{#if item.attribution_role}
							<span class="carousel-role">{item.attribution_role}</span>
						{/if}
					</div>
				</div>
			{/each}

			{#if featuredFeedback.length > 1}
				<div class="carousel-controls">
					<button class="carousel-arrow" on:click={carouselPrev} aria-label="Previous">&#8592;</button>
					<div class="carousel-dots">
						{#each featuredFeedback as _, i}
							<button
								class="carousel-dot"
								class:active={i === carouselIndex}
								on:click={() => carouselGoto(i)}
								aria-label="Go to slide {i + 1}"
							></button>
						{/each}
					</div>
					<button class="carousel-arrow" on:click={carouselNext} aria-label="Next">&#8594;</button>
				</div>
			{/if}
		</div>
	</div>
</section>
{/if}

<!-- List -->
<section class="talks-section">
	<div class="wrap">
		{#if loading}
			<ul class="row-list">
				{#each [1,2,3,4] as _}
					<li class="row-item skeleton">
						<div class="sk-title"></div>
					</li>
				{/each}
			</ul>
		{:else if error}
			<p class="msg-empty">{error}</p>
		{:else if sessions.length === 0}
			<p class="msg-empty">No sessions found.</p>
		{:else}
			<ul class="row-list">
				{#each sessions as session}
					{@const image = imageMap[session.id] ?? null}
					{@const isOpen = openId === session.id}
					<li class="row-item" class:open={isOpen}>
						<button
							class="row-btn"
							on:click={() => toggle(session.id)}
							aria-expanded={isOpen}
						>
							<span class="row-title">{session.title}</span>
							<ChevronDown class="row-chevron" aria-hidden="true" />
						</button>

						<div class="row-expand" aria-hidden={!isOpen}>
							<div class="row-expand-in">
								<div class="row-body">
									{#if image}
										<div class="row-img-wrap">
											<img src={image} alt={session.title} class="row-img" />
										</div>
									{/if}
									{#if session.description}
										<div class="row-desc">{@html marked(session.description)}</div>
									{/if}
									{#if session.sessionUrl}
										<a href={session.sessionUrl} target="_blank" rel="noopener noreferrer" class="session-link">
											View on Sessionize <ArrowUpRight class="w-3.5 h-3.5 inline" />
										</a>
									{/if}
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- Workshops -->
{#if !loading && workshops.length > 0}
	<section class="talks-section" style="border-top: 1px solid var(--color-border); padding-top: clamp(4rem, 8vw, 7rem);">
		<div class="wrap">
			<h2 style="font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 700; margin: 0 0 2rem; color: var(--color-text);">Workshops</h2>
			<ul class="row-list">
				{#each workshops as workshop}
					{@const image = workshop.image ?? null}
					{@const isOpen = openId === workshop.id}
					<li class="row-item" class:open={isOpen}>
						<button
							class="row-btn"
							on:click={() => toggle(workshop.id)}
							aria-expanded={isOpen}
						>
							<span class="row-title">{workshop.title}</span>
							<ChevronDown class="row-chevron" aria-hidden="true" />
						</button>

						<div class="row-expand" aria-hidden={!isOpen}>
							<div class="row-expand-in">
								<div class="row-body">
									{#if image}
										<div class="row-img-wrap">
											<img src={image} alt={workshop.title} class="row-img" />
										</div>
									{/if}
									{#if workshop.excerpt}
										<div class="row-desc">{@html marked(workshop.excerpt)}</div>
									{/if}
									{#if workshop.content}
										<div class="row-desc">{@html marked(workshop.content)}</div>
									{/if}
									{#if workshop.co_host_name}
										<p class="row-host">
											{#if workshop.co_host_url}
												Co-hosted with <a href={workshop.co_host_url} target="_blank" rel="noopener noreferrer">{workshop.co_host_name}</a>
											{:else}
												Co-hosted with {workshop.co_host_name}
											{/if}
										</p>
									{/if}
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="/contact" class="cta-main">Invite me <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">I'm open to speaking at conferences, user groups, and community events. Get in touch.</p>
	</div>
</section>

<style>
	.wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3.5rem); }

	/* Hero */
	.page-hero {
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(1.5rem, 3vw, 2.5rem);
		border-bottom: 3px solid var(--color-accent3);
	}
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* Talks */
	.talks-section { padding: 0 0 clamp(4rem, 8vw, 7rem); }
	.row-list { list-style: none; margin: 0; padding: 0; }
	.row-item { border-bottom: 1px solid var(--color-border); }
	.row-item:first-child { border-top: 1px solid var(--color-border); }

	.row-btn {
		width: 100%; display: flex; align-items: center; gap: 1.25rem;
		padding: 1.25rem 0; background: none; border: none; cursor: pointer;
		text-align: left;
	}

	.row-title {
		font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 600; color: var(--color-text);
		flex: 1; transition: color 0.3s;
	}
	.row-btn:hover .row-title,
	.open .row-title { color: var(--color-accent2); }

	:global(.ico) { width: 0.9em; height: 0.9em; flex-shrink: 0; display: inline-block; }

	.row-chevron {
		width: 1.1rem; height: 1.1rem; flex-shrink: 0;
		color: var(--color-muted); transition: transform 0.4s ease, color 0.3s;
	}
	.row-btn:hover .row-chevron { color: var(--color-accent2); }
	.open .row-chevron { transform: rotate(180deg); color: var(--color-accent2); }

	/* Expand — click-driven, not hover */
	.row-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s ease; }
	.open .row-expand { grid-template-rows: 1fr; }
	.row-expand-in { overflow: hidden; }

	.row-body {
		padding-bottom: 1.5rem;
		opacity: 0; transform: translateY(4px);
		transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
	}
	.open .row-body { opacity: 1; transform: translateY(0); }

	.row-img-wrap { margin: 0 0 1.25rem; }
	.row-img { width: 100%; height: auto; display: block; }

	.row-desc {
		font-size: 0.9375rem; color: var(--color-muted); line-height: 1.75;
		max-width: 68ch;
	}
	.row-desc :global(p) { margin-bottom: 0.875rem; }
	.row-desc :global(p:last-child) { margin-bottom: 0; }
	.row-desc :global(strong) { font-weight: 700; color: var(--color-text); }
	.row-desc :global(ul) { list-style: disc; padding-left: 1.25rem; margin-bottom: 0.875rem; }
	.row-desc :global(li) { margin-bottom: 0.3rem; }

	.session-link {
		display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 1rem;
		font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
		color: var(--color-accent); text-decoration: none;
	}
	.session-link:hover { text-decoration: underline; }

	.row-host {
		font-size: 0.875rem; color: var(--color-muted); margin-top: 1rem;
	}
	.row-host a {
		color: var(--color-accent); text-decoration: none;
	}
	.row-host a:hover { text-decoration: underline; }

	/* CTA */
	.cta-block { padding: clamp(5rem, 10vw, 9rem) 0; border-top: 1px solid var(--color-border); }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(2rem, 5vw, 4.5rem); height: clamp(2rem, 5vw, 4.5rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }

	/* Skeleton */
	.skeleton { padding: 1.25rem 0; display: flex; gap: 1.5rem; align-items: center; }
	.sk-title { flex: 1; height: 1rem; background: var(--color-border); }
	.msg-empty { padding: 4rem 0; color: var(--color-muted); font-size: 1rem; }

	/* Feedback carousel */
	.feedback-section {
		padding: clamp(3rem, 6vw, 5rem) 0;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.carousel { position: relative; }

	.carousel-slide {
		display: none;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 68ch;
	}
	.carousel-slide.active { display: flex; }

	.carousel-quote {
		font-size: clamp(1.1rem, 2.5vw, 1.5rem);
		font-weight: 400;
		font-style: italic;
		line-height: 1.6;
		color: var(--color-text);
		margin: 0;
		border: none;
		padding: 0;
	}

	.carousel-attr {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.carousel-name {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-accent);
		text-decoration: none;
		text-transform: uppercase;
	}
	a.carousel-name:hover { text-decoration: underline; }

	.carousel-role {
		font-size: 0.8rem;
		color: var(--color-muted);
	}
	.carousel-role::before { content: '·'; margin-right: 0.6rem; opacity: 0.4; }

	.carousel-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.75rem;
	}

	.carousel-arrow {
		background: none;
		border: 1.5px solid var(--color-border);
		color: var(--color-muted);
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 0.9rem;
		transition: border-color 0.2s, color 0.2s;
		flex-shrink: 0;
	}
	.carousel-arrow:hover { border-color: var(--color-accent); color: var(--color-accent); }

	.carousel-dots { display: flex; gap: 0.4rem; }

	.carousel-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--color-border);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s;
	}
	.carousel-dot.active { background: var(--color-accent); }
</style>
