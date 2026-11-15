import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

/**
 * The type scale is the matrix H1-H6 and P1-P3, and every text goes through it. Outside the type scale
 * (components/typography) and the global styles (app/styles), no file sets a font size, weight or line
 * height: the classes below are the ones that do. A file that keeps one of them is listed in EXCEPTIONS
 * with its reason, and an entry that no longer matches fails the test, so the list cannot go stale.
 */
const SRC = fileURLToPath(new URL("../..", import.meta.url));

/** The folders that define the type: they may set sizes, weights and line heights. */
const ALLOWED = ["components/typography/", "app/styles/"];

/** The files that keep a raw text style, with the reason. Empty: the site has no raw text styles. */
const EXCEPTIONS: { path: string; reason: string }[] = [];

const PATTERNS: { name: string; re: RegExp }[] = [
  {
    name: "size class",
    re: /(?<![\w-])(?:[\w-]+:)*text-(?:xs|sm|base|lg|xl|[2-9]xl|\[\s*[\d.]+(?:px|rem|em)?\s*\])(?![\w-])/,
  },
  {
    name: "weight class",
    re: /(?<![\w-])(?:[\w-]+:)*font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)(?![\w-])/,
  },
  {
    name: "line-height class",
    re: /(?<![\w-])(?:[\w-]+:)*leading-(?:none|tight|snug|normal|relaxed|loose|\d|\[)/,
  },
  { name: "font-size declaration", re: /(?<![\w-])font-size\s*:/ },
  { name: "font-weight declaration", re: /(?<![\w-])font-weight\s*:/ },
  { name: "line-height declaration", re: /(?<![\w-])line-height\s*:/ },
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "tests" ? [] : files(path);
    return /\.(astro|ts|css)$/.test(name) ? [path] : [];
  });
}

/** The matches of the rule in a file, skipping comment lines (they describe the rule, they do not use it). */
function matches(file: string): string[] {
  const found: string[] = [];
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
      for (const { name, re } of PATTERNS) {
        if (re.test(line)) found.push(`${index + 1}: ${name}`);
      }
    });
  return found;
}

const scanned = files(SRC)
  .map((file) => ({ path: relative(SRC, file), found: matches(file) }))
  .filter(({ path }) => !ALLOWED.some((dir) => path.startsWith(dir)));

test("no file outside the type scale and the global styles sets a font size, weight or line height", () => {
  const excepted = new Set(EXCEPTIONS.map((entry) => entry.path));
  const violations = scanned
    .filter(({ path, found }) => found.length > 0 && !excepted.has(path))
    .map(({ path, found }) => `${path}: ${found.join(", ")}`);
  expect(violations).toEqual([]);
});

test("every exception has a reason and still matches a raw text style", () => {
  const stale: string[] = [];
  for (const { path, reason } of EXCEPTIONS) {
    if (!reason.trim()) stale.push(`${path}: no reason`);
    const entry = scanned.find((file) => file.path === path);
    if (!entry || entry.found.length === 0) stale.push(`${path}: no longer matches, remove it`);
  }
  expect(stale).toEqual([]);
});

test("the type scale is exactly the nine styles H1-H6 and P1-P3", () => {
  const index = readFileSync(join(SRC, "components/typography/index.ts"), "utf8");
  const exported = [...index.matchAll(/export \{ default as (\w+) \}/g)].map(([, name]) => name);
  expect(exported.sort()).toEqual(["H1", "H2", "H3", "H4", "H5", "H6", "P1", "P2", "P3"]);
  const css = readFileSync(join(SRC, "components/typography/typography.css"), "utf8");
  for (const style of ["h1", "h2", "h3", "h4", "h5", "h6", "p1", "p2", "p3"]) {
    expect(css).toContain(`--text-${style}-size:`);
  }
});
