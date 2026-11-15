import type { TranslatedText } from "#/features/i18n";

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
