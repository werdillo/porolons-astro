/** The absolute URL of a path on the site. `site` is the `site` of astro.config (Astro.site). */
export function absoluteUrl(path: string, site: URL): string {
  return new URL(path, site).href;
}

/** The JSON of a `<script type="application/ld+json">`. `<` is escaped, so no value can close the tag. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
