// Photo gallery — auto-discovered from folders.
//
// To add photos:
//   1. Create a folder in  src/lib/gallery-images/  named  "<Event Name> <Year>"
//      e.g.  "Experts Live UK 2026"
//   2. Drop the .jpg / .jpeg / .png / .webp / .avif files into it.
// That's it — the gallery picks them up automatically and groups them by event.
//
// The trailing 4-digit year in the folder name becomes the displayed year and
// is stripped from the heading ("Experts Live UK 2026" -> "Experts Live UK" + 2026).
//
// Optional: add a location for an event in EVENT_META below (keyed by folder name).

const EVENT_META: Record<string, { location?: string }> = {
	'Experts Live UK 2026': { location: 'CodeNode, London' }
};

// Vite scans these at build time and rewrites each path to its final hashed URL.
const modules = import.meta.glob('./gallery-images/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

export type GalleryPhoto = {
	src: string;
	alt: string;
};

export type GalleryEvent = {
	name: string;
	year: number | null;
	location?: string;
	photos: GalleryPhoto[];
};

function parseFolder(folder: string): { name: string; year: number | null } {
	const match = folder.match(/^(.*?)[\s_-]*(\d{4})$/);
	if (match) return { name: match[1].trim(), year: Number(match[2]) };
	return { name: folder, year: null };
}

// Group discovered files by their immediate parent folder.
const byFolder = new Map<string, string[]>();
for (const path of Object.keys(modules)) {
	// path looks like  ./gallery-images/Experts Live UK 2026/eluk26-xxx.jpg
	const parts = path.split('/');
	const folder = parts[parts.length - 2];
	if (!byFolder.has(folder)) byFolder.set(folder, []);
	byFolder.get(folder)!.push(path);
}

export const galleryEvents: GalleryEvent[] = [...byFolder.entries()]
	.map(([folder, paths]) => {
		const { name, year } = parseFolder(folder);
		const meta = EVENT_META[folder] ?? {};
		const photos: GalleryPhoto[] = paths
			.sort((a, b) => a.localeCompare(b))
			.map((p) => ({
				src: modules[p],
				alt: `${name}${year ? ` ${year}` : ''}`
			}));
		return { name, year, location: meta.location, photos };
	})
	// Newest year first; events sharing a year fall back to name order.
	.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));

// Flat list of every photo, in display (event) order — used by the lightbox.
export const galleryPhotos: GalleryPhoto[] = galleryEvents.flatMap((e) => e.photos);
