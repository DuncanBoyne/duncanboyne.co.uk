<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { ACESFilmicToneMapping, Color, FogExp2 } from 'three';
	import { get } from 'svelte/store';
	import { qualityTier } from './stores';
	import CameraRig from './CameraRig.svelte';
	import Foundations from './sections/Foundations.svelte';
	import Pillars from './sections/Pillars.svelte';
	import Windows from './sections/Windows.svelte';
	import HallOfDecisions from './sections/HallOfDecisions.svelte';
	import Library from './sections/Library.svelte';
	import Heart from './sections/Heart.svelte';
	import Reveal from './sections/Reveal.svelte';

	interactivity();

	const { scene, renderer } = useThrelte();
	renderer.toneMapping = ACESFilmicToneMapping;
	scene.background = new Color('#050505');
	scene.fog = new FogExp2('#050505', 0.009);

	// Frame-time watchdog: a sustained struggle drops the quality tier live.
	let slowFrames = 0;
	useTask((delta) => {
		if (get(qualityTier) === 'lite') return;
		if (delta > 0.022) {
			slowFrames++;
			if (slowFrames > 120) qualityTier.set('lite');
		} else if (slowFrames > 0) {
			slowFrames -= 2;
		}
	});
</script>

<CameraRig />

<T.AmbientLight intensity={0.55} color="#8d96ad" />
<T.DirectionalLight position={[18, 60, 14]} intensity={0.85} color="#cdd5e8" />
<T.DirectionalLight position={[-24, 30, -20]} intensity={0.3} color="#f4d141" />

<Foundations />
<Pillars />
<Windows />
<HallOfDecisions />
<Library />
<Heart />
<Reveal />
