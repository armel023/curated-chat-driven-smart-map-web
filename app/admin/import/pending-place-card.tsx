import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePlaces } from "@/contexts/PlacesContext";
import { Place } from "@/types";
import { Check, MapPin, X } from "lucide-react";
import { toast } from "sonner";

interface PendingPlaceCardProps {
  place: Place;
}

export const PendingPlaceCard: React.FC<PendingPlaceCardProps> = ({ place }) => {
  const { approvePlace, rejectPlace } = usePlaces();

  const handleApprove = async () => {
    await approvePlace(place.id);
    toast.success(`${place.name} approved`);
  };

  const handleReject = async () => {
    await rejectPlace(place.id);
    toast.error(`${place.name} rejected`);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3>{place.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3" />
              <span>{place.address}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{place.category}</Badge>
            {place.rating && (
              <Badge variant="outline">★ {place.rating}</Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApprove} className="flex-1" size="sm">
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button onClick={handleReject} variant="destructive" className="flex-1" size="sm">
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};