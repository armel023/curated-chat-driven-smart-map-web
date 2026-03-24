"use server";

import { Neighborhood } from "@/types";

export async function getNeighborhoods(): Promise<Neighborhood[]> {
    const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";
    const res = await fetch(`${SERVER_URL}/api/Neighborhood`);
    if (!res.ok) {
        throw new Error("Failed to fetch neighborhoods");
    }
    const data = await res.json();
    console.log("Fetched neighborhoods:", data);
    return data;
}