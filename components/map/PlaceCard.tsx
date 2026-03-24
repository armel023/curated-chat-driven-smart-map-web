import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Clock, ExternalLink, Star } from 'lucide-react';
import { Place } from '@/types';

interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  onClick: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, isSelected, onClick }) => {
  const isOpenNow = () => {
    const now = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayNames[now.getDay()];
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todayHours = place.openingHours?.[today];
    if (!todayHours) return false;

    const [openHour, openMin] = todayHours.open.split(':').map(Number);
    const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const openNow = isOpenNow();

  const openGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would open Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`;
    window.open(url, '_blank');
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="truncate">{place.name}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{place.address}</span>
              </div>
            </div>
            
            {place.rating && (
              <div className="flex items-center gap-1 text-sm flex-shrink-0">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{place.rating}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {place.aiSummary}
          </p>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="default" className="text-xs">
              {place.primaryCategory || 'Uncategorized'}
            </Badge>
            {place.subCategories && place.subCategories.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {place.subCategories[0]}
              </Badge>
            )}
            {place.neighborhood && (
              <Badge variant="secondary" className="text-xs">
                {place.neighborhood}
              </Badge>
            )}
            {place.tags && place.tags.length > 0 && (
              place.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className={`text-xs ${openNow ? 'text-green-600' : 'text-red-600'}`}>
                {openNow ? 'Open now' : 'Closed'}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={openGoogleMaps}
              className="h-7 text-xs"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Google Maps
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
