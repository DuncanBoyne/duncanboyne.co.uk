<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, ExternalLink, Globe } from 'lucide-svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import { marked } from 'marked';
	import { getTalkBySlug, getEventsByTalkSlug, getFeedbackByTalkSlug } from '$lib/supabase';
	import type { Talk, Event, TalkFeedback } from '$lib/types';

	let talk: Talk | null = null;
	let upcomingEvents: Event[] = [];
	let pastEvents: Event[] = [];
	let feedback: TalkFeedback[] = [];
	let loading = true;
	let error: string | null = null;

	$: slug = $page.params.slug ?? '';

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
		});
	}

	onMount(async () => {
		try {
			const [talkData, events, feedbackData] = await Promise.all([
				getTalkBySlug(slug),
				getEventsByTalkSlug(slug),
				getFeedbackByTalkSlug(slug)
			]);
			talk = talkData;
			feedback = feedbackData || [];
			const now = new Date().toISOString();
			upcomingEvents = (events || []).filter(e => e.event_date >= now);
			pastEvents = (events || []).filter(e => e.event_date < now);
		} catch (e) {
			error = 'Failed to load this talk.';
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	{#if talk}
		<title>{talk.title} — Duncan Boyne</title>
		<meta name="description" content={talk.excerpt || ''} />
	{:else}
		<title>Talk — Duncan Boyne</title>
	{/if}
</svelte:head>

<article>
	<!-- Back nav -->
	<div class="post-nav">
		<div class="wrap">
			<a href="/talks" class="back-link">
				<ArrowLeft class="w-4 h-4" /> Speaking
			</a>
		</div>
	</div>

	<div class="wrap">
		{#if loading}
			<div class="skeleton-wrap">
				<div class="sk-badge"></div>
				<div class="sk-title"></div>
				{#each [1,2,3,4] as _}<div class="sk-line"></div>{/each}
			</div>
		{:else if error || !talk}
			<div class="not-found">
				<h1>Talk Not Found</h1>
				<p>{error || 'This talk could not be found.'}</p>
				<a href="/talks" class="btn-primary"><ArrowLeft class="w-4 h-4 mr-2" /> Back to Speaking</a>
			</div>
		{:else}
			<header class="post-header">
				<p class="post-eyebrow">
					<span class="post-type">{talk.type === 'workshop' ? 'Workshop' : 'Talk'}</span>
				</p>
				<h1 class="post-title">{talk.title}</h1>
				{#if talk.co_host_name}
					<div class="cohost-row">
						<span class="cohost-label">Co-presented with</span>
						<span class="cohost-name">{talk.co_host_name}</span>
						{#if talk.co_host_url}
							<a href={talk.co_host_url} target="_blank" rel="noopener noreferrer" class="cohost-link">
								<Globe class="w-3.5 h-3.5" /> Website
							</a>
						{/if}
						{#if talk.co_host_linkedin}
							<a href={talk.co_host_linkedin} target="_blank" rel="noopener noreferrer" class="cohost-link">
								<Linkedin class="w-3.5 h-3.5" /> LinkedIn
							</a>
						{/if}
					</div>
				{/if}
			</header>

			{#if talk.image}
				<div class="post-image">
					<img src={talk.image} alt={talk.title} />
				</div>
			{/if}

			<div class="talk-content">
				{@html marked(talk.content)}
			</div>

			<!-- Upcoming events -->
			{#if upcomingEvents.length > 0}
				<div class="events-block">
					<p class="events-label">Upcoming</p>
					<ul class="events-list">
						{#each upcomingEvents as event}
							<li class="event-row">
								<div class="event-info">
									<span class="event-title">{event.title}</span>
									<span class="event-meta">
										{formatDate(event.event_date)}
										{#if event.location}<span class="event-sep">·</span>{event.location}{/if}
									</span>
								</div>
								<div class="event-actions">
									{#if event.event_url}
										<a href={event.event_url} target="_blank" rel="noopener noreferrer" class="btn-primary">
											Register <ExternalLink class="w-3.5 h-3.5" />
										</a>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Past events -->
			{#if pastEvents.length > 0}
				<div class="events-block past-block">
					<p class="events-label">Previously presented at</p>
					<ul class="events-list">
						{#each pastEvents as event}
							<li class="event-row past">
								<div class="event-info">
									<span class="event-title">{event.title}</span>
									<span class="event-meta">
										{formatDate(event.event_date)}
										{#if event.location}<span class="event-sep">·</span>{event.location}{/if}
									</span>
								</div>
								{#if event.slide_deck_url}
									<div class="event-actions">
										<a href={event.slide_deck_url} target="_blank" rel="noopener noreferrer" class="btn-secondary">
											Slides <ExternalLink class="w-3.5 h-3.5" />
										</a>
									</div>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Feedback -->
			{#if feedback.length > 0}
				<div class="feedback-block">
					<p class="feedback-label">What people said</p>
					<ul class="feedback-list">
						{#each feedback as item}
							<li class="feedback-item">
								<blockquote class="feedback-quote">"{item.quote}"</blockquote>
								<div class="feedback-attr">
									{#if item.attribution_url}
										<a href={item.attribution_url} target="_blank" rel="noopener noreferrer" class="feedback-name">{item.attribution_name}</a>
									{:else}
										<span class="feedback-name">{item.attribution_name}</span>
									{/if}
									{#if item.attribution_role}
										<span class="feedback-role">{item.attribution_role}</span>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="post-footer">
				<a href="/talks" class="back-link"><ArrowLeft class="w-4 h-4" /> Back to Speaking</a>
			</div>
		{/if}
	</div>
</article>

<style>
	.wrap { max-width: 780px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3.5rem); }

	/* Nav */
	.post-nav { border-bottom: 1px solid var(--color-border); padding: 1rem 0; background: var(--color-surface); }
	.back-link {
		display: inline-flex; align-items: center; gap: 0.4rem;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
		color: var(--color-muted); text-decoration: none; transition: color 0.3s;
	}
	.back-link:hover { color: var(--color-accent); }

	/* Header */
	.post-header { padding: clamp(2.5rem, 5vw, 4rem) 0 2rem; border-bottom: 1px solid var(--color-border); margin-bottom: 2.5rem; }
	.post-eyebrow { margin: 0 0 1rem; }
	.post-type {
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
		border: 1.5px solid var(--color-accent); color: var(--color-accent);
		padding: 0.25rem 0.6rem;
	}
	.post-title { font-size: clamp(1.8rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; color: var(--color-text); margin: 0 0 1.25rem; }

	.cohost-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
	.cohost-label { font-size: 0.8rem; color: var(--color-muted); }
	.cohost-name { font-size: 0.8rem; font-weight: 700; color: var(--color-text); }
	.cohost-link { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 600; color: var(--color-accent); text-decoration: none; }
	.cohost-link:hover { text-decoration: underline; }

	/* Image */
	.post-image { margin-bottom: 2.5rem; }
	.post-image img { width: 100%; height: auto; display: block; }

	/* Footer */
	.post-footer { padding: 3rem 0 4rem; border-top: 1px solid var(--color-border); margin-top: 3rem; }

	/* Events */
	.events-block { margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid var(--color-border); }
	.past-block { opacity: 0.7; }
	.events-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 1.25rem; }
	.events-list { list-style: none; margin: 0; padding: 0; }
	.event-row {
		display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
		gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--color-border);
	}
	.event-row:first-child { border-top: 1px solid var(--color-border); }
	.event-info { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 0; }
	.event-title { font-size: 0.95rem; font-weight: 600; color: var(--color-text); }
	.event-meta { font-size: 0.78rem; color: var(--color-muted); }
	.event-sep { margin: 0 0.35rem; opacity: 0.4; }
	.event-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

	/* Skeleton */
	.skeleton-wrap { padding: clamp(2rem, 5vw, 4rem) 0; display: flex; flex-direction: column; gap: 1rem; }
	.sk-badge { height: 1.5rem; background: var(--color-border); width: 5rem; }
	.sk-title { height: 2.5rem; background: var(--color-border); width: 75%; }
	.sk-line { height: 0.875rem; background: var(--color-border); }
	.sk-line:nth-child(odd) { width: 90%; }

	/* Not found */
	.not-found { padding: clamp(3rem, 8vw, 6rem) 0; }
	.not-found h1 { font-size: 1.5rem; font-weight: 900; margin: 0 0 0.75rem; }
	.not-found p { color: var(--color-muted); margin: 0 0 2rem; }

	/* Feedback */
	.feedback-block { margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid var(--color-border); }
	.feedback-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 1.5rem; }
	.feedback-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2rem; }

	.feedback-item { display: flex; flex-direction: column; gap: 0.75rem; }

	.feedback-quote {
		font-size: 1.05rem;
		font-style: italic;
		font-weight: 400;
		line-height: 1.7;
		color: var(--color-text);
		margin: 0;
		padding: 0;
		border: none;
		max-width: 65ch;
	}

	.feedback-attr { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

	.feedback-name {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-accent);
		text-decoration: none;
	}
	a.feedback-name:hover { text-decoration: underline; }

	.feedback-role {
		font-size: 0.78rem;
		color: var(--color-muted);
	}
	.feedback-role::before { content: '·'; margin-right: 0.5rem; opacity: 0.4; }

	/* Content */
	.talk-content { font-size: 1.125rem; line-height: 1.8; color: var(--color-text); max-width: 65ch; }
	.talk-content :global(a) { color: var(--color-accent); text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
	.talk-content :global(a:hover) { color: var(--color-accent2); }
	.talk-content :global(h1), .talk-content :global(h2), .talk-content :global(h3) { color: var(--color-text); font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
	.talk-content :global(h1) { font-size: 2rem; }
	.talk-content :global(h2) { font-size: 1.5rem; }
	.talk-content :global(h3) { font-size: 1.25rem; }
	.talk-content :global(p) { margin-bottom: 1.25rem; }
	.talk-content :global(strong) { font-weight: 700; }
	.talk-content :global(ul), .talk-content :global(ol) { margin-bottom: 1.25rem; padding-left: 1.5rem; }
	.talk-content :global(ul) { list-style-type: disc; }
	.talk-content :global(ol) { list-style-type: decimal; }
	.talk-content :global(li) { margin-bottom: 0.5rem; }
	.talk-content :global(hr) { border-color: var(--color-border); margin: 2rem 0; }
	.talk-content :global(blockquote) { border-left: 4px solid var(--color-accent); padding-left: 1rem; color: var(--color-muted); font-style: italic; margin-bottom: 1.25rem; }
</style>
