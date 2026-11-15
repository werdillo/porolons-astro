import type { Rule } from "unocss";

// The enter and exit animations, driven by the --tw-enter-* and --tw-exit-* properties.
const animateIn =
  "enter var(--tw-animation-duration, var(--tw-duration, 0.15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)";
const animateOut =
  "exit var(--tw-animation-duration, var(--tw-duration, 0.15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)";

/** Utilities the site uses that the preset does not have: the transition, the tw-animate-css set and the accordion motion. */
export const rules: Rule[] = [
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
];
