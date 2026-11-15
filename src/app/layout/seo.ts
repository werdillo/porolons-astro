import type { TranslatedText } from "#/features/i18n";

/** The name of the business, as the titles and the structured data show it. */
export const siteName = "Eliza Upholstery";

/** The title and description of the home page in each language (the texts of the hero and the location box). */
export const homeSeo: { title: TranslatedText; description: TranslatedText } = {
    title: {
        lv: "Porolona detaļas ražošana | Eliza Upholstery",
        ru: "Производство изделий из поролона | Eliza Upholstery",
        en: "Production of the goods from polyurethane foam | Eliza Upholstery",
    },
    description: {
        lv: "Putu poliuretāns ražotnēm: porolona loksnes, detaļas un izstrādājumi. Ražotne Rīgā, A. Deglava iela 52A.",
        ru: "Пенополиуретан для предприятий: листы, детали и изделия из поролона. Производство в Риге, ул. А. Деглава 52A.",
        en: "Polyurethane foam for the enterprise: foam rubber sheets, parts and products. Production in Riga, A. Deglava iela 52A.",
    },
};
