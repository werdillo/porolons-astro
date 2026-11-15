import type { Language } from "./types";

/** The site's languages, in the order the language switcher lists them. */
export const languages: Language[] = ["lv", "en", "ru"];

/** The Open Graph locale of each language (language_TERRITORY). */
export const ogLocales: Record<Language, string> = {
  lv: "lv_LV",
  en: "en_US",
  ru: "ru_RU",
};

/** The path of a language's home page: Latvian is the root, the others have a prefix. */
export function localePath(lang: Language): string {
  return lang === "lv" ? "/" : `/${lang}`;
}
