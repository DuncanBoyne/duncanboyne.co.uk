-- The Colour Crash — blog post + video row
-- Video: https://youtu.be/E6eS_n4sl_E   Report: https://app.powerbi.com/view?r=eyJrIjoiMjk1NWFjYzktZTQ1Zi00OTQyLWE3ZWUtODNkNjMzZGU0ZTg5IiwidCI6IjA4Zjg2MmI1LTNhM2EtNGM1OC1iZmFlLTdlNTZiMWRiMDc5ZSJ9
--
-- BEFORE RUNNING:
--   1. Drop the thumbnail into static/ as `the-colour-crash.png` (featured_image below).
--   2. src/lib/markdown.ts ALLOWED_IFRAME_HOSTS now includes www.youtube.com — the
--      YouTube embed below is stripped without it. Deploy that change with this post.

INSERT INTO posts (title, slug, content, excerpt, published_at, featured_image, tags)
VALUES (
  'The Colour Crash',
  'the-colour-crash',
  $$I submitted.

Eight days before the deadline. Not at 11:58pm with my heart going. Eight days. If you read [the report I never submitted](/blog/the-report-i-never-submitted), you'll know why that sentence took some work.

This one is Round 2 of the Power BI Dataviz World Championships. The dataset is Rebrickable's public LEGO database: every set, every part, every colour since 1949. And the story I found in it is better than anything I found in Round 1.

There's a video now too. I've started a YouTube channel with the same name as the newsletter, and the first episode is the full walkthrough of this build.

<iframe width="800" height="450" src="https://www.youtube.com/embed/E6eS_n4sl_E" title="The Colour Crash - Power BI, But Why? Ep. 01" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## What the colours were hiding

For thirty years, LEGO used about ten colours a year. Then the line starts climbing. Twenty-four by 1985. Forty-two by 1997.

Then it goes vertical. Twenty-five brand-new colours in 2003 alone. Fourteen more in 2004. Peak: **113 colours in a single year**.

And in that exact year, LEGO was closer to bankruptcy than at any point in its history. That's not my analysis, it's public record. New management arrived in 2004 and started cutting everything that didn't earn its place.

You can watch the cuts happen in the palette. Fifteen colours retired in 2004. Eighteen in 2005. Twenty-eight in 2006. Sixty-one colours killed in three years, against twenty-five in the whole of the 1990s. By 2009 the palette was down to 59.

Nobody at LEGO typed any of that into a report. The palette is the crisis, made visible.

So the entry is called The Colour Crash. Five pages, three acts: the mania, the purge, and what grew back. It's live and clickable, right here. Go and poke the river.

<iframe title="World Champs BCN 26 - Round 2" width="800" height="498" src="https://app.powerbi.com/view?r=eyJrIjoiMjk1NWFjYzktZTQ1Zi00OTQyLWE3ZWUtODNkNjMzZGU0ZTg5IiwidCI6IjA4Zjg2MmI1LTNhM2EtNGM1OC1iZmFlLTdlNTZiMWRiMDc5ZSJ9" frameborder="0" allowfullscreen></iframe>

## My favourite page is a graveyard

Act II holds a memorial wall for the purge casualties.

Light Gray. In service 1954 to 2007. 92,813 parts across 25,173 sets. Fifty-three years of loyal work, retired anyway, and replaced by Light Bluish Gray, a colour just different enough to clash with every grey brick anyone already owned. Adult fans christened the new grey "bley" and staged the angriest forum threads the hobby has ever seen.

Each casualty gets its swatch, its lifespan, and its most-made brick, photo included. Click a colour and a card reveals the brick. It's the closest a data table gets to a headstone.

And one more thing the data volunteered. Red was 26.6% of all LEGO parts in the 1960s. It's 5% now. Yellow peaked at 15%, it's under 3%. The colours in LEGO's own logo went from 39% of everything they made to 8%.

LEGO no longer looks like its logo. The logo just hasn't noticed yet.

## The bits that fought back

The video covers these in their full glory, but the short version, because if I pretend nothing went wrong you should stop reading.

The hero visual is a Deneb streamgraph, and Deneb silently truncated it at 1985 until I found the data-limit override. A sort column created a circular dependency that stopped the file opening at all, and every validation tool passed it. Brick photos in tooltips turned out to be impossible twice over, which is how the click-to-reveal card was born.

And then, with everything built and validated, Power BI refused to save the .pbix. Every name, every location, the same generic dialog. Two days of ruling things out.

The culprit was a single space. The theme file was named `The Colour Crash.json`, and a .pbix is a zip package underneath, where part names can't contain spaces. No error message says this. Nothing validates it. Renamed with underscores, saved first try.

A space. In a filename. Two days.

## Go and see the rest

My submission post, with the full write-up: [The Colour Crash on the Fabric community forum](https://community.fabric.microsoft.com/t5/Contests-Gallery/The-Colour-Crash-World-Championship-BCN-Submission/td-p/5284619)

The competition is Data Days Create, and Round 2 closes on 19 July: [Data Days | Create](https://community.fabric.microsoft.com/t5/Power-BI-Community-Blog/Data-Days-Create/ba-p/5196221)

Every entry is published in the open, and some of them are terrifying: [the contests gallery](https://community.fabric.microsoft.com/t5/Contests-Gallery/bd-p/pbi_contestsgallery?sortby=postdate)

I have no idea where The Colour Crash will land. But last time I wrote that an unfinished report scores nothing, and a report you never send scores exactly the same.

This one's in. Zero is off the table.$$,
  'LEGO went from ten colours a year to 113, then crashed to 59. The company nearly died in the middle, and nobody wrote that story down. The data recorded it anyway. My Power BI Dataviz World Champs entry, live and clickable, plus everything that broke on the way.',
  NOW(),
  '/the-colour-crash.png',
  '{"Power BI", "Data Visualisation", "Deneb", "LEGO", "Dataviz World Champs", "Data Storytelling"}'
);

-- Episode 1 of the YouTube channel
INSERT INTO videos (title, youtube_id, description, published_at)
VALUES (
  'LEGO nearly went bankrupt. The bricks knew first.',
  'E6eS_n4sl_E',
  $$LEGO went from ten colours a year to 113, then crashed to 59. The company nearly died in the middle, and nobody wrote that story down. The data recorded it anyway. Episode 1 of Power BI, But Why? — the full walkthrough of The Colour Crash, my entry for Round 2 of the Power BI Dataviz World Championships. Including the two days Power BI refused to save the file because of a single space.$$,
  NOW()
);
