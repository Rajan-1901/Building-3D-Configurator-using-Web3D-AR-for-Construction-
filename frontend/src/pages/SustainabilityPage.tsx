import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Sun, 
  Droplets, 
  Wind, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SustainabilityMetrics, Project } from '../types';
import { api } from '../services/api';
import { NavigationTab } from '../store/useAppStore';

interface SustainabilityPageProps {
  project: Project | null;
  onNavigate: (tab: NavigationTab) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ project, onNavigate }) => {
  const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null);

  useEffect(() => {
    api.analyzeSustainability({
      built_up_area_sqft: (project?.plot_area || 4000) * 0.65 * (project?.num_floors || 2),
      roof_area_sqft: (project?.plot_area || 4000) * 0.65,
      has_solar: true,
      has_rainwater: true
    }).then(setMetrics);
  }, [project]);

  if (!metrics) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Calculating Environmental & LEED Metrics...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="success">LEED & IGBC Platinum Audit</Badge>
            <span className="text-xs text-slate-400 font-mono">Net-Zero Energy Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Sustainability & Green Building Score
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Comprehensive lifecycle assessment covering embodied carbon, solar irradiance, rainwater capture, and passive thermal ventilation.
          </p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <Award className="w-6 h-6 text-emerald-400" />
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-300 block">LEED Rating Status</span>
            <span className="text-base font-bold text-white">{metrics.leed_rating_level} Certified</span>
          </div>
        </div>
      </div>

      {/* Top Score Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2 border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900/90">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-emerald-300">Green Score</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{metrics.green_building_score} <span className="text-xs text-slate-400">/ 100</span></p>
          <span className="text-[11px] text-emerald-400 font-mono">Top 5% Eco-Efficiency</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Solar Generation</span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-300 font-mono">{metrics.solar_annual_generation_kwh.toLocaleString()} <span className="text-xs text-slate-400">kWh/yr</span></p>
          <span className="text-[11px] text-slate-400 font-mono">Saves ${metrics.solar_annual_savings_usd}/year</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Rainwater Harvest</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-cyan-300 font-mono">{metrics.rainwater_annual_harvest_liters.toLocaleString()} <span className="text-xs text-slate-400">L/yr</span></p>
          <span className="text-[11px] text-slate-400 font-mono">Covers 70% non-potable use</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Ventilation Index</span>
            <Wind className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-purple-300 font-mono">{metrics.natural_ventilation_efficiency}%</p>
          <span className="text-[11px] text-slate-400 font-mono">Optimal Cross-Airflow</span>
        </Card>
      </div>

      {/* Carbon Lifecycle & ESG Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Carbon Footprint Card */}
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Carbon Lifecycle Audit (CO₂e)</h3>
            <Badge variant="electric" size="sm">Rating {metrics.net_carbon_rating}</Badge>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Embodied Carbon (Civil Materials)</span>
                <span className="text-white font-mono font-bold">{metrics.carbon_embodied_ton} Tons CO₂e</span>
              </div>
              <p className="text-[11px] text-slate-500">Includes concrete, structural rebar, masonry, and transport.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Operational Carbon (Annual Baseline)</span>
                <span className="text-white font-mono font-bold">{metrics.carbon_operational_annual_ton} Tons CO₂e / yr</span>
              </div>
              <p className="text-[11px] text-slate-500">HVAC thermal conditioning, lighting, and domestic appliances.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-300">Clean Solar Offset (Annual)</span>
                <span className="text-emerald-300 font-mono font-bold">-{metrics.carbon_offset_solar_ton} Tons CO₂e / yr</span>
              </div>
              <p className="text-[11px] text-emerald-400/80">Displaces 58% of grid operational emissions.</p>
            </div>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Green Engineering Recommendations</h3>
              </div>
              <Badge variant="success" size="sm">Audit Complete</Badge>
            </div>

            <div className="space-y-3">
              {metrics.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Button
              variant="electric"
              size="md"
              className="w-full"
              onClick={() => onNavigate('materials')}
            >
              Procure Certified Green Materials
            </Button>
          </div>
        </Card>

      </div>

    </div>
  );
};
