const SESSIONIZE_URL = 'https://sessionize.com/api/speaker/json/gg7g7z4ifh';

export interface SessionizeEvent {
	id: number;
	name: string;
	eventStartDate: string;
	eventEndDate: string;
	location: string | null;
	website: string | null;
}

export interface SessionizeSession {
	id: number;
	title: string;
	description: string | null;
	sessionUrl: string | null;
	languageCode: string;
	language: string;
}

export interface SessionizeSpeaker {
	firstName: string;
	lastName: string;
	tagline: string | null;
	bio: string | null;
	speakerProfileUrl: string | null;
	photoUrl: string | null;
	photoLargeUrl: string | null;
}

interface SessionizeResponse {
	speaker: SessionizeSpeaker;
	sessions: SessionizeSession[];
	events: SessionizeEvent[];
}

let cache: SessionizeResponse | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getSessionizeData(): Promise<SessionizeResponse> {
	if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;
	const res = await fetch(SESSIONIZE_URL);
	if (!res.ok) throw new Error(`Sessionize fetch failed: ${res.status}`);
	cache = await res.json();
	cacheTime = Date.now();
	return cache!;
}

export async function getSessionizeEvents(): Promise<{ upcoming: SessionizeEvent[]; past: SessionizeEvent[] }> {
	const data = await getSessionizeData();
	// Sessionize dates are zone-less midnights ('2026-07-05T00:00:00'), so an
	// event must stay "upcoming" until the end of its last day, not its start.
	const DAY_MS = 24 * 60 * 60 * 1000;
	const now = Date.now();
	const endOfEvent = (e: SessionizeEvent) => new Date(e.eventEndDate).getTime() + DAY_MS;
	const sorted = [...data.events].sort((a, b) => a.eventStartDate.localeCompare(b.eventStartDate));
	return {
		upcoming: sorted.filter(e => endOfEvent(e) > now),
		past: sorted.filter(e => endOfEvent(e) <= now).reverse()
	};
}

export async function getSessionizeSessions(): Promise<SessionizeSession[]> {
	const data = await getSessionizeData();
	return data.sessions;
}

export async function getSessionizeSpeaker(): Promise<SessionizeSpeaker> {
	const data = await getSessionizeData();
	return data.speaker;
}
