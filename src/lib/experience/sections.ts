// Pure data — no three.js imports here, this file is shared with the eager bundle.

export type Section = {
	id: string;
	range: [number, number];
	captions: string[];
};

export const SECTIONS: Section[] = [
	{ id: 'awakening', range: [0, 0.08], captions: [] },
	{
		id: 'foundations',
		range: [0.08, 0.22],
		captions: ['Most organisations never see their foundations.', 'Everything depends on them.']
	},
	{
		id: 'pillars',
		range: [0.22, 0.36],
		captions: ['Revenue is architecture. Performance is architecture.', 'Some structures depend on a single pillar.']
	},
	{ id: 'windows', range: [0.36, 0.5], captions: ['Customers illuminate everything.'] },
	{ id: 'decisions', range: [0.5, 0.64], captions: ['Every decision leaves fingerprints.'] },
	{
		id: 'library',
		range: [0.64, 0.76],
		captions: ['Most organisations already possess answers.', 'They simply cannot find them.']
	},
	{
		id: 'heart',
		range: [0.76, 0.88],
		captions: ['Technology alone changes nothing.', 'People create change.']
	},
	{
		id: 'reveal',
		range: [0.88, 1],
		captions: ['Every organisation builds a structure.', 'Some are designed.', 'Most are inherited.']
	}
];

export function sectionIndexFor(p: number): number {
	for (let i = SECTIONS.length - 1; i >= 0; i--) {
		if (p >= SECTIONS[i].range[0]) return i;
	}
	return 0;
}

// Camera keyframes. `at` is master scroll progress; pos/look are world coords.
// The cathedral runs along the z axis: entrance at +z, apse (the Heart) at -z.
export type CameraKey = { at: number; pos: [number, number, number]; look: [number, number, number] };

export const CAMERA_PATH: CameraKey[] = [
	{ at: 0.0, pos: [0, 2.5, 46], look: [0, 6, 0] }, // darkness, a point of light far ahead
	{ at: 0.1, pos: [0, 4, 34], look: [0, 0, 16] }, // looking down — the floor forms
	{ at: 0.22, pos: [0, 5, 24], look: [0, 3, 6] },
	{ at: 0.3, pos: [0, 7, 16], look: [0, 26, -6] }, // up into the pillars
	{ at: 0.4, pos: [-5, 10, 8], look: [14, 13, -6] }, // drifting past the windows
	{ at: 0.5, pos: [4, 9, 0], look: [-14, 12, -14] },
	{ at: 0.57, pos: [0, 8, -8], look: [0, 9, -20] }, // the hall of decisions
	{ at: 0.7, pos: [2, 9, -18], look: [-3, 11, -32] }, // through the library
	{ at: 0.82, pos: [0, 9, -28], look: [0, 10, -38] }, // approaching the heart
	{ at: 0.9, pos: [0, 24, -4], look: [0, 8, -22] }, // rising
	{ at: 1.0, pos: [0, 48, 54], look: [0, 10, -8] } // the summit — the whole structure
];
