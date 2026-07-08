import { Marked, Renderer } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// One scoped markdown renderer for the whole site. A scoped Marked instance
// (not the global `marked.setOptions`) so page-level config can never leak
// between routes, and DOMPurify so raw HTML in stored content can never
// execute in a visitor's browser.

// Embeds are opt-in, one host at a time. DOMPurify drops <iframe> by default,
// so a post can only embed something served from a host named here. Anything
// else (including a javascript: or http: src) is removed before render.
const ALLOWED_IFRAME_HOSTS = new Set(['app.powerbi.com']);

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
	if (data.tagName !== 'iframe') return;

	let host = '';
	try {
		const url = new URL((node as Element).getAttribute('src') ?? '');
		if (url.protocol === 'https:') host = url.hostname;
	} catch {
		host = '';
	}

	if (!ALLOWED_IFRAME_HOSTS.has(host)) node.parentNode?.removeChild(node);
});

const renderer = new Renderer();
const originalLink = renderer.link.bind(renderer);
renderer.link = (token) => {
	const html = originalLink(token);
	return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
};

const markdown = new Marked();
markdown.setOptions({ renderer });

export function renderMarkdown(source: string): string {
	const html = markdown.parse(source, { async: false });
	return DOMPurify.sanitize(html, {
		ADD_TAGS: ['iframe'],
		ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'loading'],
		FORBID_ATTR: ['srcdoc']
	});
}
