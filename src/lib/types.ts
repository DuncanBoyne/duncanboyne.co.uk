export type Post = {
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

// List views, feeds and the sitemap never need the markdown body.
export type PostSummary = Omit<Post, 'content'>;

export type Event = {
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

export type Talk = {
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

export type Video = {
	id: number;
	title: string;
	youtube_id: string;
	description: string | null;
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

export type Book = {
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

export type Anime = {
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

export type GamingAchievement = {
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

export type TalkFeedback = {
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

// Database types for Supabase.
// Each table needs Relationships, and the schema needs Views/Functions/Enums/
// CompositeTypes, or supabase-js's GenericSchema constraint fails and every
// row type collapses to `never`.
type TableDef<RowType, OmitKeys extends keyof RowType> = {
	Row: RowType;
	Insert: Omit<RowType, OmitKeys>;
	Update: Partial<Omit<RowType, OmitKeys>>;
	Relationships: [];
};

export type Database = {
	public: {
		Tables: {
			posts: TableDef<Post, 'id' | 'created_at' | 'updated_at'>;
			events: TableDef<Event, 'id' | 'created_at' | 'updated_at'>;
			talks: TableDef<Talk, 'id' | 'created_at' | 'updated_at'>;
			videos: TableDef<Video, 'id' | 'created_at' | 'updated_at'>;
			books: TableDef<Book, 'id' | 'created_at' | 'updated_at'>;
			anime: TableDef<Anime, 'id' | 'created_at' | 'updated_at'>;
			gaming_achievements: TableDef<GamingAchievement, 'id' | 'created_at' | 'updated_at'>;
			talk_feedback: TableDef<TalkFeedback, 'id' | 'created_at'>;
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
}
