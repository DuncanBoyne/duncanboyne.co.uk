<script lang="ts">
	import { onMount } from 'svelte';
	import { getVideos } from '$lib/supabase';
	import { ArrowUpRight, Play } from 'lucide-svelte';
	import type { Video } from '$lib/types';

	let videos: Video[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			videos = (await getVideos()) || [];
		} catch (e) {
			error = 'Failed to load videos.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	function ytThumb(id: string) {
		return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
	}
</script>

<svelte:head>
	<title>Videos — Duncan Boyne</title>
	<meta name="description" content="Power BI tutorials, tips, and walkthroughs from Duncan Boyne." />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">Content</p>
		<h1 class="page-title">Videos</h1>
		<p class="page-sub">Power BI tutorials, tips, and walkthroughs — on YouTube.</p>
	</div>
</section>

<!-- List -->
<section class="videos-section">
	<div class="wrap">
		{#if loading}
			<ul class="row-list">
				{#each [1,2,3,4,5] as _}
					<li class="row-item skeleton">
						<div class="sk-date"></div>
						<div class="sk-title"></div>
					</li>
				{/each}
			</ul>
		{:else if error}
			<p class="msg-empty">{error}</p>
		{:else if videos.length === 0}
			<p class="msg-empty">No videos yet. Check back soon.</p>
		{:else}
			<ul class="row-list">
				{#each videos as video}
					<li class="row-item">
						<a
							href="https://www.youtube.com/watch?v={video.youtube_id}"
							target="_blank"
							rel="noopener noreferrer"
							class="row-link"
						>
							<div class="row-top">
								{#if video.published_at}
									<span class="row-date">{formatDate(video.published_at)}</span>
								{/if}
								<span class="row-title">{video.title}</span>
								<Play class="row-play ico" />
								<ArrowUpRight class="row-arrow ico" />
							</div>
							<div class="row-expand"><div class="row-expand-in">
								<div class="row-thumb-wrap">
									<img
										src={ytThumb(video.youtube_id)}
										alt={video.title}
										class="row-thumb"
										loading="lazy"
									/>
									<div class="thumb-overlay">
										<Play class="play-icon" />
									</div>
								</div>
								{#if video.description}
									<p class="row-desc">{video.description}</p>
								{/if}
							</div></div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Want more?</p>
		<a href="https://youtube.com/@PowerBIKindaGuy" target="_blank" rel="noopener noreferrer" class="cta-main">
			YouTube <ArrowUpRight class="cta-ico" />
		</a>
		<p class="cta-sub">Subscribe to <strong>@PowerBIKindaGuy</strong> for Power BI tips and tutorials.</p>
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
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* Videos */
	.videos-section { padding: 0 0 clamp(4rem, 8vw, 7rem); }
	.row-list { list-style: none; margin: 0; padding: 0; }
	.row-item { border-bottom: 1px solid var(--color-border); }
	.row-item:first-child { border-top: 1px solid var(--color-border); }

	.row-link { display: block; padding: 1.25rem 0; text-decoration: none; }
	.row-top { display: flex; align-items: center; gap: 1rem; }

	.row-date {
		font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
		color: var(--color-muted); white-space: nowrap; width: 7rem; flex-shrink: 0;
	}
	.row-title {
		font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 600; color: var(--color-text);
		flex: 1; transition: color 0.6s ease;
	}
	.row-link:hover .row-title { color: var(--color-accent2); }
	:global(.ico) { width: 0.9em; height: 0.9em; flex-shrink: 0; display: inline-block; }
	.row-play { color: var(--color-accent); opacity: 0.6; transition: opacity 0.4s; }
	.row-link:hover .row-play { opacity: 1; }
	.row-arrow {
		color: var(--color-muted); flex-shrink: 0;
		transition: color 0.6s ease, transform 0.6s ease;
	}
	.row-link:hover .row-arrow { color: var(--color-accent2); transform: translate(2px,-2px); }

	.row-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.9s ease; }
	.row-link:hover .row-expand { grid-template-rows: 1fr; }
	.row-expand-in { overflow: hidden; }

	.row-thumb-wrap {
		position: relative; width: 100%; aspect-ratio: 16 / 5; overflow: hidden;
		margin: 0.75rem 0 0.25rem;
		opacity: 0; transform: translateY(3px);
		transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.row-link:hover .row-thumb-wrap { opacity: 1; transform: translateY(0); }
	.row-thumb { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
	.thumb-overlay {
		position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
		background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s;
	}
	.row-link:hover .thumb-overlay { opacity: 1; }
	.play-icon { width: 2.5rem; height: 2.5rem; color: white; }

	.row-desc {
		margin: 0.5rem 0 0.25rem; font-size: 0.875rem; color: var(--color-muted);
		line-height: 1.6; max-width: 70ch;
		opacity: 0; transform: translateY(3px);
		transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}
	.row-link:hover .row-desc { opacity: 1; transform: translateY(0); }

	/* CTA */
	.cta-block { padding: clamp(5rem, 10vw, 9rem) 0; border-top: 1px solid var(--color-border); }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(2rem, 5vw, 4.5rem); height: clamp(2rem, 5vw, 4.5rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }

	/* Skeleton */
	.skeleton { padding: 1.25rem 0; display: flex; gap: 1.5rem; align-items: center; }
	.sk-date { width: 7rem; height: 0.75rem; background: var(--color-border); flex-shrink: 0; }
	.sk-title { flex: 1; height: 1rem; background: var(--color-border); }
	.msg-empty { padding: 4rem 0; color: var(--color-muted); font-size: 1rem; }
</style>
