import type { Project, Material, CostEstimate, SustainabilityMetrics, DefectInspection, Comment, User, UserRole, BuildingConfig } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';

// Comprehensive mock data fallback for immediate, offline-ready demonstrations
const INITIAL_PROJECT: Project = {
  id: 1,
  title: "Elysium Modern Eco-Villa",
  description: "Ultra-luxury sustainable residential digital twin with integrated solar canopy and smart ventilation.",
  owner_id: 1,
  status: "PLANNING",
  plot_width: 50.0,
  plot_length: 80.0,
  plot_area: 4000.0,
  location: "Palm Meadows, Bangalore",
  soil_type: "Red Loam with High Bearing Capacity",
  zoning_code: "R-2 Low Density Residential",
  building_type: "Modern Villa",
  architectural_style: "Modern Minimalist",
  num_floors: 2,
  bedrooms: 4,
  bathrooms: 4,
  target_budget: 185000.0,
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
    x_ray_mode: false,
    camera_view: "Perspective"
  },
  cost_breakdown: {
    "Civil & Structural": 77700,
    "Finishes & Flooring": 33300,
    "Electrical & Smart Automation": 22200,
    "Plumbing & Sanitation": 16650,
    "HVAC & Thermal Envelope": 14800,
    "Architectural & Permitting": 11100,
    "Contingency Reserve": 9250
  },
  sustainability_metrics: {
    green_building_score: 92,
    leed_rating_level: "Platinum",
    carbon_embodied_ton: 112.0,
    carbon_operational_annual_ton: 18.0,
    carbon_offset_solar_ton: 8.4,
    net_carbon_rating: "A+",
    solar_annual_generation_kwh: 12400.0,
    solar_annual_savings_usd: 1984.0,
    rainwater_annual_harvest_liters: 145000.0,
    natural_ventilation_efficiency: 91.5,
    thermal_comfort_index: "Optimal"
  },
  version: 3,
  thumbnail_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  created_at: "2026-09-20T10:00:00Z",
  updated_at: "2026-09-23T14:30:00Z"
};

export const api = {
  async getProjects(): Promise<Project[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return [INITIAL_PROJECT];
    }
  },

  async getProjectById(id: number): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return INITIAL_PROJECT;
    }
  },

  async generateBuildingAI(params: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/generate-building`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      // High fidelity client fallback
      const plotArea = (params.plot_width || 40) * (params.plot_length || 60);
      const builtUpArea = plotArea * 0.65 * (params.num_floors || 2);
      const estCost = builtUpArea * 72.0;

      return {
        project_title: `${params.architectural_style || 'Modern Minimalist'} ${params.building_type || 'Villa'} at ${params.location || 'Site'}`,
        plot_area_sqft: plotArea,
        built_up_area_sqft: builtUpArea,
        estimated_cost_usd: estCost,
        carbon_footprint_ton: Number((builtUpArea * 0.28).toFixed(1)),
        green_building_score: 91,
        solar_potential_kwh_yr: 11800,
        design_rationale: `AI synthesized a high-performance ${params.num_floors || 2}-floor design tailored to your plot parameters with optimal solar orientation and space efficiency.`,
        rooms: [
          { room_id: 'r1', name: "Master En-Suite", floor: 1, area_sqft: 280, dimensions: "16' x 17.5'", orientation: "East", natural_light_score: 96, suggested_furniture: ["King Bed", "Dressing Table"] },
          { room_id: 'r2', name: "Grand Living Lounge", floor: 1, area_sqft: 380, dimensions: "19' x 20'", orientation: "North-East", natural_light_score: 98, suggested_furniture: ["Sectional Sofa", "Smart TV Console"] },
          { room_id: 'r3', name: "Open Gourmet Kitchen", floor: 1, area_sqft: 260, dimensions: "14' x 18.5'", orientation: "South-East", natural_light_score: 89, suggested_furniture: ["Island Counter", "Bar Stools"] },
          { room_id: 'r4', name: "Executive Suite", floor: 2, area_sqft: 240, dimensions: "15' x 16'", orientation: "West", natural_light_score: 90, suggested_furniture: ["Queen Bed", "Study Desk"] }
        ],
        building_config: {
          architectural_style: params.architectural_style || "Modern Minimalist",
          num_floors: params.num_floors || 2,
          wall_color: "#F8FAFC",
          roof_type: "flat_deck",
          has_balcony: (params.num_floors || 2) > 1,
          has_garden: params.has_garden ?? true,
          has_parking: params.has_parking ?? true,
          has_solar: params.has_solar ?? true,
          lighting_preset: "Day",
          x_ray_mode: false
        },
        cost_breakdown: {
          "Civil & Structural": Math.round(estCost * 0.42),
          "Finishes & Flooring": Math.round(estCost * 0.18),
          "Electrical & Smart Automation": Math.round(estCost * 0.12),
          "Plumbing & Sanitation": Math.round(estCost * 0.09),
          "HVAC & Thermal Envelope": Math.round(estCost * 0.08),
          "Architectural & Permitting": Math.round(estCost * 0.06),
          "Contingency Reserve": Math.round(estCost * 0.05),
        },
        material_recommendations: [
          { name: "Low-Carbon AAC Blocks", savings: "18% less thermal load", impact: "Reduces HVAC energy by 22%" },
          { name: "Double Glazed Low-E Solar Glass", savings: "High daylight factor", impact: "Prevents 85% infrared heat gain" },
          { name: "BIPV Solar Roof Array", savings: "$1,850/yr offset", impact: "Powers 70% of building energy load" }
        ]
      };
    }
  },

  async getMaterials(): Promise<Material[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/materials/`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return [
        { id: 1, name: "Ultra-High Performance Concrete", code: "MAT-UHPC-01", category: "STRUCTURAL", unit: "m³", unit_price: 160.0, currency: "USD", embodied_carbon: 240.0, thermal_conductivity: 1.3, durability_years: 75, color_hex: "#94A3B8", roughness: 0.6, metalness: 0.1, supplier_name: "Holcim Global", lead_time_days: 3, in_stock: true, is_eco_friendly: false },
        { id: 2, name: "Autoclaved Aerated Concrete Blocks", code: "MAT-AAC-02", category: "MASONRY", unit: "Blocks", unit_price: 3.2, currency: "USD", embodied_carbon: 85.0, thermal_conductivity: 0.12, durability_years: 50, color_hex: "#E2E8F0", roughness: 0.8, metalness: 0.0, supplier_name: "Ecolite Green Blocks", lead_time_days: 2, in_stock: true, is_eco_friendly: true },
        { id: 3, name: "Low-E Argon Double Glazed Glass", code: "MAT-GLZ-03", category: "GLASS", unit: "sq.ft", unit_price: 38.0, currency: "USD", embodied_carbon: 45.0, thermal_conductivity: 0.04, durability_years: 40, color_hex: "#38BDF8", roughness: 0.1, metalness: 0.9, supplier_name: "Saint-Gobain Glass", lead_time_days: 7, in_stock: true, is_eco_friendly: true },
        { id: 4, name: "Calacatta Gold Italian Marble", code: "MAT-MRB-04", category: "FLOORING", unit: "sq.ft", unit_price: 24.5, currency: "USD", embodied_carbon: 12.0, thermal_conductivity: 2.8, durability_years: 100, color_hex: "#F8FAFC", roughness: 0.15, metalness: 0.05, supplier_name: "Carrara Natural Stone", lead_time_days: 10, in_stock: true, is_eco_friendly: false },
        { id: 5, name: "Cross-Laminated Timber (CLT)", code: "MAT-CLT-05", category: "STRUCTURAL", unit: "sq.ft", unit_price: 18.0, currency: "USD", embodied_carbon: -120.0, thermal_conductivity: 0.13, durability_years: 60, color_hex: "#D97706", roughness: 0.7, metalness: 0.0, supplier_name: "Nordic Timber Systems", lead_time_days: 14, in_stock: true, is_eco_friendly: true },
        { id: 6, name: "BIPV Monocrystalline Solar Roof", code: "MAT-SOL-06", category: "ROOFING", unit: "sq.ft", unit_price: 42.0, currency: "USD", embodied_carbon: 60.0, thermal_conductivity: 0.2, durability_years: 30, color_hex: "#0284C7", roughness: 0.2, metalness: 0.8, supplier_name: "Tesla Energy Tech", lead_time_days: 8, in_stock: true, is_eco_friendly: true },
        { id: 7, name: "Zero-VOC Eco Matte Exterior Paint", code: "MAT-PNT-07", category: "PAINT", unit: "Liters", unit_price: 15.0, currency: "USD", embodied_carbon: 5.0, thermal_conductivity: 0.01, durability_years: 10, color_hex: "#FFFFFF", roughness: 0.9, metalness: 0.0, supplier_name: "Dulux Sustainable", lead_time_days: 1, in_stock: true, is_eco_friendly: true }
      ];
    }
  },

  async estimateCost(params: any): Promise<CostEstimate> {
    try {
      const res = await fetch(`${API_BASE_URL}/cost/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      const area = (params.built_up_area_sqft || 3600);
      const total = area * 75;
      return {
        total_cost: total,
        cost_per_sqft: 75.0,
        materials_cost: Math.round(total * 0.44),
        labor_cost: Math.round(total * 0.22),
        electrical_cost: Math.round(total * 0.10),
        plumbing_cost: Math.round(total * 0.08),
        hvac_interior_cost: Math.round(total * 0.09),
        permits_and_architect_fee: Math.round(total * 0.03),
        contingency_fund: Math.round(total * 0.04),
        taxes_gst: Math.round(total * 0.05),
        currency: "USD",
        items: [
          { category: "Civil & Structural", item_name: "TMT Fe550D Steel Rebar", quantity: 14.4, unit: "Tons", unit_rate: 820.0, subtotal: 11808.0 },
          { category: "Civil & Structural", item_name: "Ready-Mix Concrete (M30)", quantity: 126.0, unit: "m³", unit_rate: 115.0, subtotal: 14490.0 },
          { category: "Masonry & Walls", item_name: "AAC Blocks 200mm", quantity: 5040, unit: "Blocks", unit_rate: 2.8, subtotal: 14112.0 },
          { category: "Flooring & Tiling", item_name: "Italian Calacatta Marble", quantity: 3060, unit: "sq.ft", unit_rate: 12.5, subtotal: 38250.0 },
          { category: "Glazing & Fenestration", item_name: "Low-E Double Glazed Windows", quantity: 792, unit: "sq.ft", unit_rate: 35.0, subtotal: 27720.0 },
          { category: "Electrical & MEP", item_name: "Smart Automation & Wiring", quantity: 1, unit: "Lump Sum", unit_rate: 27000.0, subtotal: 27000.0 },
        ],
        savings_suggestions: [
          "Switching exterior plaster to fly-ash blended mortar saves approx $2,400.",
          "Bulk procuring structural steel via BuildVerse partner discounts saves 6.5%.",
          "Pre-planning MEP conduit channels reduces site rework by 40%."
        ]
      };
    }
  },

  async analyzeSustainability(params: any): Promise<SustainabilityMetrics> {
    try {
      const res = await fetch(`${API_BASE_URL}/sustainability/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return {
        green_building_score: 93,
        leed_rating_level: "Platinum",
        carbon_embodied_ton: 98.4,
        carbon_operational_annual_ton: 16.2,
        carbon_offset_solar_ton: 9.1,
        net_carbon_rating: "A+",
        solar_annual_generation_kwh: 13200.0,
        solar_annual_savings_usd: 2112.0,
        rainwater_annual_harvest_liters: 158000.0,
        natural_ventilation_efficiency: 92.0,
        thermal_comfort_index: "Optimal",
        recommendations: [
          "Equipping the roof with BIPV panels offsets 9.1 tons of CO2 annually.",
          "The rainwater catchment system covers 70% of non-potable domestic and landscaping demand.",
          "Aerated thermal block envelope lowers peak air conditioning power by 26%."
        ]
      };
    }
  },

  async inspectSitePhoto(projectId: number, imageUrl: string): Promise<DefectInspection> {
    try {
      const res = await fetch(`${API_BASE_URL}/progress/inspect-defects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, image_url: imageUrl })
      });
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return {
        id: Math.floor(Math.random() * 1000),
        project_id: projectId,
        image_url: imageUrl,
        detected_defects: [
          {
            defect_type: "Hairline Plaster Stress Crack",
            severity: "LOW",
            confidence: 0.95,
            bounding_box: [0.24, 0.35, 0.18, 0.08],
            location_description: "Upper East perimeter lintel beam junction",
            suggested_action: "Apply elastomeric polymer sealant prior to finish paint."
          },
          {
            defect_type: "Micro Dampness Seepage",
            severity: "MEDIUM",
            confidence: 0.88,
            bounding_box: [0.62, 0.55, 0.22, 0.14],
            location_description: "Basement parapet drainage point",
            suggested_action: "Inject crystallizing waterproof agent and inspect downspout."
          }
        ],
        completion_estimated: 68.0,
        inspection_notes: "Structural alignments conform to BIM specifications within 2mm tolerance. No critical rebar exposure detected.",
        inspector_name: "BuildVerse AI Vision Engine v4.2",
        status: "ANALYZED",
        created_at: new Date().toISOString()
      };
    }
  }
};
