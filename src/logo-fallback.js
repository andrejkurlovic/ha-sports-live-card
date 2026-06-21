// ESPN omits a crest for some teams (e.g. lower-tier amateur/club sides),
// returning an empty logo URL — and any crest URL can also 404. Both cases
// should fall back to a generic shield silhouette instead of broken/empty
// image space.

const SHIELD_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<path d="M16 8 H48 V32 C48 46 40 54 32 58 C24 54 16 46 16 32 Z" ' +
  'fill="#9aa3af" stroke="#6b7280" stroke-width="2"/></svg>';

export const LOGO_FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(SHIELD_SVG);

/** Resolve a team logo URL, substituting the fallback shield when empty. */
export function teamLogo(url) {
  return url && String(url).trim() ? url : LOGO_FALLBACK;
}

/**
 * Inline `onerror` attribute value: swaps a broken/404 crest URL for the
 * fallback shield at render time, in both lit-html and raw-HTML templates.
 */
export const LOGO_ONERROR = `this.onerror=null;this.src='${LOGO_FALLBACK}'`;
