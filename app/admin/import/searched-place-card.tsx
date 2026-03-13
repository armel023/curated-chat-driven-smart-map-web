import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SearchResult } from "@/types";
import { Check, MapPin } from "lucide-react";


export default function SearchedPlaceCard({  result, toggleSelection }: { result: SearchResult, toggleSelection: (id: string) => void }) {
  return (
    <Card
        key={result.id}
        className={`cursor-pointer transition-all ${
            result.selected ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => toggleSelection(result.id)}
        >
        <CardContent key={result.id} className="pt-6">
            <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                result.selected ? 'bg-primary border-primary' : 'border-border'
            }`}>
                {result.selected && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="truncate">{result.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{result.address}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{result.category}</Badge>
                {result.rating && (
                    <span className="text-sm text-muted-foreground">★ {result.rating}</span>
                )}
                </div>
            </div>
            </div>
        </CardContent>
    </Card>
)
}
