-- FIX: the original insert claimed the video covers the build failures (the .pbix
-- save crisis, the Deneb truncation, the circular dependency). It does not — the
-- transcript confirms Duncan never mentions them on camera. The blog can still tell
-- those stories (they happened), it just must not send viewers to the video for them.
--
-- Also swaps the "favourite page is a graveyard" numbers to the ones actually spoken,
-- and adds the colour-blindness beat, which is the strongest thing in the video and
-- was missing from the post entirely.

UPDATE posts
SET content = replace(
  content,
  'The video covers these in their full glory, but the short version, because if I pretend nothing went wrong you should stop reading.',
  'None of this made the video. It is the part I only tell in writing, because if I pretend nothing went wrong you should stop reading.'
)
WHERE slug = 'the-colour-crash';

-- The video description promised the save story too. Replace it with what the video
-- actually delivers: the accessibility segment and the colour-blindness reveal.
UPDATE videos
SET description = $$LEGO went from ten colours a year to 113, then crashed to 59. The company nearly died in the middle, and nobody wrote that story down. The data recorded it anyway.

Episode 1 of Power BI, But Why? — the full walkthrough of The Colour Crash, my entry for Round 2 of the Power BI Dataviz World Championships. The river of colour, the colours that got purged, the greys I grew up with, and why a quarter of the marks go to accessibility in a report built entirely out of colour, made by someone who is colour blind.$$
WHERE youtube_id = 'E6eS_n4sl_E';
