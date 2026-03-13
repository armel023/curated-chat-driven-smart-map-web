export type PlaceStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type OpeningHours = {
  [key: string]: { open: string; close: string } | null;
}

export type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  subCategory?: string;
  tags: string[];
  neighborhood: string;
  description: string;
  aiSummary: string;
  status: PlaceStatus;
  visibleToPublic: boolean;
  openingHours: OpeningHours;
  hasView?: string[];
  rating?: number;
  reviewCount?: number;
  placeId?: string; // for Google Maps link
}

export type SearchResult = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  rating?: number;
  selected: boolean;
}