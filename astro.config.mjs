import UnoCSS from "unocss/astro";
import { defineConfig } from "astro/config";

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
	output: "static",
	trailingSlash: "never",
	// Keep the whitespace between inline elements (an icon and the link after it): Astro 7's
	// compressor drops it, which moves text by a space.
	compressHTML: false,
	build: {
		format: "directory",
	},
	integrations: [UnoCSS(), relativeLinks()],
});
