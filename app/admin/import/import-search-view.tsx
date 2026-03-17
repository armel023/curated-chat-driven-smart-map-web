"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import ImportSearchList from './import-search-list'
import { toast } from 'sonner'
import { importPlaces } from '@/actions/import-action'
import { useState } from 'react'
import { SearchResult } from '@/types'
import { usePlaces } from '@/contexts/PlacesContext'
import { searchPlaceNearbyToImport } from '@/actions/search-import-action';

export default function ImportSearchView() {
    const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const { reloadPlaces } = usePlaces();


  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    
    const searchedData: SearchResult[] = await searchPlaceNearbyToImport(searchQuery);
    console.log("Search results:", searchedData);
    setSearchResults(searchedData);
    setSearching(false);
    // Mock search results
    // setTimeout(() => {
      
    //   setSearchResults(mockResults);
    //   setSearching(false);
    // }, 1000);
  };

  const toggleSelection = (id: string) => {
    console.log("Toggling selection for ID:", id);
    console.log("Current search results before toggle:", searchResults);
    setSearchResults(prev =>
      prev.map(result =>
        result.id === id ? { ...result, selected: !result.selected } : result
      )
    );
  };

  const delayedReloadPlaces = () => {
    setTimeout(async () => {
      await reloadPlaces();
    }, 1000);
    };
  const handleImportSelected = async () => {
    const selectedResults = searchResults.filter(r => r.selected);
    
    if (selectedResults.length === 0) {
      toast.error('Please select at least one place to import');
      return;
    }

    await importPlaces(selectedResults.map(r => r.id));
    delayedReloadPlaces();

    toast.success(`${selectedResults.length} place(s) imported successfully`);
    const remainingResults = searchResults.filter(r => !r.selected);
    setSearchResults(remainingResults);
    // setSearchQuery('');
  };
  return (
    <>
          <div>
        <h1 className="mb-2">Import Places</h1>
        <p className="text-muted-foreground">
          Search for places to import and add them to pending review
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search for places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={searching}>
              <Search className="w-4 h-4 mr-2" />
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <ImportSearchList
          handleImportSelected={handleImportSelected}
          searchResults={searchResults}
          toggleSelection={toggleSelection}
        />
      )}
    </>
  )
}
