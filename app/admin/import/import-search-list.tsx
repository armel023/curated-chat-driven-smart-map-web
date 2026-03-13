import { Button } from "@/components/ui/button";
import { SearchResult } from "@/types";
import SearchedPlaceCard from "./searched-place-card";

export default function ImportSearchList({ handleImportSelected, searchResults, toggleSelection }: { handleImportSelected: () => void, searchResults: SearchResult[], toggleSelection: (id: string) => void }) {
  return (
        <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2>Search Results</h2>
        <Button onClick={handleImportSelected}>
          Import Selected ({searchResults.filter(r => r.selected).length})
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {searchResults.map((result) => (
          <SearchedPlaceCard key={result.id} result={result} toggleSelection={toggleSelection} />
        ))}
      </div>
    </div>
  )
}
