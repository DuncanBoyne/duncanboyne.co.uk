<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, Calendar, Star, Tv } from 'lucide-svelte';
	import { getAnimeBySlug, getAnime } from '$lib/supabase';
	import { marked } from 'marked';
	import type { Anime } from '$lib/types';

	const renderer = new marked.Renderer();
	const originalLinkRenderer = renderer.link.bind(renderer);
	renderer.link = function (args) {
		const html = originalLinkRenderer(args);
		return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
	};
	marked.setOptions({ renderer });

	let anime: Anime | null = null;
	let relatedAnime: Anime[] = [];
	let loading = true;
	let error: string | null = null;

	const statusLabels: Record<string, string> = {
		watching: 'Watching',
		completed: 'Completed',
		on_hold: 'On Hold',
		dropped: 'Dropped',
		plan_to_watch: 'Plan to Watch'
	};

	const statusColors: Record<string, string> = {
		watching: 'bg-warning/20 text-warning',
		completed: 'bg-success/20 text-success',
		on_hold: 'bg-info/20 text-info',
		dropped: 'bg-error/20 text-error',
		plan_to_watch: 'bg-muted/20 text-muted'
	};

	$: slug = $page.params.slug ?? '';

	onMount(async () => {
		try {
			anime = await getAnimeBySlug(slug);
			if (anime && anime.tags && anime.tags.length > 0) {
				const allAnime = (await getAnime()) || [];
				relatedAnime = allAnime.filter(
					a => a.id !== anime!.id && a.tags.some(t => anime!.tags.includes(t))
				).slice(0, 3);
			}
		} catch (e) {
			error = 'Failed to load this anime. It may not exist.';
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
	{#if anime}
		<title>{anime.title} - Anime List - Duncan Boyne</title>
		<meta name="description" content={anime.excerpt || anime.title} />
	{:else}
		<title>Anime - Duncan Boyne</title>
	{/if}
</svelte:head>

<article class="py-16">
	<div class="container-custom max-w-4xl">
		<a
			href="/anime"
			class="inline-flex items-center text-muted hover:text-accent mb-8"
		>
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Anime List
		</a>

		{#if loading}
			<div class="animate-pulse space-y-4">
				<div class="h-8 bg-border rounded w-3/4" />
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
		{:else if error || !anime}
			<div class="text-center py-12">
				<h1 class="text-2xl font-bold text-text mb-4">Anime Not Found</h1>
				<p class="text-muted mb-8">{error || 'This anime could not be found.'}</p>
				<a href="/anime" class="btn-primary">
					<ArrowLeft class="w-4 h-4 mr-2" />
					Back to Anime List
				</a>
			</div>
		{:else}
			<header class="mb-8">
				<div class="flex items-center gap-3 mb-4">
					<span class="text-xs font-medium px-2 py-1 rounded-full {statusColors[anime.status]}">
						{statusLabels[anime.status]}
					</span>
					{#if anime.rating}
						<div class="flex items-center text-sm text-accent">
							<Star class="w-4 h-4 mr-1 fill-current" aria-hidden="true" />
							{anime.rating}/10
						</div>
					{/if}
				</div>

				<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
					{anime.title}
				</h1>

				<div class="flex flex-wrap items-center gap-4 text-muted text-sm mb-4">
					{#if anime.year}
						<span>{anime.year}</span>
					{/if}
					{#if anime.seasons}
						<span>{anime.seasons} season{anime.seasons > 1 ? 's' : ''}</span>
					{/if}
					{#if anime.episodes}
						<span>{anime.episodes} episodes</span>
					{/if}
				</div>

				<div class="flex flex-wrap items-center gap-4 text-muted text-sm">
					{#if anime.started_at}
						<div class="flex items-center">
							<Calendar class="w-4 h-4 mr-2" aria-hidden="true" />
							Started {formatDate(anime.started_at)}
						</div>
					{/if}
					{#if anime.finished_at}
						<div class="flex items-center">
							<Calendar class="w-4 h-4 mr-2" aria-hidden="true" />
							Finished {formatDate(anime.finished_at)}
						</div>
					{/if}
				</div>
			</header>

			{#if anime.image}
				<div class="mb-8">
					<img
						src={anime.image}
						alt="Cover of {anime.title}"
						class="w-full max-h-96 object-cover rounded-xl shadow-lg"
					/>
				</div>
			{/if}

			{#if anime.tags && anime.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-8">
					{#each anime.tags as tag}
						<span class="text-xs px-3 py-1 rounded-full bg-border text-muted">{tag}</span>
					{/each}
				</div>
			{/if}

			{#if anime.review}
				<div class="blog-content">
					{@html marked(anime.review)}
				</div>
			{:else if anime.excerpt}
				<p class="text-lg text-muted">{anime.excerpt}</p>
			{:else}
				<div class="text-center py-8 bg-surface rounded-xl border border-border">
					<Tv class="w-8 h-8 text-accent/30 mx-auto mb-3" aria-hidden="true" />
					<p class="text-muted">No review yet.</p>
				</div>
			{/if}

			<!-- Related Anime -->
			{#if relatedAnime.length > 0}
				<div class="mt-16 pt-8 border-t border-border">
					<h2 class="text-2xl font-bold text-text mb-6">Related Anime</h2>
					<div class="grid md:grid-cols-3 gap-6">
						{#each relatedAnime as related}
							<a
								href="/anime/{related.slug}"
								class="card p-4 transition-all duration-300 hover:shadow-lg hover:border-accent/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent"
							>
								<h3 class="font-semibold text-text mb-1 hover:text-accent transition-colors">{related.title}</h3>
								{#if related.year}
									<p class="text-sm text-muted">{related.year}</p>
								{/if}
								{#if related.rating}
									<div class="flex items-center text-sm text-accent mt-2">
										<Star class="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
										{related.rating}/10
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
		border-left: 4px solid var(--color-accent);
		padding-left: 1rem;
		color: var(--color-muted);
		font-style: italic;
		margin-bottom: 1.25rem;
	}
</style>
