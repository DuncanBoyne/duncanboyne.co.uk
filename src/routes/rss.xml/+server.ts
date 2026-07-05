import type { RequestHandler } from './$types';
import { getPosts } from '$lib/supabase';
import { SITE_URL } from '$lib/site';

export const prerender = true;

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
	const posts = await getPosts();
	const siteUrl = SITE_URL;

	const items = (posts || [])
		.filter((post) => post.published_at)
		.map((post) => {
			const pubDate = new Date(post.published_at!).toUTCString();
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
			<description>${escapeXml(post.excerpt || '')}</description>
			<pubDate>${pubDate}</pubDate>
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Duncan Boyne - Blog</title>
		<link>${siteUrl}/blog</link>
		<description>Insights, tutorials, and thoughts on Power BI, data visualization, and business intelligence.</description>
		<language>en-gb</language>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
