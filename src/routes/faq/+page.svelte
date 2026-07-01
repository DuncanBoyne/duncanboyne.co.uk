<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';

	// FAQ content, written the way people actually ask an assistant.
	// `points` render as bullets AND feed the FAQPage schema, so LLMs can
	// lift a clean, structured answer. Keep every answer honest and specific.
	interface Faq {
		q: string;
		a: string;
		points?: string[];
	}

	const faqs: Faq[] = [
		{
			q: 'Who is Duncan Boyne?',
			a: "Duncan Boyne is a Power BI and data consultant based in Norfolk, working with clients across Norwich, Great Yarmouth and remotely throughout the UK. He has 10 years in Power BI and 12 years in data and IT more broadly, and has delivered 250+ projects for 70+ organisations. He also founded the Norfolk Power Platform User Group and the East of England Power Platform Summit."
		},
		{
			q: 'Do you take on freelance or fractional Power BI work?',
			a: "Yes. Most engagements run one of two ways, and both are available remotely or on-site in Norfolk:",
			points: [
				'Fixed-scope projects — a specific dashboard, data model, or automation, quoted up front.',
				'Fractional / on-call support — I act as an ongoing Power BI resource for teams that need the skill but not a full-time hire.'
			]
		},
		{
			q: 'Where are you based, and do you work remotely?',
			a: "I'm based in Norfolk and regularly work with businesses in Norwich and Great Yarmouth. Power BI work is delivered remotely across the UK, so location is rarely a barrier — and on-site days are easy to arrange for clients in the East of England."
		},
		{
			q: 'What does a Power BI consultant actually do?',
			a: "In practice, I turn messy business data into reporting and automation people actually use. That covers:",
			points: [
				'Data modelling, DAX and Power Query',
				'Pulling data out of the systems you already run — including ERPs that fight back',
				'Dashboards designed around the decisions your team is trying to make',
				'Automating the repetitive reporting and chasing that eats your team’s hours',
				'Getting your data clean, connected and governed enough to be "AI ready"'
			]
		},
		{
			q: 'What results have you delivered for clients?',
			a: "A few anonymised examples of the kind of outcomes the work produces:",
			points: [
				'Saved a business roughly £100k by fixing historical data-storage and auditing problems.',
				'Cut a manufacturer’s potential product refunds from 15% down to 1–2% by delivering their ISO reporting and surfacing a hidden flaw in stock control.',
				'Rebuilt a multi-site group’s reporting after an ERP migration, so leadership had trustworthy numbers again.',
				'Designed and built a bespoke store- and manager-ranking system for a national retailer.',
				'Automated contract-renewal reporting and built Teams + email automation for invoice chasing, removing manual follow-up.'
			]
		},
		{
			q: 'How much does a Power BI project cost?',
			a: "It depends on scope — a single focused dashboard is very different from rebuilding reporting after an ERP migration. Work is quoted either as a fixed project price or a day rate for fractional and ongoing support, agreed up front before anything starts. The quickest way to a real number is to tell me what you’re trying to solve."
		},
		{
			q: 'What industries and systems do you work with?',
			a: "Deep experience in financial and manufacturing environments, plus distribution & logistics, professional services, and SME / mid-market businesses. On the systems side:",
			points: [
				'ERP: Dynamics 365, Epicor, InFor, Sage',
				'Microsoft stack: Power BI, DAX, Power Query, Power Apps, Power Automate, Dataverse',
				'Data: SQL, financial reporting, manufacturing and operations KPIs'
			]
		},
		{
			q: 'Can you help us get "AI ready"?',
			a: "Yes, and often the honest answer is “fix the boring bit first.” AI is only as good as the data underneath it; point it at a mess and you get a faster, more confident mess. I assess data quality and governance, map how your data really flows, and give you a practical roadmap — including a straight answer if the advice is “not yet.”"
		},
		{
			q: 'How experienced are you?',
			a: "10 years working in Power BI, 12 years in data and IT overall, across 250+ projects for 70+ organisations in finance, manufacturing, retail and distribution. No Microsoft certifications listed by choice — the track record does the talking."
		},
		{
			q: 'Do you do speaking, workshops or training?',
			a: "Yes. I’ve delivered 20+ talks across 3 countries (soon to be 5), and I founded and run the East of England Power Platform Summit — 8 events with 500+ total attendees — plus the Norfolk Power Platform User Group. Speaking and workshop enquiries are welcome via my Sessionize profile or the contact page."
		},
		{
			q: 'Can you take over or fix an existing Power BI setup?',
			a: "Often, yes. A lot of my work is inherited reports nobody trusts, models that have grown tangled, or reporting that broke when the business changed ERP. I’ll audit what’s there, tell you honestly what’s worth keeping, and rebuild the rest so it’s fast, clear and maintainable."
		},
		{
			q: 'How do we start working together?',
			a: "Get in touch through the contact page or by email with a short description of what you’re trying to solve. We’ll have a quick conversation about the problem, and if I’m not the right person for it, I’ll tell you that too."
		}
	];

	// FAQPage structured data — the payload assistants and search engines lift answers from.
	const faqLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': 'https://www.duncanboyne.co.uk/faq#faqpage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.points ? `${f.a} ${f.points.join(' ')}` : f.a
			}
		}))
	};
	const faqLdScript = `<script type="application/ld+json">${JSON.stringify(faqLd)}<\/script>`;
</script>

<Seo
	title="Power BI Consultant FAQ | Duncan Boyne, Norfolk"
	description="Answers to common questions about hiring a freelance or fractional Power BI consultant in Norfolk — services, results, cost, industries, remote work, and how to start."
	path="/faq"
/>

<svelte:head>
	{@html faqLdScript}
</svelte:head>

<!-- Hero -->
<section class="page-hero">
	<div class="wrap">
		<p class="eyebrow">Questions & Answers</p>
		<h1 class="page-title">FAQ</h1>
		<p class="page-sub">Straight answers about working with a freelance / fractional Power BI consultant in Norfolk — services, results, cost, and how to get started.</p>
	</div>
</section>

<!-- FAQ list -->
<section class="faq-section">
	<div class="wrap">
		<dl class="faq-list">
			{#each faqs as f}
				<div class="faq-item">
					<dt class="faq-q">{f.q}</dt>
					<dd class="faq-a">
						<p>{f.a}</p>
						{#if f.points}
							<ul class="faq-points">
								{#each f.points as p}
									<li>{p}</li>
								{/each}
							</ul>
						{/if}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- CTA -->
<section class="cta-block">
	<div class="wrap">
		<p class="cta-pre">Didn't find your question?</p>
		<a href="/contact" class="cta-main">Ask me directly <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">Tell me what you're actually trying to solve. If I'm not the right person for it, I'll tell you that too.</p>
	</div>
</section>

<style>
	.wrap { max-width: 900px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 3.5rem); }

	/* Hero */
	.page-hero {
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(1.5rem, 3vw, 2.5rem);
		border-bottom: 3px solid var(--color-accent3);
		max-width: 1100px;
		margin: 0 auto;
	}
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 1.5rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 56ch; margin: 0; }

	/* FAQ */
	.faq-section { padding: clamp(3rem, 6vw, 5rem) 0; }
	.faq-list { margin: 0; padding: 0; }
	.faq-item {
		padding: clamp(1.5rem, 3vw, 2.25rem) 0;
		border-bottom: 1px solid var(--color-border);
	}
	.faq-item:first-child { border-top: 1px solid var(--color-border); }
	.faq-q {
		font-size: clamp(1.15rem, 2.4vw, 1.55rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--color-text);
		margin: 0 0 0.85rem;
	}
	.faq-a { margin: 0; }
	.faq-a p { font-size: 1rem; line-height: 1.75; color: var(--color-muted); margin: 0; max-width: 68ch; text-wrap: pretty; }
	.faq-points {
		list-style: none;
		margin: 0.9rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.55rem;
		max-width: 68ch;
	}
	.faq-points li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-muted);
	}
	.faq-points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6rem;
		width: 0.4rem;
		height: 0.4rem;
		background: var(--color-accent);
	}

	/* CTA */
	.cta-block { padding: clamp(4rem, 9vw, 8rem) 0; max-width: 1100px; margin: 0 auto; }
	.cta-pre { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); margin: 0 0 1.25rem; }
	.cta-main { display: inline-flex; align-items: center; gap: 0.5rem; font-size: clamp(2rem, 6vw, 4.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--color-text); text-decoration: none; transition: color 0.3s; }
	.cta-main:hover { color: var(--color-accent2); }
	.cta-ico { width: clamp(1.5rem, 4vw, 3rem); height: clamp(1.5rem, 4vw, 3rem); }
	.cta-sub { margin: 1.25rem 0 0; font-size: 0.875rem; color: var(--color-muted); max-width: 48ch; }
</style>
