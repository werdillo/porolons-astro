# Porolons

The landing page of a polyurethane foam (porolon) producer: a static site in Latvian, English and Russian, with a hero, the product advantages, the list of products made from foam, the offer as an accordion, the contacts and map of the production site, and a light and dark theme.

## Structure

Layers run `core ← components ← features ← company`; `app` and `pages` compose them. Each box is a folder with an `index.ts` door and a `README.md`. A box whose page mixes several blocks is split into `ui/` components, and the door exports the composed one.

```text
src/
  core/                 cn() (class names); seo/: absoluteUrl(), alternateLinks() (hreflang), jsonLd(), postalAddressLd(), websiteLd(), robotsTxt(), sitemapI18n()
  components/           the UI kit, no business subject
    accordion/          Accordion, AccordionItem, AccordionTrigger, AccordionContent
    container/          Container: the page width and gutters
    dropdown/           Dropdown, DropdownTrigger, DropdownContent, DropdownItem, ...
    section/            Section: vertical padding and the background bands
    theme-toggle/       ThemeToggle: the light and dark button
    typography/         the type scale, nine styles H1-H6 and P1-P3 (see its README)
  features/             needed by every domain, owned by none
    i18n/               languages, paths, Open Graph locales, control names, LanguageDropdown
  company/              the producer's business subjects
    hero/               the title banner
    advances/           the four reasons to trust the producer (ui/: section and item)
    production/         the products made from foam (ui/: section and item)
    faq/                the product offer as an accordion (ui/: section and item)
    location/           contacts, working hours, map (ui/: Location, LocationContacts, ContactItem, LocationMap); the LocalBusiness data
  app/                  composition root
    layout/             Layout: the HTML document, head, SEO, theme script; homeSeo
    frame/              Navbar: logo, theme toggle, language switcher
    styles/             tokens.css (light and dark colours), animations.css
    assets/             the logo (light and dark) and images used across boxes
    tests/              boundaries.test.ts (layers and doors), typography.test.ts (no raw text styles)
  pages/                thin: / (Latvian), /[lang] (en, ru), 404 (not found), robots.txt
public/                 static files, URLs unchanged
```

Architecture: [../docs_web/README.md](../docs_web/README.md)

## Commands

```sh
bun install          # install dependencies
bun run dev          # local dev server
bun run build        # static build into dist/ (pages, sitemap, robots.txt)
bun run check        # typecheck (astro check), lint (oxlint) and tests (vitest)
```

## Content

The texts, the product list, the contacts and the pictures are in each box's `data.ts`, typed in `types.ts`. A content change is an edit there, then `bun run build`: the pages, the sitemap and the structured data are regenerated from the data. Deploy by copying `dist/` to the host. The titles and descriptions of the pages are in `src/app/layout/seo.ts`; the public address is `site` in `astro.config.mjs` (canonical, hreflang, Open Graph, sitemap and robots.txt are built from it).

## Theme

The theme is the `dark` class on `<html>`. A small inline script in the head sets it before the first paint: the choice stored in `localStorage` (`theme`), else the system setting (`prefers-color-scheme`). The toggle in the navigation bar stores the choice (light or dark) and falls back to the system when nothing is stored. Colours are tokens in `src/app/styles/tokens.css`: the light values on `:root`, the dark overrides on `.dark`. No colour is written in a component.

## SEO

Each page has its title, description, canonical link, `hreflang` for lv-LV, en-US, ru-RU and `x-default`, Open Graph and Twitter tags, a `LocalBusiness` JSON-LD (the address, phones, email, hours and map coordinates the location box shows) and a `WebSite` JSON-LD. The language codes are one map, `hreflangCodes` in `src/features/i18n/locales.ts`, used by the head and by the sitemap (`@astrojs/sitemap`, built by `sitemapI18n` in `src/core/seo/`). `robots.txt` points to the sitemap. The 404 page (`src/pages/404.astro`) is `noindex, follow`, and its paths are absolute: it is served at any address.

## Stack

- Runtime and package manager: Bun (`bun.lock`).
- Astro 7.4.12 (static output), `astro-relative-links` 0.4.2, `@astrojs/sitemap` 3.7.5, `@tabler/icons` 3.52.0.
- Styling: UnoCSS 66.13.0 with `presetWind4` in class mode for the theme (`uno.config.ts`, `@unocss/astro` 66.13.0). Colours, text styles and the shadow are theme names backed by CSS variables in `src/app/styles/tokens.css` and `src/components/typography/typography.css`; the type scale classes are a rule in `configs/uno/rules.ts`.
- Variants: `class-variance-authority` 0.7.1 and `clsx` 2.1.1.
- Checks: `@astrojs/check` 0.9.12, TypeScript 6.0.3, oxlint 1.93.0, vitest 5.1.0.

Deviations from the latest versions, and why:

- TypeScript 6.0.3, not 7.0.2: `astro check` refuses TypeScript 7 (it supports 5 and 6).
- `compressHTML: false` in `astro.config.mjs`: Astro 7's HTML compressor drops the space between an icon and the link after it and the spaces inside a link, which moved the text.
- UnoCSS output is in CSS layers (`outputToCssLayers`), and the base rules are a preflight: a stylesheet without a layer would beat the utilities, so none is loaded. The element defaults of the type scale sit in the base layer, so a text class beats them.
- No class-merge package: a class passed to a kit component is added after the kit's base classes, so where the site overrides a base utility the base one is removed from the kit (`DropdownContent` min-width, `DropdownTrigger` transition, `DropdownItem` display and padding).
- Animation utilities from `tw-animate-css` are rules in `uno.config.ts` with their keyframes in `src/app/styles/animations.css`. The `@property` registrations are not carried over; they only give initial values that the rules already supply.
- The type scale is nine styles (H1-H6, P1-P3) with their values in `typography.css`; the UnoCSS `text-h*`/`text-p*` classes read those variables instead of repeating them.
