<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';
	import { shouldRunIntro } from './gate';
	import { introActive } from './stores';

	type ChaosIntroProps = { onclose: () => void };

	let ChaosIntro = $state<Component<ChaosIntroProps> | null>(null);

	function releaseShield() {
		document.documentElement.classList.remove('intro-pending');
	}

	onMount(() => {
		if (!shouldRunIntro()) {
			releaseShield();
			return;
		}
		introActive.set(true);
		// A failed or slow chunk load must never trap the visitor on black.
		const safety = setTimeout(releaseShield, 4000);
		import('./ChaosIntro.svelte')
			.then((m) => {
				ChaosIntro = m.default as Component<ChaosIntroProps>;
			})
			.catch(() => {
				introActive.set(false);
				releaseShield();
			})
			.finally(() => clearTimeout(safety));
	});
</script>

{#if ChaosIntro}
	<ChaosIntro
		onclose={() => {
			ChaosIntro = null;
			introActive.set(false);
		}}
	/>
{/if}
