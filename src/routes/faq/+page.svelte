<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_URL, STATS } from '$lib/site';

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
			a: `Duncan Boyne is a Power BI and data consultant based in Norfolk, working with clients across Norwich, Great Yarmouth and remotely throughout the UK. He has ${STATS.yearsPowerBI} years in Power BI and ${STATS.yearsData} years in data and IT more broadly, and has delivered ${STATS.projects} projects for ${STATS.organisations} organisations. He also founded the Norfolk Power Platform User Group and the East of England Power Platform Summit.`
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
			a: `${STATS.yearsPowerBI} years working in Power BI, ${STATS.yearsData} years in data and IT overall, across ${STATS.projects} projects for ${STATS.organisations} organisations in finance, manufacturing, retail and distribution. No Microsoft certifications listed by choice — the track record does the talking.`
		},
		{
			q: 'Do you do speaking, workshops or training?',
			a: `Yes. I’ve delivered ${STATS.talks} talks across ${STATS.countries} countries (soon to be 5), and I founded and run the East of England Power Platform Summit — 8 events with 500+ total attendees — plus the Norfolk Power Platform User Group. Speaking and workshop enquiries are welcome via my Sessionize profile or the contact page.`
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
		'@id': `${SITE_URL}/faq#faqpage`,
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

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream fq-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle fq-hero-disc"></span>
		<span class="b-shape fq-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Questions &amp; Answers</p>
		<h1 class="page-title">FAQ</h1>
		<p class="page-sub">Straight answers about working with a freelance / fractional Power BI consultant in Norfolk — services, results, cost, and how to get started.</p>
	</div>
</section>

<!-- ══ FAQ LIST — surface field ═════════════════════════════════════════ -->
<section class="band band--surface faq-section">
	<div class="wrap wrap--narrow">
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

<!-- ══ CTA — inverse closer ════════════════════════════════════════════ -->
<section class="band band--inverse cta-block">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle fq-cta-disc"></span>
		<span class="b-shape fq-cta-bar"></span>
	</div>
	<div class="wrap">
		<p class="cta-pre">Didn't find your question?</p>
		<a href="/contact" class="cta-main">Ask me directly <ArrowUpRight class="cta-ico" /></a>
		<p class="cta-sub">Tell me what you're actually trying to solve. If I'm not the right person for it, I'll tell you that too.</p>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, and the CTA pattern live in
	   app.css (Bauhaus poster kit). This block keeps only what's specific
	   to FAQ's own layout and bleed shapes. */
	.wrap--narrow { max-width: 900px; }

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.fq-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2rem, 4vw, 3rem); }
	.fq-hero-disc {
		width: clamp(16rem, 36vw, 32rem); height: clamp(16rem, 36vw, 32rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-10rem, -12vw, -5rem); right: clamp(-11rem, -12vw, -5rem);
	}
	.fq-hero-bar { width: clamp(5rem, 16vw, 12rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 1.5rem); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 56ch; margin: 0; }

	/* ══ FAQ LIST ═══════════════════════════════════════════════════ */
	.faq-list { margin: 0; padding: 0; border-top: 2px solid var(--rule-strong); }
	.faq-item { padding: clamp(1.5rem, 3vw, 2.25rem) 0; border-bottom: 1.5px solid var(--rule-soft); }
	.faq-q { font-size: clamp(1.15rem, 2.4vw, 1.55rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.25; color: var(--fg); margin: 0 0 0.85rem; }
	.faq-a { margin: 0; }
	.faq-a p { font-size: 1rem; line-height: 1.75; color: var(--fg-muted); margin: 0; max-width: 68ch; text-wrap: pretty; }
	.faq-points { list-style: none; margin: 0.9rem 0 0; padding: 0; display: grid; gap: 0.55rem; max-width: 68ch; }
	.faq-points li { position: relative; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--fg-muted); }
	.faq-points li::before { content: ''; position: absolute; left: 0; top: 0.6rem; width: 0.4rem; height: 0.4rem; background: var(--field-accent); }

	/* ══ CTA ════════════════════════════════════════════════════════ */
	.fq-cta-disc {
		width: clamp(11rem, 26vw, 20rem); height: clamp(11rem, 26vw, 20rem);
		background: var(--color-accent); opacity: 0.9;
		top: clamp(-6rem, -10vw, -3rem); right: clamp(-6rem, -8vw, -2rem);
	}
	.fq-cta-bar { width: clamp(4rem, 12vw, 9rem); height: 0.9rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
</style>
