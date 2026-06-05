import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl || '', supabaseAnonKey || '');

// Helper functions for data fetching

export async function getPosts(limit?: number) {
	let query = supabase
		.from('posts')
		.select('*')
		.order('published_at', { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

export async function getPostBySlug(slug: string) {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data;
}

export async function getEvents(upcoming = true) {
	const now = new Date().toISOString();
	let query = supabase.from('events').select('*');

	if (upcoming) {
		query = query.gte('event_date', now).order('event_date', { ascending: true });
	} else {
		query = query.lt('event_date', now).order('event_date', { ascending: false });
	}

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

export async function getTalks() {
	const { data, error } = await supabase
		.from('talks')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

export async function getTalkBySlug(slug: string) {
	const { data, error } = await supabase
		.from('talks')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data;
}

export async function getEventsByTalkSlug(talkSlug: string) {
	const { data, error } = await supabase
		.from('events')
		.select('*')
		.eq('talk_slug', talkSlug)
		.order('event_date', { ascending: true });

	if (error) throw error;
	return data;
}

export async function getVideos(limit?: number) {
	let query = supabase
		.from('videos')
		.select('*')
		.order('published_at', { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

export async function getBooks() {
	const { data, error } = await supabase
		.from('books')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

export async function getBookBySlug(slug: string) {
	const { data, error } = await supabase
		.from('books')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data;
}

export async function getAnime() {
	const { data, error } = await supabase
		.from('anime')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

export async function getAnimeBySlug(slug: string) {
	const { data, error } = await supabase
		.from('anime')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) throw error;
	return data;
}

export async function getYearInNumbers() {
	const year = new Date().getFullYear();
	const yearStart = `${year}-01-01T00:00:00.000Z`;
	const now = new Date().toISOString();

	const [postsRes, eventsRes, talksRes, booksRes] = await Promise.all([
		supabase
			.from('posts')
			.select('*', { count: 'exact', head: true })
			.gte('published_at', yearStart),
		supabase
			.from('events')
			.select('*', { count: 'exact', head: true })
			.gte('event_date', yearStart)
			.lt('event_date', now),
		supabase
			.from('events')
			.select('*', { count: 'exact', head: true })
			.gte('event_date', yearStart)
			.lt('event_date', now)
			.not('talk_slug', 'is', null),
		supabase
			.from('books')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'completed')
			.gte('finished_at', yearStart)
	]);

	return {
		posts: postsRes.count ?? 0,
		events: eventsRes.count ?? 0,
		talks: talksRes.count ?? 0,
		books: booksRes.count ?? 0
	};
}

export async function getGamingAchievements() {
	const { data, error } = await supabase
		.from('gaming_achievements')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

export async function getFeaturedFeedback() {
	const { data, error } = await supabase
		.from('talk_feedback')
		.select('*')
		.eq('featured', true)
		.order('sort_order', { ascending: true });

	if (error) throw error;
	return data;
}

export async function getFeedbackByTalkSlug(talkSlug: string) {
	const { data, error } = await supabase
		.from('talk_feedback')
		.select('*')
		.eq('talk_slug', talkSlug)
		.order('sort_order', { ascending: true });

	if (error) throw error;
	return data;
}

export async function submitGirlfriendApplication(
	application: Database['public']['Tables']['girlfriend_applications']['Insert']
) {
	const { error } = await supabase
		.from('girlfriend_applications' as never)
		.insert(application as never);

	if (error) throw error;
}
