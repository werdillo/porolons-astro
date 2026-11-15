import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

/**
 * The layers of this project, checked against the imports of `src`:
 *
 *   core ← components ← features ← company        app and pages compose them all
 *
 * Each layer imports only the layers to its left and itself; company (the domain)
 * never imports features it does not need through their door. A box (a folder with
 * an `index.ts`) is reached from outside only through that door.
 */
const SRC = fileURLToPath(new URL("../..", import.meta.url));

/** The layers that are checked, and the layers each one may import. */
const ALLOWED: Record<string, string[]> = {
  core: [],
  components: ["core", "components"],
  features: ["core", "components", "features"],
  company: ["core", "components", "features"],
};

/** Layers that compose the others and may import any of them. */
const COMPOSERS = ["app", "pages"];

/** Folders that are layers; each has a README. */
const LAYERS = ["core", "components", "features", "company", "app"];

/** Folders inside a box that are not boxes of their own. */
const SLICES = new Set(["assets", "tests", "shared"]);

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "tests" ? [] : files(path);
    return /\.(ts|tsx|astro)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

/** The module specifiers of a file that point inside `src`, as paths relative to it. */
function targets(file: string): { spec: string; target: string }[] {
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)].flatMap(([, spec]) => {
    if (spec!.startsWith("#/")) return [{ spec: spec!, target: spec!.slice(2) }];
    if (spec!.startsWith(".")) return [{ spec: spec!, target: relative(SRC, resolve(dirname(file), spec!)) }];
    return [];
  });
}

const area = (path: string) => path.split("/")[0]!;

test("each layer imports only the layers it may, and nothing from the composers", () => {
  const violations: string[] = [];
  for (const file of files(SRC)) {
    const path = relative(SRC, file);
    const from = area(path);
    const allowed = ALLOWED[from];
    if (!allowed) continue;
    for (const { spec, target } of targets(file)) {
      const to = area(target);
      if (to === from) continue;
      if ((to in ALLOWED || COMPOSERS.includes(to)) && !allowed.includes(to)) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

/** A box: the deepest folder with an `index.ts` that is not a slice. Undefined outside any box. */
function boxOf(path: string): string | undefined {
  const segments = path.split("/");
  let box: string | undefined;
  for (let i = 1; i < segments.length; i++) {
    const dir = segments.slice(0, i);
    if (dir.some((s) => SLICES.has(s))) break;
    if (existsSync(join(SRC, ...dir, "index.ts"))) box = dir.join("/");
  }
  return box;
}

test("a box is reached from outside only through its door (index.ts)", () => {
  const violations: string[] = [];
  for (const file of files(SRC)) {
    const path = relative(SRC, file);
    const own = boxOf(path);
    for (const { spec, target } of targets(file)) {
      const box = boxOf(target);
      if (!box || box === own) continue;
      if (target !== `${box}/index.ts`) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("a box's door only re-exports: no imports, no declarations", () => {
  const violations: string[] = [];
  for (const file of files(SRC)) {
    const path = relative(SRC, file);
    if (!/(^|\/)index\.ts$/.test(path) || boxOf(path) !== dirname(path)) continue;
    const text = readFileSync(file, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/export\s+(type\s+)?(\*(\s+as\s+\w+)?|\{[^}]*\})\s+from\s+["'][^"']+["'];?/g, "");
    if (text.trim() !== "") violations.push(path);
  }
  expect(violations).toEqual([]);
});

test("every box and every layer has a README.md, and every box has its door", () => {
  const missing: string[] = [];
  for (const layer of LAYERS) if (!existsSync(join(SRC, layer, "README.md"))) missing.push(`${layer}/README.md`);
  const folders = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      if (!statSync(path).isDirectory() || SLICES.has(name)) return [];
      return [path, ...folders(path)];
    });
  for (const folder of folders(SRC)) {
    if (!existsSync(join(folder, "index.ts")) && !existsSync(join(folder, "README.md"))) continue;
    if (!existsSync(join(folder, "README.md"))) missing.push(`${relative(SRC, folder)}/README.md`);
  }
  expect(missing).toEqual([]);
});
