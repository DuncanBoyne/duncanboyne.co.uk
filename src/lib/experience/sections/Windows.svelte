<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { createStainedGlassMaterial } from '../materials/stainedGlass';
	import { createLightShaftMaterial } from '../materials/lightShaft';

	// Six panes per wall. Two are dying — their light has almost gone.
	type Win = {
		x: number;
		z: number;
		material: ReturnType<typeof createStainedGlassMaterial>;
		healthy: boolean;
		pool: string;
	};

	const palettes: [string, string, string][] = [
		['#f4d141', '#e2a414', '#fff0b0'],
		['#4f7cc0', '#7aa6e0', '#2d4a7a'],
		['#3aa6a0', '#7fd4cd', '#1f6661'],
		['#e2a414', '#f4d141', '#b46304'],
		['#7c6fc0', '#a89ce0', '#4a4080'],
		['#c0574f', '#e08a7a', '#7a2d2d']
	];

	const windows: Win[] = [];
	for (let side = -1; side <= 1; side += 2) {
		for (let i = 0; i < 6; i++) {
			const dying = (side === -1 && i === 4) || (side === 1 && i === 2);
			windows.push({
				x: side * 15.5,
				z: 26 - i * 11,
				material: createStainedGlassMaterial(palettes[i], dying ? 0.12 : 1),
				healthy: !dying,
				pool: palettes[i][0]
			});
		}
	}

	// A few god-rays slanting in from the healthy windows.
	const shafts = [
		{ x: -10, z: 15, rot: 0.5, color: '#f4d141' },
		{ x: 10, z: 4, rot: -0.5, color: '#7aa6e0' },
		{ x: -10, z: -7, rot: 0.5, color: '#7fd4cd' }
	].map((s) => ({ ...s, material: createLightShaftMaterial(s.color) }));

	useTask((delta) => {
		for (const w of windows) w.material.uniforms.uTime.value += delta;
		for (const s of shafts) s.material.uniforms.uTime.value += delta;
	});
</script>

<T.Group>
	{#each windows as win}
		<T.Mesh
			position={[win.x, 14, win.z]}
			rotation.y={win.x > 0 ? -Math.PI / 2 : Math.PI / 2}
			material={win.material}
		>
			<T.PlaneGeometry args={[4.2, 15]} />
		</T.Mesh>
		{#if win.healthy}
			<T.Mesh position={[win.x * 0.68, 0.12, win.z]} rotation.x={-Math.PI / 2}>
				<T.PlaneGeometry args={[6.5, 9.5]} />
				<T.MeshBasicMaterial color={win.pool} transparent opacity={0.05} depthWrite={false} />
			</T.Mesh>
		{/if}
	{/each}

	{#each shafts as shaft}
		<T.Mesh
			position={[shaft.x, 11, shaft.z]}
			rotation.z={shaft.rot}
			rotation.y={Math.PI / 2}
			material={shaft.material}
		>
			<T.PlaneGeometry args={[7, 20]} />
		</T.Mesh>
	{/each}
</T.Group>
