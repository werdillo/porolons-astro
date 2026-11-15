import type { PostalAddress } from "./types";

/** The address on one line, as the location box and the map link show it. */
export function formatAddress(address: PostalAddress): string {
    return [address.locality, address.street, address.postalCode].join(", ");
}
