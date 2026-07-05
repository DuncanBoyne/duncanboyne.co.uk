<script lang="ts">
	import { Star, ArrowRight, Tv } from 'lucide-svelte';
	import { animeStatusLabels as statusLabels, animeStatusColors as statusColors } from '$lib/labels';
	import type { Anime } from '$lib/types';

	export let anime: Anime;
</script>

<article class="group cursor-pointer h-full">
	<a href="/anime/{anime.slug}" class="block h-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-xl">
		<div class="card h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-accent/50 group-hover:-translate-y-1">
			{#if anime.image}
				<div class="aspect-video overflow-hidden bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
					<img
						src={anime.image}
						alt="Cover of {anime.title}"
						class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			{:else}
				<div class="aspect-video bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
					<Tv class="w-12 h-12 text-accent/30" aria-hidden="true" />
				</div>
			{/if}

			<div class="p-5 flex flex-col flex-1">
				<div class="flex items-center justify-between mb-3">
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

				<h3 class="text-lg font-semibold text-text mb-1 group-hover:text-accent transition-colors line-clamp-2">
					{anime.title}
				</h3>

				<div class="flex items-center gap-2 text-sm text-muted mb-2">
					{#if anime.year}
						<span>{anime.year}</span>
					{/if}
					{#if anime.seasons}
						<span>{anime.year ? '·' : ''} {anime.seasons} season{anime.seasons > 1 ? 's' : ''}</span>
					{/if}
					{#if anime.episodes}
						<span>· {anime.episodes} eps</span>
					{/if}
				</div>

				{#if anime.excerpt}
					<p class="text-muted text-sm mb-4 line-clamp-2">
						{anime.excerpt}
					</p>
				{/if}

				<span class="inline-flex items-center text-accent font-medium text-sm group-hover:underline mt-auto">
					{anime.review ? 'Read review' : 'View details'}<span class="sr-only"> for {anime.title}</span>
					<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
				</span>
			</div>
		</div>
	</a>
</article>
