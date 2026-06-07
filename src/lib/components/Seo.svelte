<script lang="ts">
	/** Per-page SEO. Sensible defaults; override what you need. */
	export let title = 'Duncan Boyne | Power BI Consultant in Norfolk';
	export let description =
		'Power BI consultant serving Norfolk, Norwich and Great Yarmouth. Dashboards, automation and data & AI readiness for finance and manufacturing teams.';
	export let path = '/';
	export let image = '/headshot.png';
	export let type: 'website' | 'article' | 'profile' = 'website';

	const SITE = 'https://www.duncanboyne.co.uk';
	$: canonical = SITE + path;
	$: absoluteImage = image.startsWith('http') ? image : SITE + image;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Duncan Boyne" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absoluteImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>
