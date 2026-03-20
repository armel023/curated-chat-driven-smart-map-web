import { updatePlaceStatus } from "@/actions/places-action";
import { PlaceStatus } from "@/types";
import { useCallback } from "react";

const useUpdatePlaceStatus = () =>
  useCallback((id: string, status: PlaceStatus) => updatePlaceStatus(id, status), []);
export default useUpdatePlaceStatus;