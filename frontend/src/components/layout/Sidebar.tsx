import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Box, 
  Camera, 
  Sofa, 
  ShoppingBag, 
  Bot, 
  Calculator, 
  Leaf, 
  CheckSquare, 
  Users2, 
  FileText, 
  Settings as SettingsIcon,
  ChevronRight,
  Globe
} from 'lucide-react';
import { NavigationTab } from '../../store/useAppStore';

interface SidebarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate }) => {
  const menuItems: Array<{ id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'dashboard', label: "Executive Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'wizard', label: "AI Project Wizard", icon: <Sparkles className="w-4 h-4 text-cyan-400" />, badge: "AI" },
    { id: 'configurator', label: "3D BIM Configurator", icon: <Box className="w-4 h-4" /> },
    { id: 'ar_experience', label: "WebXR AR Experience", icon: <Camera className="w-4 h-4 text-emerald-400" />, badge: "AR" },
    { id: 'interior', label: "Interior Staging 3D", icon: <Sofa className="w-4 h-4" /> },
    { id: 'materials', label: "Material Marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ai_assistant', label: "AI Design Copilot", icon: <Bot className="w-4 h-4 text-purple-400" />, badge: "GPT-4o" },
    { id: 'cost', label: "Cost & BOQ Engine", icon: <Calculator className="w-4 h-4" /> },
    { id: 'sustainability', label: "Sustainability & LEED", icon: <Leaf className="w-4 h-4 text-emerald-400" /> },
    { id: 'progress', label: "Site Progress & AI Defect", icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'collaboration', label: "Digital Twin & Team", icon: <Users2 className="w-4 h-4" /> },
    { id: 'reports', label: "Reports & PDF Export", icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: "Platform Settings", icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-slate-950/70 backdrop-blur-xl border-r border-slate-800/80 shrink-0 hidden lg:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-bold">
            Platform Modules
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      {item.badge}
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Cloud Sync & Digital Twin Live Badge */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Digital Twin Live</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Real-time BIM synchronization with cloud spatial telemetry.
        </p>
      </div>
    </aside>
  );
};
