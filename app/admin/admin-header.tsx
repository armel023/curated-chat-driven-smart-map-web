"use client";
import { LogoWithText } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function AdminHeader() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    redirect("/login");
  };
  return (
    <div className=" px-4 h-16 flex items-center justify-between bg-primary">
      <div className="flex justify-center bg-primary p-4 rounded">
        <Image
          src={
            "https://lirp.cdn-website.com/d0f7b8b4/dms3rep/multi/opt/Kopi+af+Kopi+af+Kopi+af+Kopi+af+Kopi+af+Kopi+af+paint+%282500+x+1080+px%29+%282500+x+2000+px%29+%282500+x+800+px%29+%282500+x+300+px%29+%282000+x+300+px%29+%282%29-1920w.png"
          }
          alt={"logo"}
          width={150}
          height={22}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {user?.name} <Badge className="ml-2">Admin</Badge>
        </span>
        <Button variant="outline" size="sm" onClick={() => redirect("/map")}>
          {/* <Map className="w-4 h-4 mr-2" /> */}
          View Map
        </Button>
        <Button
          className="bg-white"
          variant="ghost"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2 c" />
          Logout
        </Button>
      </div>
    </div>
  );
}
