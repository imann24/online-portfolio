#!/usr/bin/env python3
"""
Draws the site's isometric brick illustrations as inline SVG.

The site has no build step: this is a one-off authoring helper. It rewrites the
SVG between marker comments in the HTML files, e.g.

    <!-- bricks:hero -->  ...generated...  <!-- /bricks:hero -->

Run it from the repo root after changing BUILD below:

    python3 tools/bricks.py

Colours come from CSS custom properties (see css/site.css), so the same markup
works in both themes.
"""
import math
import pathlib
import re

C = math.cos(math.radians(30))  # 0.866
BRICK_H = 1.2                   # brick height in stud units
PLATE_H = 0.4
STUD_R = 0.3
STUD_H = 0.18

# The career, bottom to top. x0/length are in studs; length is sized to the
# time spent in that step (about two studs per year).
BUILD = [
    {"step": 1, "x0": 1, "len": 6, "color": "yellow", "label": "2014–17", "name": "Games"},
    {"step": 2, "x0": 3, "len": 2, "color": "white", "label": "2017–18", "name": "Amazon"},
    {"step": 3, "x0": 4, "len": 2, "color": "blue", "label": "2018–19", "name": "true[X]"},
    {"step": 4, "x0": 2, "len": 4, "color": "white", "label": "2019–21", "name": "Qualtrics"},
    {"step": 5, "x0": 3, "len": 2, "color": "blue", "label": "2021–22", "name": "Infillion"},
    {"step": 6, "x0": 1, "len": 8, "color": "green", "label": "2022–now", "name": "Committee for Children"},
    {"step": 7, "x0": 2, "len": 6, "color": "red", "label": "2023–now", "name": "Independent builds"},
]
PLATE = {"x0": 0, "len": 10, "y0": 0, "depth": 4}
BRICK_Y0 = 1  # bricks sit on the middle two rows of the plate


def proj(x, y, z, s):
    return ((x - y) * C * s, ((x + y) * 0.5 - z) * s)


def pts(points, s, ox, oy):
    out = []
    for x, y, z in points:
        px, py = proj(x, y, z, s)
        out.append(f"{px + ox:.1f},{py + oy:.1f}")
    return " ".join(out)


def stud(cx, cy, z, s, ox, oy, tone):
    """A stud on a horizontal plane at height z, centred on (cx, cy)."""
    px, py = proj(cx, cy, z, s)
    px, py = px + ox, py + oy
    rx, ry = STUD_R * math.sqrt(2) * C * s, STUD_R * math.sqrt(2) * 0.5 * s
    h = STUD_H * s
    return (
        f'<path class="k {tone}-2" d="M{px - rx:.1f},{py:.1f} '
        f'a{rx:.1f},{ry:.1f} 0 0 0 {2 * rx:.1f},0 v{-h:.1f} h{-2 * rx:.1f} z"/>'
        f'<ellipse class="k {tone}-1" cx="{px:.1f}" cy="{py - h:.1f}" rx="{rx:.1f}" ry="{ry:.1f}"/>'
    )


def block(x0, y0, z0, length, depth, height, s, ox, oy, tone, studs_skip=None, studs_front_of=None):
    """Body (top + two visible faces) and its studs, split into back/front lists."""
    x1, y1, z1 = x0 + length, y0 + depth, z0 + height
    body = (
        f'<polygon class="k {tone}-2" points="{pts([(x0, y1, z0), (x1, y1, z0), (x1, y1, z1), (x0, y1, z1)], s, ox, oy)}"/>'
        f'<polygon class="k {tone}-3" points="{pts([(x1, y0, z0), (x1, y1, z0), (x1, y1, z1), (x1, y0, z1)], s, ox, oy)}"/>'
        f'<polygon class="k {tone}-1" points="{pts([(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)], s, ox, oy)}"/>'
    )
    back, front = [], []
    for i in range(length):
        for j in range(depth):
            sx, sy = x0 + i + 0.5, y0 + j + 0.5
            if studs_skip and studs_skip(sx, sy):
                continue
            svg = stud(sx, sy, z1, s, ox, oy, tone)
            (front if studs_front_of and sx > studs_front_of else back).append((sx + sy, svg))
    back.sort(key=lambda t: t[0])
    front.sort(key=lambda t: t[0])
    return body, [t[1] for t in back], [t[1] for t in front]


def model(upto, s, ghost_before=None, raise_last=False, labels=False, label_x=None):
    """The baseplate plus BUILD[:upto]. Returns (svg_inner, width, height)."""
    bricks = BUILD[:upto]
    top_z = PLATE_H + BRICK_H * len(bricks) + STUD_H
    # Bounding box in projected space.
    xs, ys = [], []
    for x in (PLATE["x0"], PLATE["x0"] + PLATE["len"]):
        for y in (0, PLATE["depth"]):
            for z in (0, top_z + (BRICK_H if raise_last else 0)):
                px, py = proj(x, y, z, s)
                xs.append(px)
                ys.append(py)
    pad = 6
    ox, oy = -min(xs) + pad, -min(ys) + pad
    width = max(xs) - min(xs) + pad * 2
    height = max(ys) - min(ys) + pad * 2

    layers = []
    below = PLATE
    level_z = 0.0
    # Plate studs hidden under the first brick.
    first = bricks[0] if bricks else None

    def under(b):
        return lambda sx, sy: b and b["x0"] < sx < b["x0"] + b["len"] and BRICK_Y0 < sy < BRICK_Y0 + 2

    body, back, front = block(
        PLATE["x0"], 0, 0, PLATE["len"], PLATE["depth"], PLATE_H, s, ox, oy, "plate",
        studs_skip=under(first), studs_front_of=(first["x0"] + first["len"]) if first else None,
    )
    pending_front = front
    layers.append(f'<g class="b-plate">{body}{"".join(back)}</g>')
    level_z = PLATE_H
    for idx, b in enumerate(bricks):
        nxt = bricks[idx + 1] if idx + 1 < len(bricks) else None
        ghost = ghost_before is not None and b["step"] < ghost_before
        tone = "ghost" if ghost else b["color"]
        body, back, front = block(
            b["x0"], BRICK_Y0, level_z, b["len"], 2, BRICK_H, s, ox, oy, tone,
            studs_skip=under(nxt), studs_front_of=(nxt["x0"] + nxt["len"]) if nxt else None,
        )
        is_last = idx == len(bricks) - 1
        cls = f'b b-{b["step"]}' + (" is-new" if is_last and raise_last else "")
        group = f'<g class="{cls}">{body}{"".join(back)}</g>'
        if is_last and raise_last:
            # The empty seat: a dashed outline where the new piece lands. The
            # piece covers it once seated, so it only shows while the piece drops.
            x0, x1, y0, y1 = b["x0"], b["x0"] + b["len"], BRICK_Y0, BRICK_Y0 + 2
            z0, z1 = level_z, level_z + BRICK_H
            layers.append(
                f'<g class="b-seat">'
                f'<polygon points="{pts([(x0, y1, z0), (x1, y1, z0), (x1, y1, z1), (x0, y1, z1)], s, ox, oy)}"/>'
                f'<polygon points="{pts([(x1, y0, z0), (x1, y1, z0), (x1, y1, z1), (x1, y0, z1)], s, ox, oy)}"/>'
                f'<polygon points="{pts([(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)], s, ox, oy)}"/></g>'
            )
        # Studs of the previous layer that sit in front of this brick draw after it.
        layers.append(group)
        if pending_front:
            layers.append(f'<g class="b-front">{"".join(pending_front)}</g>')
        pending_front = front
        level_z += BRICK_H
    if pending_front:
        layers.append(f'<g class="b-front">{"".join(pending_front)}</g>')

    extra = ""
    if raise_last and bricks:
        b = bricks[-1]
        # Dashed arrow pointing down at the newest brick's seat.
        mx = b["x0"] + b["len"] / 2
        ax, ay = proj(mx, BRICK_Y0 + 1, level_z + BRICK_H * 1.9, s)
        bx, by = proj(mx, BRICK_Y0 + 1, level_z + BRICK_H * 1.05, s)
        ax, ay, bx, by = ax + ox, ay + oy, bx + ox, by + oy
        extra += (
            f'<g class="b-arrow"><line x1="{ax:.1f}" y1="{ay:.1f}" x2="{bx:.1f}" y2="{by - 4:.1f}"/>'
            f'<polyline points="{bx - 6:.1f},{by - 10:.1f} {bx:.1f},{by - 2:.1f} {bx + 6:.1f},{by - 10:.1f}"/></g>'
        )
    if labels:
        lx = label_x if label_x is not None else width + 40
        # Anchor each label at its brick's short face, then walk top-down so the
        # labels stay in build order and never overlap.
        anchors = []
        z = PLATE_H
        for b in bricks:
            px, py = proj(b["x0"] + b["len"], BRICK_Y0 + 1, z + BRICK_H / 2, s)
            anchors.append((b, px + ox, py + oy))
            z += BRICK_H
        gap = 30
        placed = []
        prev = None
        for b, px, py in reversed(anchors):
            ly = py if prev is None else max(py, prev + gap)
            placed.append((b, px, py, ly))
            prev = ly
        for b, px, py, ly in placed:
            extra += (
                f'<g class="b-label"><polyline points="{px + 4:.1f},{py:.1f} {lx - 34:.1f},{py:.1f} {lx - 10:.1f},{ly:.1f}"/>'
                f'<text x="{lx:.1f}" y="{ly + 5:.1f}"><tspan class="b-label-year">{b["label"]}</tspan>'
                f'<tspan x="{lx + 104:.1f}">{b["name"]}</tspan></text></g>'
            )
        height = max(height, prev + 20)
        width = lx + 104 + 214
    return "".join(layers) + extra, width, height


def svg(inner, w, h, cls, label=None):
    a11y = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true" focusable="false"'
    return f'<svg class="{cls}" viewBox="0 0 {w:.0f} {h:.0f}" {a11y}>{inner}</svg>'


def single(length, depth, tone, s, cls, label=None):
    """One loose brick, for parts lists and the brand mark."""
    xs, ys = [], []
    for x in (0, length):
        for y in (0, depth):
            for z in (0, BRICK_H + STUD_H):
                px, py = proj(x, y, z, s)
                xs.append(px)
                ys.append(py)
    pad = 3
    ox, oy = -min(xs) + pad, -min(ys) + pad
    body, back, front = block(0, 0, 0, length, depth, BRICK_H, s, ox, oy, tone)
    inner = body + "".join(back) + "".join(front)
    return svg(inner, max(xs) - min(xs) + pad * 2, max(ys) - min(ys) + pad * 2, cls, label)


def empty_seat(s, cls):
    """A baseplate with a dashed outline where a 2x4 brick should be (404, loading)."""
    inner, w, h = "", 0, 0
    xs, ys = [], []
    for x in (0, 8):
        for y in (0, 4):
            for z in (0, BRICK_H + 1):
                px, py = proj(x, y, z, s)
                xs.append(px)
                ys.append(py)
    pad = 6
    ox, oy = -min(xs) + pad, -min(ys) + pad
    body, back, front = block(0, 0, 0, 8, 4, PLATE_H, s, ox, oy, "plate",
                              studs_skip=lambda sx, sy: 2 < sx < 6 and 1 < sy < 3)
    z0, z1 = PLATE_H, PLATE_H + BRICK_H
    outline = (
        f'<g class="b-seat"><polygon points="{pts([(2, 1, z0), (6, 1, z0), (6, 3, z0), (2, 3, z0)], s, ox, oy)}"/>'
        f'<polygon points="{pts([(2, 3, z0), (6, 3, z0), (6, 3, z1), (2, 3, z1)], s, ox, oy)}"/>'
        f'<polygon points="{pts([(6, 1, z0), (6, 3, z0), (6, 3, z1), (6, 1, z1)], s, ox, oy)}"/>'
        f'<polygon points="{pts([(2, 1, z1), (6, 1, z1), (6, 3, z1), (2, 3, z1)], s, ox, oy)}"/></g>'
    )
    inner = body + "".join(back) + "".join(front) + outline
    return svg(inner, max(xs) - min(xs) + pad * 2, max(ys) - min(ys) + pad * 2, cls)


def blocks():
    out = {}
    inner, w, h = model(len(BUILD), 30, raise_last=True, labels=True, label_x=None)
    out["hero"] = svg(inner, w, h, "model model-hero")
    inner, w, h = model(len(BUILD), 30, raise_last=True)
    out["hero-compact"] = svg(inner, w, h, "model model-hero model-hero-compact")
    for b in BUILD:
        inner, w, h = model(b["step"], 28, ghost_before=b["step"], raise_last=True)
        out[f"step-{b['step']}"] = svg(inner, w, h, "model model-step")
    out["mark"] = single(2, 2, "red", 9, "mark")
    out["seat"] = empty_seat(26, "seat")
    for name, (l, d, tone) in {
        "part-ai": (2, 2, "red"), "part-agents": (4, 2, "red"), "part-fullstack": (4, 2, "blue"),
        "part-arch": (6, 2, "white"), "part-games": (2, 2, "yellow"), "part-team": (3, 2, "green"),
    }.items():
        out[name] = single(l, d, tone, 9, "part-piece")
    for tone in ("red", "blue", "white", "yellow", "green"):
        out[f"chip-{tone}"] = single(2, 2, tone, 5, "chip-piece")
    out["group-ai"] = single(4, 2, "red", 9, "group-piece")
    out["group-platform"] = single(4, 2, "blue", 9, "group-piece")
    out["group-games"] = single(4, 2, "yellow", 9, "group-piece")
    return out


def inject(paths):
    generated = blocks()
    pattern = re.compile(r"(<!-- bricks:([a-z0-9-]+) -->)(.*?)(<!-- /bricks:\2 -->)", re.S)
    for path in paths:
        p = pathlib.Path(path)
        text = p.read_text()
        new = pattern.sub(lambda m: m.group(1) + generated[m.group(2)] + m.group(4), text)
        if new != text:
            p.write_text(new)
            print(f"updated {path}")


if __name__ == "__main__":
    root = pathlib.Path(__file__).resolve().parent.parent
    files = [root / "index.html", root / "404.html", root / "projects" / "index.html",
             root / "projects" / "template" / "index.html", root / "contact" / "index.html",
             root / "resume" / "index.html"]
    inject([f for f in files if f.exists()])
