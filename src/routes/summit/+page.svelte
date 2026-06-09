<script lang="ts">
	import { Calendar, MapPin, Users, Target, Sparkles, ExternalLink } from 'lucide-svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';

	const audiences = [
		'Business Leaders',
		'Career Switchers',
		'Students',
		'End Users',
		'Citizen Developers',
		'Technical Professionals'
	];

	const highlights2027 = [
		{
			icon: Calendar,
			title: '2-Day Event',
			description: '30 Apr – 1 May 2027'
		},
		{
			icon: MapPin,
			title: 'Norwich',
			description: 'East of England, UK'
		},
		{
			icon: Users,
			title: 'Free on Day 2',
			description: 'Conference day is free to attend'
		},
		{
			icon: Target,
			title: 'All Skill Levels',
			description: 'From beginners to pros'
		}
	];
</script>

<svelte:head>
	<title>East of England Summit - Duncan Boyne</title>
	<meta name="description" content="The East of England Summit — a free, community-focused Power Platform conference founded by Duncan Boyne, bringing together Power Platform enthusiasts in Norwich." />
</svelte:head>

<section class="py-16">
	<div class="container-custom">

		<!-- Header -->
		<div class="max-w-4xl mx-auto text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
				<Sparkles class="w-4 h-4" aria-hidden="true" />
				Founded by Duncan Boyne
			</div>
			<h1 class="text-4xl md:text-5xl font-bold text-text mb-4">
				East of England Summit
			</h1>
			<p class="text-xl text-muted mb-8">
				A community-led Power Platform conference bringing together professionals, practitioners, and newcomers across the East of England — and beyond.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://www.eoes.co.uk"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary"
				>
					Visit the 2027 Website
					<span class="sr-only"> (opens in new window)</span>
					<ExternalLink class="w-4 h-4 ml-2" aria-hidden="true" />
				</a>
				<a
					href="https://www.linkedin.com/company/eoes/"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-secondary"
				>
					<Linkedin class="w-4 h-4 mr-2" aria-hidden="true" />
					Follow on LinkedIn
					<span class="sr-only"> (opens in new window)</span>
				</a>
			</div>
		</div>

		<!-- 2027 Highlights -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
			{#each highlights2027 as { icon: Icon, title, description }}
				<div class="card p-6 text-center">
					<div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
						<Icon class="w-6 h-6 text-accent" aria-hidden="true" />
					</div>
					<h3 class="font-semibold text-text mb-1">{title}</h3>
					<p class="text-sm text-muted">{description}</p>
				</div>
			{/each}
		</div>

		<!-- 2027 Format -->
		<div class="max-w-4xl mx-auto mb-16">
			<h2 class="text-2xl font-bold text-text text-center mb-8">What to Expect in 2027</h2>
			<div class="grid md:grid-cols-2 gap-6">
				<div class="card p-6">
					<p class="text-xs font-bold uppercase tracking-widest text-accent mb-2">Day 1 — Friday 30 April</p>
					<h3 class="font-semibold text-text mb-2">Workshops</h3>
					<p class="text-sm text-muted">Ticketed, small-group hands-on sessions with limited places. Get deep on the tools that matter most to you.</p>
				</div>
				<div class="card p-6">
					<p class="text-xs font-bold uppercase tracking-widest text-accent mb-2">Day 2 — Saturday 1 May</p>
					<h3 class="font-semibold text-text mb-2">Conference — Free</h3>
					<p class="text-sm text-muted">Parallel tracks, keynote, expo hall, and lunch included. Open to everyone at no cost.</p>
				</div>
			</div>
		</div>

		<!-- Why I Founded It -->
		<div class="max-w-4xl mx-auto mb-16">
			<div class="card p-8 md:p-10">
				<h2 class="text-2xl font-bold text-text mb-6">Why I Founded It</h2>
				<div class="space-y-4 text-muted">
					<p>
						The East of England has an incredible community of Power Platform professionals, but we've never had a dedicated event to bring everyone together. I wanted to change that.
					</p>
					<p>
						After running the Norfolk Power Platform User Group and seeing the enthusiasm and talent in our region, I knew it was time to create something bigger — something that could unite professionals, inspire newcomers, and showcase what our community can achieve.
					</p>
					<p>
						You don't need to travel to London or Manchester to access world-class Power Platform content. We're bringing it to Norwich.
					</p>
				</div>
			</div>
		</div>

		<!-- Who It's For -->
		<div class="max-w-4xl mx-auto mb-16">
			<h2 class="text-2xl font-bold text-text text-center mb-8">Who Is This For?</h2>
			<div class="flex flex-wrap justify-center gap-3">
				{#each audiences as audience}
					<span class="px-4 py-2 bg-surface border border-border text-muted rounded-lg text-sm font-medium">
						{audience}
					</span>
				{/each}
			</div>
		</div>

		<!-- 2026 Recap -->
		<div class="max-w-4xl mx-auto mb-16">
			<div class="card p-8 md:p-10">
				<p class="text-xs font-bold uppercase tracking-widest text-accent mb-4">2026 Edition — EoEPPS</p>
				<h2 class="text-2xl font-bold text-text mb-4">The First One Happened</h2>
				<div class="space-y-4 text-muted">
					<p>
						The inaugural East of England Power Platform Summit took place in Norwich in May 2026 — two days of sessions, workshops, and community, completely free to attend. 31 sessions across 4 tracks, with speakers and attendees from across the UK.
					</p>
					<p>
						Thanks to our sponsors: GTP Tech Recruitment, Powercademy, Power Pages Mastery, Extra Life, Experts Live UK, Untethered 365, and Proximo3.
					</p>
				</div>
				<a
					href="https://www.eoepps.co.uk"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-wider text-accent hover:underline"
				>
					View the 2026 archive <ExternalLink class="w-3.5 h-3.5" aria-hidden="true" />
				</a>
			</div>
		</div>

		<!-- CTA -->
		<div class="max-w-4xl mx-auto">
			<div class="card p-8 text-center bg-gradient-to-br from-accent/5 to-accent2/5 border-accent/20">
				<Sparkles class="w-12 h-12 text-accent mx-auto mb-4" aria-hidden="true" />
				<h2 class="text-2xl font-bold text-text mb-2">Join Us in 2027</h2>
				<p class="text-muted mb-6 max-w-xl mx-auto">
					30 April – 1 May 2027, Norwich. Follow the LinkedIn page for speaker calls, registration, and sponsorship announcements.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="https://www.eoes.co.uk"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary"
					>
						Visit Official Website
						<span class="sr-only"> (opens in new window)</span>
						<ExternalLink class="w-4 h-4 ml-2" aria-hidden="true" />
					</a>
					<a
						href="https://www.linkedin.com/company/eoes/"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-secondary"
					>
						<Linkedin class="w-4 h-4 mr-2" aria-hidden="true" />
						Follow on LinkedIn
						<span class="sr-only"> (opens in new window)</span>
					</a>
				</div>
			</div>
		</div>

	</div>
</section>
