export type PlaceStatus = "PENDING" | "APPROVED" | "REJECTED";

export type OpeningHours = {
  [key: string]: { open: string; close: string } | null;
};

export type Place = {
  id: string;
  name: string;
  address: string;
  googlePlaceId?: string; // for Google Maps link
  latitude: number;
  longitude: number;
  rating?: number;
  status: PlaceStatus;
  isPublic: boolean;

  // Optional metadata for better categorization and searchability
  primaryCategory?: string;
  subCategories?: string[];
  neighborhood?: string;
  tags?: string[];

  // Optional fields for richer descriptions
  signatureDish?: string;
  signatureDrink?: string;
  famousFor?: string;
  tone?: string;
  idealUseCase?: string;
  topReasons?: string;
  aiSummary: string;
  adminSummaryOverride?: string;
  isOverride: boolean;

  openingHours?: OpeningHours;
  hasView?: string[];
  reviewCount?: number;
};

export type PrimaryCategory = {
  id: string;
  name: string;
}

export type SubCategory = {
  id: string;
  name: string;
}

export type Neighborhood = {
  id: string;
  name: string;
}

export type Tag = {
  id: string;
  name: string;
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
};

export type UpdatePlaceData = {
  name?: string;
  address?: string;
  googlePlaceId?: string;
  rating?: number;
  status?: PlaceStatus;
};

export type SearchPlaceTextQueryResult = {
  places: SearchResult[];
  nextPageToken?: string;
};

export type UserData = {
  id: string;
  name: string;
  isAdmin: boolean;
  accessToken: string;
};
