import { getNeighborhoods } from "@/actions/neighborhood-action";
import { useCallback } from "react";

export const useFetchNeighborhoods = () =>
  useCallback(() => getNeighborhoods(), []);