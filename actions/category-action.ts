"use server";

import { PrimaryCategory, SubCategory } from "@/types";



const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";

export async function getPrimaryCategories(): Promise<PrimaryCategory[]> {
  const res = await fetch(`${SERVER_URL}/api/Category/primary`);
    if (!res.ok) {
        throw new Error("Failed to fetch primary categories");
    }
    const data = await res.json();
    console.log("Fetched primary categories:", data);
    return data;
}

export async function getSubCategories(): Promise<SubCategory[]> {
  const res = await fetch(`${SERVER_URL}/api/Category/sub`);
    if (!res.ok) {
        throw new Error("Failed to fetch sub categories");
    }
    const data = await res.json();
    console.log("Fetched sub categories:", data);
    return data;
}