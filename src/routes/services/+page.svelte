<script lang="ts">
	import { ArrowUpRight, CheckCircle } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';

	const services = [
		{
			number: '01',
			title: 'Power BI & Data Visualisation',
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

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">Work With Me</p>
		<h1 class="page-title">Data that works.<br><span class="accent-line">For the people using it.</span></h1>
		<p class="page-sub">Power BI, automation, and the unglamorous groundwork underneath. With real scars from financial and manufacturing environments.</p>
	</div>
</section>

<!-- Services -->
{#each services as svc, i}
	<section class="svc-section" class:svc-section--alt={i % 2 === 1}>
		<div class="wrap">
			<div class="svc-grid">
				<div class="svc-meta">
					<span class="svc-num">{svc.number}</span>
					<p class="svc-tagline">{svc.tagline}</p>
					<a href="/contact" class="svc-cta">
						Get in touch <ArrowUpRight class="w-4 h-4" />
					</a>
				</div>
				<div class="svc-content">
					<h2 class="svc-title">{svc.title}</h2>
					<p class="svc-desc">{svc.description}</p>
					<p class="svc-detail">{svc.detail}</p>
					<ul class="svc-bullets">
						{#each svc.bullets as b}
							<li>
								<CheckCircle class="w-4 h-4 bullet-icon" aria-hidden="true" />
								{b}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
{/each}

<!-- Proof: numbers + anonymised results -->
<section class="proof-section">
	<div class="wrap">
		<div class="stats-row">
			{#each stats as s}
				<div class="stat">
					<span class="stat-value">{s.value}</span>
					<span class="stat-label">{s.label}</span>
				</div>
			{/each}
		</div>

		<h2 class="proof-heading">Selected results</h2>
		<p class="proof-note">Client names withheld, numbers real. A sample of what the work actually delivers.</p>
		<ul class="results-list">
			{#each results as r}
				<li class="result-item">
					<span class="result-metric">{r.metric}</span>
					<span class="result-text">{r.text}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Context -->
<section class="context-section">
	<div class="wrap">
		<div class="context-grid">
			<div class="context-col">
				<p class="context-label">Industries</p>
				<div class="tag-list">
					{#each industries as i}<span class="tag">{i}</span>{/each}
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

<!-- FAQ teaser -->
<section class="faq-teaser">
	<div class="wrap">
		<h2 class="faq-teaser-heading">Common questions</h2>
		<dl class="faq-teaser-list">
			{#each faqTeasers as f}
				<div class="faq-teaser-item">
					<dt class="faq-teaser-q">{f.q}</dt>
					<dd class="faq-teaser-a">{f.a}</dd>
				</div>
			{/each}
		</dl>
		<a href="/faq" class="faq-teaser-link">See all questions <ArrowUpRight class="w-4 h-4" /></a>
	</div>
</section>

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Not sure I'm the right fit?</p>
		<a href="/contact" class="cta-main">Let's talk <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">Tell me what you're actually trying to solve. If I'm not the right person for it, I'll tell you that too.</p>
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
	.page-title { font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); margin: 0 0 1.25rem; }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* Service sections */
	.svc-section {
		padding: clamp(3rem, 7vw, 6rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.svc-section--alt {
		background: var(--color-surface);
	}

	.svc-grid {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 768px) {
		.svc-grid {
			grid-template-columns: 220px 1fr;
			gap: 5rem;
			align-items: start;
		}
	}

	/* Left meta column */
	.svc-meta {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 1.5rem;
	}
	@media (min-width: 768px) {
		.svc-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			position: sticky;
			top: 5rem;
		}
	}

	.svc-num {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--color-accent);
		flex-shrink: 0;
	}
	.svc-tagline {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-muted);
		line-height: 1.5;
		margin: 0;
	}
	@media (min-width: 768px) {
		.svc-tagline { font-size: 0.95rem; }
	}
	.svc-cta {
		display: none;
	}
	@media (min-width: 768px) {
		.svc-cta {
			display: inline-flex;
			align-items: center;
			gap: 0.35rem;
			font-size: 0.75rem;
			font-weight: 700;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: var(--color-muted);
			text-decoration: none;
			margin-top: 0.5rem;
			transition: color 0.3s;
		}
		.svc-cta:hover { color: var(--color-accent); }
	}

	/* Right content column */
	.svc-content {}
	.svc-title {
		font-size: clamp(1.5rem, 3.5vw, 2.5rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0 0 1.5rem;
	}
	.svc-desc {
		font-size: 1.05rem;
		line-height: 1.8;
		color: var(--color-text);
		margin: 0 0 1rem;
		max-width: 60ch;
	}
	.svc-detail {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-muted);
		margin: 0 0 2rem;
		max-width: 60ch;
	}

	.svc-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.65rem;
		border-top: 1px solid var(--color-border);
		padding-top: 1.5rem;
	}
	@media (min-width: 540px) {
		.svc-bullets { grid-template-columns: 1fr 1fr; }
	}
	.svc-bullets li {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.875rem;
		color: var(--color-muted);
		line-height: 1.5;
	}
	.bullet-icon {
		color: var(--color-accent);
		flex-shrink: 0;
		margin-top: 0.15rem;
	}

	/* Proof */
	.proof-section {
		padding: clamp(3rem, 6vw, 5rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.stats-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem 1rem;
		padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
		border-bottom: 1px solid var(--color-border);
	}
	@media (min-width: 720px) { .stats-row { grid-template-columns: repeat(4, 1fr); } }
	.stat { display: flex; flex-direction: column; gap: 0.35rem; }
	.stat-value { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1; color: var(--color-accent); }
	.stat-label { font-size: 0.8rem; color: var(--color-muted); line-height: 1.4; max-width: 22ch; }

	.proof-heading { font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; color: var(--color-text); margin: 0 0 0.5rem; }
	.proof-note { font-size: 0.9rem; color: var(--color-muted); margin: 0 0 2rem; }
	.results-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
	.result-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.25rem;
		padding: 1.1rem 0;
		border-top: 1px solid var(--color-border);
	}
	.result-item:last-child { border-bottom: 1px solid var(--color-border); }
	@media (min-width: 640px) {
		.result-item { grid-template-columns: 180px 1fr; gap: 1.5rem; align-items: baseline; }
	}
	.result-metric { font-size: 1.05rem; font-weight: 900; letter-spacing: -0.02em; color: var(--color-accent); }
	.result-text { font-size: 0.95rem; line-height: 1.6; color: var(--color-muted); max-width: 60ch; }

	/* FAQ teaser */
	.faq-teaser { padding: clamp(3rem, 6vw, 5rem) 0; border-bottom: 1px solid var(--color-border); }
	.faq-teaser-heading { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 1.75rem; }
	.faq-teaser-list { margin: 0 0 2rem; padding: 0; }
	.faq-teaser-item { padding: 1.25rem 0; border-top: 1px solid var(--color-border); }
	.faq-teaser-item:last-child { border-bottom: 1px solid var(--color-border); }
	.faq-teaser-q { font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--color-text); margin: 0 0 0.4rem; }
	.faq-teaser-a { font-size: 0.95rem; line-height: 1.65; color: var(--color-muted); margin: 0; max-width: 64ch; }
	.faq-teaser-link {
		display: inline-flex; align-items: center; gap: 0.4rem;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
		color: var(--color-text); text-decoration: none; transition: color 0.3s;
	}
	.faq-teaser-link:hover { color: var(--color-accent); }

	/* Context */
	.context-section {
		padding: clamp(3rem, 6vw, 5rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.context-grid { display: grid; gap: 3rem; }
	@media (min-width: 640px) { .context-grid { grid-template-columns: 1fr 1fr; } }
	.context-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 1.25rem; }
	.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tag { font-size: 0.78rem; font-weight: 600; padding: 0.35rem 0.75rem; border: 1.5px solid var(--color-border); color: var(--color-muted); }
	.context-note { font-size: 0.85rem; color: var(--color-muted); margin: 1.25rem 0 0; line-height: 1.6; }

	/* CTA */
	.cta-block { padding: clamp(5rem, 10vw, 9rem) 0; }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(2rem, 5vw, 4.5rem); height: clamp(2rem, 5vw, 4.5rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }
</style>
