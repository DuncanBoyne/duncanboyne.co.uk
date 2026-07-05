import { error } from '@sveltejs/kit';
import { getBooks, getBookBySlug, getRelatedBooks } from '$lib/supabase';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await getBooks()).map((b) => ({ slug: b.slug }));

// Re-runs on slug change (fixing stale content when navigating between
// related books) and fetches related items with one filtered query instead
// of downloading the whole table.
export const load: PageLoad = async ({ params }) => {
	try {
		const book = await getBookBySlug(params.slug);
		return { book, relatedBooks: await getRelatedBooks(book) };
	} catch (e) {
		console.error(`Failed to load book "${params.slug}"`, e);
		throw error(404, 'This book could not be found.');
	}
};
