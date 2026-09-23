import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { NavigationTab } from '../../store/useAppStore';
import { User, UserRole } from '../../types';

interface AppLayoutProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: User | null;
  onSelectRole: (role: UserRole) => void;
  notifications: Array<{ id: string; title: string; message: string; type: string; timestamp: string }>;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  activeTab,
  onNavigate,
  user,
  onSelectRole,
  notifications,
  children
}) => {
  const isLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={onNavigate}
        user={user}
        onSelectRole={onSelectRole}
        notifications={notifications}
      />

      {/* Main Container Area */}
      <div className="flex-1 flex w-full">
        {/* Render Sidebar only for dashboard / app workspace routes */}
        {!isLanding && (
          <Sidebar activeTab={activeTab} onNavigate={onNavigate} />
        )}

        {/* Dynamic Page Content */}
        <main className={`flex-1 w-full overflow-y-auto ${!isLanding ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
