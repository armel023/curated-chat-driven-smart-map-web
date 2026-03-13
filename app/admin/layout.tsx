import React from 'react';
import AdminHeader from './admin-header';
import AdminNav from './admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <AdminHeader />
      </header>
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// interface BadgeProps {
//   children: React.ReactNode;
//   className?: string;
// }

// const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
//   return (
//     <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground ${className}`}>
//       {children}
//     </span>
//   );
// };
