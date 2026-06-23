import { LitElement, html, css } from "lit-element";
import { t, resolveLang } from "../../i18n.js";
import { skinStyles, applySkin, resolveSkin } from "../../skins.js";
import { openModal, closeModal, esc } from "../../modal-helper.js";
import { teamLogo as resolveTeamLogo, LOGO_ONERROR } from "../../logo-fallback.js";

// How long the list must sit untouched before it snaps back to the live
// (or next upcoming) match. Long enough to read a row you scrolled to,
// short enough that a wall display recovers its "what matters now" view
// on its own.
const FOCUS_IDLE_MS = 18000;

// How long a goal/card row keeps its pulse animation, and how long an
// event toast stays on screen, after a live sports_live_score/discipline
// event fires for it.
const RECENT_EVENT_HIGHLIGHT_MS = 5000;
const TOAST_VISIBLE_MS = 4000;

// Shows the full schedule (past + upcoming), not just today's matches —
// renamed from SportsLiveTodayMatchesCard, a leftover from the pre-fork
// calcio-live naming. The registered element name ("sports-live-matches")
// and YAML `type:` were already correct; only the internal class name
// was stale.
class SportsLiveMatchesCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      showPopup: { type: Boolean },
      activeMatch: { type: Object },
      _eventSubscriptions: { type: Array },
      _recentEventMatches: { type: Object },
      _toastMessage: { type: String },
      _toastVisible: { type: Boolean },
      _toastVariant: { type: String },
    };
  }

  constructor() {
    super();
    this._recentEventMatches = new Map();
    this._eventSubscriptions = [];
    this._toastMessage = '';
    this._toastVisible = false;
    this._toastVariant = 'goal';
    this._toastTimer = null;
    this._pendingFocusKey = null;
    this._appliedFocusKey = undefined;
    this._lastScrollActivity = 0;
    this._focusIdleTimer = null;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity required");
    }
    this._config = config;
    applySkin(this, config);
    this.maxEventsVisible = config.max_events_visible ? config.max_events_visible : 5;
    this.maxEventsTotal = config.max_events_total ? config.max_events_total : 50;
    this.showFinishedMatches = config.show_finished_matches !== undefined ? config.show_finished_matches : true;
    this.hideHeader = config.hide_header !== undefined ? config.hide_header : false;
    this.hidePastDays = config.hide_past_days !== undefined ? config.hide_past_days : 0;
    this.reverseOrder = config.reverse_order === true;
    this.showEventToasts = config.show_event_toasts === true;
    this.showVenue = config.show_venue === true;
    this.showOdds = config.show_odds === true;
    this.activeMatch = null;
    this.showPopup = false;
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeToEvents();
    this._clockTick = setInterval(() => {
      // Skip work when the tab/card is not visible — no point re-rendering
      // a hidden card every second.
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      const stateObj = this.hass?.states?.[this._config?.entity];
      const matches = stateObj?.attributes?.matches || [];
      if (matches.some(m => m.state === 'in' && m.clock && m.clock !== 'N/A')) {
        this.requestUpdate();
      }
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._clockTick) { clearInterval(this._clockTick); this._clockTick = null; }
    if (this._focusIdleTimer) { clearTimeout(this._focusIdleTimer); this._focusIdleTimer = null; }
    closeModal('sports-live-matches-popup');
    if (this._eventSubscriptions && Array.isArray(this._eventSubscriptions)) {
      this._eventSubscriptions.forEach(unsub => { if (typeof unsub === 'function') unsub(); });
      this._eventSubscriptions = [];
    }
  }

  _subscribeToEvents() {
    if (!this.hass?.connection) return;
    this._eventSubscriptions = [];
    let fallbackScheduled = false;

    const tryCustomSub = (eventType) => {
      this.hass.connection.subscribeEvents(
        this._handleSportsLiveEvent.bind(this), eventType,
      ).then(unsub => {
        if (typeof unsub === 'function') this._eventSubscriptions.push(unsub);
      }).catch(() => {
        if (!fallbackScheduled) {
          fallbackScheduled = true;
          this._setupStateChangedFallback();
        }
      });
    };

    tryCustomSub('sports_live_score');
    tryCustomSub('sports_live_discipline');
  }

  // Fallback for restricted HA users: diff the competition entity state to detect
  // score changes and fire synthetic events into the existing handler.
  _setupStateChangedFallback() {
    if (!this.hass?.connection) return;
    this.hass.connection.subscribeEvents((event) => {
      if (event.data.entity_id !== this._config?.entity) return;
      const newMatches = event.data.new_state?.attributes?.matches || [];
      const oldMatches = event.data.old_state?.attributes?.matches || [];
      newMatches.forEach((newM) => {
        if (newM.state !== 'in') return;
        const oldM = oldMatches.find(
          (o) => o.home_team === newM.home_team && o.away_team === newM.away_team,
        );
        if (!oldM) return;
        const base = {
          home_team: newM.home_team, away_team: newM.away_team,
          home_score: newM.home_score, away_score: newM.away_score,
          player: 'N/A', score_event_label: null,
        };
        if (String(newM.home_score) !== String(oldM.home_score)) {
          this._handleSportsLiveEvent({ event_type: 'sports_live_score', data: { ...base, team: newM.home_team } });
        }
        if (String(newM.away_score) !== String(oldM.away_score)) {
          this._handleSportsLiveEvent({ event_type: 'sports_live_score', data: { ...base, team: newM.away_team } });
        }
      });
    }, 'state_changed')
      .then(unsub => { if (typeof unsub === 'function') this._eventSubscriptions.push(unsub); })
      .catch(() => {});
  }

  _eventBelongsToThisCard(eventData) {
    if (!this.hass || !this._config) return false;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return false;
    const matches = stateObj.attributes.matches || [];
    return matches.some(m => m.home_team === eventData.home_team && m.away_team === eventData.away_team);
  }

  _handleSportsLiveEvent(event) {
    const eventType = event.event_type;
    const eventData = event.data;
    if (!this._eventBelongsToThisCard(eventData)) return;

    const matchKey = `${eventData.home_team}_${eventData.away_team}`;
    this._recentEventMatches.set(matchKey, eventType === 'sports_live_score' ? 'goal' : 'card');
    this.requestUpdate();
    setTimeout(() => {
      this._recentEventMatches.delete(matchKey);
      this.requestUpdate();
    }, RECENT_EVENT_HIGHLIGHT_MS);

    if (this.showEventToasts) {
      this._showEventToast(eventType, eventData);
    }
  }

  _showEventToast(eventType, eventData) {
    let message = '';
    let variant = 'goal';
    if (eventType === 'sports_live_score') {
      const label = (eventData.score_event_label || this._t('event.goal')).toUpperCase();
      const scorer = eventData.player && eventData.player !== 'N/A' ? `${eventData.player} · ` : '';
      message = `<strong>${label}!</strong> ${scorer}${eventData.home_team} ${eventData.home_score} - ${eventData.away_score} ${eventData.away_team}`;
      variant = 'goal';
    } else if (eventType === 'sports_live_discipline') {
      const dt = String(eventData.discipline_type || '').toUpperCase();
      const min = eventData.minute && eventData.minute !== 'N/A' ? ` (${eventData.minute}')` : '';
      if (dt === 'YELLOW') {
        message = `🟨 <strong>${this._t('event.yellow_card')}</strong> · ${eventData.player}${min}`;
        variant = 'yellow';
      } else if (dt === 'RED') {
        message = `🟥 <strong>${this._t('event.red_card')}</strong> · ${eventData.player}${min}`;
        variant = 'red';
      }
    }
    if (!message) return;
    this._toastMessage = message;
    this._toastVariant = variant;
    this._toastVisible = true;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this._toastVisible = false;
      this.requestUpdate();
    }, TOAST_VISIBLE_MS);
    this.requestUpdate();
  }

  getCardSize() { return 4; }
  static getConfigElement() { return document.createElement("sports-live-matches-editor"); }
  static getStubConfig() {
    return {
      entity: "",
      max_events_visible: 5,
      max_events_total: 50,
      hide_past_days: 0,
      show_finished_matches: true,
      hide_header: false,
      show_event_toasts: false,
      show_venue: false,
      show_odds: false,
    };
  }

  _parseMatchDate(dateStr) {
    if (!dateStr) return null;
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart ? timePart.split(':').map(Number) : [0, 0];
    return new Date(year, month - 1, day, hours, minutes);
  }

  _advanceClock(storedClock, lastUpdated) {
    const elapsed = Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000);
    if (elapsed < 0 || elapsed > 300) return storedClock;
    if (storedClock.includes(':')) {
      const parts = storedClock.split(':');
      if (parts.length !== 2) return storedClock;
      const base = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      if (isNaN(base)) return storedClock;
      const current = base + elapsed;
      return `${Math.floor(current / 60)}:${(current % 60).toString().padStart(2, '0')}`;
    }
    const rugbyMatch = storedClock.match(/^(\d+)'$/);
    if (rugbyMatch) {
      return `${parseInt(rugbyMatch[1], 10) + Math.floor(elapsed / 60)}'`;
    }
    return storedClock;
  }

  _matchTimeLabel(match) {
    if (match.state === 'in') {
      const clk = match.clock && match.clock !== 'N/A' ? match.clock : '';
      if (clk) {
        const stateObj = this.hass?.states?.[this._config?.entity];
        const lastUpdated = stateObj?.last_updated;
        return lastUpdated ? this._advanceClock(clk, lastUpdated) : clk;
      }
      return 'LIVE';
    }
    if (match.state === 'post') return 'FT';
    if (match.date) {
      const parts = match.date.split(' ');
      return parts[1] || parts[0];
    }
    return '—';
  }

  _matchScore(match, side) {
    if (match.state === 'pre') return '-';
    return match[side === 'home' ? 'home_score' : 'away_score'] ?? '-';
  }

  _isWinner(match, side) {
    if (match.state === 'pre') return null;
    const h = parseInt(match.home_score);
    const a = parseInt(match.away_score);
    if (isNaN(h) || isNaN(a) || h === a) return null;
    return side === 'home' ? h > a : a > h;
  }

  _dayKey(match) {
    if (!match.date) return '—';
    const d = this._parseMatchDate(match.date);
    if (!d) return match.date.split(' ')[0] || '—';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const matchDay = new Date(d);
    matchDay.setHours(0, 0, 0, 0);
    const diff = Math.round((matchDay - today) / (24 * 3600 * 1000));
    if (diff === 0) return '⚡ ' + this._t('time.today');
    if (diff === -1) return this._t('time.yesterday');
    if (diff === 1) return this._t('time.tomorrow');
    const month = this._t('month.' + (matchDay.getMonth() + 1));
    return `${matchDay.getDate()} ${month}`;
  }

  showDetails(match) {
    this.activeMatch = match;
    this.showPopup = true;
  }
  closePopup() { this.showPopup = false; }

  separateEvents(details) {
    const goals = [], yellowCards = [], redCards = [];
    const tries = [], conversions = [], penaltyGoals = [], dropGoals = [];

    details.forEach(event => {
      const raw = String(event || '');
      const lo = raw.toLowerCase();
      if (lo.startsWith('try')) {
        tries.push(this.formatMatchEvent(raw));
      } else if (lo.startsWith('conversion')) {
        conversions.push(this.formatMatchEvent(raw));
      } else if (lo.startsWith('penalty goal') || lo.startsWith('penalty - scored')) {
        penaltyGoals.push(this.formatMatchEvent(raw));
      } else if (lo.startsWith('drop goal')) {
        dropGoals.push(this.formatMatchEvent(raw));
      } else if (lo.includes('goal')) {
        goals.push(this.formatMatchEvent(raw));
      } else if (lo.includes('yellow card')) {
        yellowCards.push(this.formatMatchEvent(raw));
      } else if (lo.includes('red card')) {
        redCards.push(this.formatMatchEvent(raw));
      }
    });

    return { goals, yellowCards, redCards, tries, conversions, penaltyGoals, dropGoals };
  }

  formatMatchEvent(event) {
    const tx = (key) => this._t(key);
    let text = String(event || '').trim();

    text = text
      .replace(/^Goal\s*-\s*/i, '')
      .replace(/^Yellow Card\s*-\s*/i, '')
      .replace(/^Red Card\s*-\s*/i, '')
      .replace(/^Try\s*-\s*/i, '')
      .replace(/^Conversion\s*-\s*/i, '')
      .replace(/^Penalty Goal\s*-\s*/i, '')
      .replace(/^Drop Goal\s*-\s*/i, '')
      .replace(/^Penalty - Scored\s*-\s*/i, `${tx('event.penalty')} - `)
      .replace(/^Header\s*-\s*/i, `${tx('event.header')} - `)
      .replace(/^Shot\s*-\s*/i, `${tx('event.shot')} - `)
      .replace(/^Free-kick\s*-\s*/i, `${tx('event.free_kick')} - `)
      .replace(/^Penalty\s*-\s*/i, `${tx('event.penalty')} - `);

    text = text.replace(/^([^:]+):\s*/, '$1 ');

    const eventTypes = [
      tx('event.header'),
      tx('event.shot'),
      tx('event.penalty'),
      tx('event.free_kick'),
    ].map(type => type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    text = text.replace(
      new RegExp(`^(${eventTypes.join('|')})\\s*-\\s*(.+)$`, 'i'),
      (_, eventType, rest) => `${rest} (${eventType.toLowerCase()})`
    );

    text = text.replace(/\bN\/A\b/g, tx('generic.unknown'));

    return text;
  }

  _getBroadcast(match) {
    const region = this._config?.broadcast_region || 'uk';
    const uk = match.broadcast_uk && match.broadcast_uk !== 'N/A' ? match.broadcast_uk : '';
    const us = match.broadcast && match.broadcast !== 'N/A' && match.broadcast !== '' ? match.broadcast : '';
    if (region === 'us') return us || uk;
    if (region === 'both') return [uk, us].filter(Boolean).join(' / ') || '';
    return uk || us;
  }

  _getVenue(match) {
    return match.venue && match.venue !== 'N/A' ? match.venue : '';
  }

  _matchKeyOf(match) {
    return `${match.home_team}_${match.away_team}`;
  }

  // Live match wins regardless of display sort order. With no live match,
  // the chronologically soonest upcoming one — independent of reverse_order,
  // which only controls display direction, not what "next" means.
  _computeFocusMatch(matches) {
    const live = matches.find((m) => m.state === 'in');
    if (live) return live;
    const upcoming = matches
      .filter((m) => m.state === 'pre')
      .map((m) => ({ m, d: this._parseMatchDate(m.date) }))
      .filter((x) => x.d)
      .sort((a, b) => a.d - b.d);
    return upcoming.length ? upcoming[0].m : null;
  }

  // max_events_total used to just take the first N matches from one end of
  // the list. Instead, window N matches centered on the focus match (live,
  // or next upcoming) - roughly half before it chronologically, half after -
  // so "show 10" means "5 before today/the live match, 4 after" rather than
  // burning the whole budget on the oldest finished matches. `matches` must
  // already be sorted chronologically ascending.
  _windowAroundFocus(matches, focusMatch, maxTotal) {
    if (!maxTotal || matches.length <= maxTotal) return matches;
    const focusIdx = focusMatch ? matches.findIndex((m) => this._matchKeyOf(m) === this._matchKeyOf(focusMatch)) : -1;
    if (focusIdx === -1) return matches.slice(0, maxTotal);

    let before = Math.ceil((maxTotal - 1) / 2);
    let after = maxTotal - 1 - before;
    const availableBefore = focusIdx;
    const availableAfter = matches.length - focusIdx - 1;

    if (before > availableBefore) {
      after += before - availableBefore;
      before = availableBefore;
    }
    if (after > availableAfter) {
      before += after - availableAfter;
      after = availableAfter;
    }
    before = Math.min(before, availableBefore);
    after = Math.min(after, availableAfter);

    return matches.slice(focusIdx - before, focusIdx + after + 1);
  }

  _onUserScroll() {
    this._lastScrollActivity = Date.now();
    if (this._focusIdleTimer) clearTimeout(this._focusIdleTimer);
    this._focusIdleTimer = setTimeout(() => {
      this._scrollToFocus();
      this._appliedFocusKey = this._pendingFocusKey;
    }, FOCUS_IDLE_MS);
  }

  // Rewritten after two failed attempts at hand-computing a scrollTop from
  // offsetTop/offsetParent — fragile, and not something verifiable from this
  // environment (no real browser/layout engine available to check against).
  // scrollIntoView() is the browser's own native answer to "bring this
  // element into view inside whatever scrollable ancestor contains it": no
  // manual offset math, no assumptions about which element is the
  // offsetParent, and it's been a standard, stable Web API since long before
  // any CSS positioning context this card might use. It only moves the
  // nearest scrollable ancestor that actually needs to move (here,
  // .scroll-content) — it won't scroll the outer HA dashboard unless this
  // card itself is genuinely off-screen.
  _scrollToFocus(smooth = true) {
    if (!this.shadowRoot || !this._pendingFocusKey) return;
    const container = this.shadowRoot.querySelector('.scroll-content');
    let row;
    try {
      row = this.shadowRoot.querySelector(`[data-match-key="${CSS.escape(this._pendingFocusKey)}"]`);
    } catch (err) {
      row = null;
    }
    if (!container || !row) {
      console.debug('[sports-live-matches] scroll-to-focus skipped: missing container or row', {
        hasContainer: !!container, hasRow: !!row, key: this._pendingFocusKey,
      });
      return;
    }
    // Wait two animation frames so the browser has fully committed and
    // painted whatever layout Lit just patched into the DOM before scrolling
    // - calling scrollIntoView synchronously right after a DOM patch can
    // measure against stale layout in some engines.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        row.scrollIntoView({ block: 'start', inline: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
        console.debug('[sports-live-matches] scrolled to focus', {
          key: this._pendingFocusKey,
          containerScrollTop: container.scrollTop,
          containerScrollHeight: container.scrollHeight,
          containerClientHeight: container.clientHeight,
        });
      });
    });
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return html`<ha-card class="empty">${this._t('generic.unknown_entity')}: ${entityId}</ha-card>`;

    let matches = stateObj.attributes.matches || [];
    const leagueInfo = stateObj.attributes.league_info ? stateObj.attributes.league_info[0] : null;
    const teamLogo = stateObj.attributes.team_logo || null;

    if (!this.showFinishedMatches) {
      matches = matches.filter((m) => m.status !== "Full Time");
    }
    // Dates come as "dd/mm/yyyy hh:mm" — new Date() can't parse that format
    // (returns Invalid Date), so we use _parseMatchDate instead. Always sort
    // chronologically ascending here so the max_events_total window below is
    // computed in real time order; reverse_order is applied afterwards, to
    // the already-windowed result, since it's a display preference and
    // shouldn't change which matches the window picks.
    matches = matches.slice().sort((a, b) => {
      const da = this._parseMatchDate(a.date) || new Date(0);
      const db = this._parseMatchDate(b.date) || new Date(0);
      return da - db;
    });

    if (this.hidePastDays > 0) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - this.hidePastDays);
      matches = matches.filter((m) => {
        const d = this._parseMatchDate(m.date);
        return d ? d >= cutoff : true;
      });
    }
    const windowFocus = this._computeFocusMatch(matches);
    let limited = this._windowAroundFocus(matches, windowFocus, this.maxEventsTotal);
    if (this.reverseOrder) limited = limited.slice().reverse();

    if (limited.length === 0) {
      this._pendingFocusKey = null;
      return html`<ha-card class="empty">${this._t('generic.no_match')}</ha-card>`;
    }

    const liveCount = limited.filter(m => m.state === 'in').length;

    const focusMatch = this._computeFocusMatch(limited);
    this._pendingFocusKey = focusMatch ? this._matchKeyOf(focusMatch) : null;

    const grouped = [];
    let currentKey = null;
    limited.forEach(m => {
      const key = this._dayKey(m);
      if (key !== currentKey) {
        currentKey = key;
        grouped.push({ key, matches: [m] });
      } else {
        grouped[grouped.length - 1].matches.push(m);
      }
    });

    const scrollHeight = Math.max(this.maxEventsVisible * 80, 240);

    return html`
      <ha-card>
        <div class="hero-bg"></div>

        ${this.showEventToasts && this._toastVisible ? html`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        ` : ''}

        ${!this.hideHeader ? html`
          <div class="matches-header">
            ${leagueInfo && leagueInfo.logo_href
              ? html`<img class="league-logo" src="${leagueInfo.logo_href}" alt="${leagueInfo.abbreviation || ''}" />`
              : (teamLogo ? html`<img class="league-logo" src="${teamLogo}" alt="" />` : '')}
            <div class="league-info">
              <div class="league-name">${(leagueInfo && leagueInfo.abbreviation) || stateObj.state || 'Sports Live'}</div>
              <div class="league-dates">
                ${leagueInfo && leagueInfo.startDate ? `${leagueInfo.startDate} → ${leagueInfo.endDate}` : this._t('generic.matches_count', { n: limited.length })}
              </div>
            </div>
            ${liveCount > 0 ? html`<span class="live-counter">${liveCount} LIVE</span>` : ''}
          </div>
        ` : ''}

        <div class="scroll-content" style="max-height: ${scrollHeight}px;" @scroll="${this._onUserScroll}">
          ${grouped.map(group => html`
            <div class="day-divider ${group.key.startsWith('⚡') ? 'today' : ''}">${group.key}</div>
            ${group.matches.map(match => {
              const matchKey = this._matchKeyOf(match);
              const isLive = match.state === 'in';
              const recent = this._recentEventMatches.get(matchKey);
              const homeWinner = this._isWinner(match, 'home');
              const awayWinner = this._isWinner(match, 'away');
              const broadcast = this._getBroadcast(match);
              const venue = this.showVenue ? this._getVenue(match) : '';
              const isUpcoming = match.state === 'pre';
              return html`
                <div class="match-row ${isLive ? 'live' : ''} ${recent === 'goal' ? 'goal-pulse' : ''} ${recent === 'card' ? 'card-pulse' : ''}"
                     data-match-key="${matchKey}"
                     @click="${() => this.showDetails(match)}">
                  <div class="match-time ${isLive ? 'live-time' : ''} ${match.state === 'post' ? 'ft' : ''}">
                    ${this._matchTimeLabel(match)}
                  </div>
                  <div class="match-teams">
                    <div class="match-team">
                      <img src="${resolveTeamLogo(match.home_logo)}" onerror="${LOGO_ONERROR}" alt="${match.home_team}" />
                      <span class="name ${homeWinner === true ? 'winner' : (homeWinner === false ? 'loser' : '')}">${match.home_team}</span>
                      <span class="score ${homeWinner === true ? 'winner' : (homeWinner === false ? 'loser' : '')}">${this._matchScore(match, 'home')}</span>
                    </div>
                    <div class="match-team">
                      <img src="${resolveTeamLogo(match.away_logo)}" onerror="${LOGO_ONERROR}" alt="${match.away_team}" />
                      <span class="name ${awayWinner === true ? 'winner' : (awayWinner === false ? 'loser' : '')}">${match.away_team}</span>
                      <span class="score ${awayWinner === true ? 'winner' : (awayWinner === false ? 'loser' : '')}">${this._matchScore(match, 'away')}</span>
                    </div>
                    ${(broadcast && (isUpcoming || isLive)) || venue ? html`
                      <div class="row-extras">
                        ${broadcast && (isUpcoming || isLive) ? html`
                          <span class="tv-chip" title="Watch on TV">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
                            ${broadcast}
                          </span>
                        ` : ''}
                        ${venue ? html`
                          <span class="venue-chip" title="Venue">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-7.2-7-12a7 7 0 1 1 14 0c0 4.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                            ${venue}
                          </span>
                        ` : ''}
                      </div>
                    ` : ''}
                  </div>
                  <div class="match-status-icon">›</div>
                </div>
              `;
            })}
          `)}
        </div>
      </ha-card>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('showPopup') || changedProperties.has('activeMatch')) {
      this.renderPopupToBody();
    }
    if (this._pendingFocusKey !== this._appliedFocusKey) {
      const isFirstApply = this._appliedFocusKey === undefined;
      const idleFor = this._lastScrollActivity ? Date.now() - this._lastScrollActivity : Infinity;
      if (isFirstApply || idleFor >= FOCUS_IDLE_MS) {
        this._scrollToFocus(!isFirstApply);
        this._appliedFocusKey = this._pendingFocusKey;
      }
      // else: the user scrolled recently — the idle timer set up in
      // _onUserScroll will catch up and apply the new focus once they stop.
    }
  }

  renderPopupToBody() {
    if (!this.showPopup || !this.activeMatch) {
      closeModal('sports-live-matches-popup');
      return;
    }
    const m = this.activeMatch;
    const tx = (k) => this._t(k);
    const isLight = resolveSkin(this._config) === 'light';
    const popupContainer = openModal('sports-live-matches-popup', isLight, () => { this.showPopup = false; });

    popupContainer.innerHTML = `
      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:560px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">
        <h3 style="margin:0 0 20px;font-size:22px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${esc(tx('popup.match_details'))}</h3>
        <div style="display:flex;justify-content:center;align-items:center;gap:18px;margin-bottom:24px;">
          <img style="width:64px;height:64px;object-fit:contain;" src="${esc(resolveTeamLogo(m.home_logo))}" onerror="${LOGO_ONERROR}" alt="${esc(m.home_team)}" />
          <div style="text-align:center;">
            <div style="font-size:38px;font-weight:900;letter-spacing:-0.04em;line-height:1;">${esc(m.home_score ?? '-')} <span style="opacity:0.4;">-</span> ${esc(m.away_score ?? '-')}</div>
            <div style="font-size:12px;color:var(--p-sub);margin-top:8px;font-weight:600;">${esc(m.clock ?? m.status ?? '')}</div>
          </div>
          <img style="width:64px;height:64px;object-fit:contain;" src="${esc(resolveTeamLogo(m.away_logo))}" onerror="${LOGO_ONERROR}" alt="${esc(m.away_team)}" />
        </div>
        <p style="text-align:center;color:var(--p-muted);font-size:14px;margin:0 0 20px;"><strong>${esc(m.home_team)}</strong> vs <strong>${esc(m.away_team)}</strong></p>
        <div id="matches-info-container"></div>
        <div id="matches-events-container"></div>
        ${m.event_url ? `
          <button id="matches-popup-espn" style="background:var(--p-panel);color:var(--p-text);border:1px solid var(--p-border);padding:10px 20px;border-radius:12px;cursor:pointer;margin-top:8px;font-weight:700;width:100%;font-size:13px;">${esc(tx('popup.view_on_espn'))}</button>
        ` : ''}
        <button id="matches-popup-close" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:8px;font-weight:800;width:100%;font-size:14px;">${esc(tx('generic.close'))}</button>
      </div>
    `;

    popupContainer.querySelector('#matches-popup-close').onclick = () => { this.showPopup = false; };
    const espnBtn = popupContainer.querySelector('#matches-popup-espn');
    if (espnBtn) espnBtn.onclick = () => { window.open(m.event_url, '_blank', 'noopener,noreferrer'); };

    const infoContainer = popupContainer.querySelector('#matches-info-container');
    const infoRow = (label, value) => `
      <div style="display:flex;justify-content:space-between;gap:12px;font-size:13px;padding:7px 0;border-bottom:1px solid var(--p-border);">
        <span style="color:var(--p-sub);font-weight:600;">${esc(label)}</span>
        <span style="color:var(--p-text);text-align:right;">${esc(value)}</span>
      </div>
    `;
    let infoHtml = '';
    if (this._getVenue(m)) {
      infoHtml += infoRow(tx('popup.venue'), m.venue_city ? `${m.venue}, ${m.venue_city}` : m.venue);
    }
    const popupBroadcast = this._getBroadcast(m);
    if (popupBroadcast) infoHtml += infoRow(tx('popup.tv'), popupBroadcast);
    if (m.attendance) infoHtml += infoRow(tx('popup.attendance'), Number(m.attendance).toLocaleString());
    if (m.home_record) infoHtml += infoRow(m.home_abbrev || m.home_team, m.home_record);
    if (m.away_record) infoHtml += infoRow(m.away_abbrev || m.away_team, m.away_record);
    if (this.showOdds && m.odds_details) infoHtml += infoRow(tx('popup.odds'), m.odds_details);
    if (this.showOdds && m.over_under != null) infoHtml += infoRow(tx('popup.over_under'), m.over_under);
    infoContainer.innerHTML = infoHtml
      ? `<div style="margin-bottom:16px;">${infoHtml}</div>`
      : '';

    const eventsContainer = popupContainer.querySelector('#matches-events-container');
    const { goals, yellowCards, redCards, tries, conversions, penaltyGoals, dropGoals } = this.separateEvents(m.match_details || []);
    const renderGroup = (title, items, color) => {
      if (!items.length) return '';
      return `<div style="margin-bottom:14px;padding:14px;background:${color.bg};border-left:3px solid ${color.border};border-radius:10px;">
        <h5 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:${color.border};font-weight:800;">${esc(title)}</h5>
        <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--p-text);">${items.map(i => `<li style="margin:4px 0;">${esc(i)}</li>`).join('')}</ul>
      </div>`;
    };
    let evHtml = '';
    evHtml += renderGroup(tx('event.goal'), goals, { bg: 'rgba(99,102,241,0.1)', border: '#6366f1' });
    evHtml += renderGroup(tx('event.yellow_card'), yellowCards, { bg: 'rgba(245,158,11,0.1)', border: '#f59e0b' });
    evHtml += renderGroup(tx('event.red_card'), redCards, { bg: 'rgba(239,68,68,0.1)', border: '#ef4444' });
    evHtml += renderGroup(tx('event.try'), tries, { bg: 'rgba(16,185,129,0.1)', border: '#10b981' });
    evHtml += renderGroup(tx('event.conversion'), conversions, { bg: 'rgba(16,185,129,0.07)', border: '#34d399' });
    evHtml += renderGroup(tx('event.penalty_goal'), penaltyGoals, { bg: 'rgba(251,191,36,0.1)', border: '#fbbf24' });
    evHtml += renderGroup(tx('event.drop_goal'), dropGoals, { bg: 'rgba(99,102,241,0.07)', border: '#818cf8' });
    eventsContainer.innerHTML = evHtml || `<p style="text-align:center;color:var(--p-sub);font-size:13px;">${esc(tx('popup.no_events'))}</p>`;
  }

  static get styles() {
    return [skinStyles, css`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-live: #ef4444;
        --cl-live-glow: rgba(239,68,68,0.5);
        --cl-green: #10b981;
        --cl-gold: #fbbf24;
        --cl-gold-text: #fde047;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .hero-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236,72,153,0.10), transparent 50%);
        pointer-events: none;
        z-index: 0;
      }
      .matches-header {
        position: relative;
        z-index: 1;
        display: flex; align-items: center; gap: 14px;
        padding: 16px 16px 14px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .matches-header::after {
        content: '';
        position: absolute;
        left: 14px; right: 14px; bottom: -1px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--cl-accent), transparent);
        opacity: 0.4;
      }
      .league-logo {
        width: 42px; height: 42px;
        object-fit: contain;
        filter: drop-shadow(0 2px 8px rgba(99,102,241,0.3));
      }
      .league-info {
        flex: 1;
        min-width: 0;
      }
      .league-name {
        font-size: 16px;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .league-dates {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 500;
      }
      .live-counter {
        flex-shrink: 0;
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.06em;
        box-shadow: 0 2px 12px var(--cl-live-glow);
      }
      .scroll-content {
        position: relative;
        z-index: 1;
        overflow-y: auto;
        padding: 4px 4px 12px;
      }
      .day-divider {
        padding: 12px 12px 4px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--cl-text-2);
        font-weight: 800;
        display: flex; align-items: center; gap: 8px;
      }
      .day-divider::after {
        content: '';
        flex: 1; height: 1px;
        background: linear-gradient(90deg, var(--cl-divider), transparent);
      }
      .day-divider.today { color: var(--cl-accent); }
      .day-divider.today::after {
        background: linear-gradient(90deg, var(--cl-accent), transparent);
        opacity: 0.4;
      }

      .match-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 0 4px;
        position: relative;
      }
      .match-row:hover {
        background: var(--cl-card-2);
        transform: translateX(3px);
      }
      .match-row.live {
        background: linear-gradient(90deg, rgba(239,68,68,0.10), rgba(239,68,68,0.02) 60%);
        animation: live-row-glow 3s ease-in-out infinite;
      }
      .match-row.live::before {
        content: '';
        position: absolute;
        left: -2px; top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 70%;
        background: linear-gradient(180deg, var(--cl-live), #f97316);
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 12px var(--cl-live-glow);
      }
      @keyframes live-row-glow {
        0%, 100% { background: linear-gradient(90deg, rgba(239,68,68,0.10), rgba(239,68,68,0.02) 60%); }
        50% { background: linear-gradient(90deg, rgba(239,68,68,0.18), rgba(239,68,68,0.05) 60%); }
      }
      .match-row.goal-pulse {
        animation: goal-pulse 1.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes goal-pulse {
        0%   { box-shadow: none; transform: scale(1); }
        20%  { box-shadow: 0 0 0 3px var(--cl-gold), 0 0 24px var(--cl-gold); transform: scale(1.02); }
        100% { box-shadow: none; transform: scale(1); }
      }
      .match-row.card-pulse {
        animation: card-pulse-row 1s ease-out;
      }
      @keyframes card-pulse-row {
        0%   { box-shadow: none; }
        30%  { box-shadow: 0 0 0 2px #f59e0b; }
        100% { box-shadow: none; }
      }

      .match-time {
        font-size: 11px;
        color: var(--cl-text-2);
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        min-width: 44px;
        text-align: center;
        padding: 6px 8px;
        background: var(--cl-card-2);
        border-radius: 8px;
      }
      .match-time.live-time {
        background: rgba(239,68,68,0.15);
        color: var(--cl-live);
      }
      .match-time.ft {
        background: rgba(16,185,129,0.12);
        color: var(--cl-green);
      }
      .match-teams {
        display: flex; flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .match-team {
        display: flex; align-items: center; gap: 10px;
      }
      .match-team img { width: 22px; height: 22px; object-fit: contain; flex-shrink: 0; }
      .match-team .name {
        font-size: 13px;
        font-weight: 600;
        flex: 1;
        letter-spacing: -0.01em;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .match-team .name.winner { font-weight: 800; }
      .match-team .name.loser { color: var(--cl-text-2); }
      .match-team .score {
        font-size: 14px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        min-width: 22px;
        text-align: right;
        color: var(--cl-text);
      }
      .match-team .score.winner { color: var(--cl-accent); }
      .match-team .score.loser { color: var(--cl-text-2); opacity: 0.6; }
      .row-extras {
        display: flex;
        gap: 6px;
        margin-top: 4px;
      }
      .tv-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 7px;
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.25);
        border-radius: 999px;
        font-size: 9px;
        font-weight: 700;
        color: var(--cl-accent);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tv-chip svg { width: 10px; height: 10px; }
      .venue-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 7px;
        background: var(--cl-card-2);
        border: 1px solid var(--cl-divider);
        border-radius: 999px;
        font-size: 9px;
        font-weight: 700;
        color: var(--cl-text-2);
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .venue-chip svg { width: 10px; height: 10px; flex-shrink: 0; }
      .match-status-icon {
        color: var(--cl-text-2);
        font-size: 18px;
        opacity: 0.5;
        transition: all 0.2s;
      }
      .match-row:hover .match-status-icon {
        color: var(--cl-accent);
        opacity: 1;
        transform: translateX(3px);
      }

      /* Toast */
      .event-toast {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--cl-toast-bg);
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        z-index: 100;
        animation: toast-bounce 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: none;
        max-width: 90%;
        text-align: center;
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }
      .event-toast.variant-goal {
        box-shadow:
          0 0 0 2px var(--cl-gold),
          0 0 0 4px rgba(251, 191, 36, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7),
          0 0 60px rgba(251, 191, 36, 0.4);
      }
      .event-toast.variant-goal strong { color: var(--cl-gold-text); }
      .event-toast.variant-yellow {
        box-shadow: 0 0 0 2px #f59e0b, 0 0 0 4px rgba(245,158,11,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-yellow strong { color: #fbbf24; }
      .event-toast.variant-red {
        box-shadow: 0 0 0 2px var(--cl-live), 0 0 0 4px rgba(239,68,68,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-red strong { color: #fca5a5; }
      @keyframes toast-bounce {
        0%   { opacity: 0; transform: translate(-50%, -20px) scale(0.7); }
        8%   { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        14%  { transform: translate(-50%, 0) scale(1); }
        90%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
      }
    `];
  }
}

customElements.define("sports-live-matches", SportsLiveMatchesCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sports-live-matches',
  name: 'Sports Live Matches',
  description: 'Match list for any sport: soccer, rugby, NFL. Supports competition and team mode.',
});
