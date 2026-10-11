# Cryptography & Network Security Study Guides

Study guides for Stallings, *Cryptography and Network Security: Principles and Practice* (7th ed., Global Edition), one page per unit.

Live site: https://hienkyle.github.io/cryptography-security-study/

## Adding a unit

1. Add the page as `unitN.html` in the repo root.
2. In `index.html`, set `file: "unitN.html"` for that unit in the `UNITS` list.
3. In `notation.js`, list the symbols the unit uses under `UNIT_USES`, and add `<script src="notation.js" data-unit="N" defer></script>` before `</body>` in the unit page (this adds the notation note button).

## Hosting

Served by GitHub Pages from the `main` branch root. `.nojekyll` turns off Jekyll processing.
