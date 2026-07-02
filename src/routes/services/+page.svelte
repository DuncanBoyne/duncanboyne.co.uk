<script lang="ts">
	import { ArrowUpRight, CheckCircle } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';

	const services = [
		{
			number: '01',
			field: 'surface',
			title: 'Power BI &<br>Data Visualisation',
			tagline: 'Reports people actually open.',
			description: "Most dashboards tell you something happened. Good ones tell you what to do about it. Here's the thing nobody admits: a report that's technically correct and never opened is still a failure. I build the kind people open. Clear, fast, and shaped around the decisions your team is actually trying to make.",
			detail: "I work across the whole stack: data modelling, DAX, Power Query, visual design. And I know how to wrestle data out of the systems your business already runs on (the friendly ones and the ones that fight back).",
			bullets: [
				'Financial reporting: P&L, cash flow, variance analysis',
				'Manufacturing & operations KPIs',
				'ERP integration: Dynamics 365, Epicor, InFor, Sage',
				'Data modelling, DAX, Power Query',
				'Report design with accessibility in mind'
			]
		},
		{
			number: '02',
			field: 'inverse',
			title: 'Automation',
			tagline: 'Kill the spreadsheet shuffle.',
			description: "Copying data between systems. Chasing approvals over email. Rebuilding the same report every Monday morning. That's not work. That's tax, paid in your team's hours and the odd quiet error nobody catches until it's expensive.",
			detail: "I build Power Automate flows and connected workflows that take the dull, repeatable bits off your people's plates. The humans get to do the human stuff, and the machine handles the shuffling (it never gets bored, and it never fat-fingers a cell).",
			bullets: [
				'Power Automate flows and approvals',
				'Connecting ERP, CRM, and reporting systems',
				'Reducing copy-paste and manual data entry',
				'Alerting and exception handling',
				'Power Apps for lightweight data capture'
			]
		},
		{
			number: '03',
			field: 'gold',
			title: 'AI Readiness',
			tagline: 'Get the boring bit right before the clever bit.',
			description: "AI is only as good as the data underneath it. Point it at a mess and you don't get magic. You get a faster, more confident mess. So before the clever bit, the boring bit: data that's clean, connected, governed, and trustworthy.",
			detail: "I help teams see where the data quality gaps actually are, how the data really flows (not how the diagram says it flows), and what needs fixing first. Honest roadmaps, not vendor pitch decks. And a straight answer if the real advice is 'not yet'.",
			bullets: [
				'Data quality and governance assessment',
				'Understanding your current data landscape',
				'Identifying gaps before AI investment',
				'Practical roadmaps you can actually follow',
				'Finance and manufacturing data contexts'
			]
		}
	];

	const industries = ['Financial Services', 'Manufacturing', 'Distribution & Logistics', 'Professional Services', 'SME & Mid-Market'];
	const erp = ['Dynamics 365', 'Epicor', 'InFor', 'Sage'];

	// Trust signals — real, honest figures. Feed the "Evidence" and "Trust" GEO levers.
	const stats = [
		{ value: '10 yrs', label: 'in Power BI (12 in data & IT)' },
		{ value: '70+', label: 'organisations helped' },
		{ value: '250+', label: 'projects delivered' },
		{ value: '20+', label: 'talks across 3 countries' }
	];

	// Anonymised client outcomes — scannable, number-led, LLM-liftable.
	const results = [
		{ metric: '~£100k', text: 'saved for a business by fixing historical data-storage and auditing problems.' },
		{ metric: '15% → 1–2%', text: 'cut a manufacturer’s potential product refunds by delivering their ISO reporting and surfacing a hidden flaw in stock control.' },
		{ metric: 'Post-ERP', text: 'rebuilt a multi-site group’s reporting after an ERP migration, so leadership had trustworthy numbers again.' },
		{ metric: 'Bespoke', text: 'designed and built a store- and manager-ranking system for a national retailer.' },
		{ metric: 'Zero chasing', text: 'automated contract-renewal reporting plus Teams + email automation for invoice chasing.' }
	];

	// A few of the same questions LLMs get asked, answered on-page and linked to the full FAQ.
	const faqTeasers = [
		{ q: 'Do you take on freelance or fractional work?', a: 'Yes — either fixed-scope projects or ongoing on-call Power BI support, remote or on-site in Norfolk.' },
		{ q: 'Do you work remotely?', a: 'Power BI work is delivered remotely across the UK. On-site days are easy across Norfolk, Norwich and Great Yarmouth.' },
		{ q: 'How much does a project cost?', a: 'Quoted up front as a fixed project price or a day rate, depending on scope. Tell me the problem and I’ll give you a real number.' }
	];
</script>

<Seo
	title="Power BI Consulting in Norfolk, Norwich & Great Yarmouth | Duncan Boyne"
	description="Power BI consulting, automation, and data & AI readiness for businesses across Norfolk, Norwich and Great Yarmouth. Deep experience in financial and manufacturing environments."
	path="/services"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream svc-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sv-hero-disc"></span>
		<span class="b-shape sv-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Work With Me</p>
		<h1 class="page-title">Data that works.<br><span class="accent-line">For the people using it.</span></h1>
		<p class="page-sub">Power BI, automation, and the unglamorous groundwork underneath. With real scars from financial and manufacturing environments.</p>
	</div>
</section>

<!-- ══ SERVICES — numbered sequence ════════════════════════════════════ -->
{#each services as svc, i}
	<section class="band band--{svc.field}">
		<div class="bleeds" aria-hidden="true">
			<span class="b-shape b-circle svc-disc svc-disc-{i}"></span>
		</div>
		<div class="wrap">
			<header class="phead" class:phead--right={i % 2 === 1}>
				<span class="phead-index" aria-hidden="true">{svc.number}</span>
				<div class="phead-main">
					<h2 class="phead-title">{@html svc.title}</h2>
					<a href="/contact" class="phead-all">Get in touch <ArrowUpRight class="ico" /></a>
				</div>
			</header>
			<div class="svc-body">
				<p class="svc-tagline">{svc.tagline}</p>
				<p class="svc-desc">{svc.description}</p>
				<p class="svc-detail">{svc.detail}</p>
				<ul class="svc-bullets">
					{#each svc.bullets as b}
						<li>
							<CheckCircle class="bullet-icon ico" aria-hidden="true" />
							{b}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
{/each}

<!-- ══ PROOF — numbers + anonymised results ═══════════════════════════ -->
<section class="band band--cream">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle pr-disc"></span>
	</div>
	<div class="wrap">
		<div class="stat-grid sv-stats">
			{#each stats as s}
				<div class="stat-tile">
					<span class="stat-tile-value">{s.value}</span>
					<span class="stat-tile-label">{s.label}</span>
				</div>
			{/each}
		</div>

		<h2 class="phead-title section-title--right">Selected<br>Results</h2>
		<p class="proof-note">Client names withheld, numbers real. A sample of what the work actually delivers.</p>
		<ul class="results-list">
			{#each results as r}
				<li class="result-item">
					<span class="result-marker" aria-hidden="true"></span>
					<span class="result-metric">{r.metric}</span>
					<span class="result-text">{r.text}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ CONTEXT — industries + ERP systems ══════════════════════════════ -->
<section class="band band--surface">
	<div class="wrap">
		<div class="context-grid">
			<div class="context-col">
				<p class="context-label">Industries</p>
				<div class="tag-list">
					{#each industries as ind}<span class="tag">{ind}</span>{/each}
				</div>
			</div>
			<div class="context-col">
				<p class="context-label">ERP Systems</p>
				<div class="tag-list">
					{#each erp as e}<span class="tag">{e}</span>{/each}
				</div>
				<p class="context-note">Experience pulling, transforming, and reporting on data from these systems using Power BI and Power Query.</p>
			</div>
		</div>
	</div>
</section>

<!-- ══ FAQ TEASER — gold field ═════════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape sv-faq-bar"></span>
	</div>
	<div class="wrap">
		<h2 class="phead-title">Common<br>Questions</h2>
		<dl class="faq-teaser-list">
			{#each faqTeasers as f}
				<div class="faq-teaser-item">
					<dt class="faq-teaser-q">{f.q}</dt>
					<dd class="faq-teaser-a">{f.a}</dd>
				</div>
			{/each}
		</dl>
		<a href="/faq" class="phead-all faq-teaser-link">See all questions <ArrowUpRight class="ico" /></a>
	</div>
</section>

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle sv-cta-disc"></span>
		<span class="b-shape sv-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Not sure I'm the right fit?</p>
		<a href="/contact" class="cta-main">Let's talk <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">Tell me what you're actually trying to solve. If I'm not the right person for it, I'll tell you that too.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, poster header, and the CTA
	   pattern live in app.css (Bauhaus poster kit). This block keeps only
	   what's specific to Services' own layout and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.svc-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.sv-hero-disc {
		width: clamp(16rem, 34vw, 30rem); height: clamp(16rem, 34vw, 30rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-11rem, -13vw, -6rem); right: clamp(-11rem, -11vw, -5rem);
	}
	.sv-hero-bar { width: clamp(5rem, 15vw, 11rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ SERVICES ═══════════════════════════════════════════════════ */
	.svc-disc { width: clamp(12rem, 28vw, 24rem); height: clamp(12rem, 28vw, 24rem); opacity: 0.12; }
	.svc-disc-0 { background: var(--color-text); top: clamp(-8rem, -10vw, -4rem); left: clamp(-7rem, -8vw, -3rem); }
	.svc-disc-1 { background: var(--color-bauhaus); opacity: 0.85; bottom: clamp(-9rem, -11vw, -5rem); right: clamp(-8rem, -9vw, -4rem); }
	.svc-disc-2 { background: var(--color-text); opacity: 0.08; top: clamp(-7rem, -9vw, -3rem); right: clamp(-6rem, -7vw, -3rem); }

	.svc-body { max-width: 60ch; }
	.svc-tagline { font-size: clamp(1.1rem, 2vw, 1.35rem); font-weight: 700; line-height: 1.4; color: var(--fg); margin: 0 0 1.5rem; }
	.svc-desc { font-size: 1.05rem; line-height: 1.8; color: var(--fg); margin: 0 0 1rem; }
	.svc-detail { font-size: 1rem; line-height: 1.8; color: var(--fg-muted); margin: 0 0 2rem; }
	.svc-bullets {
		list-style: none; margin: 0; padding-top: 1.5rem; display: grid; gap: 0.65rem;
		border-top: 1px solid var(--rule-soft); max-width: none;
	}
	@media (min-width: 540px) { .svc-bullets { grid-template-columns: 1fr 1fr; } }
	.svc-bullets li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.875rem; color: var(--fg-muted); line-height: 1.5; }
	.bullet-icon { color: var(--field-accent); flex-shrink: 0; margin-top: 0.15rem; }

	/* ══ PROOF ══════════════════════════════════════════════════════ */
	.pr-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-accent); opacity: 0.13;
		bottom: clamp(-9rem, -12vw, -5rem); left: clamp(-8rem, -9vw, -4rem);
	}
	.sv-stats { margin-bottom: clamp(3rem, 6vw, 4.5rem); }

	.section-title--right { text-align: right; }
	.phead-title { margin: 0 0 0.5rem; }
	.proof-note { font-size: 0.9rem; color: var(--fg-muted); margin: 0 0 2rem; text-align: right; }
	.results-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--rule-strong); }
	.result-item {
		display: grid; grid-template-columns: 0.7rem 1fr; gap: 0.35rem 1rem;
		padding: 1.1rem 0; border-bottom: 1.5px solid var(--rule-soft); align-items: baseline;
	}
	.result-marker { width: 0.7rem; height: 0.7rem; background: var(--field-accent); align-self: start; margin-top: 0.4rem; }
	.result-metric { grid-column: 2; font-size: 1.05rem; font-weight: 900; letter-spacing: -0.02em; color: var(--fg); }
	.result-text { grid-column: 2; font-size: 0.95rem; line-height: 1.6; color: var(--fg-muted); max-width: 60ch; }
	@media (min-width: 640px) {
		.result-item { grid-template-columns: 0.7rem 180px 1fr; }
		.result-metric { grid-column: 2; }
		.result-text { grid-column: 3; }
	}

	/* ══ CONTEXT ════════════════════════════════════════════════════ */
	.context-grid { display: grid; gap: 3rem; }
	@media (min-width: 640px) { .context-grid { grid-template-columns: 1fr 1fr; } }
	.context-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--field-accent); margin: 0 0 1.25rem; }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.85rem; border: 1.5px solid var(--rule-soft); color: var(--fg); }
	.context-note { font-size: 0.85rem; color: var(--fg-muted); margin: 1.25rem 0 0; line-height: 1.6; }

	/* ══ FAQ TEASER ═════════════════════════════════════════════════ */
	.sv-faq-bar { width: clamp(5rem, 14vw, 11rem); height: 0.85rem; background: var(--color-text); top: 0; right: 0; }
	.faq-teaser-list { margin: 1.75rem 0 2rem; padding: 0; border-top: 2px solid var(--rule-strong); }
	.faq-teaser-item { padding: 1.25rem 0; border-bottom: 1.5px solid var(--rule-soft); }
	.faq-teaser-q { font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--fg); margin: 0 0 0.4rem; }
	.faq-teaser-a { font-size: 0.95rem; line-height: 1.65; color: var(--fg-muted); margin: 0; max-width: 64ch; }
	.faq-teaser-link { font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.sv-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); left: clamp(-6rem, -8vw, -2rem);
	}
	.sv-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; right: 0; }
</style>
