import { getPosts } from '$lib/supabase';
import type { PageLoad } from './$types';

// Fetch at the load boundary so the prerendered HTML contains the real post
// list (crawlable links), instead of an empty client-side skeleton.
export const load: PageLoad = async () => {
	return { posts: await getPosts() };
};
