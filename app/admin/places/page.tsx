"use client";
import {  useEffect, useState } from 'react';
import { usePlaces } from '../../../contexts/PlacesContext';
import { Card, CardContent} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Place } from '@/types';
import PlaceCard from './place-card';



export default function AdminPlacesPage() {
  const {reloadPlaces, getApprovedPlaces} = usePlaces();
  const approvedPlaces = getApprovedPlaces();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = approvedPlaces.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Initial load of places
    reloadPlaces();
   
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Manage Places</h1>
        <p className="text-muted-foreground">
          Edit place details, categories, and visibility settings
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} selectedPlaceId={selectedPlace?.id || null} onEdit={(p) => setSelectedPlace(p)} />
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No places found
          </CardContent>
        </Card>
      )}
    </div>
  );
};


