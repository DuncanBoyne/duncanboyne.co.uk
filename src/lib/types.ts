export interface Post {
	id: number;
	title: string;
	slug: string;
	content: string;
	excerpt: string | null;
	published_at: string | null;
	featured_image: string | null;
	tags: string[];
	created_at: string;
	updated_at: string;
}

export interface Event {
	id: number;
	title: string;
	description: string | null;
	event_date: string;
	location: string | null;
	event_url: string | null;
	event_type: string | null;
	talk_slug: string | null;
	slide_deck_url: string | null;
	created_at: string;
	updated_at: string;
}

export interface Talk {
	id: number;
	title: string;
	slug: string;
	content: string;
	excerpt: string | null;
	image: string | null;
	type: 'talk' | 'workshop';
	co_host_name: string | null;
	co_host_url: string | null;
	co_host_linkedin: string | null;
	created_at: string;
	updated_at: string;
}

export interface Video {
	id: number;
	title: string;
	youtube_id: string;
	description: string | null;
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface Book {
	id: number;
	title: string;
	slug: string;
	author: string;
	series: string | null;
	status: 'want_to_read' | 'reading' | 'completed';
	rating: number | null;
	tags: string[];
	started_at: string | null;
	finished_at: string | null;
	excerpt: string | null;
	review: string | null;
	image: string | null;
	created_at: string;
	updated_at: string;
}

export interface Anime {
	id: number;
	title: string;
	slug: string;
	seasons: number | null;
	episodes: number | null;
	year: number | null;
	status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';
	rating: number | null;
	tags: string[];
	started_at: string | null;
	finished_at: string | null;
	excerpt: string | null;
	review: string | null;
	image: string | null;
	created_at: string;
	updated_at: string;
}

export interface GamingAchievement {
	id: number;
	title: string;
	slug: string;
	game: string;
	achievement_type: string;
	value: string;
	season: string | null;
	rating: number | null;
	tags: string[];
	notes: string | null;
	image: string | null;
	created_at: string;
	updated_at: string;
}

export interface GirlfriendApplication {
	id: number;
	name: string | null;
	nickname: string | null;
	favourite_snack: string | null;
	sass_line: string | null;
	assets: string[];
	relationship_mode: string | null;
	dog_compatibility_plan: string | null;
	dogs_board_members: 'yes' | 'no';
	dog_favourite_plan: string | null;
	chicken_authority: number;
	named_chicken_legal: 'yes' | 'no' | null;
	building_type: string | null;
	traits: string[];
	roast_when_needed: boolean;
	protect_when_needed: boolean;
	eye_roll_sometimes: boolean;
	love_wiser: boolean;
	believe_again: string;
	five_year_vision: string;
	final_answer: string;
	created_at: string;
}

export interface TalkFeedback {
	id: number;
	quote: string;
	attribution_name: string;
	attribution_role: string | null;
	attribution_url: string | null;
	talk_slug: string | null;
	event_id: number | null;
	featured: boolean;
	sort_order: number;
	created_at: string;
}

// Database types for Supabase
export interface Database {
	public: {
		Tables: {
			posts: {
				Row: Post;
				Insert: Omit<Post, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>;
			};
			events: {
				Row: Event;
				Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
			};
			talks: {
				Row: Talk;
				Insert: Omit<Talk, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Talk, 'id' | 'created_at' | 'updated_at'>>;
			};
			videos: {
				Row: Video;
				Insert: Omit<Video, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Video, 'id' | 'created_at' | 'updated_at'>>;
			};
			books: {
				Row: Book;
				Insert: Omit<Book, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Book, 'id' | 'created_at' | 'updated_at'>>;
			};
			anime: {
				Row: Anime;
				Insert: Omit<Anime, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Anime, 'id' | 'created_at' | 'updated_at'>>;
			};
			gaming_achievements: {
				Row: GamingAchievement;
				Insert: Omit<GamingAchievement, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<GamingAchievement, 'id' | 'created_at' | 'updated_at'>>;
			};
			girlfriend_applications: {
				Row: GirlfriendApplication;
				Insert: Omit<GirlfriendApplication, 'id' | 'created_at'>;
				Update: Partial<Omit<GirlfriendApplication, 'id' | 'created_at'>>;
			};
		};
	};
}
