import { error } from '@sveltejs/kit';
import { getAnime, getAnimeBySlug, getRelatedAnime } from '$lib/supabase';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await getAnime()).map((a) => ({ slug: a.slug }));

// Re-runs on slug change (fixing stale content when navigating between
// related anime) and fetches related items with one filtered query instead
// of downloading the whole table.
export const load: PageLoad = async ({ params }) => {
	try {
		const anime = await getAnimeBySlug(params.slug);
		return { anime, relatedAnime: await getRelatedAnime(anime) };
	} catch (e) {
		console.error(`Failed to load anime "${params.slug}"`, e);
		throw error(404, 'This anime could not be found.');
	}
};
