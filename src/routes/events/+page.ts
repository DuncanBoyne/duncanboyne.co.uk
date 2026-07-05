import { getEvents } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [upcomingEvents, pastEvents] = await Promise.all([getEvents(true), getEvents(false)]);
	return { upcomingEvents, pastEvents };
};
