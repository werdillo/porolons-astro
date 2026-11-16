# seo

Structured data, links and crawler files of the pages. Each builder takes what it needs as arguments, so the box knows nothing of the site's languages or addresses.

- `index.ts`: the door; exports `absoluteUrl`, `alternateLinks`, `jsonLd`, `postalAddressLd`, `websiteLd`, `robotsTxt`, `sitemapI18n` and their option types.
- `urls.ts`: `absoluteUrl` (a path on the site) and `alternateLinks` (the hreflang links of a page: one per language, then `x-default`).
- `jsonld.ts`: `jsonLd` (the JSON of a structured-data script, with `<` escaped), `postalAddressLd` and `websiteLd`.
- `robots.ts`: `robotsTxt` (the rules for every robot, then the sitemap lines).
- `sitemap.ts`: `sitemapI18n`, the `i18n` option of `@astrojs/sitemap`. It imports nothing: astro.config.mjs loads it by its relative path, where the `#/` alias does not resolve.
- `tests/seo.test.ts`: the tests of the builders.
