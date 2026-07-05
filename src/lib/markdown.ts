import { Marked, Renderer } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// One scoped markdown renderer for the whole site. A scoped Marked instance
// (not the global `marked.setOptions`) so page-level config can never leak
// between routes, and DOMPurify so raw HTML in stored content can never
// execute in a visitor's browser.

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
	return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
}
