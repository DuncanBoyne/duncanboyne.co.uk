/**
 * Procedural impulse response: 4 seconds of exponentially decaying stereo
 * noise reads as a large stone interior. Zero asset downloads.
 */
export function createCathedralImpulse(ctx: AudioContext): AudioBuffer {
	const seconds = 4;
	const rate = ctx.sampleRate;
	const length = Math.floor(seconds * rate);
	const buffer = ctx.createBuffer(2, length, rate);

	for (let channel = 0; channel < 2; channel++) {
		const data = buffer.getChannelData(channel);
		let last = 0;
		for (let i = 0; i < length; i++) {
			const t = i / length;
			const decay = Math.exp(-3.2 * t);
			// one-pole lowpass on the noise removes harsh top end
			const white = Math.random() * 2 - 1;
			last = last * 0.82 + white * 0.18;
			data[i] = last * decay;
		}
	}
	return buffer;
}
