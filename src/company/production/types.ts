import type { ImageMetadata } from "astro";
import type { TranslatedText } from "#/features/i18n";

export interface ProductionItem {
    image: ImageMetadata;
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface ProductionData {
    title: TranslatedText;
    items: ProductionItem[];
}
