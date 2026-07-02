<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'lucide-svelte';

	let isDark = false;

	onMount(() => {
		// Dark is the site default (see app.html); light only if explicitly chosen.
		isDark = localStorage.getItem('theme') !== 'light';
		updateTheme();
	});

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		updateTheme();
	}

	function updateTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<button
	on:click={toggleTheme}
	class="p-2 rounded-lg text-muted hover:text-accent hover:bg-border transition-colors"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if isDark}
		<Sun class="w-5 h-5" />
	{:else}
		<Moon class="w-5 h-5" />
	{/if}
</button>
