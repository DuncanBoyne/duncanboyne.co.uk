INSERT INTO talks (title, slug, excerpt, content, type, image, co_host_name, co_host_url, co_host_linkedin)
VALUES (
  '"Can Someone Turn the Heating On?" An Accidental Case Study in Power BI',
  'can-someone-turn-the-heating-on',
  'A manufacturing company had a problem. Internal testing failure rates sat below 1%. Customer replacement rates hit 15%. The data looked good. So why was the real-world experience telling a completely different story?',
  $$"Can Someone Turn the Heating On?"

A manufacturing company had a problem.

Their internal testing failure rate sat comfortably below 1%. Their customers, however, were seeing replacement rates as high as 15%.

The strange part? It wasn't consistent.

Some customers barely experienced issues at all. Others saw failures come in waves. Summer spikes. Winter spikes. Complaints would rise, disappear, then return again months later.

The data looked good.
The engineers were smart.
The dashboards were working.
So why was the real-world experience telling a completely different story?

In this interactive session, I'll walk through the accidental investigation that uncovered the issue, not through advanced AI, complex modelling, or some magical DAX formula, but through curiosity, context, and asking what felt like very dumb questions.

Questions like:

What's different between testing and storage?
What happens after the product leaves the workshop floor?
Why are certain customers affected more than others?
And eventually:
Why is nobody putting the heating on?

This session is part Power BI story, part consultancy lesson, and part reminder that data professionals are not just report builders, we are storytellers. Sometimes the numbers only make sense when you step away from the dashboard and start understanding the humans, processes, and assumptions behind them.

You'll leave with a practical framework of questions every consultant and analyst should ask, along with a different perspective on how to approach problem solving, stakeholder conversations, and the stories hidden inside your data.

Most importantly, you'll leave asking better questions.$$,
  'talk',
  '/can-someone-turn-the-heating-on.png',
  NULL,
  NULL,
  NULL
);

INSERT INTO events (title, description, event_date, location, event_url, event_type, talk_slug, slide_deck_url)
VALUES (
  'Fabric & Power BI Manchester User Group',
  'Monthly meetup for the Power BI and Fabric community in Manchester.',
  '2026-06-25',
  'Manchester, UK',
  'https://www.meetup.com/pbimcr/',
  'user-group',
  'can-someone-turn-the-heating-on',
  NULL
);
