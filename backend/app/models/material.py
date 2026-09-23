from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, Enum
from datetime import datetime, timezone
import enum
from app.core.database import Base

class MaterialCategory(str, enum.Enum):
    STRUCTURAL = "STRUCTURAL"
    MASONRY = "MASONRY"
    FLOORING = "FLOORING"
    FACADE = "FACADE"
    PAINT = "PAINT"
    ROOFING = "ROOFING"
    GLASS = "GLASS"
    INTERIOR = "INTERIOR"

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(100), unique=True, nullable=False)
    category = Column(Enum(MaterialCategory), nullable=False)
    unit = Column(String(50), default="sq.ft") # sq.ft, ton, cubic meter, liter, piece
    unit_price = Column(Float, nullable=False)
    currency = Column(String(10), default="USD")
    embodied_carbon = Column(Float, default=0.0) # kg CO2e per unit
    thermal_conductivity = Column(Float, default=0.0) # W/mK
    durability_years = Column(Integer, default=30)
    texture_url = Column(String(500), nullable=True)
    color_hex = Column(String(20), default="#FFFFFF")
    roughness = Column(Float, default=0.5)
    metalness = Column(Float, default=0.0)
    supplier_name = Column(String(255), default="Holcim BuildTech")
    lead_time_days = Column(Integer, default=5)
    in_stock = Column(Boolean, default=True)
    is_eco_friendly = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
