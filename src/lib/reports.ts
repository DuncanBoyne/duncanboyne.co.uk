/**
 * Report demos catalog.
 *
 * A showcase of live, interactive Power BI reports built against DEMO DATA for a
 * range of ERP / CRM platforms. Each entry drives a card on /reports and a
 * detail page at /reports/<slug> with the report embedded via Power BI
 * "publish to web".
 *
 * ── How to add a real report ──────────────────────────────────────────────
 * 1. In Power BI Service, open the report → File → Embed report → Publish to
 *    web (public). (This must be enabled by the tenant admin, and the report
 *    becomes fully public — use fictional / demo data ONLY.)
 * 2. Copy the `src` URL from the generated iframe
 *    (https://app.powerbi.com/view?r=...) and paste it into `embedUrl` below.
 * 3. (Optional) drop a cover screenshot at static/reports/<slug>.png and set
 *    `thumbnail: '/reports/<slug>.png'`.
 * 4. Commit — GitHub Actions rebuilds and deploys.
 *
 * Leave `embedUrl` as '' for entries that are scaffolded but not yet published;
 * the detail page shows a tidy "embed coming soon" placeholder in that case.
 */

export type Platform = 'Sage 200' | 'Dynamics 365' | 'Epicor' | 'Infor Visual';

export type ReportCategory = 'Financial Auditing';

export interface Report {
	/** URL segment, e.g. 'financial-auditing-sage-200' */
	slug: string;
	/** Card + detail heading, e.g. 'Financial Auditing — Sage 200' */
	title: string;
	platform: Platform;
	category: ReportCategory;
	/** One line, shown on the card and as the meta description */
	summary: string;
	/** Power BI publish-to-web iframe src. '' = not published yet (placeholder). */
	embedUrl: string;
	/** CSS aspect-ratio for the embed. Defaults to '16 / 9'. */
	aspectRatio?: string;
	/** Optional cover screenshot: '/reports/<slug>.png' (card thumbnail + OG image). */
	thumbnail?: string;
	/** Bullet list of pages / KPIs the report demonstrates. */
	highlights?: string[];
	/** Data disclaimer shown on the detail page. */
	dataNote?: string;
	tags: string[];
	featured?: boolean;
	/** ISO date — used for sitemap lastmod and ordering. */
	published?: string;
}

const DEMO_DATA_NOTE = 'Fictional demo data only — no real company figures.';

export const reports: Report[] = [
	{
		slug: 'financial-auditing-sage-200',
		title: 'Financial Auditing — Sage 200',
		platform: 'Sage 200',
		category: 'Financial Auditing',
		summary:
			'Sage 200 Audit Archive — a self-contained financial audit view of headline P&L, debtors and creditors by financial year, with a trial-balance check that reconciles back to Sage.',
		embedUrl:
			'https://app.powerbi.com/view?r=eyJrIjoiMTQzYjgyNjctMjRjOS00ODIwLWI2YjctY2E5Yzg1MWUwZmI3IiwidCI6IjA4Zjg2MmI1LTNhM2EtNGM1OC1iZmFlLTdlNTZiMWRiMDc5ZSJ9',
		aspectRatio: '600 / 373.5',
		thumbnail: '/reports/financial-auditing-sage-200.png',
		highlights: [
			'Net Profit and Revenue trended by financial year (FY2019–FY2030)',
			'Trial-balance check that ties out to zero (Dr − Cr)',
			'Total Debtors and Total Creditors control totals',
			'13 pages of drill-down audit detail'
		],
		dataNote: DEMO_DATA_NOTE,
		tags: ['Financial Auditing', 'Sage 200', 'Trial Balance', 'P&L'],
		featured: true,
		published: '2026-07-03'
	},
	{
		slug: 'financial-auditing-dynamics-365',
		title: 'Financial Auditing — Dynamics 365',
		platform: 'Dynamics 365',
		category: 'Financial Auditing',
		summary:
			'Financial audit workspace for Dynamics 365 Finance: posted transactions, segregation-of-duties checks, and approval-trail coverage.',
		embedUrl: '', // TODO: paste Dynamics 365 publish-to-web URL
		highlights: [
			'Posted vs. pending transaction reconciliation',
			'Segregation-of-duties exception list',
			'Approval-trail coverage by department',
			'Vendor and customer master-data change log'
		],
		dataNote: DEMO_DATA_NOTE,
		tags: ['Financial Auditing', 'Dynamics 365', 'Finance', 'Controls'],
		published: '2026-07-03'
	},
	{
		slug: 'financial-auditing-epicor',
		title: 'Financial Auditing — Epicor',
		platform: 'Epicor',
		category: 'Financial Auditing',
		summary:
			'Epicor ERP audit report covering GL integrity, sub-ledger tie-outs, and high-value transaction review for manufacturers.',
		embedUrl: '', // TODO: paste Epicor publish-to-web URL
		highlights: [
			'GL-to-sub-ledger tie-out summary',
			'High-value transaction review queue',
			'Period-close checklist status',
			'Cost adjustment and write-off tracking'
		],
		dataNote: DEMO_DATA_NOTE,
		tags: ['Financial Auditing', 'Epicor', 'Manufacturing', 'GL integrity'],
		published: '2026-07-03'
	},
	{
		slug: 'financial-auditing-infor-visual',
		title: 'Financial Auditing — Infor Visual',
		platform: 'Infor Visual',
		category: 'Financial Auditing',
		summary:
			'Infor Visual audit dashboard: account movement analysis, duplicate-payment detection, and month-end control coverage.',
		embedUrl: '', // TODO: paste Infor Visual publish-to-web URL
		highlights: [
			'Account movement and variance analysis',
			'Duplicate-payment and duplicate-vendor detection',
			'Month-end control coverage scorecard',
			'Aged AP / AR exception review'
		],
		dataNote: DEMO_DATA_NOTE,
		tags: ['Financial Auditing', 'Infor Visual', 'AP/AR', 'Controls'],
		published: '2026-07-03'
	}
];

/** Unique filter values, in first-appearance order (kept in sync with `reports`). */
export const reportCategories: ReportCategory[] = [...new Set(reports.map((r) => r.category))];
export const reportPlatforms: Platform[] = [...new Set(reports.map((r) => r.platform))];

export const featuredReports = reports.filter((r) => r.featured);

export function getReport(slug: string): Report | undefined {
	return reports.find((r) => r.slug === slug);
}
