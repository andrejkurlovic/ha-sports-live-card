import { LitElement, html, css } from "lit";

class SportsLiveGameEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      entities: { type: Array },
    };
  }

  constructor() {
    super();
    this.entities = [];
  }

  static get styles() {
    return css`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      h3 {
        margin: 8px 0 0; font-size: 13px; text-transform: uppercase;
        letter-spacing: 0.05em; color: var(--secondary-text-color);
      }
      .field-label {
        display: block; font-size: 12px; font-weight: 600;
        color: var(--secondary-text-color); margin-bottom: 4px;
      }
      select {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000); box-sizing: border-box;
      }
      select:focus { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: -1px; }
    `;
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...config };
  }

  get config() { return this._config; }

  updated(changedProperties) {
    if (changedProperties.has("hass")) this._fetchEntities();
  }

  _fetchEntities() {
    if (!this.hass) return;
    this.entities = Object.keys(this.hass.states)
      .filter(id => {
        if (!id.startsWith("sensor.")) return false;
        const attrs = this.hass.states[id]?.attributes;
        return attrs?.sport !== undefined && Array.isArray(attrs?.matches);
      })
      .sort();
  }

  _fire(newConfig) {
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: newConfig }, bubbles: true, composed: true,
    }));
    this.requestUpdate();
  }

  _entityChanged(ev) {
    const v = ev.target.value;
    if (v !== this._config.entity) this._fire({ ...this._config, entity: v });
  }

  _selectChanged(ev) {
    const key = ev.target.dataset.configValue;
    const v = ev.target.value;
    if (key && v !== String(this._config[key] ?? "")) this._fire({ ...this._config, [key]: v });
  }

  _switchChanged(ev) {
    const target = ev.target;
    if (!target.dataset?.configValue) return;
    const key = target.dataset.configValue;
    const value = target.checked;
    if (this._config[key] === value) return;
    this._fire({ ...this._config, [key]: value });
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const cur = this._config.entity || "";
    const inList = cur && this.entities.includes(cur);
    return html`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (next_match or team sensor)</label>
          <select @change=${this._entityChanged}>
            ${!inList ? html`<option value="${cur}" selected>${cur || "— select —"}</option>` : ""}
            ${this.entities.map(e => html`<option value="${e}" ?selected=${e === cur}>${e}</option>`)}
          </select>
        </div>

        <h3>Display</h3>

        <div class="option">
          <label>Show Stats Popup (on card tap)</label>
          <ha-switch
            .checked=${this._config.show_popup !== false}
            data-config-value="show_popup"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Stadium / Venue</label>
          <ha-switch
            .checked=${this._config.show_stadium !== false}
            data-config-value="show_stadium"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Kickoff Countdown</label>
          <ha-switch
            .checked=${this._config.show_countdown !== false}
            data-config-value="show_countdown"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Odds (pre-match)</label>
          <ha-switch
            .checked=${this._config.show_odds === true}
            data-config-value="show_odds"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">Score Size</label>
          <select data-config-value="score_size" @change=${this._selectChanged}>
            <option value="normal" ?selected=${(this._config.score_size || "normal") === "normal"}>Normal</option>
            <option value="big" ?selected=${this._config.score_size === "big"}>Big</option>
            <option value="huge" ?selected=${this._config.score_size === "huge"}>Huge</option>
          </select>
        </div>

        <h3>Settings</h3>

        <div>
          <label class="field-label">TV Broadcast Region</label>
          <select data-config-value="broadcast_region" @change=${this._selectChanged}>
            <option value="uk" ?selected=${(this._config.broadcast_region || "uk") === "uk"}>UK (default)</option>
            <option value="us" ?selected=${this._config.broadcast_region === "us"}>US</option>
            <option value="both" ?selected=${this._config.broadcast_region === "both"}>Both</option>
          </select>
        </div>

        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${(this._config.skin || "dark") === "dark"}>Dark</option>
            <option value="light" ?selected=${this._config.skin === "light"}>Light</option>
          </select>
        </div>

        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${this._config.language === "en"}>English</option>
            <option value="it" ?selected=${this._config.language === "it"}>Italiano</option>
            <option value="fr" ?selected=${this._config.language === "fr"}>Français</option>
            <option value="es" ?selected=${this._config.language === "es"}>Español</option>
            <option value="nl" ?selected=${this._config.language === "nl"}>Nederlands</option>
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define("sports-live-game-editor", SportsLiveGameEditor);
