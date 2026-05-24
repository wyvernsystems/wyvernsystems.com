/** Production CSP: same-origin assets only (fonts bundled via @fontsource). */
export function buildContentSecurityPolicy() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self'",
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data:",
    "connect-src 'self'",
    "media-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Replaces `<!-- vite:csp -->` with production security meta tags. */
export function injectProductionSecurityIntoHtml(html) {
  const csp = buildContentSecurityPolicy();
  const tags = [
    `<meta http-equiv="Content-Security-Policy" content="${csp}" />`,
    '<meta http-equiv="X-Frame-Options" content="DENY" />',
  ].join("\n    ");
  return html.replace("<!-- vite:csp -->", tags);
}
