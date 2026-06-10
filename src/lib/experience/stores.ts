import { writable, derived, type Readable } from 'svelte/store';
import { SECTIONS, sectionIndexFor } from './sections';

/** Master scroll progress through the experience, 0..1. */
export const scrollProgress = writable(0);

/** Index into SECTIONS for the current scroll position. */
export const currentSection = derived(scrollProgress, sectionIndexFor);

/** Local 0..1 progress within section i. */
export function sectionProgress(i: number): Readable<number> {
	const [a, b] = SECTIONS[i].range;
	return derived(scrollProgress, (p) => Math.min(1, Math.max(0, (p - a) / (b - a))));
}

/** True while the overlay experience is running (used to inert the page beneath). */
export const experienceActive = writable(false);

export const qualityTier = writable<'high' | 'lite'>('high');

/** Hall of Decisions choices; persist for the rest of the journey. */
export const decisions = writable<Record<string, boolean>>({});

/** Ephemeral whisper line (decision consequences, hidden discoveries). */
export const whisper = writable<string | null>(null);
