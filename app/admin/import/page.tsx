"use client";
import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';

import { Search } from 'lucide-react';
import { usePlaces} from '../../../contexts/PlacesContext';
import { toast } from 'sonner';
import { Place, SearchResult } from '@/types';
import ImportSearchList from './import-search-list';
import { mockResults } from '@/mock/data/search-result';
import { PendingPlaceCard } from './pending-place-card';



export default function AdminImportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const { addPlace, getPendingPlaces } = usePlaces();
  const pendingPlaces = getPendingPlaces();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    
    // Mock search results
    setTimeout(() => {
      
      setSearchResults(mockResults);
      setSearching(false);
    }, 1000);
  };

  const toggleSelection = (id: string) => {
    setSearchResults(prev =>
      prev.map(result =>
        result.id === id ? { ...result, selected: !result.selected } : result
      )
    );
  };

  const handleImportSelected = () => {
    const selectedResults = searchResults.filter(r => r.selected);
    
    if (selectedResults.length === 0) {
      toast.error('Please select at least one place to import');
      return;
    }

    selectedResults.forEach(result => {
      const newPlace: Omit<Place, 'id'> = {
        name: result.name,
        address: result.address,
        lat: result.lat,
        lng: result.lng,
        category: result.category,
        tags: [],
        neighborhood: 'Copenhagen',
        description: 'Imported place awaiting review.',
        aiSummary: 'AI summary to be generated.',
        status: 'PENDING',
        visibleToPublic: false,
        openingHours: {
          monday: { open: '09:00', close: '17:00' },
          tuesday: { open: '09:00', close: '17:00' },
          wednesday: { open: '09:00', close: '17:00' },
          thursday: { open: '09:00', close: '17:00' },
          friday: { open: '09:00', close: '17:00' },
          saturday: { open: '10:00', close: '16:00' },
          sunday: null,
        },
        rating: result.rating,
        placeId: result.id,
      };
      addPlace(newPlace);
    });

    toast.success(`${selectedResults.length} place(s) imported successfully`);
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};


