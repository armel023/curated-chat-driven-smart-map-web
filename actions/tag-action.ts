"use server";

import { Tag } from "@/types";

export async function getTags(): Promise<Tag[]> {
  const SERVER_URL = process.env.SERVER_URL || "http://localhost:5292";
  const res = await fetch(`${SERVER_URL}/api/Tag`);
  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }
  const data = await res.json();
  console.log("Fetched tags:", data);
  return data;
}