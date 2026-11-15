import type { ImageMetadata } from "astro";
import type { TranslatedText } from "#/features/i18n";

export interface AccordionItem {
    id: string;
    image: ImageMetadata;
    title_lv: string;
    title_ru: string;
    title_en: string;
    body_lv: string;
    body_ru: string;
    body_en: string;
}

export interface AccordionData {
    title: TranslatedText;
    items: AccordionItem[];
}
