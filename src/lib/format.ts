// Shared date formatting. 'short' is the list/card style ("3 Jul 2026"),
// 'long' the article-header style ("3 July 2026"), 'weekday' the event style
// ("Fri, 3 Jul 2026"). en-GB everywhere.

const FORMATS = {
	short: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
	long: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
	weekday: new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
};

export function formatDate(date: string, style: keyof typeof FORMATS = 'short'): string {
	return FORMATS[style].format(new Date(date));
}
