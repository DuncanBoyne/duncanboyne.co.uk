<script lang="ts">
	import { T } from '@threlte/core';

	// Stained glass along both walls. Vibrant = healthy customers; dark = fading ones.
	type Win = { x: number; z: number; color: string; healthy: boolean };
	const palette = ['#f4d141', '#4f7cc0', '#3aa6a0', '#e2a414', '#7c6fc0', '#f4d141'];
	const windows: Win[] = [];
	for (let side = -1; side <= 1; side += 2) {
		for (let i = 0; i < 6; i++) {
			const dead = (side === -1 && i === 4) || (side === 1 && i === 2);
			windows.push({
				x: side * 15.5,
				z: 26 - i * 11,
				color: dead ? '#15151a' : palette[i],
				healthy: !dead
			});
		}
	}
</script>

<T.Group>
	{#each windows as win}
		<T.Mesh position={[win.x, 14, win.z]} rotation.y={win.x > 0 ? -Math.PI / 2 : Math.PI / 2}>
			<T.PlaneGeometry args={[4, 14]} />
			<T.MeshBasicMaterial color={win.color} />
		</T.Mesh>
		{#if win.healthy}
			<!-- faked light pool on the floor beneath each living window -->
			<T.Mesh position={[win.x * 0.7, 0.18, win.z]} rotation.x={-Math.PI / 2}>
				<T.PlaneGeometry args={[6, 9]} />
				<T.MeshBasicMaterial color={win.color} transparent opacity={0.07} />
			</T.Mesh>
		{/if}
	{/each}
</T.Group>
