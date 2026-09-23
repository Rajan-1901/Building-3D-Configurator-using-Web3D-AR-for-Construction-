import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pill' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pill'
}) => {
  if (variant === 'underline') {
    return (
      <div className="flex border-b border-slate-800 space-x-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 overflow-x-auto no-scrollbar gap-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
