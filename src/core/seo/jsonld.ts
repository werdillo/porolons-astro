/** The JSON of a `<script type="application/ld+json">`. `<` is escaped, so no value can close the tag. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export interface PostalAddressOptions {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  /** The ISO 3166-1 alpha-2 code of the country, e.g. `LV`. */
  addressCountry: string;
}

/** A schema.org PostalAddress, for the `address` of a business or place. */
export function postalAddressLd({ streetAddress, addressLocality, postalCode, addressCountry }: PostalAddressOptions) {
  return { "@type": "PostalAddress", streetAddress, addressLocality, postalCode, addressCountry };
}

export interface WebsiteOptions {
  /** The name of the site. */
  name: string;
  /** The absolute URL of the site's home page in the language. */
  url: string;
  /** The BCP 47 tag of the language, e.g. `lv-LV`. */
  inLanguage: string;
}

/** The schema.org WebSite of a page: its name, its home page and the language it is written in. */
export function websiteLd({ name, url, inLanguage }: WebsiteOptions) {
  return { "@context": "https://schema.org", "@type": "WebSite", name, url, inLanguage };
}
