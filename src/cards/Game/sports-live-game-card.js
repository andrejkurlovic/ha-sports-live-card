import { LitElement, html, css } from "lit-element";
import { skinStyles, applySkin } from "../../skins.js";
import { teamLogo, LOGO_ONERROR } from "../../logo-fallback.js";

class SportsLiveGameCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _popupOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._popupOpen = false;
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this._config = config;
    applySkin(this, config);
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

  _getTeamUrl(logoUrl) {
    const m = (logoUrl || "").match(/\/i\/teamlogos\/(\w+)\/\d+\/([^./?]+)\.png/);
    if (!m) return "";
    const [, sport, idOrName] = m;
    if (/^\d+$/.test(idOrName)) return `https://www.espn.com/${sport}/team/_/id/${idOrName}`;
    return `https://www.espn.com/${sport}/team/_/name/${idOrName}`;
  }

  _countdown(isoDate) {
    if (!isoDate) return "";
    const ms = new Date(isoDate) - Date.now();
    if (ms <= 0) return "";
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    if (d > 0) return `In ${d}d ${h}h`;
    if (h > 0) return `In ${h}h ${m}m`;
    return `In ${m}m`;
  }

  _getBroadcast(match) {
    const region = (this._config.broadcast_region || "uk").toLowerCase();
    if (region === "us") return match.broadcast || "";
    if (region === "both") return [match.broadcast, match.broadcast_uk].filter(Boolean).join(" / ");
    return match.broadcast_uk || "";
  }

  // ---- sport-specific renderers -----------------------------------------------

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
      const count = parseInt(n, 10) || 0;
      return Array.from({ length: 3 }, (_, i) => html`
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
          <div class="bso-item"><span class="bso-num">${balls ?? "-"}</span><span class="bso-key">B</span></div>
          <div class="bso-item"><span class="bso-num">${strikes ?? "-"}</span><span class="bso-key">S</span></div>
          <div class="bso-item"><span class="bso-num">${outs ?? "-"}</span><span class="bso-key">O</span></div>
        </div>
        <div class="bases-diamond">
          <div class="bases-row top"><div class="base ${on_second ? "occupied" : ""}"></div></div>
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
    if (status.includes("half") || status.includes("over") || status.includes("end")) {
      return html`<div class="period-label">${match.status}</div>`;
    }
    const suffix = ["st", "nd", "rd", "th"];
    const s = suffix[Math.min(n - 1, 3)] || "th";
    return html`<div class="period-label">${n}${s}</div>`;
  }

  _renderOdds(match) {
    if (!this._config.show_odds) return "";
    if (!match.odds_details && match.over_under == null) return "";
    return html`
      <div class="odds-row">
        ${match.odds_details ? html`<span class="odds-chip">${match.odds_details}</span>` : ""}
        ${match.over_under != null ? html`<span class="odds-chip">O/U ${match.over_under}</span>` : ""}
      </div>
    `;
  }

  _renderPopup(match, eventUrl, homeColor, awayColor) {
    if (!this._popupOpen) return "";
    const broadcast = this._getBroadcast(match);
    const details = match.match_details || [];
    return html`
      <div class="popup-overlay"
        @click="${(e) => { e.stopPropagation(); if (e.target === e.currentTarget) this._popupOpen = false; }}"
      >
        <div class="popup">
          <div class="popup-header" style="background: linear-gradient(135deg, ${homeColor}, ${awayColor})">
            <span class="popup-title">${match.home_team} vs ${match.away_team}</span>
            <button class="popup-close" @click="${(e) => { e.stopPropagation(); this._popupOpen = false; }}">✕</button>
          </div>
          <div class="popup-body">
            ${match.status_detail ? html`<div class="popup-row"><span class="popup-label">Status</span><span>${match.status_detail}</span></div>` : ""}
            ${match.venue ? html`<div class="popup-row"><span class="popup-label">Venue</span><span>${match.venue}${match.venue_city ? `, ${match.venue_city}` : ""}</span></div>` : ""}
            ${match.date ? html`<div class="popup-row"><span class="popup-label">Date</span><span>${match.date}</span></div>` : ""}
            ${match.attendance ? html`<div class="popup-row"><span class="popup-label">Attendance</span><span>${Number(match.attendance).toLocaleString()}</span></div>` : ""}
            ${broadcast ? html`<div class="popup-row"><span class="popup-label">TV</span><span>${broadcast}</span></div>` : ""}
            ${match.odds_details ? html`<div class="popup-row"><span class="popup-label">Odds</span><span>${match.odds_details}</span></div>` : ""}
            ${match.over_under != null ? html`<div class="popup-row"><span class="popup-label">O/U</span><span>${match.over_under}</span></div>` : ""}
            ${match.home_win_probability != null ? html`<div class="popup-row"><span class="popup-label">${match.home_abbrev || "Home"} win%</span><span>${parseFloat(match.home_win_probability).toFixed(0)}%</span></div>` : ""}
            ${match.home_record ? html`<div class="popup-row"><span class="popup-label">${match.home_abbrev || "Home"}</span><span>${match.home_record}</span></div>` : ""}
            ${match.away_record ? html`<div class="popup-row"><span class="popup-label">${match.away_abbrev || "Away"}</span><span>${match.away_record}</span></div>` : ""}
            ${details.length ? html`
              <div class="popup-section">Events</div>
              ${details.slice(0, 6).map(d => html`<div class="popup-event">${d}</div>`)}
            ` : ""}
            ${eventUrl ? html`
              <button class="popup-espn" @click="${(e) => { e.stopPropagation(); this._openLink(eventUrl); }}">
                View on ESPN →
              </button>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }

  // ---- main render ------------------------------------------------------------

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
    const isPre = !isLive && !isPost;
    const showScore = isLive || isPost;
    const eventUrl = match.event_url || "";

    const showStadium = this._config.show_stadium !== false;
    const showCountdown = this._config.show_countdown !== false;
    const showPopup = this._config.show_popup !== false;

    const homeColor = this._toHex(match.home_color) || "#6366f1";
    const awayColor = this._toHex(match.away_color) || "#ec4899";

    const homeTeamUrl = this._getTeamUrl(match.home_logo);
    const awayTeamUrl = this._getTeamUrl(match.away_logo);

    const scoreSize = this._config.score_size || "normal";
    const countdown = showCountdown && isPre ? this._countdown(match.date_iso) : "";

    return html`
      <ha-card
        class="${isLive ? "live" : isPost ? "post" : "pre"}"
        style="--hc: ${homeColor}; --ac: ${awayColor};"
        @click="${() => { if (showPopup) { this._popupOpen = true; } else if (eventUrl) { this._openLink(eventUrl); } }}"
      >
        <div class="splash" aria-hidden="true"></div>
        <div class="bg-logos" aria-hidden="true">
          ${match.home_logo ? html`<div class="bg-logo home"><img src="${match.home_logo}" alt="" /></div>` : ''}
          ${match.away_logo ? html`<div class="bg-logo away"><img src="${match.away_logo}" alt="" /></div>` : ''}
        </div>

        <div class="top-bar">
          <span class="league">${match.league_name && match.league_name !== "N/A" ? match.league_name : ""}</span>
          ${isLive
            ? html`<span class="badge live-badge"><span class="dot"></span>LIVE</span>`
            : isPost
              ? html`<span class="badge ft-badge">FINAL</span>`
              : html`<span class="badge pre-badge">${match.date || "Upcoming"}</span>`
          }
        </div>

        <div class="scoreboard">
          <div class="team">
            <div class="logo-wrap home-glow"
              @click="${(e) => { e.stopPropagation(); this._openLink(homeTeamUrl || eventUrl); }}"
            >
              <img class="logo" src="${teamLogo(match.home_logo)}" onerror="${LOGO_ONERROR}" alt="${match.home_team}" />
            </div>
            <div class="team-name">${match.home_team}</div>
            ${match.home_record ? html`<div class="record">${match.home_record}</div>` : ""}
          </div>

          <div class="center">
            ${showScore
              ? html`
                  <div class="score score-${scoreSize}">
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
            <div class="logo-wrap away-glow"
              @click="${(e) => { e.stopPropagation(); this._openLink(awayTeamUrl || eventUrl); }}"
            >
              <img class="logo" src="${teamLogo(match.away_logo)}" onerror="${LOGO_ONERROR}" alt="${match.away_team}" />
            </div>
            <div class="team-name">${match.away_team}</div>
            ${match.away_record ? html`<div class="record">${match.away_record}</div>` : ""}
          </div>
        </div>

        ${isPre && showStadium && match.venue ? html`<div class="stadium">${match.venue}${match.venue_city ? " · " + match.venue_city : ""}</div>` : ""}
        ${isPre && countdown ? html`<div class="countdown">${countdown}</div>` : ""}
        ${isPre ? this._renderOdds(match) : ""}

        ${isLive ? this._renderDownDistance(match) : ""}
        ${isLive ? this._renderTimeouts(match) : ""}
        ${isLive ? this._renderBaseball(match) : ""}
        ${isLive ? this._renderLastPlay(match) : ""}
        ${isLive ? this._renderWinProb(match) : ""}

        ${isPost && showStadium && match.venue ? html`<div class="stadium">${match.venue}${match.venue_city ? " · " + match.venue_city : ""}</div>` : ""}

        <div class="tap-hint">
          ${showPopup ? "Tap for details · Tap logo for ESPN team page" : (eventUrl ? "Tap to view on ESPN →" : "")}
        </div>

        ${this._renderPopup(match, eventUrl, homeColor, awayColor)}
      </ha-card>
    `;
  }

  // ---- styles -----------------------------------------------------------------

  static get styles() {
    return [
      skinStyles,
      css`
        :host {
          display: block;
          --hc: #6366f1;
          --ac: #ec4899;
        }

        ha-card {
          position: relative; overflow: hidden; border-radius: 20px;
          background: var(--cl-bg, #0f172a);
          color: var(--cl-text, #f8fafc);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
          cursor: pointer; user-select: none;
        }
        ha-card.empty {
          padding: 24px; text-align: center;
          color: var(--cl-text-2, #94a3b8); cursor: default;
        }

        /* ── Background ─────────────────────────────────────────────────────── */
        .splash {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 100% at 0% 50%, var(--hc) 0%, transparent 70%),
            radial-gradient(ellipse 65% 100% at 100% 50%, var(--ac) 0%, transparent 70%);
          opacity: 0.22; pointer-events: none; z-index: 0;
        }
        ha-card.live .splash { opacity: 0.30; animation: splash-pulse 3s ease-in-out infinite; }
        @keyframes splash-pulse { 0%, 100% { opacity: 0.30; } 50% { opacity: 0.20; } }

        .bg-logos {
          position: absolute; inset: 0; display: flex; justify-content: space-between;
          pointer-events: none; z-index: 0; overflow: hidden;
        }
        .bg-logo { width: 55%; height: 100%; display: flex; align-items: center; opacity: 0.055; }
        .bg-logo.home { justify-content: flex-start; transform: translateX(-22%) scale(1.25); }
        .bg-logo.away { justify-content: flex-end; transform: translateX(22%) scale(1.25); }
        .bg-logo img { width: 100%; object-fit: contain; }

        .top-bar, .scoreboard, .down-distance, .timeouts-row,
        .baseball-row, .last-play-wrap, .win-prob, .tap-hint,
        .stadium, .countdown, .odds-row { position: relative; z-index: 2; }

        /* ── Top bar ────────────────────────────────────────────────────────── */
        .top-bar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px 6px; gap: 8px;
        }
        .league {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--cl-text-2);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .badge {
          flex-shrink: 0; font-size: 9px; font-weight: 900; letter-spacing: 0.1em;
          padding: 3px 10px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .live-badge {
          background: #ef4444; color: white;
          box-shadow: 0 0 14px rgba(239,68,68,0.55);
          animation: live-glow 2s ease-in-out infinite;
        }
        .ft-badge { background: rgba(16,185,129,0.2); color: #10b981; }
        .pre-badge { background: var(--cl-surface); color: var(--cl-text-2); font-size: 10px; }
        .live-badge .dot, .clk-live .dot {
          width: 5px; height: 5px; border-radius: 50%; background: white;
          animation: blink-dot 1.3s ease-in-out infinite;
        }
        @keyframes live-glow {
          0%, 100% { box-shadow: 0 0 14px rgba(239,68,68,0.55); }
          50% { box-shadow: 0 0 24px rgba(239,68,68,0.85); }
        }
        @keyframes blink-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        /* ── Scoreboard ─────────────────────────────────────────────────────── */
        .scoreboard {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 8px; padding: 12px 16px 20px;
        }
        .team { display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; }
        .logo-wrap {
          position: relative; width: 76px; height: 76px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .logo-wrap::after {
          content: ""; position: absolute; inset: -8px; border-radius: 50%; opacity: 0; transition: opacity 0.3s;
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
        .logo-wrap:hover .logo { transform: scale(1.08); }
        .team-name { font-size: 12px; font-weight: 800; line-height: 1.2; max-width: 95px; color: var(--cl-text); }
        .record { font-size: 10px; color: var(--cl-text-2); font-weight: 600; }

        .center { display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 88px; }
        .score {
          display: flex; align-items: baseline; gap: 4px;
          font-size: 54px; font-weight: 900; line-height: 1;
          font-variant-numeric: tabular-nums; letter-spacing: -0.04em;
          color: var(--cl-text);
          text-shadow: 0 2px 16px rgba(0,0,0,0.4);
          animation: score-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) backwards;
        }
        .score.score-big { font-size: 68px; }
        .score.score-huge { font-size: 82px; }
        @keyframes score-pop { from { transform: scale(0.6); opacity: 0; } }
        .dash { opacity: 0.3; font-size: 40px; font-weight: 700; margin: 0 2px; }
        .vs { font-size: 30px; font-weight: 800; color: var(--cl-text-2); letter-spacing: 0.12em; }
        .clock-row { display: flex; justify-content: center; }
        .clock {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 999px; font-variant-numeric: tabular-nums;
        }
        .clk-live { color: #ef4444; background: rgba(239,68,68,0.14); }
        .clk-ft   { color: #10b981; background: rgba(16,185,129,0.14); }
        .clk-pre  { color: var(--cl-text-2); background: var(--cl-surface); font-size: 10px; }
        .period-label { font-size: 10px; font-weight: 700; color: var(--cl-text-2); letter-spacing: 0.05em; text-align: center; }

        /* ── Stadium / Countdown / Odds ─────────────────────────────────────── */
        .stadium {
          margin: 0 16px 4px; text-align: center;
          font-size: 11px; font-weight: 600; color: var(--cl-text-2); letter-spacing: 0.02em;
        }
        .countdown {
          margin: 0 16px 8px; text-align: center;
          font-size: 14px; font-weight: 900; color: var(--cl-text); letter-spacing: 0.03em;
        }
        .odds-row { display: flex; justify-content: center; gap: 8px; padding: 0 16px 10px; flex-wrap: wrap; }
        .odds-chip {
          font-size: 10px; font-weight: 700; padding: 3px 10px;
          background: var(--cl-surface); border-radius: 999px; color: var(--cl-text-2);
        }

        /* ── NFL down / distance ────────────────────────────────────────────── */
        .down-distance {
          margin: 0 16px 10px; padding: 5px 14px;
          background: var(--cl-surface); border-radius: 8px; text-align: center;
          font-size: 11px; font-weight: 800; color: var(--cl-text-2); letter-spacing: 0.04em;
        }

        /* ── NFL timeouts ───────────────────────────────────────────────────── */
        .timeouts-row {
          display: flex; justify-content: center; align-items: center;
          gap: 10px; padding: 0 16px 10px;
        }
        .to-side { display: flex; gap: 4px; }
        .to-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1.5px solid var(--cl-divider); background: transparent; transition: all 0.2s;
        }
        .to-dot.on { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 5px rgba(251,191,36,0.6); }
        .to-label { font-size: 9px; font-weight: 800; letter-spacing: 0.1em; color: var(--cl-text-2); }

        /* ── MLB baseball ───────────────────────────────────────────────────── */
        .baseball-row {
          display: flex; justify-content: center; align-items: center;
          gap: 22px; padding: 0 16px 12px;
        }
        .bso { display: flex; gap: 10px; background: var(--cl-surface); border-radius: 10px; padding: 8px 14px; }
        .bso-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .bso-num { font-size: 22px; font-weight: 900; color: var(--cl-text); font-variant-numeric: tabular-nums; line-height: 1; }
        .bso-key { font-size: 9px; font-weight: 800; letter-spacing: 0.08em; color: var(--cl-text-2); text-transform: uppercase; }
        .bases-diamond { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .bases-row { display: flex; gap: 4px; align-items: center; justify-content: center; }
        .base {
          width: 14px; height: 14px; border: 2px solid var(--cl-divider);
          border-radius: 2px; transform: rotate(45deg); background: transparent; transition: all 0.2s;
        }
        .base.occupied { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.7); }
        .base.home-plate { background: var(--cl-surface-2); border-color: var(--cl-divider); width: 10px; height: 10px; }

        /* ── Last play ──────────────────────────────────────────────────────── */
        .last-play-wrap {
          padding: 0 16px 10px; overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        .last-play-text {
          display: inline-block; font-size: 11px; font-weight: 600; color: var(--cl-text-2);
          white-space: nowrap; animation: scroll-play 16s linear infinite;
        }
        @keyframes scroll-play { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }

        /* ── Win probability ────────────────────────────────────────────────── */
        .win-prob { padding: 0 16px 12px; }
        .prob-labels {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10px; font-weight: 700; color: var(--cl-text-2); margin-bottom: 4px;
        }
        .prob-mid { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7; }
        .prob-track { height: 5px; border-radius: 999px; background: var(--cl-surface); display: flex; overflow: hidden; }
        .prob-home { height: 100%; background: var(--hc); border-radius: 999px 0 0 999px; transition: width 1s cubic-bezier(0.16,1,0.3,1); }
        .prob-away { height: 100%; background: var(--ac); margin-left: auto; border-radius: 0 999px 999px 0; transition: width 1s cubic-bezier(0.16,1,0.3,1); }

        /* ── Tap hint ───────────────────────────────────────────────────────── */
        .tap-hint {
          text-align: center; font-size: 9px; color: var(--cl-text-2); opacity: 0.5;
          padding: 3px 16px 10px; letter-spacing: 0.04em; position: relative; z-index: 2;
        }

        /* ── Stats popup ────────────────────────────────────────────────────── */
        .popup-overlay {
          position: absolute; inset: 0; z-index: 100;
          background: var(--cl-overlay-strong);
          display: flex; align-items: flex-end;
          border-radius: 20px; overflow: hidden;
        }
        .popup {
          width: 100%; border-radius: 20px 20px 0 0;
          background: var(--cl-bg); overflow: hidden;
          animation: popup-slide 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popup-slide { from { transform: translateY(100%); opacity: 0; } }
        .popup-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px; font-size: 12px; font-weight: 800; color: white;
        }
        .popup-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .popup-close {
          flex-shrink: 0; background: rgba(255,255,255,0.2); border: none; cursor: pointer;
          color: white; font-size: 13px; width: 26px; height: 26px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 0;
        }
        .popup-body {
          padding: 12px 16px 16px; display: flex; flex-direction: column; gap: 7px;
          max-height: 260px; overflow-y: auto;
        }
        .popup-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .popup-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--cl-text-2); min-width: 70px; flex-shrink: 0;
        }
        .popup-row > span:last-child { font-size: 12px; color: var(--cl-text); text-align: right; }
        .popup-section {
          font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cl-text-2); border-top: 1px solid var(--cl-divider); padding-top: 8px; margin-top: 2px;
        }
        .popup-event { font-size: 11px; color: var(--cl-text-2); padding: 2px 0; }
        .popup-espn {
          width: 100%; margin-top: 8px;
          background: linear-gradient(135deg, var(--hc), var(--ac));
          color: white; border: none; cursor: pointer;
          font-size: 12px; font-weight: 800; letter-spacing: 0.04em;
          padding: 10px 16px; border-radius: 10px; transition: opacity 0.2s;
        }
        .popup-espn:hover { opacity: 0.85; }
      `,
    ];
  }
}

customElements.define("sports-live-game", SportsLiveGameCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sports-live-game",
  name: "Sports Live Game Card",
  description: "Team-color game card with live sport-specific data, popup stats, and ESPN links.",
  preview: false,
  documentationURL: "https://github.com/andrejkurlovic/ha-sports-live-card",
});
