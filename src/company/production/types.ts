import type { TranslatedText } from "#/features/i18n";

export interface ProductionItem {
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface ProductionData {
    title: TranslatedText;
    items: ProductionItem[];
}
