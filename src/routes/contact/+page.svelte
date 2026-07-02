<script lang="ts">
	import { Mail, Send, Mic, ExternalLink, ArrowUpRight } from 'lucide-svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Youtube from '$lib/components/icons/Youtube.svelte';
	import Seo from '$lib/components/Seo.svelte';

	let formData = { name: '', email: '', subject: '', message: '' };
	let submitting = false;
	let submitted = false;
	let error: string | null = null;

	async function handleSubmit() {
		submitting = true;
		error = null;
		try {
			const response = await fetch('https://formspree.io/f/meelkvdn', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			if (response.ok) {
				submitted = true;
				formData = { name: '', email: '', subject: '', message: '' };
			} else {
				throw new Error('Form submission failed');
			}
		} catch (e) {
			error = 'Failed to send message. Please try again or email directly.';
		} finally {
			submitting = false;
		}
	}

	// Short, contact-relevant Q&A. Mirrors the master /faq for the "Intent" GEO lever.
	const faqs = [
		{ q: 'Do you take on freelance or fractional Power BI work?', a: 'Yes — either fixed-scope projects or ongoing on-call support, delivered remotely across the UK or on-site in Norfolk.' },
		{ q: 'How quickly will I hear back?', a: 'I read everything that lands here myself and reply within a day or two.' },
		{ q: 'What should I include in a message?', a: 'A sentence or two on what you’re trying to solve is plenty. If I’m not the right fit, I’ll say so and point you elsewhere.' }
	];

	const socialLinks = [
		{ href: 'https://github.com/DuncanBoyne', icon: Github, label: 'GitHub', username: '@DuncanBoyne' },
		{ href: 'https://linkedin.com/in/duncanboyne', icon: Linkedin, label: 'LinkedIn', username: 'in/duncanboyne' },
		{ href: 'https://youtube.com/@PowerBIKindaGuy', icon: Youtube, label: 'YouTube', username: '@PowerBIKindaGuy' },
		{ href: 'https://youtube.com/@PowerPlatformClinic', icon: Youtube, label: 'YouTube', username: '@PowerPlatformClinic' }
	];
</script>

<Seo
	title="Contact | Power BI Consultant in Norfolk — Duncan Boyne"
	description="Get in touch with Duncan Boyne, Power BI consultant in Norfolk (Norwich and Great Yarmouth), for consulting work, speaking enquiries, or a conversation about your data."
	path="/contact"
/>

<!-- ══ HERO — poster cover ═════════════════════════════════════════════ -->
<section class="band band--cream ct-hero">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ct-hero-disc"></span>
		<span class="b-shape ct-hero-bar"></span>
	</div>
	<div class="wrap">
		<div class="modules" aria-hidden="true">
			<span class="mod mod-ink"></span><span class="mod mod-gold"></span><span class="mod mod-red"></span>
		</div>
		<p class="eyebrow">Get in Touch</p>
		<h1 class="page-title">Let's<br><span class="accent-line">Talk</span></h1>
		<p class="page-sub">Consulting work, a speaking slot, or just an honest conversation about the data that's keeping you up. All welcome.</p>
	</div>
</section>

<!-- ══ CONTENT — form + info, surface field ════════════════════════════ -->
<section class="band band--surface">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape b-circle ct-content-disc"></span>
	</div>
	<div class="wrap">
		<div class="content-grid">
			<!-- Form -->
			<div class="form-col">
				<p class="col-label">Send a Message</p>

				{#if submitted}
					<div class="success-block">
						<p class="success-title">Message sent.</p>
						<p class="success-sub">Got it, thank you. I read everything that lands here myself, and I'll reply within a day or two. (If it's been longer, a collie probably ate the notification.)</p>
					</div>
				{:else}
					<form on:submit|preventDefault={handleSubmit} class="contact-form">
						<div class="field">
							<label for="name" class="field-label">Name</label>
							<input type="text" id="name" bind:value={formData.name} required class="field-input" placeholder="Your name" />
						</div>
						<div class="field">
							<label for="email" class="field-label">Email</label>
							<input type="email" id="email" bind:value={formData.email} required class="field-input" placeholder="your@email.com" />
						</div>
						<div class="field">
							<label for="subject" class="field-label">Subject</label>
							<input type="text" id="subject" bind:value={formData.subject} required class="field-input" placeholder="What's this about?" />
						</div>
						<div class="field">
							<label for="message" class="field-label">Message</label>
							<textarea id="message" bind:value={formData.message} required rows="5" class="field-input field-textarea" placeholder="Tell me what's on your mind..."></textarea>
						</div>
						{#if error}
							<p class="form-error" role="alert" aria-live="polite">{error}</p>
						{/if}
						<button type="submit" disabled={submitting} class="btn-primary submit-btn" aria-busy={submitting}>
							{#if submitting}
								<svg class="spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
								</svg>
								Sending…
							{:else}
								Send Message <Send class="w-4 h-4" aria-hidden="true" />
							{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Info -->
			<div class="info-col">
				<p class="col-label">Other Ways to Connect</p>

				<div class="info-items">
					<a href="mailto:duncan@duncanboyne.co.uk" class="info-row">
						<Mail class="ico info-icon" aria-hidden="true" />
						<div class="info-body">
							<span class="info-title">Email</span>
							<span class="info-value">duncan@duncanboyne.co.uk</span>
						</div>
						<ArrowUpRight class="ico info-arrow" />
					</a>

					<a href="https://sessionize.com/duncan-boyne" target="_blank" rel="noopener noreferrer" class="info-row">
						<Mic class="ico info-icon" aria-hidden="true" />
						<div class="info-body">
							<span class="info-title">Speaking Enquiries</span>
							<span class="info-value">sessionize.com/duncan-boyne <ExternalLink class="w-3 h-3 inline" /></span>
						</div>
						<ArrowUpRight class="ico info-arrow" />
					</a>
				</div>

				<p class="social-heading">Social</p>
				<div class="social-rows">
					{#each socialLinks as { href, icon: Icon, label, username }}
						<a {href} target="_blank" rel="noopener noreferrer" class="social-row-item">
							<Icon class="w-4 h-4" aria-hidden="true" />
							<span class="social-label">{label}</span>
							<span class="social-handle">{username}</span>
							<ArrowUpRight class="ico social-arrow" />
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══ FAQ — gold field ═════════════════════════════════════════════════ -->
<section class="band band--gold">
	<div class="bleeds" aria-hidden="true">
		<span class="b-shape ct-faq-bar"></span>
	</div>
	<div class="wrap">
		<p class="col-label">Before You Ask</p>
		<dl class="faq-list">
			{#each faqs as f}
				<div class="faq-item">
					<dt class="faq-q">{f.q}</dt>
					<dd class="faq-a">{f.a}</dd>
				</div>
			{/each}
		</dl>
		<a href="/faq" class="faq-link">More questions answered <ArrowUpRight class="ico" /></a>
	</div>
</section>

<style>
	/* .wrap, .ico, the field system, bleeds, and buttons live in app.css
	   (Bauhaus poster kit). This block keeps only what's specific to
	   Contact's own layout and bleed shapes. */

	/* ══ HERO ═══════════════════════════════════════════════════════ */
	.ct-hero { padding-top: clamp(3.5rem, 8vw, 6.5rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.ct-hero-disc {
		width: clamp(16rem, 36vw, 32rem); height: clamp(16rem, 36vw, 32rem);
		background: var(--color-accent); opacity: 0.14;
		top: clamp(-10rem, -12vw, -5rem); right: clamp(-11rem, -12vw, -5rem);
	}
	.ct-hero-bar { width: clamp(5rem, 16vw, 12rem); height: 0.85rem; background: var(--color-bauhaus); bottom: 0; left: 0; }
	.modules { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
	.eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.75rem; }
	.page-title { font-size: clamp(3rem, 10vw, 9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.9; color: var(--color-text); margin: 0 0 clamp(1rem, 2vw, 2rem); }
	.accent-line { color: var(--color-accent); }
	.page-sub { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--color-muted); max-width: 52ch; margin: 0; }

	/* ══ CONTENT ════════════════════════════════════════════════════ */
	.ct-content-disc {
		width: clamp(14rem, 30vw, 26rem); height: clamp(14rem, 30vw, 26rem);
		background: var(--color-text); opacity: 0.06;
		bottom: clamp(-9rem, -12vw, -5rem); right: clamp(-8rem, -9vw, -4rem);
	}
	.content-grid { display: grid; gap: 4rem; }
	@media (min-width: 768px) { .content-grid { grid-template-columns: 1fr 1fr; gap: 6rem; } }

	.col-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--field-accent); margin: 0 0 1.75rem; border-bottom: 1.5px solid var(--rule-soft); padding-bottom: 0.75rem; }

	/* Form */
	.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
	.field { display: flex; flex-direction: column; gap: 0.4rem; }
	.field-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-muted); }
	.field-input {
		width: 100%; padding: 0.75rem 1rem;
		border: 1.5px solid var(--rule-soft);
		background: var(--field-surface); color: var(--fg);
		font-size: 0.9rem;
		transition: border-color 0.2s;
		outline: none;
	}
	.field-input:focus { border-color: var(--color-accent); }
	.field-textarea { resize: none; }
	.form-error { font-size: 0.8rem; color: var(--color-error); }
	.submit-btn { width: 100%; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; }
	.spin { animation: spin 0.8s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }

	/* Success */
	.success-block { padding: 2.5rem 0; border-top: 3px solid var(--field-accent); }
	.success-title { font-size: 1.5rem; font-weight: 900; color: var(--fg); margin: 0 0 0.5rem; }
	.success-sub { font-size: 0.9rem; color: var(--fg-muted); margin: 0; line-height: 1.6; }

	/* Info */
	.info-items { display: flex; flex-direction: column; margin-bottom: 2rem; }
	.info-row {
		display: flex; align-items: center; gap: 0.9rem;
		padding: 1rem 0; border-bottom: 1.5px solid var(--rule-soft);
		text-decoration: none; color: var(--fg); transition: color 0.3s;
	}
	.info-row:first-child { border-top: 1.5px solid var(--rule-soft); }
	.info-row:hover { color: var(--field-accent); }
	.info-icon { flex-shrink: 0; color: var(--field-accent); }
	.info-body { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
	.info-title { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-muted); }
	.info-value { font-size: 0.9rem; color: var(--fg); transition: color 0.3s; }
	.info-row:hover .info-value { color: var(--field-accent); }
	.info-arrow { color: var(--fg-muted); flex-shrink: 0; transition: color 0.3s, transform 0.3s; }
	.info-row:hover .info-arrow { color: var(--field-accent); transform: translate(2px,-2px); }

	.social-heading { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--field-accent); margin: 0 0 0.75rem; border-bottom: 1.5px solid var(--rule-soft); padding-bottom: 0.75rem; }
	.social-rows { display: flex; flex-direction: column; }
	.social-row-item {
		display: flex; align-items: center; gap: 0.75rem;
		padding: 0.75rem 0; border-bottom: 1.5px solid var(--rule-soft);
		text-decoration: none; color: var(--fg-muted);
		font-size: 0.85rem; transition: color 0.3s;
	}
	.social-row-item:hover { color: var(--field-accent); }
	.social-label { font-weight: 700; color: var(--fg); font-size: 0.85rem; width: 5.5rem; flex-shrink: 0; }
	.social-handle { flex: 1; font-size: 0.78rem; }
	.social-arrow { color: var(--fg-muted); transition: color 0.3s, transform 0.3s; }
	.social-row-item:hover .social-arrow { color: var(--field-accent); transform: translate(2px,-2px); }

	/* ══ FAQ ════════════════════════════════════════════════════════ */
	.ct-faq-bar { width: clamp(5rem, 14vw, 11rem); height: 0.85rem; background: var(--color-text); top: 0; right: 0; }
	.faq-list { margin: 1.75rem 0 1.75rem; padding: 0; border-top: 2px solid var(--rule-strong); }
	.faq-item { padding: 1.25rem 0; border-bottom: 1.5px solid var(--rule-soft); }
	.faq-q { font-size: 1.05rem; font-weight: 800; letter-spacing: -0.01em; color: var(--fg); margin: 0 0 0.4rem; }
	.faq-a { font-size: 0.95rem; line-height: 1.65; color: var(--fg-muted); margin: 0; max-width: 64ch; }
	.faq-link {
		display: inline-flex; align-items: center; gap: 0.4rem;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
		color: var(--fg); text-decoration: none; transition: color 0.3s;
	}
	.faq-link:hover { color: var(--field-accent); }
</style>
