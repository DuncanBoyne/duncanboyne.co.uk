import { error } from '@sveltejs/kit';
import { getTalkBySlug, getTalks, getEventsByTalkSlug, getFeedbackByTalkSlug } from '$lib/supabase';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender every talk known at build time; newer ones still resolve via the
// SPA fallback re-running this load in the browser.
export const entries: EntryGenerator = async () =>
	(await getTalks()).map((t) => ({ slug: t.slug }));

export const load: PageLoad = async ({ params }) => {
	try {
		const [talk, events, feedback] = await Promise.all([
			getTalkBySlug(params.slug),
			getEventsByTalkSlug(params.slug),
			getFeedbackByTalkSlug(params.slug)
		]);
		return { talk, events: events ?? [], feedback: feedback ?? [] };
	} catch (e) {
		console.error(`Failed to load talk "${params.slug}"`, e);
		throw error(404, 'This talk could not be found.');
	}
};
