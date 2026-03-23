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
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  poiInfo?: string;
  places: Place[];
}

const defaults = {
  zoom: 15,
  maxZoom: 19,
};

export default function Map({
  posix,
  zoom = defaults.zoom,
  poiInfo,
  places = [],
}: MapProps) {
  console.log("Rendering Map with posix:", posix, "and zoom:", zoom);
  function ChangeView({ center }: { center: LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
  }

  return (
    <MapContainer
      center={
        places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0]
      }
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker key={place.id} position={[place.latitude, place.longitude]}>
          {/* <Popup>
            <div>
              <h3 className="font-bold">{place.name}</h3>
              <p>{place.primaryCategory}</p>
            </div>
          </Popup> */}
          <Tooltip permanent direction="top" offset={[0, -10]}>
            {place.name || "Unnamed location"}
          </Tooltip>
        </Marker>
      ))}
      <ChangeView center={posix as LatLngTuple} />
    </MapContainer>
  );
}
