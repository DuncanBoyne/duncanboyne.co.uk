import type { RequestHandler } from './$types';
import { getPosts, getTalks } from '$lib/supabase';

export const prerender = true;

const SITE = 'https://www.duncanboyne.co.uk';

// Static routes with rough priorities. Home/services/about/contact lead
// because they carry the local-SEO intent.
const staticRoutes: { path: string; priority: number; changefreq: string }[] = [
	{ path: '/', priority: 1.0, changefreq: 'weekly' },
	{ path: '/services', priority: 0.9, changefreq: 'monthly' },
	{ path: '/faq', priority: 0.8, changefreq: 'monthly' },
	{ path: '/about', priority: 0.8, changefreq: 'monthly' },
	{ path: '/contact', priority: 0.8, changefreq: 'yearly' },
	{ path: '/blog', priority: 0.7, changefreq: 'weekly' },
	{ path: '/open-source', priority: 0.6, changefreq: 'monthly' },
	{ path: '/talks', priority: 0.6, changefreq: 'monthly' },
	{ path: '/events', priority: 0.6, changefreq: 'weekly' },
	{ path: '/summit', priority: 0.6, changefreq: 'monthly' },
	{ path: '/user-group', priority: 0.5, changefreq: 'monthly' },
	{ path: '/videos', priority: 0.5, changefreq: 'monthly' },
	{ path: '/reading', priority: 0.3, changefreq: 'monthly' }
];

function url(path: string, priority: number, changefreq: string, lastmod?: string) {
	return `
	<url>
		<loc>${SITE}${path}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}
		<changefreq>${changefreq}</changefreq>
		<priority>${priority.toFixed(1)}</priority>
	</url>`;
}

export const GET: RequestHandler = async () => {
	const [posts, talks] = await Promise.all([getPosts(), getTalks()]);

	const staticUrls = staticRoutes.map((r) => url(r.path, r.priority, r.changefreq)).join('');

	const postUrls = (posts || [])
		.map((p) => {
			const lastmod = (p.published_at ?? p.created_at)?.split('T')[0];
			return url(`/blog/${p.slug}`, 0.6, 'monthly', lastmod);
		})
		.join('');

	const talkUrls = (talks || []).map((t) => url(`/talks/${t.slug}`, 0.5, 'monthly')).join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${postUrls}${talkUrls}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
