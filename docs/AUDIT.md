# ha-sports-live-card audit (2026-06-23)

Same review methodology used for lovelace-bin-collection-card and for this
project's own backend (`ha-sports-live/docs/AUDIT.md`): dead code, naming,
duplication, architecture risk. This pass covers `Matches/sports-live-matches.js`
and its editor — the two files touched while adding the v2.27.0/v2.28.0
features. The other six card types (Team, Standings, Bracket, Lineup, News,
Timeline) have not been audited yet; see "Not yet audited" below.

## Matches card — findings and fixes

1. **Stale class names** — `SportsLiveTodayMatchesCard` / `SportsLiveTodayMatchesEditor`.
   The card shows the full schedule (past + upcoming), not just today's
   matches — "Today" was a leftover from the pre-fork `calcio-live` naming
   (the original soccer-only card's "Tutte"/"All" card). The registered
   element name (`sports-live-matches`) and the YAML `type:` were already
   correct; only the internal class names were stale. Renamed to
   `SportsLiveMatchesCard` / `SportsLiveMatchesEditor` — zero external impact,
   these names aren't part of any persisted config or public API.
2. **One Italian comment** in an otherwise all-English file (`Le date sono
   nel formato...`), another forking leftover. Translated.
3. **Unnamed magic numbers** for the two timing values that actually matter
   for tuning the goal/card pulse and toast duration (`5000`, `4000`).
   Extracted to `RECENT_EVENT_HIGHLIGHT_MS` / `TOAST_VISIBLE_MS`.
4. No dead code found — every method is reachable from `render()` or the
   popup/event-handling paths.

Verified: rebuilt and rendered both the card and the editor after the
renames (jsdom, ad-hoc — this repo still has no permanent test suite); both
register and render correctly, and the v2.27.0/v2.28.0 focus-tracking
behavior still resolves to the same match key.

## v2.28.2 — real bug found in "verified" v2.27.0 scroll math

User reported the auto-scroll (v2.27.0) wasn't actually scrolling down to
the live/next match. Root cause: `_scrollToFocus()` computed
`row.offsetTop - container.offsetTop`. `.scroll-content` has
`position: relative` in this card's CSS, which makes it `.match-row`'s
`offsetParent` per the DOM spec — so `row.offsetTop` is *already* relative
to the scroll container's own top. Subtracting `container.offsetTop` on
top of that subtracted an unrelated value (`.scroll-content`'s own offset
under the header, since `ha-card` is also `position: relative`),
undershooting the target by roughly the header's height every time. Fixed:
just `row.offsetTop` (minus a small cosmetic margin), no subtraction.

**Why the original v2.27.0 verification didn't catch this**: jsdom has no
layout engine — `offsetTop`/`offsetParent` aren't computed from real CSS
there, they're always 0/null. The original "verification" script manually
injected `offsetTop` values via `Object.defineProperty` to test the
formula's arithmetic, which validated internal consistency but not whether
the formula was the *correct* one for this DOM's actual `position:relative`
chain — a CSS-driven bug that no amount of jsdom testing could have caught.
Re-verified this fix the same way (confirmed jsdom's real offsetTop is 0,
then exercised the corrected formula's arithmetic with an injected value),
but the actual correctness claim now rests on CSS/offsetParent spec
analysis, not a passing test. **Any future change to this scroll logic
needs a real browser check, not just a jsdom run.**

## v2.28.3 — replaced manual scroll math with scrollIntoView entirely

User reported v2.28.2 still didn't actually reach the live/next match. No
browser/devtools access is available in this environment to inspect real
layout, so rather than guess at a third manual offset formula,
`_scrollToFocus()` was rewritten to use `Element.scrollIntoView({ block:
'start', inline: 'nearest', behavior })` on the row directly. This is the
standard browser API for "bring this element into view inside whatever
scrollable ancestor contains it" — it requires no offsetTop/offsetParent
math and isn't sensitive to this card's CSS `position` choices at all,
eliminating the entire bug class both prior versions hit. Wrapped in a
double `requestAnimationFrame` so it runs after the browser has fully
committed layout for whatever Lit just patched. Added `console.debug`
diagnostics (row/container found or not, resulting `scrollTop`/
`scrollHeight`/`clientHeight`) specifically so that if this is *still*
wrong, the next debugging pass has real browser data to work from instead
of more guessing. Also hardened the row lookup with `CSS.escape()` on the
match-key attribute selector, in case a team name ever contains a
character that would otherwise break the selector.

## Deferred — affects every card, not just Matches

These two are real and worth doing, but they're shared patterns across
**all seven card types** via `modal-helper.js` and the editor convention —
fixing them only in Matches would just make Matches inconsistent with its
siblings. Treat as their own phase ("shared infra cleanup") rather than
bundling into a single card's pass:

- **Popups are hand-built `innerHTML` strings**, not Lit templates (`renderPopupToBody()`
  is ~75 lines of template-string HTML). The bin-collection-card's v5 rewrite
  replaced this exact pattern with a real `<bin-collection-popup>` Lit
  component. Doing the same here means touching `modal-helper.js` and every
  card that calls it (Matches, Team, Standings, Bracket at minimum) — a
  bigger, cross-cutting change.
- **Editors use hand-rolled `<select>`/`<input>`/`<ha-switch>`** instead of
  HA's native `ha-form` (schema + selectors), unlike bin-collection-card's
  editor. Same story: every card editor in this workspace follows this same
  hand-built convention, so converting one in isolation buys little.

## Not yet audited

Team (1463 lines), Standings (1171), Bracket (920), Lineup (340), News
(247), Timeline (334), plus shared `i18n.js` (799), `modal-helper.js` (87),
`skins.js` (93). One real gap found while scoping this: `Game/sports-live-game-card.js`
(602 lines) registers `customElements.define("sports-live-game", ...)` and
is imported from the main entry point — it's live, not dead — but it has
**no entry in README.md's card list**, unlike all six other card types.
Worth either documenting it or confirming with the user it's intentionally
unlisted (e.g. still in development) before the next pass touches it.
Continue this same audit-then-fix pass per file/module when picking the
project back up.
