import React from 'react';
import { Building2, Globe, ShieldCheck, Heart, ExternalLink, Share2 } from 'lucide-react';
import { NavigationTab } from '../../store/useAppStore';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
        
        {/* Col 1: Platform Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              BuildVerse<span className="text-cyan-400">.AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Enterprise AI-powered AR Construction Planning, Visualization & Digital Twin Platform. Empowering precision engineering before groundbreak.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="https://autodesk.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white transition cursor-pointer" title="Global BIM Network">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://buildverse.ai" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white transition cursor-pointer" title="Enterprise Cloud">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="https://smartindiahackathon.gov.in" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white transition cursor-pointer" title="Smart India Hackathon Showcase">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Architecture & Tools */}
        <div className="space-y-3">
          <p className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Tools & BIM Engine</p>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('configurator')} className="hover:text-cyan-400 transition cursor-pointer">3D BIM Configurator</button></li>
            <li><button onClick={() => onNavigate('ar_experience')} className="hover:text-cyan-400 transition cursor-pointer">WebXR AR Spatial Placement</button></li>
            <li><button onClick={() => onNavigate('wizard')} className="hover:text-cyan-400 transition cursor-pointer">Generative AI Building Engine</button></li>
            <li><button onClick={() => onNavigate('interior')} className="hover:text-cyan-400 transition cursor-pointer">3D Interior Staging</button></li>
            <li><button onClick={() => onNavigate('materials')} className="hover:text-cyan-400 transition cursor-pointer">Global Material Marketplace</button></li>
          </ul>
        </div>

        {/* Col 3: Analytics & Audits */}
        <div className="space-y-3">
          <p className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Intelligence & Compliance</p>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('cost')} className="hover:text-cyan-400 transition cursor-pointer">Dynamic BOQ & Cost Estimator</button></li>
            <li><button onClick={() => onNavigate('sustainability')} className="hover:text-cyan-400 transition cursor-pointer">LEED & Carbon Footprint Audit</button></li>
            <li><button onClick={() => onNavigate('progress')} className="hover:text-cyan-400 transition cursor-pointer">AI Computer Vision Defect Detection</button></li>
            <li><button onClick={() => onNavigate('collaboration')} className="hover:text-cyan-400 transition cursor-pointer">Digital Twin Live Collaboration</button></li>
            <li><button onClick={() => onNavigate('reports')} className="hover:text-cyan-400 transition cursor-pointer">Executive BOQ PDF Export</button></li>
          </ul>
        </div>

        {/* Col 4: Enterprise Standards */}
        <div className="space-y-3">
          <p className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Enterprise Security</p>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>SOC2 Type II & ISO 27001</span>
            </div>
            <p className="text-[11px] text-slate-400">
              End-to-end encrypted IFC/BIM data streams with multi-tenant RBAC isolation.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 BuildVerse AI Platform. Design. Visualize. Build. Experience.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-white transition cursor-pointer">Zoning Compliance Docs</span>
        </div>
      </div>
    </footer>
  );
};
