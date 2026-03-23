import React from 'react';
import { PlacesProvider } from '@/contexts/PlacesContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlacesProvider>
        {children}
    </PlacesProvider> 
  );
};