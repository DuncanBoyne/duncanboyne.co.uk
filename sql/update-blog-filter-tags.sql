-- Adds blog filter tags used by src/routes/blog/+page.svelte.
-- Existing tags are preserved and duplicates are avoided.

WITH tag_updates(slug, add_tags) AS (
	VALUES
		('dax-fundamentals-power-bi', ARRAY['Power BI']::text[]),
		('deneb-vega-lite-cheat-sheet', ARRAY['Power BI']::text[]),
		('saas-dead-small-businesses-surging-enterprises', ARRAY['AI']::text[]),
		('speaker-feedback-d365-ppug-manchester', ARRAY['Power BI', 'Talks']::text[])
),
expanded_tags AS (
	SELECT
		p.id,
		tag_list.tag,
		MIN(tag_list.ordinality) AS first_position
	FROM posts p
	JOIN tag_updates u ON u.slug = p.slug
	CROSS JOIN LATERAL unnest(COALESCE(p.tags, ARRAY[]::text[]) || u.add_tags)
		WITH ORDINALITY AS tag_list(tag, ordinality)
	GROUP BY p.id, tag_list.tag
)
UPDATE posts p
SET tags = (
	SELECT array_agg(e.tag ORDER BY e.first_position)
	FROM expanded_tags e
	WHERE e.id = p.id
)
WHERE p.slug IN (SELECT slug FROM tag_updates);
