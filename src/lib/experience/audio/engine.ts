import { createCathedralImpulse } from './impulse';

const MUTE_KEY = 'architect:muted';

/**
 * Fully procedural soundscape:
 *
 *   sine 55Hz ─┐
 *   sine 110.6Hz ─┤→ lowpass (scroll-mapped) → droneGain ─┐
 *   noise loop → bandpass (scroll-mapped) → noiseGain ────┤→ dry ─┐
 *   sub 40Hz × LFO gate (the heart) → pulseGain ──────────┘       ├→ master → out
 *                              └→ convolver (cathedral IR) → wet ─┘
 *
 * Created only after a user gesture; parameters follow scroll progress.
 */
export class AudioEngine {
	private ctx: AudioContext;
	private master: GainNode;
	private droneFilter: BiquadFilterNode;
	private droneGain: GainNode;
	private noiseFilter: BiquadFilterNode;
	private noiseGain: GainNode;
	private pulseGain: GainNode;
	private pulseLfoGain: GainNode;
	private muted: boolean;
	private disposed = false;
	private onVisibility = () => {
		if (this.disposed) return;
		if (document.hidden) void this.ctx.suspend();
		else if (!this.muted) void this.ctx.resume();
	};

	constructor() {
		this.ctx = new AudioContext();
		void this.ctx.resume();

		this.master = this.ctx.createGain();
		this.master.gain.value = 0;
		this.master.connect(this.ctx.destination);

		// wet/dry split through the cathedral
		const dry = this.ctx.createGain();
		dry.gain.value = 0.55;
		dry.connect(this.master);
		const convolver = this.ctx.createConvolver();
		convolver.buffer = createCathedralImpulse(this.ctx);
		const wet = this.ctx.createGain();
		wet.gain.value = 0.8;
		convolver.connect(wet);
		wet.connect(this.master);
		const bus = this.ctx.createGain();
		bus.connect(dry);
		bus.connect(convolver);

		// two detuned drones through a slowly opening lowpass
		this.droneFilter = this.ctx.createBiquadFilter();
		this.droneFilter.type = 'lowpass';
		this.droneFilter.frequency.value = 160;
		this.droneFilter.Q.value = 0.7;
		this.droneGain = this.ctx.createGain();
		this.droneGain.gain.value = 0.05;
		this.droneFilter.connect(this.droneGain);
		this.droneGain.connect(bus);

		const oscA = this.ctx.createOscillator();
		oscA.type = 'sine';
		oscA.frequency.value = 55;
		const oscB = this.ctx.createOscillator();
		oscB.type = 'sine';
		oscB.frequency.value = 110.6; // slight detune against the octave
		oscA.connect(this.droneFilter);
		oscB.connect(this.droneFilter);
		oscA.start();
		oscB.start();

		// airy noise through a sweeping bandpass — the "light" of the windows
		const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
		const noiseData = noiseBuffer.getChannelData(0);
		for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
		const noise = this.ctx.createBufferSource();
		noise.buffer = noiseBuffer;
		noise.loop = true;
		this.noiseFilter = this.ctx.createBiquadFilter();
		this.noiseFilter.type = 'bandpass';
		this.noiseFilter.frequency.value = 400;
		this.noiseFilter.Q.value = 9;
		this.noiseGain = this.ctx.createGain();
		this.noiseGain.gain.value = 0;
		noise.connect(this.noiseFilter);
		this.noiseFilter.connect(this.noiseGain);
		this.noiseGain.connect(bus);
		noise.start();

		// the heart: a 40Hz sub gated by a slow LFO
		const sub = this.ctx.createOscillator();
		sub.type = 'sine';
		sub.frequency.value = 40;
		this.pulseLfoGain = this.ctx.createGain();
		this.pulseLfoGain.gain.value = 0;
		const lfo = this.ctx.createOscillator();
		lfo.type = 'sine';
		lfo.frequency.value = 0.35;
		const lfoDepth = this.ctx.createGain();
		lfoDepth.gain.value = 0.5;
		lfo.connect(lfoDepth);
		lfoDepth.connect(this.pulseLfoGain.gain);
		this.pulseGain = this.ctx.createGain();
		this.pulseGain.gain.value = 0;
		sub.connect(this.pulseLfoGain);
		this.pulseLfoGain.connect(this.pulseGain);
		this.pulseGain.connect(bus);
		sub.start();
		lfo.start();

		this.muted = sessionStorage.getItem(MUTE_KEY) === '1';
		if (!this.muted) {
			this.master.gain.setTargetAtTime(0.85, this.ctx.currentTime, 1.2);
		}

		document.addEventListener('visibilitychange', this.onVisibility);
	}

	/** Map master scroll progress to the soundscape. */
	setProgress(p: number): void {
		if (this.disposed) return;
		const t = this.ctx.currentTime;
		const smooth = 0.35;

		// everything thins to silence as the cathedral dissolves
		const endFade = p > 0.92 ? Math.max(0, (1 - p) / 0.08) : 1;

		this.droneFilter.frequency.setTargetAtTime(160 + p * 740, t, smooth);
		this.droneGain.gain.setTargetAtTime((0.05 + p * 0.035) * endFade, t, smooth);

		// noise blooms through the windows, lingers in the library
		const windowsBump = Math.exp(-Math.pow((p - 0.43) / 0.09, 2));
		const libraryBump = 0.5 * Math.exp(-Math.pow((p - 0.7) / 0.07, 2));
		this.noiseFilter.frequency.setTargetAtTime(350 + p * 1400, t, smooth);
		this.noiseGain.gain.setTargetAtTime(0.02 * endFade * (0.3 + windowsBump + libraryBump), t, smooth);

		// the heart's pulse swells on approach
		const heartBump = Math.exp(-Math.pow((p - 0.82) / 0.08, 2));
		this.pulseGain.gain.setTargetAtTime(0.16 * heartBump * endFade, t, smooth);
	}

	get isMuted(): boolean {
		return this.muted;
	}

	setMuted(muted: boolean): void {
		if (this.disposed) return;
		this.muted = muted;
		try {
			sessionStorage.setItem(MUTE_KEY, muted ? '1' : '0');
		} catch {
			// storage unavailable — mute state just won't persist
		}
		this.master.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.15);
	}

	dispose(): void {
		if (this.disposed) return;
		this.disposed = true;
		document.removeEventListener('visibilitychange', this.onVisibility);
		this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
		setTimeout(() => void this.ctx.close(), 1200);
	}
}
