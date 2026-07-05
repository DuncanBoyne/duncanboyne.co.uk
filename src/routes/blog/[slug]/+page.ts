import { error } from '@sveltejs/kit';
import { getPostBySlug, getPosts } from '$lib/supabase';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender every post known at build time so crawlers get real HTML (not
// the 404.html SPA fallback). A post published to Supabase after the last
// build still works: the fallback router re-runs this load in the browser.
export const entries: EntryGenerator = async () =>
	(await getPosts()).map((p) => ({ slug: p.slug }));

export const load: PageLoad = async ({ params }) => {
	try {
		return { post: await getPostBySlug(params.slug) };
	} catch (e) {
		console.error(`Failed to load post "${params.slug}"`, e);
		throw error(404, 'This blog post could not be found.');
	}
};
