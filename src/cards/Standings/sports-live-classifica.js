import { LitElement, html, css } from "lit-element";
import { t, resolveLang } from "../../i18n.js";
import { skinStyles, applySkin, resolveSkin } from "../../skins.js";
import { openModal, closeModal } from "../../modal-helper.js";
import { teamLogo, LOGO_ONERROR } from "../../logo-fallback.js";

// Helper per generare un range inclusivo
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// Etichette di default per le 4 zone (i18n keys).
const DEFAULT_ZONE_LABELS = {
  champions: 'zone.champions',
  europa: 'zone.europa',
  conference: 'zone.conference',
  relegation: 'zone.relegation',
};

// Preset zone classifica per competizione. Ogni preset definisce:
// - match(code, entity): funzione che decide se applicare il preset
// - champions / europa / conference / relegation: range posizioni o "bottomN"
// - labels (opzionale): override i18n key per ogni zona; null = nascondi in legenda
// L'utente può sovrascrivere con `zone_config` o sceglierne uno con `zone_preset`.
const ZONE_PRESETS = {
  // Italian Serie A (20 squadre): 1-4 CL, 5 EL, 6 CnL, ult. 3 retrocesse
  serie_a: {
    match: (code, entity) => code === 'ita.1' || entity.includes('italian_serie_a'),
    champions: [1, 2, 3, 4], europa: [5], conference: [6], relegation: 'bottom3',
  },
  // English Premier League (20): 1-5 CL, 6 EL, 7 CnL, ult. 3 retrocesse
  premier_league: {
    match: (code, entity) => code === 'eng.1' || entity.includes('english_premier'),
    champions: [1, 2, 3, 4, 5], europa: [6], conference: [7], relegation: 'bottom3',
  },
  // Spanish LaLiga (20): 1-4 CL, 5 EL, 6 CnL, ult. 3 retrocesse
  laliga: {
    match: (code, entity) => code === 'esp.1' || entity.includes('spanish_la_liga') || entity.includes('spanish_laliga'),
    champions: [1, 2, 3, 4], europa: [5], conference: [6], relegation: 'bottom3',
  },
  // Bundesliga (18): 1-4 CL, 5 EL, 6 CnL, 17-18 retrocesse, 16 spareggio
  bundesliga: {
    match: (code, entity) => code === 'ger.1' || entity.includes('german_bundesliga'),
    champions: [1, 2, 3, 4], europa: [5], conference: [6], relegation: [17, 18],
  },
  // Ligue 1 (18): 1-3 CL (3° via spareggio), 4 EL, 5 CnL, 17-18 retrocesse
  ligue_1: {
    match: (code, entity) => code === 'fra.1' || entity.includes('french_ligue_1'),
    champions: [1, 2, 3], europa: [4], conference: [5], relegation: [17, 18],
  },
  // Eredivisie (18): 1-2 CL, 3 EL, 4-5 CnL, 17-18 retrocesse
  eredivisie: {
    match: (code, entity) => code === 'ned.1' || entity.includes('dutch_eredivisie'),
    champions: [1, 2], europa: [3], conference: [4, 5], relegation: [17, 18],
  },
  // Primeira Liga (18): 1-2 CL, 3 EL, 4 CnL, 17-18 retrocesse
  primeira_liga: {
    match: (code, entity) => code === 'por.1' || entity.includes('portuguese_primeira'),
    champions: [1, 2], europa: [3], conference: [4], relegation: [17, 18],
  },
  // UEFA Champions League — fase a 36: top 8 diretti agli ottavi,
  // 9-24 KO playoff, 25-36 eliminate
  ucl_league_phase: {
    match: (code, entity) => code === 'uefa.champions' || entity.includes('uefa_champions_league'),
    champions: range(1, 8), europa: range(9, 24), conference: [], relegation: 'bottom12',
  },
  // UEFA Europa League — stessa logica della UCL
  uel_league_phase: {
    match: (code, entity) => code === 'uefa.europa' || entity.includes('uefa_europa_league'),
    champions: range(1, 8), europa: range(9, 24), conference: [], relegation: 'bottom12',
  },
  // UEFA Conference League — fase a 36: top 8 ottavi, 9-24 playoff, 25-36 eliminate
  uecl_league_phase: {
    match: (code, entity) => code === 'uefa.europa.conf' || entity.includes('uefa_conference'),
    champions: range(1, 8), europa: range(9, 24), conference: [], relegation: 'bottom12',
  },
  // FIFA World Cup — fase a gironi: top 2 qualificate agli ottavi,
  // 3° posto può accedere come miglior terza (Mondiale 2026: 8 migliori terze),
  // ultima eliminata
  world_cup: {
    match: (code, entity) => code === 'fifa.world' || entity.includes('fifa_world_cup') || entity.includes('world_cup'),
    champions: [1, 2], europa: [3], conference: [], relegation: 'bottom1',
    kind: 'cup_group',
    hero: { icon: '🏆', accent: 'world_cup' },
    labels: {
      champions: 'zone.qualified',
      europa: 'zone.third_place_playoff',
      conference: null,
      relegation: 'zone.eliminated',
    },
  },
  // UEFA European Championship — fase a gironi: top 2 + migliori 4 terze agli ottavi
  uefa_euro: {
    match: (code, entity) => code === 'uefa.euro' || entity.includes('uefa_euro') || entity.includes('european_championship'),
    champions: [1, 2], europa: [3], conference: [], relegation: 'bottom1',
    kind: 'cup_group',
    hero: { icon: '⭐', accent: 'uefa_euro' },
    labels: {
      champions: 'zone.qualified',
      europa: 'zone.third_place_playoff',
      conference: null,
      relegation: 'zone.eliminated',
    },
  },
  // Copa America — fase a gironi: top 2 ai quarti, altre eliminate
  copa_america: {
    match: (code, entity) => code === 'conmebol.america' || entity.includes('copa_america') || entity.includes('conmebol_america'),
    champions: [1, 2], europa: [], conference: [], relegation: 'bottom2',
    kind: 'cup_group',
    hero: { icon: '🏆', accent: 'copa_america' },
    labels: {
      champions: 'zone.qualified',
      europa: null,
      conference: null,
      relegation: 'zone.eliminated',
    },
  },
};

class SportsLiveStandingsCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      maxTeamsVisible: { type: Number },
      hideHeader: { type: Boolean },
      selectedGroup: { type: String },
      showPopup: { type: Boolean },
      activeTeam: { type: Object },
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
    this.maxTeamsVisible = config.max_teams_visible ? config.max_teams_visible : 10;
    this.hideHeader = config.hide_header || false;
    this.compact = config.compact === true;
    this.highlightTeam = config.highlight_team || '';
    this.selectedGroup = config.selected_group || '';
    this.showEventToasts = config.show_event_toasts === true;
    this._toastMessage = '';
    this._toastVisible = false;
    this._toastVariant = 'goal';
    this._toastTimer = null;
    this.showPopup = false;
    this.activeTeam = null;
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeToEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    closeModal('sports-live-standings-popup');
    if (this._eventSubscriptions && Array.isArray(this._eventSubscriptions)) {
      this._eventSubscriptions.forEach(unsub => { if (typeof unsub === 'function') unsub(); });
      this._eventSubscriptions = [];
    }
  }

  _subscribeToEvents() {
    if (!this.hass?.connection) return;
    this._eventSubscriptions = [];
    // Standings toasts are secondary. Try custom events; if refused (restricted
    // user), catch silently — the standings table works without event subscriptions.
    ['sports_live_score', 'sports_live_discipline', 'sports_live_match_finished'].forEach(evt => {
      this.hass.connection.subscribeEvents(
        this._handleSportsLiveEvent.bind(this), evt,
      ).then(unsub => {
        if (typeof unsub === 'function') this._eventSubscriptions.push(unsub);
      }).catch(() => {});
    });
  }

  _eventBelongsToThisCard(eventData) {
    if (!this.hass || !this._config) return false;
    const entityId = this._config.entity || '';
    const eventCode = eventData.competition_code;
    if (!eventCode) return false;
    const normalized = eventCode.replace(/\./g, '_').toLowerCase();
    return entityId.toLowerCase().includes(normalized);
  }

  _handleSportsLiveEvent(event) {
    const eventType = event.event_type;
    const eventData = event.data;
    if (!this._eventBelongsToThisCard(eventData)) return;
    if (!this.showEventToasts) return;
    this._showEventToast(eventType, eventData);
  }

  _showEventToast(eventType, eventData) {
    let message = '';
    let variant = 'goal';
    const min = eventData.minute && eventData.minute !== 'N/A' ? ` (${eventData.minute}')` : '';
    if (eventType === 'sports_live_score') {
      const label = (eventData.score_event_label || this._t('event.goal')).toUpperCase();
      const scorer = eventData.player && eventData.player !== 'N/A' ? `${eventData.player} · ` : '';
      message = `<strong>${label}!</strong> ${scorer}${eventData.home_team} ${eventData.home_score} - ${eventData.away_score} ${eventData.away_team}`;
      variant = 'goal';
    } else if (eventType === 'sports_live_discipline') {
      const dt = String(eventData.discipline_type || '').toUpperCase();
      if (dt === 'YELLOW') {
        message = `🟨 <strong>${this._t('event.yellow_card')}</strong> · ${eventData.player}${min}`;
        variant = 'yellow';
      } else if (dt === 'RED') {
        message = `🟥 <strong>${this._t('event.red_card')}</strong> · ${eventData.player}${min}`;
        variant = 'red';
      }
    } else if (eventType === 'sports_live_match_finished') {
      message = `<strong>${this._t('status.full_time')}</strong> ${eventData.home_team} ${eventData.home_score} - ${eventData.away_score} ${eventData.away_team}`;
      variant = 'finished';
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

  showTeamDetails(team) {
    this.activeTeam = team;
    this.showPopup = true;
  }

  updated(changedProperties) {
    if (changedProperties.has('showPopup') || changedProperties.has('activeTeam')) {
      this._renderTeamPopupToBody();
    }
  }

  _renderTeamPopupToBody() {
    if (!this.showPopup || !this.activeTeam) {
      closeModal('sports-live-standings-popup');
      return;
    }

    const t = this.activeTeam;
    const tx = (k) => this._t(k);
    const sport = this._sport();
    const isUS = ['nba', 'nhl', 'mlb', 'nfl'].includes(sport);
    const num = (v) => { const n = parseInt(String(v ?? '').replace('+', ''), 10); return isNaN(n) ? null : n; };

    const isLight = resolveSkin(this._config) === 'light';
    const popup = openModal('sports-live-standings-popup', isLight, () => { this.showPopup = false; });

    const w = num(t.wins); const d = num(t.draws); const l = num(t.losses);
    const played = (w !== null && l !== null) ? w + (d || 0) + l : null;
    const gd = num(t.goal_difference);
    const gdLabel = gd === null ? '—' : (gd > 0 ? `+${gd}` : `${gd}`);
    const gdColor = gd === null ? 'var(--p-sub)' : (gd > 0 ? '#10b981' : gd < 0 ? '#ef4444' : 'var(--p-sub)');
    const clean = (v) => (v === null || v === undefined || v === '' || v === 'N/A') ? null : v;

    const statBox = (label, val, color = 'var(--p-text)') =>
      `<div style="background:var(--p-panel);padding:12px 8px;border-radius:12px;text-align:center;">
        <div style="font-size:18px;font-weight:900;color:${color};font-variant-numeric:tabular-nums;">${val ?? '—'}</div>
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--p-sub);margin-top:3px;">${label}</div>
      </div>`;

    // Sport-aware stat grids.
    let statGrids;
    if (isUS) {
      const seedLine = clean(t.playoff_seed) ? `<div style="font-size:11px;font-weight:700;color:var(--p-sub);margin-top:2px;">Seed #${t.playoff_seed}</div>` : '';
      statGrids = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">
          ${statBox(tx('col.wins'), w, '#10b981')}
          ${statBox(tx('col.losses'), l, '#ef4444')}
          ${statBox(sport === 'nhl' ? tx('col.otl') : tx('col.pct'), sport === 'nhl' ? clean(t.ot_losses) : clean(t.win_pct))}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">
          ${statBox(tx('col.gb'), clean(t.games_behind))}
          ${statBox(tx('col.streak'), clean(t.streak))}
          ${statBox(sport === 'nhl' ? tx('col.points') : tx('col.gd'), sport === 'nhl' ? clean(t.points) : (gd === null ? null : gdLabel), gdColor)}
        </div>
        ${seedLine}`;
    } else {
      statGrids = `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px;">
          ${statBox(tx('col.played'), played)}
          ${statBox(tx('col.wins'), w, '#10b981')}
          ${statBox(tx('col.draws'), d, '#f59e0b')}
          ${statBox(tx('col.losses'), l, '#ef4444')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">
          ${statBox(tx('col.gf'), clean(t.goals_for))}
          ${statBox(tx('col.ga'), clean(t.goals_against))}
          ${statBox(tx('col.gd'), gdLabel, gdColor)}
        </div>`;
    }

    const formStr = String(t.form || '').replace(/[^WLDwld]/g, '').toUpperCase().slice(-5);
    const pillColor = { W: '#10b981', L: '#ef4444', D: '#f59e0b' };
    const formPills = formStr ? formStr.split('').map(c =>
      `<div style="width:22px;height:22px;border-radius:6px;background:${pillColor[c] || '#475569'};color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;">${c}</div>`
    ).join('') : '';

    popup.innerHTML = `
      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:480px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <img src="${teamLogo(t.team_logo)}" onerror="${LOGO_ONERROR}" style="width:64px;height:64px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" />
          <div>
            <div style="font-size:20px;font-weight:900;letter-spacing:-0.02em;">${t.team_name}</div>
            <div style="font-size:11px;font-weight:700;color:var(--p-sub);margin-top:4px;">${tx('col.pos')} #${t.rank} · ${t.points ?? '—'} ${tx('col.points')}</div>
          </div>
        </div>

        ${statGrids}

        ${formPills ? `
        <div style="margin-bottom:18px;padding:14px;background:var(--p-panel);border-radius:12px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--p-sub);margin-bottom:8px;">${tx('team.form')} (${tx('team.last5')})</div>
          <div style="display:flex;gap:6px;">${formPills}</div>
        </div>` : ''}

        <button id="standings-popup-close" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:4px;font-weight:800;width:100%;font-size:14px;">${tx('generic.close')}</button>
      </div>`;

    popup.querySelector('#standings-popup-close').onclick = () => { this.showPopup = false; };
  }

  getCardSize() { return 5; }
  static getConfigElement() { return document.createElement("sports-live-classifica-editor"); }
  static getStubConfig() {
    return {
      entity: "",
      max_teams_visible: 10,
      hide_header: false,
      selected_group: '',
      show_event_toasts: false,
    };
  }

  _getZoneConfig() {
    // 1) Override esplicito nella config della card
    if (this._config.zone_config) return this._config.zone_config;
    // 2) Preset preimpostato per nome (es. zone_preset: 'serie_a')
    if (this._config.zone_preset && ZONE_PRESETS[this._config.zone_preset]) {
      return ZONE_PRESETS[this._config.zone_preset];
    }
    // 3) Auto-detect dal codice competizione / nome entity
    const preset = this._inferPresetFromEntity();
    if (preset) return preset;
    // 4) Fallback: nessuna zona colorata
    return { champions: [], europa: [], conference: [], relegation: null };
  }

  _getZoneLabels() {
    const zones = this._getZoneConfig();
    const overrides = zones.labels || {};
    return {
      champions: overrides.champions !== undefined ? overrides.champions : DEFAULT_ZONE_LABELS.champions,
      europa: overrides.europa !== undefined ? overrides.europa : DEFAULT_ZONE_LABELS.europa,
      conference: overrides.conference !== undefined ? overrides.conference : DEFAULT_ZONE_LABELS.conference,
      relegation: overrides.relegation !== undefined ? overrides.relegation : DEFAULT_ZONE_LABELS.relegation,
    };
  }

  _hasZonePositions(zonePositions) {
    if (!zonePositions) return false;
    if (Array.isArray(zonePositions)) return zonePositions.length > 0;
    if (typeof zonePositions === 'string') return /^bottom\d+$/.test(zonePositions);
    return false;
  }

  _inferPresetFromEntity() {
    const entity = (this._config.entity || '').toLowerCase();
    const stateObj = this.hass && this._config.entity ? this.hass.states[this._config.entity] : null;
    const compCode = stateObj && stateObj.attributes ? String(stateObj.attributes.competition_code || '').toLowerCase() : '';
    // Itera i preset: il primo con match vince
    for (const [, def] of Object.entries(ZONE_PRESETS)) {
      if (def.match && def.match(compCode, entity)) return def;
    }
    return null;
  }

  _positionInZone(rank, total, zonePositions) {
    if (!zonePositions) return false;
    // Stringhe tipo "bottom3", "bottom2", "bottom12"
    const m = String(zonePositions).match(/^bottom(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10);
      return total && rank > total - n;
    }
    if (Array.isArray(zonePositions)) {
      return zonePositions.includes(Number(rank));
    }
    return false;
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

  _isCupGroupStage() {
    const zones = this._getZoneConfig();
    return zones && zones.kind === 'cup_group';
  }

  _groupHasNoMatches(standings) {
    if (!standings || !standings.length) return false;
    const num = (v) => {
      if (v === null || v === undefined || v === '') return 0;
      const n = parseInt(String(v).replace('+', ''), 10);
      return isNaN(n) ? 0 : n;
    };
    return standings.every(t => num(t.wins) + num(t.draws) + num(t.losses) === 0);
  }

  _zoneClass(rank, total) {
    const zones = this._getZoneConfig();

    if (this._positionInZone(rank, total, zones.champions)) {
      // Nei tornei a gironi (Mondiale/Euro/Copa) #1 e #2 hanno lo stesso
      // status (qualificate): non distinguere graficamente la 1ª posizione.
      if (rank === 1 && !this._isCupGroupStage()) return 'zone-cl rank-first';
      return 'zone-cl';
    }

    if (this._positionInZone(rank, total, zones.europa)) {
      return 'zone-el';
    }

    if (this._positionInZone(rank, total, zones.conference)) {
      return 'zone-conf';
    }

    if (this._positionInZone(rank, total, zones.relegation)) {
      return 'zone-rel';
    }

    return 'zone-default';
  }

  _sortStandings(standings, seasonName) {
    let s = (standings || []).filter(t => t.rank != null);
    if (seasonName.includes("MLS")) {
      s = s.slice().sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
        return b.goals_for - a.goals_for;
      });
      s.forEach((t, i) => { t.rank = i + 1; });
    } else {
      s = s.slice().sort((a, b) => a.rank - b.rank);
    }
    return s;
  }

  _currentGroup(standingsGroups) {
    return standingsGroups.find(g => g.name === this.selectedGroup) || standingsGroups[0];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return html`<ha-card class="empty">${this._t('generic.unknown_entity')}: ${entityId}</ha-card>`;

    const seasonName = stateObj.attributes.season || '';
    const standingsGroups = stateObj.attributes.standings_groups || [];
    const hasAnyRows = standingsGroups.some(g => (g.standings || []).length > 0);
    if (!hasAnyRows) {
      return html`<ha-card class="empty">
        <div class="empty-icon">${this._sportIcon()}</div>
        <div class="empty-title">${this._t('standings.empty.title')}</div>
        <div class="empty-sub">${this._t('standings.empty.sub')}</div>
      </ha-card>`;
    }
    const showAllGroups = !this.selectedGroup && standingsGroups.length > 1;
    const standingsGroup = this._currentGroup(standingsGroups);
    const filteredStandings = this._sortStandings(standingsGroup ? standingsGroup.standings : [], seasonName);

    const total = filteredStandings.length;
    const maxVisible = Math.min(this.maxTeamsVisible, total);
    const tableHeight = maxVisible * 48 + 50;

    return html`
      <ha-card>
        ${this.showEventToasts && this._toastVisible ? html`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        ` : ''}

        ${this.hideHeader ? '' : this._renderHeader(stateObj, seasonName, standingsGroup, standingsGroups, showAllGroups)}

        ${showAllGroups
          ? this._renderGroupsGrid(standingsGroups, seasonName)
          : html`
            <div class="table-wrap" style="max-height: ${tableHeight}px;">
              ${this.compact
                ? this._renderCompactTable(filteredStandings, total)
                : this._renderFullTable(filteredStandings, total)
              }
            </div>
          `}

        ${this._renderLegend()}
      </ha-card>
    `;
  }

  // ------------------------------------------------------------------
  // Sport-aware standings columns
  // ------------------------------------------------------------------

  _sport() {
    const stateObj = this.hass && this._config.entity ? this.hass.states[this._config.entity] : null;
    return stateObj && stateObj.attributes ? String(stateObj.attributes.sport || '') : '';
  }

  _sportIcon() {
    const icons = {
      soccer: '⚽', nfl: '🏈', rugby: '🏉', nba: '🏀',
      nhl: '🏒', mlb: '⚾', cricket: '🏏', tennis: '🎾', mma: '🥊',
    };
    return icons[this._sport()] || '🏆';
  }

  /** Column descriptors for the full table, keyed off the entry's sport. */
  _fullColumns() {
    const sport = this._sport();
    if (sport === 'nhl') {
      return [
        { key: 'wins', label: 'col.wins' },
        { key: 'losses', label: 'col.losses' },
        { key: 'ot_losses', label: 'col.otl' },
        { key: 'streak', label: 'col.streak' },
        { key: 'points', label: 'col.points', cls: 'points-cell' },
      ];
    }
    if (sport === 'nba' || sport === 'mlb' || sport === 'nfl') {
      return [
        { key: 'wins', label: 'col.wins' },
        { key: 'losses', label: 'col.losses' },
        { key: 'games_behind', label: 'col.gb' },
        { key: 'streak', label: 'col.streak' },
        { key: 'win_pct', label: 'col.pct', cls: 'points-cell' },
      ];
    }
    // Football / rugby / default — full league table
    return [
      { key: 'played', label: 'col.played' },
      { key: 'wins', label: 'col.wins' },
      { key: 'draws', label: 'col.draws' },
      { key: 'losses', label: 'col.losses' },
      { key: 'gd', label: 'col.gd' },
      { key: 'points', label: 'col.points', cls: 'points-cell' },
    ];
  }

  /** Column descriptors for the compact table (group grids / compact mode). */
  _compactColumns() {
    const sport = this._sport();
    if (sport === 'nhl') {
      return [{ key: 'record', label: 'col.wins' }, { key: 'points', label: 'col.points', cls: 'points-cell' }];
    }
    if (sport === 'nba' || sport === 'mlb' || sport === 'nfl') {
      return [{ key: 'record', label: 'col.wins' }, { key: 'win_pct', label: 'col.pct', cls: 'points-cell' }];
    }
    // Soccer / rugby: show W/D/L/Pts so group-stage tables (World Cup, UEFA, Copa)
    // have the same essential info as the full single-group table.
    return [
      { key: 'played', label: 'col.played' },
      { key: 'wins',   label: 'col.wins' },
      { key: 'draws',  label: 'col.draws' },
      { key: 'losses', label: 'col.losses' },
      { key: 'points', label: 'col.points', cls: 'points-cell' },
    ];
  }

  /** Resolve a column descriptor to {value, cls} for a team row. */
  _cellFor(team, col) {
    const num = (v) => {
      if (v === null || v === undefined || v === '') return null;
      const n = parseInt(String(v).replace('+', ''), 10);
      return isNaN(n) ? null : n;
    };
    if (col.key === 'played') {
      const w = num(team.wins), d = num(team.draws), l = num(team.losses);
      const played = (w !== null && l !== null) ? (w + (d || 0) + l) : null;
      return { value: played ?? (team.games_played && team.games_played !== 'N/A' ? team.games_played : '-'), cls: col.cls || '' };
    }
    if (col.key === 'gd') {
      const gd = num(team.goal_difference);
      return {
        value: gd === null ? '-' : (gd > 0 ? `+${gd}` : `${gd}`),
        cls: gd === null ? '' : (gd > 0 ? 'gd-pos' : (gd < 0 ? 'gd-neg' : '')),
      };
    }
    if (col.key === 'record') {
      const w = team.wins, l = team.losses;
      const rec = (w != null && w !== 'N/A' && l != null && l !== 'N/A') ? `${w}-${l}` : '-';
      return { value: rec, cls: col.cls || '' };
    }
    const raw = team[col.key];
    const value = (raw === null || raw === undefined || raw === '' || raw === 'N/A') ? '-' : raw;
    return { value, cls: col.cls || '' };
  }

  _renderFullTable(standings, total) {
    const cols = this._fullColumns();
    return html`
      <table class="standings-table">
        <thead>
          <tr>
            <th>${this._t('col.pos')}</th>
            <th class="team-col">${this._t('col.team')}</th>
            ${cols.map(c => html`<th>${this._t(c.label)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${standings.map(team => {
            const isHighlighted = this.highlightTeam && team.team_name &&
              team.team_name.toLowerCase().includes(this.highlightTeam.toLowerCase());
            return html`
              <tr class="${this._zoneClass(team.rank, total)} clickable-row ${isHighlighted ? 'highlighted' : ''}"
                  @click="${() => this.showTeamDetails(team)}">
                <td><div class="rank-cell"><div class="rank-num">${team.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${teamLogo(team.team_logo)}" onerror="${LOGO_ONERROR}" alt="${team.team_name}" />
                  <span class="tname">${team.team_name}</span>
                </td>
                ${cols.map(c => { const cell = this._cellFor(team, c); return html`<td class="${cell.cls}">${cell.value}</td>`; })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  _renderCompactTable(standings, total) {
    const cols = this._compactColumns();
    return html`
      <table class="standings-table compact">
        <thead>
          <tr>
            <th>${this._t('col.pos')}</th>
            <th class="team-col">${this._t('col.team')}</th>
            ${cols.map(c => html`<th>${this._t(c.label)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${standings.map(team => html`
              <tr class="${this._zoneClass(team.rank, total)} clickable-row"
                  @click="${() => this.showTeamDetails(team)}">
                <td><div class="rank-cell"><div class="rank-num">${team.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${teamLogo(team.team_logo)}" onerror="${LOGO_ONERROR}" alt="${team.team_name}" />
                  <span class="tname">${team.team_name}</span>
                </td>
                ${cols.map(c => { const cell = this._cellFor(team, c); return html`<td class="${cell.cls}">${cell.value}</td>`; })}
              </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  _renderHeader(stateObj, seasonName, standingsGroup, standingsGroups, showAllGroups) {
    const zones = this._getZoneConfig();
    const isCupGroup = this._isCupGroupStage();
    const hero = zones && zones.hero ? zones.hero : null;

    // Sub: niente "N/A" sporco. Solo phase se disponibile.
    const phaseLabel = showAllGroups
      ? this._t('phase.group_stage')
      : (this._shouldShowPhase(standingsGroup && standingsGroup.name)
          ? this._translatePhase(standingsGroup.name)
          : '');
    const hasSeason = seasonName && seasonName.toLowerCase() !== 'n/a';
    const subParts = [];
    if (hasSeason) subParts.push(seasonName);
    if (phaseLabel) subParts.push(phaseLabel);

    // Conteggio gironi e squadre totali (utile su tornei a gironi)
    let totalTeams = 0;
    if (showAllGroups) {
      for (const g of standingsGroups) {
        totalTeams += (g.standings || []).filter(t => t.rank != null).length;
      }
    }

    return html`
      <div class="top-bar ${isCupGroup ? 'top-bar-cup' : ''} ${hero ? `accent-${hero.accent}` : ''}">
        ${hero && hero.icon ? html`<div class="hero-icon">${hero.icon}</div>` : ''}
        <h2>${stateObj.state}</h2>
        <div class="sub">${subParts.join(' · ')}</div>
        ${showAllGroups && isCupGroup ? html`
          <div class="hero-badges">
            <span class="badge">${standingsGroups.length} ${this._t('hero.groups')}</span>
            <span class="badge">${totalTeams} ${this._t('hero.teams')}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderLegend() {
    const zones = this._getZoneConfig();
    const labels = this._getZoneLabels();
    const items = [
      { key: 'champions', dot: 'cl', positions: zones.champions, label: labels.champions },
      { key: 'europa', dot: 'el', positions: zones.europa, label: labels.europa },
      { key: 'conference', dot: 'conf', positions: zones.conference, label: labels.conference },
      { key: 'relegation', dot: 'rel', positions: zones.relegation, label: labels.relegation },
    ].filter(item => item.label && this._hasZonePositions(item.positions));

    if (!items.length) return '';

    return html`
      <div class="legend">
        ${items.map(item => html`
          <div class="legend-item">
            <span class="legend-dot ${item.dot}"></span>${this._t(item.label)}
          </div>
        `)}
      </div>
    `;
  }

  _renderGroupsGrid(standingsGroups, seasonName) {
    const isCupGroup = this._isCupGroupStage();
    return html`
      <div class="groups-grid ${isCupGroup ? 'groups-grid-cup' : ''}">
        ${standingsGroups.map(g => {
          const sorted = this._sortStandings(g.standings || [], seasonName);
          const notStarted = this._groupHasNoMatches(sorted);
          return html`
            <div class="group-cell ${notStarted ? 'group-cell-pending' : ''}">
              <div class="group-title">
                <span>${g.name}</span>
                ${notStarted ? html`<span class="group-pending-badge">${this._t('hero.not_started')}</span>` : ''}
              </div>
              ${this._renderCompactTable(sorted, sorted.length)}
            </div>
          `;
        })}
      </div>
    `;
  }

  static get styles() {
    return [skinStyles, css`
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        background: var(--cl-bg);
        color: var(--cl-text);
        box-shadow: 0 4px 24px var(--cl-shadow);
      }
      ha-card.empty {
        padding: 36px 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .empty-icon { font-size: 40px; line-height: 1; margin-bottom: 10px; opacity: 0.85; }
      .empty-title { font-size: 15px; font-weight: 800; color: var(--cl-text); margin-bottom: 4px; }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .top-bar {
        position: relative;
        padding: 20px 18px;
        background:
          linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.10) 60%, transparent);
        border-bottom: 1px solid var(--cl-divider);
        overflow: hidden;
      }
      .top-bar::before {
        content: '⚽';
        position: absolute;
        right: -10px; top: -10px;
        font-size: 90px;
        opacity: 0.06;
        transform: rotate(15deg);
      }
      .top-bar-cup {
        padding: 28px 22px 22px;
        background:
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.30), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(236,72,153,0.20), transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar-cup::before { display: none; }
      .top-bar-cup .hero-icon {
        position: absolute;
        right: 14px; top: 14px;
        font-size: 56px;
        line-height: 1;
        opacity: 0.95;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.45));
      }
      .top-bar-cup h2 {
        font-size: 24px;
        letter-spacing: -0.04em;
      }
      .top-bar-cup .sub {
        font-size: 13px;
        margin-top: 6px;
        letter-spacing: 0.02em;
      }
      .top-bar.accent-world_cup {
        background:
          radial-gradient(circle at 20% 20%, rgba(251,191,36,0.22), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(99,102,241,0.18), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar.accent-uefa_euro {
        background:
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.30), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(251,191,36,0.18), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar.accent-copa_america {
        background:
          radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(245,158,11,0.20), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .hero-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .hero-badges .badge {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.12);
        color: var(--cl-text);
        backdrop-filter: blur(8px);
      }
      .top-bar h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, var(--cl-text), var(--cl-accent));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .top-bar .sub {
        color: var(--cl-text-2);
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
      }

      .table-wrap {
        overflow-y: auto;
      }
      .standings-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 13px;
      }
      .standings-table thead th {
        position: sticky;
        top: 0;
        background: var(--cl-card-2);
        backdrop-filter: blur(8px);
        padding: 10px 4px;
        text-align: center;
        font-size: 10px;
        font-weight: 800;
        color: var(--cl-text-2);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border-bottom: 1px solid var(--cl-divider);
        z-index: 1;
      }
      .standings-table thead th:first-child { padding-left: 14px; text-align: left; }
      .standings-table thead th:last-child { padding-right: 14px; }
      .standings-table thead th.team-col { text-align: left; }

      .standings-table tbody tr {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .standings-table tbody tr:hover {
        background: var(--cl-card-2);
      }
      .standings-table tbody tr.clickable-row {
        cursor: pointer;
      }
      .standings-table tbody tr.clickable-row:hover {
        background: var(--cl-card-2);
        transform: none;
      }
      .standings-table tbody td {
        padding: 10px 4px;
        text-align: center;
        border-bottom: 1px solid var(--cl-divider);
        font-variant-numeric: tabular-nums;
        font-weight: 600;
        color: var(--cl-text);
      }
      .standings-table tbody tr:last-child td { border-bottom: none; }
      .standings-table tbody td:first-child { padding-left: 14px; text-align: left; }
      .standings-table tbody td:last-child { padding-right: 14px; }

      .rank-cell {
        display: flex; align-items: center; gap: 6px;
        font-weight: 800;
      }
      .rank-num {
        width: 24px; height: 24px;
        border-radius: 7px;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px;
        font-weight: 900;
      }
      .standings-table tbody tr.highlighted {
        background: rgba(99,102,241,0.08) !important;
        border-left: 3px solid var(--cl-accent);
      }
      .standings-table tbody tr.highlighted .tname { font-weight: 900; color: var(--cl-accent); }
      .zone-cl .rank-num {
        background: linear-gradient(135deg, var(--cl-cl), #4f46e5);
        color: white;
        box-shadow: 0 2px 12px rgba(99,102,241,0.4);
      }
      .zone-cl.rank-first .rank-num {
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        color: #1f1410;
        box-shadow: 0 2px 16px var(--cl-gold-glow);
        animation: gold-shimmer 3s ease-in-out infinite;
      }
      @keyframes gold-shimmer {
        0%, 100% { box-shadow: 0 2px 16px var(--cl-gold-glow); }
        50% { box-shadow: 0 2px 24px var(--cl-gold-glow), 0 0 32px var(--cl-gold-glow); }
      }
      .zone-el .rank-num {
        background: linear-gradient(135deg, var(--cl-el), #ea580c);
        color: white;
        box-shadow: 0 2px 12px rgba(249,115,22,0.4);
      }
      .zone-rel .rank-num {
        background: linear-gradient(135deg, var(--cl-rel), #b91c1c);
        color: white;
        box-shadow: 0 2px 12px rgba(239,68,68,0.4);
      }
      .zone-conf .rank-num {
        background: linear-gradient(135deg, var(--cl-conf), #7e22ce);
        color: white;
        box-shadow: 0 2px 12px rgba(168,85,247,0.4);
      }
      .zone-default .rank-num {
        background: var(--cl-card-2);
        color: var(--cl-text-2);
      }

      .team-cell {
        display: flex; align-items: center; gap: 10px;
        text-align: left !important;
      }
      .team-cell img {
        width: 24px; height: 24px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .team-cell .tname {
        font-weight: 700;
        font-size: 13px;
        letter-spacing: -0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .points-cell {
        font-weight: 900 !important;
        font-size: 14px !important;
      }
      .gd-pos { color: var(--cl-green); font-weight: 800 !important; }
      .gd-neg { color: var(--cl-live); font-weight: 800 !important; }

      .groups-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
        padding: 12px;
      }
      .group-cell {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-divider);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .group-title {
        padding: 10px 14px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--cl-text);
        background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.06));
        border-bottom: 1px solid var(--cl-divider);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .group-pending-badge {
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        color: var(--cl-text-2);
        border: 1px solid var(--cl-divider);
      }
      .groups-grid-cup .group-cell {
        border-left: 3px solid var(--cl-accent);
      }
      .groups-grid-cup .group-cell-pending {
        border-left-color: var(--cl-divider);
        opacity: 0.92;
      }
      .standings-table.compact {
        font-size: 12px;
      }
      .standings-table.compact thead th {
        padding: 8px 4px;
        font-size: 9px;
        letter-spacing: 0.08em;
      }
      .standings-table.compact tbody td {
        padding: 7px 4px;
        font-size: 12px;
      }
      .standings-table.compact .rank-num {
        width: 20px; height: 20px;
        font-size: 10px;
        border-radius: 6px;
      }
      .standings-table.compact .team-cell { gap: 7px; }
      .standings-table.compact .team-cell img {
        width: 18px; height: 18px;
      }
      .standings-table.compact .team-cell .tname {
        font-size: 12px;
        font-weight: 700;
      }
      .standings-table.compact .points-cell {
        font-size: 13px !important;
      }

      .legend {
        display: flex; flex-wrap: wrap;
        gap: 12px;
        padding: 12px 16px;
        border-top: 1px solid var(--cl-divider);
        background: var(--cl-card-2);
      }
      .legend-item {
        display: flex; align-items: center; gap: 6px;
        font-size: 10px;
        color: var(--cl-text-2);
        font-weight: 700;
        letter-spacing: 0.04em;
      }
      .legend-dot {
        width: 10px; height: 10px; border-radius: 3px;
      }
      .legend-dot.cl { background: linear-gradient(135deg, var(--cl-cl), #4f46e5); }
      .legend-dot.el { background: linear-gradient(135deg, var(--cl-el), #ea580c); }
      .legend-dot.rel { background: linear-gradient(135deg, var(--cl-rel), #b91c1c); }
      .legend-dot.conf { background: linear-gradient(135deg, var(--cl-conf), #7e22ce); }

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
        box-shadow: 0 0 0 2px var(--cl-gold), 0 0 0 4px rgba(251,191,36,0.3),
                    0 12px 40px rgba(0,0,0,0.7), 0 0 60px rgba(251,191,36,0.4);
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
      .event-toast.variant-finished {
        box-shadow: 0 0 0 2px var(--cl-green), 0 0 0 4px rgba(16,185,129,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-finished strong { color: #6ee7b7; }
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

customElements.define("sports-live-classifica", SportsLiveStandingsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sports-live-classifica',
  name: 'Sports Live Standings',
  description: 'League standings table for any sport: soccer, rugby, NFL.',
});
