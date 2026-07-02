// Decides whether the chaos-to-clarity intro should run for this visitor.
// Must stay dependency-free: it is part of the eager bundle (also inlined in app.html).

export const SEEN_KEY = 'intro:seen';

export function markSeen(): void {
	try {
		localStorage.setItem(SEEN_KEY, '1');
	} catch {
		// storage unavailable (private mode etc.) — intro will simply replay
	}
}

export function shouldRunIntro(): boolean {
	try {
		const params = new URLSearchParams(location.search);
		if (params.has('skip')) return false;
		if (params.has('intro')) return true;

		if (localStorage.getItem(SEEN_KEY) === '1') return false;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			markSeen();
			return false;
		}
		return true;
	} catch {
		return false;
	}
}
