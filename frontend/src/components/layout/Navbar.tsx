import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Sparkles, 
  Bell, 
  User as UserIcon, 
  ChevronDown, 
  Shield, 
  LogOut, 
  ExternalLink,
  Compass,
  Cpu
} from 'lucide-react';
import { NavigationTab } from '../../store/useAppStore';
import { User, UserRole } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface NavbarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: User | null;
  onSelectRole: (role: UserRole) => void;
  notifications: Array<{ id: string; title: string; message: string; type: string; timestamp: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  user,
  onSelectRole,
  notifications
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles: UserRole[] = ['ARCHITECT', 'ENGINEER', 'HOMEOWNER', 'CONTRACTOR', 'DEVELOPER'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                BuildVerse<span className="text-cyan-400">.AI</span>
              </span>
              <Badge variant="electric" size="sm">ENTERPRISE</Badge>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium hidden sm:block">
              AR Digital Twin Platform
            </p>
          </div>
        </div>

        {/* Center Primary Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'landing' ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('configurator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'configurator' ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            3D BIM Configurator
          </button>
          <button
            onClick={() => onNavigate('ar_experience')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ar_experience' ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            WebXR AR Studio
          </button>
          <button
            onClick={() => onNavigate('wizard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'wizard' ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Generator</span>
          </button>
        </nav>

        {/* Right Action Tools: Role Selector, Notifications, User */}
        <div className="flex items-center gap-3">
          {/* Live AI Status Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-300">AI Core Active</span>
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="capitalize">{user?.role.toLowerCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase">
                  Switch Persona / RBAC
                </div>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onSelectRole(role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      user?.role === role ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{role}</span>
                    {user?.role === role && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  <Badge variant="electric" size="sm">{notifications.length} New</Badge>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-slate-800/50 border border-slate-750 text-xs">
                      <p className="font-semibold text-slate-200">{n.title}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-cyan-400 font-mono mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Action / Instant Auth Trigger */}
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
          >
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
              alt="Avatar"
              className="w-7 h-7 rounded-lg object-cover"
            />
            <span className="text-xs font-medium text-slate-200 hidden xl:block pr-2">
              {user?.full_name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
