import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Check, 
  Clock, 
  Layers, 
  TrendingDown,
  Box,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Material, MaterialCategory, BuildingConfig } from '../types';
import { api } from '../services/api';
import { NavigationTab } from '../store/useAppStore';

interface MaterialMarketplaceProps {
  buildingConfig: BuildingConfig;
  onChangeConfig: (config: BuildingConfig) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const MaterialMarketplacePage: React.FC<MaterialMarketplaceProps> = ({
  buildingConfig,
  onChangeConfig,
  onNavigate
}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [appliedMaterialCode, setAppliedMaterialCode] = useState<string | null>(null);

  useEffect(() => {
    api.getMaterials().then(setMaterials);
  }, []);

  const categories = ['ALL', 'STRUCTURAL', 'MASONRY', 'FLOORING', 'GLASS', 'ROOFING', 'PAINT'];

  const filteredMaterials = selectedCategory === 'ALL'
    ? materials
    : materials.filter(m => m.category === selectedCategory);

  const handleApplyToModel = (material: Material) => {
    setAppliedMaterialCode(material.code);
    onChangeConfig({
      ...buildingConfig,
      wall_color: material.color_hex
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">BIM Material Library</Badge>
            <span className="text-xs text-slate-400 font-mono">Live Spot Pricing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Sustainable Material Marketplace
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select and apply certified construction materials with real-time physical properties, embodied carbon ratings, and budget impact.
          </p>
        </div>

        <Button
          variant="glass"
          size="md"
          leftIcon={<Box className="w-4 h-4 text-cyan-400" />}
          onClick={() => onNavigate('configurator')}
        >
          View in 3D Configurator
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Material Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => {
          const isApplied = appliedMaterialCode === mat.code;

          return (
            <Card key={mat.id} className="p-6 space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                
                {/* Top Badge & Color preview */}
                <div className="flex items-center justify-between">
                  <Badge variant={mat.is_eco_friendly ? 'success' : 'neutral'} size="sm">
                    {mat.category} {mat.is_eco_friendly && '• ECO CERTIFIED'}
                  </Badge>
                  <div
                    className="w-6 h-6 rounded-full border border-slate-700 shadow-inner"
                    style={{ backgroundColor: mat.color_hex }}
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{mat.code} • Supplier: {mat.supplier_name}</p>
                </div>

                {/* Price Display */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Unit Price</span>
                  <span className="text-lg font-bold text-white font-mono">
                    ${mat.unit_price} <span className="text-xs text-slate-400 font-normal">/ {mat.unit}</span>
                  </span>
                </div>

                {/* Physical & BIM Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">CARBON (CO₂e)</span>
                    <span className={`font-semibold ${mat.embodied_carbon < 50 ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {mat.embodied_carbon} kg / unit
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">THERMAL K</span>
                    <span className="text-slate-200 font-semibold">{mat.thermal_conductivity} W/mK</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">DURABILITY</span>
                    <span className="text-slate-200 font-semibold">{mat.durability_years} Years</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">LEAD TIME</span>
                    <span className="text-slate-200 font-semibold">{mat.lead_time_days} Days</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800">
                <Button
                  variant={isApplied ? 'electric' : 'secondary'}
                  size="md"
                  className="w-full"
                  leftIcon={isApplied ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  onClick={() => handleApplyToModel(mat)}
                >
                  {isApplied ? 'Applied to 3D Facade' : 'Apply to 3D Model'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};
