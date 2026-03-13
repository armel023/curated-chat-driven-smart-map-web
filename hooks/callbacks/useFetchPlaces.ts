import { getPlaceList } from "@/actions/places-action";
import { useCallback } from "react";

export const useFetchPlaces = () =>
  useCallback((query: string) => getPlaceList(query), []);
