<script lang="ts">
	let { onbegin, onskip }: { onbegin: () => void; onskip: () => void } = $props();
</script>

<div class="start-overlay">
	<div class="dot" aria-hidden="true"></div>
	<p class="opening-line">Every organisation builds a structure.</p>
	<div class="actions">
		<button class="begin" onclick={onbegin}>Begin</button>
		<button class="skip" onclick={onskip}>Skip to website</button>
	</div>
</div>

<style>
	.start-overlay {
		position: fixed;
		inset: 0;
		z-index: 10;
		background: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		padding: 2rem;
	}

	.dot {
		width: 240px;
		height: 240px;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(244, 209, 65, 0.85) 0%,
			rgba(244, 209, 65, 0.18) 18%,
			transparent 60%
		);
		animation: dot-grow 4.5s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
	@keyframes dot-grow {
		0% { transform: scale(0.02); opacity: 0; }
		20% { opacity: 1; }
		100% { transform: scale(1); opacity: 1; }
	}

	.opening-line {
		color: rgba(255, 255, 255, 0.72);
		font-size: clamp(0.85rem, 2.2vw, 1.1rem);
		font-weight: 200;
		letter-spacing: 0.28em;
		text-transform: lowercase;
		font-style: italic;
		text-align: center;
		margin: 0;
		animation: fade-up 2s ease 2.4s both;
	}

	.actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		animation: fade-up 1.6s ease 3.6s both;
	}
	@keyframes fade-up {
		from { opacity: 0; transform: translateY(0.6rem); }
		to { opacity: 1; transform: translateY(0); }
	}

	.begin {
		background: transparent;
		color: rgba(244, 209, 65, 0.9);
		border: 1px solid rgba(244, 209, 65, 0.45);
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		padding: 0.9rem 3.2rem;
		cursor: pointer;
		transition: all 0.4s ease;
	}
	.begin:hover,
	.begin:focus-visible {
		background: rgba(244, 209, 65, 0.1);
		border-color: rgba(244, 209, 65, 0.9);
	}

	.skip {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.35);
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		cursor: pointer;
		transition: color 0.3s ease;
		padding: 0.4rem;
	}
	.skip:hover,
	.skip:focus-visible {
		color: rgba(255, 255, 255, 0.75);
	}
</style>
