"use server";

import { SearchPlaceTextQueryResult, SearchResult } from "@/types";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";

export async function searchPlaceNearbyToImport(
  query: string,
): Promise<SearchResult[]> {
  const body = {
    includedTypes: [query],
    maxResultCount: 5,
    locationRestriction: {
      circle: {
        center: {
          latitude: 37.7937,
          longitude: -122.3965,
        },
        radius: 500.0,
      },
    },
  };
  const res = await fetch(`${SERVER_URL}/api/ImportPlace/search-nearby`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }
  const data = await res.json();
  console.log("Fetched data:", data);
  return data;
}

export async function searchPlaceTextQuery(
  query: string,
  pageToken: string = "",
): Promise<SearchPlaceTextQueryResult> {
  const body = {
    textQuery: query,
    pageSize: 5,
    pageToken: pageToken,
  };
  const res = await fetch(`${SERVER_URL}/api/ImportPlace/search-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }
  const data = await res.json();
  console.log("Fetched data:", data);
  return data;
}
