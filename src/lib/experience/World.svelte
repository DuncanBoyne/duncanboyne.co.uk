<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { ACESFilmicToneMapping, Color, FogExp2 } from 'three';
	import CameraRig from './CameraRig.svelte';
	import Foundations from './sections/Foundations.svelte';
	import Pillars from './sections/Pillars.svelte';
	import Windows from './sections/Windows.svelte';
	import HallOfDecisions from './sections/HallOfDecisions.svelte';
	import Library from './sections/Library.svelte';
	import Heart from './sections/Heart.svelte';

	const { scene, renderer } = useThrelte();
	renderer.toneMapping = ACESFilmicToneMapping;
	scene.background = new Color('#050505');
	scene.fog = new FogExp2('#050505', 0.009);
</script>

<CameraRig />

<T.AmbientLight intensity={0.55} color="#8d96ad" />
<T.DirectionalLight position={[18, 60, 14]} intensity={0.85} color="#cdd5e8" />

<Foundations />
<Pillars />
<Windows />
<HallOfDecisions />
<Library />
<Heart />
