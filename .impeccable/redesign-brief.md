# Redesign brief: "Build Instructions"

Whole-site redesign of isaiahmann.com. Planning only: nothing here has been built. Product truth lives in `PRODUCT.md`. The current look (`DESIGN.md`, "The Workshop Journal") is being replaced, and stays only as a record of what was there.

Chosen world: a toy-brick building instruction booklet (catalog world `games-toys-physics-play-brick-build-instructions`, picked from a bolder re-roll, seed `seed:7a0de48577a5841a`). Build path: code-first. There's no image generation in this setup, so the ambition is written down here and checked against the build at the end.

## 1. Job and audience

- **Who arrives:** fellow builders (founders, engineers, collaborators in AI), usually with Isaiah's name already in hand from a link or intro.
- **What they need:** in under a minute, to know what he has actually built and whether he's someone worth building with.
- **Mode:** the home page is **Persuade** (it earns trust and an action). The projects archive and project pages are **Experience**, where the work leads. The resume is **Read**.

## 2. Outcome and proof

- **Success:** the visitor leaves trusting Isaiah's credibility as a senior engineer who builds AI-native products. Emailing him and visiting Naru follow from that trust.
- **The idea that carries the proof:** a career is a build. Each era is a numbered step that added real pieces, and the finished model is the engineer he is today. The sequence *is* the evidence: dated, in order, nothing skipped.
- **Real material only:** the employers and dates, 31 projects from `json/projects.json` (roles, team sizes, contributions, screenshots, store links), the Hampshire College profile, and the resume. No invented metrics, testimonials or Naru numbers.

## 3. Selected direction

**Thesis.** The site is one instruction booklet for "the Isaiah Mann build". It refuses the default portfolio layout (a hero, then a row of equal project cards) and uses the booklet's own grammar:
- numbered steps in strict order;
- a parts inventory up front;
- 1:1 call-out boxes for the key piece each step adds;
- the earlier assembly shown ghosted;
- wordless arrows that show where the new piece seats.

**Own world.**
- **Ground:** a sky-blue page with a faint stud-grid dot pattern.
- **Line:** black keylines (about 3px) outline every piece, box and button.
- **Colour:** brick red marks the new piece in each step (only one per step). Yellow and blue are held for inventory and secondary pieces. Plate grey is for baseplates and ghosted earlier steps.
- **Type:** huge step numerals do most of the talking, with plain, sturdy body text.
- **Alignment:** everything snaps to one stud-grid module.
- **Dark theme:** a "night build" on deep blueprint navy. The keylines turn pale and the bricks keep their colours.
- **Trademark guard:** generic brick-manual language only. No toy-brand names, logos, minifigures or packaging marks.

**Era colours.** Each brick is coloured by its era: games (yellow), enterprise (white), interactive ads (blue), ed-tech (green), building with AI (red). The same colour follows a project from the home page to its archive tile to its project page.

**Duration as data.** Era bricks are sized by real time spent: a brick's length in studs is proportional to the years in that role.

**Provenance.** Every claim has its proof attached as a small call-out tag (store link, repo, press piece, employer site), set to the grid.

## 4. Scope and boundaries

**In scope.** Every page, in one design system. The table maps each page to its place in the booklet:

| Page | Its role in the booklet |
|---|---|
| Home (`index.html`) | The cover plus steps 1–7 |
| Projects (`projects/`) | The parts catalogue: all 31 projects |
| Project pages (`projects/<key>/`, from `projects/template/`) | One set each |
| Resume (`resume/`) | The bill of materials, printable on one page |
| Contact (`contact/`) | The back cover |
| `404.html` | "Missing piece" |

**Must survive:**
- the light/dark toggle, including the stored choice, the OS fallback and no flash of the wrong theme (`js/theme.js` stays and its `THEME_COLORS` get updated);
- the experience timeline as a scannable, dated record, now rebuilt as the numbered steps;
- GA4 analytics;
- the one-page resume PDF;
- static pages with no build step.

**Not carried forward:** the headshot as the nav avatar (it stays as the share image and favicon), and Naru as a featured block, nav button or hero action. Naru is one of the current AI projects in the latest step and one tile in the archive, with no badge or special placement.

**Anti-goals:**
- **Corporate resume:** never let the steps collapse into a plain list of jobs. The numerals, bricks and arrows have to carry the page.
- **Precious art piece:** the booklet never hides facts behind play. Every step's text is readable without the illustration, and every link is plainly a link.
- **Too toy-like for a senior pitch:** the voice stays warm and plain-spoken, in the first person, with no brick puns in the copy.

## 5. Content per surface, states and ranges

**Home.**
- **First viewport, left:**
  - "Isaiah Mann" at poster scale;
  - one first-person line about designing, building and shipping software that helps people;
  - a plain "Now" line naming the current role and current projects, Naru among them;
  - the primary action "See the build", with email as the second action.
- **First viewport, right:** the assembled model, seven era bricks stacked in date order and sized by time spent. The newest brick (building with AI) seats itself once on load.
- **Top-right card:** "Parts in this build", Isaiah's real stack (TypeScript, Python, React Native, Next.js, Postgres, Unity, agents, evals) as small piece chips.
- **Below the fold:** steps 1–7 as step panels. Each has a giant numeral, the era's dates and roles, a 1:1 call-out of its signature project, and provenance tags. Step 7, "Building with AI", shows its projects (PlanTogether, Kind Cloud, Kinarium, Naru) as equal call-outs. Then a parts list of what Isaiah works on, a short "About the builder" passage in plain prose, and a back-cover call to action.

**Projects (the parts catalogue).**
- All 31 projects, shown according to `ShouldDisplay` and `SortPriority`.
- Each tile is a keyline box with:
  - the project's icon as the "piece";
  - "1×" or team size as the piece count;
  - year, platform and era colour.
- Era filters work like inventory tabs.
- **States:** loading (the existing fetch) shows an empty dashed seat, never a blank grid. The error state reads "Couldn't load the parts list" with a retry. Content stays visible without JavaScript wherever possible.
- **Ranges:** from 1 to 31 tiles, and from short titles to long ones like "Extract Your House".

**Project page (one set).**
- A box-front header: title, years, "pieces" (team size), roles and platforms.
- Contributions as numbered mini-steps.
- The gallery as step frames with the existing lightbox.
- Store, itch.io and video links as keyline action buttons.
- **Ranges:** zero to four screenshots, with or without video, and none to many links (each project has a different set).

**Resume (the bill of materials).** On screen it's a booklet page. In print it drops the sky ground and keeps the keylines, so it still fits one page.

**Contact (the back cover).** Email as the primary action and each social channel as a call-out box, with one warm line of copy.

**404.** An empty dashed seat on the grid, "This piece isn't in the set", and a way back home.

## 6. Interaction and layout

**Signature interaction.** When a step scrolls into view, its new brick drops along the dashed arrow and settles flush on the studs with a small click-down settle, while earlier steps ghost to grey. On the home page's first viewport, the newest brick seats itself once on load.
- With reduced motion, everything renders already in place.
- Without JavaScript, everything is visible and already in place. No content is ever hidden while waiting for an animation.

**Hover and focus.** A focused or hovered step, tile or button lifts one stud with its keyline darkening. Focus rings are visible and keyline-shaped.

**Navigation.** A booklet top bar on desktop with Steps, Parts, Resume, Contact, the theme toggle (drawn as a two-stud switch brick) and a page-position indicator (a step dot row). On phones it becomes a compact top bar.

**Layout.** One stud-grid module drives every gap, padding and alignment.
- **Desktop:** the first viewport splits into copy and model. Steps run as two-up spreads.
- **Phones:** spreads split into single step frames, the call-out pins to the top corner of its frame, and the model scales down without being cropped.

**Illustrations.** Isometric bricks are drawn in code as layered SVG: three shaded faces plus studs, one fixed isometric angle, black keylines. They're authored once as reusable pieces (a 1×2, 2×2, 2×4 and a plate) and reused everywhere.

## 7. Constraints and open decisions

**Constraints:**
- Static HTML, CSS and vanilla JS with no build step, on GitHub Pages.
- One new shared stylesheet replaces `css/modern.css`. The legacy stylesheets are retired, and per-page `<style>` blocks use only design tokens.
- WCAG AA contrast in both themes. The current dark-mode button and grey-text failures recorded in `DESIGN.md` must not carry over.
- Visible focus states. `prefers-reduced-motion` is honoured everywhere.
- Fonts load from one request with no layout shift.

**Open decisions for you:**
1. **Headshot:** drop it entirely, or keep it only for the share image and favicon?
2. **Rollout:** ship everything at once (as you chose), or build home first behind a branch, review it, then do the remaining pages before merging?
3. **Project pages:** keep 31 hand-copied `index.html` folders, or generate them? That would need a build step, which goes against the static default unless you approve it.

**Done means:** a reviewed build of every page in this world, `DESIGN.md` rewritten from what was actually built, and the new design system file written alongside it.
