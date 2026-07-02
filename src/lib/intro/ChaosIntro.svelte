<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { markSeen } from './gate';

	let { onclose }: { onclose: () => void } = $props();

	// ── refs ───────────────────────────────────────────────────────────
	let overlayEl = $state<HTMLDivElement>();
	let canvasEl = $state<HTMLCanvasElement>();
	let dashEl = $state<HTMLDivElement>();
	let dashInnerEl = $state<HTMLDivElement>();
	let scanEl = $state<HTMLDivElement>();
	let taglineEl = $state<HTMLDivElement>();
	let nameEl = $state<HTMLDivElement>();
	let rolesEl = $state<HTMLParagraphElement>();
	let kpiEls = $state<(HTMLSpanElement | undefined)[]>([]);

	let showSkip = $state(true);
	let showEnter = $state(false);

	// Intro is always rendered dark, independent of the site's light/dark toggle.
	const ACCENT = '#F4D141';

	const DURATION = 12;
	const T = {
		chaos: DURATION * 0.25,
		assemble: DURATION * 0.52,
		hold: DURATION * 0.73,
		name: DURATION * 0.9
	};

	const BOX_W = 980;
	const BOX_H = 560;

	const kpis = [
		{ label: 'Revenue · YTD', prefix: '£', value: 2.4, suffix: 'M', dec: 1, delta: '▲ 12.4%' },
		{ label: 'Active users', prefix: '', value: 18204, suffix: '', dec: 0, delta: '▲ 6.1%' },
		{ label: 'Avg. resolution', prefix: '', value: 2.3, suffix: ' days', dec: 1, delta: '▼ 0.4d' },
		{ label: 'Data quality', prefix: '', value: 98.6, suffix: '%', dec: 1, delta: '▲ 3.2%' }
	];

	const barHeights = [42, 55, 38, 61, 48, 72, 66, 80, 58, 88, 76, 95];

	function tiles() {
		return {
			title: { x: 0, y: 0, w: 980, h: 34, n: 40 },
			kpi: [
				{ x: 0, y: 52, w: 230, h: 92, n: 55 },
				{ x: 250, y: 52, w: 230, h: 92, n: 55 },
				{ x: 500, y: 52, w: 230, h: 92, n: 55 },
				{ x: 750, y: 52, w: 230, h: 92, n: 55 }
			],
			bar: { x: 0, y: 164, w: 600, h: 236, n: 300 },
			donut: { x: 620, y: 164, w: 360, h: 236, n: 170 },
			line: { x: 0, y: 420, w: 980, h: 140, n: 220 }
		};
	}

	function lerp(a: number, b: number, t: number) {
		return a + (b - a) * t;
	}
	function easeOut(x: number) {
		return 1 - Math.pow(1 - x, 3);
	}
	function clamp(v: number, a: number, b: number) {
		return v < a ? a : v > b ? b : v;
	}
	function rand(a: number, b: number) {
		return a + Math.random() * (b - a);
	}

	function hexA(hex: string, a: number) {
		const h = hex.replace('#', '');
		const r = parseInt(h.substr(0, 2), 16),
			g = parseInt(h.substr(2, 2), 16),
			b = parseInt(h.substr(4, 2), 16);
		return `rgba(${r},${g},${b},${a})`;
	}

	function makeGlow(color: string) {
		const s = 64;
		const cv = document.createElement('canvas');
		cv.width = s;
		cv.height = s;
		const g = cv.getContext('2d')!;
		const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
		grd.addColorStop(0, color);
		grd.addColorStop(0.35, hexA(color, 0.45));
		grd.addColorStop(1, hexA(color, 0));
		g.fillStyle = grd;
		g.fillRect(0, 0, s, s);
		return cv;
	}

	type Wave = { amp: number; freq: number; phase: number; speed: number; y0: number };
	type Particle = {
		lx: number;
		ly: number;
		x: number;
		y: number;
		px: number;
		py: number;
		vx: number;
		vy: number;
		sx: number;
		sy: number;
		delay: number;
		size: number;
		br: number;
		ph: number;
		bx: number;
		by: number;
	};
	type Noise = {
		x: number;
		y: number;
		px: number;
		py: number;
		vx: number;
		vy: number;
		char: string;
		size: number;
		a0: number;
		ex: number;
		ey: number;
		sx: number;
		sy: number;
	};

	const CHAR_POOL = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '£', '%', '=SUM(', '=IF(', 'B7', 'A1',
		'C12', 'SELECT', 'WHERE', '{ }', 'NULL', '0.42', '12.4', '98.6', '∑', '~', '|', '/', '∆',
		'·', 'error', '#REF', '2.3', '£1.2M'
	];

	let ctx: CanvasRenderingContext2D | null = null;
	let dpr = 1;
	let vw = 0;
	let vh = 0;
	let stage = { scale: 1, boxX: 0, boxY: 0 };
	let glow: HTMLCanvasElement | null = null;
	let waves: Wave[] = [];
	let parts: Particle[] = [];
	let noise: Noise[] = [];
	let snapped = false;
	let revealing = false;
	let raf = 0;
	let startTime = 0;

	function toScreen(lx: number, ly: number) {
		return { x: stage.boxX + lx * stage.scale, y: stage.boxY + ly * stage.scale };
	}

	function setupCanvas() {
		if (!canvasEl) return;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		vw = window.innerWidth;
		vh = window.innerHeight;
		canvasEl.width = Math.floor(vw * dpr);
		canvasEl.height = Math.floor(vh * dpr);
		ctx = canvasEl.getContext('2d');
		const scale = Math.min((vw * 0.9) / BOX_W, (vh * 0.62) / BOX_H, 1.1);
		const boxX = (vw - BOX_W * scale) / 2;
		const boxY = (vh - BOX_H * scale) / 2 - vh * 0.03;
		stage = { scale, boxX, boxY };
		if (dashEl) dashEl.style.transform = `translate(${boxX}px,${boxY}px) scale(${scale})`;
		if (!glow) glow = makeGlow(ACCENT);
		if (!waves.length) buildWaves();
	}

	function buildWaves() {
		waves = [];
		for (let i = 0; i < 5; i++) {
			waves.push({
				amp: rand(30, 90),
				freq: rand(0.004, 0.012),
				phase: rand(0, 6.28),
				speed: rand(0.3, 0.9) * (Math.random() < 0.5 ? -1 : 1),
				y0: rand(0.15, 0.85)
			});
		}
	}

	// Structural particles fall from above like data raining into place; noise
	// glyphs fall alongside them, then burst outward once assembly begins.
	function buildParticles() {
		const T2 = tiles();
		const structural: { lx: number; ly: number }[] = [];
		const pushRect = (rect: { x: number; y: number; w: number; h: number; n: number }) => {
			for (let i = 0; i < rect.n; i++) {
				structural.push({ lx: rect.x + Math.random() * rect.w, ly: rect.y + Math.random() * rect.h });
			}
		};
		pushRect(T2.title);
		T2.kpi.forEach(pushRect);
		pushRect(T2.bar);
		pushRect(T2.donut);
		pushRect(T2.line);

		const cols = Math.max(8, Math.round(vw / 44));
		const colW = vw / cols;

		parts = structural.map((s, i) => {
			const col = i % cols;
			const x = col * colW + rand(2, colW - 2);
			const y = rand(-vh, vh);
			const vx = rand(-0.15, 0.15);
			const vy = rand(3.2, 7.2);
			const delay = clamp(1 - s.ly / BOX_H, 0, 1) * 0.45;
			return {
				lx: s.lx,
				ly: s.ly,
				x,
				y,
				px: x,
				py: y,
				vx,
				vy,
				sx: x,
				sy: y,
				delay,
				size: rand(1.1, 2.4),
				br: rand(0.55, 1),
				ph: Math.random() * 6.28,
				bx: rand(-1, 1),
				by: rand(-1, 1)
			};
		});

		noise = [];
		for (let i = 0; i < 300; i++) {
			const col = Math.floor(Math.random() * cols);
			const x = col * colW + rand(2, colW - 2);
			const y = rand(-vh, vh);
			const vx = rand(-0.1, 0.1);
			const vy = rand(3, 7);
			const ea = Math.random() * 6.28;
			noise.push({
				x,
				y,
				px: x,
				py: y,
				vx,
				vy,
				char: CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)],
				size: rand(9, 17),
				a0: rand(0.25, 0.85),
				ex: Math.cos(ea),
				ey: Math.sin(ea),
				sx: x,
				sy: y
			});
		}
		snapped = false;
	}

	function snapshot() {
		parts.forEach((p) => {
			p.sx = p.x;
			p.sy = p.y;
		});
		noise.forEach((p) => {
			p.sx = p.x;
			p.sy = p.y;
		});
		snapped = true;
	}

	function setKpi(cu: number) {
		kpis.forEach((k, i) => {
			const el = kpiEls[i];
			if (!el) return;
			const v = k.value * cu;
			const s = k.dec === 0 ? Math.round(v).toLocaleString('en-GB') : v.toFixed(k.dec);
			el.textContent = k.prefix + s + k.suffix;
		});
	}

	function phaseAt(t: number) {
		if (t >= T.hold) return 'name' as const;
		if (t >= T.assemble) return 'hold' as const;
		if (t >= T.chaos) return 'assemble' as const;
		return 'chaos' as const;
	}

	function update(t: number) {
		const phase = phaseAt(t);
		let dashO = 0,
			tagO = 0,
			rolesO = 0,
			nameO = 0;

		if (phase === 'chaos') {
			for (const p of parts) {
				p.px = p.x;
				p.py = p.y;
				p.x += p.vx;
				p.y += p.vy;
				if (p.y > vh + 20) p.y = -20;
			}
			for (const p of noise) {
				p.px = p.x;
				p.py = p.y;
				p.x += p.vx;
				p.y += p.vy;
				if (p.y > vh + 30) p.y = -30;
			}
		} else if (phase === 'assemble') {
			if (!snapped) snapshot();
			const gp = clamp((t - T.chaos) / (T.assemble - T.chaos), 0, 1);
			for (const p of parts) {
				const lp = clamp((gp - p.delay) / 0.5, 0, 1);
				const e = easeOut(lp);
				const sc = toScreen(p.lx, p.ly);
				p.px = p.x;
				p.py = p.y;
				p.x = lerp(p.sx, sc.x, e);
				p.y = lerp(p.sy, sc.y, e);
			}
			for (const p of noise) {
				p.px = p.x;
				p.py = p.y;
				p.x = p.sx + p.ex * gp * gp * 260 + p.vx * (1 - gp) * 10;
				p.y = p.sy + p.ey * gp * gp * 260 + p.vy * (1 - gp) * 10;
			}
			dashO = clamp((gp - 0.5) / 0.45, 0, 1);
			tagO = clamp((gp - 0.15) / 0.4, 0, 1);
		} else if (phase === 'hold') {
			for (const p of parts) {
				const sc = toScreen(p.lx, p.ly);
				p.x = sc.x + Math.sin(t * 1.6 + p.ph) * 1.3 * p.bx;
				p.y = sc.y + Math.cos(t * 1.4 + p.ph) * 1.3 * p.by;
			}
			dashO = 1;
			tagO = 1;
			if (dashInnerEl) dashInnerEl.style.transform = 'scale(1) translateY(0px)';
		} else {
			const np = clamp((t - T.hold) / (T.name - T.hold), 0, 1);
			for (const p of parts) {
				const sc = toScreen(p.lx, p.ly);
				const dx = sc.x - vw / 2,
					dy = sc.y - vh / 2;
				p.px = p.x;
				p.py = p.y;
				p.x = sc.x + dx * np * np * 1.4 + p.bx * np * 40;
				p.y = sc.y + dy * np * np * 1.4 + p.by * np * 40;
			}
			dashO = clamp(1 - np * 1.8, 0, 1);
			tagO = clamp(1 - np * 2.2, 0, 1);
			nameO = clamp((np - 0.05) * 1.7, 0, 1);
			rolesO = clamp((np - 0.35) * 1.8, 0, 1);
			if (np > 0.2 && !showEnter) showEnter = true;
			if (dashInnerEl)
				dashInnerEl.style.transform = `scale(${1 - np * 0.05}) translateY(${np * -8}px)`;
		}

		if (dashEl) dashEl.style.opacity = String(dashO);
		if (taglineEl) taglineEl.style.opacity = String(tagO);
		if (nameEl) {
			nameEl.style.opacity = String(nameO);
			nameEl.style.transform = `translateY(${(1 - nameO) * 24}px)`;
		}
		if (rolesEl) rolesEl.style.opacity = String(rolesO);

		const cu = easeOut(clamp((t - (T.chaos + 0.6)) / ((T.hold - T.chaos) * 0.9), 0, 1));
		setKpi(cu);

		if (scanEl) {
			if (phase === 'hold') {
				const sp = (t - T.assemble) / (T.hold - T.assemble);
				scanEl.style.opacity = '0.55';
				scanEl.style.transform = `translateY(${(sp % 1) * BOX_H}px)`;
			} else {
				scanEl.style.opacity = '0';
			}
		}
	}

	function render(t: number) {
		if (!ctx) return;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, vw, vh);
		ctx.globalCompositeOperation = 'lighter';

		const phase = phaseAt(t);
		const chaos = phase === 'chaos';
		const assembling = phase === 'assemble';

		const waveA = chaos
			? 0.5
			: assembling
				? clamp(1 - ((t - T.chaos) / (T.assemble - T.chaos)) * 1.6, 0, 0.5)
				: 0;
		if (waveA > 0.01) {
			for (const w of waves) {
				ctx.beginPath();
				ctx.strokeStyle = hexA(ACCENT, waveA * 0.5);
				ctx.lineWidth = 1.2;
				for (let x = 0; x <= vw; x += 14) {
					const y = w.y0 * vh + w.amp * Math.sin(x * w.freq + w.phase + t * w.speed);
					if (x === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}
				ctx.stroke();
			}
		}

		const noiseGlobal = chaos
			? 1
			: assembling
				? clamp(1 - ((t - T.chaos) / (T.assemble - T.chaos)) * 1.5, 0, 1)
				: 0;
		if (noiseGlobal > 0.01) {
			ctx.textAlign = 'left';
			ctx.textBaseline = 'middle';
			for (const p of noise) {
				ctx.globalAlpha = p.a0 * noiseGlobal;
				ctx.fillStyle = ACCENT;
				ctx.font = `${p.size}px ui-monospace, Menlo, monospace`;
				ctx.fillText(p.char, p.x, p.y);
			}
			ctx.globalAlpha = 1;
		}

		const formed = phase === 'hold' || phase === 'name';
		if (glow) {
			for (const p of parts) {
				let a = p.br;
				if (phase === 'name') {
					const np = clamp((t - T.hold) / (T.name - T.hold), 0, 1);
					a = p.br * clamp(1 - np * 1.6, 0, 1);
				}
				if (a <= 0.01) continue;
				if (chaos) {
					ctx.strokeStyle = hexA(ACCENT, a * 0.4);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(p.px, p.py);
					ctx.lineTo(p.x, p.y);
					ctx.stroke();
					const r = p.size * 2.4;
					ctx.globalAlpha = a * 0.7;
					ctx.drawImage(glow, p.x - r, p.y - r, r * 2, r * 2);
					ctx.globalAlpha = 1;
				} else {
					const r = p.size * (formed ? 3.0 : 2.6);
					ctx.globalAlpha = a;
					ctx.drawImage(glow, p.x - r, p.y - r, r * 2, r * 2);
					ctx.globalAlpha = 1;
					ctx.fillStyle = `rgba(255,248,214,${a * 0.9})`;
					ctx.fillRect(p.x - p.size * 0.4, p.y - p.size * 0.4, p.size * 0.8, p.size * 0.8);
				}
			}
		}
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 1;
	}

	function loop(now: number) {
		if (revealing) return;
		const t = (now - startTime) / 1000;
		update(t);
		render(t);
		if (t >= T.name) {
			revealHome(false);
			return;
		}
		raf = requestAnimationFrame(loop);
	}

	function start() {
		startTime = performance.now();
		snapped = false;
		revealing = false;
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(loop);
	}

	function revealHome(fast: boolean) {
		if (revealing) return;
		revealing = true;
		cancelAnimationFrame(raf);
		markSeen();
		const dur = fast ? 0.45 : 0.9;
		document.body.style.overflow = '';
		showSkip = false;
		showEnter = false;
		if (overlayEl) {
			overlayEl.style.transition = `opacity ${dur}s ease`;
			overlayEl.style.opacity = '0';
			overlayEl.style.pointerEvents = 'none';
		}
		setTimeout(onclose, dur * 1000 + 80);
	}

	function onResize() {
		setupCanvas();
	}

	function onSkip() {
		revealHome(true);
	}
	function onEnter() {
		revealHome(false);
	}

	onMount(() => {
		// Overlay is opaque and covers the viewport, so it's now safe to lift
		// the anti-flash shield that IntroLoader/app.html put on <html>.
		document.documentElement.classList.remove('intro-pending');
		document.body.style.overflow = 'hidden';
		setupCanvas();
		buildParticles();
		window.addEventListener('resize', onResize);
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			revealHome(true);
			return;
		}
		start();
	});

	onDestroy(() => {
		cancelAnimationFrame(raf);
		window.removeEventListener('resize', onResize);
		document.body.style.overflow = '';
	});
</script>

<div class="intro-overlay" bind:this={overlayEl}>
	<div class="intro-grid" aria-hidden="true"></div>
	<div class="intro-vignette" aria-hidden="true"></div>

	<canvas bind:this={canvasEl} class="intro-canvas" aria-hidden="true"></canvas>

	<div class="dash" bind:this={dashEl} aria-hidden="true">
		<div class="dash-inner" bind:this={dashInnerEl}>
			<div class="dash-scan" bind:this={scanEl}></div>

			<div class="dash-title">
				<div class="dash-title-left">
					<span class="dash-dot"></span>
					<span class="dash-title-text">Power BI · Live dashboard</span>
				</div>
				<span class="dash-title-right">Decision-ready</span>
			</div>

			{#each kpis as k, i}
				<div class="dash-kpi" style="left:{i * 250}px;">
					<span class="dash-kpi-label">{k.label}</span>
					<span class="dash-kpi-value" bind:this={kpiEls[i]}></span>
					<span class="dash-kpi-delta">{k.delta}</span>
				</div>
			{/each}

			<div class="dash-card dash-bar">
				<div class="dash-card-head">
					<span class="dash-card-title">Monthly revenue</span>
					<span class="dash-card-unit">£ thousands</span>
				</div>
				<div class="dash-bars">
					{#each barHeights as h, i}
						<div class="dash-bar-col" class:hi={i === barHeights.length - 1} style="height:{h}%;"></div>
					{/each}
				</div>
			</div>

			<div class="dash-card dash-donut">
				<span class="dash-card-title">Revenue by service</span>
				<div class="dash-donut-body">
					<svg width="118" height="118" viewBox="0 0 120 120" class="dash-donut-svg">
						<circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="16" />
						<circle
							cx="60" cy="60" r="54" fill="none" stroke="#F4D141" stroke-width="16"
							stroke-dasharray="156.07 183.22" stroke-dashoffset="0" transform="rotate(-90 60 60)"
						/>
						<circle
							cx="60" cy="60" r="54" fill="none" stroke="#E2A414" stroke-width="16"
							stroke-dasharray="95.00 244.29" stroke-dashoffset="-156.07" transform="rotate(-90 60 60)"
						/>
						<circle
							cx="60" cy="60" r="54" fill="none" stroke="#B46304" stroke-width="16"
							stroke-dasharray="61.07 278.22" stroke-dashoffset="-251.08" transform="rotate(-90 60 60)"
						/>
						<circle
							cx="60" cy="60" r="54" fill="none" stroke="#6E5A1E" stroke-width="16"
							stroke-dasharray="27.14 312.15" stroke-dashoffset="-312.15" transform="rotate(-90 60 60)"
						/>
						<text x="60" y="58" text-anchor="middle" fill="#F4D141" font-size="20" font-weight="900">£2.4M</text>
						<text x="60" y="74" text-anchor="middle" fill="#B3B3B3" font-size="8" letter-spacing="1">TOTAL</text>
					</svg>
					<div class="dash-legend">
						<div class="dash-legend-row"><span class="dot" style="background:#F4D141"></span>Power BI<span class="pct">46%</span></div>
						<div class="dash-legend-row"><span class="dot" style="background:#E2A414"></span>Automation<span class="pct">28%</span></div>
						<div class="dash-legend-row"><span class="dot" style="background:#B46304"></span>AI Readiness<span class="pct">18%</span></div>
						<div class="dash-legend-row"><span class="dot" style="background:#6E5A1E"></span>Advisory<span class="pct">8%</span></div>
					</div>
				</div>
			</div>

			<div class="dash-card dash-line">
				<div class="dash-card-head">
					<span class="dash-card-title">Pipeline trend</span>
					<span class="dash-card-unit">last 12 months</span>
				</div>
				<svg viewBox="0 0 100 40" preserveAspectRatio="none" class="dash-line-svg">
					<defs>
						<linearGradient id="introLineFill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="rgba(244,209,65,0.35)" />
							<stop offset="100%" stop-color="rgba(244,209,65,0)" />
						</linearGradient>
					</defs>
					<polygon
						points="0,30.52 9.09,27.8 18.18,29.16 27.27,24.4 36.36,25.08 45.45,20.32 54.55,21.68 63.64,16.58 72.73,17.6 81.82,13.52 90.91,14.2 100,8.76 100,40 0,40"
						fill="url(#introLineFill)"
					/>
					<polyline
						points="0,30.52 9.09,27.8 18.18,29.16 27.27,24.4 36.36,25.08 45.45,20.32 54.55,21.68 63.64,16.58 72.73,17.6 81.82,13.52 90.91,14.2 100,8.76"
						fill="none" stroke="#F4D141" stroke-width="1.6" vector-effect="non-scaling-stroke"
						stroke-linejoin="round" stroke-linecap="round"
					/>
				</svg>
			</div>
		</div>
	</div>

	<div class="intro-tagline" bind:this={taglineEl} aria-hidden="true">
		<span>From chaos to <span class="hi">decision-ready</span> data</span>
	</div>

	<div class="intro-name" bind:this={nameEl}>
		<h2>
			<span class="n-thin">Duncan</span>
			<span class="n-bold">Boyne</span>
		</h2>
		<p class="intro-roles" bind:this={rolesEl}>Power BI Consultant &amp; AI Strategist</p>
	</div>

	{#if showSkip}
		<button class="intro-skip" onclick={onSkip} type="button">Skip intro ›</button>
	{/if}

	{#if showEnter}
		<button class="intro-enter" onclick={onEnter} type="button">Enter site ›</button>
	{/if}
</div>

<style>
	.intro-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: #121212;
		overflow: hidden;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
	}
	.intro-grid {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(244, 209, 65, 0.045) 1px, transparent 1px),
			linear-gradient(90deg, rgba(244, 209, 65, 0.045) 1px, transparent 1px);
		background-size: 60px 60px;
	}
	.intro-vignette {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(ellipse 92% 92% at 50% 46%, transparent 32%, #121212 82%);
	}
	.intro-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.dash {
		position: absolute;
		left: 0;
		top: 0;
		width: 980px;
		height: 560px;
		transform-origin: top left;
		opacity: 0;
		pointer-events: none;
	}
	.dash-inner {
		position: relative;
		width: 980px;
		height: 560px;
		transform-origin: center center;
	}
	.dash-scan {
		position: absolute;
		left: 0;
		top: 0;
		width: 980px;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(244, 209, 65, 0.7), transparent);
		opacity: 0;
		pointer-events: none;
	}

	.dash-title {
		position: absolute;
		left: 0;
		top: 0;
		width: 980px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.dash-title-left {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}
	.dash-dot {
		width: 9px;
		height: 9px;
		border-radius: 9999px;
		background: #f4d141;
		box-shadow: 0 0 12px rgba(244, 209, 65, 0.8);
		animation: introDot 1.6s ease-in-out infinite;
	}
	.dash-title-text {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #f4d141;
	}
	.dash-title-right {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #b3b3b3;
	}

	.dash-kpi {
		position: absolute;
		top: 52px;
		width: 230px;
		height: 92px;
		background: rgba(24, 22, 16, 0.85);
		border: 1px solid rgba(244, 209, 65, 0.22);
		box-shadow: 0 8px 26px rgba(0, 0, 0, 0.5), 0 0 20px rgba(244, 209, 65, 0.05);
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.dash-kpi-label {
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #b3b3b3;
	}
	.dash-kpi-value {
		font-size: 30px;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: #f4d141;
		text-shadow: 0 0 14px rgba(244, 209, 65, 0.5);
		line-height: 1;
	}
	.dash-kpi-delta {
		font-size: 11px;
		font-weight: 700;
		color: #6ccb5f;
	}

	.dash-card {
		position: absolute;
		background: rgba(24, 22, 16, 0.85);
		border: 1px solid rgba(244, 209, 65, 0.22);
		box-shadow: 0 8px 26px rgba(0, 0, 0, 0.5), 0 0 20px rgba(244, 209, 65, 0.05);
		display: flex;
		flex-direction: column;
	}
	.dash-card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}
	.dash-card-title {
		font-size: 13px;
		font-weight: 700;
		color: #f5f5f5;
	}
	.dash-card-unit {
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #b3b3b3;
	}

	.dash-bar {
		left: 0;
		top: 164px;
		width: 600px;
		height: 236px;
		padding: 16px 18px;
	}
	.dash-bars {
		flex: 1;
		display: flex;
		align-items: flex-end;
		gap: 8px;
		margin-top: 16px;
	}
	.dash-bar-col {
		flex: 1;
		background: linear-gradient(180deg, #f4d141, #8b6800);
		box-shadow: 0 0 10px rgba(244, 209, 65, 0.25);
	}
	.dash-bar-col.hi {
		background: linear-gradient(180deg, #f7de6e, #b46304);
		box-shadow: 0 0 16px rgba(244, 209, 65, 0.45);
	}

	.dash-donut {
		left: 620px;
		top: 164px;
		width: 360px;
		height: 236px;
		padding: 16px 18px;
	}
	.dash-donut-body {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 6px;
	}
	.dash-donut-svg {
		flex-shrink: 0;
		filter: drop-shadow(0 0 8px rgba(244, 209, 65, 0.3));
	}
	.dash-legend {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}
	.dash-legend-row {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		color: #f5f5f5;
	}
	.dash-legend-row .dot {
		width: 9px;
		height: 9px;
	}
	.dash-legend-row .pct {
		margin-left: auto;
		color: #b3b3b3;
		font-weight: 600;
	}

	.dash-line {
		left: 0;
		top: 420px;
		width: 980px;
		height: 140px;
		padding: 14px 18px;
	}
	.dash-line-svg {
		display: block;
		flex: none;
		width: 100%;
		height: 80px;
		margin-top: 8px;
		overflow: hidden;
	}

	.intro-tagline {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 96px;
		text-align: center;
		opacity: 0;
		pointer-events: none;
		padding: 0 1rem;
	}
	.intro-tagline span {
		font-size: clamp(0.95rem, 2.4vw, 1.6rem);
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #f5f5f5;
	}
	.intro-tagline .hi {
		color: #f4d141;
		text-shadow: 0 0 18px rgba(244, 209, 65, 0.55);
	}

	.intro-name {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 0;
		pointer-events: none;
		padding: 0 1rem;
	}
	.intro-name h2 {
		margin: 0;
		line-height: 0.84;
		letter-spacing: -0.04em;
		text-align: center;
	}
	.n-thin {
		display: block;
		font-size: clamp(3.2rem, 15vw, 15rem);
		font-weight: 200;
		color: #f5f5f5;
		text-shadow: 0 0 26px rgba(245, 245, 245, 0.28);
	}
	.n-bold {
		display: block;
		font-size: clamp(3.2rem, 15vw, 15rem);
		font-weight: 900;
		color: #f4d141;
		animation: introNamePulse 2.6s ease-in-out infinite;
	}
	.intro-roles {
		opacity: 0;
		margin: clamp(1.5rem, 2.6vw, 2.4rem) 0 0;
		font-size: clamp(0.7rem, 1.4vw, 0.95rem);
		font-weight: 700;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: #f4d141;
	}

	.intro-skip {
		position: absolute;
		top: 22px;
		right: 24px;
		z-index: 5;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		background: rgba(30, 30, 30, 0.6);
		border: 1px solid #2c2c2c;
		color: #b3b3b3;
		font-family: inherit;
		font-weight: 700;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s;
	}
	.intro-skip:hover,
	.intro-skip:focus-visible {
		color: #f4d141;
		border-color: #f4d141;
	}

	.intro-enter {
		position: absolute;
		left: 50%;
		bottom: 11%;
		transform: translateX(-50%);
		z-index: 5;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 2rem;
		background: #f4d141;
		color: #1a1a1a;
		font-family: inherit;
		font-weight: 800;
		font-size: 0.92rem;
		letter-spacing: 0.04em;
		border: none;
		cursor: pointer;
		box-shadow: 0 0 30px rgba(244, 209, 65, 0.5);
		animation: introEnterIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
		transition: transform 0.15s ease, box-shadow 0.2s ease;
	}
	.intro-enter:hover,
	.intro-enter:focus-visible {
		box-shadow: 0 0 44px rgba(244, 209, 65, 0.75);
	}
	.intro-enter:active {
		transform: translateX(-50%) scale(0.97);
	}

	@keyframes introDot {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 1;
		}
	}
	@keyframes introNamePulse {
		0%,
		100% {
			text-shadow: 0 0 24px rgba(244, 209, 65, 0.55), 0 0 64px rgba(244, 209, 65, 0.28);
		}
		50% {
			text-shadow: 0 0 34px rgba(244, 209, 65, 0.8), 0 0 90px rgba(244, 209, 65, 0.4);
		}
	}
	@keyframes introEnterIn {
		from {
			opacity: 0;
			transform: translate(-50%, 14px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@media (max-width: 700px) {
		.dash-kpi,
		.dash-card {
			border-width: 0.5px;
		}
	}
</style>
