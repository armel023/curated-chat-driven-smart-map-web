"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";
import { Place } from "@/types";

interface MapProps {
  zoom?: number;
  places: Place[];
}

const defaults = {
  zoom: 15,
  maxZoom: 19,
};

export default function Map({ zoom = defaults.zoom, places = [] }: MapProps) {
  function FitBounds({ places }: { places: Place[] }) {
    const map = useMap();

    useEffect(() => {
      if (!places || places.length === 0) return;

      const bounds = places.map((place) => [
        place.latitude,
        place.longitude,
      ]) as LatLngTuple[];

      if (places.length === 1) {
        map.setView([places[0].latitude, places[0].longitude], 15);
      } else {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
      }
    }, [places, map]);

    return null;
  }

  return (
    <MapContainer
      center={
        places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0]
      }
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker key={place.id} position={[place.latitude, place.longitude]}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            {place.name || "Unnamed location"}
          </Tooltip>
        </Marker>
      ))}
      <FitBounds places={places} />
    </MapContainer>
  );
}
