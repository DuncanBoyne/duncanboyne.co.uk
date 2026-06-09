<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { MeshBasicMaterial, type Group } from 'three';
	import { currentSection, decisions } from '../stores';
	import { DECISIONS, chooseDecision } from '../decisionsData';

	// Text is unlit and ignores fog — cull it outside neighbouring sections.
	const visible = $derived($currentSection >= 3 && $currentSection <= 5);
	const interactive = $derived($currentSection === 4);

	const { renderer } = useThrelte();
	let hovered = $state<string | null>(null);

	// Invisible but raycastable hitboxes behind each plaque.
	const hitboxMaterial = new MeshBasicMaterial({
		transparent: true,
		opacity: 0,
		depthWrite: false,
		colorWrite: false
	});

	function enter(id: string) {
		if (!interactive || $decisions[id]) return;
		hovered = id;
		renderer.domElement.style.cursor = 'pointer';
	}
	function leave(id: string) {
		if (hovered === id) hovered = null;
		renderer.domElement.style.cursor = '';
	}
	function select(id: string) {
		if (!interactive || $decisions[id]) return;
		chooseDecision(id);
		hovered = null;
		renderer.domElement.style.cursor = '';
	}

	function plaqueColor(id: string): string {
		if ($decisions[id]) return '#f4d141';
		if (hovered === id) return '#fff3c4';
		return '#d8d2c0';
	}

	let group = $state<Group>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (!group || !visible) return;
		group.children.forEach((child, i) => {
			child.position.y = DECISIONS[i].position[1] + Math.sin(t * 0.7 + i * 1.9) * 0.35;
		});
	});
</script>

<T.Group bind:ref={group} {visible}>
	{#each DECISIONS as decision}
		{@const chosen = $decisions[decision.id]}
		<T.Group position={decision.position}>
			<Text
				text={decision.label}
				fontSize={hovered === decision.id && !chosen ? 0.62 : 0.55}
				color={plaqueColor(decision.id)}
				fillOpacity={chosen ? 1 : 0.85}
				outlineWidth={chosen ? 0.012 : 0}
				outlineColor="#f4d141"
				anchorX="center"
				anchorY="middle"
			/>
			<T.Mesh
				material={hitboxMaterial}
				onclick={() => select(decision.id)}
				onpointerenter={() => enter(decision.id)}
				onpointerleave={() => leave(decision.id)}
			>
				<T.PlaneGeometry args={[6.5, 1.6]} />
			</T.Mesh>
		</T.Group>
	{/each}
</T.Group>
