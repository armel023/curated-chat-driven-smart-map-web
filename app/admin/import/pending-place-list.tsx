"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PendingPlaceCard } from "./pending-place-card";
import { usePlaces } from "@/contexts/PlacesContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function PendingPlaceList() {
  const { getPendingPlaces, reloadPlaces } = usePlaces();
  const pendingPlaces = getPendingPlaces();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await reloadPlaces();
    setRefreshing(false);
  };

  return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Pending Review ({pendingPlaces.length})</h2>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
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
