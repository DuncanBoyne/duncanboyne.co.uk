<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';

	$: notFound = $page.status === 404;
	$: heading = notFound ? 'Page not found' : 'Something went wrong';
</script>

<svelte:head>
	<title>{heading} — Duncan Boyne</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="err">
	<div class="err-wrap">
		<p class="err-code" aria-hidden="true">{$page.status}</p>
		<h1 class="err-title">{heading}</h1>
		<p class="err-msg">
			{#if notFound}
				That page doesn't exist (or has moved). The homepage is the best place to start.
			{:else}
				{$page.error?.message || 'An unexpected error occurred. Please try again.'}
			{/if}
		</p>
		<a href="/" class="err-home"><ArrowLeft class="err-ico" /> Back to the homepage</a>
	</div>
</section>

<style>
	.err {
		min-height: 60vh;
		display: flex;
		align-items: center;
	}
	.err-wrap {
		max-width: 780px;
		margin: 0 auto;
		padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3.5rem);
	}
	.err-code {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-accent);
		margin: 0 0 0.75rem;
	}
	.err-title {
		font-size: clamp(1.8rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0 0 1rem;
	}
	.err-msg {
		color: var(--color-muted);
		margin: 0 0 2rem;
		max-width: 45ch;
	}
	.err-home {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text);
		text-decoration: none;
		border-bottom: 2px solid var(--color-accent);
		padding-bottom: 0.2rem;
	}
	.err-home :global(.err-ico) {
		width: 1rem;
		height: 1rem;
	}
</style>
