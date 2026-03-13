import React, { useEffect, useRef } from 'react';
import { Place } from '../../contexts/PlacesContext';
import { Coffee, Utensils, MapPin, Wine } from 'lucide-react';

interface InteractiveMapProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
  highlightedPlaces?: string[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Coffee':
      return Coffee;
    case 'Restaurant':
      return Utensils;
    case 'Bar':
      return Wine;
    default:
      return MapPin;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Coffee':
      return '#8B4513';
    case 'Restaurant':
      return '#DC143C';
    case 'Bar':
      return '#4B0082';
    default:
      return '#FFD93D';
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

    const lats = places.map(p => p.lat);
    const lngs = places.map(p => p.lng);
    
    // This is a simplified visualization - in a real app, you'd use Google Maps or Mapbox
  }, [places]);

  // Normalize coordinates to fit in the viewport
  const normalizeCoords = (lat: number, lng: number) => {
    const minLat = Math.min(...places.map(p => p.lat));
    const maxLat = Math.max(...places.map(p => p.lat));
    const minLng = Math.min(...places.map(p => p.lng));
    const maxLng = Math.max(...places.map(p => p.lng));

    const padding = 50;
    const width = 800;
    const height = 600;

    const x = ((lng - minLng) / (maxLng - minLng)) * (width - padding * 2) + padding;
    const y = ((maxLat - lat) / (maxLat - minLat)) * (height - padding * 2) + padding;

    return { x, y };
  };

  return (
    <div ref={mapRef} className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden relative">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        {/* Background pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />

        {/* Water bodies (simplified) */}
        <ellipse cx="400" cy="300" rx="150" ry="80" fill="rgba(59, 130, 246, 0.2)" />
        <path d="M 100 200 Q 200 180 300 200 T 500 200" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="20" fill="none" />

        {/* Place markers */}
        {places.map((place) => {
          const { x, y } = normalizeCoords(place.lat, place.lng);
          const Icon = getCategoryIcon(place.category);
          const color = getCategoryColor(place.category);
          const isSelected = selectedPlace?.id === place.id;
          const isHighlighted = highlightedPlaces.includes(place.id);
          const shouldPulse = isSelected || isHighlighted;

          return (
            <g
              key={place.id}
              transform={`translate(${x}, ${y})`}
              onClick={() => onPlaceSelect(place)}
              className="cursor-pointer"
              style={{ transition: 'all 0.3s ease' }}
            >
              {shouldPulse && (
                <circle
                  r="20"
                  fill={color}
                  opacity="0.3"
                  className="animate-ping"
                />
              )}
              <circle
                r="12"
                fill={isSelected ? color : '#FFD93D'}
                stroke="#1A1A1A"
                strokeWidth="2"
                className="transition-all"
              />
              <foreignObject x="-8" y="-8" width="16" height="16">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon className="w-3 h-3" style={{ color: isSelected ? '#ffffff' : '#1A1A1A' }} />
                </div>
              </foreignObject>
              
              {isSelected && (
                <text
                  y="-20"
                  textAnchor="middle"
                  className="text-xs font-medium fill-current text-foreground"
                  style={{ pointerEvents: 'none' }}
                >
                  {place.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <div className="text-xs font-medium mb-2">Categories</div>
        <div className="space-y-1 text-xs">
          {['Coffee', 'Restaurant', 'Bar'].map((cat) => {
            const Icon = getCategoryIcon(cat);
            const color = getCategoryColor(cat);
            return (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                  <Icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span>{cat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map info */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-xs">
        <span className="text-muted-foreground">{places.length} places shown</span>
      </div>
    </div>
  );
};
