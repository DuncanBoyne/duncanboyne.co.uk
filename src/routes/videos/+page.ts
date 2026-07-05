import { getVideos } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return { videos: await getVideos() };
};
