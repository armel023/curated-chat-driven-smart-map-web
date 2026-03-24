"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { logOutAction } from "@/actions/login-action";
import LogoImg from "@/components/LogoImg";
import { useSession } from "next-auth/react";

export default function AdminHeader() {
  const { update } = useSession();
  const handleLogout = async () => {
    await logOutAction();
    await update();
  };
  return (
    <div className=" px-4 h-16 flex items-center justify-between bg-primary">
      <LogoImg />

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {/* {user?.name}  */}
          <Badge className="ml-2">Admin</Badge>
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
