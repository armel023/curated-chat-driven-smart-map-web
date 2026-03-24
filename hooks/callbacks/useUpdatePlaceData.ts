import { updatePlaceData } from "@/actions/places-action";
import { Place} from "@/types";
import { useCallback } from "react";

const useUpdatePlaceData = () =>
  useCallback((id: string, data: Partial<Place>) => updatePlaceData(id, data), []);
export default useUpdatePlaceData;