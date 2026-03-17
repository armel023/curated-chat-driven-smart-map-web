"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { usePlaces } from "@/contexts/PlacesContext";
import { Place } from "@/types";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditPlaceFormProps {
  place: Place;
}

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

export default function EditPlaceForm({ place }: EditPlaceFormProps) {
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
        {/* <div className="flex flex-wrap gap-2">
          {COMMON_TAGS && COMMON_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={formData.tags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div> */}
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
}
