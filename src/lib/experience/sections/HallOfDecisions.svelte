<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import type { Group } from 'three';
	import { currentSection } from '../stores';

	// Floating decisions. Interactivity arrives in Phase 3 — for now they drift.
	const plaques = [
		{ text: 'Invest in automation', x: -4.5, y: 9.5, z: -12 },
		{ text: 'Ignore reporting', x: 4, y: 7.5, z: -14 },
		{ text: 'Delay transformation', x: -3, y: 6.5, z: -17 },
		{ text: 'Trust the data', x: 4.5, y: 10.5, z: -19 }
	];

	// Text is unlit and ignores fog — cull it outside neighbouring sections.
	const visible = $derived($currentSection >= 3 && $currentSection <= 5);

	let group = $state<Group>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (!group || !visible) return;
		group.children.forEach((child, i) => {
			child.position.y = plaques[i].y + Math.sin(t * 0.7 + i * 1.9) * 0.35;
		});
	});
</script>

<T.Group bind:ref={group} {visible}>
	{#each plaques as plaque}
		<T.Group position={[plaque.x, plaque.y, plaque.z]}>
			<Text
				text={plaque.text}
				fontSize={0.55}
				color="#d8d2c0"
				anchorX="center"
				anchorY="middle"
			/>
		</T.Group>
	{/each}
</T.Group>
