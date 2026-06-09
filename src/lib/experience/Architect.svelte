<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { markSeen } from './gate';
	import { experienceActive, scrollProgress, qualityTier } from './stores';
	import { createScrollTimeline } from './timeline';
	import Scene from './Scene.svelte';
	import StartOverlay from './ui/StartOverlay.svelte';
	import Captions from './ui/Captions.svelte';
	import SkipButton from './ui/SkipButton.svelte';

	let { tier = 'full', onclose }: { tier?: 'full' | 'lite'; onclose: () => void } = $props();

	let overlayEl = $state<HTMLDivElement>();
	let spacerEl = $state<HTMLDivElement>();
	let started = $state(false);
	let closing = $state(false);

	const showReveal = $derived(started && $scrollProgress > 0.985);
	const showScrollHint = $derived(started && $scrollProgress < 0.02);

	let destroyTimeline: (() => void) | null = null;

	onMount(() => {
		qualityTier.set(tier === 'lite' ? 'lite' : 'high');
		experienceActive.set(true);
		document.documentElement.classList.add('architect-active');
		document.documentElement.classList.remove('architect-pending');
		return () => {
			destroyTimeline?.();
			experienceActive.set(false);
			document.documentElement.classList.remove('architect-active');
		};
	});

	function begin() {
		started = true;
		if (overlayEl && spacerEl) {
			destroyTimeline = createScrollTimeline(overlayEl, spacerEl);
		}
	}

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

	<div class="architect-stage" aria-hidden="true">
		<Scene {tier} />
	</div>

	<Captions />

	{#if !started}
		<StartOverlay onbegin={begin} onskip={() => finish()} />
	{/if}

	{#if showScrollHint}
		<div class="scroll-hint" aria-hidden="true">
			<span>Scroll</span>
			<span class="chevron"></span>
		</div>
	{/if}

	{#if started && !showReveal && !closing}
		<SkipButton onskip={() => finish()} />
	{/if}

	{#if showReveal}
		<div class="reveal-panel" class:closing>
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
