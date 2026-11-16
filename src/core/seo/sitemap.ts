// Loaded by astro.config.mjs through its relative path, where the `#/` alias does not resolve:
// this file imports nothing.

/**
 * The `i18n` option of @astrojs/sitemap: the default locale (the one whose pages have no prefix)
 * and the code of every locale, the same codes as the hreflang links of the pages.
 */
export function sitemapI18n({
  defaultLocale,
  locales,
}: {
  defaultLocale: string;
  locales: Record<string, string>;
}): { defaultLocale: string; locales: Record<string, string> } {
  if (!(defaultLocale in locales)) {
    throw new Error(`The default locale "${defaultLocale}" has no code in the locale map.`);
  }
  return { defaultLocale, locales };
}
