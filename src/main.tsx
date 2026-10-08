import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Pages are prerendered to static HTML at build time (scripts/prerender.mjs).
// Hydrate that existing HTML instead of wiping it and re-rendering from scratch —
// re-rendering repaints the hero <h1> (the LCP element) only after the JS bundle
// has downloaded and executed, which was pushing LCP to 10s+ on mobile.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
