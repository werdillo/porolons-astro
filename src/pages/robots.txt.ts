import type { APIRoute } from "astro";

/** robots.txt: every page may be crawled, and the sitemap index is listed. */
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Set `site` in astro.config.mjs.");
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
