import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Injected only in production builds so `npm run dev` stays unrestricted. */
function productionSecurityMeta() {
  return {
    name: "production-security-meta",
    transformIndexHtml(html, ctx) {
      if (ctx.server) return html;
      const csp = [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "script-src 'self'",
        "style-src 'self' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data:",
        "connect-src 'self'",
        "upgrade-insecure-requests",
      ].join("; ");
      return html.replace(
        "<head>",
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), productionSecurityMeta()],
  base: "/",
});
