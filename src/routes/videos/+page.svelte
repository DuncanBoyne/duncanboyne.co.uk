<script lang="ts">
	import { ArrowUpRight, Play } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';

	export let data: PageData;
	$: videos = data.videos;

	function ytThumb(id: string) {
		return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
	}
</script>

<Seo
	title="Videos — Duncan Boyne"
	description="Power BI tutorials, tips, and walkthroughs from Duncan Boyne."
	path="/videos"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream vd-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle vd-hero-disc"></span>
		<span class="b-shape vd-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Content</p>
		<h1 class="page-title">Videos</h1>
		<p class="page-sub">Power BI tutorials, tips, and walkthroughs — on YouTube.</p>
	</div>
</section>

<!-- ══ VIDEOS — surface field ═══════════════════════════════════════════ -->
<section class="band band--surface videos-section">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle vd-list-disc"></span>
	</div>
	<div class="wrap">
		{#if videos.length === 0}
			<p class="msg-empty">No videos yet. Check back soon.</p>
		{:else}
			<ul class="row-list">
				{#each videos as video}
					<li class="row-item">
						<a
							href="https://www.youtube.com/watch?v={video.youtube_id}"
							target="_blank"
							rel="noopener noreferrer"
							class="row-link"
						>
							<div class="row-top">
								<span class="row-marker" aria-hidden="true"></span>
								{#if video.published_at}
									<span class="row-date">{formatDate(video.published_at)}</span>
								{/if}
								<span class="row-title">{video.title}</span>
								<Play class="row-play ico" />
								<ArrowUpRight class="row-arrow ico" />
							</div>
							<div class="row-expand"><div class="row-expand-in">
								<div class="row-thumb-wrap vd-thumb-wrap">
									<img
										src={ytThumb(video.youtube_id)}
										alt={video.title}
										class="row-thumb"
										loading="lazy"
									/>
									<div class="thumb-overlay">
										<Play class="play-icon" />
									</div>
								</div>
								{#if video.description}
									<p class="row-excerpt">{video.description}</p>
								{/if}
							</div></div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle vd-cta-disc"></span>
		<span class="b-shape vd-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want more?</p>
		<a href="https://www.youtube.com/@PowerBIButWhy" target="_blank" rel="noopener noreferrer" class="cta-main">
			YouTube <ArrowUpRight class="cta-ico" />
		</a>
		<p class="cta-sub">Subscribe to <strong>@PowerBIButWhy</strong> for Power BI tips and tutorials.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, and .row-list live in app.css
	   (Bauhaus poster kit). This block keeps only what's specific to
	   Videos' own hero, YouTube thumb overlay, and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.vd-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.vd-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.vd-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ VIDEOS ═════════════════════════════════════════════════════ */
	.vd-list-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -9vw, -4rem);
	}
	.row-play { color: var(--field-accent); opacity: 0.6; transition: opacity 0.4s; }
	.row-link:hover .row-play { opacity: 1; }
	.vd-thumb-wrap { position: relative; aspect-ratio: auto; }
	.thumb-overlay {
		position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
		background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s;
	}
	.row-link:hover .thumb-overlay { opacity: 1; }
	.play-icon { width: 2.5rem; height: 2.5rem; color: white; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.vd-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.vd-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
