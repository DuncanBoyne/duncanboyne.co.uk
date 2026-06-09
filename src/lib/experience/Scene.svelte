<script lang="ts">
	import { Canvas } from '@threlte/core';
	import World from './World.svelte';
	import { qualityTier } from './stores';

	let { tier = 'full' }: { tier?: 'full' | 'lite' } = $props();

	// Reacts to the live watchdog as well as the gate-time tier.
	const dpr = $derived(
		Math.min(
			typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1,
			tier === 'lite' || $qualityTier === 'lite' ? 1.25 : 1.75
		)
	);
</script>

<Canvas {dpr}>
	<World />
</Canvas>
