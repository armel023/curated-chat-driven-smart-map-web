"use server";

import { SearchResult } from "@/types";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";

export async function importPlaces(ids: string[]): Promise<SearchResult[]> {
  const res = await fetch(`${SERVER_URL}/api/ImportPlace/import-batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ids)
  });
  if (!res.ok) {
    throw new Error("Failed to import places");
  }
  const data = await res.json();
  console.log("Fetched data:", data);
  return data;
}