-- The Architect — making-of blog post. Video: https://youtu.be/7VC4QNzNkCo
INSERT INTO posts (title, slug, content, excerpt, published_at, featured_image, tags)
VALUES (
  'I Asked AI for a Website. It Built a Cathedral.',
  'the-architect',
  $$Nothing on the front door of this website is an image. Every stone is code.

<iframe width="100%" style="aspect-ratio:16/9;" src="https://www.youtube.com/embed/7VC4QNzNkCo" title="I asked AI for a website. It built a cathedral." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

When Claude Fable dropped, my feed did what it always does with a new model: the same demo on repeat. Landing page. SaaS dashboard. To-do app. Clean. Fast. Identical.

Nobody was asking whether it could build something you'd *remember*. So I gave it a brief that shouldn't work.

## The brief

> Build me a living cathedral, where the organisation is the building.

Every organisation is a structure. Some are intentionally designed. Most are inherited. So the metaphor writes itself, if you let it:

**The floor is data quality.** Some tiles are flawless. Some are cracked and sunken, with gold light running through the fractures. Most organisations never see their foundations — and everything depends on them.

**The pillars are revenue.** One of them is carrying far too much weight. You can watch it straining. Some structures depend on a single pillar, and everyone in the building knows which one it is.

**The stained glass is customers.** Vibrant where the relationships are healthy. Dark where they're dying. Without the windows, there's no light at all.

And halfway through, a Hall of Decisions. Click "ignore reporting" and cracks spread across the entire foundation while you watch. The building remembers what you chose for the rest of the walk. Every decision leaves fingerprints.

## The bits that broke

If you pretend things don't go wrong, you yourself are pretend. So, in fairness:

The first version trapped you in the Hall of Decisions. Couldn't scroll forwards. Couldn't scroll back. (Genuinely the most accurate simulation of corporate decision-making I've ever shipped.) The fix was a browser quirk — fixed-position elements don't pass scroll events to the container underneath them, so the moment the hall became clickable, it stopped being walkable.

The big reveal at the end was unreadable, because twenty-four thousand glowing particles make a terrible background for typography. And for most of a day there was an unexplained glowing yellow ball visible from the entrance, which turned out to be the heart of the building showing up four rooms early. Even cathedrals have bugs.

## How it's put together

There are no image files in the experience. No textures, no sound files, no 3D assets. The geometry is procedural, the stained glass is a voronoi shader, the dissolve at the summit is a particle system sampled from the building's own surfaces, and the soundscape — the drones, the cathedral reverb, the pulse of the heart — is generated note-by-note in code.

It's built with Claude, Three.js, Threlte and SvelteKit, it respects reduced-motion preferences, it works with a keyboard, and if you've already walked it, it gets out of your way and never loads again.

You can walk it yourself: [duncanboyne.co.uk/?experience](/?experience). There's a hidden glowing book in the library. It knows something.

## Faster horses

People keep using AI to build faster horses. Same landing page, same template, just quicker. But the tool was never the interesting part — it'll build whatever you can describe.

Which means the only question left is the old one: is your idea worth building?

I'm going to keep finding out on [The AI Strategy Playbook](https://www.youtube.com/channel/UCvhoXbsfT_iR21st4HTccMg). Come and watch me try.$$,
  'When Claude Fable dropped, everyone built the same landing page. I asked it for a living cathedral instead — where the floor is data quality, the pillars are revenue, and your decisions crack the foundations while you watch. Here''s what it built, what broke, and why the idea still matters more than the tool.',
  '2026-06-10T00:00:00.000Z',
  '/blog/the-architect/cover.jpg',
  '{"AI"}'
);
