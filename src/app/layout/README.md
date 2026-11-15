# layout

The HTML document every page is rendered in: the head (title, description, canonical, hreflang, Open Graph, Twitter card, favicon, structured data), the theme before the first paint, the fonts and icons, and the three landmarks: `header`, `main` and `footer`.

- `index.ts`: the door; exports `Layout`, `homeSeo` and `siteName`.
- `seo.ts`: the title and description of the home page in each language, and the business name.
