import { readFile, writeFile } from "node:fs/promises";
import UnoCSS from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import relativeLinks from "astro-relative-links";
// The sitemap and the hreflang links share one locale map. Relative paths: the `#/` alias is not resolved here.
import { sitemapI18n } from "./src/core/seo/sitemap.ts";
import { hreflangCodes } from "./src/features/i18n/locales.ts";

// astro-relative-links makes every path relative, but the 404 page is served at any depth, so its paths must
// be root-absolute. Its build hook runs after the listed integrations; this hook is added after it, so it runs last.
const absolutePaths404 = {
	name: "absolute-paths-404",
	hooks: {
		"astro:config:setup": ({ updateConfig }) => {
			updateConfig({
				integrations: [
					{
						name: "absolute-paths-404-rewrite",
						hooks: {
							"astro:build:done": async ({ dir }) => {
								const file = new URL("404.html", dir);
								const html = await readFile(file, "utf8");
								await writeFile(file, html.replace(/(href|src)="\.\/?/g, '$1="/'));
							},
						},
					},
				],
			});
		},
	},
};

// https://astro.build/config
export default defineConfig({
	// The public address of the site: canonical, hreflang, Open Graph, the sitemap and robots.txt use it.
	// It is the address the navigation bar's logo links to; change it here if the public address differs.
	site: "https://eliza-mebeles.lv",
	output: "static",
	trailingSlash: "never",
	// Keep the whitespace between inline elements (an icon and the link after it): Astro 7's
	// compressor drops it, which moves text by a space.
	compressHTML: false,
	build: {
		format: "directory",
	},
	integrations: [
		UnoCSS(),
		relativeLinks(),
		absolutePaths404,
		sitemap({
			i18n: sitemapI18n({ defaultLocale: "lv", locales: hreflangCodes }),
		}),
	],
});
