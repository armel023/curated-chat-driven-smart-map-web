import { PlacesProvider } from '@/contexts/PlacesContext'
import React from 'react'

export default function ImportLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlacesProvider>
        {children}
    </PlacesProvider> 
  )
}
