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
	const now = new Date().toISOString();
	const sorted = [...data.events].sort((a, b) => a.eventStartDate.localeCompare(b.eventStartDate));
	return {
		upcoming: sorted.filter(e => e.eventEndDate >= now || e.eventStartDate >= now),
		past: sorted.filter(e => e.eventEndDate < now && e.eventStartDate < now).reverse()
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
