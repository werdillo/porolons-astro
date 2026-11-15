import type { AdvancesData } from "./types";
import Advances1 from "./assets/Advances1.svg";
import Advances2 from "./assets/Advances2.svg";
import Advances3 from "./assets/Advances3.svg";
import Advances4 from "./assets/Advances4.svg";

export const advancesData: AdvancesData = {
    title: {
        lv: "Uzticieties profesionāļiem",
        ru: "Доверьтесь профессионалам",
        en: "Trust the professionals",
    },
    items: [
        {
            icon: Advances1,
            text_lv: "Vienīgais Vita pārstāvis Latvijā un Igaunijā",
            text_ru: "Единственный представитель Vita в Латвии и Эстонии",
            text_en: "The only Vita representative in Latvia and Estonia",
        },
        {
            icon: Advances2,
            text_lv: "Pārstrādājam 120 tonnas porolona mēnesī",
            text_ru: "Перерабатываем 120 тон поролона ежемесячно",
            text_en: "Monthly we process 120 tons of foam rubber",
        },
        {
            icon: Advances3,
            text_lv: "Produkcija atbilst OEKO-TEX sertifikāta prasībām",
            text_ru: "Продукция соответствует сертификации OEKO-TEX",
            text_en: "Products comply with OEKO-TEX certification",
        },
        {
            icon: Advances4,
            text_lv: "Vairāk nekā 25 gadu pieredze",
            text_ru: "Более 25 лет опыта",
            text_en: "More than 25 years of experience",
        },
    ],
};
