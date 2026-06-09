<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import {
		BoxGeometry,
		InstancedMesh,
		InstancedBufferAttribute,
		Matrix4,
		MeshStandardMaterial
	} from 'three';
	import { gsap } from 'gsap';
	import { createCrackedStoneMaterial } from '../materials/crackedStone';
	import { decisions, sectionProgress } from '../stores';

	function rand(seed: number): number {
		const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
		return x - Math.floor(x);
	}

	const COLS = 11;
	const ROWS = 17;
	const COUNT = COLS * ROWS;

	const geometry = new BoxGeometry(3.9, 0.35, 6.1);
	const material = createCrackedStoneMaterial();
	const mesh = new InstancedMesh(geometry, material, COUNT);

	const integrity = new Float32Array(COUNT);
	const delay = new Float32Array(COUNT);
	const seed = new Float32Array(COUNT);
	const m = new Matrix4();

	let n = 0;
	for (let cx = 0; cx < COLS; cx++) {
		for (let cz = 0; cz < ROWS; cz++) {
			const x = (cx - (COLS - 1) / 2) * 4.1 + (rand(n) - 0.5) * 0.3;
			const z = (cz - (ROWS - 1) / 2) * 6.4 + (rand(n * 1.3) - 0.5) * 0.4;
			const tileIntegrity = rand(n * 3.7);
			// fractured tiles sit visibly sunken
			const sink = tileIntegrity < 0.2 ? 0.35 + rand(n * 2.1) * 0.4 : 0;
			m.makeTranslation(x, -0.18 - sink, z);
			mesh.setMatrixAt(n, m);
			integrity[n] = tileIntegrity;
			delay[n] = rand(n * 5.9);
			seed[n] = rand(n * 9.4);
			n++;
		}
	}
	geometry.setAttribute('aIntegrity', new InstancedBufferAttribute(integrity, 1));
	geometry.setAttribute('aDelay', new InstancedBufferAttribute(delay, 1));
	geometry.setAttribute('aSeed', new InstancedBufferAttribute(seed, 1));
	mesh.instanceMatrix.needsUpdate = true;

	const baseMaterial = new MeshStandardMaterial({ color: '#0c0c0e', roughness: 0.95 });

	// "Ignore reporting" — cracks visibly propagate across the foundation.
	$effect(() => {
		if ($decisions['ignore-reporting']) {
			gsap.to(material.uniforms.uCrackSpread, { value: 0.5, duration: 3.5, ease: 'power2.out' });
		}
	});

	const progress = sectionProgress(1);
	let smoothed = 0;
	useTask((delta) => {
		material.uniforms.uTime.value += delta;
		// keep tiles risen once the visitor has moved past the section
		const target = Math.max(material.uniforms.uProgress.value, $progress);
		smoothed += (target - smoothed) * Math.min(1, delta * 3);
		material.uniforms.uProgress.value = Math.max(smoothed, material.uniforms.uProgress.value);
	});
</script>

<T.Group>
	<!-- void slab beneath the tiles -->
	<T.Mesh position={[0, -1.1, 0]} material={baseMaterial}>
		<T.BoxGeometry args={[46, 1.4, 112]} />
	</T.Mesh>

	<T is={mesh} frustumCulled={false} />
</T.Group>
