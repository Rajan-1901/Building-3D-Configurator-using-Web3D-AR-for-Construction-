from pydantic import BaseModel
from typing import List, Dict, Any

class SustainabilityAnalysisRequest(BaseModel):
    built_up_area_sqft: float
    num_floors: int = 2
    roof_area_sqft: float
    has_solar: bool = True
    has_rainwater: bool = True
    glazing_ratio: float = 0.35
    wall_material: str = "aac_blocks"
    insulation_type: str = "rockwool"
    location_annual_rainfall_mm: float = 950.0
    location_solar_irradiance_kwh_m2_day: float = 5.2

class SustainabilityAnalysisResponse(BaseModel):
    green_building_score: int # 0 to 100
    leed_rating_level: str # Certified, Silver, Gold, Platinum
    carbon_embodied_ton: float
    carbon_operational_annual_ton: float
    carbon_offset_solar_ton: float
    net_carbon_rating: str # A+, A, B, C
    solar_annual_generation_kwh: float
    solar_annual_savings_usd: float
    rainwater_annual_harvest_liters: float
    natural_ventilation_efficiency: float # %
    thermal_comfort_index: str # Optimal, Good, Moderate
    recommendations: List[str]
