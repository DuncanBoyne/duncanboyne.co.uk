INSERT INTO posts (title, slug, content, excerpt, published_at, featured_image, tags)
VALUES (
  'Power BI Is Becoming an AI Job, One Announcement at a Time',
  'power-bi-is-becoming-an-ai-job',
  $$Nobody sent the email. There was no memo that said "your job is changing now." It arrived the way these things always do. As release notes.

Look at the single week Power BI just had.

Microsoft launched Rayfin at Build 2026. Describe an application backend in plain language, and it deploys onto Fabric with a database, authentication and governance from day one. Replit was the launch partner.

The same week, Power BI got "the agentic era of analytics." Agent Skills that build a semantic model, generate report pages, and iterate on visuals from a prompt.

Fabric Apps showed up as visualisation-as-code, dashboards defined in a file instead of dragged onto a canvas.

Conversational analytics got service principal authentication, which is the boring update that quietly turns "chat with your data" from a demo into something you can actually govern.

And over on r/PowerBI, someone wired Claude straight into their semantic model through MCP and started asking it to build.

Five announcements. One week. Read them on their own and each is a feature. Read them together and they are a job description being rewritten in front of you.

## The skills that defined the role are becoming table stakes

For ten years, "Power BI developer" meant a specific stack of craft. You knew DAX deeply. You could shape data in Power Query. You could build a model that performed and a report people actually used. That was the job. That was the moat.

Watch what each announcement does to that moat.

Agent Skills write the DAX. Fabric Apps move the report off the canvas you spent years mastering. Rayfin says the backend is a sentence now. The conversational layer means the person asking the question never opens your report at all.

None of this makes the craft worthless. It makes it assumed. The thing that used to be the job is becoming the floor you stand on while doing a different job.

## I want to be careful here

Because this is exactly the point where these posts usually lie to you. They tell you the skills are dead. They are not dead. A model still has to be right. Someone still has to know when the agent has confidently returned the wrong number, and "confidently wrong" is the entire risk of this era. Gartner reckons most agentic analytics projects that lean on MCP alone will fail for want of a real semantic layer. That failure does not get caught by the agent. It gets caught by you.

So the craft survives. It just stops being the thing you are paid to perform, and starts being the thing you are paid to supervise.

## The new job is showing up in the threads, not the keynotes

If you want to know what the job is actually becoming, do not watch the keynote. Watch the same community in the same week, doing the unglamorous half.

One thread this week: "Company is obsessed with AI, I have no idea where to start." A working practitioner under pressure to "do AI" with no use case in sight. That gap, between the boardroom wanting AI and the desk needing a reason, is now part of the role.

Another running theme: capacity. What does a CU actually cost. What can an F2 really run. Half of Fabric adoption is just learning the bill before it learns you. That is the role too.

And my favourite, because it is so small and so honest: a thread titled "Am I the only one who hates the new Get Data?" The redesign shuffled the connectors, and one of the two Web options quietly stopped connecting to Excel files on SharePoint. The fix, supplied by a Microsoft employee in the replies, was to strip "web=1" off the end of the URL.

So here is the week, both halves at once. On one stage, an agent that builds your whole model from a sentence. On the other, a data professional copying a query step out of an old file because the menu moved.

Both are true. That is the part nobody puts on the slide.

## What this actually means for you

The role is not being taken. It is being promoted, whether you wanted the promotion or not.

The Power BI job used to be: build the thing. The Power BI job is becoming: decide what should be built, point the agent at it, and be the person in the room who can tell when the confident answer is wrong. Less hands on the chart. More judgment about the model, the governance, the semantic layer the agents are all standing on.

That is a harder job, not an easier one. The easy part, the building, is the part getting automated. The part that is left is the part that was always the actual value, and was always the hardest to hire for.

Nobody announced the change. It came in the release notes, one feature at a time. The people who do well from here are not the ones who learn every new button. They are the ones who noticed the job description quietly changing underneath the buttons, and updated themselves to match.

Read the release notes. Then read what they are really telling you to become.$$,
  'Five Power BI and Fabric announcements landed in one week. Taken together, they reveal a job shifting from building reports to directing agents, governing semantic layers, and knowing when the confident answer is wrong.',
  '2026-06-09T00:00:00.000Z',
  '/carousel-power-bi-ai-job/slide-1.png',
  '{"Power BI", "AI", "Microsoft Fabric", "Agentic Analytics"}'
);
