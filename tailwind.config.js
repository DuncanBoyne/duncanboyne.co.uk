/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			colors: {
				// Semantic colors using CSS variables
				bg: 'var(--color-bg)',
				surface: 'var(--color-surface)',
				text: 'var(--color-text)',
				muted: 'var(--color-muted)',
				border: 'var(--color-border)',
				accent: 'var(--color-accent)',
				accent2: 'var(--color-accent2)',
				bauhaus: 'var(--color-bauhaus)',
				success: 'var(--color-success)',
				info: 'var(--color-info)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)'
			}
		}
	},
	plugins: []
};
