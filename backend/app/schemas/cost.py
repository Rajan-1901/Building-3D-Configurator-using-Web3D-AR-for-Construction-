from pydantic import BaseModel
from typing import Dict, List, Any

class CostItem(BaseModel):
    category: str
    item_name: str
    quantity: float
    unit: str
    unit_rate: float
    subtotal: float

class CostEstimateRequest(BaseModel):
    plot_area_sqft: float
    built_up_area_sqft: float
    num_floors: int = 2
    architectural_style: str = "Modern Minimalist"
    quality_grade: str = "PREMIUM" # STANDARD, PREMIUM, LUXURY
    materials_selected: Dict[str, str] = {} # {"walls": "aac_blocks", "flooring": "italian_marble"}
    location: str = "Bangalore, India"

class CostEstimateResponse(BaseModel):
    total_cost: float
    cost_per_sqft: float
    materials_cost: float
    labor_cost: float
    electrical_cost: float
    plumbing_cost: float
    hvac_interior_cost: float
    permits_and_architect_fee: float
    contingency_fund: float
    taxes_gst: float
    currency: str = "USD"
    items: List[CostItem]
    savings_suggestions: List[str]
