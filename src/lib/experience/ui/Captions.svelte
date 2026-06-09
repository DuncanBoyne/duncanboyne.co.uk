<script lang="ts">
	import { scrollProgress } from '../stores';
	import { SECTIONS } from '../sections';

	type Item = { text: string; start: number; end: number };

	// Give each caption an equal sub-window inside its section's scroll range.
	const items: Item[] = [];
	for (const s of SECTIONS) {
		if (s.captions.length === 0) continue;
		const [a, b] = s.range;
		const pad = (b - a) * 0.08;
		const start = a + pad;
		const width = (b - a - pad * 2) / s.captions.length;
		s.captions.forEach((text, i) => {
			items.push({ text, start: start + i * width, end: start + (i + 1) * width });
		});
	}

	function opacityFor(it: Item, p: number): number {
		if (p < it.start || p > it.end) return 0;
		const t = (p - it.start) / (it.end - it.start);
		return Math.min(1, t / 0.25, (1 - t) / 0.25);
	}

	const active = $derived.by(() => {
		const p = $scrollProgress;
		for (const it of items) {
			const opacity = opacityFor(it, p);
			if (opacity > 0.01) return { text: it.text, opacity };
		}
		return null;
	});
</script>

<div class="captions" role="status" aria-live="polite">
	{#if active}
		<p class="caption" style="opacity: {active.opacity}">{active.text}</p>
	{/if}
</div>

<style>
	.captions {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 16vh;
		display: flex;
		justify-content: center;
		pointer-events: none;
	}
	.caption {
		color: rgba(255, 255, 255, 0.78);
		font-size: clamp(0.85rem, 2.2vw, 1.15rem);
		font-weight: 200;
		font-style: italic;
		letter-spacing: 0.22em;
		text-align: center;
		text-shadow: 0 0 24px rgba(0, 0, 0, 0.9);
		max-width: 38rem;
		padding: 0 1.5rem;
		margin: 0;
	}
</style>
