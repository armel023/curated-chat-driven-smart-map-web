import { getTags } from "@/actions/tag-action";
import { useCallback } from "react";

export const useFetchTags = () =>
  useCallback(() => getTags(), []);