<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, Calendar, Clock } from 'lucide-svelte';
	import { getPostBySlug } from '$lib/supabase';
	import { marked } from 'marked';
	import Carousel from '$lib/components/Carousel.svelte';

	const carousels: Record<string, string[]> = {
		'ai-adoption-power-bi': Array.from({ length: 8 }, (_, i) => `/carousel-ai-power-bi/slide-${i + 1}.png`),
		'linkedin-analytics-dashboard-claude-code': Array.from({ length: 10 }, (_, i) => `/carousel-linkedin-dashboard/slide-${i + 1}.png`)
	};
	import type { Post } from '$lib/types';

	const renderer = new marked.Renderer();
	const originalLinkRenderer = renderer.link.bind(renderer);
	renderer.link = function (args) {
		const html = originalLinkRenderer(args);
		return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
	};
	marked.setOptions({ renderer });

	let post: Post | null = null;
	let loading = true;
	let error: string | null = null;

	$: slug = $page.params.slug;

	onMount(async () => {
		try {
			post = await getPostBySlug(slug);
		} catch (e) {
			error = 'Failed to load this blog post. It may not exist.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function estimateReadingTime(content: string): number {
		const wordsPerMinute = 200;
		const words = content.split(/\s+/).length;
		return Math.ceil(words / wordsPerMinute);
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title} - Duncan Boyne</title>
		<meta name="description" content={post.excerpt || ''} />
	{:else}
		<title>Blog Post - Duncan Boyne</title>
	{/if}
</svelte:head>

<article>
	<!-- Back link -->
	<div class="post-nav">
		<div class="wrap">
			<a href="/blog" class="back-link">
				<ArrowLeft class="w-4 h-4" /> Writing
			</a>
		</div>
	</div>

	<div class="wrap">
		{#if loading}
			<div class="skeleton-wrap">
				<div class="sk-title"></div>
				<div class="sk-meta"></div>
				<div class="sk-img"></div>
				{#each [1,2,3,4,5] as _}<div class="sk-line"></div>{/each}
			</div>
		{:else if error || !post}
			<div class="not-found">
				<h1>Post Not Found</h1>
				<p>{error || 'This blog post could not be found.'}</p>
				<a href="/blog" class="btn-primary"><ArrowLeft class="w-4 h-4 mr-2" /> Back to Writing</a>
			</div>
		{:else}
			<header class="post-header">
				<p class="post-eyebrow">
					{#if post.published_at}
						<time datetime={post.published_at}>{formatDate(post.published_at)}</time>
					{/if}
					<span class="meta-sep">·</span>
					<span>{estimateReadingTime(post.content)} min read</span>
				</p>
				<h1 class="post-title">{post.title}</h1>
				{#if post.tags?.length}
					<div class="post-tags">
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</header>

			{#if post.featured_image && !carousels[post.slug]}
				<div class="post-image">
					<img src={post.featured_image} alt={post.title} />
				</div>
			{/if}

			{#if carousels[post.slug]}
				<div class="post-image">
					<Carousel images={carousels[post.slug]} alt={post.title} />
				</div>
			{/if}

			<div class="blog-content">
				{@html marked(post.content)}
			</div>

			<div class="post-footer">
				<a href="/blog" class="back-link"><ArrowLeft class="w-4 h-4" /> Back to Writing</a>
			</div>
		{/if}
	</div>
</article>

<style>
	.wrap {
		max-width: 780px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 5vw, 3.5rem);
	}

	/* Nav */
	.post-nav {
		border-bottom: 1px solid var(--color-border);
		padding: 1rem 0;
		background: var(--color-surface);
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.3s;
	}
	.back-link:hover { color: var(--color-accent); }

	/* Header */
	.post-header {
		padding: clamp(2.5rem, 5vw, 4rem) 0 2rem;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 2.5rem;
	}

	.post-eyebrow {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.meta-sep { opacity: 0.4; }

	.post-title {
		font-size: clamp(1.8rem, 5vw, 3.5rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0 0 1.25rem;
	}

	.post-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
	.tag {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.25rem 0.6rem;
		border: 1.5px solid var(--color-border);
		color: var(--color-muted);
	}

	/* Image */
	.post-image { margin-bottom: 2.5rem; }
	.post-image img { width: 100%; height: auto; display: block; }

	/* Footer */
	.post-footer { padding: 3rem 0 4rem; border-top: 1px solid var(--color-border); margin-top: 3rem; }

	/* Skeleton */
	.skeleton-wrap { padding: clamp(2rem, 5vw, 4rem) 0; display: flex; flex-direction: column; gap: 1rem; }
	.sk-title { height: 2.5rem; background: var(--color-border); width: 75%; }
	.sk-meta { height: 0.75rem; background: var(--color-border); width: 40%; }
	.sk-img { aspect-ratio: 16/9; background: var(--color-border); margin: 1rem 0; }
	.sk-line { height: 0.875rem; background: var(--color-border); }
	.sk-line:nth-child(odd) { width: 90%; }

	/* Not found */
	.not-found { padding: clamp(3rem, 8vw, 6rem) 0; }
	.not-found h1 { font-size: 1.5rem; font-weight: 900; margin: 0 0 0.75rem; }
	.not-found p { color: var(--color-muted); margin: 0 0 2rem; }

	.blog-content {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text);
		max-width: 65ch;
	}

	.blog-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
		font-weight: 500;
	}

	.blog-content :global(a:hover),
	.blog-content :global(a:focus) {
		color: var(--color-accent2);
	}

	.blog-content :global(h1),
	.blog-content :global(h2),
	.blog-content :global(h3) {
		color: var(--color-text);
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.blog-content :global(h1) { font-size: 2rem; }
	.blog-content :global(h2) { font-size: 1.5rem; }
	.blog-content :global(h3) { font-size: 1.25rem; }

	.blog-content :global(p) {
		margin-bottom: 1.25rem;
	}

	.blog-content :global(strong) {
		font-weight: 700;
	}

	.blog-content :global(ul),
	.blog-content :global(ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.blog-content :global(ul) { list-style-type: disc; }
	.blog-content :global(ol) { list-style-type: decimal; }

	.blog-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.blog-content :global(hr) {
		border-color: var(--color-border);
		margin: 2rem 0;
	}

	.blog-content :global(blockquote) {
		border-left: 4px solid var(--color-accent);
		padding-left: 1rem;
		color: var(--color-muted);
		font-style: italic;
		margin-bottom: 1.25rem;
	}

	.blog-content :global(pre) {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		overflow-x: auto;
		margin-bottom: 1.25rem;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.blog-content :global(code) {
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		padding: 0.125rem 0.375rem;
		font-size: 0.875em;
	}

	.blog-content :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: 1em;
	}

	.blog-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1.25rem;
		font-size: 1rem;
	}

	.blog-content :global(th),
	.blog-content :global(td) {
		border: 1px solid var(--color-border);
		padding: 0.5rem 0.75rem;
		text-align: left;
	}

	.blog-content :global(th) {
		background: var(--color-surface);
		font-weight: 600;
		color: var(--color-text);
	}

	.blog-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.75rem;
		border: 1px solid var(--color-border);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
	}
</style>
