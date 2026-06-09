<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { gsap } from 'gsap';
	import {
		BoxGeometry,
		CylinderGeometry,
		Color,
		InstancedMesh,
		Matrix4,
		MeshStandardMaterial,
		Quaternion,
		Vector3,
		type Mesh,
		type PointLight
	} from 'three';
	import { decisions } from '../stores';

	// One instanced draw for the colonnades; the overloaded pillar is its own
	// mesh so it can strain and glow.
	type Def = { x: number; z: number; damaged: boolean };
	const defs: Def[] = [];
	for (let side = -1; side <= 1; side += 2) {
		for (let row = 0; row < 8; row++) {
			if (side === 1 && row === 3) continue; // the overloaded one
			defs.push({
				x: side * 9,
				z: 30 - row * 8.5,
				damaged: (side === -1 && row === 5) || (side === 1 && row === 6)
			});
		}
	}

	const geometry = new CylinderGeometry(1.05, 1.55, 40, 14, 4);
	const material = new MeshStandardMaterial({ color: '#ffffff', roughness: 0.92 });
	const mesh = new InstancedMesh(geometry, material, defs.length);

	const m = new Matrix4();
	const q = new Quaternion();
	const sound = new Color('#3a3b42');
	const dark = new Color('#1d1b18');
	const axis = new Vector3(0, 0, 1);
	defs.forEach((def, i) => {
		q.setFromAxisAngle(axis, def.damaged ? 0.045 * (def.x > 0 ? -1 : 1) : 0);
		m.compose(new Vector3(def.x, 20, def.z), q, new Vector3(1, 1, 1));
		mesh.setMatrixAt(i, m);
		mesh.setColorAt(i, def.damaged ? dark : sound);
	});
	mesh.instanceMatrix.needsUpdate = true;
	if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

	let overloaded = $state<Mesh>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (overloaded) {
			const s = 1 + Math.sin(t * 2.6) * 0.03;
			overloaded.scale.set(s, 1, s);
		}
	});

	// "Invest in automation" — new towers rise at the edges of the structure.
	const towerGeometry = new BoxGeometry(5, 16, 5);
	towerGeometry.translate(0, 8, 0); // grow from the ground up
	let towerA = $state<Mesh>();
	let towerB = $state<Mesh>();
	let towerLight = $state<PointLight>();
	$effect(() => {
		if ($decisions['invest-automation'] && towerA && towerB && towerLight) {
			gsap.to(towerA.scale, { y: 2.2, duration: 4, ease: 'power2.inOut' });
			gsap.to(towerB.scale, { y: 1.8, duration: 4.5, ease: 'power2.inOut', delay: 0.4 });
			gsap.to(towerLight, { intensity: 45, duration: 4, ease: 'power2.out' });
		}
	});
</script>

<T.Group>
	<T is={mesh} frustumCulled={false} />

	<!-- the pillar carrying too much weight -->
	<T.Mesh bind:ref={overloaded} position={[9, 20, 4.5]}>
		<T.CylinderGeometry args={[1.05, 1.55, 40, 14, 4]} />
		<T.MeshStandardMaterial
			color="#46382a"
			emissive="#b46304"
			emissiveIntensity={0.5}
			roughness={0.8}
		/>
	</T.Mesh>

	<!-- automation towers, modest until the visitor invests -->
	<T.Mesh bind:ref={towerA} geometry={towerGeometry} position={[19, 0, -20]}>
		<T.MeshStandardMaterial color="#34353c" roughness={0.85} />
	</T.Mesh>
	<T.Mesh bind:ref={towerB} geometry={towerGeometry} position={[-19, 0, -26]}>
		<T.MeshStandardMaterial color="#34353c" roughness={0.85} />
	</T.Mesh>
	<T.PointLight bind:ref={towerLight} position={[0, 30, -23]} color="#e2a414" intensity={0} distance={60} decay={1.8} />
</T.Group>
