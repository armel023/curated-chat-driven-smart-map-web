"use client";
import React, { useEffect, useState } from 'react';
import { usePlaces } from '../../../contexts/PlacesContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Textarea } from '../../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Edit2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Place } from '@/types';
import { getPlaceList } from '@/actions/places-action';

const CATEGORIES = ['Coffee', 'Restaurant', 'Bar', 'Museum', 'Park', 'Shopping', 'Entertainment'];
const SUB_CATEGORIES = {
  Coffee: ['Specialty Coffee', 'Café', 'Bakery'],
  Restaurant: ['Fine Dining', 'Casual Dining', 'Street Food', 'Danish Cuisine'],
  Bar: ['Cocktail Bar', 'Wine Bar', 'Beer Garden'],
  Museum: ['Art Museum', 'History Museum', 'Science Museum'],
  Park: ['City Park', 'Botanical Garden', 'Beach'],
  Shopping: ['Boutique', 'Market', 'Shopping Mall'],
  Entertainment: ['Theater', 'Cinema', 'Live Music'],
};
const NEIGHBORHOODS = ['Indre By', 'Nørrebro', 'Vesterbro', 'Østerbro', 'Christianshavn', 'Refshaleøen', 'Islands Brygge'];
const COMMON_TAGS = ['Outdoor Seating', 'Canal View', 'Family Friendly', 'Pet Friendly', 'Historic', 'Modern', 'Minimalist', 'Casual', 'Organic'];

export default function AdminPlacesPage() {
  const { places, getApprovedPlaces} = usePlaces();
  const approvedPlaces = getApprovedPlaces();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = approvedPlaces.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Manage Places</h1>
        <p className="text-muted-foreground">
          Edit place details, categories, and visibility settings
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredPlaces.map((place) => (
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
                    {place.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPlace(place)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Place</DialogTitle>
                    </DialogHeader>
                    {selectedPlace?.id === place.id && <EditPlaceForm place={place} />}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No places found
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface EditPlaceFormProps {
  place: Place;
}

const EditPlaceForm: React.FC<EditPlaceFormProps> = ({ place }) => {
  const { updatePlace } = usePlaces();
  const [formData, setFormData] = useState(place);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlace(place.id, formData);
    toast.success('Place updated successfully');
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const generateAISummary = () => {
    const summaries = [
      `Highly-rated ${formData.category.toLowerCase()} spot in ${formData.neighborhood} known for its exceptional quality and atmosphere.`,
      `Popular ${formData.category.toLowerCase()} destination featuring ${formData.tags[0]?.toLowerCase() || 'great ambiance'} and authentic experience.`,
      `Local favorite ${formData.category.toLowerCase()} in ${formData.neighborhood} offering memorable visits and quality service.`,
    ];
    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
    setFormData(prev => ({ ...prev, aiSummary: randomSummary }));
    toast.success('AI summary regenerated');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Primary Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: undefined })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subCategory">Sub Category</Label>
          <Select
            value={formData.subCategory || ''}
            onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sub category" />
            </SelectTrigger>
            <SelectContent>
              {SUB_CATEGORIES[formData.category as keyof typeof SUB_CATEGORIES]?.map((subCat) => (
                <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="neighborhood">Neighborhood</Label>
        <Select
          value={formData.neighborhood}
          onValueChange={(value) => setFormData({ ...formData, neighborhood: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NEIGHBORHOODS.map((hood) => (
              <SelectItem key={hood} value={hood}>{hood}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {COMMON_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={formData.tags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="aiSummary">AI-Generated USP Summary</Label>
          <Button type="button" variant="outline" size="sm" onClick={generateAISummary}>
            <RefreshCw className="w-3 h-3 mr-2" />
            Regenerate
          </Button>
        </div>
        <Textarea
          id="aiSummary"
          value={formData.aiSummary}
          onChange={(e) => setFormData({ ...formData, aiSummary: e.target.value })}
          rows={2}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label htmlFor="visibleToPublic" className="cursor-pointer">Visible to Public</Label>
          <p className="text-sm text-muted-foreground">Make this place visible to guest users</p>
        </div>
        <Switch
          id="visibleToPublic"
          checked={formData.visibleToPublic}
          onCheckedChange={(checked) => setFormData({ ...formData, visibleToPublic: checked })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};
