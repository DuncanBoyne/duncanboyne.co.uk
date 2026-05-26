<script lang="ts">
	import { onMount } from 'svelte';
	import { Rss, ArrowUpRight } from 'lucide-svelte';
	import { getPosts } from '$lib/supabase';
	import type { Post } from '$lib/types';

	let posts: Post[] = [];
	let loading = true;
	let error: string | null = null;
	let activeFilter = 'all';

	const filters = [
		{ value: 'all', label: 'All' },
		{ value: 'Power BI', label: 'Power BI' },
		{ value: 'NPPUG', label: 'NPPUG' },
		{ value: 'EoEPPS', label: 'EoEPPS' },
		{ value: 'ManchesterDataHive', label: 'Manchester Data Hive' },
		{ value: 'MentalHealth', label: 'Mental Health' },
		{ value: 'AI', label: 'AI' },
		{ value: 'Talks', label: 'Talks' },
		{ value: 'Conferences', label: 'Conferences' }
	];

	onMount(async () => {
		try {
			posts = (await getPosts()) || [];
		} catch (e) {
			error = 'Failed to load blog posts.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	$: filteredPosts = activeFilter === 'all'
		? posts
		: posts.filter(p => p.tags?.includes(activeFilter));

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>Writing — Duncan Boyne</title>
	<meta name="description" content="Insights, tutorials, and thoughts on Power BI, data visualization, and business intelligence." />
</svelte:head>

<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">Writing</p>
		<h1 class="page-title">Blog</h1>
		<div class="hero-foot">
			<p class="page-sub">Power BI, data, automation, and whatever else is on my mind.</p>
			<a href="/rss.xml" target="_blank" rel="noopener noreferrer" class="rss-link">
				<Rss class="ico" /> RSS feed
			</a>
		</div>
	</div>
</section>

<section class="filters-bar">
	<div class="wrap">
		<div class="filter-list" role="tablist" aria-label="Filter by category">
			{#each filters as f}
				<button
					on:click={() => activeFilter = f.value}
					class="filter-btn"
					class:active={activeFilter === f.value}
					role="tab"
					aria-selected={activeFilter === f.value}
				>
					{f.label}
				</button>
			{/each}
		</div>
	</div>
</section>

<section class="posts-section">
	<div class="wrap">
		{#if loading}
			<ul class="row-list">
				{#each [1,2,3,4,5,6] as _}
					<li class="row-item skeleton">
						<div class="sk-date"></div>
						<div class="sk-title"></div>
					</li>
				{/each}
			</ul>
		{:else if error}
			<p class="msg-empty">{error}</p>
		{:else if filteredPosts.length === 0}
			<p class="msg-empty">No posts in this category.</p>
		{:else}
			<ul class="row-list">
				{#each filteredPosts as post}
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
		{/if}
	</div>
</section>

<style>
	.wrap {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 5vw, 3.5rem);
	}

	/* Hero */
	.page-hero {
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(1.5rem, 3vw, 2.5rem);
		border-bottom: 3px solid var(--color-accent3);
	}

	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 0.75rem;
	}

	.page-title {
		font-size: clamp(3rem, 10vw, 9rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 0.9;
		color: var(--color-text);
		margin: 0 0 clamp(1rem, 2vw, 2rem);
	}

	.hero-foot {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
	}

	.page-sub {
		font-size: clamp(1rem, 1.8vw, 1.25rem);
		color: var(--color-muted);
		margin: 0;
	}

	.rss-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.3s;
	}
	.rss-link:hover { color: var(--color-accent); }

	/* Filters */
	.filters-bar {
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.filter-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-btn {
		padding: 0.4rem 0.9rem;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		border: 1.5px solid var(--color-border);
		color: var(--color-muted);
		background: transparent;
		cursor: pointer;
		transition: border-color 0.3s, color 0.3s, background 0.3s;
	}
	.filter-btn:hover { color: var(--color-text); border-color: var(--color-text); }
	.filter-btn.active {
		background: var(--color-accent);
		color: var(--color-on-accent);
		border-color: var(--color-accent);
	}

	/* Posts */
	.posts-section { padding: 0 0 clamp(4rem, 8vw, 7rem); }

	.row-list { list-style: none; margin: 0; padding: 0; }
	.row-item { border-bottom: 1px solid var(--color-border); }
	.row-item:first-child { border-top: 1px solid var(--color-border); }

	.row-link {
		display: block;
		padding: 1.25rem 0;
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
	.row-link:hover .row-title { color: var(--color-accent2); }

	:global(.ico) { width: 0.9em; height: 0.9em; flex-shrink: 0; display: inline-block; }

	.row-arrow {
		color: var(--color-muted);
		flex-shrink: 0;
		transition: color 0.6s ease, transform 0.6s ease;
	}
	.row-link:hover .row-arrow { color: var(--color-accent2); transform: translate(2px,-2px); }

	.row-expand {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.9s ease;
	}
	.row-link:hover .row-expand { grid-template-rows: 1fr; }
	.row-expand-in { overflow: hidden; }

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

	/* Skeleton */
	.skeleton { padding: 1.25rem 0; display: flex; gap: 1.5rem; align-items: center; }
	.sk-date { width: 7rem; height: 0.75rem; background: var(--color-border); flex-shrink: 0; }
	.sk-title { flex: 1; height: 1rem; background: var(--color-border); }

	.msg-empty { padding: 4rem 0; color: var(--color-muted); font-size: 1rem; }
</style>
