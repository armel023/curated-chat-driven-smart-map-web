"use client";
import { logOutAction } from "@/actions/login-action";
import LogoImg from "@/components/LogoImg";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HeaderSection() {
  const { data: session, update } = useSession();
  const isGuest = !session;
  const isAdmin = session?.user?.isAdmin || false;

  const handleLogout = async () => {
    await logOutAction();
    await update();
  };

  return (
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
                <User className="w-4 h-4 text-white" />
                {/* <span className="text-sm hidden sm:inline">{user?.name}</span> */}
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
              <Button
                className="bg-white"
                size="sm"
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
