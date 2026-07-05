<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
	import BookCard from '$lib/components/BookCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: books = data.books;

	let activeFilter = 'all';
	let sortBy = 'recent';

	const filters = [
		{ value: 'all', label: 'All' },
		{ value: 'reading', label: 'Reading' },
		{ value: 'want_to_read', label: 'Want to Read' },
		{ value: 'completed', label: 'Completed' }
	];

	const sortOptions = [
		{ value: 'recent', label: 'Recently Finished' },
		{ value: 'rating', label: 'Rating' },
		{ value: 'title', label: 'Title' }
	];

	$: currentlyReading = books.filter(b => b.status === 'reading');

	$: filteredBooks = books.filter(b => activeFilter === 'all' || b.status === activeFilter);

	$: sortedBooks = [...filteredBooks].sort((a, b) => {
		if (sortBy === 'recent') {
			if (a.finished_at && !b.finished_at) return -1;
			if (!a.finished_at && b.finished_at) return 1;
			const aDate = a.finished_at || a.started_at || a.created_at;
			const bDate = b.finished_at || b.started_at || b.created_at;
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		}
		if (sortBy === 'rating') {
			return (b.rating || 0) - (a.rating || 0);
		}
		return a.title.localeCompare(b.title);
	});
</script>

<Seo
	title="Reading List — Duncan Boyne"
	description="Books I've read, am reading, and want to read — with reviews and ratings."
	path="/reading"
/>

<section class="py-16">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-text mb-4">Reading List</h1>
			<p class="text-lg text-muted max-w-2xl mx-auto">
				Books I've read, am reading, and want to read — with reviews and ratings.
			</p>
		</div>

			<!-- Currently Reading Highlight -->
			{#if currentlyReading.length > 0 && (activeFilter === 'all' || activeFilter === 'reading')}
				<div class="mb-12">
					<h2 class="text-2xl font-bold text-text mb-6 flex items-center gap-2">
						<BookOpen class="w-6 h-6 text-accent" aria-hidden="true" />
						Currently Reading
					</h2>
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
						{#each currentlyReading as book}
							<BookCard {book} />
						{/each}
					</div>
				</div>
			{/if}

			<!-- Filters & Sort -->
			<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
					{#each filters as filter}
						<button
							on:click={() => activeFilter = filter.value}
							class="px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent {activeFilter === filter.value
								? 'bg-accent text-bg'
								: 'bg-surface border border-border text-muted hover:text-text hover:border-accent/50'}"
							role="tab"
							aria-selected={activeFilter === filter.value}
						>
							{filter.label}
						</button>
					{/each}
				</div>

				<div class="flex items-center gap-2">
					<label for="sort-reading" class="text-sm font-medium text-muted">Sort by</label>
					<select
						id="sort-reading"
						bind:value={sortBy}
						class="px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text focus:outline-none focus:ring-2 focus:ring-accent"
					>
						{#each sortOptions as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Book Grid -->
			{#if sortedBooks.length === 0}
				<div class="text-center py-12 bg-surface rounded-xl border border-border">
					<BookOpen class="w-12 h-12 text-accent/30 mx-auto mb-4" aria-hidden="true" />
					<p class="text-muted">No books found for this filter.</p>
					<p class="text-muted/70 text-sm mt-2">Try a different filter or check back later.</p>
				</div>
			{:else}
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
					{#each sortedBooks as book}
						<BookCard {book} />
					{/each}
				</div>
			{/if}
	</div>
</section>
