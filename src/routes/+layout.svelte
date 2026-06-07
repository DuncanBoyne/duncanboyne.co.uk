<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// LocalBusiness / ProfessionalService structured data for local SEO.
	// Service-area only — no street address published.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': 'https://www.duncanboyne.co.uk/#business',
		name: 'Duncan Boyne — Power BI Consultant',
		description:
			'Power BI consultant serving Norfolk, Norwich and Great Yarmouth. Dashboards, automation and data & AI readiness for finance and manufacturing teams.',
		url: 'https://www.duncanboyne.co.uk',
		image: 'https://www.duncanboyne.co.uk/headshot.png',
		email: 'duncanboyne@hotmail.co.uk',
		founder: { '@type': 'Person', name: 'Duncan Boyne' },
		knowsAbout: [
			'Power BI',
			'Data Visualisation',
			'Business Intelligence',
			'DAX',
			'Power Query',
			'Power Automate',
			'Data & AI Readiness'
		],
		areaServed: [
			{ '@type': 'AdministrativeArea', name: 'Norfolk' },
			{ '@type': 'City', name: 'Norwich' },
			{ '@type': 'City', name: 'Great Yarmouth' }
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Great Yarmouth',
			addressRegion: 'Norfolk',
			addressCountry: 'GB'
		},
		sameAs: [
			'https://www.linkedin.com/in/duncanboyne',
			'https://github.com/DuncanBoyneJnr',
			'https://www.youtube.com/@PowerBIKindaGuy'
		]
	};
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Duncan Boyne Blog" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
	<script defer src="https://cloud.umami.is/script.js" data-website-id="17dd8826-5bf3-43d7-b785-b78f205d2845"></script>
</svelte:head>

<div class="flex flex-col" style="min-height: 100dvh;">
	<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-[#1F1F1F] focus:font-medium focus:rounded-lg">
		Skip to main content
	</a>
	<Header />
	<main id="main" class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
