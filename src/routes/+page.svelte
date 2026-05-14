<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ArrowRight, FileText, Calendar, Video, BarChart3, Zap, Database } from 'lucide-svelte';
	import Hero from '$lib/components/Hero.svelte';
	import LandingChart from '$lib/components/LandingChart.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';
	import { getPosts, getEvents, getVideos } from '$lib/supabase';
	import type { Post, Event, Video as VideoType } from '$lib/types';

	const whatIDo = [
		{ icon: BarChart3, title: 'Power BI & Data Visualisation', desc: 'Reports and dashboards people actually use — built around real decisions, not just data.' },
		{ icon: Zap,       title: 'Automation',                    desc: 'Killing the manual processes that eat your team\'s time and introduce errors.' },
		{ icon: Database,  title: 'AI Readiness',                  desc: 'Getting your data foundations right before AI gets involved — the work that makes it all possible.' }
	];

	// Scroll-triggered scale-in for individual cards
	function revealCard(node: HTMLElement) {
		node.style.opacity = '0';
		node.style.transform = 'scale(1.05) translateY(16px)';
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				node.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
				node.style.opacity = '1';
				node.style.transform = 'scale(1) translateY(0)';
				observer.disconnect();
			}
		}, { threshold: 0.15 });
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}

	// Dummy action so `use:revealSection` compiles (section itself doesn't need special treatment)
	function revealSection(_node: HTMLElement) {}

	let posts: Post[] = [];
	let events: Event[] = [];
	let videos: VideoType[] = [];
	let loading = true;
	let error: string | null = null;
	let showLanding = !localStorage.getItem('hasSeenLanding');

	onMount(async () => {
		if (showLanding) document.body.style.overflow = 'hidden';

		try {
			const [postsData, eventsData, videosData] = await Promise.all([
				getPosts(3),
				getEvents(true),
				getVideos(3)
			]);
			posts = postsData || [];
			events = (eventsData || []).slice(0, 2);
			videos = videosData || [];
		} catch (e) {
			error = 'Failed to load content. Please try again later.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});

	function handleEnter() {
		document.body.style.overflow = '';
		localStorage.setItem('hasSeenLanding', 'true');
		showLanding = false;
	}
</script>

<svelte:head>
	<title>Duncan Boyne - Power BI Consultant</title>
	<meta name="description" content="Duncan Boyne is a Power BI Consultant helping organizations transform data into actionable insights." />
</svelte:head>

{#if showLanding}
	<LandingChart on:enter={handleEnter} />
{/if}

<Hero />

<!-- What I Do -->
<section class="py-16 bg-bg" use:revealSection>
	<div class="container-custom">
		<div class="flex items-center justify-between mb-8">
			<h2 class="text-2xl font-bold text-text">What I Do</h2>
			<a href="/services" class="inline-flex items-center text-accent font-medium hover:underline group">
				Work With Me
				<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
			</a>
		</div>
		<div class="grid md:grid-cols-3 gap-6">
			{#each whatIDo as item, i}
				<a
					href="/services"
					class="card p-6 block no-underline scale-card hover:border-accent/50"
					style="transition-delay: {i * 100}ms"
					use:revealCard
				>
					<div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
						<svelte:component this={item.icon} class="w-6 h-6 text-accent" aria-hidden="true" />
					</div>
					<h3 class="font-semibold text-text mb-2">{item.title}</h3>
					<p class="text-sm text-muted">{item.desc}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Latest Blog Posts -->
<section class="py-16 bg-surface">
	<div class="container-custom">
		<div class="flex items-center justify-between mb-8">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-accent/10 rounded-lg">
					<FileText class="w-5 h-5 text-accent" aria-hidden="true" />
				</div>
				<h2 class="text-2xl font-bold text-text">Latest Posts</h2>
			</div>
			<a href="/blog" class="inline-flex items-center text-accent font-medium hover:underline group">
				Explore Blog
				<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
			</a>
		</div>

		{#if loading}
			<div role="status" aria-label="Loading blog posts" class="grid md:grid-cols-3 gap-6">
				{#each [1, 2, 3] as _}
					<div class="card animate-pulse">
						<div class="aspect-video bg-border" style="min-height: 180px" />
						<div class="p-5 space-y-3" style="min-height: 120px">
							<div class="h-4 bg-border rounded w-1/3" />
							<div class="h-5 bg-border rounded" />
							<div class="h-4 bg-border rounded w-2/3" />
							<div class="h-4 bg-border rounded w-1/2" />
						</div>
					</div>
				{/each}
			</div>
		{:else if error}
			<p class="text-center text-muted py-8">{error}</p>
		{:else if posts.length === 0}
			<div class="text-center py-12 bg-bg rounded-xl border border-border">
				<FileText class="w-12 h-12 text-muted/50 mx-auto mb-4" aria-hidden="true" />
				<p class="text-muted">No posts yet. Check back soon!</p>
			</div>
		{:else}
			<div class="grid {posts.length < 3 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 grid-equal-height">
				{#each posts as post}
					<BlogCard {post} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Upcoming Events -->
<section class="py-16 bg-bg">
	<div class="container-custom">
		<div class="flex items-center justify-between mb-8">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-accent/10 rounded-lg">
					<Calendar class="w-5 h-5 text-accent" aria-hidden="true" />
				</div>
				<h2 class="text-2xl font-bold text-text">Upcoming Events</h2>
			</div>
			<a href="/events" class="inline-flex items-center text-accent font-medium hover:underline group">
				View All Events
				<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
			</a>
		</div>

		{#if loading}
			<div role="status" aria-label="Loading events" class="grid md:grid-cols-2 gap-6">
				{#each [1, 2] as _}
					<div class="card animate-pulse p-5 space-y-3" style="min-height: 140px">
						<div class="h-6 bg-border rounded w-1/4" />
						<div class="h-5 bg-border rounded w-3/4" />
						<div class="h-4 bg-border rounded" />
						<div class="h-4 bg-border rounded w-1/2" />
						<div class="h-4 bg-border rounded w-2/3" />
					</div>
				{/each}
			</div>
		{:else if events.length === 0}
			<div class="text-center py-12 bg-surface rounded-xl border border-border">
				<Calendar class="w-12 h-12 text-muted/50 mx-auto mb-4" aria-hidden="true" />
				<p class="text-muted">No upcoming events at the moment.</p>
				<p class="text-muted/70 text-sm mt-1">Check back soon!</p>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 gap-6 grid-equal-height">
				{#each events as event}
					<EventCard {event} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Recent Videos -->
<section class="py-16 bg-surface">
	<div class="container-custom">
		<div class="flex items-center justify-between mb-8">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-accent/10 rounded-lg">
					<Video class="w-5 h-5 text-accent" aria-hidden="true" />
				</div>
				<h2 class="text-2xl font-bold text-text">Recent Videos</h2>
			</div>
			<a href="/videos" class="inline-flex items-center text-accent font-medium hover:underline group">
				View All Videos
				<ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
			</a>
		</div>

		{#if loading}
			<div role="status" aria-label="Loading videos" class="grid md:grid-cols-3 gap-6">
				{#each [1, 2, 3] as _}
					<div class="card animate-pulse">
						<div class="aspect-video bg-border" style="min-height: 180px" />
						<div class="p-5 space-y-3" style="min-height: 80px">
							<div class="h-4 bg-border rounded w-1/3" />
							<div class="h-5 bg-border rounded" />
							<div class="h-4 bg-border rounded w-2/3" />
						</div>
					</div>
				{/each}
			</div>
		{:else if videos.length === 0}
			<div class="text-center py-12 bg-bg rounded-xl border border-border">
				<Video class="w-12 h-12 text-muted/50 mx-auto mb-4" aria-hidden="true" />
				<p class="text-muted">No videos yet. Check back soon!</p>
			</div>
		{:else}
			<div class="grid md:grid-cols-3 gap-6 grid-equal-height">
				{#each videos as video}
					<VideoCard {video} />
				{/each}
			</div>
		{/if}
	</div>
</section>
