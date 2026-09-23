import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Box, 
  Camera, 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  FileText, 
  MessageSquare,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { NavigationTab } from '../store/useAppStore';
import { Project, User } from '../types';

interface DashboardProps {
  user: User | null;
  onNavigate: (tab: NavigationTab) => void;
  onSelectProject: (project: Project) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ user, onNavigate, onSelectProject }) => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Elysium Modern Eco-Villa",
      description: "2-Floor luxury sustainable villa with integrated solar canopy and smart ventilation.",
      owner_id: 1,
      status: "PLANNING",
      plot_width: 50,
      plot_length: 80,
      plot_area: 4000,
      location: "Palm Meadows, Bangalore",
      soil_type: "Red Loam",
      zoning_code: "R-2 Residential",
      building_type: "Modern Villa",
      architectural_style: "Modern Minimalist",
      num_floors: 2,
      bedrooms: 4,
      bathrooms: 4,
      target_budget: 185000,
      has_parking: true,
      has_garden: true,
      has_solar: true,
      has_rainwater: true,
      building_config: {
        architectural_style: "Modern Minimalist",
        num_floors: 2,
        wall_color: "#F8FAFC",
        roof_type: "flat_deck",
        has_balcony: true,
        has_garden: true,
        has_parking: true,
        has_solar: true,
        lighting_preset: "Day",
        x_ray_mode: false
      },
      version: 3,
      thumbnail_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      created_at: "2026-09-20T10:00:00Z",
      updated_at: "2026-09-23T14:30:00Z"
    },
    {
      id: 2,
      title: "Nordic Horizon Commercial Hub",
      description: "4-Story mass timber office complex with biophilic terraces and geothermal heating.",
      owner_id: 1,
      status: "UNDER_CONSTRUCTION",
      plot_width: 80,
      plot_length: 120,
      plot_area: 9600,
      location: "Whitefield Tech Park, Bangalore",
      soil_type: "Gravel Loam",
      zoning_code: "C-3 Commercial",
      building_type: "Commercial Hub",
      architectural_style: "Scandinavian",
      num_floors: 4,
      bedrooms: 0,
      bathrooms: 8,
      target_budget: 520000,
      has_parking: true,
      has_garden: true,
      has_solar: true,
      has_rainwater: true,
      building_config: {
        architectural_style: "Scandinavian",
        num_floors: 4,
        wall_color: "#D97706",
        roof_type: "flat_deck",
        has_balcony: true,
        has_garden: true,
        has_parking: true,
        has_solar: true,
        lighting_preset: "Day",
        x_ray_mode: false
      },
      version: 7,
      thumbnail_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      created_at: "2026-08-10T09:00:00Z",
      updated_at: "2026-09-22T16:00:00Z"
    },
    {
      id: 3,
      title: "Aura Cascades Duplex",
      description: "Contemporary twin duplex residence optimized for dual-family acoustic privacy.",
      owner_id: 1,
      status: "APPROVED",
      plot_width: 40,
      plot_length: 70,
      plot_area: 2800,
      location: "Indiranagar, Bangalore",
      soil_type: "Clay Sand",
      zoning_code: "R-1 Residential",
      building_type: "Duplex",
      architectural_style: "Contemporary",
      num_floors: 3,
      bedrooms: 5,
      bathrooms: 5,
      target_budget: 240000,
      has_parking: true,
      has_garden: true,
      has_solar: true,
      has_rainwater: false,
      building_config: {
        architectural_style: "Contemporary",
        num_floors: 3,
        wall_color: "#E2E8F0",
        roof_type: "flat_deck",
        has_balcony: true,
        has_garden: true,
        has_parking: true,
        has_solar: true,
        lighting_preset: "Day",
        x_ray_mode: false
      },
      version: 4,
      thumbnail_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      created_at: "2026-09-01T12:00:00Z",
      updated_at: "2026-09-21T18:00:00Z"
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Greeting & Quick AI Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Executive Digital Twin Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Welcome back, <span className="text-white font-semibold">{user?.full_name || "Alexander Vance"}</span> ({user?.role || "Architect"}). 3 projects synchronized with live BIM telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="md"
            leftIcon={<Camera className="w-4 h-4 text-cyan-400" />}
            onClick={() => onNavigate('ar_experience')}
          >
            WebXR AR Studio
          </Button>
          <Button
            variant="electric"
            size="md"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={() => onNavigate('wizard')}
          >
            New AI Project
          </Button>
        </div>
      </div>

      {/* 2. Key Executive KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Active Digital Twins</span>
            <span className="p-2 rounded-xl bg-blue-500/20 text-cyan-400"><Building2 className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">3</span>
            <Badge variant="success" size="sm">+1 this month</Badge>
          </div>
          <p className="text-[11px] text-slate-400">100% cloud BIM synced</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Portfolio Value</span>
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400"><DollarSign className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">$945,000</span>
            <Badge variant="electric" size="sm">BOQ Verified</Badge>
          </div>
          <p className="text-[11px] text-slate-400">Avg. $75/sq.ft cost index</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">LEED Green Score</span>
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400"><Leaf className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">94 / 100</span>
            <Badge variant="success" size="sm">Platinum</Badge>
          </div>
          <p className="text-[11px] text-slate-400">12.4 kW annual solar offset</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">AI Inspection Integrity</span>
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400"><ShieldCheck className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">98.5%</span>
            <Badge variant="purple" size="sm">0 Critical Defects</Badge>
          </div>
          <p className="text-[11px] text-slate-400">142 structural joints verified</p>
        </Card>
      </div>

      {/* 3. Active Digital Twin Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Active Digital Twin Projects</h2>
            <p className="text-xs text-slate-400">Real-time parametric BIM models with AR site alignment.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('wizard')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Card key={proj.id} className="p-0 overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Project Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={proj.thumbnail_url}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <Badge variant={proj.status === 'UNDER_CONSTRUCTION' ? 'warning' : proj.status === 'APPROVED' ? 'success' : 'electric'}>
                      {proj.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-mono text-cyan-400 border border-white/10">
                    v{proj.version}.0 BIM
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">AREA</span>
                      <span className="text-slate-200 font-semibold">{proj.plot_area.toLocaleString()} sq.ft</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">BUDGET</span>
                      <span className="text-cyan-400 font-semibold">${proj.target_budget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">FLOORS</span>
                      <span className="text-slate-200 font-semibold">{proj.num_floors} Levels</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">STYLE</span>
                      <span className="text-slate-200 font-semibold truncate">{proj.architectural_style}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Box className="w-3.5 h-3.5" />}
                  onClick={() => {
                    onSelectProject(proj);
                    onNavigate('configurator');
                  }}
                >
                  3D Studio
                </Button>
                <Button
                  variant="electric"
                  size="sm"
                  leftIcon={<Camera className="w-3.5 h-3.5" />}
                  onClick={() => {
                    onSelectProject(proj);
                    onNavigate('ar_experience');
                  }}
                >
                  Launch AR
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Split Insights: AI Design Copilot & Site Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* AI Copilot Suggestions */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">AI Copilot Recommendations</h3>
            </div>
            <Badge variant="electric" size="sm">3 Actions</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-cyan-300">Natural Light Optimization</span>
                <span className="text-emerald-400 font-mono text-[10px]">+14% Lux</span>
              </div>
              <p className="text-xs text-slate-300">
                Rotating Level-2 master bedroom glazing 12° East increases morning daylight intake and reduces artificial lighting demand by 18%.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-300">Eco-Material Cost Shaving</span>
                <span className="text-emerald-400 font-mono text-[10px]">Save $3,450</span>
              </div>
              <p className="text-xs text-slate-300">
                Switching non-load-bearing perimeter walls to Autoclaved Aerated Concrete (AAC) reduces total structural load and thermal HVAC cost.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-purple-300">Solar Roof Layout Expansion</span>
                <span className="text-cyan-400 font-mono text-[10px]">+2.1 kW</span>
              </div>
              <p className="text-xs text-slate-300">
                Expanding BIPV roof panels over the car pergola provides EV shade while generating an extra 2,800 kWh annually.
              </p>
            </div>
          </div>
        </Card>

        {/* Site Progress & Milestone Tracker */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Construction Milestone Progress</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">68% Overall</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-200">1. Substructure & Foundation Piling</span>
                <span className="text-emerald-400 font-mono font-bold">100% Complete</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-full" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-200">2. RCC Superstructure Framing (Floors 1-3)</span>
                <span className="text-cyan-400 font-mono font-bold">85% In Progress</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[85%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-200">3. MEP & Smart Building Conduit Wiring</span>
                <span className="text-amber-400 font-mono font-bold">40% Scheduled</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[40%]" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('progress')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Inspect Site Progress & Photos
              </Button>
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
};
