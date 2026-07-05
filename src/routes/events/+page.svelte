<script lang="ts">
	import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';

	export let data: PageData;
	$: upcomingEvents = data.upcomingEvents;
	$: pastEvents = data.pastEvents;

	let openId: number | null = null;

	function toggle(id: number) {
		openId = openId === id ? null : id;
	}
</script>

<Seo
	title="Events — Duncan Boyne"
	description="Upcoming and past speaking engagements, workshops, and community events by Duncan Boyne."
	path="/events"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream ev-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ev-hero-disc"></span>
		<span class="b-shape ev-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">On the Road</p>
		<h1 class="page-title">Events</h1>
		<p class="page-sub">Conferences, user groups, and community events — places you can catch me in person or online.</p>
	</div>
</section>

<!-- ══ EVENTS — cream field ═════════════════════════════════════════════ -->
<section class="band band--cream events-section">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ev-list-disc"></span>
	</div>
	<div class="wrap">
			<!-- Upcoming -->
			<div class="events-group">
				<p class="group-label">Upcoming</p>
				{#if upcomingEvents.length === 0}
					<p class="msg-empty">No upcoming events scheduled right now. Check back soon.</p>
				{:else}
					<ul class="acc-list">
						{#each upcomingEvents as event}
							{@const isOpen = openId === event.id}
							<li class="acc-item" class:is-open={isOpen}>
								<button class="acc-btn" on:click={() => toggle(event.id)} aria-expanded={isOpen}>
									<span class="acc-marker" aria-hidden="true"></span>
									<span class="acc-date">{formatDate(event.event_date)}</span>
									<span class="acc-title">{event.title}</span>
									{#if event.event_type}<span class="ev-type">{event.event_type}</span>{/if}
									<ChevronDown class="acc-chevron" aria-hidden="true" />
								</button>

								<div class="acc-expand" aria-hidden={!isOpen}>
									<div class="acc-expand-in">
										<div class="acc-body">
											{#if event.location}<span class="detail-location">{event.location}</span>{/if}
											{#if event.description}<p class="row-desc">{event.description}</p>{/if}
											<div class="row-actions">
												{#if event.event_url}
													<a href={event.event_url} target="_blank" rel="noopener noreferrer" class="btn-primary">
														Register <ExternalLink class="ico" />
													</a>
												{/if}
												{#if event.talk_slug}
													<a href="/talks/{event.talk_slug}" class="btn-secondary">View Talk</a>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Past -->
			{#if pastEvents.length > 0}
				<div class="events-group past-group">
					<p class="group-label">Past Events</p>
					<ul class="acc-list">
						{#each pastEvents as event}
							{@const isOpen = openId === event.id}
							<li class="acc-item" class:is-open={isOpen}>
								<button class="acc-btn" on:click={() => toggle(event.id)} aria-expanded={isOpen}>
									<span class="acc-marker" aria-hidden="true"></span>
									<span class="acc-date">{formatDate(event.event_date)}</span>
									<span class="acc-title">{event.title}</span>
									{#if event.event_type}<span class="ev-type">{event.event_type}</span>{/if}
									<ChevronDown class="acc-chevron" aria-hidden="true" />
								</button>

								<div class="acc-expand" aria-hidden={!isOpen}>
									<div class="acc-expand-in">
										<div class="acc-body">
											{#if event.location}<span class="detail-location">{event.location}</span>{/if}
											<div class="row-actions">
												{#if event.slide_deck_url}
													<a href={event.slide_deck_url} target="_blank" rel="noopener noreferrer" class="btn-secondary">
														Slides <ExternalLink class="ico" />
													</a>
												{/if}
												{#if event.talk_slug}
													<a href="/talks/{event.talk_slug}" class="btn-secondary">View Talk</a>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ev-cta-disc"></span>
		<span class="b-shape ev-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="/contact" class="cta-main">Get in touch <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">I speak at conferences, user groups, and community events across the UK and Europe.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, the accordion row list, and
	   the CTA pattern live in app.css (Bauhaus poster kit). This block
	   keeps only what's specific to Events' own layout and bleed shapes.
	   Register/Slides/View Talk sit inside the click-driven accordion body,
	   so they're reachable by keyboard and touch, not hover-only. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.ev-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.ev-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.ev-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ EVENTS ═════════════════════════════════════════════════════ */
	.ev-list-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -9vw, -4rem);
	}
	.events-group { padding-top: clamp(2.5rem, 5vw, 4rem); }
	.events-group:first-child { padding-top: 0; }
	.past-group { opacity: 0.7; }
	.group-label {
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--field-accent); margin: 0 0 1.5rem;
		border-bottom: 1.5px solid var(--rule-soft); padding-bottom: 0.75rem;
	}

	.acc-date { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; color: var(--fg-muted); white-space: nowrap; width: 6.5rem; flex-shrink: 0; }
	.ev-type {
		font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
		color: var(--fg-muted); border: 1.5px solid var(--rule-soft);
		padding: 0.2rem 0.5rem; white-space: nowrap; display: none;
	}
	@media (min-width: 640px) { .ev-type { display: block; } }

	.detail-location {
		display: inline-block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
		text-transform: uppercase; color: var(--field-accent); margin-bottom: 0.6rem;
	}
	.row-desc { font-size: 0.875rem; color: var(--fg-muted); line-height: 1.6; max-width: 60ch; margin: 0.25rem 0 0.75rem; }
	.row-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.25rem; }

	.msg-empty { padding: 3rem 0; color: var(--fg-muted); font-size: 1rem; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.ev-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.ev-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
