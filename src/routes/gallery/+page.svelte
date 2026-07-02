<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { galleryEvents, galleryPhotos } from '$lib/gallery';

	let lightboxIndex: number | null = null;

	$: current = lightboxIndex !== null ? galleryPhotos[lightboxIndex] : null;

	function open(i: number) {
		lightboxIndex = i;
	}
	function close() {
		lightboxIndex = null;
	}
	function next() {
		if (lightboxIndex !== null) lightboxIndex = (lightboxIndex + 1) % galleryPhotos.length;
	}
	function prev() {
		if (lightboxIndex !== null) lightboxIndex = (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
	}

	function onKeydown(e: KeyboardEvent) {
		if (lightboxIndex === null) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowRight') next();
		else if (e.key === 'ArrowLeft') prev();
	}

	// Lock body scroll while the lightbox is open.
	$: if (typeof document !== 'undefined') {
		document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
	}
	onDestroy(() => {
		if (typeof document !== 'undefined') document.body.style.overflow = '';
	});

	// Flat lightbox index where each event's photos start.
	const eventBase: number[] = [];
	galleryEvents.reduce((n, e, i) => {
		eventBase[i] = n;
		return n + e.photos.length;
	}, 0);
</script>

<svelte:head>
	<title>Gallery — Duncan Boyne</title>
	<meta name="description" content="Photos from conferences, user groups, and speaking engagements with Duncan Boyne." />
</svelte:head>

<svelte:window on:keydown={onKeydown} />

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream gl-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle gl-hero-disc"></span>
		<span class="b-shape gl-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Out and About</p>
		<h1 class="page-title">Gallery</h1>
		<p class="page-sub">Moments from conferences, user groups, and community events — on stage and in the room.</p>
	</div>
</section>

<!-- ══ GROUPED GRIDS — photos carry the design, kept field-neutral ══════ -->
<section class="gallery-section">
	<div class="wrap">
		{#if galleryPhotos.length === 0}
			<p class="msg-empty">No photos yet — check back soon.</p>
		{:else}
			{#each galleryEvents as event, eIdx}
				{@const base = eventBase[eIdx]}
				<div class="event-group">
					<div class="group-head">
						<h2 class="group-name">{event.name}</h2>
						<span class="group-meta">
							{#if event.location}<span>{event.location}</span>{/if}
							{#if event.year}<span class="group-year">{event.year}</span>{/if}
						</span>
					</div>
					<div class="masonry">
						{#each event.photos as photo, pIdx}
							<button class="tile" on:click={() => open(base + pIdx)} aria-label={`View photo: ${photo.alt}`}>
								<img src={photo.src} alt={photo.alt} loading="lazy" />
							</button>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>

<!-- Lightbox -->
{#if current}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
	<div class="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} on:click={close}>
		<button class="lb-close" on:click|stopPropagation={close} aria-label="Close">
			<X class="lb-ico" />
		</button>

		{#if galleryPhotos.length > 1}
			<button class="lb-nav lb-prev" on:click|stopPropagation={prev} aria-label="Previous photo">
				<ChevronLeft class="lb-ico" />
			</button>
			<button class="lb-nav lb-next" on:click|stopPropagation={next} aria-label="Next photo">
				<ChevronRight class="lb-ico" />
			</button>
		{/if}

		<figure class="lb-figure" on:click|stopPropagation>
			<img src={current.src} alt={current.alt} class="lb-img" />
			<figcaption class="lb-cap">
				<span class="lb-alt">{current.alt}</span>
			</figcaption>
		</figure>
	</div>
{/if}

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle gl-cta-disc"></span>
		<span class="b-shape gl-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="/contact" class="cta-main">Get in touch <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">I speak at conferences, user groups, and community events across the UK and Europe.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, and the CTA pattern live in
	   app.css (Bauhaus poster kit). The photo grid stays field-neutral —
	   real photos carry this page, not geometry. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.gl-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.gl-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.gl-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ GALLERY ════════════════════════════════════════════════════ */
	.gallery-section { padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(4rem, 8vw, 7rem); }
	.msg-empty { padding: 3rem 0; color: var(--color-muted); font-size: 1rem; }

	.event-group { padding-top: clamp(2rem, 4vw, 3.5rem); }
	.event-group:first-child { padding-top: 0; }
	.group-head {
		display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-border); padding-bottom: 0.85rem; margin-bottom: 1.5rem;
	}
	.group-name { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 800; letter-spacing: -0.02em; color: var(--color-text); margin: 0; }
	.group-meta { display: flex; flex-wrap: wrap; gap: 0.4rem 0.9rem; font-size: 0.8rem; color: var(--color-muted); }
	.group-year { font-weight: 700; letter-spacing: 0.06em; color: var(--color-accent); }

	/* Masonry via CSS columns — respects each photo's aspect ratio. */
	.masonry { column-count: 1; column-gap: 1rem; }
	@media (min-width: 560px) { .masonry { column-count: 2; } }
	@media (min-width: 900px) { .masonry { column-count: 3; } }

	.tile {
		position: relative; display: block; width: 100%; padding: 0; margin: 0 0 1rem;
		border: 1px solid var(--color-border); background: var(--color-surface);
		cursor: pointer; overflow: hidden; line-height: 0;
		break-inside: avoid;
	}
	.tile img { width: 100%; height: auto; display: block; transition: transform 0.6s ease; }
	.tile:hover img { transform: scale(1.04); }
	.tile:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

	/* Lightbox — cinematic exception, stays dark regardless of page field */
	.lightbox {
		position: fixed; inset: 0; z-index: 100;
		display: flex; align-items: center; justify-content: center;
		background: rgba(0,0,0,0.92); padding: clamp(1rem, 4vw, 3rem);
	}
	.lb-figure { margin: 0; max-width: min(92vw, 1000px); max-height: 90vh; display: flex; flex-direction: column; gap: 0.85rem; }
	.lb-img { max-width: 100%; max-height: 80vh; object-fit: contain; display: block; margin: 0 auto; }

	.lb-cap { display: flex; flex-direction: column; gap: 0.35rem; text-align: center; }
	.lb-alt { color: #fff; font-size: 0.95rem; font-weight: 500; }

	.lb-close, .lb-nav {
		position: absolute; z-index: 101; background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		width: 2.75rem; height: 2.75rem; transition: background 0.2s, border-color 0.2s;
	}
	.lb-close:hover, .lb-nav:hover { background: rgba(255,255,255,0.18); border-color: var(--color-accent); }
	.lb-close { top: clamp(0.75rem, 3vw, 1.5rem); right: clamp(0.75rem, 3vw, 1.5rem); }
	.lb-nav { top: 50%; transform: translateY(-50%); }
	.lb-prev { left: clamp(0.5rem, 2vw, 1.5rem); }
	.lb-next { right: clamp(0.5rem, 2vw, 1.5rem); }
	:global(.lb-ico) { width: 1.4rem; height: 1.4rem; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.gl-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.gl-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
