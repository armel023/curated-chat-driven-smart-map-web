"use server";

import { Place, PlaceStatus } from "@/types";


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

export async function updatePlaceStatus(id: string, status: PlaceStatus): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/Place/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    throw new Error("Failed to update place status");
  }
  console.log(`Place ${id} status updated to ${status}`);
}

export async function updatePlaceData(id: string, data: Partial<Place>): Promise<void> {
  console.log(`Updating place ${id} with data:`, data);
  const res = await fetch(`${SERVER_URL}/api/Place/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error("Failed to update place data");
  }
  console.log(`Place ${id} data updated`, data);
}

