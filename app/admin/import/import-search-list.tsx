import { Button } from "@/components/ui/button";
import { SearchResult } from "@/types";
import SearchedPlaceCard from "./searched-place-card";

export default function ImportSearchList({
  handleImportSelected,
  searchResults,
  toggleSelection,
  handleSearchMore,
}: {
  handleImportSelected: () => void;
  searchResults: SearchResult[];
  toggleSelection: (id: string) => void;
  handleSearchMore: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2>Search Results</h2>
          <Button onClick={handleSearchMore}>Search More Result</Button>
        </div>
        <Button onClick={handleImportSelected}>
          Import Selected ({searchResults.filter((r) => r.selected).length})
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {searchResults.map((result) => (
          <SearchedPlaceCard
            key={result.id}
            result={result}
            toggleSelection={toggleSelection}
          />
        ))}
      </div>
    </div>
  );
}
