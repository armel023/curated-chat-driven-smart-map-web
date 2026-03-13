"use client";
import { LogoWithText } from '@/components/Logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function AdminHeader() {
    const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    redirect('/login');
  };
  return (
    <div className=" px-4 h-16 flex items-center justify-between">
          <LogoWithText />
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name} <Badge className="ml-2">Admin</Badge>
            </span>
            <Button variant="outline" size="sm" onClick={() => redirect('/map')}>
              {/* <Map className="w-4 h-4 mr-2" /> */}
              View Map
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
  )
}
