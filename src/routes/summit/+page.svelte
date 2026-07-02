<script lang="ts">
	import { Calendar, MapPin, Users, Target, Sparkles, ExternalLink, ArrowUpRight } from 'lucide-svelte';
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

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream sm-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sm-hero-disc"></span>
		<span class="b-shape sm-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow"><Sparkles class="ico" aria-hidden="true" /> Founded by Duncan Boyne</p>
		<h1 class="page-title">East of<br>England<br><span class="accent-line">Summit</span></h1>
		<p class="page-sub">A community-led Power Platform conference bringing together professionals, practitioners, and newcomers across the East of England — and beyond.</p>
		<div class="hero-actions">
			<a href="https://www.eoes.co.uk" target="_blank" rel="noopener noreferrer" class="btn-inv">
				Visit the 2027 Website<span class="sr-only"> (opens in new window)</span> <ExternalLink class="ico" aria-hidden="true" />
			</a>
			<a href="https://www.linkedin.com/company/eoes/" target="_blank" rel="noopener noreferrer" class="btn-ghost">
				<Linkedin class="w-4 h-4" aria-hidden="true" /> Follow on LinkedIn<span class="sr-only"> (opens in new window)</span>
			</a>
		</div>
	</div>
</section>

<!-- ══ 2027 HIGHLIGHTS — gold field ═══════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape sm-hl-bar"></span>
	</div>
	<div class="wrap">
		<ul class="icon-grid sm-hl-grid">
			{#each highlights2027 as { icon: Icon, title, description }}
				<li class="icon-card">
					<Icon class="icon-card-icon" aria-hidden="true" />
					<h3 class="icon-card-title">{title}</h3>
					<p class="icon-card-desc">{description}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ FORMAT — inverse field, day sequence ═══════════════════════════════ -->
<section class="band band--inverse">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sm-fmt-disc"></span>
	</div>
	<div class="wrap">
		<h2 class="phead-title format-title">What to Expect in 2027</h2>
		<div class="day-grid">
			<div class="day-card">
				<span class="day-num" aria-hidden="true">01</span>
				<p class="day-kicker">Friday 30 April</p>
				<h3 class="day-title">Workshops</h3>
				<p class="day-desc">Ticketed, small-group hands-on sessions with limited places. Get deep on the tools that matter most to you.</p>
			</div>
			<div class="day-card">
				<span class="day-num" aria-hidden="true">02</span>
				<p class="day-kicker">Saturday 1 May</p>
				<h3 class="day-title">Conference — Free</h3>
				<p class="day-desc">Parallel tracks, keynote, expo hall, and lunch included. Open to everyone at no cost.</p>
			</div>
		</div>
	</div>
</section>

<!-- ══ WHY I FOUNDED IT — cream field ══════════════════════════════════════ -->
<section class="band band--cream">
	<div class="wrap">
		<h2 class="phead-title">Why I<br>Founded It</h2>
		<div class="prose-block">
			<p>The East of England has an incredible community of Power Platform professionals, but we've never had a dedicated event to bring everyone together. I wanted to change that.</p>
			<p>After running the Norfolk Power Platform User Group and seeing the enthusiasm and talent in our region, I knew it was time to create something bigger — something that could unite professionals, inspire newcomers, and showcase what our community can achieve.</p>
			<p>You don't need to travel to London or Manchester to access world-class Power Platform content. We're bringing it to Norwich.</p>
		</div>
	</div>
</section>

<!-- ══ WHO IT'S FOR — surface field ════════════════════════════════════════ -->
<section class="band band--surface">
	<div class="wrap">
		<h2 class="phead-title who-title">Who Is<br>This For?</h2>
		<div class="tag-list">
			{#each audiences as audience}
				<span class="tag">{audience}</span>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 2026 RECAP — gold field ═════════════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sm-recap-disc"></span>
	</div>
	<div class="wrap">
		<p class="recap-kicker">2026 Edition — EoEPPS</p>
		<h2 class="phead-title recap-title">The First<br>One Happened</h2>
		<div class="prose-block">
			<p>The inaugural East of England Power Platform Summit took place in Norwich in May 2026 — two days of sessions, workshops, and community, completely free to attend. 31 sessions across 4 tracks, with speakers and attendees from across the UK.</p>
			<p>Thanks to our sponsors: GTP Tech Recruitment, Powercademy, Power Pages Mastery, Extra Life, Experts Live UK, Untethered 365, and Proximo3.</p>
		</div>
		<a href="https://www.eoepps.co.uk" target="_blank" rel="noopener noreferrer" class="phead-all recap-link">
			View the 2026 archive <ExternalLink class="ico" aria-hidden="true" />
		</a>
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sm-cta-disc"></span>
		<span class="b-shape sm-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Join us in 2027</p>
		<a href="https://www.eoes.co.uk" target="_blank" rel="noopener noreferrer" class="cta-main">
			Visit Official Website<span class="sr-only"> (opens in new window)</span> <ArrowUpRight class="cta-ico" />
		</a>
		<p class="cta-sub">
			30 April – 1 May 2027, Norwich. Follow <a href="https://www.linkedin.com/company/eoes/" target="_blank" rel="noopener noreferrer">the LinkedIn page<span class="sr-only"> (opens in new window)</span></a> for speaker calls, registration, and sponsorship announcements.
		</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, buttons, and
	   the CTA pattern live in app.css (Bauhaus poster kit). This block
	   keeps only what's specific to Summit's own layout and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.sm-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.sm-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.sm-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow {
		display: inline-flex; align-items: center; gap: 0.4rem;
		font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--color-accent); margin: 0 0 0.75rem;
	}
	.page-title { font-size: clamp(2.5rem, 8vw, 6.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 56ch; margin: 0; }
	.hero-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }

	/* ══ HIGHLIGHTS ═════════════════════════════════════════════════ */
	.sm-hl-bar { width: clamp(5rem, 14vw, 11rem); height: 0.85rem; background: var(--color-on-accent); top: 0; right: 0; opacity: 0.5; }
	.sm-hl-grid { grid-template-columns: repeat(4, 1fr); }
	@media (max-width: 720px) { .sm-hl-grid { grid-template-columns: repeat(2, 1fr); } }

	/* ══ FORMAT ═════════════════════════════════════════════════════ */
	.sm-fmt-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-bauhaus); opacity: 0.85;
		bottom: clamp(-9rem, -12vw, -5rem); right: clamp(-8rem, -9vw, -4rem);
	}
	.format-title { margin: 0 0 clamp(2rem, 4vw, 3rem); }
	.day-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5px; background: var(--rule-soft); border: 1.5px solid var(--rule-soft); }
	.day-card { background: var(--field-surface); padding: clamp(1.5rem, 3vw, 2.25rem); display: flex; flex-direction: column; }
	.day-num { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; line-height: 0.8; letter-spacing: -0.04em; color: var(--fg); opacity: 0.85; margin-bottom: 0.75rem; }
	.day-kicker { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--field-accent); margin: 0 0 0.4rem; }
	.day-title { font-size: clamp(1.15rem, 2.5vw, 1.5rem); font-weight: 800; color: var(--fg); margin: 0 0 0.6rem; }
	.day-desc { font-size: 0.9rem; line-height: 1.6; color: var(--fg-muted); margin: 0; }
	@media (max-width: 640px) { .day-grid { grid-template-columns: 1fr; } }

	/* ══ WHY FOUNDED / RECAP — shared prose ════════════════════════════ */
	.prose-block { display: flex; flex-direction: column; gap: 1.1rem; max-width: 68ch; margin-top: clamp(1.5rem, 3vw, 2.25rem); }
	.prose-block p { font-size: 1rem; line-height: 1.8; color: var(--fg-muted); margin: 0; text-wrap: pretty; }

	/* ══ WHO IT'S FOR ═══════════════════════════════════════════════ */
	.who-title { margin: 0 0 clamp(1.5rem, 3vw, 2.25rem); }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.85rem; border: 1.5px solid var(--rule-soft); color: var(--fg); }

	/* ══ 2026 RECAP ═════════════════════════════════════════════════ */
	.sm-recap-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.1;
		top: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -9vw, -4rem);
	}
	.recap-kicker { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg); opacity: 0.75; margin: 0 0 0.75rem; }
	.recap-title { margin: 0; }
	.recap-link { margin-top: clamp(1.5rem, 3vw, 2rem); font-size: 0.8rem; text-transform: uppercase; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.sm-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.sm-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
