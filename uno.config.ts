import { defineConfig, presetWind4 } from "unocss";

// The class names are the v4 utility set (presetWind4), so the markup keeps its classes.
// Semantic colors and radii resolve through the CSS custom properties in
// src/app/styles/tokens.css, so `bg-popover`, `text-muted-foreground`, `border-border`,
// `rounded-md` ... are utilities here too.
//
// The animation classes used by the dropdown and the accordion are rules below; their
// keyframes live in src/app/styles/animations.css.

// The enter and exit animations, driven by the --tw-enter-* and --tw-exit-* properties.
const animateIn =
  "enter var(--tw-animation-duration, var(--tw-duration, 0.15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)";
const animateOut =
  "exit var(--tw-animation-duration, var(--tw-duration, 0.15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)";

export default defineConfig({
  presets: [presetWind4()],
  // Utilities go in CSS layers. A stylesheet without a layer (Font Awesome, for one) must
  // not beat a utility class, and the preflight below sits under the utilities.
  outputToCssLayers: true,
  theme: {
    // The sizes with their unitless line-heights: text-sm is 1.25/0.875 of its size, not a fixed 1.25rem.
    text: {
      xs: { fontSize: "0.75rem", lineHeight: "calc(1 / 0.75)" },
      sm: { fontSize: "0.875rem", lineHeight: "calc(1.25 / 0.875)" },
      base: { fontSize: "1rem", lineHeight: "1.5" },
      lg: { fontSize: "1.125rem", lineHeight: "calc(1.75 / 1.125)" },
      xl: { fontSize: "1.25rem", lineHeight: "calc(1.75 / 1.25)" },
      "2xl": { fontSize: "1.5rem", lineHeight: "calc(2 / 1.5)" },
      "5xl": { fontSize: "3rem", lineHeight: "1" },
    },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      card: "var(--card)",
      "card-foreground": "var(--card-foreground)",
      popover: "var(--popover)",
      "popover-foreground": "var(--popover-foreground)",
      primary: "var(--primary)",
      "primary-foreground": "var(--primary-foreground)",
      "primary-accent": "var(--primary-accent)",
      secondary: "var(--secondary)",
      "secondary-foreground": "var(--secondary-foreground)",
      "secondary-accent": "var(--secondary-accent)",
      muted: "var(--muted)",
      "muted-foreground": "var(--muted-foreground)",
      accent: "var(--accent)",
      "accent-foreground": "var(--accent-foreground)",
      info: "var(--info)",
      "info-foreground": "var(--info-foreground)",
      success: "var(--success)",
      "success-foreground": "var(--success-foreground)",
      warning: "var(--warning)",
      "warning-foreground": "var(--warning-foreground)",
      error: "var(--error)",
      "error-foreground": "var(--error-foreground)",
      border: "var(--border)",
      input: "var(--input)",
      outline: "var(--outline)",
    },
    radius: {
      xs: "calc(var(--radius) - 0.375rem)",
      sm: "calc(var(--radius) - 0.25rem)",
      md: "calc(var(--radius) - 0.125rem)",
      lg: "var(--radius)",
      xl: "calc(var(--radius) + 0.25rem)",
      "2xl": "calc(var(--radius) + 0.5rem)",
      "3xl": "calc(var(--radius) + 1rem)",
    },
  },
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
  rules: [
    // transform-gpu: its own transform, so the computed matrix is the one it always was.
    ["transform-gpu", { transform: "translateZ(0)" }],
    // transition-colors also covers outline, fill and stroke.
    [
      "transition-colors",
      {
        "transition-property":
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
        "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
        "transition-duration": "0.15s",
      },
    ],
    // tw-animate-css, the classes the dropdown uses.
    ["animate-in", { animation: animateIn }],
    ["animate-out", { animation: animateOut }],
    ["fade-in", { "--tw-enter-opacity": "0" }],
    ["fade-out", { "--tw-exit-opacity": "0" }],
    ["zoom-in-95", { "--tw-enter-scale": "0.95" }],
    ["zoom-out-95", { "--tw-exit-scale": "0.95" }],
    ["slide-in-from-top-2", { "--tw-enter-translate-y": "-0.5rem" }],
    ["slide-in-from-bottom-2", { "--tw-enter-translate-y": "0.5rem" }],
    ["slide-in-from-left-1", { "--tw-enter-translate-x": "-0.25rem" }],
    ["slide-in-from-right-1", { "--tw-enter-translate-x": "0.25rem" }],
    ["slide-out-to-top-2", { "--tw-exit-translate-y": "-0.5rem" }],
    ["slide-out-to-bottom-2", { "--tw-exit-translate-y": "0.5rem" }],
    ["slide-out-to-left-1", { "--tw-exit-translate-x": "-0.25rem" }],
    ["slide-out-to-right-1", { "--tw-exit-translate-x": "0.25rem" }],
    ["fill-mode-forwards", { "--tw-animation-fill-mode": "forwards", "animation-fill-mode": "forwards" }],
    // The accordion height comes from the Accordion script as --starwind-accordion-content-height.
    ["animate-accordion-down", { animation: "accordion-down 0.2s ease-out" }],
    ["animate-accordion-up", { animation: "accordion-up 0.2s ease-out" }],
  ],
});
