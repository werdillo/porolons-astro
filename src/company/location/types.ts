import type { TranslatedText } from "#/features/i18n";

export interface PostalAddress {
    locality: string;
    street: string;
    postalCode: string;
}

export interface ContactInfo {
    email: string;
    phone1: string;
    phone2: string;
    address: PostalAddress;
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

export interface GeoPoint {
    latitude: number;
    longitude: number;
}

export interface LocationData {
    scheme: TranslatedText;
    coordinates: GeoPoint;
    title: TranslatedText;
    contact: ContactInfo;
    workingHours: WorkingHours;
    mapPoints: MapPoints;
    mapTitle: TranslatedText;
    planAlt: TranslatedText;
    mapUrl: string;
}
