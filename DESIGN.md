---
name: Isaiah Mann
description: A career drawn as one toy-brick building-instruction booklet.
colors:
  sky-page: "#b5dbf5"
  sky-band: "#a5d2f1"
  sky-panel: "rgba(255, 255, 255, 0.38)"
  callout-white: "#ffffff"
  stud-dot: "rgba(16, 20, 24, 0.13)"
  keyline-ink: "#101418"
  ink-secondary: "#222c37"
  ink-tertiary: "#33404d"
  keyline-soft: "rgba(16, 20, 24, 0.2)"
  action-blue: "#1660c4"
  action-blue-deep: "#0f4fa6"
  action-ink: "#ffffff"
  brick-red: "#ef4135"
  brick-red-long: "#d0281e"
  brick-red-short: "#a51c14"
  brick-yellow: "#ffd21f"
  brick-yellow-long: "#f0b800"
  brick-yellow-short: "#c49200"
  brick-blue: "#2d7fe0"
  brick-blue-long: "#1a63c0"
  brick-blue-short: "#134c96"
  brick-green: "#25a660"
  brick-green-long: "#178447"
  brick-green-short: "#0f6435"
  brick-white: "#ffffff"
  brick-white-long: "#e4e7ea"
  brick-white-short: "#c5cad0"
  plate-grey: "#dfe3e7"
  plate-grey-long: "#c2c8cf"
  plate-grey-short: "#a3abb4"
  ghost-top: "#dcebf6"
  ghost-long: "#c9dfee"
  ghost-short: "#b6d1e4"
  ghost-line: "rgba(16, 20, 24, 0.32)"
  night-page: "#0d1e33"
  night-band: "#0a182a"
  night-panel: "rgba(255, 255, 255, 0.04)"
  night-paper: "#132a46"
  night-stud-dot: "rgba(219, 231, 243, 0.1)"
  night-ink: "#eef4fb"
  night-ink-secondary: "#cfdbe8"
  night-ink-tertiary: "#b3c3d4"
  night-keyline: "#dbe7f3"
  night-keyline-soft: "rgba(219, 231, 243, 0.24)"
  night-action: "#4a9bff"
  night-action-hover: "#7ab6ff"
  night-action-ink: "#06121f"
  night-focus: "#ffd21f"
  night-brick-line: "#070b10"
  night-ghost-top: "#24426a"
  night-ghost-long: "#1d375a"
  night-ghost-short: "#172d4b"
  night-ghost-line: "rgba(219, 231, 243, 0.3)"
typography:
  display:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.4rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  step-numeral:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(4.5rem, 8vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.2rem, 1.9vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  label:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.08em"
  ui:
    fontFamily: "Rubik, ui-rounded, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  piece: "6px"
  box: "10px"
spacing:
  stud: "8px"
  stud-1-5: "12px"
  stud-2: "16px"
  stud-3: "24px"
  stud-4: "32px"
  stud-5: "40px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 9vw, 120px)"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.action-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.piece}"
    padding: "12px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-deep}"
    textColor: "{colors.action-ink}"
  button-secondary:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.piece}"
    padding: "12px 24px"
    height: "52px"
  nav-tab:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    typography: "{typography.ui}"
    padding: "9px 16px"
  nav-tab-hover:
    backgroundColor: "{colors.sky-band}"
  nav-tab-current:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.action-ink}"
  chip:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    rounded: "{rounded.piece}"
    padding: "5px 10px 5px 6px"
  tag:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    rounded: "{rounded.piece}"
    padding: "6px 12px"
  filter:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.piece}"
    padding: "8px 14px 8px 10px"
    height: "44px"
  filter-pressed:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.action-ink}"
  callout:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    rounded: "{rounded.box}"
    padding: "16px 18px"
  step-panel:
    backgroundColor: "{colors.sky-panel}"
    textColor: "{colors.keyline-ink}"
    rounded: "{rounded.box}"
    padding: "clamp(20px, 3vw, 36px)"
  piece:
    backgroundColor: "{colors.callout-white}"
    textColor: "{colors.keyline-ink}"
    rounded: "{rounded.box}"
    padding: "12px 14px"
  status:
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.box}"
    padding: "20px"
---

# Design System: Isaiah Mann

## Overview

**Creative North Star: "The Build Instructions"**

Every page is a spread from one toy-brick building-instruction booklet. The page is sky blue and ruled by a faint stud-dot grid on an 8px stud; every piece, box and button carries a black keyline; white call-out boxes hold the detail; isometric bricks, drawn in code from `tools/bricks.py`, are the only illustration. The language is generic brick-manual language: numbered steps with huge heavy numerals, ghosted earlier assembly, dashed arrows to a dashed empty seat, 1:1 call-outs and a parts inventory. It is never a toy brand's name, logo or look.

Density is that of an instruction booklet: generous sky around a few firmly outlined boxes, one heavy rounded grotesk at every size, colour carried by the bricks rather than by surfaces. Components are quietly tactile: they sit flat on their keylines at rest, lift 2px with a soft offset shadow on hover and press down 1px on active, like a piece being picked up and clicked home.

The dark theme is a night build: the same booklet on a deep navy page with pale keylines, where the bricks keep their colours and the focus ring turns brick yellow.

**Key Characteristics:**
- Sky-blue page with a stud-dot grid on a 32px pitch (four studs).
- One keyline system: 3px on boxes and buttons, 2px on chips, tags and internal dividers.
- Isometric bricks in three tones per colour (top, long face, short face), coloured by career era.
- One typeface, Rubik, from 400 body to 900 step numerals.
- Flat at rest; a 2px lift on hover and a 1px press on active.
- Dashed lines mean "where a piece goes": arrows, empty seats, focus rings, loading states.

## Colors

The page is a single cool sky; the saturation lives in the bricks, and one action blue does all the interactive work.

### Primary
- **Instruction Blue** (action-blue): the one action colour. Primary buttons, the current nav tab, pressed filters, the primary contact card's icon and the light-theme focus ring. Hover deepens it to **Deep Instruction Blue** (action-blue-deep). White on it measures 6.0:1.

### Secondary
- **Era Bricks**: the five brick colours, each in three tones (top face, long face, short face) so the isometric form reads without lighting. Brick Yellow marks the games era, Brick White enterprise, Brick Blue interactive ads, Brick Green ed-tech, Brick Red independent and AI builds. They appear on bricks, chip swatches, filter dots and the project page's era brick bullet, never as surface or text colours.
- **Plate Grey** (plate-grey and its long and short faces): baseplates and the neutral "all" swatch.
- **Ghost** (ghost-top, ghost-long, ghost-short, ghost-line): earlier steps of a model, washed toward the page so the new piece reads as the change.

### Neutral
- **Booklet Sky** (sky-page): the page in light theme, also the browser theme colour.
- **Sky Band** (sky-band): the hover fill on tabs, rows and the theme toggle, and the scrollbar track.
- **Sky Panel** (sky-panel): the translucent white wash inside each step panel, so the stud grid ghosts through.
- **Call-out White** (callout-white): every call-out, card, chip, tag and secondary button.
- **Keyline Ink** (keyline-ink): primary text and every keyline. 12.7:1 on the page.
- **Ink Secondary** and **Ink Tertiary** (ink-secondary, ink-tertiary): body copy and metadata; 9.7:1 and 7.3:1 on the page.
- **Soft Keyline** (keyline-soft): hairline dividers inside lists, the top bar's underline.
- **Night Build** set (night-*): deep navy page and band, a navy paper for boxes, pale blue-white ink and keylines, a lighter action blue carrying dark ink (6.7:1), secondary text at 9.3:1, and a brick-yellow focus ring (11.6:1). Bricks keep their day colours; only the brick outline darkens and the ghosts turn navy.

### Named Rules
**The Era Code Rule.** Brick colour means era and nothing else: games yellow, enterprise white, interactive ads blue, ed-tech green, independent and AI builds red, plate grey for baseplates and ghosted steps. Never use a brick colour decoratively or to rank one project above another.

**The Token-Only Rule.** Every colour is a custom property in `css/site.css`, redefined once for the dark theme under both `[data-theme="dark"]` and `prefers-color-scheme`. Page `<style>` blocks reference tokens only; a new colour is a new token first.

**The Night Build Rule.** Dark theme changes the room, not the pieces: page, paper, ink, keylines, action and ghosts swap; brick colours stay.

## Typography

**Display Font:** Rubik variable, self-hosted (with ui-rounded, Segoe UI, system-ui)
**Body Font:** Rubik
**Label Font:** Rubik

**Character:** One sturdy, slightly rounded grotesk carries the whole booklet, from the 900-weight step numerals to 15px UI text. Weight, not a second family, makes the hierarchy, and tabular numerals keep years and counts aligned.

### Hierarchy
- **Display** (800, clamp(3.4rem, 7.4vw, 6rem), 0.92): the name on the cover and each page's main heading. Inner pages scale it down (to about 5rem or 4.6rem) but keep weight and tracking.
- **Step Numeral** (900, clamp(4.5rem, 8vw, 6rem), 0.8, -0.04em): the step number pinned to the top-left of each step's model.
- **Headline** (800, clamp(2.2rem, 4.4vw, 3.4rem), 1.0): section headings; group heads in the archive at about 2.1rem.
- **Title** (700, 1.35rem, 1.2): part names, row titles and sub-heads. Step titles step up to 800 at up to 2rem.
- **Lede** (400, clamp(1.2rem, 1.9vw, 1.45rem), 1.4, max 34ch): the one first-person line under a display heading.
- **Body** (400, 18px, 1.55, max 68ch): running copy in Ink Secondary.
- **UI** (600 to 700, 14px to 17px): buttons, tabs, chips, tags, filters and metadata.
- **Label** (700, 13px, 0.08em, uppercase): box titles inside call-outs, definition terms and contact-card labels.

### Named Rules
**The One Grotesk Rule.** Rubik at every size. Hierarchy comes from weight (400 to 900) and size, never from a second family or a system display face.

**The Box Title Rule.** Small uppercase labels live inside a box as its title or as a field label ("Parts in this build", "New in this step", "1:1"). Never set one above a heading as an eyebrow or kicker.

## Layout

The stud is the unit: 8px, with the background dot grid on a four-stud (32px) pitch offset by two studs. Gaps step in studs: 8, 12, 16, 24, 32 and 40px. Content sits in a 1200px container with a fluid gutter (16px to 48px), and sections open with clamp(64px, 9vw, 120px) of sky above them.

Pages are spreads, not card grids. The cover pairs a 5fr text column with a 7fr model, with the parts call-out pinned top right of the art. Steps are full-width panels split into two equal columns (model, then proof) that stack under 860px. The parts list is a three-column ruled list (piece, name, description). The archive is a stack of group boxes, each a two-column ruled inventory that becomes one column under 860px. The resume is a single 920px sheet. Under 640px the top bar unsticks and the tabs stretch to fill the width; under 600px the hero model swaps to a compact version.

**The Stud Rule.** Layout spacing (gaps between pieces, section rhythm, the dot grid) steps in whole and half studs of 8px. Only the tight internal padding of small pieces sits between studs.

## Elevation & Depth

Depth comes from two places: the isometric bricks, which carry their own form through three tones per colour, and state. Surfaces themselves are flat; they sit on their keylines on the sky with no resting shadow. The only shadows answer interaction.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 8px 16px -6px rgba(16, 20, 24, 0.35)`; night `0 10px 20px -8px rgba(0, 0, 0, 0.7)`): a soft offset shadow paired with a 2px rise on hover for buttons, tags, parts pieces, frames, contact cards and social links.
- **Press** (`box-shadow: 0 1px 2px rgba(16, 20, 24, 0.3)`; night `0 1px 2px rgba(0, 0, 0, 0.6)`): paired with a 1px drop on active.
- **Brick face** (`inset 0 -4px 0` in a darker brick tone): the theme toggle's knob and the project page's brick bullets draw a brick's lower face, not a shadow.

### Named Rules
**The Quietly Tactile Rule.** Flat at rest, 2px up with the soft Lift on hover, 1px down with Press on active, over 0.18s on the ease-out curve. No resting shadows and no hard offset shadows.

## Shapes

Every piece is a gently rounded rectangle under a black keyline. Small pieces (buttons, tabs, chips, tags, filters, social links) take a 6px radius; boxes (call-outs, step panels, group boxes, parts pieces, the resume sheet, frames) take 10px; project icons sit inside their own 2px keyline at 10px. Swatch dots are circles with a 2px brick outline. Bricks are isometric, outlined at 1.5px (2px on the hero, 1px on chip and group pieces) with rounded joins.

**The One Keyline Rule.** There is one keyline system: 3px on boxes and buttons, 2px on chips, tags, icon wells and internal dividers, soft 2px rules between list rows. A new surface picks one of these; it does not invent a weight.

**The Empty Seat Rule.** A dashed line always means "a piece goes here". Focus is a 3px dashed outline offset 4px (4.1:1 in light, 11.6:1 in night); loading and error states are 3px dashed boxes; models show the next brick's place as a dashed seat with a dashed arrow.

## Components

### Buttons
Sturdy, keylined pieces that pick up and click home.
- **Shape:** gently rounded (6px) with a 3px keyline, 52px minimum height, 17px at 700.
- **Primary:** Instruction Blue with white text ("See the build", "Email me"). Hover deepens to Deep Instruction Blue.
- **Secondary:** Call-out White with ink text, same keyline.
- **Hover / Active:** 2px lift with the soft Lift shadow; 1px press on active. Focus is the dashed empty seat.

### Chips and Tags
- **Chip:** a 2px-keyline white piece holding a round era swatch or a tiny brick plus a 14px label; used for the parts call-out and resume skills. Static.
- **Tag:** a 2px-keyline white link piece (14px, 600) with an optional 12px inline SVG arrow; lifts 2px on hover.

### Era Filters
3px-keyline white toggles at 44px with an era swatch dot and a count. Pressed fills Instruction Blue with white text.

### Cards / Containers
- **Call-out:** white, 3px keyline, 10px radius, 16px by 18px padding, headed by a Box Title.
- **Step panel:** the translucent Sky Panel wash under a 3px keyline, so the stud grid shows through; holds the step numeral, model and proof.
- **Parts piece:** a white keylined row (56px art, name and caption, count) that lifts on hover when it is a link.
- **Group box:** a white archive box with a keylined head carrying its group brick and a ruled two-column inventory; rows fill Sky Band on hover rather than lifting.
- **Shadow strategy:** see Elevation & Depth; boxes never carry a resting shadow.

### Navigation
A sticky sky top bar with a soft 2px underline: the brand (a single red 2x2 brick and the name at 800) at left; at right a segmented tab strip in one 3px keyline with 2px dividers, current page filled Instruction Blue, hover Sky Band. Beside it the theme toggle, a two-stud switch brick whose yellow knob slides right and turns blue for the night build. Under 640px the bar unsticks and the tabs share the full width.

### Status
Loading and error messages sit in a 3px dashed box at 10px radius in Ink Secondary, the empty seat in component form.

### Instruction Model
The signature component: an inline isometric SVG from `tools/bricks.py` with a plate, the bricks up to this step, earlier steps ghosted, the new brick, and on the hero a dashed arrow and labelled years. Bricks render in place by default. Only when `html.motion` is set (JS on, reduced motion off) does the new brick start 40px raised and seat with a 0.75s drop, a 1.5px overshoot and a settle, as its model scrolls into view.

**The In-Place Rule.** With no JS or with reduced motion, every brick is already seated. Motion is an enhancement that starts from the finished model, never a dependency.

## Do's and Don'ts

### Do:
- **Do** take every colour from a `css/site.css` token and define any new one there for both themes before using it in a page `<style>` block.
- **Do** colour bricks by era only: games yellow, enterprise white, interactive ads blue, ed-tech green, independent and AI builds red, plate grey for baseplates and ghosted steps.
- **Do** set keylines at 3px on boxes and buttons and 2px on chips, tags and dividers.
- **Do** keep surfaces flat at rest, lifting 2px with the soft Lift on hover and pressing 1px on active.
- **Do** use the 3px dashed outline, offset 4px, for focus, and dashed boxes for loading and error.
- **Do** render bricks in place and start them raised only under `html.motion`.
- **Do** give Naru the same piece, size and treatment as the other current projects.
- **Do** draw new illustration as isometric bricks from `tools/bricks.py`.

### Don't:
- **Don't** use a toy brand's name, logo or trade dress; keep to generic brick-manual language.
- **Don't** give Naru hero placement, a badge or a highlight colour.
- **Don't** set an eyebrow or kicker label above a heading; uppercase labels belong inside boxes as titles.
- **Don't** add resting shadows or hard offset shadows to surfaces.
- **Don't** hard-code colours in page styles or swap brick colours in the night build.
- **Don't** introduce a second typeface or a system display face.
