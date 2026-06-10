<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { ShaderMaterial } from 'three';
	import { createDissolveSystem } from '../materials/dissolveParticles';
	import { currentSection, sectionProgress, qualityTier } from '../stores';
	import { get } from 'svelte/store';

	const points = createDissolveSystem(get(qualityTier) === 'lite' ? 9000 : 24000);
	const material = points.material as ShaderMaterial;

	const progress = sectionProgress(7);
	const visible = $derived($currentSection >= 6);

	let smoothed = 0;
	useTask((delta) => {
		if (!visible) return;
		material.uniforms.uTime.value += delta;
		smoothed += ($progress - smoothed) * Math.min(1, delta * 4);
		material.uniforms.uPhase.value = smoothed;
	});
</script>

<T is={points} {visible} />
