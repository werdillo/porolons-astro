import UnoCSS from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import relativeLinks from "astro-relative-links";

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
		sitemap({
			i18n: {
				defaultLocale: "lv",
				locales: { lv: "lv-LV", en: "en-US", ru: "ru-RU" },
			},
		}),
	],
});
