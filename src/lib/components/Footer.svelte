<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Mail } from 'lucide-svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Youtube from '$lib/components/icons/Youtube.svelte';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ href: 'https://github.com/DuncanBoyne', icon: Github, label: 'GitHub' },
		{ href: 'https://linkedin.com/in/duncanboyne', icon: Linkedin, label: 'LinkedIn' },
		{ href: 'https://youtube.com/@PowerBIKindaGuy', icon: Youtube, label: 'YouTube' },
		{ href: 'mailto:duncanboyne@hotmail.co.uk', icon: Mail, label: 'Email' }
	];

	let isDark = false;
	let observer: MutationObserver;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	});

	onDestroy(() => observer?.disconnect());

	$: logoFull = isDark ? '/logo-dark-full.png' : '/logo-light-full.png';
</script>

<footer class="bg-surface border-t border-border">
	<div class="container-custom py-12">
		<div class="flex flex-col items-center gap-6">

			<!-- Social Links -->
			<div class="flex items-center gap-1 flex-wrap justify-center">
				{#each socialLinks as { href, icon: Icon, label }}
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted hover:text-accent hover:bg-border transition-colors text-sm"
						aria-label="{label} (opens in new window)"
					>
						<Icon class="w-4 h-4" aria-hidden="true" />
						<span class="hidden sm:inline">{label}</span>
					</a>
				{/each}
			</div>

			<!-- Quick links (internal linking for crawlers + LLMs) -->
			<nav class="footer-links" aria-label="Footer">
				<a href="/services">Services</a>
				<a href="/faq">FAQ</a>
				<a href="/blog">Blog</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
				<a href="/?intro">Replay intro</a>
			</nav>

			<!-- Brand logo -->
			<a href="/" aria-label="Duncan Boyne home">
				<img src={logoFull} alt="Duncan Boyne" class="footer-logo" />
			</a>

			<!-- Location (local SEO + honest signal) -->
			<p class="text-sm text-muted">
				Power BI consultant based in Norfolk. Serving Norwich, Great Yarmouth, and beyond.
			</p>

			<!-- Copyright -->
			<p class="text-sm text-muted">
				&copy; {currentYear} Duncan Boyne. All rights reserved.
			</p>

		</div>
	</div>
</footer>

<style>
	.footer-logo {
		height: auto;
		width: clamp(180px, 30vw, 320px);
		display: block;
	}
	.footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.5rem;
	}
	.footer-links a {
		font-size: 0.85rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.3s;
	}
	.footer-links a:hover { color: var(--color-accent); }
</style>
