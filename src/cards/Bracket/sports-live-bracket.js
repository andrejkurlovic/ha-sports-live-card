import { LitElement, html, svg, css } from "lit-element";
import { t, resolveLang } from "../../i18n.js";
import { skinStyles, applySkin } from "../../skins.js";
import { teamLogo, LOGO_ONERROR } from "../../logo-fallback.js";
import { esc, openModal, closeModal } from "../../modal-helper.js";

class SportsLiveBracketCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this._config = config;
    applySkin(this, config);
    this.hideHeader = config.hide_header === true;
    this.compactMode = config.compact === true;
    this._cardStyle = config.style === 'tree' ? 'tree' : 'list';
    this.treeShowPlayoffs = config.tree_show_playoffs === true;
  }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  _formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const month = this._t('month.' + (d.getMonth() + 1));
      return `${d.getDate()} ${month}`;
    } catch (e) { return ''; }
  }

  _localizeRoundName(round) {
    // Mappa il nome inglese dal sensor alla traduzione i18n
    const map = {
      'Final': 'round.final',
      'Semifinals': 'round.semifinals',
      'Quarterfinals': 'round.quarterfinals',
      'Round of 16': 'round.r16',
      'Round of 32': 'round.r32',
      'Knockout Playoffs': 'round.knockout_playoffs',
      'Preliminary Round': 'round.preliminary',
    };
    const key = map[round.name];
    return key ? this._t(key) : round.name;
  }

  getCardSize() { return 6; }
  static getConfigElement() { return document.createElement("sports-live-bracket-editor"); }
  static getStubConfig() {
    return { entity: "", hide_header: false, compact: false, style: 'list' };
  }

  _formatScore(s) {
    if (s === null || s === undefined) return '-';
    return String(s);
  }

  _isLight() {
    return this._config && this._config.skin === 'light';
  }

  _showTieDetail(tie) {
    const a = tie.team_a || {};
    const b = tie.team_b || {};
    const single = tie.single;
    const leg1 = tie.leg1;
    const leg2 = tie.leg2;
    const winner = tie.winner_team;
    const decidedOnPenalties = tie.decided_on_penalties || false;
    const penaltyScore = tie.penalty_score || null;
    const penaltyDetails = tie.penalty_details || [];

    const fmtDate = (iso) => {
      if (!iso) return '';
      try {
        const d = new Date(iso);
        return d.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch { return iso; }
    };

    const legRow = (leg, labelA, labelB) => {
      if (!leg) return '';
      const sA = leg.home_team === a.name ? leg.home_score : leg.away_score;
      const sB = leg.home_team === b.name ? leg.home_score : leg.away_score;
      const sAstr = sA !== null && sA !== undefined ? sA : '–';
      const sBstr = sB !== null && sB !== undefined ? sB : '–';
      const isLiveShootout = leg.state === 'in' && leg.in_penalty_shootout;
      const stateLabel = leg.state === 'in'
        ? `<span style="color:#ef4444;font-weight:800;">⬤ LIVE ${esc(leg.clock || '')} ${isLiveShootout ? '🎯 Penalty Shootout' : esc(leg.status_detail || '')}</span>`
        : leg.state === 'post'
          ? `<span style="color:#94a3b8;font-size:11px;">${esc(leg.status_detail || 'Full Time')}</span>`
          : `<span style="color:#94a3b8;font-size:11px;">${esc(fmtDate(leg.date))}</span>`;
      const venueHtml = leg.venue ? `<div style="color:#94a3b8;font-size:11px;margin-top:4px;">📍 ${esc(leg.venue)}</div>` : '';
      return `
        <div style="margin-bottom:12px;">
          ${labelA ? `<div style="font-size:10px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">${esc(labelA)}</div>` : ''}
          <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:6px;">
            <span style="font-weight:${winner && winner === a.name ? '900' : '700'};font-size:15px;flex:1;text-align:right;color:${winner && winner === a.name ? '#10b981' : 'inherit'};">${winner && winner === a.name ? '🏆 ' : ''}${esc(a.name || 'TBD')}</span>
            <span style="font-size:22px;font-weight:900;font-variant-numeric:tabular-nums;letter-spacing:0.05em;background:rgba(255,255,255,0.07);padding:4px 14px;border-radius:8px;">${esc(String(sAstr))} – ${esc(String(sBstr))}</span>
            <span style="font-weight:${winner && winner === b.name ? '900' : '700'};font-size:15px;flex:1;text-align:left;color:${winner && winner === b.name ? '#10b981' : 'inherit'};">${winner && winner === b.name ? '🏆 ' : ''}${esc(b.name || 'TBD')}</span>
          </div>
          <div style="text-align:center;">${stateLabel}</div>
          ${venueHtml}
        </div>`;
    };

    const winnerHtml = winner
      ? `<div style="margin-top:14px;padding:10px 16px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:10px;text-align:center;">
           🏆 <strong>${esc(winner)}</strong> advances${decidedOnPenalties ? ' (on penalties)' : ''}
         </div>`
      : '';

    const penaltyBannerHtml = decidedOnPenalties && penaltyScore
      ? `<div style="margin-top:10px;padding:8px 14px;background:rgba(251,191,36,0.10);border:1px solid rgba(251,191,36,0.3);border-radius:8px;text-align:center;font-size:13px;font-weight:700;color:#fbbf24;">
           🎯 Penalty shootout: <strong>${esc(penaltyScore)}</strong>
         </div>`
      : (decidedOnPenalties
          ? `<div style="margin-top:10px;padding:8px 14px;background:rgba(251,191,36,0.10);border:1px solid rgba(251,191,36,0.3);border-radius:8px;text-align:center;font-size:13px;font-weight:700;color:#fbbf24;">🎯 Decided on penalties</div>`
          : '');

    const penaltyDetailsHtml = penaltyDetails.length > 0
      ? `<div style="margin-top:12px;background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.15);border-radius:10px;padding:12px 14px;">
           <div style="font-size:10px;font-weight:800;color:#fbbf24;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">🎯 Penalty Shootout</div>
           ${penaltyDetails.map(pk => `
             <div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;">
               <span style="font-size:15px;flex-shrink:0;">${pk.scored ? '✅' : '❌'}</span>
               <span style="color:var(--p-sub);font-size:11px;flex:0 0 90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(pk.team || '')}</span>
               <span style="flex:1;">${esc(pk.player || '?')}</span>
             </div>
           `).join('')}
         </div>`
      : '';

    const aggHtml = tie.aggregate
      ? `<div style="text-align:center;font-size:12px;color:#94a3b8;margin-top:6px;">Aggregate: <strong>${esc(tie.aggregate)}</strong></div>`
      : '';

    const roundLabel = (single && single.note) || (leg1 && leg1.note) || '';
    const dateDisplay = single ? fmtDate(single.date) : (leg1 ? fmtDate(leg1.date) : '');

    const inner = `
      <div style="background:var(--p-bg);color:var(--p-text);border-radius:20px;padding:24px;width:min(92vw,420px);position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5);max-height:85vh;overflow-y:auto;">
        <button onclick="document.getElementById('sl-bracket-popup').remove()" style="position:absolute;top:14px;right:14px;background:var(--p-panel);border:none;border-radius:50%;width:30px;height:30px;font-size:18px;cursor:pointer;color:var(--p-text);display:flex;align-items:center;justify-content:center;line-height:1;">×</button>
        ${roundLabel ? `<div style="font-size:11px;font-weight:800;color:#6366f1;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px;">${esc(roundLabel)}</div>` : ''}
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:18px;">
          ${a.logo ? `<img src="${esc(a.logo)}" style="width:40px;height:40px;object-fit:contain;" onerror="this.style.display='none'" />` : ''}
          <div style="text-align:center;">
            <div style="font-size:14px;font-weight:800;">${esc(a.name || 'TBD')} vs ${esc(b.name || 'TBD')}</div>
            ${dateDisplay ? `<div style="font-size:11px;color:var(--p-sub);margin-top:2px;">${esc(dateDisplay)}</div>` : ''}
          </div>
          ${b.logo ? `<img src="${esc(b.logo)}" style="width:40px;height:40px;object-fit:contain;" onerror="this.style.display='none'" />` : ''}
        </div>
        <div style="border-top:1px solid var(--p-border);padding-top:14px;">
          ${single ? legRow(single, '', '') : (legRow(leg1, '1st Leg', '') + legRow(leg2, '2nd Leg', ''))}
        </div>
        ${penaltyBannerHtml}
        ${penaltyDetailsHtml}
        ${aggHtml}
        ${winnerHtml}
      </div>`;

    const overlay = openModal('sl-bracket-popup', this._isLight(), () => closeModal('sl-bracket-popup'));
    overlay.innerHTML = inner;
  }

  _renderTie(tie) {
    const a = tie.team_a || {};
    const b = tie.team_b || {};
    const leg1 = tie.leg1;
    const leg2 = tie.leg2;
    const single = tie.single;
    const winner = tie.winner_team;
    const isAWinner = winner && a.name && winner === a.name;
    const isBWinner = winner && b.name && winner === b.name;
    const decidedOnPenalties = tie.decided_on_penalties || false;
    const penaltyScore = tie.penalty_score || null;

    const scoreFor = (leg, team) => {
      if (!leg || !team || !team.name) return null;
      if (leg.home_team === team.name) return leg.home_score;
      if (leg.away_team === team.name) return leg.away_score;
      return null;
    };

    const aL1 = scoreFor(leg1, a);
    const bL1 = scoreFor(leg1, b);
    const aL2 = scoreFor(leg2, a);
    const bL2 = scoreFor(leg2, b);
    const aSingle = scoreFor(single, a);
    const bSingle = scoreFor(single, b);

    const isLive = (leg1 && leg1.state === 'in') || (leg2 && leg2.state === 'in') || (single && single.state === 'in');
    const isInShootout = (leg1 && leg1.in_penalty_shootout) || (leg2 && leg2.in_penalty_shootout) || (single && single.in_penalty_shootout);
    const isPending = !leg1 && !single;

    // For penalty-decided ties, split the pen score per team
    let aPenScore = null, bPenScore = null;
    if (decidedOnPenalties && penaltyScore) {
      const parts = penaltyScore.split('-').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        if (isAWinner) { aPenScore = parts[0]; bPenScore = parts[1]; }
        else if (isBWinner) { bPenScore = parts[0]; aPenScore = parts[1]; }
      }
    }

    return html`
      <div class="tie ${isLive ? 'live' : ''} ${tie.completed ? 'done' : ''} clickable" @click=${() => this._showTieDetail(tie)}>
        <div class="tie-row ${isAWinner ? 'winner' : ''} ${isBWinner ? 'loser' : ''}">
          <img src="${teamLogo(a.logo)}" onerror="${LOGO_ONERROR}" alt="${a.name}" />
          <span class="tname">${a.name || 'TBD'}${isAWinner && decidedOnPenalties ? html`<span class="pen-crown"> ✓</span>` : ''}</span>
          <span class="legs">
            ${single ? html`
              <span class="leg">${this._formatScore(aSingle)}${aPenScore !== null ? html`<span class="pen-sub">(${aPenScore}P)</span>` : ''}</span>
            ` : html`
              <span class="leg">${this._formatScore(aL1)}</span>
              <span class="leg">${this._formatScore(aL2)}</span>
            `}
          </span>
        </div>
        <div class="tie-row ${isBWinner ? 'winner' : ''} ${isAWinner ? 'loser' : ''}">
          <img src="${teamLogo(b.logo)}" onerror="${LOGO_ONERROR}" alt="${b.name}" />
          <span class="tname">${b.name || 'TBD'}${isBWinner && decidedOnPenalties ? html`<span class="pen-crown"> ✓</span>` : ''}</span>
          <span class="legs">
            ${single ? html`
              <span class="leg">${this._formatScore(bSingle)}${bPenScore !== null ? html`<span class="pen-sub">(${bPenScore}P)</span>` : ''}</span>
            ` : html`
              <span class="leg">${this._formatScore(bL1)}</span>
              <span class="leg">${this._formatScore(bL2)}</span>
            `}
          </span>
        </div>
        <div class="tie-foot">
          ${isLive ? html`<span class="live-badge"><span class="dot"></span>${isInShootout ? '🎯 PEN' : 'LIVE'}</span>` : ''}
          ${decidedOnPenalties ? html`<span class="agg pen-badge">🎯 PEN${penaltyScore ? ` ${penaltyScore}` : ''}</span>` : ''}
          ${tie.aggregate ? html`<span class="agg">${this._t('bracket.agg')} ${tie.aggregate}</span>` : ''}
          ${tie.tied ? html`<span class="agg tied">${this._t('bracket.tied_agg')}</span>` : ''}
          ${!tie.completed && !isLive && tie.first_leg_date ? html`<span class="date">${this._formatDate(tie.first_leg_date)}</span>` : ''}
          ${isPending ? html`<span class="date pending">${this._t('bracket.tbd')}</span>` : ''}
        </div>
      </div>
    `;
  }

  _aggregateFor(tie, team) {
    if (!team || !team.name) return null;
    const scoreFor = (leg, t) => {
      if (!leg || !t || !t.name) return null;
      if (leg.home_team === t.name) return leg.home_score;
      if (leg.away_team === t.name) return leg.away_score;
      return null;
    };
    if (tie.single) return scoreFor(tie.single, team);
    let total = 0; let any = false;
    const v1 = scoreFor(tie.leg1, team);
    const v2 = scoreFor(tie.leg2, team);
    if (v1 !== null && v1 !== undefined) { total += v1; any = true; }
    if (v2 !== null && v2 !== undefined) { total += v2; any = true; }
    return any ? total : null;
  }

  _renderMiniTie(tie) {
    const a = tie.team_a || {};
    const b = tie.team_b || {};
    const aAgg = this._aggregateFor(tie, a);
    const bAgg = this._aggregateFor(tie, b);
    const winner = tie.winner_team;
    const isAW = winner && a.name && winner === a.name;
    const isBW = winner && b.name && winner === b.name;
    const isLive = (tie.leg1 && tie.leg1.state === 'in') || (tie.leg2 && tie.leg2.state === 'in') || (tie.single && tie.single.state === 'in');
    const isInShootout = (tie.leg1 && tie.leg1.in_penalty_shootout) || (tie.leg2 && tie.leg2.in_penalty_shootout) || (tie.single && tie.single.in_penalty_shootout);
    const isPending = !tie.leg1 && !tie.single;
    const decidedOnPenalties = tie.decided_on_penalties || false;
    const abbrA = a.abbrev || (a.name ? a.name.substring(0, 3).toUpperCase() : 'TBD');
    const abbrB = b.abbrev || (b.name ? b.name.substring(0, 3).toUpperCase() : 'TBD');

    return html`
      <div class="mini-tie ${isLive ? 'live' : ''} ${tie.completed ? 'done' : ''} ${isPending ? 'pending' : ''} ${decidedOnPenalties ? 'penalties' : ''}" @click=${isPending ? null : () => this._showTieDetail(tie)} style="${isPending ? '' : 'cursor:pointer'}">
        <div class="mini-team ${isAW ? 'winner' : ''} ${isBW ? 'loser' : ''}">
          ${a.logo ? html`<img src="${a.logo}" alt="${a.name}" />` : html`<div class="logo-ph"></div>`}
          <span class="abbr">${abbrA}</span>
          <span class="agg-num">${aAgg !== null ? aAgg : '-'}${isAW && decidedOnPenalties ? html`<span class="mini-pen-mark">P</span>` : ''}</span>
        </div>
        <div class="mini-team ${isBW ? 'winner' : ''} ${isAW ? 'loser' : ''}">
          ${b.logo ? html`<img src="${b.logo}" alt="${b.name}" />` : html`<div class="logo-ph"></div>`}
          <span class="abbr">${abbrB}</span>
          <span class="agg-num">${bAgg !== null ? bAgg : '-'}${isBW && decidedOnPenalties ? html`<span class="mini-pen-mark">P</span>` : ''}</span>
        </div>
        ${isLive ? html`<span class="mini-live"><span class="dot ${isInShootout ? 'shootout' : ''}"></span></span>` : ''}
      </div>
    `;
  }

  _renderTreeRound(ties, labelKey) {
    return html`
      <div class="tree-col">
        <div class="tree-col-label">
          <span class="tree-col-label-en">${this._t(labelKey)}</span>
        </div>
        <div class="tree-col-ties">
          ${ties.map(t => this._renderMiniTie(t))}
        </div>
      </div>
    `;
  }

  _renderArrows(outputCount, direction) {
    // Bracket connectors: per ogni tie del round successivo disegna una staffa che
    // collega due tie del round precedente. SVG con coordinate %.
    if (outputCount <= 0) return '';
    const inputCount = outputCount * 2;
    const parts = [];
    const isLeft = direction === 'left';
    const markerId = `arrow-${direction}`;

    for (let j = 0; j < outputCount; j++) {
      const yTop = ((2 * j + 0.5) / inputCount) * 100;
      const yBot = ((2 * j + 1.5) / inputCount) * 100;
      const yMid = ((j + 0.5) / outputCount) * 100;
      if (isLeft) {
        // 2 linee orizzontali (dai due tie sorgente verso destra)
        parts.push(svg`<line x1="0" y1="${yTop}%" x2="50%" y2="${yTop}%" stroke-linecap="round" />`);
        parts.push(svg`<line x1="0" y1="${yBot}%" x2="50%" y2="${yBot}%" stroke-linecap="round" />`);
        // verticale
        parts.push(svg`<line x1="50%" y1="${yTop}%" x2="50%" y2="${yBot}%" />`);
        // orizzontale finale verso destra (con marker freccia)
        parts.push(svg`<line x1="50%" y1="${yMid}%" x2="100%" y2="${yMid}%" marker-end="url(#${markerId})" />`);
      } else {
        parts.push(svg`<line x1="100%" y1="${yTop}%" x2="50%" y2="${yTop}%" stroke-linecap="round" />`);
        parts.push(svg`<line x1="100%" y1="${yBot}%" x2="50%" y2="${yBot}%" stroke-linecap="round" />`);
        parts.push(svg`<line x1="50%" y1="${yTop}%" x2="50%" y2="${yBot}%" />`);
        parts.push(svg`<line x1="50%" y1="${yMid}%" x2="0" y2="${yMid}%" marker-end="url(#${markerId})" />`);
      }
    }

    // Due marker fissi (no orient="auto" che si comporta male con marker-end su linee
    // che vanno verso sinistra). Path esplicito per ogni direzione.
    const marker = isLeft
      ? svg`<marker id="${markerId}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" markerUnits="strokeWidth" overflow="visible"><path d="M0,0 L10,5 L0,10 z" fill="var(--cl-accent)" /></marker>`
      : svg`<marker id="${markerId}" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" markerUnits="strokeWidth" overflow="visible"><path d="M10,0 L0,5 L10,10 z" fill="var(--cl-accent)" /></marker>`;

    return html`
      <div class="tree-arrows ${direction}">
        <svg class="connector-svg ${direction}" preserveAspectRatio="none">
          <defs>${marker}</defs>
          ${parts}
        </svg>
      </div>
    `;
  }

  _renderTree(rounds) {
    const findRound = (targetSize) => {
      const candidates = rounds.filter(r => r.size === targetSize);
      if (candidates.length === 0) return null;
      const exact = candidates.find(r => r.name !== 'Knockout Playoffs' && r.name !== 'Preliminary Round');
      return exact || candidates[candidates.length - 1];
    };
    const playoffsRound = rounds.find(r => r.name === 'Knockout Playoffs');
    const r32 = findRound(16);
    const r16 = findRound(8);
    const qf = findRound(4);
    const sf = findRound(2);
    const finalRound = findRound(1);

    const split = (round) => {
      if (!round) return { left: [], right: [] };
      const ties = round.ties || [];
      const mid = Math.ceil(ties.length / 2);
      return { left: ties.slice(0, mid), right: ties.slice(mid) };
    };
    const r32Split = split(r32);
    const r16Split = split(r16);
    const qfSplit = split(qf);
    const sfSplit = split(sf);
    const playoffsSplit = this.treeShowPlayoffs ? split(playoffsRound) : null;
    const finalTie = finalRound ? finalRound.ties[0] : null;

    return html`
      <div class="tree-wrap">
        <div class="tree">
          <div class="tree-half left">
            ${r32Split.left.length ? html`
              ${this._renderTreeRound(r32Split.left, 'round.r32')}
              ${r16Split.left.length ? this._renderArrows(r16Split.left.length, 'left') : ''}
            ` : ''}
            ${playoffsSplit && playoffsSplit.left.length ? html`
              ${this._renderTreeRound(playoffsSplit.left, 'round.knockout_playoffs')}
              ${r16Split.left.length ? this._renderArrows(r16Split.left.length, 'left') : ''}
            ` : ''}
            ${r16Split.left.length ? this._renderTreeRound(r16Split.left, 'round.r16') : ''}
            ${r16Split.left.length && qfSplit.left.length ? this._renderArrows(qfSplit.left.length, 'left') : ''}
            ${qfSplit.left.length ? this._renderTreeRound(qfSplit.left, 'round.quarterfinals') : ''}
            ${qfSplit.left.length && sfSplit.left.length ? this._renderArrows(sfSplit.left.length, 'left') : ''}
            ${sfSplit.left.length ? this._renderTreeRound(sfSplit.left, 'round.semifinals') : ''}
            ${sfSplit.left.length ? this._renderArrows(1, 'left') : ''}
          </div>

          <div class="tree-center">
            <div class="trophy">🏆</div>
            <div class="trophy-label">${this._t('round.final')}</div>
            ${finalTie
              ? html`<div class="final-tie-wrap">${this._renderMiniTie(finalTie)}</div>`
              : html`<div class="final-placeholder">${this._t('bracket.tbd')}</div>`
            }
          </div>

          <div class="tree-half right">
            ${sfSplit.right.length ? this._renderArrows(1, 'right') : ''}
            ${sfSplit.right.length ? this._renderTreeRound(sfSplit.right, 'round.semifinals') : ''}
            ${sfSplit.right.length && qfSplit.right.length ? this._renderArrows(sfSplit.right.length, 'right') : ''}
            ${qfSplit.right.length ? this._renderTreeRound(qfSplit.right, 'round.quarterfinals') : ''}
            ${qfSplit.right.length && r16Split.right.length ? this._renderArrows(qfSplit.right.length, 'right') : ''}
            ${r16Split.right.length ? this._renderTreeRound(r16Split.right, 'round.r16') : ''}
            ${playoffsSplit && playoffsSplit.right.length ? html`
              ${r16Split.right.length ? this._renderArrows(r16Split.right.length, 'right') : ''}
              ${this._renderTreeRound(playoffsSplit.right, 'round.knockout_playoffs')}
            ` : ''}
            ${r32Split.right.length ? html`
              ${r16Split.right.length ? this._renderArrows(r16Split.right.length, 'right') : ''}
              ${this._renderTreeRound(r32Split.right, 'round.r32')}
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return html`<ha-card class="empty">Entità sconosciuta: ${this._config.entity}</ha-card>`;

    const rounds = stateObj.attributes.rounds || [];
    if (rounds.length === 0) {
      return html`
        <ha-card class="empty">
          <div class="hero-bg"></div>
          <div class="empty-state">
            <div class="empty-icon">🏆</div>
            <div class="empty-title">${this._t('bracket.empty.title')}</div>
            <div class="empty-sub">${this._t('bracket.empty.sub')}</div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card class="${this.compactMode ? 'compact' : ''} style-${this._cardStyle}">
        <div class="hero-bg"></div>
        ${!this.hideHeader ? html`
          <div class="bracket-header">
            <div class="header-icon">🏆</div>
            <div class="header-text">
              <div class="title">${this._t('card.bracket')}</div>
              <div class="subtitle">${stateObj.state}</div>
            </div>
          </div>
        ` : ''}

        ${this._cardStyle === 'tree' ? this._renderTree(rounds) : html`
          <div class="rounds-container">
            ${rounds.map(round => html`
              <div class="round">
                <div class="round-name">
                  <span class="round-name-en">${this._localizeRoundName(round)}</span>
                </div>
                <div class="round-ties">
                  ${round.ties.map(tie => this._renderTie(tie))}
                </div>
              </div>
            `)}
          </div>
        `}
      </ha-card>
    `;
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
      .empty-state {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 24px;
      }
      .empty-icon { font-size: 38px; opacity: 0.4; }
      .empty-title { font-weight: 800; color: var(--cl-text); }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .hero-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(251,191,36,0.10), transparent 50%);
        pointer-events: none;
      }

      .bracket-header {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .header-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        box-shadow: 0 4px 16px rgba(251,191,36,0.4);
      }
      .header-text .title {
        font-size: 18px; font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--cl-text);
      }
      .header-text .title-it {
        font-size: 13px;
        font-weight: 600;
        color: var(--cl-text-2);
        margin-left: 4px;
        opacity: 0.85;
      }
      .header-text .subtitle {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 600;
      }

      .rounds-container {
        position: relative; z-index: 1;
        display: flex;
        gap: 16px;
        padding: 18px;
        overflow-x: auto;
      }
      .round {
        flex: 1 0 240px;
        min-width: 240px;
        display: flex; flex-direction: column;
        gap: 8px;
        justify-content: space-around;
      }
      .round-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        text-align: center;
        padding: 6px 12px;
        border-radius: 12px;
        background: rgba(99,102,241,0.12);
        align-self: center;
        margin-bottom: 4px;
      }
      .round-name-en {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--cl-accent);
        line-height: 1;
      }
      .round-name-it {
        font-size: 9px;
        font-weight: 600;
        color: var(--cl-text-2);
        opacity: 0.85;
        line-height: 1;
      }
      .round-ties {
        display: flex; flex-direction: column;
        gap: 12px;
        justify-content: space-around;
        flex: 1;
      }

      .tie {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 12px;
        padding: 10px 12px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }
      .tie.clickable {
        cursor: pointer;
      }
      .tie:hover {
        border-color: var(--cl-accent);
        transform: translateY(-2px);
      }
      .tie.live {
        border-color: var(--cl-live);
        box-shadow: 0 0 0 1px var(--cl-live), 0 0 20px var(--cl-live-glow);
        animation: tie-pulse 2s ease-in-out infinite;
      }
      @keyframes tie-pulse {
        0%, 100% { box-shadow: 0 0 0 1px var(--cl-live), 0 0 20px var(--cl-live-glow); }
        50% { box-shadow: 0 0 0 2px var(--cl-live), 0 0 30px var(--cl-live-glow); }
      }
      .tie.done {
        border-color: rgba(16,185,129,0.3);
      }

      .tie-row {
        display: grid;
        grid-template-columns: 22px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
      }
      .tie-row + .tie-row {
        border-top: 1px solid var(--cl-divider);
      }
      .tie-row img {
        width: 22px; height: 22px;
        object-fit: contain;
      }
      .tie-row .tname {
        font-size: 13px;
        font-weight: 600;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: -0.01em;
      }
      .tie-row.winner .tname { font-weight: 800; }
      .tie-row.loser .tname { color: var(--cl-text-2); }
      .tie-row.loser img { opacity: 0.55; }

      .legs {
        display: inline-flex;
        gap: 4px;
      }
      .leg {
        min-width: 22px;
        text-align: center;
        font-size: 13px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.06);
        color: var(--cl-text);
      }
      .tie-row.winner .leg {
        background: rgba(16,185,129,0.2);
        color: var(--cl-green);
      }
      .tie-row.loser .leg {
        opacity: 0.5;
      }

      .tie-foot {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dashed var(--cl-divider);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .agg {
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--cl-green);
        padding: 2px 8px;
        background: rgba(16,185,129,0.12);
        border-radius: 6px;
      }
      .agg.tied {
        color: var(--cl-gold);
        background: rgba(251,191,36,0.12);
      }
      .agg.pen-badge {
        color: var(--cl-gold);
        background: rgba(251,191,36,0.12);
      }
      .pen-crown {
        font-size: 10px;
        color: var(--cl-green);
        font-weight: 900;
        margin-left: 2px;
      }
      .pen-sub {
        font-size: 9px;
        font-weight: 700;
        color: var(--cl-gold);
        margin-left: 1px;
        opacity: 0.9;
      }
      .date {
        font-size: 10px;
        font-weight: 700;
        color: var(--cl-text-2);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .date.pending {
        color: var(--cl-accent);
      }
      .live-badge {
        display: inline-flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .live-badge .dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: white;
        animation: dot-pulse 1.2s ease-in-out infinite;
      }
      @keyframes dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.7); }
      }

      /* Compact mode (vertical, single column per round) */
      ha-card.compact .rounds-container {
        flex-direction: column;
        overflow-x: visible;
      }
      ha-card.compact .round {
        flex: none;
        min-width: 0;
      }

      @media (max-width: 600px) {
        ha-card.style-list .rounds-container {
          flex-direction: column;
        }
        ha-card.style-list .round {
          flex: none;
          min-width: 0;
        }
      }

      /* ============== STYLE: TREE ============== */
      .tree-wrap {
        position: relative;
        z-index: 1;
        overflow-x: auto;
        padding: 24px 12px 24px;
      }
      .tree {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-height: 480px;
        gap: 0;
      }
      .tree-half {
        flex: 1;
        display: flex;
        align-items: stretch;
        min-width: 0;
      }
      /* Niente row-reverse: per la "specularità" del lato destro renderizziamo
         direttamente i figli nell'ordine SF→QF→R16 (vedi _renderTree). */

      .tree-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 6px;
        min-width: 110px;
        max-width: 140px;
      }
      .tree-col-label {
        text-align: center;
        padding: 4px 8px;
        background: rgba(99,102,241,0.12);
        border-radius: 8px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }
      .tree-col-label-en {
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--cl-accent);
        line-height: 1;
      }
      .tree-col-label-it {
        font-size: 8px;
        font-weight: 600;
        color: var(--cl-text-2);
        line-height: 1;
        opacity: 0.85;
      }
      .tree-col-ties {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 6px;
        position: relative;
      }

      /* SVG bracket arrow connectors — colonne più larghe e con frecce sempre visibili */
      .tree-arrows {
        flex: 0 0 36px;
        min-width: 36px;
        display: flex;
        align-items: stretch;
        padding-top: 44px; /* compensa la label dei round */
        padding-bottom: 0;
      }
      .connector-svg {
        width: 100%;
        height: 100%;
        stroke: var(--cl-accent);
        stroke-width: 2;
        fill: none;
        overflow: visible;
        display: block;
      }
      .connector-svg .arrow-head {
        fill: var(--cl-accent);
        stroke: none;
      }

      /* Mini tie card */
      .mini-tie {
        background: var(--cl-bg);
        border: 1.5px solid var(--cl-accent);
        border-radius: 10px;
        padding: 7px 9px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        box-shadow: 0 2px 8px rgba(99,102,241,0.15);
      }
      .mini-tie:hover {
        border-color: var(--cl-accent);
        transform: scale(1.04);
        z-index: 5;
      }
      .mini-tie.live {
        border-color: var(--cl-live);
        box-shadow: 0 0 0 1px var(--cl-live), 0 0 16px var(--cl-live-glow);
        animation: tie-pulse 2s ease-in-out infinite;
      }
      .mini-tie.done {
        border-color: rgba(16,185,129,0.3);
      }
      .mini-tie.pending {
        opacity: 0.55;
        background: transparent;
        border-style: dashed;
      }
      .mini-team {
        display: grid;
        grid-template-columns: 18px 1fr auto;
        align-items: center;
        gap: 6px;
        padding: 2px 0;
      }
      .mini-team img {
        width: 18px; height: 18px;
        object-fit: contain;
      }
      .mini-team .logo-ph {
        width: 18px; height: 18px;
        border-radius: 50%;
        background: var(--cl-card-2);
      }
      .mini-team .abbr {
        font-size: 11px;
        font-weight: 700;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: -0.01em;
      }
      .mini-team .agg-num {
        font-size: 12px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        min-width: 14px;
        text-align: right;
        color: var(--cl-text-2);
      }
      .mini-team.winner .abbr {
        font-weight: 800;
      }
      .mini-team.winner .agg-num {
        color: var(--cl-green);
      }
      .mini-team.loser .abbr {
        color: var(--cl-text-2);
      }
      .mini-team.loser img {
        opacity: 0.5;
      }
      .mini-team.loser .agg-num {
        opacity: 0.55;
      }
      .mini-live {
        position: absolute;
        top: -3px; right: -3px;
        width: 10px; height: 10px;
      }
      .mini-live .dot {
        display: block;
        width: 10px; height: 10px;
        border-radius: 50%;
        background: var(--cl-live);
        box-shadow: 0 0 8px var(--cl-live-glow);
        animation: dot-pulse 1.2s ease-in-out infinite;
      }
      .mini-live .dot.shootout {
        background: var(--cl-gold);
        box-shadow: 0 0 8px rgba(251,191,36,0.5);
      }
      .mini-pen-mark {
        font-size: 8px;
        font-weight: 900;
        color: var(--cl-gold);
        margin-left: 1px;
        vertical-align: super;
      }

      /* Tree center (trophy + final) */
      .tree-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 16px;
        gap: 14px;
        min-width: 200px;
        flex: 0 0 200px;
        position: relative;
      }
      .tree-center::before {
        content: '';
        position: absolute;
        inset: 20% 8%;
        background:
          radial-gradient(circle at center, rgba(251,191,36,0.20), transparent 65%);
        pointer-events: none;
        border-radius: 50%;
      }
      .trophy {
        position: relative;
        font-size: 64px;
        line-height: 1;
        filter: drop-shadow(0 4px 24px rgba(251,191,36,0.7));
        animation: trophy-shine 4s ease-in-out infinite;
        z-index: 2;
      }
      @keyframes trophy-shine {
        0%, 100% { filter: drop-shadow(0 4px 24px rgba(251,191,36,0.7)); transform: scale(1); }
        50% { filter: drop-shadow(0 4px 36px rgba(251,191,36,1)) drop-shadow(0 0 12px #fbbf24); transform: scale(1.04); }
      }
      .trophy-label {
        position: relative;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        z-index: 2;
      }
      .trophy-label-it {
        font-weight: 600;
        opacity: 0.85;
      }
      .final-tie-wrap {
        position: relative;
        width: 100%;
        max-width: 170px;
        z-index: 2;
      }
      .final-tie-wrap .mini-tie {
        background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.02));
        border-color: rgba(251,191,36,0.4);
        box-shadow: 0 4px 16px rgba(251,191,36,0.2);
      }
      .final-tie-wrap .mini-team.winner .agg-num {
        color: var(--cl-gold);
      }
      .final-placeholder {
        position: relative;
        font-size: 11px;
        font-weight: 800;
        color: var(--cl-text-2);
        padding: 8px 14px;
        background: var(--cl-card-2);
        border: 1px dashed var(--cl-glass-border);
        border-radius: 8px;
        letter-spacing: 0.1em;
      }

      /* Mobile per tree */
      @media (max-width: 720px) {
        ha-card.style-tree .tree-col {
          min-width: 100px;
        }
        ha-card.style-tree .tree-center {
          min-width: 140px;
        }
        ha-card.style-tree .trophy {
          font-size: 56px;
        }
      }
      @media (max-width: 520px) {
        ha-card.style-tree .tree {
          flex-direction: column;
          min-height: 0;
        }
        ha-card.style-tree .tree-half {
          flex-direction: row;
        }
        ha-card.style-tree .tree-half.right {
          flex-direction: row;
        }
        ha-card.style-tree .tree-center {
          order: -1;
          padding: 12px;
        }
      }
    `];
  }
}

customElements.define("sports-live-bracket", SportsLiveBracketCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sports-live-bracket',
  name: 'Sports Live Bracket',
  description: 'Knockout bracket for cup competitions.',
});
