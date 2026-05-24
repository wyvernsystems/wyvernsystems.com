import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { injectProductionSecurityIntoHtml } from "./src/security/production-html.js";

/** Injected only in production builds so `npm run dev` stays unrestricted. */
function productionSecurityMeta() {
  return {
    name: "production-security-meta",
    transformIndexHtml(html, ctx) {
      if (ctx.server) return html;
      return injectProductionSecurityIntoHtml(html);
    },
  };
}

export default defineConfig({
  plugins: [react(), productionSecurityMeta()],
  base: "/",
  build: {
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});
