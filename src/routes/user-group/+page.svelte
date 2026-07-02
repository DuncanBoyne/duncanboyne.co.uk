<script lang="ts">
	import { Calendar, MapPin, Users, Clock, Sparkles, ExternalLink, Pizza, Mic, ArrowUpRight } from 'lucide-svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';

	const meetingInfo = [
		{ icon: Clock, title: 'First Thursday', description: 'Of most months, 6:15 PM - 8:45 PM' },
		{ icon: MapPin, title: 'Townshend House', description: '30 Crown Rd, Norwich NR1 3DT' },
		{ icon: Users, title: 'Free to Attend', description: 'All skill levels welcome' }
	];

	const benefits = [
		{
			icon: Users,
			title: 'Network',
			description: 'Connect with local Power Platform professionals and enthusiasts'
		},
		{
			icon: Calendar,
			title: 'Learn',
			description: 'Attend sessions from experienced speakers and practitioners'
		},
		{
			icon: Sparkles,
			title: 'Grow',
			description: 'Develop your skills and advance your career'
		},
		{
			icon: Pizza,
			title: 'Free Pizza',
			description: 'Because good community deserves good food'
		}
	];

	const expect = [
		{ title: 'Presentations & Demos', description: 'Learn from community members and guest speakers sharing real-world experiences with Power BI, Power Apps, Power Automate, and more.' },
		{ title: 'Networking', description: "Connect with other professionals in a relaxed, friendly environment. Whether you're looking for advice, collaboration, or just good conversation." },
		{ title: 'Q&A Sessions', description: 'Bring your questions and challenges. Our community is always happy to help troubleshoot and share solutions.' },
		{ title: 'Welcoming Atmosphere', description: "Whether you're a complete beginner or an MVP, everyone is welcome. No question is too basic, no topic too advanced." }
	];

	const topics = [
		'Power Apps',
		'Power Automate',
		'Power BI',
		'Power Pages',
		'Copilot Studio',
		'Dynamics 365',
		'Dataverse',
		'AI & Azure',
		'Career Development'
	];
</script>

<svelte:head>
	<title>Norfolk Power Platform User Group - Duncan Boyne</title>
	<meta name="description" content="The Norfolk Power Platform User Group - a community founded by Duncan Boyne for Power Platform enthusiasts in Norwich and the surrounding area." />
</svelte:head>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream ug-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ug-hero-disc"></span>
		<span class="b-shape ug-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow"><Sparkles class="ico" aria-hidden="true" /> Founded by Duncan Boyne</p>
		<img src="/nppug-logo.png" alt="Norfolk Power Platform User Group" class="ug-logo" />
		<h1 class="page-title">Norfolk Power<br>Platform<br><span class="accent-line">User Group</span></h1>
		<p class="page-sub">Bringing together Power Platform enthusiasts in Norwich and the surrounding area for learning, networking, and community.</p>
		<div class="hero-actions">
			<a href="https://www.nppug.co.uk/" target="_blank" rel="noopener noreferrer" class="btn-inv">
				Visit nppug.co.uk<span class="sr-only"> (opens in new window)</span> <ExternalLink class="ico" aria-hidden="true" />
			</a>
			<a href="https://www.linkedin.com/company/norfolk-power-platform-user-group/" target="_blank" rel="noopener noreferrer" class="btn-ghost">
				<Linkedin class="w-4 h-4" aria-hidden="true" /> Follow on LinkedIn<span class="sr-only"> (opens in new window)</span>
			</a>
			<a href="https://sessionize.com/norfolk-power-platform-user-group-IP/" target="_blank" rel="noopener noreferrer" class="btn-ghost">
				<Mic class="w-4 h-4" aria-hidden="true" /> Submit a Session<span class="sr-only"> (opens in new window)</span>
			</a>
		</div>
	</div>
</section>

<!-- ══ MEETING INFO — gold field ═══════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape ug-meet-bar"></span>
	</div>
	<div class="wrap">
		<h2 class="phead-title meet-title">When &amp;<br>Where We Meet</h2>
		<ul class="icon-grid ug-meet-grid">
			{#each meetingInfo as { icon: Icon, title, description }}
				<li class="icon-card">
					<Icon class="icon-card-icon" aria-hidden="true" />
					<h3 class="icon-card-title">{title}</h3>
					<p class="icon-card-desc">{description}</p>
				</li>
			{/each}
		</ul>
		<p class="meet-note">
			Check out the calendar on <a href="https://www.nppug.co.uk/" target="_blank" rel="noopener noreferrer">nppug.co.uk<span class="sr-only"> (opens in new window)</span></a> for up-to-date news and event dates.
		</p>
	</div>
</section>

<!-- ══ WHY I FOUNDED IT — cream field ══════════════════════════════════ -->
<section class="band band--cream">
	<div class="wrap">
		<h2 class="phead-title">Why I Founded<br>the User Group</h2>
		<div class="prose-block">
			<p>When I started working with the Power Platform, I quickly realised how powerful it was - but also how isolating it could feel. Most of the community events and meetups were happening in London or other major cities, leaving those of us in Norfolk disconnected from the wider ecosystem.</p>
			<p>I founded the Norfolk Power Platform User Group to change that. I wanted to create a space where local professionals could come together, share knowledge, and support each other's growth - without having to travel hours to do it.</p>
			<p>What started as a small gathering has grown into a thriving community. Every month, we bring together developers, consultants, business analysts, and curious newcomers who all share one thing: a passion for what the Power Platform can do.</p>
		</div>
	</div>
</section>

<!-- ══ TOPICS WE COVER — surface field ══════════════════════════════════ -->
<section class="band band--surface">
	<div class="wrap">
		<h2 class="phead-title topics-title">What We<br>Cover</h2>
		<div class="tag-list">
			{#each topics as topic}
				<span class="tag">{topic}</span>
			{/each}
		</div>
	</div>
</section>

<!-- ══ WHY JOIN US — inverse field ══════════════════════════════════════ -->
<section class="band band--inverse">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ug-join-disc"></span>
	</div>
	<div class="wrap">
		<h2 class="phead-title join-title">Why<br>Join Us?</h2>
		<ul class="icon-grid">
			{#each benefits as { icon: Icon, title, description }}
				<li class="icon-card">
					<Icon class="icon-card-icon" aria-hidden="true" />
					<h3 class="icon-card-title">{title}</h3>
					<p class="icon-card-desc">{description}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ WHAT TO EXPECT — cream field ═════════════════════════════════════ -->
<section class="band band--cream">
	<div class="wrap">
		<h2 class="phead-title expect-title">What to<br>Expect</h2>
		<ul class="expect-list">
			{#each expect as item}
				<li class="expect-item">
					<span class="expect-marker" aria-hidden="true"></span>
					<span><strong>{item.title}</strong> — {item.description}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ug-cta-disc"></span>
		<span class="b-shape ug-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Join our next meetup</p>
		<a href="https://www.nppug.co.uk/" target="_blank" rel="noopener noreferrer" class="cta-main">
			Visit nppug.co.uk<span class="sr-only"> (opens in new window)</span> <ArrowUpRight class="cta-ico" />
		</a>
		<p class="cta-sub">
			Follow <a href="https://www.linkedin.com/company/norfolk-power-platform-user-group/" target="_blank" rel="noopener noreferrer">LinkedIn<span class="sr-only"> (opens in new window)</span></a> to stay updated, or submit a session via <a href="https://sessionize.com/norfolk-power-platform-user-group-IP/" target="_blank" rel="noopener noreferrer">Sessionize<span class="sr-only"> (opens in new window)</span></a>.
		</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, icon-grid,
	   buttons, and the CTA pattern live in app.css (Bauhaus poster kit).
	   This block keeps only what's specific to User Group's own layout
	   and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.ug-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.ug-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.ug-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow {
		display: inline-flex; align-items: center; gap: 0.4rem;
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--color-accent); margin: 0 0 1.25rem;
	}
	.ug-logo { width: 8rem; height: auto; display: block; margin: 0 0 1.5rem; }
	.page-title { font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 56ch; margin: 0; }
	.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }

	/* ══ MEETING INFO ═══════════════════════════════════════════════ */
	.ug-meet-bar { width: clamp(5rem, 14vw, 11rem); height: 0.85rem; background: var(--color-on-accent); top: 0; right: 0; opacity: 0.5; }
	.meet-title { margin: 0 0 clamp(2rem, 4vw, 3rem); }
	.ug-meet-grid { grid-template-columns: repeat(3, 1fr); }
	@media (max-width: 720px) { .ug-meet-grid { grid-template-columns: 1fr; } }
	.meet-note { font-size: 0.9rem; color: var(--fg); opacity: 0.75; margin: clamp(1.5rem, 3vw, 2rem) 0 0; }
	.meet-note a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }

	/* ══ WHY FOUNDED ════════════════════════════════════════════════ */
	.prose-block { display: flex; flex-direction: column; gap: 1.1rem; max-width: 68ch; margin-top: clamp(1.5rem, 3vw, 2.25rem); }
	.prose-block p { font-size: 1rem; line-height: 1.8; color: var(--fg-muted); margin: 0; text-wrap: pretty; }

	/* ══ TOPICS ═════════════════════════════════════════════════════ */
	.topics-title { margin: 0 0 clamp(1.5rem, 3vw, 2.25rem); }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.85rem; border: 1.5px solid var(--rule-soft); color: var(--fg); transition: border-color 0.2s, color 0.2s; }
	.tag:hover { border-color: var(--field-accent); color: var(--field-accent); }

	/* ══ WHY JOIN US ════════════════════════════════════════════════ */
	.ug-join-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-bauhaus); opacity: 0.85;
		bottom: clamp(-9rem, -12vw, -5rem); right: clamp(-8rem, -9vw, -4rem);
	}
	.join-title { margin: 0 0 clamp(2rem, 4vw, 3rem); }

	/* ══ WHAT TO EXPECT ═════════════════════════════════════════════ */
	.expect-title { margin: 0 0 clamp(1.5rem, 3vw, 2.25rem); }
	.expect-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--rule-strong); max-width: 72ch; }
	.expect-item { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1.1rem 0; border-bottom: 1.5px solid var(--rule-soft); font-size: 0.95rem; line-height: 1.7; color: var(--fg-muted); }
	.expect-marker { width: 0.6rem; height: 0.6rem; flex-shrink: 0; margin-top: 0.5rem; background: var(--field-accent); }
	.expect-item strong { color: var(--fg); font-weight: 800; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.ug-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.ug-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
