import { expect, test } from "vitest";
import { absoluteUrl, alternateLinks, jsonLd, postalAddressLd, robotsTxt, sitemapI18n, websiteLd } from "../index";

const site = new URL("https://example.lv");
const hreflang = { lv: "lv-LV", en: "en-US", ru: "ru-RU" } as const;
const localePath = (lang: "lv" | "en" | "ru") => (lang === "lv" ? "/" : `/${lang}`);

test("absoluteUrl resolves a path against the site", () => {
  expect(absoluteUrl("/", site)).toBe("https://example.lv/");
  expect(absoluteUrl("/en", site)).toBe("https://example.lv/en");
  expect(absoluteUrl("/_astro/hero.jpg", new URL("https://example.lv/sub/"))).toBe("https://example.lv/_astro/hero.jpg");
});

test("alternateLinks gives one link per language, in order, then x-default", () => {
  expect(alternateLinks({ site, languages: ["lv", "en", "ru"], localePath, hreflang, xDefault: "lv" })).toEqual([
    { hreflang: "lv-LV", href: "https://example.lv/" },
    { hreflang: "en-US", href: "https://example.lv/en" },
    { hreflang: "ru-RU", href: "https://example.lv/ru" },
    { hreflang: "x-default", href: "https://example.lv/" },
  ]);
});

test("alternateLinks points x-default at the language it is given", () => {
  const links = alternateLinks({ site, languages: ["en", "ru"], localePath, hreflang, xDefault: "en" });
  expect(links.at(-1)).toEqual({ hreflang: "x-default", href: "https://example.lv/en" });
  expect(links.map((link) => link.hreflang)).toEqual(["en-US", "ru-RU", "x-default"]);
});

test("jsonLd escapes < so no value can close the script tag", () => {
  const json = jsonLd({ name: "</script><script>alert(1)" });
  expect(json).not.toContain("<");
  expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)" });
});

test("postalAddressLd is a PostalAddress with the fields in order", () => {
  const address = postalAddressLd({
    streetAddress: "A. Deglava iela 52A",
    addressLocality: "Rīga",
    postalCode: "LV-1035",
    addressCountry: "LV",
  });
  expect(Object.keys(address)).toEqual(["@type", "streetAddress", "addressLocality", "postalCode", "addressCountry"]);
  expect(address["@type"]).toBe("PostalAddress");
});

test("websiteLd is a WebSite with its name, home page and language", () => {
  expect(websiteLd({ name: "Eliza", url: "https://example.lv/en", inLanguage: "en-US" })).toEqual({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eliza",
    url: "https://example.lv/en",
    inLanguage: "en-US",
  });
});

test("robotsTxt allows everything by default and lists the sitemaps after the rules", () => {
  expect(robotsTxt({ sitemap: "https://example.lv/sitemap-index.xml" })).toBe(
    "User-agent: *\nAllow: /\n\nSitemap: https://example.lv/sitemap-index.xml\n",
  );
  expect(robotsTxt()).toBe("User-agent: *\nAllow: /\n");
});

test("robotsTxt writes allow and disallow rules and several sitemaps", () => {
  expect(
    robotsTxt({ allow: ["/en"], disallow: ["/admin", "/tmp"], sitemap: ["https://a.lv/1.xml", "https://a.lv/2.xml"] }),
  ).toBe(
    "User-agent: *\nAllow: /en\nDisallow: /admin\nDisallow: /tmp\n\nSitemap: https://a.lv/1.xml\nSitemap: https://a.lv/2.xml\n",
  );
});

test("sitemapI18n returns the i18n option of @astrojs/sitemap", () => {
  expect(sitemapI18n({ defaultLocale: "lv", locales: { lv: "lv-LV", en: "en-US", ru: "ru-RU" } })).toEqual({
    defaultLocale: "lv",
    locales: { lv: "lv-LV", en: "en-US", ru: "ru-RU" },
  });
});

test("sitemapI18n refuses a default locale that has no code", () => {
  expect(() => sitemapI18n({ defaultLocale: "de", locales: { lv: "lv-LV" } })).toThrow(/"de"/);
});
