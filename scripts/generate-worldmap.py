#!/usr/bin/env python3
"""Regenerate assets/worldmap.svg (dotted land mask + country pins).

Usage:
    curl -sL -o /tmp/land.geojson \
      https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
    python3 scripts/generate-worldmap.py /tmp/land.geojson

Equirectangular projection on a 1000x500 grid; land sampled every 2.6deg
from Natural Earth 110m polygons (public domain). Edit PINS to add or
remove countries, then re-run and `node build.mjs`.
"""
import json
import sys

PINS = [
    ("Argentina", -64.0, -34.6), ("Australia", 134.0, -25.0),
    ("Bosnia & Herzegovina", 17.8, 44.2), ("Brazil", -51.9, -10.8),
    ("Bulgaria", 25.5, 42.7), ("Canada", -97.0, 55.0), ("Chile", -71.0, -33.4),
    ("Croatia", 16.0, 45.5), ("Czech Republic", 15.5, 49.8),
    ("Egypt", 30.8, 26.8), ("Estonia", 25.0, 58.7), ("France", 2.2, 46.6),
    ("Greece", 22.0, 39.0), ("Honduras", -86.6, 14.6), ("Hungary", 19.5, 47.2),
    ("India", 78.9, 21.0), ("Indonesia", 113.9, -0.8), ("Italy", 12.6, 42.5),
    ("Lithuania", 23.9, 55.2), ("North Macedonia", 21.7, 41.6),
    ("Malaysia", 101.9, 4.2), ("Mexico", -102.5, 23.6),
    ("Netherlands", 5.3, 52.1), ("New Zealand", 172.9, -41.5),
    ("Nigeria", 8.7, 9.1), ("Philippines", 121.8, 12.9), ("Poland", 19.1, 51.9),
    ("Portugal", -8.2, 39.4), ("Romania", 25.0, 45.9), ("Russia", 44.0, 56.0),
    ("Scotland", -4.2, 56.8), ("Serbia", 21.0, 44.0), ("Singapore", 103.8, 1.35),
    ("Slovenia", 15.0, 46.1), ("Spain", -3.7, 40.4), ("Sweden", 16.0, 62.0),
    ("Taiwan", 121.0, 23.7), ("Turkey", 35.2, 39.0), ("Ukraine", 31.2, 49.0),
    ("United Arab Emirates", 54.3, 23.9), ("United Kingdom", -1.5, 52.5),
    ("United States", -98.5, 39.8), ("Vietnam", 106.0, 17.0),
]

W, H, STEP = 1000, 500, 2.6


def main(geojson_path):
    data = json.load(open(geojson_path))
    polys = []
    for feat in data["features"]:
        g = feat["geometry"]
        rings = [g["coordinates"][0]] if g["type"] == "Polygon" else [
            p[0] for p in g["coordinates"]]
        polys.extend(rings)
    boxes = [(min(c[0] for c in p), min(c[1] for c in p),
              max(c[0] for c in p), max(c[1] for c in p)) for p in polys]

    def inside(lon, lat, ring):
        n, j, res = len(ring), len(ring) - 1, False
        for i in range(n):
            xi, yi = ring[i]
            xj, yj = ring[j]
            if ((yi > lat) != (yj > lat)) and (
                    lon < (xj - xi) * (lat - yi) / (yj - yi) + xi):
                res = not res
            j = i
        return res

    def on_land(lon, lat):
        return any(
            b[0] <= lon <= b[2] and b[1] <= lat <= b[3] and inside(lon, lat, p)
            for b, p in zip(boxes, polys))

    def xy(lon, lat):
        return round((lon + 180) / 360 * W), round((90 - lat) / 180 * H)

    dots = []
    lat = -55.0
    while lat <= 78:
        lon = -180.0
        while lon < 180:
            if on_land(lon, lat):
                x, y = xy(lon, lat)
                dots.append(f"M{x} {y}h.1")
            lon += STEP
        lat += STEP

    svg = [
        f'<svg class="map-svg" viewBox="0 40 {W} 420" '
        'xmlns="http://www.w3.org/2000/svg" role="img" '
        'aria-label="World map with pins marking the countries '
        'Togglers work from">',
        f'<path d="{"".join(dots)}" fill="none" stroke="#FCE5DB" '
        'stroke-width="3.4" stroke-linecap="round" opacity=".45"/>',
    ]
    for name, lon, lat in PINS:
        x, y = xy(lon, lat)
        svg.append(
            f'<circle class="map-pin" cx="{x}" cy="{y}" r="5">'
            f'<title>{name}</title></circle>')
    svg.append('</svg>')
    out = "".join(svg)
    open("assets/worldmap.svg", "w").write(out)
    print(f"assets/worldmap.svg written ({len(dots)} dots, {len(PINS)} pins)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
