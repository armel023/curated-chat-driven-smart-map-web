import { SearchResult } from "@/types";

    export const mockResults: SearchResult[] = [
    {
        id: 'search1',
        name: `AA - Artisan Bakery`,
        address: 'Værnedamsvej 8, Copenhagen',
        lat: 55.6734,
        lng: 12.5533,
        category: 'Bakery',
        rating: 4.6,
        selected: false,
    },
    {
        id: 'search2',
        name: `BB - Coffee House`,
        address: 'Vesterbrogade 45, Copenhagen',
        lat: 55.6723,
        lng: 12.5512,
        category: 'Coffee',
        rating: 4.4,
        selected: false,
    },
    {
        id: 'search3',
        name: `CC - Gourmet Restaurant`,
        address: 'Kronprinsessegade 7, Copenhagen',
        lat: 55.6801,
        lng: 12.5834,
        category: 'Restaurant',
        rating: 4.8,
        selected: false,
    },
    ];