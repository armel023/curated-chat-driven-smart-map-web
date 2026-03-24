"use client";
import { getPlaceList } from '@/actions/places-action';
import { useFetchPrimaryCategories, useFetchSubCategories } from '@/hooks/callbacks/useFetchCategories';
import { useFetchNeighborhoods } from '@/hooks/callbacks/useFetchNeighborhood';
import { useFetchPlaces } from '@/hooks/callbacks/useFetchPlaces';
import { useFetchTags } from '@/hooks/callbacks/userFetchTags';
import useUpdatePlaceData from '@/hooks/callbacks/useUpdatePlaceData';
import useUpdatePlaceStatus from '@/hooks/callbacks/useUpdatePlaces';
// import { mockPlaces } from '@/mock/data/places';
import { Neighborhood, Place, PrimaryCategory, SubCategory, Tag } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PlacesContextType {
  places: Place[];
  primaryCategories: PrimaryCategory[];
  subCategories: SubCategory[];
  neighborhoods: Neighborhood[];
  tags: Tag[];
  addPlace: (place: Omit<Place, 'id'>) => void;
  updatePlace: (id: string, updates: Partial<Place>) => void;
  deletePlace: (id: string) => void;
  approvePlace: (id: string) => void;
  rejectPlace: (id: string) => void;
  getPublicPlaces: () => Place[];
  getApprovedPlaces: () => Place[];
  getPendingPlaces: () => Place[];
  setPlaces: (places: Place[]) => void;
  reloadPlaces: () => Promise<void>;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within PlacesProvider');
  }
  return context;
};

export const PlacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [primaryCategories, setPrimaryCategories] = useState<PrimaryCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // Categories, Neighborhoods, Tags
  const fetchPrimaryCategories = useFetchPrimaryCategories();
  const fetchSubCategories = useFetchSubCategories();
  const fetchNeighborhoods = useFetchNeighborhoods();
  const fetchTags = useFetchTags();

  useEffect(() => {
    async function fetchData() {
      try {
        const [primaryData, subData, neighborhoodData, tagData] = await Promise.all([
          fetchPrimaryCategories(),
          fetchSubCategories(),
          fetchNeighborhoods(),
          fetchTags()
        ]);
        setPrimaryCategories(primaryData);
        setSubCategories(subData);
        setNeighborhoods(neighborhoodData);
        setTags(tagData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchPrimaryCategories, fetchSubCategories, fetchNeighborhoods, fetchTags]);
  
  const [places, setPlaces] = useState<Place[]>([]);
  // PLACE
  const refetchPlaces = useFetchPlaces();
  const updatePlaceStatus = useUpdatePlaceStatus();
  const updatePlaceData = useUpdatePlaceData();

  const reloadPlaces = async () => {
    try {
      const data = await refetchPlaces('');
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPlaceList('');
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [setPlaces]);
  
  const addPlace = (place: Omit<Place, 'id'>) => {
    const newPlace: Place = {
      ...place,
      id: Math.random().toString(36).substring(7),
    };
    setPlaces((prev) => [...prev, newPlace]);
  };

  const updatePlace = (id: string, updates: Partial<Place>) => {
    updatePlaceData(id, updates);
    reloadPlaces();
  };

  const deletePlace = (id: string) => {
    setPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  const approvePlace = async (id: string) => {
    await updatePlaceStatus(id, 'APPROVED');
    reloadPlaces();
  };

  const rejectPlace = async (id: string) => {
    await updatePlaceStatus(id, 'REJECTED');
    reloadPlaces();
  };

  const getPublicPlaces = () => {
    return places.filter((place) => place.status === 'APPROVED' && place.isPublic);
  };

  const getApprovedPlaces = () => {
    return places.filter((place) => place.status === 'APPROVED');
  };

  const getPendingPlaces = () => {
    return places.filter((place) => place.status === 'PENDING');
  };

  const value: PlacesContextType = {
    places,
    primaryCategories,
    subCategories,
    neighborhoods,
    tags,
    addPlace,
    updatePlace,
    deletePlace,
    approvePlace,
    rejectPlace,
    getPublicPlaces,
    getApprovedPlaces,
    getPendingPlaces,
    setPlaces,
    reloadPlaces
  };

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
};
