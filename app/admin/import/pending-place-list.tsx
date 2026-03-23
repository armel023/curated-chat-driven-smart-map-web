"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PendingPlaceCard } from "./pending-place-card";
import { usePlaces } from "@/contexts/PlacesContext";

export default function PendingPlaceList() {
      const { getPendingPlaces } = usePlaces();
      const pendingPlaces = getPendingPlaces();
  return (
    
      <div className="space-y-4">
        <h2>Pending Review ({pendingPlaces.length})</h2>
        
        {pendingPlaces.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No places pending review
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingPlaces.map((place) => (
              <PendingPlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
  );
}
