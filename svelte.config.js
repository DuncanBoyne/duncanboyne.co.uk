import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		paths: {
			// Update this if deploying to a subdirectory (e.g., '/repo-name')
			base: ''
		},
		prerender: {
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
