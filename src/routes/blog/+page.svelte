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

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream bl-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle bl-hero-disc"></span>
		<span class="b-shape bl-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
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

<!-- Filters — utility strip, not a poster field -->
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

<!-- ══ POSTS — surface field ════════════════════════════════════════════ -->
<section class="band band--surface posts-section">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle bl-posts-disc"></span>
	</div>
	<div class="wrap">
		{#if loading}
			<ul class="row-list">
				{#each [1,2,3,4,5,6] as _}
					<li class="row-item skeleton">
						<span class="sk-date"></span><span class="sk-title"></span>
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
								<span class="row-marker" aria-hidden="true"></span>
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
	/* .wrap, .ico, the field system, bleeds, and .row-list all live in
	   app.css (Bauhaus poster kit). This block keeps only what's specific
	   to Blog's own hero, filters bar, and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.bl-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(1.5rem, 3vw, 2.5rem); }
	.bl-hero-disc {
		width: clamp(16rem, 36vw, 32rem); height: clamp(16rem, 36vw, 32rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-10rem, -12vw, -5rem); right: clamp(-11rem, -12vw, -5rem);
	}
	.bl-hero-bar { width: clamp(5rem, 16vw, 12rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.hero-foot { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-bottom: clamp(1rem, 2vw, 1.5rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.25rem); color: var(--color-muted); margin: 0; }
	.rss-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; font-weight: 600; color: var(--color-muted); text-decoration: none; transition: color 0.3s; }
	.rss-link:hover { color: var(--color-accent); }

	/* ══ FILTERS ════════════════════════════════════════════════════ */
	.filters-bar { padding: 1.25rem 0; border-bottom: 1px solid var(--color-border); background: var(--color-surface); }
	.filter-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.filter-btn {
		padding: 0.4rem 0.9rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em;
		border: 1.5px solid var(--color-border); color: var(--color-muted); background: transparent;
		cursor: pointer; transition: border-color 0.3s, color 0.3s, background 0.3s;
	}
	.filter-btn:hover { color: var(--color-text); border-color: var(--color-text); }
	.filter-btn.active { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }

	/* ══ POSTS ══════════════════════════════════════════════════════ */
	.bl-posts-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -9vw, -4rem);
	}
</style>
