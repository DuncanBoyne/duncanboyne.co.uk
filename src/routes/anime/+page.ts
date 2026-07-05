import { getAnime } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return { animeList: await getAnime() };
};
