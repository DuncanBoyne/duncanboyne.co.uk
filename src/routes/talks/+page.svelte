<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionizeSessions } from '$lib/sessionize';
	import { getTalks } from '$lib/supabase';
	import { ArrowUpRight, ChevronDown } from 'lucide-svelte';
	import { marked } from 'marked';
	import type { SessionizeSession } from '$lib/sessionize';
	import type { Talk } from '$lib/types';

	function normalize(s: string) {
		return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
	}

	let sessions: SessionizeSession[] = [];
	let imageMap: Record<number, string> = {};
	let loading = true;
	let error: string | null = null;
	let openId: number | null = null;

	function toggle(id: number) {
		openId = openId === id ? null : id;
	}

	onMount(async () => {
		try {
			const [sz, supabaseTalks] = await Promise.all([
				getSessionizeSessions(),
				getTalks()
			]);
			sessions = sz;

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
</style>
