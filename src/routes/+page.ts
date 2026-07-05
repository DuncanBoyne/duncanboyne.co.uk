import { getPosts, getEvents } from '$lib/supabase';
import type { PageLoad } from './$types';

// Bands stay independent: one failing fetch never blanks the other. A null
// band renders its error state instead of failing the whole page or build.
export const load: PageLoad = async () => {
	const [posts, events] = await Promise.allSettled([getPosts(4), getEvents(true, 3)]);
	if (posts.status === 'rejected') console.error('Failed to load posts', posts.reason);
	if (events.status === 'rejected') console.error('Failed to load events', events.reason);
	return {
		posts: posts.status === 'fulfilled' ? posts.value : null,
		events: events.status === 'fulfilled' ? events.value : null
	};
};
