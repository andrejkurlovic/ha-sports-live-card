# Sports Live Card — Lovelace Cards for Home Assistant

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange)](https://hacs.xyz)
[![Release](https://img.shields.io/github/v/release/andrejkurlovic/ha-sports-live-card)](https://github.com/andrejkurlovic/ha-sports-live-card/releases)

A collection of Lovelace cards for the [Sports Live](https://github.com/andrejkurlovic/ha-sports-live) integration. Display live scores, standings, fixtures, brackets, lineups, and news on your Home Assistant dashboard.

> Built on top of [Bobsilvio/calcio-live-card](https://github.com/Bobsilvio/calcio-live-card). Updated to discover both `sports_live_*` and `calciolive_*` entity prefixes so your existing dashboards keep working.

---

## Prerequisites

Install the **Sports Live** backend integration first:
→ [andrejkurlovic/ha-sports-live](https://github.com/andrejkurlovic/ha-sports-live)

---

## Installation

### Via HACS (recommended)

1. Open HACS → **Frontend** → ⋮ → **Custom repositories**
2. Add `https://github.com/andrejkurlovic/ha-sports-live-card` — category **Lovelace**
3. Find **Sports Live Card** and install it
4. HACS automatically registers the resource — hard-refresh your browser (Ctrl+F5 / Cmd+Shift+R)

### Manual

1. Download `dist/sports-live-card.bundle.js` from the [latest release](https://github.com/andrejkurlovic/ha-sports-live-card/releases/latest)
2. Upload it to `/config/www/`
3. Add as a resource: **Settings → Dashboards → Resources → Add resource**
   - URL: `/local/sports-live-card.bundle.js`
   - Resource type: **JavaScript module**
4. Hard-refresh your browser

---

## Cards

All cards support the Lovelace **visual editor** — click the pencil icon on any card to configure it without writing YAML.

### Matches card

Shows the full scoreboard for a competition.

```yaml
type: custom:calcio-live-matches
entity: sensor.sports_live_matches_eng_1
```

**Entity filter:** `sensor.sports_live_matches_*` or `sensor.calciolive_all_*`

---

### Standings card

Shows the league table.

```yaml
type: custom:calcio-live-classifica
entity: sensor.sports_live_standings_eng_1
```

Supports soccer standings (W/D/L/GD/Pts) and rugby standings (W/D/L/PD/BP/TF/TA/Pts).

**Entity filter:** `sensor.sports_live_standings_*` or `sensor.calciolive_classifica_*`

---

### Team card

Shows the next or current match for a tracked team.

```yaml
type: custom:calcio-live-team
entity: sensor.sports_live_next_arsenal
```

Displays: opponent, date/time, venue, result, goalscorers, **UK broadcast channel** (`broadcast_uk` attribute), and formation if available.

**Entity filter:** `sensor.sports_live_next_*` or `sensor.calciolive_next_*`

---

### Bracket card

Shows the knockout bracket or playoff tree.

```yaml
type: custom:calcio-live-bracket
entity: sensor.sports_live_bracket_uefa_champions
```

Supports: two-legged ties (soccer), single-game rounds (NFL playoffs: Wild Card → Championship), and aggregate scores.

**Entity filter:** `sensor.sports_live_bracket_*` or `sensor.calciolive_bracket_*`

---

### Lineup card

Shows the starting lineup and bench for the next match.

```yaml
type: custom:calcio-live-lineup
entity: sensor.sports_live_next_arsenal
```

Available for soccer (when ESPN provides lineup data before kick-off).

**Entity filter:** `sensor.sports_live_next_*` or `sensor.calciolive_next_*`

---

### News card

Shows the latest headlines.

```yaml
type: custom:calcio-live-news
entity: sensor.sports_live_news_eng_1
```

**Entity filter:** `sensor.sports_live_news_*` or `sensor.calciolive_news_*`

---

### Timeline card

Shows in-match event timeline (goals, cards, subs).

```yaml
type: custom:calcio-live-timeline
entity: sensor.sports_live_next_arsenal
```

**Entity filter:** `sensor.sports_live_next_*` or `sensor.calciolive_next_*`

---

## UK Broadcast Information

The Sports Live integration sets a `broadcast_uk` attribute on every match (e.g. `"Sky Sports / TNT Sports"`). The Team card renders this automatically when present. For the Matches card, it is available in the raw `matches` attribute list for template sensors or custom automations.

---

## Backward Compatibility

Card editors discover both:
- `sensor.sports_live_*` — new domain (this integration)
- `sensor.calciolive_*` — original calcio-live domain

**Existing dashboards do not need to be updated.**

---

## Upstream Attribution

Forked from [Bobsilvio/calcio-live-card](https://github.com/Bobsilvio/calcio-live-card) — original soccer-only Lovelace cards. Original work copyright Bobsilvio, MIT licence.

---

## Licence

MIT — see [LICENSE](LICENSE).
