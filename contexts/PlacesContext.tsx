"use client";
import { getPlaceList } from '@/actions/places-action';
import { useFetchPlaces } from '@/hooks/callbacks/useFetchPlaces';
import useUpdatePlaceStatus from '@/hooks/callbacks/useUpdatePlaces';
// import { mockPlaces } from '@/mock/data/places';
import { Place } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PlacesContextType {
  places: Place[];
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
  const [places, setPlaces] = useState<Place[]>([]);
  const refetchPlaces = useFetchPlaces();
  const updatePlaceStatus = useUpdatePlaceStatus();

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
    setPlaces((prev) =>
      prev.map((place) => (place.id === id ? { ...place, ...updates } : place))
    );
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
    return places.filter((place) => place.status === 'APPROVED' && place.visibleToPublic);
  };

  const getApprovedPlaces = () => {
    return places.filter((place) => place.status === 'APPROVED');
  };

  const getPendingPlaces = () => {
    return places.filter((place) => place.status === 'PENDING');
  };

  const value: PlacesContextType = {
    places,
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
