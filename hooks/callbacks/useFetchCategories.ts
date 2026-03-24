import { getPrimaryCategories, getSubCategories } from "@/actions/category-action";
import { useCallback } from "react";

export const useFetchPrimaryCategories = () =>
  useCallback(() => getPrimaryCategories(), []);

export const useFetchSubCategories = () =>
  useCallback(() => getSubCategories(), []);