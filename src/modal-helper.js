// Shared body-level modal helper for Sports Live cards.
//
// All three popup cards (Team, Matches, Standings) append their overlay to
// document.body rather than rendering inside the Lit shadow DOM. This is the
// correct pattern: a shadow-DOM card cannot produce a true full-viewport
// overlay in all HA panel layouts (sidebar, masonry, sections). Any alternative
// that renders the popup inside the shadow root would be clipped by the card
// boundaries or z-index stacking.
//
// This module centralises the duplicated overlay-creation + skin + keyboard
// logic that was previously copied across three files.

/**
 * Escape a value for safe insertion via innerHTML.
 * Covers the five characters that can create XSS via raw string interpolation.
 */
export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

/**
 * Apply skin-aware CSS custom properties to a modal overlay element.
 * These are referenced as var(--p-*) throughout the popup's innerHTML.
 */
export function applyModalSkin(el, isLight) {
  el.style.setProperty('--p-bg',     isLight ? '#ffffff'               : '#1a1f2e');
  el.style.setProperty('--p-panel',  isLight ? 'rgba(15,23,42,0.05)'   : 'rgba(255,255,255,0.04)');
  el.style.setProperty('--p-text',   isLight ? '#14182a'               : '#f8fafc');
  el.style.setProperty('--p-sub',    isLight ? '#5b6577'               : '#94a3b8');
  el.style.setProperty('--p-border', isLight ? 'rgba(15,23,42,0.10)'   : 'rgba(255,255,255,0.08)');
  el.style.setProperty('--p-muted',  isLight ? '#cbd5e1'               : '#cbd5e1');
}

/**
 * Open (or reuse) a body-level modal overlay.
 *
 * Binds:
 *  - click on the backdrop (not the dialog content) → onClose()
 *  - keydown Escape anywhere on the document → onClose()
 *
 * Returns the overlay element so the caller can set its innerHTML.
 * Handlers are cleaned up when closeModal() is called.
 *
 * @param {string} id       — unique DOM id for the overlay div
 * @param {boolean} isLight — true when the card skin is "light"
 * @param {Function} onClose — called when the user dismisses the modal
 * @returns {HTMLElement} overlay
 */
export function openModal(id, isLight, onClose) {
  let overlay = document.getElementById(id);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = id;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText =
      'position:fixed;inset:0;display:flex;justify-content:center;align-items:center;' +
      'z-index:999999;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);overflow:auto;';
    document.body.appendChild(overlay);
  }

  // Remove any stale handlers from a previous open() before re-binding.
  if (overlay._spClickHandler) overlay.removeEventListener('click', overlay._spClickHandler);
  if (overlay._spKeyHandler)   document.removeEventListener('keydown', overlay._spKeyHandler);

  overlay._spClickHandler = (e) => { if (e.target === overlay) onClose(); };
  overlay._spKeyHandler   = (e) => { if (e.key === 'Escape') onClose(); };

  overlay.addEventListener('click', overlay._spClickHandler);
  document.addEventListener('keydown', overlay._spKeyHandler);

  applyModalSkin(overlay, isLight);
  return overlay;
}

/**
 * Close and remove a modal overlay, cleaning up all attached handlers.
 * Safe to call when the overlay does not exist.
 *
 * @param {string} id — DOM id passed to openModal
 */
export function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  if (overlay._spKeyHandler)   document.removeEventListener('keydown', overlay._spKeyHandler);
  if (overlay._spClickHandler) overlay.removeEventListener('click', overlay._spClickHandler);
  overlay.remove();
}
