export type ProjectKind = 'open-source' | 'public-project' | 'community';

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	name: string;
	repo: string;
	description: string;
	href: string;
	homepage?: string;
	language?: string;
	license?: string;
	kind: ProjectKind;
	tags: string[];
	featured?: boolean;
	links?: ProjectLink[];
}

export const projects: Project[] = [
	{
		name: 'AI-BI',
		repo: 'DuncanBoyne/AI-BI',
		description:
			'AI prompts, how-tos and tooling for working on Power BI with an AI agent in the loop. This is where the resources from my AI and Power BI talks live.',
		href: 'https://github.com/DuncanBoyne/AI-BI',
		homepage: 'https://www.linkedin.com/in/duncanboyne/',
		kind: 'open-source',
		license: 'MIT',
		tags: ['Power BI', 'AI', 'Prompting', 'Talk resources'],
		featured: true
	},
	{
		name: 'Deneb Visual Builder',
		repo: 'DuncanBoyne/Deneb-Visual-Skill',
		description:
			'A Claude skill for generating, adapting, debugging and reviewing Deneb Vega-Lite visuals for Power BI.',
		href: 'https://github.com/DuncanBoyne/Deneb-Visual-Skill',
		kind: 'open-source',
		license: 'MIT',
		tags: ['Power BI', 'Deneb', 'Vega-Lite', 'Claude Skill'],
		featured: true
	},
	{
		name: 'LinkedIn Dashboard Skill',
		repo: 'DuncanBoyne/linkedin-dashboard-skill',
		description:
			'A Claude Code skill that builds a LinkedIn analytics dashboard from Apify post exports and LinkedIn analytics files, then turns the numbers into content recommendations.',
		href: 'https://github.com/DuncanBoyne/linkedin-dashboard-skill',
		kind: 'open-source',
		license: 'MIT',
		tags: ['Claude Code', 'Analytics', 'LinkedIn', 'Content strategy'],
		featured: true
	},
	{
		name: 'Power BI Projects',
		repo: 'DuncanBoyne/power-bi-projects',
		description:
			'Companion files for Power BI build experiments, articles, demos and reference projects, including PBIP, TMDL, PBIR and rebuild notes.',
		href: 'https://github.com/DuncanBoyne/power-bi-projects',
		kind: 'public-project',
		tags: ['Power BI', 'PBIP', 'TMDL', 'PBIR']
	},
	{
		name: 'duncanboyne.co.uk',
		repo: 'DuncanBoyne/duncanboyne.co.uk',
		description:
			'The public source for this site: SvelteKit, Supabase content, speaking pages, blog pages and all the little choices that make a personal site feel personal.',
		href: 'https://github.com/DuncanBoyne/duncanboyne.co.uk',
		kind: 'public-project',
		language: 'Svelte',
		tags: ['SvelteKit', 'Portfolio', 'Supabase', 'Static site']
	},
	{
		name: 'ForkME',
		repo: 'DuncanBoyne/ForkME',
		description:
			'A barebones website starter for people who want something simple they can fork, adapt and publish quickly.',
		href: 'https://github.com/DuncanBoyne/ForkME',
		kind: 'public-project',
		language: 'HTML',
		tags: ['Starter site', 'HTML', 'Template']
	},
	{
		name: 'EoEPPS',
		repo: 'DuncanBoyne/EoEPPS',
		description:
			'The public site repo for the East of England Power Platform Summit, built around a community event that is practical, welcoming and human.',
		href: 'https://github.com/DuncanBoyne/EoEPPS',
		kind: 'community',
		language: 'Astro',
		tags: ['Community', 'Astro', 'Power Platform', 'Event site']
	},
	{
		name: 'NPPUG',
		repo: 'DuncanBoyne/NPPUG',
		description:
			'The public site repo for the Norfolk Power Platform User Group, supporting meetups, sessions and local community activity.',
		href: 'https://github.com/DuncanBoyne/NPPUG',
		kind: 'community',
		language: 'Astro',
		tags: ['Community', 'Astro', 'Power Platform', 'User group']
	}
];

export const featuredProjects = projects.filter((project) => project.featured);

export function projectKindLabel(kind: ProjectKind) {
	if (kind === 'open-source') return 'Open source';
	if (kind === 'community') return 'Community build';
	return 'Public project';
}
