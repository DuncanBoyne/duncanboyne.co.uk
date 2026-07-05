import { createClient } from '@supabase/supabase-js';
import type { Database, Post, PostSummary, Event, Talk, Video, Book, Anime, GamingAchievement, TalkFeedback } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Fail fast with a clear message: supabase-js throws a cryptic error on an
// empty URL at module load, which otherwise surfaces mid-prerender.
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and fill in the Supabase project keys.'
	);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for data fetching

// Everything list views, feeds and the sitemap need — without `content`,
// so the full markdown body of every post is never shipped to index pages.
const POST_SUMMARY_COLUMNS =
	'id,slug,title,excerpt,published_at,featured_image,tags,created_at,updated_at';

export async function getPosts(limit?: number): Promise<PostSummary[]> {
	let query = supabase
		.from('posts')
		.select(POST_SUMMARY_COLUMNS)
		.order('published_at', { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) throw error;
	return (data ?? []) as PostSummary[];
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data as Post;
}

export async function getEvents(upcoming = true, limit?: number): Promise<Event[]> {
	const now = new Date().toISOString();
	let query = supabase.from('events').select('*');

	if (upcoming) {
		query = query.gte('event_date', now).order('event_date', { ascending: true });
	} else {
		query = query.lt('event_date', now).order('event_date', { ascending: false });
	}

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) throw error;
	return (data ?? []) as Event[];
}

export async function getTalks(): Promise<Talk[]> {
	const { data, error } = await supabase
		.from('talks')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return (data ?? []) as Talk[];
}

export async function getTalkBySlug(slug: string): Promise<Talk> {
	const { data, error } = await supabase
		.from('talks')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data as Talk;
}

export async function getEventsByTalkSlug(talkSlug: string): Promise<Event[]> {
	const { data, error } = await supabase
		.from('events')
		.select('*')
		.eq('talk_slug', talkSlug)
		.order('event_date', { ascending: true });

	if (error) throw error;
	return (data ?? []) as Event[];
}

export async function getVideos(limit?: number): Promise<Video[]> {
	let query = supabase
		.from('videos')
		.select('*')
		.order('published_at', { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) throw error;
	return (data ?? []) as Video[];
}

export async function getBooks(): Promise<Book[]> {
	const { data, error } = await supabase
		.from('books')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return (data ?? []) as Book[];
}

export async function getBookBySlug(slug: string): Promise<Book> {
	const { data, error } = await supabase
		.from('books')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data as Book;
}

export async function getAnime(): Promise<Anime[]> {
	const { data, error } = await supabase
		.from('anime')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return (data ?? []) as Anime[];
}

export async function getAnimeBySlug(slug: string): Promise<Anime> {
	const { data, error } = await supabase
		.from('anime')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data as Anime;
}

// Related-item lookups: one filtered query instead of fetching the whole
// table client-side and discarding everything but three rows.

export async function getRelatedAnime(current: Anime, count = 3): Promise<Anime[]> {
	if (!current.tags?.length) return [];
	const { data, error } = await supabase
		.from('anime')
		.select('*')
		.neq('id', current.id)
		.overlaps('tags', current.tags)
		.order('created_at', { ascending: false })
		.limit(count);

	if (error) throw error;
	return (data ?? []) as Anime[];
}

export async function getRelatedBooks(current: Book, count = 3): Promise<Book[]> {
	if (!current.tags?.length) return [];
	const { data, error } = await supabase
		.from('books')
		.select('*')
		.neq('id', current.id)
		.overlaps('tags', current.tags)
		.order('created_at', { ascending: false })
		.limit(count);

	if (error) throw error;
	return (data ?? []) as Book[];
}

export async function getGamingAchievements(): Promise<GamingAchievement[]> {
	const { data, error } = await supabase
		.from('gaming_achievements')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return (data ?? []) as GamingAchievement[];
}

export async function getFeaturedFeedback(): Promise<TalkFeedback[]> {
	const { data, error } = await supabase
		.from('talk_feedback')
		.select('*')
		.eq('featured', true)
		.order('sort_order', { ascending: true });

	if (error) throw error;
	return (data ?? []) as TalkFeedback[];
}

export async function getFeedbackByTalkSlug(talkSlug: string): Promise<TalkFeedback[]> {
	const { data, error } = await supabase
		.from('talk_feedback')
		.select('*')
		.eq('talk_slug', talkSlug)
		.order('sort_order', { ascending: true });

	if (error) throw error;
	return (data ?? []) as TalkFeedback[];
}
