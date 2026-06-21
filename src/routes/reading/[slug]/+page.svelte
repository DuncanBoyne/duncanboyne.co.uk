<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, Calendar, Star, BookOpen } from 'lucide-svelte';
	import { getBookBySlug, getBooks } from '$lib/supabase';
	import { marked } from 'marked';
	import type { Book } from '$lib/types';

	const renderer = new marked.Renderer();
	const originalLinkRenderer = renderer.link.bind(renderer);
	renderer.link = function (args) {
		const html = originalLinkRenderer(args);
		return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
	};
	marked.setOptions({ renderer });

	let book: Book | null = null;
	let relatedBooks: Book[] = [];
	let loading = true;
	let error: string | null = null;

	const statusLabels: Record<string, string> = {
		want_to_read: 'Want to Read',
		reading: 'Reading',
		completed: 'Completed'
	};

	const statusColors: Record<string, string> = {
		want_to_read: 'bg-info/20 text-info',
		reading: 'bg-warning/20 text-warning',
		completed: 'bg-success/20 text-success'
	};

	$: slug = $page.params.slug ?? '';

	onMount(async () => {
		try {
			book = await getBookBySlug(slug);
			if (book && book.tags && book.tags.length > 0) {
				const allBooks = (await getBooks()) || [];
				relatedBooks = allBooks.filter(
					b => b.id !== book!.id && b.tags.some(t => book!.tags.includes(t))
				).slice(0, 3);
			}
		} catch (e) {
			error = 'Failed to load this book. It may not exist.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	{#if book}
		<title>{book.title} - Reading List - Duncan Boyne</title>
		<meta name="description" content={book.excerpt || `${book.title} by ${book.author}`} />
	{:else}
		<title>Book - Duncan Boyne</title>
	{/if}
</svelte:head>

<article class="py-16">
	<div class="container-custom max-w-4xl">
		<a
			href="/reading"
			class="inline-flex items-center text-muted hover:text-accent mb-8"
		>
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Reading List
		</a>

		{#if loading}
			<div class="animate-pulse space-y-4">
				<div class="h-8 bg-border rounded w-3/4" />
				<div class="h-4 bg-border rounded w-1/3" />
				<div class="flex space-x-4">
					<div class="h-4 bg-border rounded w-32" />
					<div class="h-4 bg-border rounded w-24" />
				</div>
				<div class="space-y-2">
					{#each [1, 2, 3, 4, 5] as _}
						<div class="h-4 bg-border rounded" />
					{/each}
				</div>
			</div>
		{:else if error || !book}
			<div class="text-center py-12">
				<h1 class="text-2xl font-bold text-text mb-4">Book Not Found</h1>
				<p class="text-muted mb-8">{error || 'This book could not be found.'}</p>
				<a href="/reading" class="btn-primary">
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to Reading List
				</a>
			</div>
		{:else}
			<header class="mb-8">
				<div class="flex items-center gap-3 mb-4">
					<span class="text-xs font-medium px-2 py-1 rounded-full {statusColors[book.status]}">
						{statusLabels[book.status]}
					</span>
					{#if book.rating}
						<div class="flex items-center text-sm text-accent">
							<Star class="w-4 h-4 mr-1 fill-current" aria-hidden="true" />
							{book.rating}/10
						</div>
					{/if}
				</div>

				<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-2">
					{book.title}
				</h1>

				<p class="text-lg text-muted mb-2">by {book.author}</p>

				{#if book.series}
					<p class="text-sm text-muted/70 mb-4">{book.series}</p>
				{/if}

				<div class="flex flex-wrap items-center gap-4 text-muted text-sm">
					{#if book.started_at}
						<div class="flex items-center">
							<Calendar class="w-4 h-4 mr-2" aria-hidden="true" />
							Started {formatDate(book.started_at)}
						</div>
					{/if}
					{#if book.finished_at}
						<div class="flex items-center">
							<Calendar class="w-4 h-4 mr-2" aria-hidden="true" />
							Finished {formatDate(book.finished_at)}
						</div>
					{/if}
				</div>
			</header>

			{#if book.image}
				<div class="mb-8 flex justify-center">
					<img
						src={book.image}
						alt="Cover of {book.title}"
						class="max-h-96 rounded-xl shadow-lg"
					/>
				</div>
			{/if}

			{#if book.tags && book.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-8">
					{#each book.tags as tag}
						<span class="text-xs px-3 py-1 rounded-full bg-border text-muted">{tag}</span>
					{/each}
				</div>
			{/if}

			{#if book.review}
				<div class="blog-content">
					{@html marked(book.review)}
				</div>
			{:else if book.excerpt}
				<p class="text-lg text-muted">{book.excerpt}</p>
			{:else}
				<div class="text-center py-8 bg-surface rounded-xl border border-border">
					<BookOpen class="w-8 h-8 text-accent/30 mx-auto mb-3" aria-hidden="true" />
					<p class="text-muted">No review yet.</p>
				</div>
			{/if}

			<!-- Related Books -->
			{#if relatedBooks.length > 0}
				<div class="mt-16 pt-8 border-t border-border">
					<h2 class="text-2xl font-bold text-text mb-6">Related Books</h2>
					<div class="grid md:grid-cols-3 gap-6">
						{#each relatedBooks as relatedBook}
							<a
								href="/reading/{relatedBook.slug}"
								class="card p-4 transition-all duration-300 hover:shadow-lg hover:border-accent/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent"
							>
								<h3 class="font-semibold text-text mb-1 hover:text-accent transition-colors">{relatedBook.title}</h3>
								<p class="text-sm text-muted">{relatedBook.author}</p>
								{#if relatedBook.rating}
									<div class="flex items-center text-sm text-accent mt-2">
										<Star class="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
										{relatedBook.rating}/10
									</div>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</article>

<style>
	.blog-content {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text);
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
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-accent) 5%, transparent);
		padding: 1rem 1.25rem;
		color: var(--color-muted);
		font-style: italic;
		margin-bottom: 1.25rem;
	}
</style>
