import { LitElement, html, css } from "lit-element";

/**
 * Sports Live Game Card — teamtracker-inspired.
 *
 * Reads from any sensor that exposes attributes.matches[] (next_match sensor
 * or team sensor). Uses ESPN team colors as background gradients, renders
 * sport-specific live data (NFL down/distance, MLB bases/BSO, win probability),
 * and opens the ESPN game page when tapped.
 */
class SportsLiveGameCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this._config = config;
  }

  getCardSize() { return 3; }
  static getConfigElement() { return document.createElement("sports-live-game-editor"); }
  static getStubConfig() { return { entity: "" }; }

  _openLink(url) {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  _toHex(raw) {
    if (!raw) return null;
    const s = String(raw).replace(/^#/, "");
    return /^[0-9a-fA-F]{6}$/.test(s) ? `#${s}` : null;
  }

  // ---- sport-specific render helpers ----------------------------------------

  _renderWinProb(match) {
    const h = match.home_win_probability;
    const a = match.away_win_probability;
    if (h == null || a == null) return "";
    const hp = parseFloat(h).toFixed(0);
    const ap = parseFloat(a).toFixed(0);
    return html`
      <div class="win-prob">
        <div class="prob-labels">
          <span>${hp}%</span>
          <span class="prob-mid">Win Probability</span>
          <span>${ap}%</span>
        </div>
        <div class="prob-track">
          <div class="prob-home" style="width:${hp}%"></div>
          <div class="prob-away" style="width:${ap}%"></div>
        </div>
      </div>
    `;
  }

  _renderDownDistance(match) {
    if (!match.down_distance_text) return "";
    return html`<div class="down-distance">${match.down_distance_text}</div>`;
  }

  _renderTimeouts(match) {
    const h = match.home_timeouts;
    const a = match.away_timeouts;
    if (h == null && a == null) return "";
    const dots = (n) => {
      const max = 3;
      const count = parseInt(n, 10) || 0;
      return Array.from({ length: max }, (_, i) => html`
        <span class="to-dot ${i < count ? "on" : ""}"></span>
      `);
    };
    return html`
      <div class="timeouts-row">
        <div class="to-side">${dots(h)}</div>
        <span class="to-label">TO</span>
        <div class="to-side">${dots(a)}</div>
      </div>
    `;
  }

  _renderBaseball(match) {
    const { balls, strikes, outs, on_first, on_second, on_third } = match;
    if (balls == null && strikes == null && outs == null) return "";
    return html`
      <div class="baseball-row">
        <div class="bso">
          <div class="bso-item">
            <span class="bso-num">${balls ?? "-"}</span>
            <span class="bso-key">B</span>
          </div>
          <div class="bso-item">
            <span class="bso-num">${strikes ?? "-"}</span>
            <span class="bso-key">S</span>
          </div>
          <div class="bso-item">
            <span class="bso-num">${outs ?? "-"}</span>
            <span class="bso-key">O</span>
          </div>
        </div>
        <div class="bases-diamond">
          <div class="bases-row top">
            <div class="base ${on_second ? "occupied" : ""}"></div>
          </div>
          <div class="bases-row mid">
            <div class="base ${on_third ? "occupied" : ""}"></div>
            <div class="base home-plate"></div>
            <div class="base ${on_first ? "occupied" : ""}"></div>
          </div>
        </div>
      </div>
    `;
  }

  _renderLastPlay(match) {
    if (!match.last_play) return "";
    return html`
      <div class="last-play-wrap">
        <span class="last-play-text">${match.last_play}</span>
      </div>
    `;
  }

  _renderPeriodLabel(match) {
    const period = match.period;
    if (!period || period === "N/A") return "";
    const n = parseInt(period, 10);
    const status = (match.status || "").toLowerCase();
    // Halftime / overtime labels already in status
    if (status.includes("half") || status.includes("over") || status.includes("end")) {
      return html`<div class="period-label">${match.status}</div>`;
    }
    const suffix = ["st", "nd", "rd", "th"];
    const s = suffix[Math.min(n - 1, 3)] || "th";
    return html`<div class="period-label">${n}${s}</div>`;
  }

  // ---- main render ----------------------------------------------------------

  render() {
    if (!this.hass || !this._config) return html``;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="empty">Unknown entity: ${this._config.entity}</ha-card>`;
    }

    const matches = stateObj.attributes.matches || [];
    if (!matches.length) {
      return html`<ha-card class="empty">No match data available</ha-card>`;
    }

    const match = matches[0];
    const isLive = match.state === "in";
    const isPost = match.state === "post";
    const showScore = isLive || isPost;
    const eventUrl = match.event_url || "";

    const homeColor = this._toHex(match.home_color) || "#6366f1";
    const awayColor = this._toHex(match.away_color) || "#ec4899";

    return html`
      <ha-card
        class="${isLive ? "live" : isPost ? "post" : "pre"} ${eventUrl ? "clickable" : ""}"
        style="--hc: ${homeColor}; --ac: ${awayColor};"
        @click="${() => this._openLink(eventUrl)}"
      >
        <!-- Decorative background -->
        <div class="splash" aria-hidden="true"></div>
        <div class="bg-logos" aria-hidden="true">
          <div class="bg-logo home"><img src="${match.home_logo}" alt="" /></div>
          <div class="bg-logo away"><img src="${match.away_logo}" alt="" /></div>
        </div>

        <!-- Top bar -->
        <div class="top-bar">
          <span class="league">${match.league_name && match.league_name !== "N/A" ? match.league_name : ""}</span>
          ${isLive
            ? html`<span class="badge live-badge"><span class="dot"></span>LIVE</span>`
            : isPost
              ? html`<span class="badge ft-badge">FINAL</span>`
              : html`<span class="badge pre-badge">${match.date || "Upcoming"}</span>`
          }
        </div>

        <!-- Main scoreboard -->
        <div class="scoreboard">
          <div class="team">
            <div class="logo-wrap home-glow">
              <img class="logo" src="${match.home_logo}" alt="${match.home_team}" />
            </div>
            <div class="team-name">${match.home_team}</div>
            ${match.home_record ? html`<div class="record">${match.home_record}</div>` : ""}
          </div>

          <div class="center">
            ${showScore
              ? html`
                  <div class="score">
                    <span>${match.home_score}</span>
                    <span class="dash">–</span>
                    <span>${match.away_score}</span>
                  </div>
                `
              : html`<div class="vs">VS</div>`
            }
            <div class="clock-row">
              ${isLive
                ? html`<span class="clock clk-live"><span class="dot"></span>${match.clock && match.clock !== "N/A" ? match.clock : match.status || ""}</span>`
                : isPost
                  ? html`<span class="clock clk-ft">Full Time</span>`
                  : html`<span class="clock clk-pre">${match.date || ""}</span>`
              }
            </div>
            ${isLive ? this._renderPeriodLabel(match) : ""}
          </div>

          <div class="team">
            <div class="logo-wrap away-glow">
              <img class="logo" src="${match.away_logo}" alt="${match.away_team}" />
            </div>
            <div class="team-name">${match.away_team}</div>
            ${match.away_record ? html`<div class="record">${match.away_record}</div>` : ""}
          </div>
        </div>

        <!-- Live situation: NFL -->
        ${isLive ? this._renderDownDistance(match) : ""}
        ${isLive ? this._renderTimeouts(match) : ""}

        <!-- Live situation: MLB -->
        ${isLive ? this._renderBaseball(match) : ""}

        <!-- Live last play (NFL/NBA) -->
        ${isLive ? this._renderLastPlay(match) : ""}

        <!-- Win probability bar -->
        ${isLive ? this._renderWinProb(match) : ""}

        <!-- ESPN tap hint -->
        ${eventUrl ? html`<div class="tap-hint">Tap to view on ESPN →</div>` : ""}
      </ha-card>
    `;
  }

  // ---- styles ---------------------------------------------------------------

  static get styles() {
    return css`
      :host {
        display: block;
        --hc: #6366f1;
        --ac: #ec4899;
      }

      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        background: #0f172a;
        color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
        cursor: default;
        user-select: none;
      }
      ha-card.clickable { cursor: pointer; }
      ha-card.empty { padding: 24px; text-align: center; color: #94a3b8; }

      /* ── Decorative background ────────────────────────────────────────────── */
      .splash {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 65% 100% at 0% 50%, var(--hc) 0%, transparent 70%),
          radial-gradient(ellipse 65% 100% at 100% 50%, var(--ac) 0%, transparent 70%);
        opacity: 0.22;
        pointer-events: none;
        z-index: 0;
      }
      ha-card.live .splash { opacity: 0.30; animation: splash-pulse 3s ease-in-out infinite; }
      @keyframes splash-pulse {
        0%, 100% { opacity: 0.30; }
        50% { opacity: 0.20; }
      }

      .bg-logos {
        position: absolute; inset: 0;
        display: flex; justify-content: space-between;
        pointer-events: none; z-index: 0; overflow: hidden;
      }
      .bg-logo {
        width: 55%; height: 100%;
        display: flex; align-items: center;
        opacity: 0.055;
      }
      .bg-logo.home { justify-content: flex-start; transform: translateX(-22%) scale(1.25); }
      .bg-logo.away { justify-content: flex-end; transform: translateX(22%) scale(1.25); }
      .bg-logo img { width: 100%; object-fit: contain; }

      /* everything above background */
      .top-bar, .scoreboard, .down-distance, .timeouts-row,
      .baseball-row, .last-play-wrap, .win-prob, .tap-hint {
        position: relative; z-index: 2;
      }

      /* ── Top bar ──────────────────────────────────────────────────────────── */
      .top-bar {
        display: flex; justify-content: space-between; align-items: center;
        padding: 12px 16px 6px; gap: 8px;
      }
      .league {
        font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
        text-transform: uppercase; color: rgba(255,255,255,0.5);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .badge {
        flex-shrink: 0; font-size: 9px; font-weight: 900;
        letter-spacing: 0.1em; padding: 3px 10px;
        border-radius: 999px; display: inline-flex; align-items: center; gap: 5px;
      }
      .live-badge {
        background: #ef4444; color: white;
        box-shadow: 0 0 14px rgba(239,68,68,0.55);
        animation: live-glow 2s ease-in-out infinite;
      }
      .ft-badge { background: rgba(16,185,129,0.2); color: #10b981; }
      .pre-badge { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); font-size: 10px; }
      .live-badge .dot, .clk-live .dot {
        width: 5px; height: 5px; border-radius: 50%; background: white;
        animation: blink-dot 1.3s ease-in-out infinite;
      }
      @keyframes live-glow {
        0%, 100% { box-shadow: 0 0 14px rgba(239,68,68,0.55); }
        50% { box-shadow: 0 0 24px rgba(239,68,68,0.85); }
      }
      @keyframes blink-dot {
        0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
      }

      /* ── Scoreboard ───────────────────────────────────────────────────────── */
      .scoreboard {
        display: grid; grid-template-columns: 1fr auto 1fr;
        align-items: center; gap: 8px;
        padding: 12px 16px 20px;
      }
      .team {
        display: flex; flex-direction: column;
        align-items: center; gap: 7px; text-align: center;
      }
      .logo-wrap {
        position: relative; width: 76px; height: 76px;
        display: flex; align-items: center; justify-content: center;
      }
      .logo-wrap::after {
        content: ""; position: absolute; inset: -8px;
        border-radius: 50%; opacity: 0;
        transition: opacity 0.3s;
      }
      .home-glow::after { background: radial-gradient(circle, var(--hc), transparent 70%); }
      .away-glow::after { background: radial-gradient(circle, var(--ac), transparent 70%); }
      ha-card.live .logo-wrap::after { opacity: 0.28; animation: logo-pulse 4s ease-in-out infinite; }
      @keyframes logo-pulse { 0%, 100% { opacity: 0.28; } 50% { opacity: 0.14; } }
      .logo {
        width: 68px; height: 68px; object-fit: contain;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.45));
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
      }
      ha-card.clickable:hover .logo { transform: scale(1.08); }
      .team-name {
        font-size: 12px; font-weight: 800; line-height: 1.2;
        max-width: 95px; color: #f8fafc;
      }
      .record {
        font-size: 10px; color: rgba(255,255,255,0.38); font-weight: 600;
      }

      /* Score center */
      .center {
        display: flex; flex-direction: column;
        align-items: center; gap: 5px; min-width: 88px;
      }
      .score {
        display: flex; align-items: baseline; gap: 4px;
        font-size: 54px; font-weight: 900; line-height: 1;
        font-variant-numeric: tabular-nums; letter-spacing: -0.04em;
        color: white;
        text-shadow: 0 2px 16px rgba(0,0,0,0.4);
        animation: score-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) backwards;
      }
      @keyframes score-pop {
        from { transform: scale(0.6); opacity: 0; }
      }
      .dash { opacity: 0.3; font-size: 40px; font-weight: 700; margin: 0 2px; }
      .vs {
        font-size: 30px; font-weight: 800;
        color: rgba(255,255,255,0.35); letter-spacing: 0.12em;
      }
      .clock-row { display: flex; justify-content: center; }
      .clock {
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 11px; font-weight: 700;
        padding: 3px 10px; border-radius: 999px;
        font-variant-numeric: tabular-nums;
      }
      .clk-live { color: #ef4444; background: rgba(239,68,68,0.14); }
      .clk-ft   { color: #10b981; background: rgba(16,185,129,0.14); }
      .clk-pre  { color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.07); font-size: 10px; }
      .period-label {
        font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45);
        letter-spacing: 0.05em; text-align: center;
      }

      /* ── NFL down / distance ───────────────────────────────────────────────── */
      .down-distance {
        margin: 0 16px 10px;
        padding: 5px 14px;
        background: rgba(255,255,255,0.07);
        border-radius: 8px;
        text-align: center;
        font-size: 11px; font-weight: 800;
        color: rgba(255,255,255,0.65);
        letter-spacing: 0.04em;
      }

      /* ── NFL timeouts ─────────────────────────────────────────────────────── */
      .timeouts-row {
        display: flex; justify-content: center; align-items: center;
        gap: 10px; padding: 0 16px 10px;
      }
      .to-side { display: flex; gap: 4px; }
      .to-dot {
        width: 7px; height: 7px; border-radius: 50%;
        border: 1.5px solid rgba(255,255,255,0.25);
        background: transparent; transition: all 0.2s;
      }
      .to-dot.on { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 5px rgba(251,191,36,0.6); }
      .to-label {
        font-size: 9px; font-weight: 800; letter-spacing: 0.1em;
        color: rgba(255,255,255,0.35);
      }

      /* ── MLB baseball ─────────────────────────────────────────────────────── */
      .baseball-row {
        display: flex; justify-content: center; align-items: center;
        gap: 22px; padding: 0 16px 12px;
      }
      .bso {
        display: flex; gap: 10px;
        background: rgba(255,255,255,0.06);
        border-radius: 10px; padding: 8px 14px;
      }
      .bso-item {
        display: flex; flex-direction: column; align-items: center; gap: 2px;
      }
      .bso-num {
        font-size: 22px; font-weight: 900; color: white;
        font-variant-numeric: tabular-nums; line-height: 1;
      }
      .bso-key {
        font-size: 9px; font-weight: 800; letter-spacing: 0.08em;
        color: rgba(255,255,255,0.4); text-transform: uppercase;
      }
      .bases-diamond {
        display: flex; flex-direction: column; align-items: center; gap: 3px;
      }
      .bases-row { display: flex; gap: 4px; align-items: center; justify-content: center; }
      .base {
        width: 14px; height: 14px;
        border: 2px solid rgba(255,255,255,0.25);
        border-radius: 2px; transform: rotate(45deg);
        background: transparent; transition: all 0.2s;
      }
      .base.occupied {
        background: #fbbf24; border-color: #fbbf24;
        box-shadow: 0 0 8px rgba(251,191,36,0.7);
      }
      .base.home-plate {
        background: rgba(255,255,255,0.18);
        border-color: rgba(255,255,255,0.3);
        width: 10px; height: 10px;
      }

      /* ── Last play ────────────────────────────────────────────────────────── */
      .last-play-wrap {
        padding: 0 16px 10px;
        overflow: hidden;
        mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
      }
      .last-play-text {
        display: inline-block;
        font-size: 11px; font-weight: 600;
        color: rgba(255,255,255,0.55);
        white-space: nowrap;
        animation: scroll-play 16s linear infinite;
      }
      @keyframes scroll-play {
        0%   { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      /* ── Win probability ──────────────────────────────────────────────────── */
      .win-prob { padding: 0 16px 12px; }
      .prob-labels {
        display: flex; justify-content: space-between; align-items: center;
        font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5);
        margin-bottom: 4px;
      }
      .prob-mid {
        font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase;
        opacity: 0.7;
      }
      .prob-track {
        height: 5px; border-radius: 999px;
        background: rgba(255,255,255,0.08);
        display: flex; overflow: hidden;
      }
      .prob-home {
        height: 100%; background: var(--hc);
        border-radius: 999px 0 0 999px;
        transition: width 1s cubic-bezier(0.16,1,0.3,1);
      }
      .prob-away {
        height: 100%; background: var(--ac);
        margin-left: auto; border-radius: 0 999px 999px 0;
        transition: width 1s cubic-bezier(0.16,1,0.3,1);
      }

      /* ── ESPN tap hint ────────────────────────────────────────────────────── */
      .tap-hint {
        text-align: center; font-size: 9px;
        color: rgba(255,255,255,0.2); padding: 3px 16px 10px;
        letter-spacing: 0.04em;
      }
    `;
  }
}

customElements.define("sports-live-game", SportsLiveGameCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sports-live-game",
  name: "Sports Live Game Card",
  description: "Team-color game card with live sport-specific data and ESPN game link.",
  preview: false,
  documentationURL: "https://github.com/andrejkurlovic/ha-sports-live-card",
});
