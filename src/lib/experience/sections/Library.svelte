<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import {
		BoxGeometry,
		Color,
		InstancedMesh,
		Matrix4,
		MeshStandardMaterial,
		Vector3,
		Quaternion,
		type Group,
		type Mesh
	} from 'three';
	import { Text } from '@threlte/extras';
	import { currentSection, whisper } from '../stores';

	function rand(seed: number): number {
		const x = Math.sin(seed * 91.17 + 47.13) * 24634.6345;
		return x - Math.floor(x);
	}

	// One instanced draw: shelving stacks receding into the fog on both sides.
	const ROWS = 5;
	const COLS = 26;
	const COUNT = ROWS * COLS * 2;

	const geometry = new BoxGeometry(0.5, 1, 0.3);
	const material = new MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 });
	const mesh = new InstancedMesh(geometry, material, COUNT);

	const shades = ['#5a4a36', '#3d434c', '#553a44', '#475240', '#645738', '#4a3d5a'].map(
		(c) => new Color(c)
	);
	const m = new Matrix4();
	const pos = new Vector3();
	const quat = new Quaternion();
	const scale = new Vector3();
	let n = 0;
	for (let side = -1; side <= 1; side += 2) {
		for (let row = 0; row < ROWS; row++) {
			for (let col = 0; col < COLS; col++) {
				pos.set(
					side * (7 + rand(n) * 1.4),
					3.2 + row * 2.6 + rand(n * 1.7) * 0.3,
					-10 - col * 1.05
				);
				scale.set(1, 1 + rand(n * 2.3) * 0.6, 1);
				quat.identity();
				m.compose(pos, quat, scale);
				mesh.setMatrixAt(n, m);
				mesh.setColorAt(n, shades[n % shades.length]);
				n++;
			}
		}
	}
	mesh.instanceMatrix.needsUpdate = true;
	if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

	// Clues drifting between the shelves — never explained.
	const words = [
		'Data', 'Analytics', 'Power BI', 'AI', 'Transformation',
		'Leadership', 'Community', 'Speaking', 'Mentoring'
	].map((text, i) => ({
		text,
		x: (rand(i * 7.7) - 0.5) * 9,
		y: 4.5 + rand(i * 3.1) * 8,
		z: -13 - rand(i * 5.3) * 16,
		speed: 0.4 + rand(i * 9.1) * 0.5
	}));

	// Text is unlit and ignores fog, so cull it outside neighbouring sections.
	const wordsVisible = $derived($currentSection >= 4 && $currentSection <= 6);

	// One book glows faintly. Finding it earns a whisper.
	const { renderer } = useThrelte();
	let discovered = false;
	let glowingBook = $state<Mesh>();
	function onBookFound() {
		renderer.domElement.style.cursor = '';
		if (discovered) return;
		discovered = true;
		whisper.set('The answers were here all along.');
	}

	let wordsGroup = $state<Group>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (glowingBook) {
			const mat = glowingBook.material as MeshStandardMaterial;
			mat.emissiveIntensity = discovered ? 1.6 : 0.45 + Math.sin(t * 1.7) * 0.25;
		}
		if (!wordsGroup || !wordsVisible) return;
		wordsGroup.children.forEach((child, i) => {
			child.position.y = words[i].y + Math.sin(t * words[i].speed + i * 2.4) * 0.5;
		});
	});
</script>

<T.Group>
	<T is={mesh} frustumCulled={false} />

	<!-- the hidden book -->
	<T.Mesh
		bind:ref={glowingBook}
		position={[6.6, 6.05, -16.4]}
		onpointerenter={() => {
			renderer.domElement.style.cursor = 'pointer';
			onBookFound();
		}}
		onpointerleave={() => (renderer.domElement.style.cursor = '')}
	>
		<T.BoxGeometry args={[0.55, 1.25, 0.32]} />
		<T.MeshStandardMaterial color="#6b5a1e" emissive="#f4d141" emissiveIntensity={0.45} roughness={0.6} />
	</T.Mesh>

	<T.Group bind:ref={wordsGroup} visible={wordsVisible}>
		{#each words as word}
			<T.Group position={[word.x, word.y, word.z]}>
				<Text
					text={word.text}
					fontSize={0.42}
					color="#f4d141"
					fillOpacity={0.55}
					anchorX="center"
					anchorY="middle"
				/>
			</T.Group>
		{/each}
	</T.Group>
</T.Group>
