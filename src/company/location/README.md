# location

Where the production is: the contacts, the working hours, the address, the map and the site plan.

- `index.ts`: the door; exports `Location` and `localBusinessSchema`.
- `ui/Location.astro`: the section, the heading, `LocationContacts` and `LocationMap`.
- `ui/LocationContacts.astro`: the contact lines and the working hours, from `data.ts`.
- `ui/ContactItem.astro`: one contact line (an icon and its text or link).
- `ui/LocationMap.astro`: the map frame, the site plan, the map points and the plan link.
- `data.ts`, `types.ts`: the contacts, the address, the hours and the map sources.
- `schema.ts`: the LocalBusiness structured data of every page; `services.ts`: the address line.
