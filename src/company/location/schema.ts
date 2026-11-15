import { absoluteUrl } from "#/core/seo";
import { localePath, type Language } from "#/features/i18n";
import { locationData } from "./data";
import { formatAddress } from "./services";

interface SchemaOptions {
    /** The `site` of astro.config. */
    site: URL;
    lang: Language;
    /** The business name, as the site's title shows it. */
    name: string;
    /** The absolute URL of the picture that represents the business. */
    image: string;
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * The LocalBusiness of every page: the address, the phones, the email and the working hours that
 * the location box shows (08:30-16:00 on weekdays, with the break 12:00-13:00).
 */
export function localBusinessSchema({ site, lang, name, image }: SchemaOptions) {
    const { contact } = locationData;
    const phones = [contact.phone1, contact.phone2].map((phone) => `+371${phone}`);

    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        url: absoluteUrl(localePath(lang), site),
        image,
        inLanguage: lang,
        email: contact.email,
        telephone: phones[0],
        contactPoint: phones.map((telephone) => ({
            "@type": "ContactPoint",
            telephone,
            email: contact.email,
            contactType: "sales",
        })),
        address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.locality,
            postalCode: contact.address.postalCode,
            addressCountry: "LV",
        },
        hasMap: `https://maps.google.com/?q=${encodeURIComponent(formatAddress(contact.address))}`,
        openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "08:30", closes: "12:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "13:00", closes: "16:00" },
        ],
    };
}
