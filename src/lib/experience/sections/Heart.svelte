<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Mesh, PointLight } from 'three';
	import { sectionProgress } from '../stores';

	const progress = sectionProgress(6);

	let core = $state<Mesh>();
	let light = $state<PointLight>();
	let t = 0;

	useTask((delta) => {
		t += delta;
		const pulse = 1 + Math.sin(t * 2.4) * 0.07;
		if (core) core.scale.setScalar(pulse);
		if (light) {
			// the structure responds as the visitor approaches the heart
			light.intensity = 8 + $progress * 60 + Math.sin(t * 2.4) * 4;
		}
	});
</script>

<T.Group position={[0, 10, -38]}>
	<T.Mesh bind:ref={core}>
		<T.IcosahedronGeometry args={[2.2, 2]} />
		<T.MeshStandardMaterial
			color="#f4d141"
			emissive="#f4d141"
			emissiveIntensity={1.4}
			roughness={0.35}
		/>
	</T.Mesh>
	<T.PointLight bind:ref={light} color="#f4d141" intensity={8} distance={70} decay={1.6} />
</T.Group>
