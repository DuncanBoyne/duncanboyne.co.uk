<script lang="ts">
	import { Canvas } from '@threlte/core';
	import World from './World.svelte';

	let { tier = 'full' }: { tier?: 'full' | 'lite' } = $props();

	const dpr = Math.min(
		typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1,
		tier === 'lite' ? 1.25 : 1.75
	);
</script>

<Canvas {dpr}>
	<World />
</Canvas>
