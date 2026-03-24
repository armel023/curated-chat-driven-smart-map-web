"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function GuestNoticeOverlay() {
  const { data: session } = useSession();
  const isGuest = !session;
  console.log("GuestNoticeOverlay session:", session);
  return (
    isGuest && (
      <div className="fixed bottom-4 left-4 bg-card border rounded-lg p-4 shadow-lg max-w-sm z-50">
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
    )
  );
}
