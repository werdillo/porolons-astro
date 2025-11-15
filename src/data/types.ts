export type Language = "lv" | "ru" | "en";

export interface TranslatedText {
    lv: string;
    ru: string;
    en: string;
}

export interface HeroData {
    title1: TranslatedText;
    title2: TranslatedText;
    text: TranslatedText;
}

export interface AdvanceItem {
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface AdvancesData {
    title: TranslatedText;
    items: AdvanceItem[];
}

export interface ProductionItem {
    text_lv: string;
    text_ru: string;
    text_en: string;
}

export interface ProductionData {
    title: TranslatedText;
    items: ProductionItem[];
}

export interface AccordionItem {
    id: string;
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

export interface ContactInfo {
    email: string;
    phone1: string;
    phone2: string;
    address: string;
}

export interface WorkingHours {
    weekday_lv: string;
    break_lv: string;
    weekend_lv: string;
    weekday_ru: string;
    break_ru: string;
    weekend_ru: string;
    weekday_en: string;
    break_en: string;
    weekend_en: string;
}

export interface MapPoints {
    lv: string[];
    ru: string[];
    en: string[];
}

export interface LocationData {
    scheme: TranslatedText;
    title: TranslatedText;
    contact: ContactInfo;
    workingHours: WorkingHours;
    mapPoints: MapPoints;
    mapUrl: string;
}
