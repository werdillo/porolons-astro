import type { TranslatedText } from "#/features/i18n";

export interface AdvanceItem {
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface AdvancesData {
    title: TranslatedText;
    items: AdvanceItem[];
}
