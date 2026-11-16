# layout

The HTML document every page is rendered in: the head (title, description, canonical, hreflang, Open Graph, Twitter card, favicon, structured data), the theme before the first paint, the font, and the three landmarks: `header`, `main` and `footer`. The `noindex` prop (the 404 page) renders `noindex, follow` and skips the canonical, the hreflang and `og:url`.

- `index.ts`: the door; exports `Layout`, `homeSeo` and `siteName`.
- `seo.ts`: the title and description of the home page in each language, and the business name.
