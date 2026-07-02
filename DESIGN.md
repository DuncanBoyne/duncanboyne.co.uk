---
name: Duncan Boyne Portfolio
description: Personal brand and consulting site for a Power BI freelancer, Tugger AI strategist, speaker, educator, and community leader.
colors:
  light-bg: "#F5F3EE"
  light-surface: "#FDFBF7"
  light-text: "#2D2A26"
  light-muted: "#6B6660"
  light-border: "#E5E1D8"
  accent: "#8B6800"
  accent-strong: "#6B5000"
  accent-bright: "#F4D141"
  accent-warm: "#E2A414"
  accent-burnt: "#B46304"
  on-accent: "#FFFFFF"
  dark-bg: "#121212"
  dark-surface: "#1E1E1E"
  dark-text: "#F5F5F5"
  dark-muted: "#B3B3B3"
  dark-border: "#2C2C2C"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 10vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.95rem, 2vw, 1.15rem)"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "clamp(3rem, 6vw, 5rem)"
  cta: "clamp(5rem, 10vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.light-text}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.none}"
    padding: "24px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.light-muted}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
---

# Design System: Duncan Boyne Portfolio

## 1. Overview

**Creative North Star: "The Useful Stage"**

The site should feel like a working stage for a sharp practitioner: part consultancy front door, part speaker profile, part public notebook, part community proof. It is not a neutral CV. It should make Duncan feel credible, human, and opinionated within seconds.

The visual system is restrained but not timid: large typographic gestures, plain rows, hard rules, honest portraits, real event imagery, and one warm gold signal color. The site is allowed to be cinematic in specific places, especially the architect experience, but the everyday pages should stay fast, readable, and useful.

The brand rejects generic corporate consultancy, AI-bro thought leadership, template SaaS gradients, keyword-stuffed local SEO, and inaccessible polish. It should make the offer obvious: Power BI freelancing, AI strategy through the Tugger direction, speaking, education, open source, and community leadership.

**Key Characteristics:**

- Editorial scale without magazine affectation.
- Warm gold as a rare signal, not decoration.
- Flat, bordered surfaces with restrained hover motion.
- Clear rows and lists over endless card grids.
- Real photos, project assets, logos, and code/data artefacts as proof.
- Accessibility-first interaction, including reduced-motion and WebGL fallbacks.

## 2. Colors

The palette is warm, high-contrast, and intentionally narrow: cream and charcoal foundations with gold as the decision signal.

### Primary

- **Consultant Gold** (`accent`, #8B6800 light / #F4D141 dark): Used for identity, emphasis, selected filters, major CTAs, rules, and active states. It should be rare enough to mean something.
- **Deep Gold** (`accent-strong`, #6B5000): Used for hover emphasis, secondary accents, and stronger typographic highlights on light surfaces.
- **Burnt Gold** (`accent-burnt`, #B46304): Used for thin hero/page divider rules and warmer depth where the interface needs a less bright accent.

### Neutral

- **Warm Paper** (`light-bg`, #F5F3EE): Main light-mode background. Existing identity uses this warm cream, so preserve it, but never let it become beige template sludge.
- **Clean Sheet** (`light-surface`, #FDFBF7): Light-mode panels, nav, footer, and alternate bands.
- **Ink Brown** (`light-text`, #2D2A26): Primary text in light mode.
- **Dry Graphite** (`light-muted`, #6B6660): Secondary text, labels, dates, metadata, and low-emphasis links. Check contrast whenever it sits on tinted backgrounds.
- **Paper Edge** (`light-border`, #E5E1D8): Dividers, chips, list rows, cards, inputs.
- **Charcoal Stage** (`dark-bg`, #121212): Main dark-mode background.
- **Black Box** (`dark-surface`, #1E1E1E): Dark-mode panels, nav, and footer.
- **Soft White** (`dark-text`, #F5F5F5): Primary text in dark mode.
- **Silver Note** (`dark-muted`, #B3B3B3): Secondary text in dark mode.
- **Charcoal Rule** (`dark-border`, #2C2C2C): Borders and dividers in dark mode.

### Named Rules

**The One Signal Rule.** Gold is the signal color. Do not introduce blue, purple, cyan, or rainbow accents unless the content itself requires a branded external asset.

**The Cream With Teeth Rule.** The warm background only works because the typography is dark, direct, and high contrast. Never pair it with pale grey body text.

**The No Microsoft Default Rule.** Power BI is the subject, not the color palette. Do not let the site collapse into default Microsoft blue.

## 3. Typography

**Display Font:** Inter, with system fallbacks.
**Body Font:** Inter, with system fallbacks.
**Label/Mono Font:** No separate mono style is established. Do not add monospace just to imply "technical".

**Character:** The type system is blunt, modern, and direct. It uses weight and scale, not decorative font pairing, to create hierarchy.

### Hierarchy

- **Display** (900 weight, `clamp(3rem, 10vw, 9rem)`, 0.9 line-height): Page titles, major identity moments, and CTA statements. Keep letter spacing no tighter than `-0.04em`.
- **Hero Name** (200 and 900 weights, `clamp(3.5rem, 16vw, 17rem)`, 0.85 line-height): Reserved for the homepage identity lockup. Do not reuse this scale casually.
- **Headline** (900 weight, `clamp(1.8rem, 4vw, 3.5rem)`, 1.0 line-height): Section titles and large content headers.
- **Title** (600 to 800 weight, roughly 1rem to 1.5rem): List rows, service titles, project names, and card headings.
- **Body** (400 weight, 1rem, 1.7 to 1.8 line-height): Long-form copy, service explanations, community pages, and blog content. Cap prose around 65 to 75ch.
- **Label** (700 weight, 0.7rem, uppercase, `0.14em` tracking): Kicker labels, metadata, filter headings, and structural cues. Use sparingly.

### Named Rules

**The Big Words Earn It Rule.** Giant type is for identity, page-level orientation, and CTA endings. Do not inflate routine section headings into fake drama.

**The Kicker Ration Rule.** Uppercase tracked labels are part of the current system, but they must not appear above every block by reflex. Use them when they orient the reader.

**The Human Copy Rule.** Copy should read like Duncan: specific, useful, occasionally dry, and never like a generic agency wrote it.

## 4. Elevation

The system is flat by default. Depth comes from borders, alternating surface bands, image layers, typographic contrast, and interaction state. Shadows are rare and should only support overlays, dropdowns, hovered cards, or the 3D architect experience.

### Shadow Vocabulary

- **Dropdown Shadow** (`shadow-lg`): Desktop nav dropdowns only. It separates a floating menu from the sticky header.
- **Hover Card Shadow** (`group-hover:shadow-lg`): Existing blog cards use this as a lift cue. Keep it subtle and paired with movement no larger than `-translate-y-1`.
- **Cinematic Glow** (`0 0 32px rgba(244, 209, 65, 0.35)` and similar): Reserved for the architect experience and reveal portrait. Do not apply this to ordinary cards.

### Named Rules

**The Flat Until Asked Rule.** Surfaces rest flat. Elevation appears as a response to hover, focus, overlay, or cinematic context.

**The Border First Rule.** Use a 1px or 1.5px border before reaching for a shadow. A bordered row is more on-brand than a floating card.

## 5. Components

### Buttons

- **Shape:** Mostly square and utilitarian (`0px` radius). Pill and rounded buttons are exceptions for nav toggles, badges, and external community pages.
- **Primary:** Gold background with high-contrast text (`accent` plus `on-accent`), bold label, 12px by 24px or 12px by 20px padding depending on context.
- **Inverse Primary:** Dark text-colored background with paper-colored text, used on the homepage hero and open-source CTAs.
- **Secondary / Ghost:** Transparent background, 1.5px border, text-colored label, hover border shift.
- **Hover / Focus:** Hover uses opacity, border-color, or text color shift. Focus uses visible rings or high-contrast outlines. Active states can scale to `0.97` for tactile feedback.

### Chips

- **Style:** Thin bordered chips with muted text, compact padding, square corners or mild radius depending on page family.
- **Selected State:** Filled gold with `on-accent` text for filters, or gold border/text for topic chips.
- **Use:** Filters, tags, skills, project topics, and topic metadata. Do not turn chips into decorative badges with no job.

### Cards / Containers

- **Corner Style:** Flat or lightly rounded. Cards default to square corners; rounded `8px` and `12px` are acceptable only where Tailwind component pages already use them.
- **Background:** `surface` on `bg`, or `bg` inside surface bands for contrast.
- **Shadow Strategy:** Flat at rest. Use border, rule, or tonal band first.
- **Border:** 1px or 1.5px using `border`.
- **Internal Padding:** 20px to 32px for cards; page sections use clamp-based vertical spacing.

### Inputs / Fields

- **Style:** Surface background, 1.5px border, square corners, clear label above each field.
- **Focus:** Border shifts to gold. Focus state must be visible without relying on color alone where possible.
- **Error / Disabled:** Error text uses `error`; disabled states should remain legible and not rely on pale opacity alone.

### Navigation

- **Desktop:** Sticky surface header, small logo, dropdown groups, icon plus label, active state in gold with light gold background.
- **Mobile:** Collapsible menu with the same grouped IA and persistent theme toggle.
- **Dropdowns:** Use bordered surface panels with restrained shadow. Must close on Escape and maintain keyboard focus.
- **Theme:** Light/dark mode is core. Logo swaps must preserve contrast in both modes.

### Row Lists

Rows are a signature pattern. Blog posts, talks, services, events, and projects should prefer ruled rows with hover expansion over generic card grids when the content is list-like.

- **Default:** Top/bottom border, date or metadata column, strong title, arrow affordance.
- **Hover / Open:** Title shifts to gold, arrow nudges up/right, hidden description or image expands.
- **Accessibility:** If content is essential, use click-driven expansion or always-visible summaries. Hover-only content is a preview, not the only access path.

### Signature Experience

The architect experience is a cinematic exception: WebGL, scroll-linked staging, audio, captions, skip controls, keyboard navigation, reduced-motion gating, and device capability checks. Treat it as a one-off brand doorway, not a pattern for normal pages.

## 6. Do's and Don'ts

### Do:

- **Do** keep the site positioned around Power BI freelancing, Tugger AI strategy, speaking, education, open source, and community leadership.
- **Do** use real proof: event photos, talk pages, project repos, blog posts, resources, testimonials, and specific consulting outcomes.
- **Do** preserve light/dark mode and verify contrast in both.
- **Do** prefer ruled rows, strong typography, and clear CTAs over decorative card grids.
- **Do** use gold as the primary signal color and keep it meaningful.
- **Do** keep motion purposeful, optional, and reduced-motion safe.
- **Do** write in a direct human voice: useful, specific, and honest about the messy bit.
- **Do** make local SEO readable to humans first. Norfolk, Norwich, and Great Yarmouth matter, but the copy must not become keyword soup.

### Don't:

- **Don't** make this a generic corporate consultancy website with stock handshakes, vague transformation language, and no human voice.
- **Don't** use Microsoft-default blue dashboard aesthetics as the whole visual identity.
- **Don't** use AI-bro thought leadership, template authority, fake certainty, or "secret formula" grift.
- **Don't** add glassy SaaS gradients, purple AI blobs, gradient text, or over-polished startup visuals that could belong to anyone.
- **Don't** write keyword-stuffed local SEO copy that reads like a Google search out loud.
- **Don't** ship pretty but unreadable design: low contrast, tiny text, mystery navigation, decorative motion, or inaccessible visual hierarchy.
- **Don't** celebrate overbuilt dashboard culture. No 200-visual report energy, endless slicers, or fake power-user complexity.
- **Don't** create a sterile CV portfolio that lists achievements without showing judgment, teaching, community, or personality.
- **Don't** copy the legacy gradient-text hero pattern from `src/lib/components/Hero.svelte` into new work.
- **Don't** add more side-stripe callouts. Existing side-border accents should be treated as legacy and replaced with full rules, backgrounds, or stronger typography when touched.

## 7. Bauhaus Homepage

The homepage (`src/routes/+page.svelte`) uses a Bauhaus / Swiss-typographic treatment layered on top of the core system. It is a deliberate, scoped extension — not a new brand. Charcoal reads as the Bauhaus "black", gold as the "yellow", and a single new red completes the primary triad on warm cream.

### Bauhaus Red (`bauhaus`)

- Tokens: `--color-bauhaus` (#D72515 light / #F2402E dark), `--color-on-bauhaus`. Exposed in Tailwind as `bauhaus`.
- **Compositional only.** Red is for geometric blocking — squares, bars, triangles, timeline dots, hover corners. It is never the action signal (gold owns that), never body text, and is kept to a small share of any viewport. This mirrors **The One Signal Rule**: gold still means "do something", red only means "structure".

### Geometry kit

Hard-edged shapes are built with pure CSS (`clip-path`, `border-radius`) so they theme and scale with no image assets: full/quarter circles, triangles, square module markers, and solid colour blocks. Use `var(--color-text)`, `var(--color-accent)`, or `var(--color-bauhaus)` as fills.

### Colour-field flow

The homepage is composed as a sequence of full-bleed **colour fields**, not uniform cream bands — this is what makes it read as one Bauhaus poster rather than a stacked list. Each `.band` declares a small set of field tokens that every inner block (rows, tiles, timeline, cards, states) consumes, so a section restyles entirely by swapping its field class:

- `--fg`, `--fg-muted` — foreground text
- `--rule-strong`, `--rule-soft` — structural vs. divider lines
- `--field-accent` — local emphasis / interaction colour
- `--field-surface` — inner panel fill

Field classes: `.band--cream`, `.band--surface`, `.band--gold` (gold field, white-on-gold), and `.band--inverse` (charcoal block / cream text in light; the same swap makes it a **light block in dark mode**, so it always stands out). The flow alternates — cream hero → gold → inverse → surface → cream → inverse — for poster rhythm in both themes.

On an inverse field, interactions must not lean on gold (weak on the dark-mode light block) or turn red into an action colour: links use underline + motion, and `--field-accent` (red) drives only decorative markers/arrows.

### Poster headers, index numerals, rules

- **Index numerals:** each section opens with a giant outlined numeral (`-webkit-text-stroke`, transparent fill, `aria-hidden`) in `--field-accent`, paired with an oversized `<h2>`. Headers alternate left/right (`.phead--right`) for asymmetry and stack on narrow screens.
- **Bleeding shapes:** large circles/quarters/bars positioned to bleed off band edges (in a `.bleeds` layer behind `.wrap`) carry the eye between sections. Keep red shapes a small share of the field; gold/ink discs usually run at low opacity as atmosphere.
- **Rules:** crisp 2px structural lines in `--rule-strong` (which inverts with the field). Two grid techniques: **gap-fill** (`gap: 1.5px` over a filled container — only when every cell is occupied, e.g. hero/services) and **collapsed borders** (container top/left + tile right/bottom — for grids that may not fill, e.g. open-source tiles, leaving a clean open corner).

All entrance/hover motion remains reduced-motion safe via the global rule in `app.css`.
