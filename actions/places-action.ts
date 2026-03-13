"use server";

import { Place } from "@/types";

export type PlaceStatus = 'pending' | 'approved' | 'rejected';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";

export async function getPlaceList(query: string): Promise<Place[]> {
  const res = await fetch(`${SERVER_URL}/api/Place${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }
  const data = await res.json();
  console.log("Fetched data:", data);
  return data;
}