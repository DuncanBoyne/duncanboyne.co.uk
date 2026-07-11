-- The YouTube embed was being stripped at render: ALLOWED_IFRAME_HOSTS in
-- src/lib/markdown.ts only permitted app.powerbi.com. That is fixed and deployed,
-- but the post relied on the iframe alone, so a stripped embed left no link at all.
-- Add a plain markdown link alongside it as belt and braces.

UPDATE posts
SET content = replace(
  content,
  'There''s a video now too. I''ve started a YouTube channel with the same name as the newsletter, and the first episode is the full walkthrough of this build.',
  'There''s a video now too. I''ve started a YouTube channel with the same name as the newsletter, and the first episode is the full walkthrough of this build: [The Colour Crash on YouTube](https://youtu.be/E6eS_n4sl_E).'
)
WHERE slug = 'the-colour-crash';

-- Confirm both the link and the two embeds survived.
SELECT
  slug,
  featured_image,
  content LIKE '%youtu.be/E6eS_n4sl_E%'            AS has_youtube_link,
  content LIKE '%youtube.com/embed/E6eS_n4sl_E%'   AS has_youtube_embed,
  content LIKE '%app.powerbi.com/view%'            AS has_report_embed
FROM posts
WHERE slug = 'the-colour-crash';
