<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Mesh } from 'three';

	// Two colonnades flanking the nave, vanishing upward into fog.
	type Pillar = { x: number; z: number; health: 'sound' | 'damaged' | 'overloaded'; tilt: number };
	const pillars: Pillar[] = [];
	for (let side = -1; side <= 1; side += 2) {
		for (let row = 0; row < 8; row++) {
			const z = 30 - row * 8.5;
			let health: Pillar['health'] = 'sound';
			if (side === 1 && row === 3) health = 'overloaded';
			else if ((side === -1 && row === 5) || (side === 1 && row === 6)) health = 'damaged';
			pillars.push({ x: side * 9, z, health, tilt: health === 'damaged' ? 0.04 : 0 });
		}
	}

	let overloaded = $state<Mesh>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (overloaded) {
			// the pillar carrying too much weight visibly strains
			const s = 1 + Math.sin(t * 2.6) * 0.025;
			overloaded.scale.set(s, 1, s);
		}
	});
</script>

<T.Group>
	{#each pillars as pillar}
		{#if pillar.health === 'overloaded'}
			<T.Mesh bind:ref={overloaded} position={[pillar.x, 20, pillar.z]}>
				<T.CylinderGeometry args={[1.1, 1.5, 40, 12]} />
				<T.MeshStandardMaterial color="#3a2f24" emissive="#b46304" emissiveIntensity={0.35} roughness={0.8} />
			</T.Mesh>
		{:else}
			<T.Mesh
				position={[pillar.x, 20, pillar.z]}
				rotation.z={pillar.tilt}
			>
				<T.CylinderGeometry args={[1.1, 1.5, 40, 12]} />
				<T.MeshStandardMaterial
					color={pillar.health === 'damaged' ? '#1c1a17' : '#2b2b2e'}
					roughness={0.9}
				/>
			</T.Mesh>
		{/if}
	{/each}
</T.Group>
