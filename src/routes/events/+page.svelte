<script lang="ts">
	import { onMount } from 'svelte';
	import { getEvents } from '$lib/supabase';
	import { ArrowUpRight, ExternalLink } from 'lucide-svelte';
	import type { Event } from '$lib/types';

	let upcomingEvents: Event[] = [];
	let pastEvents: Event[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const [upcoming, past] = await Promise.all([getEvents(true), getEvents(false)]);
			upcomingEvents = upcoming || [];
			pastEvents = past || [];
		} catch (e) {
			error = 'Failed to load events.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>Events — Duncan Boyne</title>
	<meta name="description" content="Upcoming and past speaking engagements, workshops, and community events by Duncan Boyne." />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">On the Road</p>
		<h1 class="page-title">Events</h1>
		<p class="page-sub">Conferences, user groups, and community events — places you can catch me in person or online.</p>
	</div>
</section>

<!-- Main content -->
<section class="events-section">
	<div class="wrap">
		{#if loading}
			<ul class="row-list">
				{#each [1,2,3,4] as _}
					<li class="row-item skeleton">
						<div class="sk-date"></div>
						<div class="sk-title"></div>
					</li>
				{/each}
			</ul>
		{:else if error}
			<p class="msg-empty">{error}</p>
		{:else}
			<!-- Upcoming -->
			<div class="events-group">
				<p class="group-label">Upcoming</p>
				{#if upcomingEvents.length === 0}
					<p class="msg-empty">No upcoming events scheduled right now. Check back soon.</p>
				{:else}
					<ul class="row-list">
						{#each upcomingEvents as event}
							<li class="row-item">
								<div class="row-inner">
									<div class="row-top">
										<span class="row-date">{formatDate(event.event_date)}</span>
										<span class="row-title">{event.title}</span>
										{#if event.event_type}
											<span class="row-type">{event.event_type}</span>
										{/if}
										<ArrowUpRight class="row-arrow ico" />
									</div>
									<div class="row-expand"><div class="row-expand-in">
										<div class="row-detail">
											{#if event.location}
												<span class="detail-location">{event.location}</span>
											{/if}
											{#if event.description}
												<p class="row-desc">{event.description}</p>
											{/if}
											<div class="row-actions">
												{#if event.event_url}
													<a href={event.event_url} target="_blank" rel="noopener noreferrer" class="btn-primary">
														Register <ExternalLink class="w-3.5 h-3.5" />
													</a>
												{/if}
												{#if event.talk_slug}
													<a href="/talks/{event.talk_slug}" class="btn-secondary">View Talk</a>
												{/if}
											</div>
										</div>
									</div></div>
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
					<ul class="row-list">
						{#each pastEvents as event}
							<li class="row-item past">
								<div class="row-inner">
									<div class="row-top">
										<span class="row-date">{formatDate(event.event_date)}</span>
										<span class="row-title">{event.title}</span>
										{#if event.event_type}
											<span class="row-type">{event.event_type}</span>
										{/if}
									</div>
									<div class="row-expand"><div class="row-expand-in">
										<div class="row-detail">
											{#if event.location}
												<span class="detail-location">{event.location}</span>
											{/if}
											<div class="row-actions">
												{#if event.slide_deck_url}
													<a href={event.slide_deck_url} target="_blank" rel="noopener noreferrer" class="btn-secondary">
														Slides <ExternalLink class="w-3.5 h-3.5" />
													</a>
												{/if}
												{#if event.talk_slug}
													<a href="/talks/{event.talk_slug}" class="btn-secondary">View Talk</a>
												{/if}
											</div>
										</div>
									</div></div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}
	</div>
</section>

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="/contact" class="cta-main">Get in touch <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">I speak at conferences, user groups, and community events across the UK and Europe.</p>
	</div>
</section>

<style>
	.wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3.5rem); }

	/* Hero */
	.page-hero {
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(1.5rem, 3vw, 2.5rem);
		border-bottom: 3px solid var(--color-accent3);
	}
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* Events section */
	.events-section { padding: 0 0 clamp(4rem, 8vw, 7rem); }
	.events-group { padding-top: clamp(2.5rem, 5vw, 4rem); }
	.past-group { opacity: 0.65; }
	.group-label {
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--color-accent); margin: 0 0 1.5rem;
		border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;
	}

	/* Rows */
	.row-list { list-style: none; margin: 0; padding: 0; }
	.row-item { border-bottom: 1px solid var(--color-border); }
	.row-item:first-child { border-top: 1px solid var(--color-border); }
	.row-inner { padding: 1.25rem 0; }
	.row-top { display: flex; align-items: center; gap: 1.25rem; }

	.row-item:not(.past) .row-inner:hover .row-expand { grid-template-rows: 1fr; }
	.row-item:not(.past) .row-inner:hover .row-arrow { opacity: 1; transform: translate(2px,-2px); }
	.row-item:not(.past) .row-inner:hover .row-title { color: var(--color-accent2); }

	.row-date {
		font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
		color: var(--color-muted); white-space: nowrap; width: 7rem; flex-shrink: 0;
	}
	.row-title {
		font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 600; color: var(--color-text);
		flex: 1; transition: color 0.6s ease;
	}
	.row-type {
		font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
		color: var(--color-muted); border: 1.5px solid var(--color-border);
		padding: 0.2rem 0.5rem; white-space: nowrap; display: none;
	}
	@media (min-width: 640px) { .row-type { display: block; } }
	:global(.ico) { width: 0.9em; height: 0.9em; flex-shrink: 0; display: inline-block; }
	.row-arrow {
		color: var(--color-muted); flex-shrink: 0;
		transition: color 0.6s ease, transform 0.6s ease; opacity: 0.4;
	}

	.row-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.9s ease; }
	.row-expand-in { overflow: hidden; }

	.row-detail {
		padding: 0.75rem 0 0.5rem 8.25rem;
		opacity: 0; transform: translateY(3px);
		transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.row-item .row-inner:hover .row-detail { opacity: 1; transform: translateY(0); }

	.detail-location {
		display: inline-block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
		text-transform: uppercase; color: var(--color-accent); margin-bottom: 0.6rem;
	}
	.row-desc { font-size: 0.875rem; color: var(--color-muted); line-height: 1.6; max-width: 60ch; margin: 0.25rem 0 0.75rem; }
	.row-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.25rem; margin-bottom: 0.5rem; }

	/* CTA */
	.cta-block { padding: clamp(5rem, 10vw, 9rem) 0; border-top: 1px solid var(--color-border); }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(2rem, 5vw, 4.5rem); height: clamp(2rem, 5vw, 4.5rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }

	/* Skeleton */
	.skeleton { padding: 1.25rem 0; display: flex; gap: 1.5rem; align-items: center; }
	.sk-date { width: 7rem; height: 0.75rem; background: var(--color-border); flex-shrink: 0; }
	.sk-title { flex: 1; height: 1rem; background: var(--color-border); }
	.msg-empty { padding: 3rem 0; color: var(--color-muted); font-size: 1rem; }
</style>
