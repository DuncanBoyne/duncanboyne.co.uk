<script lang="ts">
	import { T } from '@threlte/core';
	import { sectionProgress } from '../stores';

	// Deterministic pseudo-random so the floor doesn't reshuffle between visits.
	function rand(seed: number): number {
		const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
		return x - Math.floor(x);
	}

	// Stone tiles flanking the nave. Some flawless, some sunken/cracked.
	type Tile = { x: number; z: number; size: number; shade: number; sunk: number; delay: number };
	const tiles: Tile[] = [];
	let i = 0;
	for (let cx = -4; cx <= 4; cx++) {
		for (let cz = -6; cz <= 7; cz++) {
			i++;
			const integrity = rand(i * 3.7);
			tiles.push({
				x: cx * 4.2 + (rand(i) - 0.5) * 0.4,
				z: cz * 6.4 + (rand(i * 1.3) - 0.5) * 0.5,
				size: 3.6,
				shade: 0.16 + integrity * 0.1,
				sunk: integrity < 0.18 ? 0.5 + rand(i * 2.1) * 0.6 : 0,
				delay: rand(i * 5.9)
			});
		}
	}

	const progress = sectionProgress(1);
	// Tiles rise from below as the visitor looks down at the forming floor.
	const rise = $derived(Math.min(1, $progress * 2.2));
</script>

<T.Group>
	<!-- base slab -->
	<T.Mesh position={[0, -0.6, 0]}>
		<T.BoxGeometry args={[44, 1, 104]} />
		<T.MeshStandardMaterial color="#141414" roughness={0.95} />
	</T.Mesh>

	{#each tiles as tile}
		{@const reveal = Math.min(1, Math.max(0, (rise - tile.delay * 0.6) / 0.4))}
		<T.Mesh
			position={[tile.x, -0.05 - tile.sunk - (1 - reveal) * 3, tile.z]}
			visible={reveal > 0.01}
		>
			<T.BoxGeometry args={[tile.size, 0.3, tile.size * 1.5]} />
			<T.MeshStandardMaterial
				color={`rgb(${Math.round(tile.shade * 255)}, ${Math.round(tile.shade * 250)}, ${Math.round(tile.shade * 240)})`}
				roughness={0.9}
			/>
		</T.Mesh>
	{/each}
</T.Group>
