// Decides whether the cathedral experience should run for this visitor.
// Must stay dependency-free: it is part of the eager bundle.

export type ExperienceMode = 'full' | 'lite' | 'none';

export const SEEN_KEY = 'architect:seen';

export function markSeen(): void {
	try {
		localStorage.setItem(SEEN_KEY, '1');
	} catch {
		// storage unavailable (private mode etc.) — experience will simply replay
	}
}

export function shouldRunExperience(): ExperienceMode {
	try {
		const params = new URLSearchParams(location.search);
		if (params.has('skip')) return 'none';

		const forced = params.has('experience');
		if (!forced) {
			if (localStorage.getItem(SEEN_KEY) === '1') return 'none';
			if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
				// Don't re-evaluate on every visit for reduced-motion users.
				markSeen();
				return 'none';
			}
		}

		const probe = document.createElement('canvas');
		const gl = probe.getContext('webgl2');
		if (!gl) {
			markSeen();
			return 'none';
		}

		const nav = navigator as Navigator & { deviceMemory?: number };
		const lite =
			(nav.deviceMemory !== undefined && nav.deviceMemory < 4) ||
			navigator.hardwareConcurrency <= 4 ||
			innerWidth < 768;

		return lite ? 'lite' : 'full';
	} catch {
		return 'none';
	}
}
