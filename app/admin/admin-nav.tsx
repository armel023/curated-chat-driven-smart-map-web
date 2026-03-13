"use client";
import { Button } from "@/components/ui/button";
import { FolderOpen, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
    const navItems = [
        { path: '/admin/import', label: 'Import Places', icon: Upload },
        { path: '/admin/places', label: 'Manage Places', icon: FolderOpen },
    ];
    const pathName = usePathname();
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r bg-card sticky top-16">
        <nav className="p-4 space-y-2">
        {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathName === item.path;
            
            return (
            <Link key={item.path} href={item.path}>
                <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
                </Button>
            </Link>
            );
        })}
        </nav>
    </aside>
  );
}
