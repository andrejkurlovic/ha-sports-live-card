/**
 * Self-maintaining visibility for every Sports Live card.
 *
 * The backend sensors expose `season_status` (live | recent | active | idle),
 * `days_until_next_match` and `idle_hide_days` (default 180, set in the integration
 * options). A card whose competition is idle — no live/recent match and the next one
 * further away than the threshold, e.g. the World Cup just ended — hides itself and
 * comes back on its own when the next season/tournament approaches.
 *
 * Per-card options (both optional, defaults need no configuration):
 *   hide_when_idle: true   set false to always show the card
 *   idle_days:      180    override the integration's threshold for this card only
 *
 * In dashboard edit mode / the card picker the card is never hidden: it shows a short
 * "hidden because idle" notice instead, so it can still be found and edited.
 */
import { html } from 'lit';

const CARD_TAGS = [
  'sports-live-classifica', 'sports-live-matches', 'sports-live-team', 'sports-live-news',
  'sports-live-lineup', 'sports-live-timeline', 'sports-live-bracket', 'sports-live-game',
];

// Standings/news/bracket sensors carry no fixtures; read the sibling `_matches` sensor.
const SIBLING = /_(standings|news|bracket)$/;

function isEditing(el) {
  let n = el;
  while (n) {
    const tag = (n.tagName || '').toUpperCase();
    if (tag === 'HUI-CARD-OPTIONS' || tag === 'HUI-CARD-PREVIEW' || tag.startsWith('HUI-DIALOG')) return true;
    n = n.parentNode || n.host || null;
  }
  return false;
}

function statusAttrs(hass, entityId) {
  const states = hass && hass.states;
  if (!states || !entityId) return null;
  const own = states[entityId];
  if (own && own.attributes && own.attributes.season_status !== undefined) return own.attributes;
  const sib = states[entityId.replace(SIBLING, '_matches')];
  return sib && sib.attributes && sib.attributes.season_status !== undefined ? sib.attributes : null;
}

/** Returns {days} when the card should be hidden, otherwise null. Exported for tests. */
export function idleInfo(hass, config) {
  if (!config || config.hide_when_idle === false) return null;
  const a = statusAttrs(hass, config.entity);
  if (!a) return null; // old backend / non-fixture entity → always show
  if (a.season_status === 'live' || a.season_status === 'recent') return null;
  const limit = Number(config.idle_days ?? a.idle_hide_days ?? 180);
  const d = a.days_until_next_match;
  return d == null || d > limit ? { days: d } : null;
}

function notice(info) {
  const when = info.days == null ? 'no fixtures scheduled' : `next match in ${Math.round(info.days)} days`;
  return html`<ha-card style="padding:12px 16px;opacity:.6;font-size:13px">
    💤 Hidden on the dashboard while idle (${when}). Set <code>hide_when_idle: false</code> to always show.
  </ha-card>`;
}

function patchCard(C) {
  const render = C.prototype.render;
  C.prototype.render = function () {
    const info = idleInfo(this.hass, this._config);
    if (!info) return render.call(this);
    return isEditing(this) ? notice(info) : html``;
  };
  const updated = C.prototype.updated;
  C.prototype.updated = function (changed) {
    if (updated) updated.call(this, changed);
    const hide = !!idleInfo(this.hass, this._config) && !isEditing(this);
    if (this.__idleHidden !== hide) {
      this.__idleHidden = hide;
      this.hidden = hide;
      this.style.display = hide ? 'none' : '';
      // HA dashboards drop hidden cards from the layout (no empty gap) on this event.
      this.dispatchEvent(new CustomEvent('card-visibility-changed', {
        detail: { value: !hide }, bubbles: true, composed: true,
      }));
    }
  };
}

function patchEditor(E) {
  const render = E.prototype.render;
  const set = (ed, patch) => {
    const config = { ...(ed._config || {}), ...patch };
    Object.keys(patch).forEach((k) => patch[k] === undefined && delete config[k]);
    ed._config = config;
    ed.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    ed.requestUpdate();
  };
  E.prototype.render = function () {
    const cfg = this._config || {};
    return html`${render.call(this)}
      <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <label>Hide card when competition is idle</label>
          <ha-switch .checked=${cfg.hide_when_idle !== false}
            @change=${(e) => set(this, { hide_when_idle: e.target.checked ? undefined : false })}></ha-switch>
        </div>
        ${cfg.hide_when_idle === false ? '' : html`
          <div>
            <span style="display:block;font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:4px">
              Idle after (days until next match) — blank = integration default (180)</span>
            <input type="number" min="1" placeholder="auto" .value=${cfg.idle_days ?? ''}
              style="width:100%;padding:10px 12px;border-radius:8px;box-sizing:border-box;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)"
              @change=${(e) => set(this, { idle_days: e.target.value === '' ? undefined : Number(e.target.value) })}>
          </div>`}
      </div>`;
  };
}

export function installIdleVisibility() {
  for (const tag of CARD_TAGS) {
    const C = customElements.get(tag);
    if (C && !C.prototype.__idlePatched) { patchCard(C); C.prototype.__idlePatched = true; }
    const E = customElements.get(`${tag}-editor`);
    if (E && !E.prototype.__idlePatched) { patchEditor(E); E.prototype.__idlePatched = true; }
  }
}
