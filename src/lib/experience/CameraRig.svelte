<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { CatmullRomCurve3, Vector3, type PerspectiveCamera } from 'three';
	import { scrollProgress } from './stores';
	import { CAMERA_PATH } from './sections';

	const posCurve = new CatmullRomCurve3(
		CAMERA_PATH.map((k) => new Vector3(...k.pos)),
		false,
		'centripetal'
	);
	const lookCurve = new CatmullRomCurve3(
		CAMERA_PATH.map((k) => new Vector3(...k.look)),
		false,
		'centripetal'
	);
	const stops = CAMERA_PATH.map((k) => k.at);
	const segments = CAMERA_PATH.length - 1;

	// Map master progress to curve parameter, honouring keyframe timing.
	function progressToU(p: number): number {
		const cp = Math.min(Math.max(p, 0), 1);
		let i = 0;
		while (i < segments - 1 && cp > stops[i + 1]) i++;
		const t = (cp - stops[i]) / (stops[i + 1] - stops[i]);
		return (i + t) / segments;
	}

	let camera = $state<PerspectiveCamera>();
	const pos = new Vector3();
	const look = new Vector3();
	let smoothed = 0;

	useTask((delta) => {
		if (!camera) return;
		smoothed += ($scrollProgress - smoothed) * Math.min(1, delta * 6);
		const u = progressToU(smoothed);
		posCurve.getPoint(u, pos);
		lookCurve.getPoint(u, look);
		camera.position.copy(pos);
		camera.lookAt(look);
	});
</script>

<T.PerspectiveCamera makeDefault bind:ref={camera} fov={55} near={0.1} far={260} />
