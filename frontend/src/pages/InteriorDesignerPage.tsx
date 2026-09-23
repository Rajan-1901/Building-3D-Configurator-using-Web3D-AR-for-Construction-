import React, { useState } from 'react';
import { 
  Sofa, 
  Bed, 
  Utensils, 
  Briefcase, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCw, 
  DollarSign, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FurnitureItem } from '../types';

interface InteriorDesignerPageProps {
  furnitureItems: FurnitureItem[];
  onAddFurniture: (item: Omit<FurnitureItem, 'id'>) => void;
  onRemoveFurniture: (id: string) => void;
  onUpdatePosition: (id: string, position: [number, number, number], rotation?: number) => void;
}

export const InteriorDesignerPage: React.FC<InteriorDesignerPageProps> = ({
  furnitureItems,
  onAddFurniture,
  onRemoveFurniture,
  onUpdatePosition
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Living' | 'Bedroom' | 'Dining' | 'Office'>('All');
  const [activeFloor, setActiveFloor] = useState<number>(1);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(furnitureItems[0]?.id || null);

  const furnitureCatalog = [
    { name: "Minimalist Italian Sofa", category: "Living" as const, dimensions: [2.4, 0.85, 0.95] as [number, number, number], color: "#334155", price: 3200 },
    { name: "Nordic Oak Coffee Table", category: "Living" as const, dimensions: [1.2, 0.4, 0.7] as [number, number, number], color: "#B45309", price: 850 },
    { name: "King Platform Bed", category: "Bedroom" as const, dimensions: [2.1, 1.1, 2.0] as [number, number, number], color: "#475569", price: 3800 },
    { name: "Bespoke Walnut Dining Set (8-Seater)", category: "Dining" as const, dimensions: [2.6, 0.75, 1.1] as [number, number, number], color: "#78350F", price: 4600 },
    { name: "Executive Ergonomic Desk", category: "Office" as const, dimensions: [1.8, 0.75, 0.9] as [number, number, number], color: "#1E293B", price: 2400 },
    { name: "Architectural Floor Lamp", category: "Living" as const, dimensions: [0.5, 1.8, 0.5] as [number, number, number], color: "#F59E0B", price: 650 },
  ];

  const filteredCatalog = activeCategory === 'All' 
    ? furnitureCatalog 
    : furnitureCatalog.filter(f => f.category === activeCategory);

  const totalInteriorCost = furnitureItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">3D Spatial Staging</Badge>
            <span className="text-xs text-slate-400 font-mono">BIM Interior Staging</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Interior Designer & Furniture Studio
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Drag, arrange, and stage bespoke designer furniture with real-time clearance and cost validation.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Staging Cost</span>
            <span className="text-lg font-bold text-cyan-400 font-mono">${totalInteriorCost.toLocaleString()}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Items Placed</span>
            <span className="text-lg font-bold text-white font-mono">{furnitureItems.length}</span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2D / 3D Room Floorplan Canvas */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0A0F1D] min-h-[520px] p-6 flex flex-col justify-between shadow-2xl">
          
          {/* Top Floor Switcher */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">Master Living & Suite Plan (Level {activeFloor})</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {[1, 2].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveFloor(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeFloor === lvl ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Level {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Room Grid Blueprint */}
          <div className="relative w-full h-[400px] border-2 border-dashed border-slate-700/80 rounded-2xl bg-slate-950/60 p-4 flex items-center justify-center overflow-hidden">
            {/* Architectural Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Placed Furniture Visuals on Blueprint */}
            <div className="relative w-full h-full">
              {furnitureItems.map((item, idx) => {
                const isSelected = selectedItemId === item.id;
                // Map 3D positions to 2D percentages on canvas
                const left = 50 + (item.position[0] * 12);
                const top = 50 + (item.position[2] * 12);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    style={{ left: `${left}%`, top: `${top}%`, transform: `translate(-50%, -50%) rotate(${item.rotation}deg)` }}
                    className={`absolute p-3 rounded-xl border-2 transition cursor-pointer flex flex-col items-center justify-center select-none ${
                      isSelected
                        ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 z-20'
                        : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-[11px] font-bold whitespace-nowrap">{item.name}</span>
                    <span className="text-[9px] font-mono text-cyan-300">${item.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Canvas Bottom Helper */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 z-10">
            <span>Dimensions: 28' x 24' • Clearance: 1.2m Minimum Walking Channel</span>
            <span className="text-emerald-400 font-mono">100% ADA & Ergonomic Compliant</span>
          </div>
        </div>

        {/* Right Furniture Catalog & Staging Inspector */}
        <div className="space-y-4">
          
          {/* Catalog Selection */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Furniture Catalog</h3>
              <Badge variant="electric" size="sm">BIM Library</Badge>
            </div>

            {/* Category Filter */}
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {(['All', 'Living', 'Bedroom', 'Dining', 'Office'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Catalog Items List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {filteredCatalog.map((furn, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{furn.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {furn.dimensions[0]}m × {furn.dimensions[2]}m • ${furn.price}
                    </p>
                  </div>
                  <Button
                    variant="electric"
                    size="sm"
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    onClick={() => onAddFurniture({
                      name: furn.name,
                      category: furn.category,
                      dimensions: furn.dimensions,
                      color: furn.color,
                      position: [Math.random() * 2 - 1, 0.4, Math.random() * 2 - 1],
                      rotation: 0,
                      price: furn.price
                    })}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Selected Item Inspector & Controls */}
          {selectedItemId && (
            <Card className="space-y-3 bg-slate-900/90 border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase font-mono">Item Selected</span>
                <button
                  onClick={() => onRemoveFurniture(selectedItemId)}
                  className="text-red-400 hover:text-red-300 p-1 transition cursor-pointer"
                  title="Remove from layout"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {furnitureItems.find(f => f.id === selectedItemId) && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-cyan-300">
                    {furnitureItems.find(f => f.id === selectedItemId)?.name}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<RotateCw className="w-3.5 h-3.5" />}
                      onClick={() => {
                        const item = furnitureItems.find(f => f.id === selectedItemId);
                        if (item) onUpdatePosition(item.id, item.position, (item.rotation + 45) % 360);
                      }}
                    >
                      Rotate 45°
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

        </div>

      </div>

    </div>
  );
};
