/** The absolute URL of a path on the site. `site` is the `site` of astro.config (Astro.site). */
export function absoluteUrl(path: string, site: URL): string {
  return new URL(path, site).href;
}

/** One `<link rel="alternate">`: the code of a language (or `x-default`) and the address of its version of the page. */
export interface AlternateLink {
  hreflang: string;
  href: string;
}

export interface AlternateLinksOptions<Lang extends string> {
  /** The `site` of astro.config. */
  site: URL;
  /** The languages the site is published in, in the order their links are written. */
  languages: readonly Lang[];
  /** The path of a language's version of the page, from the site root (e.g. `/en`). */
  localePath: (lang: Lang) => string;
  /** The hreflang code of each language, as search engines read it (e.g. `en-US`). */
  hreflang: Record<Lang, string>;
  /** The language the `x-default` link points to: the version for readers in no listed language. */
  xDefault: Lang;
}

/** The hreflang links of a page: one per language, then `x-default`. */
export function alternateLinks<Lang extends string>({
  site,
  languages,
  localePath,
  hreflang,
  xDefault,
}: AlternateLinksOptions<Lang>): AlternateLink[] {
  return [
    ...languages.map((lang) => ({ hreflang: hreflang[lang], href: absoluteUrl(localePath(lang), site) })),
    { hreflang: "x-default", href: absoluteUrl(localePath(xDefault), site) },
  ];
}
