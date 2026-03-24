"use client";
import React, { useEffect, useRef } from "react";
import { Coffee, Utensils, MapPin, Wine } from "lucide-react";
import { Place } from "@/types";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
interface InteractiveMapProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
  highlightedPlaces?: string[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Coffee":
      return Coffee;
    case "Restaurant":
      return Utensils;
    case "Bar":
      return Wine;
    default:
      return MapPin;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Coffee":
      return "#8B4513";
    case "Restaurant":
      return "#DC143C";
    case "Bar":
      return "#4B0082";
    default:
      return "#FFD93D";
  }
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  selectedPlace,
  onPlaceSelect,
  highlightedPlaces = [],
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Calculate bounds for auto-fit
  useEffect(() => {
    if (places.length === 0) return;

    const lats = places.map((p) => p.latitude);
    const lngs = places.map((p) => p.longitude);

    // This is a simplified visualization - in a real app, you'd use Google Maps or Mapbox
  }, [places]);

  // Normalize coordinates to fit in the viewport
  const normalizeCoords = (lat: number, lng: number) => {
    const minLat = Math.min(...places.map((p) => p.latitude));
    const maxLat = Math.max(...places.map((p) => p.latitude));
    const minLng = Math.min(...places.map((p) => p.longitude));
    const maxLng = Math.max(...places.map((p) => p.longitude));

    const padding = 50;
    const width = 800;
    const height = 600;

    const x =
      ((lng - minLng) / (maxLng - minLng)) * (width - padding * 2) + padding;
    const y =
      ((maxLat - lat) / (maxLat - minLat)) * (height - padding * 2) + padding;

    return { x, y };
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden relative"
    >
      <MapComponent places={places} />
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border z-50">
        <div className="text-xs font-medium mb-2">Categories</div>
        <div className="space-y-1 text-xs">
          {["Coffee", "Restaurant", "Bar"].map((cat) => {
            const Icon = getCategoryIcon(cat);
            const color = getCategoryColor(cat);
            return (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span>{cat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map info */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-xs, z-50">
        <span className="text-muted-foreground">
          {places.length} places shown
        </span>
      </div>
    </div>
  );
};
