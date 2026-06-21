<script lang="ts">
	import { onMount } from 'svelte';

	const HOOK = "Your data has a story. Let's tell it properly.";

	let duncanVisible  = false;
	let boyneVisible   = false;
	let taglineVisible = false;
	let hookText       = '';
	let hookDone       = false;
	let sublineVisible = false;
	let buttonsVisible = false;
	let photoVisible   = false;

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduced) {
			duncanVisible = boyneVisible = taglineVisible = hookDone = sublineVisible = buttonsVisible = photoVisible = true;
			hookText = HOOK;
			return;
		}

		setTimeout(() => { duncanVisible = true; photoVisible = true; }, 150);
		setTimeout(() => { boyneVisible = true; },   370);
		setTimeout(() => { taglineVisible = true; }, 780);

		// Typewriter
		setTimeout(() => {
			let i = 0;
			const tick = setInterval(() => {
				i++;
				hookText = HOOK.slice(0, i);
				if (i >= HOOK.length) {
					clearInterval(tick);
					hookDone = true;
					setTimeout(() => { sublineVisible = true; }, 180);
					setTimeout(() => { buttonsVisible = true; }, 360);
				}
			}, 40);
		}, 1200);
	});
</script>

<section class="hero-section py-12 md:py-28 relative overflow-hidden">
	<div class="hero-grid" aria-hidden="true"></div>
	<div class="hero-vignette" aria-hidden="true"></div>

	<div class="container-custom relative z-10">
		<div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

			<!-- Text -->
			<div class="text-center md:text-left">

				<!-- Name — two words staggered -->
				<h1 class="hero-name font-black text-text leading-none tracking-tight mb-4" aria-label="Duncan Boyne">
					<span class="word-wrap">
						<span class="word" class:word-visible={duncanVisible} aria-hidden="true">Duncan</span>
					</span>
					<br>
					<span class="word-wrap">
						<span class="word" class:word-visible={boyneVisible} aria-hidden="true">Boyne</span>
					</span>
				</h1>

				<!-- Tagline -->
				<p
					class="hero-tagline font-medium md:whitespace-nowrap tagline reveal"
					class:reveal-visible={taglineVisible}
				>
					The Power BI Kinda Guy.
				</p>

				<!-- Hook — typewriter -->
				<p class="hook reveal" class:reveal-visible={taglineVisible}>
					{hookText}<span class="cursor" class:cursor-done={hookDone} aria-hidden="true">|</span>
					<!-- Invisible placeholder keeps layout stable before typing starts -->
					<span class="hook-placeholder" aria-hidden="true">{HOOK}</span>
				</p>

				<!-- Sub-line -->
				<p
					class="mt-3 text-base md:text-lg text-muted max-w-md mx-auto md:mx-0 reveal"
					class:reveal-visible={sublineVisible}
				>
					Power BI · Automation · AI Readiness
				</p>

				<!-- Buttons -->
				<div
					class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start reveal"
					class:reveal-visible={buttonsVisible}
				>
					<a href="/services" class="btn-primary">Work With Me</a>
					<a href="/contact" class="btn-secondary">Get in Touch</a>
				</div>

			</div>

			<!-- Profile photo -->
			<div class="flex-shrink-0 md:-mt-3 reveal" class:reveal-visible={photoVisible}>
				<div class="w-44 h-44 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-accent to-accent2 p-1">
					<div class="w-full h-full rounded-full bg-surface overflow-hidden">
						<img src="/profile.jpg" alt="Duncan Boyne" class="w-full h-full object-cover object-top" />
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	.hero-section {
		background-color: var(--color-bg);
	}

	/* Graph-paper grid */
	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(139, 104, 0, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(139, 104, 0, 0.06) 1px, transparent 1px),
			linear-gradient(rgba(139, 104, 0, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(139, 104, 0, 0.025) 1px, transparent 1px);
		background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
	}

	:global(.dark) .hero-grid {
		background-image:
			linear-gradient(rgba(212, 169, 0, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(212, 169, 0, 0.07) 1px, transparent 1px),
			linear-gradient(rgba(212, 169, 0, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(212, 169, 0, 0.03) 1px, transparent 1px);
		background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
	}

	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, var(--color-bg) 100%);
	}

	/* Name sizing */
	.hero-name {
		font-size: clamp(3.2rem, 10.4vw, 9.6rem);
	}

	.hero-tagline {
		font-size: clamp(1.35rem, 4.8vw, 4.5rem);
	}

	.tagline {
		color: var(--color-accent);
	}

	/* Word slide-up animation */
	.word-wrap {
		display: inline-block;
		overflow: hidden;
		vertical-align: bottom;
	}

	.word {
		display: inline-block;
		transform: translateY(110%);
		opacity: 0;
		transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
	}

	.word.word-visible {
		transform: translateY(0);
		opacity: 1;
	}

	/* Generic fade-up reveal */
	.reveal {
		opacity: 0;
		transform: translateY(12px);
		transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.reveal.reveal-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hook line */
	.hook {
		position: relative;
		margin-top: 0.6rem;
		font-size: clamp(1rem, 2.2vw, 1.35rem);
		font-weight: 500;
		color: var(--color-text);
		min-height: 1.6em;
	}

	/* Invisible placeholder locks the line's height before typing starts */
	.hook-placeholder {
		position: absolute;
		inset: 0;
		visibility: hidden;
		pointer-events: none;
		white-space: nowrap;
	}

	/* Blinking cursor */
	.cursor {
		display: inline-block;
		margin-left: 1px;
		color: var(--color-accent);
		font-weight: 300;
		animation: blink 0.8s step-end infinite;
	}

	.cursor.cursor-done {
		opacity: 0;
		transition: opacity 0.3s ease 0.4s;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}
</style>
