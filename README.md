# Porolons

The landing page of a polyurethane foam (porolon) producer: a static site in Latvian, English and Russian, with a hero, the product advantages, the list of products made from foam, the offer as an accordion, and the contacts and map of the production site.

## Structure

Layers run `core ← components ← features ← company`; `app` and `pages` compose them. Each box is a folder with an `index.ts` door and a `README.md`.

```text
src/
  core/                 cn(): the class-name helper (clsx)
  components/           the UI kit, no business subject
    accordion/          Accordion, AccordionItem, AccordionTrigger, AccordionContent
    dropdown/           Dropdown, DropdownTrigger, DropdownContent, DropdownItem, ...
  features/             needed by every domain, owned by none
    i18n/               languages, Language / TranslatedText types, LanguageDropdown
  company/              the producer's business subjects
    hero/               the title banner
    advances/           the four reasons to trust the producer
    production/         the products made from foam
    faq/                the product offer as an accordion
    location/           contacts, working hours, map
  app/                  composition root
    layout/             Layout: the HTML document
    frame/              Navbar: logo and language switcher
    styles/             tokens.css, main.css, animations.css
    assets/             the logo and images used across boxes
    tests/              boundaries.test.ts: the layers and doors
  pages/                thin: / (Latvian), /[lang] (en, ru)
public/                 static files, URLs unchanged
```

Architecture: [../docs_web/README.md](../docs_web/README.md)

## Commands

```sh
bun install          # install dependencies
bun run dev          # local dev server
bun run build        # static build into dist/
bun run check        # typecheck (astro check), lint (oxlint) and tests (vitest)
```

## Stack

- Runtime and package manager: Bun (`bun.lock`).
- Astro 7.4.12 (static output), `astro-relative-links` 0.4.2, `@tabler/icons` 3.52.0.
- Styling: UnoCSS 66.13.0 with `presetWind4` (`uno.config.ts`, `@unocss/astro` 66.13.0). Colors and radii are CSS variables in `src/app/styles/tokens.css`.
- Variants: `class-variance-authority` 0.7.1 and `clsx` 2.1.1.
- Checks: `@astrojs/check` 0.9.12, TypeScript 6.0.3, oxlint 1.93.0, vitest 5.1.0.

Deviations from the latest versions, and why:

- TypeScript 6.0.3, not 7.0.2: `astro check` refuses TypeScript 7 (it supports 5 and 6).
- `compressHTML: false` in `astro.config.mjs`: Astro 7's HTML compressor drops the space between an icon and the link after it and the spaces inside a link, which moved the text.
- UnoCSS output is in CSS layers (`outputToCssLayers`), and the base rules are a preflight: the stylesheet of Font Awesome has no layer and must not beat the utilities, as it never did.
- No class-merge package: a class passed to a kit component is added after the kit's base classes, so where the site overrides a base utility the base one is removed from the kit (`DropdownContent` min-width, `DropdownTrigger` transition, `DropdownItem` display and padding).
- Animation utilities from `tw-animate-css` are rules in `uno.config.ts` with their keyframes in `src/app/styles/animations.css`. The `@property` registrations are not carried over; they only give initial values that the rules already supply.
