import { error } from '@sveltejs/kit';
import { reports, getReport } from '$lib/reports';
import type { EntryGenerator, PageLoad } from './$types';

// The catalog is a static module, so every report page can be prerendered to
// its own HTML file at build time (unlike the Supabase-backed blog/talks pages).
export const prerender = true;

export const entries: EntryGenerator = () => reports.map((r) => ({ slug: r.slug }));

export const load: PageLoad = ({ params }) => {
	const report = getReport(params.slug);
	if (!report) throw error(404, 'Report not found');
	return { report };
};
