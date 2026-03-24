"use client";
import { ChatInterface } from "@/components/map/ChatInterface";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { usePlaces } from "@/contexts/PlacesContext";
import { Place } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function MainSection() {
  const { getPublicPlaces, getApprovedPlaces } = usePlaces();
  const { data: session, status } = useSession();
  const isGuest = !session;
  const isAdmin = session?.user?.isAdmin || false;

  // Determine available places based on user role
  const availablePlaces = useMemo(() => {
    if (isGuest) {
      return getPublicPlaces(); // Only public places for guests
    } else {
      return getApprovedPlaces(); // All approved places for logged-in users
    }
  }, [isGuest, getPublicPlaces, getApprovedPlaces]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [filteredPlaces, setFilteredPlaces] =
    useState<Place[]>(availablePlaces);

  const [highlightedPlaces, setHighlightedPlaces] = useState<string[]>([]);

  // Update filtered places when available places change
  useEffect(() => {
    setFilteredPlaces(availablePlaces);
  }, [availablePlaces]);

  const handleSearch = (query: string) => {
    // const chatQuery = processChatQuery(query);
    // const results = filterPlacesByQuery(availablePlaces, chatQuery);
    // setFilteredPlaces(results);
    // setHighlightedPlaces(results.map((p) => p.id));
    // // Auto-select first result
    // if (results.length > 0) {
    //   setSelectedPlace(results[0]);
    // }
    // const response = generateResponse(query, results, chatQuery);
    // return { places: results, response };
    return {
      places: [],
      response: "Search functionality is not implemented yet.",
    };
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 p-4 h-[50vh] md:h-auto">
        <InteractiveMap
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          onPlaceSelect={setSelectedPlace}
          highlightedPlaces={highlightedPlaces}
        />
      </div>

      <div className="w-full md:w-[450px] border-l flex flex-col h-[50vh] md:h-auto">
        <ChatInterface
          onSearch={handleSearch}
          onPlaceSelect={setSelectedPlace}
          selectedPlace={selectedPlace}
        />
      </div>
    </div>
  );
}
