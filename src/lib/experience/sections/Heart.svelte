<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { CanvasTexture, SpriteMaterial, AdditiveBlending, type PointLight, type Sprite } from 'three';
	import { createHeartMaterial } from '../materials/heartPulse';
	import { createGlowCanvas } from '../materials/lightShaft';
	import { sectionProgress } from '../stores';

	const progress = sectionProgress(6);

	const heartMaterial = createHeartMaterial();

	const glowTexture = new CanvasTexture(createGlowCanvas());
	const glowMaterial = new SpriteMaterial({
		map: glowTexture,
		blending: AdditiveBlending,
		depthWrite: false,
		transparent: true,
		opacity: 0.7
	});
	const haloMaterial = new SpriteMaterial({
		map: glowTexture,
		blending: AdditiveBlending,
		depthWrite: false,
		transparent: true,
		opacity: 0.25
	});

	let light = $state<PointLight>();
	let glow = $state<Sprite>();
	let halo = $state<Sprite>();
	let t = 0;

	useTask((delta) => {
		t += delta;
		const energy = $progress;
		const pulse = Math.sin(t * 2.2) * 0.5 + 0.5;
		heartMaterial.uniforms.uTime.value = t;
		heartMaterial.uniforms.uEnergy.value = energy;
		if (light) light.intensity = 10 + energy * 70 + pulse * 6;
		if (glow) {
			const s = 7 + pulse * 1.2 + energy * 4;
			glow.scale.set(s, s, 1);
		}
		if (halo) {
			const s = 16 + pulse * 2 + energy * 9;
			halo.scale.set(s, s, 1);
		}
	});
</script>

<T.Group position={[0, 10, -38]}>
	<T.Mesh material={heartMaterial}>
		<T.IcosahedronGeometry args={[2.2, 5]} />
	</T.Mesh>
	<T.Sprite bind:ref={glow} material={glowMaterial} />
	<T.Sprite bind:ref={halo} material={haloMaterial} />
	<T.PointLight bind:ref={light} color="#f4d141" intensity={10} distance={80} decay={1.6} />
</T.Group>
