<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSessionizeSessions } from '$lib/sessionize';
	import { getTalks, getFeaturedFeedback } from '$lib/supabase';
	import { ArrowUpRight, ChevronDown } from 'lucide-svelte';
	import { marked } from 'marked';
	import type { SessionizeSession } from '$lib/sessionize';
	import type { Talk, TalkFeedback } from '$lib/types';

	const filterOptions = [
		{ id: 'power-bi', label: 'Power BI', terms: ['power bi', 'dashboard', 'dax', 'deneb', 'semantic model'] },
		{ id: 'fabric', label: 'Fabric', terms: ['fabric'] },
		{ id: 'ai', label: 'AI', terms: [' ai ', 'copilot', 'chatgpt', 'claude', 'grok', 'gemini', 'agentic', 'prompt'] },
		{ id: 'design', label: 'Design', terms: ['design', 'wireframe', 'visual', 'visualisation', 'visualization', 'accessibility', 'layout', 'vega'] },
		{ id: 'power-platform', label: 'Power Platform', terms: ['power platform', 'power apps', 'power automate', 'dataverse'] }
	];

	function normalize(s: string) {
		return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
	}

	function searchableText(...parts: Array<string | null | undefined>) {
		return ` ${parts.filter(Boolean).join(' ').toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;
	}

	function matchesFilter(text: string, filterId: string) {
		const filter = filterOptions.find(option => option.id === filterId);
		return filter ? filter.terms.some(term => text.includes(term)) : true;
	}

	function sessionMatches(session: SessionizeSession) {
		const text = searchableText(session.title, session.description);
		return activeFilters.every(filterId => matchesFilter(text, filterId));
	}

	function workshopMatches(workshop: Talk) {
		const text = searchableText(workshop.title, workshop.excerpt, workshop.content);
		return activeFilters.every(filterId => matchesFilter(text, filterId));
	}

	function toggleFilter(filterId: string) {
		activeFilters = activeFilters.includes(filterId)
			? activeFilters.filter(id => id !== filterId)
			: [...activeFilters, filterId];
		openId = null;
	}

	function clearFilters() {
		activeFilters = [];
		openId = null;
	}

	let sessions: SessionizeSession[] = [];
	let workshops: Talk[] = [];
	let featuredFeedback: TalkFeedback[] = [];
	let imageMap: Record<number, string> = {};
	let slugMap: Record<number, string> = {};
	let activeFilters: string[] = [];
	let loading = true;
	let error: string | null = null;
	let openId: number | null = null;
	let carouselIndex = 0;
	let carouselTimer: ReturnType<typeof setInterval>;
	$: filteredSessions = activeFilters.length === 0 ? sessions : sessions.filter(sessionMatches);
	$: filteredWorkshops = activeFilters.length === 0 ? workshops : workshops.filter(workshopMatches);
	$: filteredTotal = filteredSessions.length + filteredWorkshops.length;

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
			const titleToSlug: Record<string, string> = {};
			for (const t of (supabaseTalks || []) as Talk[]) {
				if (t.image) titleToImage[normalize(t.title)] = t.image;
				titleToSlug[normalize(t.title)] = t.slug;
			}

			for (const s of sessions) {
				const szNorm = normalize(s.title);
				const match = Object.entries(titleToSlug).find(([dbNorm]) =>
					szNorm === dbNorm || szNorm.startsWith(dbNorm) || dbNorm.startsWith(szNorm)
				);
				if (match) slugMap[s.id] = match[1];
				const imgMatch = Object.entries(titleToImage).find(([dbNorm]) =>
					szNorm === dbNorm || szNorm.startsWith(dbNorm) || dbNorm.startsWith(szNorm)
				);
				if (imgMatch) imageMap[s.id] = imgMatch[1];
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

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream tk-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle tk-hero-disc"></span>
		<span class="b-shape tk-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Speaking</p>
		<h1 class="page-title">Talks &amp;<br><span class="accent-line">Sessions</span></h1>
		<p class="page-sub">Power BI, data storytelling, accessibility, and the Power Platform — at conferences and user groups across the UK and Europe.</p>
	</div>
</section>

<!-- ══ FEEDBACK CAROUSEL — surface field ═══════════════════════════════ -->
{#if featuredFeedback.length > 0}
<section class="band band--surface feedback-section">
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

<!-- ══ SESSIONS — cream field ═══════════════════════════════════════════ -->
<section class="band band--cream talks-section">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle tk-list-disc"></span>
	</div>
	<div class="wrap">
		{#if loading}
			<ul class="acc-list">
				{#each [1,2,3,4] as _}
					<li class="acc-item skeleton">
						<div class="sk-title"></div>
					</li>
				{/each}
			</ul>
		{:else if error}
			<p class="msg-empty">{error}</p>
		{:else if sessions.length === 0 && workshops.length === 0}
			<p class="msg-empty">No sessions found.</p>
		{:else}
			<div class="filter-panel">
				<div>
					<p class="filter-kicker">Filter talks</p>
					<p class="filter-count">
						{filteredTotal} {filteredTotal === 1 ? 'result' : 'results'}
						{#if activeFilters.length > 1}
							matching all selected topics
						{/if}
					</p>
				</div>
				<div class="filter-list" role="group" aria-label="Filter talks by topic">
					<button
						class="filter-chip"
						class:active={activeFilters.length === 0}
						type="button"
						on:click={clearFilters}
						aria-pressed={activeFilters.length === 0}
					>
						All
					</button>
					{#each filterOptions as filter}
						<button
							class="filter-chip"
							class:active={activeFilters.includes(filter.id)}
							type="button"
							on:click={() => toggleFilter(filter.id)}
							aria-pressed={activeFilters.includes(filter.id)}
						>
							{filter.label}
						</button>
					{/each}
				</div>
			</div>

			{#if filteredTotal === 0}
				<p class="msg-empty">No talks match those filters.</p>
			{:else if filteredSessions.length > 0}
				<ul class="acc-list">
					{#each filteredSessions as session}
						{@const image = imageMap[session.id] ?? null}
						{@const isOpen = openId === session.id}
						<li class="acc-item" class:is-open={isOpen}>
							<button
								class="acc-btn"
								on:click={() => toggle(session.id)}
								aria-expanded={isOpen}
							>
								<span class="acc-marker" aria-hidden="true"></span>
								<span class="acc-title">{session.title}</span>
								<ChevronDown class="acc-chevron" aria-hidden="true" />
							</button>

							<div class="acc-expand" aria-hidden={!isOpen}>
								<div class="acc-expand-in">
									<div class="acc-body">
										{#if image}
											<div class="row-img-wrap">
												<img src={image} alt={session.title} class="row-img" />
											</div>
										{/if}
										{#if session.description}
											<div class="row-desc">{@html marked(session.description)}</div>
										{/if}
										<div class="row-links">
											{#if slugMap[session.id]}
												<a href="/talks/{slugMap[session.id]}" class="session-link">
													View talk <ArrowUpRight class="ico" />
												</a>
											{/if}
											{#if session.sessionUrl}
												<a href={session.sessionUrl} target="_blank" rel="noopener noreferrer" class="session-link">
													View on Sessionize <ArrowUpRight class="ico" />
												</a>
											{/if}
										</div>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	</div>
</section>

<!-- ══ WORKSHOPS — surface field ════════════════════════════════════════ -->
{#if !loading && filteredWorkshops.length > 0}
	<section class="band band--surface talks-section">
		<div class="wrap">
			<h2 class="phead-title workshops-title">Workshops</h2>
			<ul class="acc-list">
				{#each filteredWorkshops as workshop}
					{@const image = workshop.image ?? null}
					{@const isOpen = openId === workshop.id}
					<li class="acc-item" class:is-open={isOpen}>
						<button
							class="acc-btn"
							on:click={() => toggle(workshop.id)}
							aria-expanded={isOpen}
						>
							<span class="acc-marker" aria-hidden="true"></span>
							<span class="acc-title">{workshop.title}</span>
							<ChevronDown class="acc-chevron" aria-hidden="true" />
						</button>

						<div class="acc-expand" aria-hidden={!isOpen}>
							<div class="acc-expand-in">
								<div class="acc-body">
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
									<div class="row-links">
										<a href="/talks/{workshop.slug}" class="session-link">
											View workshop <ArrowUpRight class="ico" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle tk-cta-disc"></span>
		<span class="b-shape tk-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="/contact" class="cta-main">Invite me <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">I'm open to speaking at conferences, user groups, and community events. Get in touch.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, and the CTA
	   pattern live in app.css (Bauhaus poster kit). The talk/workshop rows
	   use click-driven expansion (not hover) for keyboard/touch access, so
	   they keep their own local row styles rather than the shared hover
	   .row-list. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.tk-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.tk-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.tk-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ FEEDBACK CAROUSEL ══════════════════════════════════════════ */
	.carousel { position: relative; }
	.carousel-slide { display: none; flex-direction: column; gap: 1.25rem; max-width: 68ch; }
	.carousel-slide.active { display: flex; }
	.carousel-quote {
		font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 400; font-style: italic; line-height: 1.6;
		color: var(--fg); margin: 0; border: none; padding: 0;
	}
	.carousel-attr { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
	.carousel-name { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em; color: var(--field-accent); text-decoration: none; text-transform: uppercase; }
	a.carousel-name:hover { text-decoration: underline; }
	.carousel-role { font-size: 0.8rem; color: var(--fg-muted); }
	.carousel-role::before { content: '·'; margin-right: 0.6rem; opacity: 0.4; }
	.carousel-controls { display: flex; align-items: center; gap: 1rem; margin-top: 1.75rem; }
	.carousel-arrow {
		background: none; border: 1.5px solid var(--rule-soft); color: var(--fg-muted);
		width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;
		cursor: pointer; font-size: 0.9rem; transition: border-color 0.2s, color 0.2s; flex-shrink: 0;
	}
	.carousel-arrow:hover { border-color: var(--field-accent); color: var(--field-accent); }
	.carousel-dots { display: flex; gap: 0.4rem; }
	.carousel-dot { width: 0.4rem; height: 0.4rem; border-radius: 50%; background: var(--rule-soft); border: none; cursor: pointer; padding: 0; transition: background 0.2s; }
	.carousel-dot.active { background: var(--field-accent); }

	/* ══ SESSIONS / WORKSHOPS ═══════════════════════════════════════ */
	.tk-list-disc {
		width: clamp(13rem, 28vw, 24rem); height: clamp(13rem, 28vw, 24rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-8rem, -11vw, -4rem); left: clamp(-7rem, -8vw, -3rem);
	}
	.workshops-title { margin: 0 0 2rem; }

	.filter-panel {
		display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem;
		padding: 0 0 1.5rem; border-bottom: 2px solid var(--rule-strong); margin-bottom: 0;
	}
	.filter-kicker { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--field-accent); margin: 0 0 0.35rem; }
	.filter-count { color: var(--fg-muted); font-size: 0.875rem; margin: 0; }
	.filter-list { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.5rem; }
	.filter-chip {
		border: 1.5px solid var(--rule-soft); background: transparent; color: var(--fg-muted);
		cursor: pointer; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; line-height: 1;
		padding: 0.65rem 0.8rem; text-transform: uppercase; transition: border-color 0.2s, color 0.2s, background 0.2s;
	}
	.filter-chip:hover, .filter-chip.active {
		border-color: var(--field-accent); color: var(--field-accent);
		background: color-mix(in srgb, var(--field-accent) 8%, transparent);
	}

	/* .acc-list, .acc-item, .acc-btn, .acc-marker, .acc-title, .acc-chevron,
	   .acc-expand, .acc-expand-in, .acc-body live in app.css (shared
	   click-driven accordion). This keeps only the content-specific bits. */

	.row-img-wrap { margin: 0 0 1.25rem; }
	.row-img { width: 100%; height: auto; display: block; }
	.row-desc { font-size: 0.9375rem; color: var(--fg-muted); line-height: 1.75; max-width: 68ch; }
	.row-desc :global(p) { margin-bottom: 0.875rem; }
	.row-desc :global(p:last-child) { margin-bottom: 0; }
	.row-desc :global(strong) { font-weight: 700; color: var(--fg); }
	.row-desc :global(ul) { list-style: disc; padding-left: 1.25rem; margin-bottom: 0.875rem; }
	.row-desc :global(li) { margin-bottom: 0.3rem; }
	.row-links { display: flex; flex-wrap: wrap; gap: 1.25rem; margin-top: 1rem; }
	.session-link {
		display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 1rem;
		font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
		color: var(--field-accent); text-decoration: none;
	}
	.session-link:hover { text-decoration: underline; }
	.row-host { font-size: 0.875rem; color: var(--fg-muted); margin-top: 1rem; }
	.row-host a { color: var(--field-accent); text-decoration: none; }
	.row-host a:hover { text-decoration: underline; }

	.skeleton { padding: 1.25rem 0; display: flex; gap: 1.5rem; align-items: center; }
	.sk-title { flex: 1; height: 1rem; background: var(--rule-soft); }
	.msg-empty { padding: 4rem 0; color: var(--fg-muted); font-size: 1rem; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.tk-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.tk-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }

	@media (max-width: 720px) {
		.filter-panel { align-items: flex-start; flex-direction: column; }
		.filter-list { justify-content: flex-start; }
	}
</style>
