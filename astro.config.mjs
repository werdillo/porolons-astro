import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
	output: "static",
	trailingSlash: "never",
	build: {
		format: "directory",
	},
	integrations: [relativeLinks()],
	vite: {
		plugins: [tailwindcss()],
	},
});
