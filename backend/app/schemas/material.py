from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.material import MaterialCategory

class MaterialBase(BaseModel):
    name: str
    code: str
    category: MaterialCategory
    unit: str = "sq.ft"
    unit_price: float
    currency: str = "USD"
    embodied_carbon: float = 0.0
    thermal_conductivity: float = 0.0
    durability_years: int = 30
    texture_url: Optional[str] = None
    color_hex: str = "#FFFFFF"
    roughness: float = 0.5
    metalness: float = 0.0
    supplier_name: str = "Holcim BuildTech"
    lead_time_days: int = 5
    in_stock: bool = True
    is_eco_friendly: bool = False

class MaterialCreate(MaterialBase):
    pass

class MaterialResponse(MaterialBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
