import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  DollarSign, 
  LayoutGrid, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Box, 
  Camera, 
  Leaf, 
  Zap,
  Layers
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Slider } from '../components/ui/Slider';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';
import { Project, BuildingConfig } from '../types';
import { NavigationTab } from '../store/useAppStore';

interface ProjectWizardProps {
  onProjectGenerated: (project: Project) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const ProjectWizardPage: React.FC<ProjectWizardProps> = ({ onProjectGenerated, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationResult, setGenerationResult] = useState<any | null>(null);

  // Form State across the 6 steps
  const [plotWidth, setPlotWidth] = useState<number>(40);
  const [plotLength, setPlotLength] = useState<number>(60);
  const [location, setLocation] = useState<string>("Palm Meadows, Bangalore");
  const [soilType, setSoilType] = useState<string>("Red Loam (High Bearing Capacity)");
  const [zoningCode, setZoningCode] = useState<string>("R-2 Residential Low-Density");

  const [buildingType, setBuildingType] = useState<string>("Modern Villa");
  const [numFloors, setNumFloors] = useState<number>(2);

  const [targetBudget, setTargetBudget] = useState<number>(150000);
  const [qualityGrade, setQualityGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');

  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [hasParking, setHasParking] = useState<boolean>(true);
  const [hasGarden, setHasGarden] = useState<boolean>(true);
  const [hasSolar, setHasSolar] = useState<boolean>(true);
  const [hasRainwater, setHasRainwater] = useState<boolean>(true);

  const [architecturalStyle, setArchitecturalStyle] = useState<string>("Modern Minimalist");

  const totalPlotArea = plotWidth * plotLength;

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setCurrentStep(6);

    try {
      const result = await api.generateBuildingAI({
        plot_width: plotWidth,
        plot_length: plotLength,
        location,
        building_type: buildingType,
        architectural_style: architecturalStyle,
        num_floors: numFloors,
        bedrooms,
        bathrooms,
        target_budget: targetBudget,
        has_parking: hasParking,
        has_garden: hasGarden,
        has_solar: hasSolar,
        has_rainwater: hasRainwater
      });

      setGenerationResult(result);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      const newProject: Project = {
        id: Date.now(),
        title: result.project_title,
        description: result.design_rationale,
        owner_id: 1,
        status: "PLANNING",
        plot_width: plotWidth,
        plot_length: plotLength,
        plot_area: totalPlotArea,
        location,
        soil_type: soilType,
        zoning_code: zoningCode,
        building_type: buildingType,
        architectural_style: architecturalStyle,
        num_floors: numFloors,
        bedrooms,
        bathrooms,
        target_budget: targetBudget,
        has_parking: hasParking,
        has_garden: hasGarden,
        has_solar: hasSolar,
        has_rainwater: hasRainwater,
        building_config: {
          architectural_style: architecturalStyle,
          num_floors: numFloors,
          wall_color: "#F8FAFC",
          roof_type: "flat_deck",
          has_balcony: numFloors > 1,
          has_garden: hasGarden,
          has_parking: hasParking,
          has_solar: hasSolar,
          lighting_preset: "Day",
          x_ray_mode: false
        },
        cost_breakdown: result.cost_breakdown,
        sustainability_metrics: {
          green_building_score: result.green_building_score,
          leed_rating_level: "Platinum",
          carbon_embodied_ton: result.carbon_footprint_ton,
          solar_annual_generation_kwh: result.solar_potential_kwh_yr,
          net_carbon_rating: "A+"
        },
        thumbnail_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      onProjectGenerated(newProject);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const buildingTypes = [
    { title: "Modern Villa", desc: "Standalone luxury dwelling with private garden & pergola.", icon: "🏡" },
    { title: "Commercial Hub", desc: "Multi-tenant office or retail pavilion with mass timber.", icon: "🏢" },
    { title: "Residential Duplex", desc: "Two-family residence optimized for space & acoustic privacy.", icon: "🏘️" },
    { title: "Eco-Smart Resort", desc: "Biophilic hospitality suites integrated with nature.", icon: "🌴" },
  ];

  const architecturalStyles = [
    { title: "Modern Minimalist", desc: "Clean lines, expansive glass, neutral palette & cantilever planes.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
    { title: "Scandinavian", desc: "Warm natural timbers, high acoustic insulation & sloped roofs.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
    { title: "Brutalist", desc: "Monolithic exposed concrete, bold geometric shadows & monumental massing.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" },
    { title: "Neo-Classical", desc: "Symmetrical proportions, fluted columns, ornate mouldings & hipped roofs.", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Wizard Header & Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">AI Building Generator Wizard</h1>
          </div>
          <Badge variant="electric">Step {currentStep} of 6</Badge>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-6 gap-2">
          {[
            "1. Plot Info",
            "2. Building Type",
            "3. Budget",
            "4. Rooms",
            "5. Style",
            "6. AI Synthesis"
          ].map((label, idx) => (
            <div key={idx} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= idx + 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-slate-800'
                }`}
              />
              <span className="text-[10px] text-slate-400 hidden sm:block truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <Card className="p-6 sm:p-8 bg-slate-900/95 border-slate-800 shadow-2xl">
        
        {/* STEP 1: Plot Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 1: Land Parcel & Plot Information</h2>
              <p className="text-xs text-slate-400">Define the physical dimensions, site location, and soil profile for setback compliance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Plot Width (Feet)"
                type="number"
                value={plotWidth}
                onChange={(e) => setPlotWidth(Number(e.target.value))}
              />
              <Input
                label="Plot Length (Feet)"
                type="number"
                value={plotLength}
                onChange={(e) => setPlotLength(Number(e.target.value))}
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total Site Area:</span>
              <span className="text-cyan-400 font-bold text-sm">{totalPlotArea.toLocaleString()} sq.ft ({(totalPlotArea * 0.0929).toFixed(1)} m²)</span>
            </div>

            <Input
              label="Site Location / Address"
              leftIcon={<MapPin className="w-4 h-4" />}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Soil Condition</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                >
                  <option value="Red Loam (High Bearing Capacity)">Red Loam (High Bearing Capacity)</option>
                  <option value="Clay / Silt (Requires Pile Foundation)">Clay / Silt (Requires Pile Foundation)</option>
                  <option value="Rocky Stratum (Minimal Excavation)">Rocky Stratum (Minimal Excavation)</option>
                  <option value="Sandy Coastal (Anti-Corrosive Rebar)">Sandy Coastal (Anti-Corrosive Rebar)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Zoning Regulation</label>
                <input
                  value={zoningCode}
                  onChange={(e) => setZoningCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Building Type */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 2: Building Typology & Floor Count</h2>
              <p className="text-xs text-slate-400">Select the intended use case and vertical floor distribution.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {buildingTypes.map((type) => (
                <div
                  key={type.title}
                  onClick={() => setBuildingType(type.title)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                    buildingType === type.title
                      ? 'bg-blue-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{type.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Slider
              label="Number of Storeys / Floors"
              min={1}
              max={6}
              step={1}
              value={numFloors}
              valueDisplay={`${numFloors} Floors`}
              onChange={(e) => setNumFloors(Number(e.target.value))}
            />
          </div>
        )}

        {/* STEP 3: Budget & Timeline */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 3: Budget Allocation & Material Quality</h2>
              <p className="text-xs text-slate-400">Set target capital expenditure and architectural specification tier.</p>
            </div>

            <Slider
              label="Target Budget (USD)"
              min={50000}
              max={800000}
              step={5000}
              value={targetBudget}
              valueDisplay={`$${targetBudget.toLocaleString()}`}
              onChange={(e) => setTargetBudget(Number(e.target.value))}
            />

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Material Specification Grade</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Standard', 'Premium', 'Luxury'] as const).map((grade) => (
                  <div
                    key={grade}
                    onClick={() => setQualityGrade(grade)}
                    className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                      qualityGrade === grade
                        ? 'bg-blue-950/40 border-cyan-400 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{grade}</p>
                    <p className="text-[11px] mt-1 font-mono">${grade === 'Standard' ? '55' : grade === 'Premium' ? '75' : '110'} / sq.ft</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Room Requirements */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 4: Room Layout & Amenities</h2>
              <p className="text-xs text-slate-400">Specify spatial requirements and sustainable features.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Slider
                label="Bedrooms"
                min={1}
                max={8}
                step={1}
                value={bedrooms}
                valueDisplay={`${bedrooms} Bedrooms`}
                onChange={(e) => setBedrooms(Number(e.target.value))}
              />
              <Slider
                label="Bathrooms"
                min={1}
                max={8}
                step={1}
                value={bathrooms}
                valueDisplay={`${bathrooms} Bathrooms`}
                onChange={(e) => setBathrooms(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Site Amenities & Eco Features</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "EV Parking", state: hasParking, set: setHasParking },
                  { label: "Lawn Garden", state: hasGarden, set: setHasGarden },
                  { label: "Solar Roof", state: hasSolar, set: setHasSolar },
                  { label: "Rainwater Catchment", state: hasRainwater, set: setHasRainwater },
                ].map((amenity, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => amenity.set(!amenity.state)}
                    className={`p-3 rounded-2xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      amenity.state ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span>{amenity.label}</span>
                    <span className={`w-2 h-2 rounded-full ${amenity.state ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Architectural Style */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 5: Architectural Style Synthesis</h2>
              <p className="text-xs text-slate-400">Choose the design language for facade materials, textures, and form.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {architecturalStyles.map((style) => (
                <div
                  key={style.title}
                  onClick={() => setArchitecturalStyle(style.title)}
                  className={`rounded-2xl border overflow-hidden transition cursor-pointer group ${
                    architecturalStyle === style.title
                      ? 'border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="h-28 w-full overflow-hidden relative">
                    <img src={style.img} alt={style.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>
                  <div className="p-3.5 bg-slate-950">
                    <h3 className="text-sm font-bold text-white">{style.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: AI Synthesis Result */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            {isGenerating ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-white">AI Neural BIM Synthesis in Progress...</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Synthesizing room schedules, calculating solar irradiance, and generating parametric 3D geometry...
                </p>
              </div>
            ) : generationResult ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">AI Synthesis Successful!</span>
                    <span>Compliant with zoning setbacks and optimized for passive solar gain.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">BUILT-UP AREA</span>
                    <span className="text-white font-bold text-sm">{generationResult.built_up_area_sqft.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ESTIMATED COST</span>
                    <span className="text-cyan-400 font-bold text-sm">${generationResult.estimated_cost_usd.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">GREEN SCORE</span>
                    <span className="text-emerald-400 font-bold text-sm">{generationResult.green_building_score} / 100</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">SOLAR OUTPUT</span>
                    <span className="text-amber-400 font-bold text-sm">{generationResult.solar_potential_kwh_yr.toLocaleString()} kWh/yr</span>
                  </div>
                </div>

                {/* Generated Rooms */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Generated Spatial Schedule</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {generationResult.rooms.map((r: any) => (
                      <div key={r.room_id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-200">{r.name}</p>
                          <p className="text-[11px] text-slate-400">{r.dimensions} • Level {r.floor}</p>
                        </div>
                        <Badge variant="electric" size="sm">{r.natural_light_score}% Daylight</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Launchers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="electric"
                    size="lg"
                    leftIcon={<Box className="w-4 h-4" />}
                    onClick={() => onNavigate('configurator')}
                  >
                    Open in 3D Configurator
                  </Button>
                  <Button
                    variant="glass"
                    size="lg"
                    leftIcon={<Camera className="w-4 h-4 text-cyan-400" />}
                    onClick={() => onNavigate('ar_experience')}
                  >
                    Place in Augmented Reality
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
          <Button
            variant="outline"
            size="md"
            disabled={currentStep === 1 || isGenerating}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
          >
            Back
          </Button>

          {currentStep < 5 ? (
            <Button
              variant="electric"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Continue
            </Button>
          ) : currentStep === 5 ? (
            <Button
              variant="electric"
              size="lg"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleGenerateAI}
            >
              Synthesize AI Building Design
            </Button>
          ) : null}
        </div>

      </Card>
    </div>
  );
};
