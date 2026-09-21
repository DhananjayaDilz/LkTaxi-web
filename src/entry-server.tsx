import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppContent } from "./App";
export { getPageSEO, publicPaths } from "./lib/page-seo";
export function render(path: string) {
  return renderToString(<StaticRouter location={path}><AppContent /></StaticRouter>);
}
