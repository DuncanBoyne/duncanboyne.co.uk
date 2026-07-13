<script lang="ts">
	import { ArrowUpRight, ExternalLink } from 'lucide-svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Youtube from '$lib/components/icons/Youtube.svelte';
	import Seo from '$lib/components/Seo.svelte';

	const social = [
		{ href: 'https://github.com/DuncanBoyne', icon: Github, label: 'GitHub', handle: '@DuncanBoyne' },
		{ href: 'https://linkedin.com/in/duncanboyne', icon: Linkedin, label: 'LinkedIn', handle: 'in/duncanboyne' },
		{ href: 'https://www.youtube.com/@PowerBIButWhy', icon: Youtube, label: 'YouTube', handle: '@PowerBIButWhy' },
		{ href: 'https://www.youtube.com/@TheAIStrategyPlaybook', icon: Youtube, label: 'YouTube', handle: '@TheAIStrategyPlaybook' }
	];

	const skills = [
		'Microsoft Power BI', 'DAX & Power Query', 'SQL',
		'Power Apps', 'Power Automate', 'Dataverse',
		'Dynamics 365', 'Epicor', 'InFor', 'Sage',
		'Data Modeling', 'Financial Reporting',
		'Manufacturing KPIs', 'Dashboard Design', 'AI Readiness'
	];
</script>

<Seo
	title="About Duncan Boyne | Power BI & Data Consultant, Norfolk"
	description="AI / BI storyteller and Power BI consultant in Norfolk, working across Norwich and Great Yarmouth. International speaker and founder of the Norfolk Power Platform User Group and the East of England Power Platform Summit."
	path="/about"
	type="profile"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream about-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ab-hero-disc"></span>
		<span class="b-shape ab-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<h1 class="page-title">About<br><span class="accent-line">Me</span></h1>
	</div>
</section>

<!-- ══ 01 THE STORY — surface field ════════════════════════════════════ -->
<section class="band band--surface">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ab-bio-disc"></span>
	</div>
	<div class="wrap">
		<header class="phead">
			<span class="phead-index" aria-hidden="true">01</span>
			<div class="phead-main">
				<h2 class="phead-title">The<br>Story</h2>
			</div>
		</header>

		<div class="bio-grid">
			<!-- Portrait col -->
			<div class="portrait-col">
				<div class="portrait-wrap">
					<div class="portrait-accent"></div>
					<img src="/headshot.webp" alt="Duncan Boyne" class="portrait-img" width="660" height="702" fetchpriority="high" />
				</div>
				<div class="social-links">
					{#each social as { href, icon: Icon, label, handle }}
						<a {href} target="_blank" rel="noopener noreferrer" class="social-row" aria-label="{label} {handle}">
							<Icon class="w-4 h-4" aria-hidden="true" />
							<span class="social-handle">{handle}</span>
							<ArrowUpRight class="social-arrow w-3 h-3" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Text col -->
			<div class="bio-col">
				<p class="bio-lede">A dashboard nobody opens is just an expensive screenshot. I spend my days making sure people actually open them.</p>

				<!-- Work story -->
				<div class="bio-chapter">
					<p>Your data has a story. Most people bury it under charts nobody reads. I dig it out and tell it properly. That's the job, whether I'm doing it with Power BI or with AI on top. I've spent years as a Power BI consultant, living in messy data, vague requirements, and "technically correct" dashboards, turning all of it into things people actually use. These days I'm leaning harder into the AI side, because AI is only as good as the data you point it at, and the data is exactly where I've always lived. (Less glamorous than it sounds. Far more satisfying.)</p>
				</div>

				<!-- How I work -->
				<div class="bio-chapter">
					<p class="bio-philosophy">Clarity is kindness. Especially in data and design.</p>
					<p>I'm AuDHD and proud. It shapes how I think, how I work, and how I show up: it's why I can hyperfocus on a problem until it clicks, why accessibility and inclusion aren't optional to me, and why I'd rather give you something useful today than something perfect never.</p>
				</div>

				<!-- Human story -->
				<div class="bio-chapter">
					<p>I'm a 90s kid who still adores Pokémon, raised on a Game Boy and the original PlayStation, and I never really stopped being a gamer. Games were my first lesson in systems, feedback loops, and why good design matters. I just didn't have the words for it yet.</p>
					<p>I'm a dad to two brilliant young humans, 11 and 8, who remind me daily that curiosity beats confidence and that "why?" is usually the most important question in the room. The household is rounded out by Bella, a wonderfully scatty three-year-old Border Collie with no respect for meetings, deadlines, or personal space.</p>
				</div>

				<!-- Community story -->
				<div class="bio-chapter">
					<p>Community is a huge part of my life. I founded the Norfolk Power Platform User Group and the East of England Power Platform Summit. EoEPPS is very much my baby, built from the ground up to be welcoming, practical, and human. Kids were welcome. Partners were welcome. Even a dog was welcome.</p>
					<p>I write, speak, and build in public. Sometimes deep Power BI, sometimes AI, sometimes design, accessibility, or ethics. Perfect helps nobody. Useful helps someone today.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══ 02 SKILLS — gold field ══════════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape ab-skills-bar"></span>
	</div>
	<div class="wrap">
		<header class="phead phead--right">
			<span class="phead-index" aria-hidden="true">02</span>
			<div class="phead-main">
				<h2 class="phead-title">Skills &amp;<br>Expertise</h2>
			</div>
		</header>
		<div class="tag-list">
			{#each skills as skill}
				<span class="tag">{skill}</span>
			{/each}
		</div>
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ab-cta-disc"></span>
		<span class="b-shape ab-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="https://sessionize.com/duncan-boyne" target="_blank" rel="noopener noreferrer" class="cta-main">
			Sessionize <ExternalLink class="cta-ico" />
		</a>
		<p class="cta-sub">Browse my sessions and speaker profile, or skip the middleman and <a href="/contact">get in touch directly</a>.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, buttons, and
	   the CTA pattern live in app.css (Bauhaus poster kit). This block
	   keeps only what's specific to About's own layout and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.about-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2rem, 4vw, 3rem); }
	.ab-hero-disc {
		width: clamp(16rem, 36vw, 32rem); height: clamp(16rem, 36vw, 32rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-10rem, -12vw, -5rem); right: clamp(-12rem, -12vw, -6rem);
	}
	.ab-hero-bar { width: clamp(5rem, 16vw, 12rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0; }
	.accent-line { color: var(--color-accent); }

	/* ══ 01 THE STORY ═══════════════════════════════════════════════ */
	.ab-bio-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -10vw, -4rem);
	}
	.bio-grid { display: grid; gap: 3rem; }
	@media (min-width: 768px) { .bio-grid { grid-template-columns: 280px 1fr; gap: 5rem; } }

	.portrait-col { display: none; }
	@media (min-width: 768px) { .portrait-col { display: flex; flex-direction: column; gap: 2rem; } }
	.portrait-wrap { position: relative; width: 100%; }
	.portrait-accent {
		position: absolute; top: -0.75rem; left: -0.75rem;
		width: 100%; height: 100%;
		background: var(--color-accent); z-index: 0;
	}
	.portrait-img { position: relative; z-index: 1; width: 100%; height: auto; display: block; object-fit: cover; }
	.social-links { display: flex; flex-direction: column; gap: 0.4rem; }
	.social-row {
		display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0;
		border-bottom: 1px solid var(--rule-soft); text-decoration: none;
		color: var(--fg-muted); transition: color 0.3s;
		font-size: 0.78rem; font-weight: 600;
	}
	.social-row:hover { color: var(--field-accent); }
	.social-handle { flex: 1; }
	.social-arrow { opacity: 0; transition: opacity 0.3s; }
	.social-row:hover .social-arrow { opacity: 1; }

	.bio-lede {
		font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700; line-height: 1.5;
		color: var(--fg); margin: 0 0 2.5rem;
		max-width: 60ch;
	}
	.bio-chapter {
		padding-top: 2rem;
		border-top: 1px solid var(--rule-soft);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.bio-chapter + .bio-chapter { margin-top: 0.25rem; }
	.bio-chapter p { font-size: 1rem; line-height: 1.8; color: var(--fg-muted); margin: 0; max-width: 68ch; text-wrap: pretty; }
	.bio-philosophy {
		font-size: clamp(1.15rem, 2.2vw, 1.5rem);
		font-weight: 700;
		line-height: 1.4;
		color: var(--fg) !important;
		letter-spacing: -0.01em;
	}

	/* ══ 02 SKILLS ══════════════════════════════════════════════════ */
	.ab-skills-bar { width: clamp(5rem, 14vw, 11rem); height: 0.8rem; background: var(--color-text); top: 0; right: 0; }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.85rem; border: 1.5px solid var(--rule-soft); color: var(--fg); }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.ab-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.ab-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
