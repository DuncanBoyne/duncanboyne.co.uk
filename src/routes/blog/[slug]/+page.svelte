<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, Calendar, Clock } from 'lucide-svelte';
	import { getPostBySlug } from '$lib/supabase';
	import { marked } from 'marked';
	import Carousel from '$lib/components/Carousel.svelte';

	const carousels: Record<string, string[]> = {
		'ai-adoption-power-bi': Array.from({ length: 8 }, (_, i) => `/carousel-ai-power-bi/slide-${i + 1}.png`)
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

<article class="py-16">
	<div class="container-custom max-w-4xl">
		<!-- Breadcrumbs -->
		<nav aria-label="Breadcrumb" class="mb-6">
			<ol class="flex items-center gap-2 text-sm text-muted flex-wrap">
				<li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
				<li aria-hidden="true" class="text-border">›</li>
				<li><a href="/blog" class="hover:text-accent transition-colors">Blog</a></li>
				{#if post}
					<li aria-hidden="true" class="text-border">›</li>
					<li class="text-text truncate max-w-[200px]" aria-current="page">{post.title}</li>
				{/if}
			</ol>
		</nav>

		<a
			href="/blog"
			class="inline-flex items-center text-muted hover:text-accent mb-8"
		>
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Blog
		</a>

		{#if loading}
			<div class="animate-pulse space-y-4">
				<div class="h-8 bg-border rounded w-3/4" />
				<div class="flex space-x-4">
					<div class="h-4 bg-border rounded w-32" />
					<div class="h-4 bg-border rounded w-24" />
				</div>
				<div class="aspect-video bg-border rounded-xl" />
				<div class="space-y-2">
					{#each [1, 2, 3, 4, 5] as _}
						<div class="h-4 bg-border rounded" />
					{/each}
				</div>
			</div>
		{:else if error || !post}
			<div class="text-center py-12">
				<h1 class="text-2xl font-bold text-text mb-4">Post Not Found</h1>
				<p class="text-muted mb-8">{error || 'This blog post could not be found.'}</p>
				<a href="/blog" class="btn-primary">
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to Blog
				</a>
			</div>
		{:else}
			<header class="mb-8">
				<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
					{post.title}
				</h1>

				<div class="flex flex-wrap items-center gap-4 text-muted">
					{#if post.published_at}
						<div class="flex items-center">
							<Calendar class="w-4 h-4 mr-2" />
							<time datetime={post.published_at}>{formatDate(post.published_at)}</time>
						</div>
					{/if}
					<div class="flex items-center">
						<Clock class="w-4 h-4 mr-2" />
						<span>{estimateReadingTime(post.content)} min read</span>
					</div>
				</div>
			</header>

			{#if post.featured_image}
				<div class="mb-8">
					<img
						src={post.featured_image}
						alt={post.title}
						class="w-full rounded-xl shadow-lg"
					/>
				</div>
			{/if}

			{#if carousels[post.slug]}
				<div class="mb-8">
					<Carousel images={carousels[post.slug]} alt={post.title} />
				</div>
			{/if}

			<div class="blog-content">
				{@html marked(post.content)}
			</div>
		{/if}
	</div>
</article>

<style>
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
</style>
