#!/usr/bin/env python3
"""Render the site's favicon and social preview (authoring only, no site build).

Run: python3 tools/brand_assets.py
Requires Python Playwright with Chromium installed. Artwork comes from bricks.py,
colours from css/site.css, and lettering from the self-hosted Rubik font.
"""
import base64
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

sys.dont_write_bytecode = True
import bricks

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    css = (ROOT / "css/site.css").read_text()
    tokens = dict(re.findall(r"--([\w-]+):\s*([^;]+);", css.split(":root {")[1].split("}")[0]))
    palette = ".k{stroke:" + tokens["brick-line"] + ";stroke-width:1.5;stroke-linejoin:round}"
    palette += "".join(
        f".{tone}-{face}{{fill:{tokens[f'{tone}-{face}']}}}"
        for tone in ("red", "yellow", "blue", "green", "white", "plate")
        for face in (1, 2, 3)
    )
    mark = bricks.single(2, 2, "red", 9, "mark")
    # A solid sky tile preserves the dark outline in both light and dark browser chrome.
    icon = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">'
        '<title>Isaiah Mann — red building brick</title>'
        f'<style>{palette}</style>'
        f'<rect width="40" height="40" rx="7" fill="{tokens["page"]}"/>'
        + mark.replace('<svg ', '<svg x="1.5" y="2" width="37" height="36" ', 1)
        + '</svg>'
    )
    icon_dir = ROOT / "images/favicon"
    (icon_dir / "favicon.svg").write_text(icon + "\n")
    inner, width, height = bricks.model(len(bricks.BUILD), 30)
    model = bricks.svg(inner, width, height, "build")
    font = base64.b64encode((ROOT / "fonts/rubik-latin.woff2").read_bytes()).decode()
    preview = f"""<!doctype html>
<html lang="en"><meta charset="utf-8"><title>Isaiah Mann — social preview</title>
<style>
@font-face {{ font-family: Rubik; src: url(data:font/woff2;base64,{font}); font-weight: 300 900; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; width: 1200px; height: 630px; color: {tokens['ink']};
    background: {tokens['page']}; font-family: Rubik, sans-serif;
    background-image: radial-gradient(circle, {tokens['dot']} 1.6px, transparent 2px);
    background-size: 32px 32px; background-position: 16px 16px; }}
main {{ position: relative; width: 100%; height: 100%; padding: 64px; }}
.copy {{ position: absolute; left: 72px; top: 96px; }}
h1 {{ margin: 0 0 28px; font-size: 96px; font-weight: 800; line-height: .92; letter-spacing: -.035em; }}
p {{ margin: 0; font-size: 30px; line-height: 1.35; color: {tokens['ink-2']}; }}
.build {{ position: absolute; width: 440px; height: 460px; right: 64px; top: 40px; }}
.build .k {{ stroke-width: 2; }}
footer {{ position: absolute; left: 72px; right: 72px; bottom: 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 2px solid {tokens['line']}; padding-top: 20px; font-size: 22px; }}
footer strong {{ font-weight: 700; }}
footer span {{ color: {tokens['ink-2']}; }}
{palette}
</style>
<main><div class="copy"><h1>Isaiah<br>Mann</h1><p>Software Engineer<br>&amp; AI Builder</p></div>
{model}
<footer><strong>isaiahmann.com</strong><span>The build, step by step.</span></footer></main></html>"""
    social_dir = ROOT / "images/social"
    social_dir.mkdir(exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        page.set_content(preview)
        page.evaluate("document.fonts.ready")
        assert page.evaluate("document.fonts.check('800 96px Rubik')")
        page.screenshot(path=str(social_dir / "building-blocks.png"))
        for size, filename in ((32, "favicon.png"), (180, "apple-touch-icon.png")):
            page.set_viewport_size({"width": size, "height": size})
            # Apple applies its own rounded mask; fill the canvas behind the mark.
            background = tokens["page"] if size == 180 else "transparent"
            inset = "padding:18px;" if size == 180 else ""
            page.set_content(f'<style>*{{box-sizing:border-box}}body{{margin:0;background:{background};{inset}}}body>svg{{display:block;width:100%;height:auto}}</style>{icon}')
            page.screenshot(path=str(icon_dir / filename), omit_background=True)
        browser.close()
    print("Rendered favicon.svg, favicon.png (32×32), apple-touch-icon.png (180×180), and building-blocks.png (1200×630).")


if __name__ == "__main__":
    main()
