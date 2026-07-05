import { getGamingAchievements } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return { achievements: await getGamingAchievements() };
};
