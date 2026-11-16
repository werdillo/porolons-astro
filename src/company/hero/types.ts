import type { TranslatedText } from "#/features/i18n";

export interface HeroData {
    title1: TranslatedText;
    title2: TranslatedText;
    text: TranslatedText;
    /** What the hero picture shows, for screen readers and when it does not load. */
    imageAlt: TranslatedText;
}
