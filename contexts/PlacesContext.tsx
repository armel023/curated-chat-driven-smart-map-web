"use client";
import { getPlaceList } from '@/actions/places-action';
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

  const approvePlace = (id: string) => {
    updatePlace(id, { status: 'APPROVED' });
  };

  const rejectPlace = (id: string) => {
    updatePlace(id, { status: 'REJECTED' });
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
    setPlaces
  };

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
};
