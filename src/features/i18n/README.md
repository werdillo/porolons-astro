# i18n

The site's languages: the locale list, the paths, the hreflang and Open Graph locale codes, the `Language` and `TranslatedText` types, the names of the controls, and the language switcher.

- `index.ts`: the door; exports `LanguageDropdown`, `languages`, `localePath`, `hreflangCodes`, `ogLocales`, `navigationLabel`, `themeToggleLabel`, `Language`, `TranslatedText`.
- `locales.ts`: the codes. `hreflangCodes` (`lv-LV`, `en-US`, `ru-RU`) is the one map of the hreflang links and the sitemap.
