export type UserRole = 'ARCHITECT' | 'ENGINEER' | 'HOMEOWNER' | 'CONTRACTOR' | 'DEVELOPER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export type ProjectStatus = 'PLANNING' | 'AI_DESIGN' | 'ESTIMATION' | 'IN_REVIEW' | 'APPROVED' | 'UNDER_CONSTRUCTION' | 'COMPLETED';

export interface BuildingElement3D {
  id: string;
  type: string; // wall, floor, roof, window, door, balcony, garden, parking, solar_array, furniture
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  material_id?: string;
  color: string;
  properties?: Record<string, any>;
}

export interface RoomLayout {
  room_id: string;
  name: string;
  floor: number;
  area_sqft: number;
  dimensions: string;
  orientation: string;
  natural_light_score: number;
  suggested_furniture: string[];
}

export interface BuildingConfig {
  architectural_style: string;
  num_floors: number;
  wall_color: string;
  roof_type: string;
  has_balcony: boolean;
  has_garden: boolean;
  has_parking: boolean;
  has_solar: boolean;
  lighting_preset: 'Day' | 'Golden Hour' | 'Night' | 'Blueprint Wireframe';
  x_ray_mode: boolean;
  camera_view?: 'Perspective' | 'Isometric' | 'Top' | 'Street View';
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  owner_id: number;
  status: ProjectStatus;
  plot_width: number;
  plot_length: number;
  plot_area: number;
  location: string;
  soil_type: string;
  zoning_code: string;
  building_type: string;
  architectural_style: string;
  num_floors: number;
  bedrooms: number;
  bathrooms: number;
  target_budget: number;
  has_parking: boolean;
  has_garden: boolean;
  has_solar: boolean;
  has_rainwater: boolean;
  building_config: BuildingConfig;
  interior_layout?: Record<string, any>;
  cost_breakdown?: Record<string, number>;
  sustainability_metrics?: Record<string, any>;
  thumbnail_url?: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export type MaterialCategory = 'STRUCTURAL' | 'MASONRY' | 'FLOORING' | 'FACADE' | 'PAINT' | 'ROOFING' | 'GLASS' | 'INTERIOR';

export interface Material {
  id: number;
  name: string;
  code: string;
  category: MaterialCategory;
  unit: string;
  unit_price: number;
  currency: string;
  embodied_carbon: number;
  thermal_conductivity: number;
  durability_years: number;
  color_hex: string;
  roughness: number;
  metalness: number;
  supplier_name: string;
  lead_time_days: number;
  in_stock: boolean;
  is_eco_friendly: boolean;
}

export interface CostItem {
  category: string;
  item_name: string;
  quantity: number;
  unit: string;
  unit_rate: number;
  subtotal: number;
}

export interface CostEstimate {
  total_cost: number;
  cost_per_sqft: number;
  materials_cost: number;
  labor_cost: number;
  electrical_cost: number;
  plumbing_cost: number;
  hvac_interior_cost: number;
  permits_and_architect_fee: number;
  contingency_fund: number;
  taxes_gst: number;
  currency: string;
  items: CostItem[];
  savings_suggestions: string[];
}

export interface SustainabilityMetrics {
  green_building_score: number;
  leed_rating_level: string;
  carbon_embodied_ton: number;
  carbon_operational_annual_ton: number;
  carbon_offset_solar_ton: number;
  net_carbon_rating: string;
  solar_annual_generation_kwh: number;
  solar_annual_savings_usd: number;
  rainwater_annual_harvest_liters: number;
  natural_ventilation_efficiency: number;
  thermal_comfort_index: string;
  recommendations: string[];
}

export interface Milestone {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  planned_start?: string;
  planned_end?: string;
  actual_completion?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  completion_percentage: number;
  budget_allocated: number;
  actual_spent: number;
}

export interface DefectItem {
  defect_type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  bounding_box: number[];
  location_description: string;
  suggested_action: string;
}

export interface DefectInspection {
  id: number;
  project_id: number;
  image_url: string;
  detected_defects: DefectItem[];
  completion_estimated: number;
  inspection_notes?: string;
  inspector_name: string;
  status: string;
  created_at: string;
}

export interface Comment {
  id: number;
  project_id: number;
  author_id: number;
  author_name?: string;
  author_role?: string;
  content: string;
  position_3d?: { x: number; y: number; z: number };
  element_id?: string;
  parent_id?: number;
  is_resolved: boolean;
  created_at: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'Living' | 'Bedroom' | 'Kitchen' | 'Dining' | 'Office' | 'Decor';
  dimensions: [number, number, number]; // w, h, d in meters
  color: string;
  position: [number, number, number];
  rotation: number;
  price: number;
}
