import React, { useState } from 'react';
import { 
  Box, 
  Layers, 
  Sun, 
  Moon, 
  Camera, 
  Sliders, 
  Eye, 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  Check, 
  Share2, 
  Download,
  Info,
  DollarSign
} from 'lucide-react';
import { BuildingScene3D } from '../components/3d/BuildingScene3D';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Slider } from '../components/ui/Slider';
import { BuildingConfig, Project } from '../types';
import { NavigationTab } from '../store/useAppStore';

interface Configurator3DPageProps {
  project: Project | null;
  buildingConfig: BuildingConfig;
  onChangeConfig: (newConfig: BuildingConfig) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const Configurator3DPage: React.FC<Configurator3DPageProps> = ({
  project,
  buildingConfig,
  onChangeConfig,
  onNavigate
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const wallColors = [
    { label: "Stucco White", hex: "#F8FAFC", desc: "Reflective exterior stucco" },
    { label: "Industrial Concrete", hex: "#64748B", desc: "Fair-faced architectural finish" },
    { label: "Nordic Engineered Timber", hex: "#D97706", desc: "Carbon-negative wood facade" },
    { label: "Charcoal Slate", hex: "#1E293B", desc: "Modern acoustic cladding" }
  ];

  const lightingPresets: Array<BuildingConfig['lighting_preset']> = [
    'Day', 'Golden Hour', 'Night', 'Blueprint Wireframe'
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 pb-6">
      
      {/* Center Main 3D Canvas Studio */}
      <div className="flex-1 relative rounded-3xl overflow-hidden border border-slate-800 bg-[#060913] shadow-2xl flex flex-col">
        
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 flex items-center gap-3 pointer-events-auto shadow-lg">
            <Box className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-xs font-bold text-white block font-sans">
                {project?.title || "3D BIM Parametric Studio"}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {buildingConfig.num_floors} Levels • {buildingConfig.architectural_style}
              </span>
            </div>
          </div>

          {/* Lighting Mode Quick Selector */}
          <div className="bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 flex items-center gap-1 pointer-events-auto shadow-lg">
            {lightingPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => onChangeConfig({ ...buildingConfig, lighting_preset: preset })}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  buildingConfig.lighting_preset === preset
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Scene View */}
        <div className="flex-1 w-full h-full">
          <BuildingScene3D
            config={buildingConfig}
            selectedElementId={selectedElement}
            onSelectElement={(id) => setSelectedElement(id)}
            interactive={true}
          />
        </div>

        {/* Bottom Bar: Action Trigger to AR */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-[11px] font-mono text-slate-300 pointer-events-auto">
            Orbit: Left Drag • Pan: Right Drag • Zoom: Scroll
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <Button
              variant="electric"
              size="md"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={() => onNavigate('ar_experience')}
            >
              View in AR on Actual Land
            </Button>
          </div>
        </div>
      </div>

      {/* Right Parametric Customization Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
        
        {/* Parametric BIM Controls Card */}
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">BIM Parameters</h2>
            </div>
            <Badge variant="electric" size="sm">LIVE SYNC</Badge>
          </div>

          {/* Number of Floors */}
          <Slider
            label="Storey Count"
            min={1}
            max={6}
            step={1}
            value={buildingConfig.num_floors}
            valueDisplay={`${buildingConfig.num_floors} Floors`}
            onChange={(e) => onChangeConfig({ ...buildingConfig, num_floors: Number(e.target.value) })}
          />

          {/* Facade Wall Color & Material */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Exterior Wall Finish
            </label>
            <div className="grid grid-cols-2 gap-2">
              {wallColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => onChangeConfig({ ...buildingConfig, wall_color: color.hex })}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
                    buildingConfig.wall_color === color.hex
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 ring-1 ring-cyan-400/40'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 border border-slate-700"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-semibold truncate">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Architectural Toggles */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Structural Modules
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Upper Balcony", key: "has_balcony" },
                { label: "Landscape Lawn", key: "has_garden" },
                { label: "EV Parking Pergola", key: "has_parking" },
                { label: "BIPV Solar Array", key: "has_solar" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onChangeConfig({ ...buildingConfig, [item.key]: !buildingConfig[item.key as keyof BuildingConfig] })}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    buildingConfig[item.key as keyof BuildingConfig]
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`w-2 h-2 rounded-full ${buildingConfig[item.key as keyof BuildingConfig] ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* X-Ray Cutaway BIM Mode */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => onChangeConfig({ ...buildingConfig, x_ray_mode: !buildingConfig.x_ray_mode })}
              className={`w-full p-3 rounded-2xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                buildingConfig.x_ray_mode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>X-Ray BIM Structural Wireframe</span>
              </div>
              <Badge variant={buildingConfig.x_ray_mode ? 'electric' : 'neutral'} size="sm">
                {buildingConfig.x_ray_mode ? 'ON' : 'OFF'}
              </Badge>
            </button>
          </div>
        </Card>

        {/* Selected BIM Element Inspector */}
        <Card className="space-y-3 bg-slate-900/90 border-slate-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase font-mono">Element Inspector</h3>
          </div>

          {selectedElement ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Element ID:</span>
                <span className="text-cyan-400 font-bold">{selectedElement}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Structural Type:</span>
                <span className="text-white font-semibold">Pre-Cast Reinforced Concrete</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Floor Thickness:</span>
                <span className="text-white font-semibold">200 mm</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Fire Resistance:</span>
                <span className="text-emerald-400 font-semibold">REI 120 Compliant</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              Click any wall, slab, or window in the 3D viewer to inspect its physical BIM structural properties.
            </p>
          )}
        </Card>

      </div>

    </div>
  );
};
