<script lang="ts">
	let { onskip }: { onskip: () => void } = $props();
</script>

<button class="skip-button" onclick={onskip}>Skip intro →</button>

<style>
	.skip-button {
		position: fixed;
		bottom: 1.6rem;
		right: 1.8rem;
		z-index: 20;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.18);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 0.55rem 1rem;
		cursor: pointer;
		backdrop-filter: blur(4px);
		transition: all 0.3s ease;
		animation: skip-in 1s ease 2s both;
	}
	.skip-button:hover,
	.skip-button:focus-visible {
		color: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.5);
	}
	@keyframes skip-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
