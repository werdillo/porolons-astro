import { defineConfig, presetWind4 } from "unocss";
import { rules } from "./configs/uno/rules";
import { theme } from "./configs/uno/theme";

// The class names are the v4 utility set (presetWind4). The theme maps the site's colors, sizes and
// shadow to the CSS custom properties in src/app/styles/tokens.css, and the shortcuts name the class
// strings that repeat across the pages.

export default defineConfig({
  presets: [presetWind4()],
  // Utilities go in CSS layers. A stylesheet without a layer (Font Awesome, for one) must
  // not beat a utility class, and the preflight below sits under the utilities.
  outputToCssLayers: true,
  theme,
  // The element defaults the site relies on, under every utility.
  preflights: [
    {
      getCSS: () => `
html,
:host {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
* {
  border-color: var(--border);
  outline-color: color-mix(in oklab, var(--outline) 50%, transparent);
}
body {
  background-color: var(--background);
  color: var(--foreground);
  color-scheme: light;
}
body:where(.dark, .dark *) {
  color-scheme: dark;
}
button {
  cursor: pointer;
}
`,
    },
  ],
  shortcuts: {
    // The h1 of a section: the size steps and the margin under it. Color and leading come per use.
    "section-title": "font-medium text-center text-section sm:text-section-sm md:text-section-md mb-[30px] sm:mb-10 md:mb-20",
    // A link that dims on hover.
    "dim-on-hover": "transition-opacity duration-300 hover:opacity-80",
    // The contact lines of the location box: the gap under a line, the text, the link and the icon.
    "contact-gap": "mb-2.5 sm:mb-[15px] md:mb-[30px]",
    "contact-text": "text-xs sm:text-sm md:text-lg leading-[23px] sm:leading-7 md:leading-9 tracking-text m-0 font-semibold sm:font-normal",
    "contact-link": "text-white no-underline border-b border-b-transparent pb-px transition-all duration-300 hover:opacity-80 hover:border-b-white",
    "contact-icon": "text-body text-sm sm:text-base",
    // The map picture and the map frame: the same box at every breakpoint.
    "map-frame": "w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]",
  },
  rules,
});
