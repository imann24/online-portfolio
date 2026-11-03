# Building blocks brand assets

`building-blocks.png` is the 1200 × 630 Open Graph and Twitter share image.
The matching icons are `../favicon/favicon.svg`, `../favicon/favicon.png`
(32 × 32), and `../favicon/apple-touch-icon.png` (180 × 180).

All artwork is original, generated from the site's existing isometric geometry
in `tools/bricks.py`. The preview uses the seven-brick career model; the icons
use the navigation's red 2 × 2 brick. Colors come from `css/site.css`, and type
uses the self-hosted `fonts/rubik-latin.woff2`. No stock or AI-generated imagery.

To regenerate from the repository root:

```sh
python3 tools/brand_assets.py
```

This authoring helper requires Python Playwright and its Chromium browser. The
generated files are committed; the static site needs no runtime or build step.
