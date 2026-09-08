# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| maison-ember | Filmic one-shot | Fixed minimal bar, wordmark + one CTA ("Reserve a Table") | Pinned hero, layered CSS parallax planes (no scrub video), corner-anchored kinetic greet headline | pin(hero+parallax) &gt; flow+kinetic(quiet quote) &gt; pin(peak, bespoke crack) &gt; pan(dish rail) &gt; flow(chef+occasions) &gt; pin(spotlight+magnet close) &gt; 6 acts, ~14.7vh | Pinned spotlight + magnetic CTA, footer inside stage, contact info holds | The ember crack: an SVG fracture drawn via `stroke-dashoffset` off `--sc-p`, pointer-driven glow via `--sc-mx/--sc-my`, ember particles on completion | Dark ember/charcoal photographic (existing stock photography, no generation) | Static build, no deploy port yet |

*(empty: your first build has nothing to clear, so build whatever the interview
points at. From the second onwards, this table is the constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **maison-ember** claims: filmic one-shot grammar (no-video variant: hero depth
  built from layered CSS parallax on stock photography instead of a scrub
  clip), the fixed minimal wordmark+CTA nav, the pinned-spotlight+magnet close
  with an in-stage footer, and the signature move "the ember crack" (a bespoke
  SVG fracture drawn from `--sc-p` combined with pointer-driven glow). A later
  build should avoid repeating a no-video parallax hero under this same
  grammar, this close pattern, and this signature move.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
