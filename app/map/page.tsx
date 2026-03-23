"use client";
import { LogoWithText } from "@/components/Logo";
import LogoImg from "@/components/LogoImg";
import { ChatInterface } from "@/components/map/ChatInterface";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePlaces } from "@/contexts/PlacesContext";
import { Place } from "@/types";
import { LogIn, LogOut, User } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
// import { useAuth } from '../contexts/AuthContext';
// import { usePlaces, Place } from '../contexts/PlacesContext';
// import { InteractiveMap } from '../components/map/InteractiveMap';
// import { ChatInterface } from '../components/map/ChatInterface';
// import { LogoWithText } from '../components/Logo';
// import { Button } from '../components/ui/button';
// import { LogIn, LogOut, User } from 'lucide-react';
// import { useNavigate } from 'react-router';
// import { processChatQuery, filterPlacesByQuery, generateResponse } from '../utils/chatProcessor';

export default function MapPage() {
  const { user, isGuest, isAdmin, logout } = useAuth();
  const { getPublicPlaces, getApprovedPlaces } = usePlaces();
  //   const navigate = useNavigate();

  // Determine available places based on user role
  const availablePlaces = useMemo(() => {
    // if (isGuest) {
    //   return getPublicPlaces(); // Only public places for guests
    // } else {
    return getApprovedPlaces(); // All approved places for logged-in users
    // }
  }, [isGuest, getPublicPlaces, getApprovedPlaces]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filteredPlaces, setFilteredPlaces] =
    useState<Place[]>(availablePlaces);
  const [highlightedPlaces, setHighlightedPlaces] = useState<string[]>([]);

  // Update filtered places when available places change
  useEffect(() => {
    setFilteredPlaces(availablePlaces);
  }, [availablePlaces]);

  const handleSearch = (query: string) => {
    // const chatQuery = processChatQuery(query);
    // const results = filterPlacesByQuery(availablePlaces, chatQuery);
    // setFilteredPlaces(results);
    // setHighlightedPlaces(results.map((p) => p.id));
    // // Auto-select first result
    // if (results.length > 0) {
    //   setSelectedPlace(results[0]);
    // }
    // const response = generateResponse(query, results, chatQuery);
    // return { places: results, response };
    return {
      places: [],
      response: "Search functionality is not implemented yet.",
    };
  };

  const handleLogout = () => {
    logout();
    // navigate("/login");
    redirect("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm z-10 bg-primary rounded">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between ">
          <LogoImg />

          <div className="flex items-center gap-3">
            {isGuest ? (
              <>
                <span className="text-sm  hidden sm:inline">
                  Browsing as Guest
                </span>
                <Button size="sm" onClick={() => redirect("/login")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm hidden sm:inline">{user?.name}</span>
                </div>
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => redirect("/admin/import")}
                  >
                    Admin Panel
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Map Section */}
        <div className="flex-1 p-4 h-[50vh] md:h-auto">
          <InteractiveMap
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onPlaceSelect={setSelectedPlace}
            highlightedPlaces={highlightedPlaces}
          />
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-[450px] border-l flex flex-col h-[50vh] md:h-auto">
          <ChatInterface
            onSearch={handleSearch}
            onPlaceSelect={setSelectedPlace}
            selectedPlace={selectedPlace}
          />
        </div>
      </div>

      {/* Guest Notice */}
      {/* {isGuest && (
        <div className="fixed bottom-4 left-4 bg-card border rounded-lg p-4 shadow-lg max-w-sm">
          <p className="text-sm mb-2">
            You are currently browsing as a guest. Sign up to access all places
            and features!
          </p>
          <Button
            size="sm"
            className="w-full"
            onClick={() => redirect("/register")}
          >
            Sign up to see all places
          </Button>
        </div>
      )} */}
    </div>
  );
}
