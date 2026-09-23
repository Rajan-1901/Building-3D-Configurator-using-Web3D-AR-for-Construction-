from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class AIGenerateRequest(BaseModel):
    plot_width: float = Field(default=40.0, description="Plot width in feet")
    plot_length: float = Field(default=60.0, description="Plot length in feet")
    location: str = Field(default="Bangalore, India")
    building_type: str = Field(default="Modern Villa") # Villa, Commercial, Apartment, Duplex
    architectural_style: str = Field(default="Modern Minimalist") # Modern Minimalist, Brutalist, Scandinavian, Neo-Classical, Contemporary
    num_floors: int = Field(default=2, ge=1, le=10)
    bedrooms: int = Field(default=3, ge=1, le=20)
    bathrooms: int = Field(default=3, ge=1, le=20)
    target_budget: float = Field(default=125000.0, ge=10000.0)
    has_parking: bool = True
    has_garden: bool = True
    has_swimming_pool: bool = False
    has_solar: bool = True
    has_rainwater: bool = True
    special_requirements: Optional[str] = "Maximize natural light and cross ventilation"

class BuildingElement3D(BaseModel):
    id: str
    type: str # wall, floor, roof, window, door, column, furniture, garden, parking
    position: List[float] # [x, y, z]
    rotation: List[float] = [0.0, 0.0, 0.0]
    scale: List[float] # [w, h, d]
    material_id: Optional[str] = "concrete_smooth"
    color: str = "#E2E8F0"
    properties: Dict[str, Any] = {}

class RoomLayout(BaseModel):
    room_id: str
    name: str
    floor: int
    area_sqft: float
    dimensions: str # e.g. "16' x 14'"
    orientation: str # North, South, East, West
    natural_light_score: float # 0 - 100
    suggested_furniture: List[str] = []

class AIGenerationResult(BaseModel):
    project_title: str
    plot_area_sqft: float
    built_up_area_sqft: float
    estimated_cost_usd: float
    carbon_footprint_ton: float
    green_building_score: int # 0 - 100
    solar_potential_kwh_yr: float
    design_rationale: str
    rooms: List[RoomLayout]
    building_config: Dict[str, Any]
    elements_3d: List[BuildingElement3D]
    material_recommendations: List[Dict[str, Any]]
    cost_breakdown: Dict[str, float]
