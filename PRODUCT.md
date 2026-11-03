# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and vanilla JS with no build step, served as-is by GitHub Pages at isaiahmann.com (`CNAME`, `.nojekyll`). `yarn dev` runs `serve` on port 8080 for local work. The owner prefers to stay static. A static-site generator is open for discussion only if a reason is compelling; the known candidates (nav and footer duplicated across every page, one `index.html` per project folder copied from `projects/template/`, the projects list rendered client-side from JSON) have not yet justified the cost of a build.

## Users

Primary: fellow builders. Founders, engineers, and potential collaborators working in AI, usually arriving with Isaiah's name in hand (a link, an intro, a Naru mention) and deciding whether he's someone worth building with or talking to.

Secondary, not designed for first: hiring managers evaluating a senior engineer, and Naru's own audience passing through.

## Product Purpose

Isaiah Mann's personal site: who he is, what he's building now, and what he's shipped before. Success means a visitor leaves trusting his credibility as a senior engineer who builds AI-native products. That trust comes from a decade of shipping, the companies behind it, and the work he's doing now. Reaching out (email, contact page) follows from that trust; it isn't the primary goal.

## Positioning

A senior engineer who designs, builds, and ships AI-native products, with a range few AI-focused engineers can claim: independent AI projects now (Naru among them), enterprise work at Committee for Children, Amazon, and Qualtrics, interactive ad work at true[X], and roots co-founding a game studio and shipping Unity games. He cares about software that directly helps people, and about inclusive teams.

## Operating Context

- Home (`index.html`): the career as a numbered build (cover, steps, parts list, about, contact).
- Projects (`projects/`): an archive of games and interactive work from 2015 on, driven by `json/projects.json` (31 entries, with `SortPriority` and `ShouldDisplay` controlling order and visibility), plus one detail page per project folder.
- Resume (`resume/`): an HTML resume with a PDF export that must fit on one page.
- Contact (`contact/`): email plus social channels.
- Naru lives on its own site and brand at heynaru.com. This site links to it rather than reproducing it.

## Capabilities and Constraints

- Light and dark themes via `js/theme.js`, loaded synchronously in `<head>`: an explicit choice is stored in localStorage, falling back to the OS preference, with a toggle injected into every `.nav-links`. Its `THEME_COLORS` must stay in sync with `--bg` in `css/modern.css`.
- `css/modern.css` is the current shared stylesheet and respects `prefers-reduced-motion`. Older stylesheets (`css/main.css`, `css/home.css`, etc.) are legacy, and `404.html` still uses them.
- GA4 analytics (`G-VWLRJPSKE3`) is kept on pages.
- Terminology: "Resume", not "Résumé" (a deliberate change). The home page nav still says "Résumé".
- The game archive is supporting history: kept as proof of a long shipping record, while AI work leads.

## Brand Commitments

- Name: Isaiah Mann. Location: Seattle. Public email: isaiahbmann@gmail.com.
- Voice: warm and plain-spoken, in the first person. Human, low on jargon, no self-promotional puffery. The recent copy revision was explicitly about sounding more human.
- Headshot at `images/photos/isaiah.png`: optional. Used for the share image and favicon, not required in page design.
- Naru's identity (the serif lowercase "n" with a terracotta flame, `images/projects/naru-icon.png`) belongs to Naru; use it to refer to Naru, not as Isaiah's personal mark.

## Evidence on Hand

- Employment history, per the resume (`resume/index.html`): Naru (founder, 2026–now), Committee for Children (Senior Software Engineer II, Jun 2022–now), Infillion (Senior Software Engineer, Jun 2021–May 2022), Qualtrics (Software Engineer II, Oct 2019–Jun 2021), true[X] (Software Engineer, Sep 2018–Oct 2019), Amazon (SDE, Jul 2017–Sep 2018), plus Fay Games, Nickelodeon and MassDiGI during college. GlowLime Games (co-founder and technical director, 2015–17) at Hampshire College (BS Computer Science, 2013–17). The old home page listed different years for Amazon and true[X]; the resume is treated as the source of truth.
- 31 projects in `json/projects.json` with roles, team sizes, contributions, dates, screenshots, videos, and store links. Highlights: Defenders of the Light (described on-site as featured at PAX), Pickup Pup, Word Snack, Kind Cloud, PlanTogether, Kinarium.
- Third-party coverage: a Hampshire College profile of the GlowLime Games / Defenders of the Light work.
- Resume content in `resume/`.
- Absent, never to be fabricated: testimonials or quotes, usage or revenue metrics, Naru traction numbers, client logos beyond the named employers, and written case studies with outcomes.

## Product Principles

1. Credibility through evidence, not adjectives. Real companies, real shipped work, and real dates carry the claim.
2. Builders first. Write and structure for a peer deciding whether to collaborate, not for a keyword-scanning screener.
3. The whole record carries the claim. Current AI work, Naru included, is the latest part of the record, not a headline above it. Naru is referenced as a current project, never as the hero piece or a priority above everything else. The games archive deepens trust.
4. Sound like a person. Warm, direct, first person, matching how Isaiah talks about software that helps people.
5. Stay simple to maintain. Static pages Isaiah can edit by hand; new complexity has to earn its place.
