export interface RobotsOptions {
  /** The paths every robot may crawl. @default ["/"] */
  allow?: string[];
  /** The paths no robot may crawl. */
  disallow?: string[];
  /** The absolute URL, or URLs, of the sitemaps, listed after the rules. */
  sitemap?: string | string[];
}

/** The robots.txt of the site: one rule group for every robot (`User-agent: *`), then the sitemap lines. */
export function robotsTxt({ allow = ["/"], disallow = [], sitemap = [] }: RobotsOptions = {}): string {
  const sitemaps = Array.isArray(sitemap) ? sitemap : [sitemap];
  const lines = [
    "User-agent: *",
    ...allow.map((path) => `Allow: ${path}`),
    ...disallow.map((path) => `Disallow: ${path}`),
  ];
  if (sitemaps.length > 0) lines.push("", ...sitemaps.map((url) => `Sitemap: ${url}`));
  return `${lines.join("\n")}\n`;
}
