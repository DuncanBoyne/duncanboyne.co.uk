import type { Anime, Book } from './types';

// Status badge labels and colours, shared by the card components and the
// matching detail pages so the two views can never drift apart.

export const animeStatusLabels: Record<Anime['status'], string> = {
	watching: 'Watching',
	completed: 'Completed',
	on_hold: 'On Hold',
	dropped: 'Dropped',
	plan_to_watch: 'Plan to Watch'
};

export const animeStatusColors: Record<Anime['status'], string> = {
	watching: 'bg-warning/20 text-warning',
	completed: 'bg-success/20 text-success',
	on_hold: 'bg-info/20 text-info',
	dropped: 'bg-error/20 text-error',
	plan_to_watch: 'bg-muted/20 text-muted'
};

export const bookStatusLabels: Record<Book['status'], string> = {
	want_to_read: 'Want to Read',
	reading: 'Reading',
	completed: 'Completed'
};

export const bookStatusColors: Record<Book['status'], string> = {
	want_to_read: 'bg-info/20 text-info',
	reading: 'bg-warning/20 text-warning',
	completed: 'bg-success/20 text-success'
};
