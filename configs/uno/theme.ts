// The site's theme: colors, radii and the container, spacing, shadow and font names. Each value is a CSS
// custom property from src/app/styles/tokens.css.

export const theme = {
  // The text styles are the text-h1 … text-p3 classes, made by a rule in rules.ts from the variables
  // of src/components/typography/typography.css.
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
    body: "var(--color-body)",
    "on-dark": "var(--color-on-dark)",
    overlay: "var(--color-overlay)",
    soft: "var(--color-soft)",
    surface: "var(--color-surface)",
    dark: "var(--color-dark)",
    hover: "var(--color-hover)",
    line: "var(--color-line)",
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
  // max-w-page: the 1200px page width of every container.
  container: { page: "var(--container-width)" },
  // pt-header, min-h-header-md ...: the fixed navigation bar's height at each breakpoint.
  spacing: {
    header: "var(--header-height)",
    "header-sm": "var(--header-height-sm)",
    "header-md": "var(--header-height-md)",
  },
  shadow: { nav: "var(--shadow-nav)" },
  font: { primary: "var(--font-primary)" },
};
