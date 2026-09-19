import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";

/** Build-time render used by scripts/prerender.mjs; the browser still mounts via main.jsx. */
export function render() {
  return renderToStaticMarkup(<App />);
}
