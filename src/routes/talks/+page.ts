import { getSessionizeSessions } from '$lib/sessionize';
import { getTalks, getFeaturedFeedback } from '$lib/supabase';
import type { PageLoad } from './$types';

// Fetch at the load boundary so the prerendered HTML contains the real
// session list and talk links for crawlers.
export const load: PageLoad = async () => {
	const [sessions, talks, feedback] = await Promise.all([
		getSessionizeSessions(),
		getTalks(),
		getFeaturedFeedback()
	]);
	return { sessions, talks, feedback: feedback ?? [] };
};
