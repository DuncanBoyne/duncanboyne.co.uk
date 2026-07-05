<script lang="ts">
	import { Star, ArrowRight, BookOpen } from 'lucide-svelte';
	import { bookStatusLabels as statusLabels, bookStatusColors as statusColors } from '$lib/labels';
	import type { Book } from '$lib/types';

	export let book: Book;

	let imageFailed = false;
</script>

<article class="group cursor-pointer h-full">
	<a href="/reading/{book.slug}" class="block h-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-xl">
		<div class="card h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-accent/50 group-hover:-translate-y-1">
			{#if book.image && !imageFailed}
				<div class="aspect-[2/3] max-h-64 overflow-hidden bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
					<img
						src={book.image}
						alt="Cover of {book.title}"
						class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						on:error={() => imageFailed = true}
					/>
				</div>
			{:else}
				<div class="aspect-video bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
					<BookOpen class="w-12 h-12 text-accent/30" aria-hidden="true" />
				</div>
			{/if}

			<div class="p-5 flex flex-col flex-1">
				<div class="flex items-center justify-between mb-3">
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

				<h3 class="text-lg font-semibold text-text mb-1 group-hover:text-accent transition-colors line-clamp-2">
					{book.title}
				</h3>

				<p class="text-sm text-muted mb-2">{book.author}</p>

				{#if book.series}
					<p class="text-xs text-muted/70 mb-2">{book.series}</p>
				{/if}

				{#if book.excerpt}
					<p class="text-muted text-sm mb-4 line-clamp-2">
						{book.excerpt}
					</p>
				{/if}

				<span class="inline-flex items-center text-accent font-medium text-sm group-hover:underline mt-auto">
					{book.review ? 'Read review' : 'View details'}<span class="sr-only"> for {book.title}</span>
					<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
				</span>
			</div>
		</div>
	</a>
</article>
