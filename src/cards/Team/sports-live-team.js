import { LitElement, html, css } from "lit-element";
import { t, resolveLang } from "../../i18n.js";
import { skinStyles, applySkin, resolveSkin } from "../../skins.js";
import { openModal, closeModal, esc } from "../../modal-helper.js";
import { teamLogo, LOGO_ONERROR } from "../../logo-fallback.js";

class SportsLiveTeamNextCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      showPopup: { type: Boolean },
      activeMatch: { type: Object },
      _eventSubscriptions: { type: Array },
      _toastMessage: { type: String },
      _toastVisible: { type: Boolean },
      _toastVariant: { type: String },
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity required");
    }
    this._config = config;
    applySkin(this, config);
    const scoreSize = ['big', 'huge'].includes(config.score_size) ? config.score_size : 'normal';
    this.setAttribute('data-score', scoreSize);
    this.showPopup = false;
    this.activeMatch = null;
    this.showEventToasts = config.show_event_toasts === true;
    this.hideHeader = config.hide_header === true;
    this.hideForm = config.hide_form === true;
    this.hideRecords = config.hide_records === true;
    this.hideTopScorer = config.hide_top_scorer === true;
    this.hideVenue = config.hide_venue === true;
    this._toastMessage = '';
    this._toastVisible = false;
    this._toastVariant = 'goal';
    this._toastTimer = null;
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  _sportIcon() {
    const stateObj = this.hass?.states?.[this._config?.entity];
    const sport = stateObj?.attributes?.sport || '';
    const icons = {
      soccer: '⚽', nfl: '🏈', rugby: '🏉', nba: '🏀',
      nhl: '🏒', mlb: '⚾', cricket: '🏏', tennis: '🎾', mma: '🥊',
    };
    return icons[sport] || '⚽';
  }

  _translatePhase(phase) {
    if (!phase) return '';
    const map = {
      'regular-season': this._t('phase.regular_season'),
      'group stage': this._t('phase.group_stage'),
      'playoffs': this._t('phase.playoffs'),
    };
    return map[String(phase).toLowerCase()] || phase;
  }

  _shouldShowPhase(phase) {
    if (!phase) return false;
    const lower = String(phase).toLowerCase();
    if (lower === 'regular-season') return false;
    return true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeToEvents();
    this._clockTick = setInterval(() => {
      // Skip work when the tab/card is not visible.
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      const stateObj = this.hass?.states?.[this._config?.entity];
      const match = stateObj?.attributes?.matches?.[0];
      if (match?.state === 'in' && match?.clock && match.clock !== 'N/A') {
        this.requestUpdate();
      }
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._clockTick) { clearInterval(this._clockTick); this._clockTick = null; }
    // Remove body-level popup if the card is torn down while it is open.
    closeModal('sports-live-team-popup');
    if (this._eventSubscriptions && Array.isArray(this._eventSubscriptions)) {
      this._eventSubscriptions.forEach(unsub => { if (typeof unsub === 'function') unsub(); });
      this._eventSubscriptions = [];
    }
  }

  _subscribeToEvents() {
    if (!this.hass?.connection) return;
    this._eventSubscriptions = [];
    let fallbackScheduled = false;

    // Attempt to subscribe to canonical backend events (require full/admin permissions
    // in HA 2024.4+). If HA refuses (restricted user / kitchen-ha context), fall back
    // to detecting score changes via the always-allowed state_changed event.
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

    // Canonical events fired for ALL sports.
    tryCustomSub('sports_live_score');
    tryCustomSub('sports_live_discipline');
  }

  // Subscribe to state_changed on the tracked entity and synthesise score
  // events from attribute diffs. Used when custom event subscriptions are
  // refused (non-admin HA users). Toasts/confetti still fire; player name
  // will show as N/A since it is only carried in the custom event payload.
  _setupStateChangedFallback() {
    if (!this.hass?.connection) return;
    this.hass.connection.subscribeEvents((event) => {
      if (event.data.entity_id !== this._config?.entity) return;
      const newM = event.data.new_state?.attributes?.matches?.[0];
      const oldM = event.data.old_state?.attributes?.matches?.[0];
      if (!newM || !oldM || newM.state !== 'in') return;
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
    }, 'state_changed')
      .then(unsub => { if (typeof unsub === 'function') this._eventSubscriptions.push(unsub); })
      .catch(() => {});
  }

  _eventBelongsToThisCard(eventData) {
    if (!this.hass || !this._config) return false;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return false;
    const matches = stateObj.attributes.matches || [];
    if (matches.length === 0) return false;
    const m = matches[0];
    return m.home_team === eventData.home_team && m.away_team === eventData.away_team;
  }

  _handleSportsLiveEvent(event) {
    const eventType = event.event_type;
    const eventData = event.data;
    if (!this._eventBelongsToThisCard(eventData)) return;
    if (!this.showEventToasts) return;

    if (eventType === 'sports_live_score') {
      const scoringSide = eventData.team === eventData.home_team ? 'home' : 'away';
      requestAnimationFrame(() => this._triggerGoalCelebration(scoringSide, eventData));
    } else {
      this._showEventToast(eventType, eventData);
    }
  }

  _showEventToast(eventType, eventData) {
    let message = '';
    let variant = 'goal';
    if (eventType === 'sports_live_score') {
      // score_event_label is sport-specific (Goal / Try / Touchdown / Run …)
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
    }, 4000);
    this.requestUpdate();
  }

  _triggerGoalCelebration(scoringSide, eventData) {
    const card = this.shadowRoot && this.shadowRoot.querySelector('ha-card');
    if (!card) return;

    card.querySelectorAll('.confetti, .goal-banner, .goal-flash-overlay').forEach(e => e.remove());
    card.classList.remove('goal-flash');
    void card.offsetWidth;
    card.classList.add('goal-flash');
    setTimeout(() => card.classList.remove('goal-flash'), 1700);

    const flash = document.createElement('div');
    flash.className = 'goal-flash-overlay';
    card.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);

    const banner = document.createElement('div');
    banner.className = 'goal-banner';
    banner.innerHTML = '<div class="goal-banner-text">GOAL!</div>';
    card.appendChild(banner);
    setTimeout(() => banner.remove(), 1700);

    const scoreEl = card.querySelector('.score-numbers');
    if (scoreEl) {
      scoreEl.classList.remove('goal-scored');
      void scoreEl.offsetWidth;
      scoreEl.classList.add('goal-scored');
      setTimeout(() => scoreEl.classList.remove('goal-scored'), 1300);
    }

    const sides = card.querySelectorAll('.team-side .team-logo-big');
    const scorerLogo = scoringSide === 'away' ? sides[1] : sides[0];
    if (scorerLogo) {
      scorerLogo.classList.remove('scorer-bounce');
      void scorerLogo.offsetWidth;
      scorerLogo.classList.add('scorer-bounce');
      setTimeout(() => scorerLogo.classList.remove('scorer-bounce'), 1300);
    }

    if (navigator.vibrate) navigator.vibrate([180, 80, 180, 80, 280]);

    setTimeout(() => this._showEventToast('sports_live_score', eventData), 600);

    const colors = ['#ec4899', '#6366f1', '#06b6d4', '#fbbf24', '#10b981', '#ef4444'];
    const emojis = ['⚽', '🎉', '✨', '🔥', '⭐'];
    for (let i = 0; i < 36; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      const useEmoji = Math.random() > 0.55;
      if (useEmoji) {
        c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        c.style.fontSize = (14 + Math.random() * 10) + 'px';
        c.style.background = 'transparent';
      } else {
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      }
      const dx = (Math.random() - 0.5) * 380 + 'px';
      const dy = (Math.random() * 240 + 100) + 'px';
      c.style.setProperty('--dx', dx);
      c.style.setProperty('--dy', dy);
      c.style.animationDelay = (Math.random() * 0.3) + 's';
      card.appendChild(c);
      setTimeout(() => c.remove(), 2000);
    }
  }

  getCardSize() { return 4; }
  static getConfigElement() { return document.createElement("sports-live-team-editor"); }
  static getStubConfig() { return { entity: "", show_event_toasts: false }; }

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

  _renderStatusBadge(match) {
    const state = match.state;
    if (state === 'in') {
      return html`<span class="status-badge live"><span class="dot"></span>${this._t('status.live')}</span>`;
    }
    if (state === 'post') {
      return html`<span class="status-badge finished">${this._t('status.finished')}</span>`;
    }
    return html`<span class="status-badge scheduled">${match.date || this._t('status.scheduled')}</span>`;
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

  _renderClock(match) {
    const state = match.state;
    if (state === 'in') {
      const stateObj = this.hass?.states?.[this._config?.entity];
      const lastUpdated = stateObj?.last_updated;
      const clk = match.clock && match.clock !== 'N/A' ? match.clock : '';
      const estimated = clk && lastUpdated ? this._advanceClock(clk, lastUpdated) : clk;
      const detail = match.status_detail && match.status_detail !== 'N/A' ? match.status_detail : '';
      const txt = estimated || detail || match.status || '';
      return html`<div class="clock"><span class="dot"></span>${txt}</div>`;
    }
    if (state === 'post') {
      return html`<div class="clock finished">${this._t('status.full_time')}</div>`;
    }
    return html`<div class="clock upcoming">${match.date || ''}</div>`;
  }

  _renderRecord(record) {
    if (!record || record === 'N/A') return '';
    const parts = String(record).split('-');
    if (parts.length === 3) {
      return html`<div class="record">
        <span class="rec rec-w">${parts[0]}${this._t('form.W')}</span>
        <span class="rec rec-d">${parts[1]}${this._t('form.D')}</span>
        <span class="rec rec-l">${parts[2]}${this._t('form.L')}</span>
      </div>`;
    }
    return html`<div class="record"><span class="rec">${record}</span></div>`;
  }

  _renderTopScorer(scorer) {
    if (!scorer || !scorer.name) return '';
    const name = scorer.short_name || scorer.name;
    const label = this._t('team.top_scorer');
    return html`
      <div class="top-scorer" title="${label}: ${scorer.name} (${scorer.value})">
        <span class="ts-label">⚽ ${label}</span>
        <div class="ts-row">
          <span class="ts-name">${name}</span>
          <span class="ts-val">${scorer.value}<span class="ts-unit">★</span></span>
        </div>
      </div>
    `;
  }

  _renderForm(formStr) {
    if (!formStr || formStr === 'N/A') return '';
    const letters = String(formStr).replace(/[^WLDwld]/g, '').toUpperCase();
    if (!letters.length) return '';
    const recent = letters.slice(-5).split('');
    const labelOf = (l) => this._t('form.' + l);
    return html`
      <div class="form-pills">
        ${recent.map(l => html`<div class="form-pill ${l}">${labelOf(l)}</div>`)}
      </div>
    `;
  }

  _renderStatsRow(match) {
    const sport = this.hass?.states?.[this._config?.entity]?.attributes?.sport || '';
    const hs = match.home_statistics || {};
    const as_ = match.away_statistics || {};
    const bars = [];

    const num = v => { const n = parseFloat(v); return isNaN(n) ? null : n; };

    const addBar = (label, hVal, aVal, suffix = '') => {
      const h = num(hVal); const a = num(aVal);
      if (h === null || a === null) return;
      const total = h + a;
      const hp = total > 0 ? (h / total) * 100 : 50;
      bars.push(html`
        <div class="stat-bar">
          <div class="stat-bar-label">
            <span class="home-val">${hVal}${suffix}</span>
            <span class="label-text">${label}</span>
            <span class="away-val">${aVal}${suffix}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-home" style="width: ${hp.toFixed(1)}%;"></div>
            <div class="stat-bar-away" style="width: ${(100 - hp).toFixed(1)}%;"></div>
          </div>
        </div>
      `);
    };

    // Soccer / rugby: possession, shots, on-target from match statistics dict
    if (!sport || sport === 'soccer' || sport === 'rugby') {
      addBar(this._t('team.possession'), hs.possessionPct, as_.possessionPct, '%');
      addBar(this._t('team.shots'), hs.totalShots, as_.totalShots);
      addBar(this._t('team.on_target'), hs.shotsOnTarget, as_.shotsOnTarget);
    }

    // Win probability — all sports where summary enrichment is available.
    // Stored as 0-100 float (already percentage) in the match dict.
    const hwp = num(match.home_win_probability);
    const awp = num(match.away_win_probability);
    if (hwp !== null && awp !== null && hwp + awp > 0) {
      bars.push(html`
        <div class="stat-bar">
          <div class="stat-bar-label">
            <span class="home-val">${Math.round(hwp)}%</span>
            <span class="label-text">${this._t('team.win_prob')}</span>
            <span class="away-val">${Math.round(awp)}%</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-home" style="width: ${hwp.toFixed(1)}%;"></div>
            <div class="stat-bar-away" style="width: ${awp.toFixed(1)}%;"></div>
          </div>
        </div>
      `);
    }

    // NFL / CFL: remaining timeouts per team (3 max per half).
    const hto = parseInt(match.home_timeouts, 10);
    const ato = parseInt(match.away_timeouts, 10);
    if (!isNaN(hto) && !isNaN(ato)) {
      const dots = (n, side) => Array.from({ length: 3 }, (_, i) =>
        html`<span class="timeout-dot ${side} ${i < n ? 'active' : 'spent'}"></span>`
      );
      bars.push(html`
        <div class="stat-bar stat-bar-timeouts">
          <div class="stat-bar-label">
            <span class="home-val timeout-dots">${dots(hto, 'home')}</span>
            <span class="label-text">${this._t('team.timeouts')}</span>
            <span class="away-val timeout-dots">${dots(ato, 'away')}</span>
          </div>
        </div>
      `);
    }

    if (bars.length === 0) return '';
    return html`<div class="stats-row">${bars}</div>`;
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return html`<ha-card class="empty">${this._t('generic.unknown_entity')}: ${entityId}</ha-card>`;
    if (!stateObj.attributes.matches || stateObj.attributes.matches.length === 0) {
      return html`<ha-card class="empty">${this._t('generic.no_match')}</ha-card>`;
    }

    const match = stateObj.attributes.matches[0];
    const isLive = match.state === 'in';
    const isFinished = match.state === 'post';
    const showScore = isLive || isFinished;
    const competitionLabel = match.league_name && match.league_name !== 'N/A'
      ? match.league_name
      : (match.season_info && match.season_info !== 'N/A' && this._shouldShowPhase(match.season_info)
          ? this._translatePhase(match.season_info)
          : '');
    const venue = match.venue && match.venue !== 'N/A' ? match.venue : '';
    const venueCity = match.venue_city && match.venue_city !== 'N/A' ? match.venue_city : '';
    const venueLabel = venue ? (venueCity ? `${venue}, ${venueCity}` : venue) : '—';
    const broadcast = this._getBroadcast(match);
    const attendance = parseInt(match.attendance, 10);
    const hasAttendance = !isNaN(attendance) && attendance > 0;

    return html`
      <ha-card class="${isLive ? 'live' : ''}">
        <div class="bg-logos">
          ${match.home_logo ? html`<div class="bg-logo home"><img src="${match.home_logo}" alt="" loading="lazy"></div>` : ''}
          ${match.away_logo ? html`<div class="bg-logo away"><img src="${match.away_logo}" alt="" loading="lazy"></div>` : ''}
        </div>
        <div class="hero-bg"></div>

        ${this.showEventToasts && this._toastVisible ? html`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        ` : ''}

        ${!this.hideHeader ? html`<div class="top-bar">
          <div class="competition">
            <span class="comp-icon">${this._sportIcon()}</span>
            <span class="comp-name">${competitionLabel || ' '}</span>
          </div>
          ${this._renderStatusBadge(match)}
        </div>` : ''}

        <div class="scoreboard">
          <div class="team-side home">
            <div class="team-logo-wrap">
              <img class="team-logo-big" src="${teamLogo(match.home_logo)}" onerror="${LOGO_ONERROR}" alt="${match.home_team}" />
            </div>
            <div class="team-name-big">${match.home_team}</div>
            ${!this.hideRecords ? this._renderRecord(match.home_record) : ''}
            ${!this.hideForm ? this._renderForm(match.home_form) : ''}
            ${!isLive && !this.hideTopScorer ? this._renderTopScorer(match.home_top_scorer) : ''}
          </div>

          <div class="score-center">
            ${showScore
              ? html`<div class="score-numbers">${match.home_score} <span class="dash">-</span> ${match.away_score}</div>`
              : html`<div class="score-vs">VS</div>`
            }
            ${this._renderClock(match)}
          </div>

          <div class="team-side away">
            <div class="team-logo-wrap">
              <img class="team-logo-big" src="${teamLogo(match.away_logo)}" onerror="${LOGO_ONERROR}" alt="${match.away_team}" />
            </div>
            <div class="team-name-big">${match.away_team}</div>
            ${!this.hideRecords ? this._renderRecord(match.away_record) : ''}
            ${!this.hideForm ? this._renderForm(match.away_form) : ''}
            ${!isLive && !this.hideTopScorer ? this._renderTopScorer(match.away_top_scorer) : ''}
          </div>
        </div>

        ${isLive ? this._renderStatsRow(match) : ''}

        <div class="meta-row">
          ${!this.hideVenue ? html`<div class="meta-item venue-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${venueLabel}</span>
          </div>` : ''}
          ${showScore
            ? html`<button class="info-btn" @click="${() => this.showDetails(match)}">${this._t('team.details')} ›</button>`
            : html`
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${match.date || ''}</span>
              </div>
            `
          }
        </div>

        ${(broadcast || hasAttendance) ? html`
          <div class="extras-row">
            ${broadcast ? html`
              <div class="extra-chip broadcast">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
                <span>${broadcast}</span>
              </div>
            ` : ''}
            ${hasAttendance ? html`
              <div class="extra-chip attendance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                <span>${attendance.toLocaleString(resolveLang(this.hass, this._config))} ${this._t('team.spectators')}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('showPopup') || changedProperties.has('activeMatch')) {
      this.renderPopupToBody();
    }
  }

  renderPopupToBody() {
    if (!this.showPopup || !this.activeMatch) {
      closeModal('sports-live-team-popup');
      return;
    }

    const m = this.activeMatch;
    const tx = (k) => this._t(k);
    const isLight = resolveSkin(this._config) === 'light';
    // openModal creates the overlay if absent, re-binds Escape + outside-click,
    // and applies skin vars. Returns the overlay element.
    const popupContainer = openModal(
      'sports-live-team-popup', isLight, () => { this.showPopup = false; },
    );

    // Soccer exposes possession/shots stats; other sports use summary leaders.
    const hs = m.home_statistics || {};
    const hasSoccerStats = hs.possessionPct != null || hs.totalShots != null || hs.shotsOnTarget != null;
    const statBlock = (team, s) => `
      <div style="background:var(--p-panel); padding:14px; border-radius:14px;">
        <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:var(--p-sub); font-weight:700; margin-bottom:6px;">${team}</div>
        <div style="font-size:13px;"><span style="color:var(--p-sub);">${tx('team.possession')}:</span> <strong>${s?.possessionPct ?? '—'}%</strong></div>
        <div style="font-size:13px;"><span style="color:var(--p-sub);">${tx('team.shots')}:</span> <strong>${s?.totalShots ?? '—'}</strong></div>
        <div style="font-size:13px;"><span style="color:var(--p-sub);">${tx('team.on_target')}:</span> <strong>${s?.shotsOnTarget ?? '—'}</strong></div>
        <div style="font-size:13px;"><span style="color:var(--p-sub);">${tx('team.fouls')}:</span> <strong>${s?.foulsCommitted ?? '—'}</strong></div>
      </div>`;
    const statsGrid = hasSoccerStats ? `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px;">
          ${statBlock(m.home_team, m.home_statistics)}
          ${statBlock(m.away_team, m.away_statistics)}
        </div>` : '';

    popupContainer.innerHTML = `
      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:560px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">
        <h3 style="margin:0 0 20px;font-size:22px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${esc(tx('popup.match_details'))}</h3>
        <div style="display:flex;justify-content:center;align-items:center;gap:18px;margin-bottom:24px;">
          <img style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" src="${esc(teamLogo(m.home_logo))}" onerror="${LOGO_ONERROR}" alt="${esc(m.home_team)}" />
          <div style="text-align:center;">
            <div style="font-size:42px;font-weight:900;letter-spacing:-0.04em;line-height:1;">${esc(m.home_score ?? '-')} <span style="opacity:0.4;">-</span> ${esc(m.away_score ?? '-')}</div>
            <div style="font-size:12px;color:var(--p-sub);margin-top:8px;font-weight:600;">${esc(m.clock ?? m.status ?? '')}</div>
          </div>
          <img style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" src="${esc(teamLogo(m.away_logo))}" onerror="${LOGO_ONERROR}" alt="${esc(m.away_team)}" />
        </div>
        ${statsGrid}
        <div id="team-events-container"></div>
        <button id="popup-close-btn" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:20px;font-weight:800;width:100%;font-size:14px;">${esc(tx('generic.close'))}</button>
      </div>
    `;

    const closeBtn = popupContainer.querySelector('#popup-close-btn');
    if (closeBtn) closeBtn.onclick = () => { this.showPopup = false; };

    const eventsContainer = popupContainer.querySelector('#team-events-container');
    const { goals, yellowCards, redCards, tries, conversions, penaltyGoals, dropGoals } = this.separateEvents(m.match_details || []);
    const renderGroup = (title, items, color) => {
      if (!items.length) return '';
      return `<div style="margin-bottom:14px; padding:14px; background:${color.bg}; border-left:3px solid ${color.border}; border-radius:10px;">
        <h5 style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:${color.border}; font-weight:800;">${esc(title)}</h5>
        <ul style="margin:0; padding-left:18px; font-size:13px; color:var(--p-text);">${items.map(i => `<li style="margin:4px 0;">${esc(i)}</li>`).join('')}</ul>
      </div>`;
    };
    let eventsHTML = '';
    eventsHTML += renderGroup(tx('event.goal'), goals, { bg: 'rgba(99,102,241,0.1)', border: '#6366f1' });
    eventsHTML += renderGroup(tx('event.yellow_card'), yellowCards, { bg: 'rgba(245,158,11,0.1)', border: '#f59e0b' });
    eventsHTML += renderGroup(tx('event.red_card'), redCards, { bg: 'rgba(239,68,68,0.1)', border: '#ef4444' });
    eventsHTML += renderGroup(tx('event.try'), tries, { bg: 'rgba(16,185,129,0.1)', border: '#10b981' });
    eventsHTML += renderGroup(tx('event.conversion'), conversions, { bg: 'rgba(16,185,129,0.07)', border: '#34d399' });
    eventsHTML += renderGroup(tx('event.penalty_goal'), penaltyGoals, { bg: 'rgba(251,191,36,0.1)', border: '#fbbf24' });
    eventsHTML += renderGroup(tx('event.drop_goal'), dropGoals, { bg: 'rgba(99,102,241,0.07)', border: '#818cf8' });

    // Scoring plays — NBA/NHL/MLB/NFL (soccer uses the event groups above).
    const scoringPlays = m.scoring_plays || [];
    if (scoringPlays.length) {
      const rows = scoringPlays.slice().reverse().slice(0, 12).map(p => `
        <li style="display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:start; padding:5px 0; border-bottom:1px solid var(--p-border); font-size:12px;">
          <span style="font-weight:700; color:var(--p-sub); font-variant-numeric:tabular-nums; white-space:nowrap;">${esc([p.period, p.clock].filter(Boolean).join(' '))}</span>
          <span style="color:var(--p-text);">${esc(p.text || '')}</span>
          <span style="font-weight:800; color:var(--p-text); white-space:nowrap; font-variant-numeric:tabular-nums;">${esc(String(p.home_score ?? ''))}-${esc(String(p.away_score ?? ''))}</span>
        </li>`).join('');
      eventsHTML += `<div style="margin-bottom:14px; padding:14px; background:rgba(99,102,241,0.1); border-left:3px solid #6366f1; border-radius:10px;">
        <h5 style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#818cf8; font-weight:800;">${esc(tx('popup.scoring_plays'))}</h5>
        <ul style="margin:0; padding:0; list-style:none;">${rows}</ul>
      </div>`;
    }

    // Stat leaders — generic per-sport (points/assists/rebounds, HR/RBI, …).
    const statLeaders = m.stat_leaders || [];
    if (statLeaders.length) {
      const teamCol = (tl) => `
        <div style="flex:1; min-width:0;">
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--p-sub); font-weight:800; margin-bottom:6px;">${esc(tl.team_name || '')}</div>
          ${(tl.categories || []).slice(0, 4).map(c => `<div style="font-size:12px; color:var(--p-text); margin:3px 0;"><span style="color:var(--p-sub);">${esc(c.display_name)}:</span> ${esc(c.short_name || c.athlete)} <strong>${esc(String(c.value))}</strong></div>`).join('')}
        </div>`;
      eventsHTML += `<div style="margin-bottom:14px; padding:14px; background:rgba(251,191,36,0.08); border-left:3px solid #fbbf24; border-radius:10px;">
        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#fbbf24; font-weight:800;">${esc(tx('popup.stat_leaders'))}</h5>
        <div style="display:flex; gap:16px;">${statLeaders.slice(0, 2).map(teamCol).join('')}</div>
      </div>`;
    }

    // Lineup
    const lineupHome = m.lineup_home || [];
    const lineupAway = m.lineup_away || [];
    if (lineupHome.length || lineupAway.length) {
      const fH = m.formation_home || '';
      const fA = m.formation_away || '';
      const renderLineup = (players, formation, label) => {
        const starters = (players || []).filter(p => p.starter);
        if (!starters.length) return '';
        return `<div style="margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
            <span style="font-size:12px; font-weight:800; color:var(--p-text);">${esc(label)}</span>
            ${formation ? `<span style="font-size:10px; font-weight:700; color:#6366f1; letter-spacing:0.1em;">${esc(formation)}</span>` : ''}
          </div>
          <div style="font-size:12px; color:var(--p-text); line-height:1.7;">
            ${starters.map(p => `<span style="display:inline-block; padding:2px 8px; background:var(--p-panel); border-radius:6px; margin:2px;">${p.jersey ? `<strong style="color:#fbbf24;">${esc(String(p.jersey))}</strong> ` : ''}${esc(p.short_name || p.name)}</span>`).join('')}
          </div>
        </div>`;
      };
      eventsHTML += `<div style="margin-bottom:14px; padding:14px; background:rgba(16,185,129,0.08); border-left:3px solid #10b981; border-radius:10px;">
        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#10b981; font-weight:800;">${esc(tx('popup.lineups'))}</h5>
        ${renderLineup(lineupHome, fH, m.home_team)}
        ${renderLineup(lineupAway, fA, m.away_team)}
      </div>`;
    }

    // Timeline (key events)
    const keyEvents = m.key_events || [];
    if (keyEvents.length) {
      const iconOf = (ev) => {
        const t = (ev.type || '').toLowerCase();
        const txt = (ev.type_text || '').toLowerCase();
        if (t === 'goal' || ev.scoring_play) return '⚽';
        if (txt.includes('yellow')) return '🟨';
        if (txt.includes('red')) return '🟥';
        if (t === 'substitution') return '🔄';
        if (txt.includes('halftime')) return '⏸';
        if (txt.includes('kickoff')) return '▶';
        if (txt.includes('end')) return '🏁';
        return '·';
      };
      eventsHTML += `<div style="margin-bottom:14px; padding:14px; background:rgba(251,191,36,0.08); border-left:3px solid #fbbf24; border-radius:10px;">
        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#fbbf24; font-weight:800;">${esc(tx('popup.timeline'))}</h5>
        <ul style="margin:0; padding:0; list-style:none;">
          ${keyEvents.map(e => `<li style="display:grid; grid-template-columns:36px 24px 1fr; gap:8px; align-items:start; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:12px; color:var(--p-text);">
            <span style="text-align:right; font-weight:700; color:var(--p-sub); font-variant-numeric:tabular-nums;">${esc(e.clock || '')}</span>
            <span style="text-align:center;">${iconOf(e)}</span>
            <span><strong style="color:var(--p-text);">${esc((e.athletes||[]).filter(Boolean).join(', ') || e.type_text || '')}</strong>${e.team ? `<br><span style="color:var(--p-sub); font-size:11px;">${esc(e.team)}</span>` : ''}</span>
          </li>`).join('')}
        </ul>
      </div>`;
    }

    // Head to head
    const h2h = m.head_to_head || [];
    if (h2h.length) {
      eventsHTML += `<div style="margin-bottom:14px; padding:14px; background:rgba(99,102,241,0.08); border-left:3px solid #6366f1; border-radius:10px;">
        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#6366f1; font-weight:800;">${esc(tx('popup.h2h'))} (${h2h.length})</h5>
        <ul style="margin:0; padding:0; list-style:none;">
          ${h2h.slice(0, 8).map(g => {
            const dt = g.date ? new Date(g.date).toLocaleDateString(resolveLang(this.hass, this._config)) : '';
            return `<li style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:12px; color:var(--p-text);">
              <span>${esc(g.home_team)} <strong>${esc(String(g.home_score ?? '-'))}</strong> - <strong>${esc(String(g.away_score ?? '-'))}</strong> ${esc(g.away_team)}</span>
              <span style="color:var(--p-sub);">${esc(dt)}</span>
            </li>`;
          }).join('')}
        </ul>
      </div>`;
    }

    eventsContainer.innerHTML = eventsHTML || `<p style="text-align:center; color:var(--p-sub); font-size:13px;">${esc(tx('popup.no_events'))}</p>`;
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

      .bg-logos {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }
      .bg-logo {
        width: 60%;
        height: 140%;
        display: flex;
        align-items: center;
        opacity: 0.09;
      }
      .bg-logo.home {
        justify-content: flex-start;
        transform: translateX(-30%);
      }
      .bg-logo.away {
        justify-content: flex-end;
        transform: translateX(30%);
      }
      .bg-logo img {
        width: 100%;
        object-fit: contain;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.20), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236,72,153,0.20), transparent 50%);
        pointer-events: none;
        z-index: 1;
      }
      ha-card.live .hero-bg {
        background:
          radial-gradient(ellipse at 0% 0%, rgba(239,68,68,0.25), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(251,191,36,0.20), transparent 50%);
        animation: hero-pulse 3s ease-in-out infinite;
      }
      @keyframes hero-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .top-bar, .scoreboard, .stats-row, .meta-row {
        position: relative;
        z-index: 2;
      }

      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .competition {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        font-weight: 700;
        color: var(--cl-text);
        letter-spacing: -0.01em;
        min-width: 0;
      }
      .comp-icon {
        flex-shrink: 0;
        width: 24px; height: 24px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        display: flex; align-items: center; justify-content: center;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(99,102,241,0.4);
      }
      .comp-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status-badge {
        flex-shrink: 0;
        padding: 5px 11px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .status-badge.live {
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        box-shadow: 0 4px 16px var(--cl-live-glow);
        animation: badge-pulse 2s ease-in-out infinite;
      }
      .status-badge.live .dot {
        width: 6px; height: 6px; border-radius: 50%; background: white;
        animation: pulse-dot 1.2s ease-in-out infinite;
      }
      .status-badge.finished {
        background: linear-gradient(135deg, var(--cl-green), #059669);
        color: white;
      }
      .status-badge.scheduled {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        color: var(--cl-text);
      }
      @keyframes badge-pulse {
        0%, 100% { box-shadow: 0 4px 16px var(--cl-live-glow); }
        50% { box-shadow: 0 4px 24px var(--cl-live-glow), 0 0 32px var(--cl-live-glow); }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.7); }
      }

      .scoreboard {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 10px;
        padding: 28px 18px 22px;
      }
      .team-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
        min-width: 0;
      }
      .team-logo-wrap {
        position: relative;
        width: 80px; height: 80px;
        display: flex; align-items: center; justify-content: center;
      }
      .team-logo-wrap::before {
        content: '';
        position: absolute;
        inset: -8px;
        background: radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%);
        border-radius: 50%;
        animation: logo-glow 4s ease-in-out infinite;
      }
      .team-logo-big {
        position: relative;
        width: 72px; height: 72px;
        object-fit: contain;
        filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25));
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .team-side:hover .team-logo-big { transform: scale(1.1) rotate(-3deg); }
      @keyframes logo-glow {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      .team-name-big {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
        max-width: 110px;
        letter-spacing: -0.01em;
        color: var(--cl-text);
      }
      .form-pills {
        display: flex; gap: 3px;
        padding: 3px 7px;
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 999px;
      }
      .record {
        display: flex; gap: 4px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.04em;
      }
      .record .rec {
        padding: 2px 6px;
        border-radius: 4px;
        font-variant-numeric: tabular-nums;
      }
      .record .rec-w { background: rgba(16,185,129,0.18); color: var(--cl-green); }
      .record .rec-d { background: rgba(245,158,11,0.18); color: #f59e0b; }
      .record .rec-l { background: rgba(239,68,68,0.18); color: var(--cl-live); }
      .top-scorer {
        display: inline-flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 5px 9px 6px;
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 10px;
        font-size: 10px;
        font-weight: 700;
        color: var(--cl-text-2);
        max-width: 150px;
      }
      .top-scorer .ts-label {
        font-size: 8px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--cl-gold);
        text-align: center;
        line-height: 1;
      }
      .top-scorer .ts-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .top-scorer .ts-name {
        max-width: 90px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--cl-text);
        font-size: 11px;
        font-weight: 700;
      }
      .top-scorer .ts-val {
        display: inline-flex;
        align-items: baseline;
        gap: 1px;
        color: var(--cl-gold);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        font-size: 12px;
      }
      .top-scorer .ts-unit {
        font-size: 9px;
        opacity: 0.85;
      }
      .form-pill {
        width: 14px; height: 14px;
        border-radius: 4px;
        font-size: 8px;
        font-weight: 800;
        color: white;
        display: flex; align-items: center; justify-content: center;
      }
      .form-pill.W { background: linear-gradient(135deg, #10b981, #059669); }
      .form-pill.L { background: linear-gradient(135deg, #ef4444, #dc2626); }
      .form-pill.D { background: linear-gradient(135deg, #f59e0b, #d97706); }

      .score-center {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 0 4px;
      }
      .score-numbers {
        font-size: 48px;
        font-weight: 900;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
        line-height: 0.95;
        background: linear-gradient(180deg, var(--cl-text) 30%, var(--cl-accent));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: score-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      }
      .score-numbers .dash {
        opacity: 0.4;
        font-weight: 700;
        margin: 0 4px;
      }
      /* score_size: big / huge — ingrandisce il punteggio */
      :host([data-score="big"]) .score-numbers { font-size: 68px; }
      :host([data-score="huge"]) .score-numbers { font-size: 92px; }
      :host([data-score="big"]) .score-vs { font-size: 38px; }
      :host([data-score="huge"]) .score-vs { font-size: 48px; }
      .score-vs {
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--cl-text-2);
        opacity: 0.6;
      }
      @keyframes score-pop {
        0% { opacity: 0; transform: scale(0.5); }
        70% { transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
      .clock {
        font-size: 11px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        display: inline-flex; align-items: center; gap: 5px;
        padding: 4px 10px;
        border-radius: 999px;
        color: var(--cl-live);
        background: rgba(239,68,68,0.12);
      }
      .clock .dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: currentColor;
        animation: pulse-dot 1.4s ease-in-out infinite;
      }
      .clock.upcoming {
        color: var(--cl-accent);
        background: rgba(99,102,241,0.12);
      }
      .clock.upcoming .dot, .clock.finished .dot { animation: none; }
      .clock.finished {
        color: var(--cl-green);
        background: rgba(16,185,129,0.12);
      }

      .stats-row {
        padding: 0 18px 18px;
        display: flex; flex-direction: column; gap: 10px;
      }
      .stat-bar { display: flex; flex-direction: column; gap: 4px; }
      .stat-bar-label {
        display: flex; justify-content: space-between;
        font-size: 11px; font-weight: 700;
      }
      .stat-bar-label .home-val { color: var(--cl-accent); }
      .stat-bar-label .away-val { color: var(--cl-accent-2); }
      .stat-bar-label .label-text {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 9px;
        color: var(--cl-text-2);
      }
      .stat-bar-track {
        height: 6px;
        background: var(--cl-card-2);
        border-radius: 999px;
        overflow: hidden;
        display: flex;
      }
      .stat-bar-home {
        height: 100%;
        background: linear-gradient(90deg, var(--cl-accent), var(--cl-accent));
        border-radius: 999px 0 0 999px;
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .stat-bar-away {
        height: 100%;
        background: linear-gradient(90deg, var(--cl-accent-2), var(--cl-accent-2));
        margin-left: auto;
        border-radius: 0 999px 999px 0;
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .stat-bar-timeouts .stat-bar-label {
        align-items: center;
      }
      .timeout-dots {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }
      .timeout-dot {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .timeout-dot.home.active { background: var(--cl-accent); box-shadow: 0 0 5px var(--cl-accent); }
      .timeout-dot.away.active { background: var(--cl-accent-2); box-shadow: 0 0 5px var(--cl-accent-2); }
      .timeout-dot.spent { background: var(--cl-card-2); border: 1px solid var(--cl-glass-border); }

      .meta-row {
        display: flex; justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        border-top: 1px solid var(--cl-divider);
        background: var(--cl-card-2);
      }
      .venue-item { min-width: 0; }
      .venue-item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .extras-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 8px 18px 12px;
        background: var(--cl-card-2);
        position: relative;
        z-index: 2;
      }
      .extra-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.25);
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--cl-accent);
      }
      .extra-chip svg { width: 12px; height: 12px; }
      .extra-chip.broadcast {
        background: rgba(99,102,241,0.12);
        border-color: rgba(99,102,241,0.3);
        color: var(--cl-accent);
      }
      .extra-chip.attendance {
        background: rgba(16,185,129,0.12);
        border-color: rgba(16,185,129,0.3);
        color: var(--cl-green);
      }
      .meta-item {
        display: flex; align-items: center; gap: 6px;
        color: var(--cl-text-2);
        font-size: 11px;
        font-weight: 600;
      }
      .meta-item svg { width: 14px; height: 14px; opacity: 0.7; }
      .info-btn {
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        color: white;
        border: none;
        padding: 7px 14px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(99,102,241,0.4);
      }
      .info-btn:hover {
        transform: translateY(-1px) scale(1.04);
        box-shadow: 0 8px 20px rgba(99,102,241,0.6);
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
        box-shadow:
          0 0 0 2px #f59e0b,
          0 0 0 4px rgba(245, 158, 11, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7);
      }
      .event-toast.variant-yellow strong { color: #fbbf24; }
      .event-toast.variant-red {
        box-shadow:
          0 0 0 2px var(--cl-live),
          0 0 0 4px rgba(239, 68, 68, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7);
      }
      .event-toast.variant-red strong { color: #fca5a5; }
      @keyframes toast-bounce {
        0%   { opacity: 0; transform: translate(-50%, -20px) scale(0.7); }
        8%   { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        14%  { transform: translate(-50%, 0) scale(1); }
        90%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
      }

      /* Goal celebration */
      ha-card.goal-flash {
        animation: card-goal-flash 1.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes card-goal-flash {
        0%   { box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
        20%  { box-shadow: 0 0 0 4px var(--cl-accent), 0 0 60px 20px var(--cl-accent), 0 4px 24px rgba(0,0,0,0.15); }
        50%  { box-shadow: 0 0 0 2px var(--cl-accent-2), 0 0 40px 10px var(--cl-accent-2), 0 4px 24px rgba(0,0,0,0.15); }
        100% { box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
      }
      .score-numbers.goal-scored {
        animation: score-goal-pop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes score-goal-pop {
        0%   { transform: scale(1); }
        20%  { transform: scale(1.4); filter: drop-shadow(0 0 30px var(--cl-accent)); }
        40%  { transform: scale(0.95); }
        60%  { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      .team-logo-big.scorer-bounce {
        animation: scorer-bounce 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes scorer-bounce {
        0%   { transform: scale(1) rotate(0deg); }
        25%  { transform: scale(1.3) rotate(-15deg); }
        50%  { transform: scale(1.1) rotate(10deg); }
        75%  { transform: scale(1.2) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      .goal-banner {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }
      .goal-banner::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, var(--cl-overlay-strong) 0%, var(--cl-overlay-soft) 40%, transparent 70%);
        animation: banner-backdrop 1.6s ease-out forwards;
      }
      @keyframes banner-backdrop {
        0%   { opacity: 0; }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { opacity: 0; }
      }
      .goal-banner-text {
        position: relative;
        font-size: 84px;
        font-weight: 900;
        letter-spacing: -0.06em;
        color: var(--cl-gold-text);
        -webkit-text-stroke: 2px #1a0f00;
        text-shadow:
          0 0 24px rgba(251, 191, 36, 1),
          0 0 48px rgba(251, 191, 36, 0.7),
          0 6px 0 #b45309,
          0 8px 24px rgba(0, 0, 0, 0.6);
        animation: goal-text-blast 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        transform-origin: center;
      }
      @keyframes goal-text-blast {
        0%   { opacity: 0; transform: scale(0.3) rotate(-8deg); }
        20%  { opacity: 1; transform: scale(1.15) rotate(-3deg); }
        40%  { transform: scale(0.95) rotate(2deg); }
        60%  { transform: scale(1.05) rotate(0deg); }
        80%  { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(1.3) rotate(0deg); }
      }
      .goal-flash-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(251,191,36,0.25), transparent 70%);
        pointer-events: none;
        z-index: 49;
        animation: flash-overlay 1s ease-out forwards;
      }
      @keyframes flash-overlay {
        0%   { opacity: 0; }
        20%  { opacity: 1; }
        100% { opacity: 0; }
      }
      .confetti {
        position: absolute;
        top: 20px; left: 50%;
        width: 8px; height: 8px;
        pointer-events: none;
        z-index: 99;
        animation: confetti-fly 1.8s ease-out forwards;
      }
      @keyframes confetti-fly {
        0% {
          transform: translate(-50%, 0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translate(calc(-50% + var(--dx)), var(--dy)) rotate(720deg);
          opacity: 0;
        }
      }
    `];
  }
}

customElements.define("sports-live-team", SportsLiveTeamNextCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sports-live-team',
  name: 'Sports Live Team',
  description: 'Next match and live score for a tracked team.',
});
