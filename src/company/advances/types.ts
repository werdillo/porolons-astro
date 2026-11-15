import type { ImageMetadata } from "astro";
import type { TranslatedText } from "#/features/i18n";

export interface AdvanceItem {
    icon: ImageMetadata;
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface AdvancesData {
    title: TranslatedText;
    items: AdvanceItem[];
}
