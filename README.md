# Sports Live Card — Lovelace Cards for Home Assistant

Lovelace card collection for the [Sports Live](https://github.com/andrejkurlovic/ha-sports-live) integration.

Forked from [Bobsilvio/calcio-live-card](https://github.com/Bobsilvio/calcio-live-card). Updated to discover both old `calciolive_*` and new `sports_live_*` entity prefixes, so existing dashboards continue to work.

---

## Installation

### Via HACS (recommended)

1. Add this repo as a custom HACS repository:
   - **HACS → Frontend → ⋮ → Custom repositories**
   - URL: `https://github.com/andrejkurlovic/ha-sports-live-card`
   - Category: **Lovelace**
2. Install **Sports Live Card**
3. Add the resource in **Settings → Dashboards → Resources** (HACS does this automatically)
4. Clear your browser cache

### Manual

1. Download `dist/sports-live-card.bundle.js`
2. Copy it to `/config/www/`
3. Add as a resource in **Settings → Dashboards → Resources**:
   ```
   URL: /local/sports-live-card.bundle.js
   Type: JavaScript module
   ```

---

## Cards

All cards are discovered and configurable from the Lovelace visual editor.

| Card | Entity prefix | Description |
|------|---------------|-------------|
| **Matches** | `sensor.sports_live_matches_*` | Scoreboard for a competition |
| **Standings** | `sensor.sports_live_standings_*` | League table |
| **Team** | `sensor.sports_live_next_*` | Next match for a team |
| **Bracket** | `sensor.sports_live_bracket_*` | Knockout tree / playoff bracket |
| **Lineup** | `sensor.sports_live_next_*` | Starting lineups (soccer) |
| **News** | `sensor.sports_live_news_*` | Latest headlines |
| **Timeline** | `sensor.sports_live_next_*` | Match event timeline |

---

## Backward Compatibility

The card editors discover both:
- `sensor.sports_live_*` — new domain (this integration)
- `sensor.calciolive_*` — old domain (original calcio-live)

Existing dashboards using the old integration continue to work without changes.

---

## Upstream Attribution

This project builds on [calcio-live-card](https://github.com/Bobsilvio/calcio-live-card) by [@Bobsilvio](https://github.com/Bobsilvio).  
Original license: MIT — see [LICENSE](LICENSE).

---

## License

MIT
