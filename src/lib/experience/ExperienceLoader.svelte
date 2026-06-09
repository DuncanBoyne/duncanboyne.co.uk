<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';
	import { shouldRunExperience } from './gate';

	type ArchitectProps = { tier: 'full' | 'lite'; onclose: () => void };

	let Architect = $state<Component<ArchitectProps> | null>(null);
	let tier = $state<'full' | 'lite'>('full');

	function releaseShield() {
		document.documentElement.classList.remove('architect-pending');
	}

	onMount(() => {
		const mode = shouldRunExperience();
		if (mode === 'none') {
			releaseShield();
			return;
		}
		tier = mode;
		// A failed or slow chunk load must never trap the visitor on black.
		const safety = setTimeout(releaseShield, 4000);
		import('./Architect.svelte')
			.then((m) => {
				Architect = m.default as Component<ArchitectProps>;
			})
			.catch(releaseShield)
			.finally(() => clearTimeout(safety));
	});
</script>

{#if Architect}
	<Architect {tier} onclose={() => (Architect = null)} />
{/if}
