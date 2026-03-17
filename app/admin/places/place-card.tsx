import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader} from '@/components/ui/dialog'
import { Place } from '@/types'
import { Edit2, Eye, EyeOff } from 'lucide-react'
import EditPlaceForm from './edit-place-form'

export default function PlaceCard( { place, selectedPlaceId, onEdit }: { place: Place; selectedPlaceId: string | null; onEdit: (place: Place) => void }) {
  return (
    <Card key={place.id}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3>{place.name}</h3>
              {place.visibleToPublic ? (
                <Eye className="w-4 h-4 text-primary" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{place.address}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{place.category}</Badge>
              {place.subCategory && <Badge variant="outline">{place.subCategory}</Badge>}
              <Badge variant="secondary">{place.neighborhood}</Badge>
              {place.tags && place.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => onEdit(place)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Place</DialogTitle>
              </DialogHeader>
              {selectedPlaceId === place.id && <EditPlaceForm place={place} />}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
