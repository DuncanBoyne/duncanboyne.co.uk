<script lang="ts">
	import { Github, Linkedin, Youtube, ArrowUpRight, ExternalLink } from 'lucide-svelte';

	const social = [
		{ href: 'https://github.com/DuncanBoyneJnr', icon: Github, label: 'GitHub', handle: '@DuncanBoyneJnr' },
		{ href: 'https://linkedin.com/in/duncanboyne', icon: Linkedin, label: 'LinkedIn', handle: 'in/duncanboyne' },
		{ href: 'https://youtube.com/@PowerBIKindaGuy', icon: Youtube, label: 'YouTube', handle: '@PowerBIKindaGuy' }
	];

	const skills = [
		'Microsoft Power BI', 'DAX & Power Query', 'SQL',
		'Power Apps', 'Power Automate', 'Dataverse',
		'Dynamics 365', 'Epicor', 'InFor', 'Sage',
		'Data Modeling', 'Financial Reporting',
		'Manufacturing KPIs', 'Dashboard Design', 'AI Readiness'
	];
</script>

<svelte:head>
	<title>About — Duncan Boyne</title>
	<meta name="description" content="Power BI consultant, international speaker, founder of the Norfolk Power Platform User Group and the East of England Power Platform Summit." />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">The Human Behind the Dashboards</p>
		<h1 class="page-title">About<br><span class="accent-line">Me</span></h1>
	</div>
</section>

<!-- Bio -->
<section class="bio-section">
	<div class="wrap">
		<div class="bio-grid">
			<!-- Portrait col -->
			<div class="portrait-col">
				<div class="portrait-wrap">
					<div class="portrait-accent"></div>
					<img src="/headshot.png" alt="Duncan Boyne" class="portrait-img" />
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
				<p class="bio-lede">Most dashboards don't fail because the data is wrong. They fail because nobody wants to open them. I spend my time trying to fix that.</p>

				<div class="bio-body">
					<p>Professionally, I live with Power BI and the Microsoft Power Platform, turning messy data, vague requirements, and "technically correct" dashboards into things people actually use. I sit in the awkward middle between business and tech — translating what someone meant into something usable, human, and honest. (It's less glamorous than it sounds, and far more satisfying.)</p>
					<p>I'm a 90s kid who still adores Pokemon, raised on a Game Boy and the original PlayStation, and I never really stopped being a gamer. Games were my first lesson in systems, feedback loops, and why good design matters — I just didn't have the words for it yet.</p>
					<p>I'm a dad to two brilliant young humans, 11 and 8, who remind me daily that curiosity beats confidence and that "why?" is usually the most important question in the room. The household is rounded out by Bella, a wonderfully scatty three-year-old Border Collie with no respect for meetings, deadlines, or personal space.</p>
					<p>I'm AuDHD and proud. It shapes how I think, how I work, and how I show up: it's why I can hyperfocus on a problem until it clicks, why accessibility and inclusion aren't optional to me, and why I believe clarity is kindness — especially in data and design.</p>
					<p>Community is a huge part of my life. I founded the Norfolk Power Platform User Group and the East of England Power Platform Summit. EoEPPS is very much my baby — built from the ground up to be welcoming, practical, and human. Kids were welcome. Partners were welcome. Even a dog was welcome.</p>
					<p>I write, speak, and build in public — sometimes deep Power BI, sometimes design, accessibility, or ethics. I'll always pick clarity and usefulness over polish. Perfect helps nobody. Useful helps someone today.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Skills -->
<section class="skills-section">
	<div class="wrap">
		<p class="section-label">Skills &amp; Expertise</p>
		<div class="tag-list">
			{#each skills as skill}
				<span class="tag">{skill}</span>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Want me at your event?</p>
		<a href="https://sessionize.com/duncan-boyne" target="_blank" rel="noopener noreferrer" class="cta-main">
			Sessionize <ExternalLink class="cta-ico" />
		</a>
		<p class="cta-sub">Browse my sessions and speaker profile, or skip the middleman and <a href="/contact" class="cta-inline-link">get in touch directly</a>.</p>
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
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0; }
	.accent-line { color: var(--color-accent); }

	/* Bio */
	.bio-section { padding: clamp(3rem, 6vw, 5rem) 0; border-bottom: 1px solid var(--color-border); }
	.bio-grid { display: grid; gap: 3rem; }
	@media (min-width: 768px) { .bio-grid { grid-template-columns: 280px 1fr; gap: 5rem; } }

	/* Portrait */
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
		border-bottom: 1px solid var(--color-border); text-decoration: none;
		color: var(--color-muted); transition: color 0.3s;
		font-size: 0.78rem; font-weight: 600;
	}
	.social-row:hover { color: var(--color-accent); }
	.social-handle { flex: 1; }
	.social-arrow { opacity: 0; transition: opacity 0.3s; }
	.social-row:hover .social-arrow { opacity: 1; }

	/* Bio text */
	.bio-col {}
	.bio-lede {
		font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700; line-height: 1.5;
		color: var(--color-text); margin: 0 0 2rem;
		border-left: 3px solid var(--color-accent); padding-left: 1.25rem;
	}
	.bio-body { display: flex; flex-direction: column; gap: 1.25rem; }
	.bio-body p { font-size: 1rem; line-height: 1.8; color: var(--color-muted); margin: 0; }

	/* Skills */
	.skills-section { padding: clamp(3rem, 6vw, 5rem) 0; border-bottom: 1px solid var(--color-border); }
	.section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 1.5rem; }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 600; padding: 0.35rem 0.75rem; border: 1.5px solid var(--color-border); color: var(--color-muted); }

	/* CTA */
	.cta-block { padding: clamp(5rem, 10vw, 9rem) 0; }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2rem, 6vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(1.5rem, 4vw, 3rem); height: clamp(1.5rem, 4vw, 3rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }
	.cta-inline-link { color: var(--color-accent); text-decoration: underline; }
</style>
