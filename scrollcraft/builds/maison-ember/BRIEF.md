# BRIEF — Maison Ember scroll page

Interviewed via AskUserQuestion (partial) + derived from existing project data
(`src/data/restaurantData.ts`), since the brand, menu, chef, services and
reviews already exist in the codebase and did not need to be re-asked. Marked
per-topic below as **answered** or **derived**.

## 1. What is this, who is it for

**Derived.** Maison Ember — a fine-dining restaurant. Tagline: "Where Every
Bite Becomes a Memory." Chef Julien Moreau (ex Le Gabriel, L'Ambroisie),
charcoal/ember cooking philosophy, signature dishes (A5 Wagyu, Truffle
Tagliolini, Chilean Sea Bass, Golden Ember Sphere dessert), private dining,
corporate events, celebrations, catering, full buyouts. Audience: guests
choosing a high-end dinner, private event, or milestone celebration.

## 2. Vibe + references

**Answered.** "Dark, smoky, ember-lit intensity" — charcoal darkness, glowing
amber/orange embers, smoke, fire. Literal to the "Ember" name and the chef's
charcoal-cooking philosophy. Moody, intense, warm luxury rather than quiet
minimalism.

## 3. Structure: one world vs distinct scenes

**Answered.** Distinct scenes. Each beat (arrival, chef's philosophy, the
signature dessert, the menu, the chef/services, reservation) is its own scene
with its own device, not one continuous camera flight.

## 4. Signature move seed

**Answered.** The Golden Ember Sphere dessert "comes alive." Built out as: the
sphere's shell fractures under scroll, gold crack-lines drawing themselves,
warm light bleeding out, intensifying toward the pointer, until it breaks into
embers drifting upward. See §Peak below.

## 5. Assets

**Answered.** No real photography of the actual restaurant exists yet (the
current site uses stock Unsplash imagery). No KIE_AI_API_KEY is configured and
ffmpeg is not installed on this machine, so this build does **not** generate
new photoreal stills or scrub video. It reuses the same Unsplash stock
photography already wired into `restaurantData.ts`, graded and composed
consistently (warm/dark grade, consistent crop language, ember-toned
overlays) rather than left as mismatched stock. The hero's depth comes from
layered CSS parallax planes built from that same photography plus generated
atmospheric layers (grain, smoke gradients, ember particles), not from
compositing/cutout assets — noted as a scope limit, not hidden.

## 6. Journey (beats)

```
1  Arrival        stepping into the dining room at dusk, embers glowing low
2  Philosophy     the chef's own words on fire, patience, restraint
3  The dish       the Golden Ember Sphere cracks open under your hand
4  The table      the wider menu, dish by dish, passing like courses
5  The house      Chef Julien Moreau, the private rooms, the occasions hosted
6  The booking    one table, one night, held for you
```

## 7. Energy curve

Low at arrival (hushed, dark), rising through the philosophy act (still but
charged), spiking hard at the dessert (the peak), settling into a confident
appetite through the menu, warm and steady through the chef/services act, and
quiet-resolved at the close — not loud, a held table.

## 8. Feeling curve (one line per act — emotion, then cause)

```
1  Awe          the dining room resolves out of near-darkness, embers holding the only light, headline greets on arrival
2  Intimacy     the room stills, Chef Moreau's own line on fire and patience arrives alone against dark ground
3  Wonder       the Golden Ember Sphere fractures under scroll, gold cracks drawing themselves, glowing warmer as the pointer nears
4  Appetite     the full table passes sideways, course by course, real pairings named plainly
5  Confidence   the chef's background and the house's occasions (private rooms, buyouts, celebrations) stated as fact, not pitch
6  Resolve      the room quiets to one line and one table, held, nothing else on the page
```

No two adjacent acts share a feeling. Awe -> Intimacy -> Wonder -> Appetite ->
Confidence -> Resolve.

## 9. The peak

**Act 3, "The dish."** The sentence a visitor would say to a friend:

> it's the site where you crack open the dessert with your scroll and it
> glows from inside

Gets the largest `data-sc-span` on the page, the silence of act 2 in front of
it (quiet, still, one line of text on dark ground), and the richest asset
(the dessert photograph) plus the bespoke fracture treatment.

## 10. Tell-someone sentence

**"It's the site where you crack open the dessert with your scroll and it
glows from inside."**

## 11. Range / aesthetic family

**Derived from the vibe answer.** Not premium-minimal-by-default: this leans
toward the maximalist end of the range taste.md offers for food/culture
brands — warm, dense in the menu act, one strong ember accent — while still
holding the taste floor (spacing scale, contrast, one accent, real copy).
Canvas near-black warm (not pure black), ink warm off-white, accent a coal-
ember orange-red. Explicitly avoiding the cream-and-brass artisan trap and the
skill's own literal example palette.

## 12. Authored silence

Act 2 (the chef's philosophy line) is deliberately quiet: one sentence, held,
dark ground, nothing else moving. It exists to make act 3's fracture read as a
change, not as more content. Not dead scroll — verify this reads as intended
stillness, not failure, in Step 5.

## Grammar

**Filmic one-shot.** Chosen because Maison Ember's page is a single linear
emotional argument (arrive -> feel the philosophy -> be shown the signature
dish -> want the table -> trust the house -> book) with one continuous voice
throughout, which is exactly what this grammar fits and the other seven do
not:

- Chaptered editorial — too paper/quiet for "smoky, ember-lit intensity."
- Live surface — there is no software surface to operate.
- Continuous world — explicitly ruled out by the structure answer (distinct
  scenes, not one flight).
- Typographic poster — the food photography is the argument; a type-only page
  would waste it.
- Gallery/catalog — forbids a single hero claim and persuasion, but a
  reservation page has to persuade, not just catalogue.
- Split stage — there is no two-sided comparison here.
- Rhythmic cutlist — bans `pin`/`dwell`, which the peak (the sphere fracturing
  and holding) needs directly.

This is the first build in this workspace's registry (empty), so there is no
fingerprint gate to clear yet, but the grammar choice is argued on its own
merits regardless.

## Signature move

**The ember crack.** In the peak act, an SVG fracture pattern is drawn across
the Golden Ember Sphere photograph via `stroke-dashoffset` tied to `--sc-p`
(scroll = the hand doing the cracking). As the cracks complete, a warm
radial-gradient glow bleeds through a `clip-path` mask following the crack
paths, intensifying toward the pointer position (`--sc-mx`/`--sc-my`), and a
small field of ember particles drifts upward from the break once it completes.
Bespoke markup and inline JS/CSS in the page; the engine is untouched.

## Assets used

Existing Unsplash photography already referenced in `restaurantData.ts`
(dining salon, Wagyu plating, Golden Ember Sphere, chef portrait, cellar,
tablescape), graded consistently with a shared CSS filter/overlay treatment
rather than left as mismatched stock crops.
