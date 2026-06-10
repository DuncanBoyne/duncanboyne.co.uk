<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { markSeen } from './gate';
	import { currentSection, decisions, experienceActive, scrollProgress, qualityTier, whisper } from './stores';
	import { DECISIONS, chooseDecision } from './decisionsData';
	import { createScrollTimeline } from './timeline';
	import { AudioEngine } from './audio/engine';
	import Scene from './Scene.svelte';
	import StartOverlay from './ui/StartOverlay.svelte';
	import Captions from './ui/Captions.svelte';
	import SkipButton from './ui/SkipButton.svelte';
	import MuteToggle from './ui/MuteToggle.svelte';

	let { tier = 'full', onclose }: { tier?: 'full' | 'lite'; onclose: () => void } = $props();

	let overlayEl = $state<HTMLDivElement>();
	let spacerEl = $state<HTMLDivElement>();
	let started = $state(false);
	let closing = $state(false);

	const showReveal = $derived(started && $scrollProgress > 0.985);
	const showScrollHint = $derived(started && $scrollProgress < 0.02);
	const inDecisions = $derived(started && $currentSection === 4);
	// raycasting matters in the hall and the library (the hidden book)
	const stageInteractive = $derived(started && ($currentSection === 4 || $currentSection === 5));

	// Whisper consequences and discoveries.
	let consequence = $state<string | null>(null);
	let consequenceTimer: ReturnType<typeof setTimeout>;
	function showWhisper(text: string) {
		consequence = text;
		clearTimeout(consequenceTimer);
		consequenceTimer = setTimeout(() => (consequence = null), 4500);
	}
	let known = new Set<string>();
	$effect(() => {
		for (const id of Object.keys($decisions)) {
			if (!known.has(id)) {
				known.add(id);
				const text = DECISIONS.find((d) => d.id === id)?.consequence;
				if (text) showWhisper(text);
			}
		}
	});
	$effect(() => {
		if ($whisper) {
			showWhisper($whisper);
			whisper.set(null);
		}
	});

	let destroyTimeline: (() => void) | null = null;
	let audio = $state<AudioEngine | null>(null);
	let audioMuted = $state(false);
	let unsubAudio: (() => void) | null = null;

	onMount(() => {
		qualityTier.set(tier === 'lite' ? 'lite' : 'high');
		experienceActive.set(true);
		document.documentElement.classList.add('architect-active');
		document.documentElement.classList.remove('architect-pending');
		return () => {
			destroyTimeline?.();
			unsubAudio?.();
			audio?.dispose();
			experienceActive.set(false);
			document.documentElement.classList.remove('architect-active');
		};
	});

	function begin() {
		started = true;
		if (overlayEl && spacerEl) {
			destroyTimeline = createScrollTimeline(overlayEl, spacerEl);
		}
		// AudioContext needs this user gesture; a Skip start never creates it
		try {
			audio = new AudioEngine();
			audioMuted = audio.isMuted;
			unsubAudio = scrollProgress.subscribe((p) => audio?.setProgress(p));
		} catch {
			audio = null;
		}
	}

	function toggleMute() {
		if (!audio) return;
		audio.setMuted(!audio.isMuted);
		audioMuted = audio.isMuted;
	}

	// While the stage accepts pointer events (hall/library), wheel and touch
	// no longer scroll-chain from the fixed stage to the overlay — forward them.
	function forwardWheel(e: WheelEvent) {
		if (overlayEl) overlayEl.scrollTop += e.deltaY;
	}
	let lastTouchY = 0;
	function stageTouchStart(e: TouchEvent) {
		lastTouchY = e.touches[0].clientY;
	}
	function stageTouchMove(e: TouchEvent) {
		if (!overlayEl) return;
		const y = e.touches[0].clientY;
		overlayEl.scrollTop += lastTouchY - y;
		lastTouchY = y;
	}

	// Nudge visitors who stall mid-journey.
	let lastScrollAt = $state(Date.now());
	let clock = $state(Date.now());
	$effect(() => {
		void $scrollProgress;
		lastScrollAt = Date.now();
	});
	onMount(() => {
		const interval = setInterval(() => (clock = Date.now()), 1000);
		return () => clearInterval(interval);
	});
	const showIdleHint = $derived(
		started &&
			!showReveal &&
			!closing &&
			clock - lastScrollAt > 6000 &&
			$scrollProgress > 0.02 &&
			$scrollProgress < 0.96
	);

	function finish(destination?: string) {
		if (closing) return;
		markSeen();
		closing = true;
		setTimeout(() => {
			onclose();
			if (destination) goto(destination);
		}, 1400);
	}
</script>

<div
	class="architect"
	class:started
	class:closing
	bind:this={overlayEl}
	role="region"
	aria-label="The Architect — an interactive introduction"
>
	<div class="architect-spacer" bind:this={spacerEl}></div>

	<div
		class="architect-stage"
		class:interactive={stageInteractive}
		aria-hidden="true"
		onwheel={forwardWheel}
		ontouchstart={stageTouchStart}
		ontouchmove={stageTouchMove}
	>
		<Scene {tier} />
	</div>

	<Captions />

	{#if consequence}
		<p class="consequence" role="status">{consequence}</p>
	{/if}

	{#if inDecisions && !closing}
		<!-- keyboard / assistive-tech mirror of the 3D plaques -->
		<fieldset class="decision-mirror">
			<legend class="sr-only-legend">The structure awaits your decisions</legend>
			{#each DECISIONS as decision}
				<button onclick={() => chooseDecision(decision.id)} disabled={$decisions[decision.id]}>
					{decision.label}
				</button>
			{/each}
		</fieldset>
	{/if}

	{#if !started}
		<StartOverlay onbegin={begin} onskip={() => finish()} />
	{/if}

	{#if showScrollHint}
		<div class="scroll-hint" aria-hidden="true">
			<span>Scroll</span>
			<span class="chevron"></span>
		</div>
	{/if}

	{#if showIdleHint}
		<div class="scroll-hint idle" aria-hidden="true">
			<span>{inDecisions ? 'Choose a decision · scroll to continue' : 'Scroll to continue'}</span>
			<span class="chevron"></span>
		</div>
	{/if}

	{#if started && !closing}
		<div class="progress-rune" aria-hidden="true">
			<div class="progress-fill" style="height: {$scrollProgress * 100}%"></div>
		</div>
	{/if}

	{#if started && !showReveal && !closing}
		<SkipButton onskip={() => finish()} />
		{#if audio}
			<MuteToggle muted={audioMuted} ontoggle={toggleMute} />
		{/if}
	{/if}

	{#if showReveal}
		<div
			class="reveal-panel"
			class:closing
			onwheel={forwardWheel}
			ontouchstart={stageTouchStart}
			ontouchmove={stageTouchMove}
		>
			<img class="reveal-portrait" src="/headshot.png" alt="Duncan Boyne, the architect" />
			<p class="reveal-eyebrow">The Architect</p>
			<h2 class="reveal-name">Duncan Boyne</h2>
			<p class="reveal-roles">
				AI &amp; BI Strategist · Speaker · Community Builder · Founder · Problem Solver
			</p>
			<p class="reveal-tagline">
				Helping organisations transform data into decisions and AI into outcomes.
			</p>
			<p class="reveal-lines">
				You've seen how I think.<br />Now let's talk about what I do.
			</p>
			<div class="reveal-ctas">
				<button class="cta-primary" onclick={() => finish('/contact')}>Enter the Strategy Room</button>
				<button class="cta-secondary" onclick={() => finish()}>Skip to Website</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.architect {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: #000;
		overflow: hidden;
		overscroll-behavior: contain;
		opacity: 1;
		transition: opacity 1.3s ease;
	}
	.architect.started {
		overflow-y: auto;
	}
	.architect.closing {
		opacity: 0;
		pointer-events: none;
	}

	.architect-spacer {
		height: 900vh;
		width: 100%;
	}

	.architect-stage {
		position: fixed;
		inset: 0;
		pointer-events: none;
	}
	/* raycasting only matters in the Hall of Decisions; wheel events still
	   bubble to the overlay scroller */
	.architect-stage.interactive {
		pointer-events: auto;
	}

	.consequence {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 9vh;
		text-align: center;
		color: rgba(244, 209, 65, 0.85);
		font-size: clamp(0.7rem, 1.6vw, 0.85rem);
		font-weight: 300;
		font-style: italic;
		letter-spacing: 0.18em;
		pointer-events: none;
		margin: 0;
		animation: consequence-in 0.9s ease both;
	}
	@keyframes consequence-in {
		from { opacity: 0; transform: translateY(0.4rem); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* visually hidden but focusable mirror controls */
	.decision-mirror {
		position: fixed;
		left: -1px;
		top: -1px;
		width: 1px;
		height: 1px;
		overflow: hidden;
		border: 0;
		padding: 0;
		margin: 0;
	}
	.decision-mirror button:focus-visible {
		position: fixed;
		left: 1.5rem;
		top: 1.5rem;
		width: auto;
		height: auto;
		background: #000;
		color: #f4d141;
		border: 1px solid #f4d141;
		padding: 0.6rem 1rem;
		z-index: 30;
	}
	.sr-only-legend {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.scroll-hint {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.65rem;
		font-weight: 300;
		letter-spacing: 0.35em;
		text-transform: uppercase;
		animation: hint-in 1.2s ease 1.5s both;
		pointer-events: none;
	}
	.scroll-hint .chevron {
		width: 1px;
		height: 2.2rem;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
		animation: chevron-drift 2.2s ease-in-out infinite;
	}
	@keyframes hint-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes chevron-drift {
		0%, 100% { transform: translateY(0); opacity: 0.9; }
		50% { transform: translateY(0.5rem); opacity: 0.4; }
	}
	.scroll-hint.idle {
		animation: hint-in 1.2s ease both;
	}

	.progress-rune {
		position: fixed;
		right: 1.4rem;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 38vh;
		background: rgba(255, 255, 255, 0.12);
		pointer-events: none;
	}
	.progress-fill {
		width: 100%;
		background: linear-gradient(to bottom, rgba(244, 209, 65, 0.4), rgba(244, 209, 65, 0.9));
		transition: height 0.2s linear;
	}

	.reveal-portrait {
		width: clamp(88px, 13vw, 132px);
		height: clamp(88px, 13vw, 132px);
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid rgba(244, 209, 65, 0.65);
		box-shadow:
			0 0 32px rgba(244, 209, 65, 0.35),
			0 0 90px rgba(244, 209, 65, 0.15);
		margin-bottom: 1.4rem;
		animation: portrait-in 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}
	@keyframes portrait-in {
		from { opacity: 0; transform: scale(0.7); filter: blur(6px); }
		to { opacity: 1; transform: scale(1); filter: blur(0); }
	}

	.reveal-panel {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.78));
		animation: reveal-in 1.6s ease both;
	}
	@keyframes reveal-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.reveal-eyebrow {
		color: rgba(244, 209, 65, 0.7);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.45em;
		text-transform: uppercase;
		margin: 0 0 1.2rem;
	}
	.reveal-name {
		color: #f5f5f5;
		font-size: clamp(2.6rem, 7vw, 5rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0 0 1rem;
	}
	.reveal-roles {
		color: rgba(255, 255, 255, 0.75);
		font-size: clamp(0.75rem, 1.6vw, 0.95rem);
		font-weight: 300;
		letter-spacing: 0.12em;
		margin: 0 0 0.9rem;
	}
	.reveal-tagline {
		color: rgba(255, 255, 255, 0.55);
		font-size: clamp(0.8rem, 1.6vw, 1rem);
		font-weight: 300;
		max-width: 34rem;
		margin: 0 0 2.2rem;
	}
	.reveal-lines {
		color: rgba(244, 209, 65, 0.85);
		font-size: clamp(0.9rem, 2vw, 1.15rem);
		font-weight: 300;
		font-style: italic;
		line-height: 1.7;
		margin: 0 0 2.4rem;
	}

	.reveal-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
	.cta-primary,
	.cta-secondary {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 0.9rem 1.8rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.cta-primary {
		background: #f4d141;
		color: #1a1a1a;
		border: 1px solid #f4d141;
	}
	.cta-primary:hover {
		background: #e2a414;
		border-color: #e2a414;
	}
	.cta-secondary {
		background: transparent;
		color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.25);
	}
	.cta-secondary:hover {
		color: #fff;
		border-color: rgba(255, 255, 255, 0.6);
	}
</style>
