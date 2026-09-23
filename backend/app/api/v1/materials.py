from fastapi import APIRouter
from typing import List
from datetime import datetime, timezone
from app.models.material import MaterialCategory
from app.schemas.material import MaterialResponse

router = APIRouter(prefix="/materials", tags=["Materials"])

# High-fidelity built-in BIM material catalog
DEFAULT_MATERIALS = [
    MaterialResponse(
        id=1,
        name="Ultra-High Performance Concrete (UHPC)",
        code="MAT-UHPC-01",
        category=MaterialCategory.STRUCTURAL,
        unit="m³",
        unit_price=160.0,
        currency="USD",
        embodied_carbon=240.0,
        thermal_conductivity=1.3,
        durability_years=75,
        color_hex="#94A3B8",
        roughness=0.6,
        metalness=0.1,
        supplier_name="Holcim Global",
        lead_time_days=3,
        in_stock=True,
        is_eco_friendly=False,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=2,
        name="Autoclaved Aerated Concrete (AAC) Blocks",
        code="MAT-AAC-02",
        category=MaterialCategory.MASONRY,
        unit="Blocks",
        unit_price=3.2,
        currency="USD",
        embodied_carbon=85.0,
        thermal_conductivity=0.12,
        durability_years=50,
        color_hex="#E2E8F0",
        roughness=0.8,
        metalness=0.0,
        supplier_name="Ecolite Green Blocks",
        lead_time_days=2,
        in_stock=True,
        is_eco_friendly=True,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=3,
        name="Low-E Argon Double Glazed Glass",
        code="MAT-GLZ-03",
        category=MaterialCategory.GLASS,
        unit="sq.ft",
        unit_price=38.0,
        currency="USD",
        embodied_carbon=45.0,
        thermal_conductivity=0.04,
        durability_years=40,
        color_hex="#38BDF8",
        roughness=0.1,
        metalness=0.9,
        supplier_name="Saint-Gobain Glass",
        lead_time_days=7,
        in_stock=True,
        is_eco_friendly=True,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=4,
        name="Calacatta Gold Italian Marble",
        code="MAT-MRB-04",
        category=MaterialCategory.FLOORING,
        unit="sq.ft",
        unit_price=24.5,
        currency="USD",
        embodied_carbon=12.0,
        thermal_conductivity=2.8,
        durability_years=100,
        color_hex="#F8FAFC",
        roughness=0.15,
        metalness=0.05,
        supplier_name="Carrara Natural Stone",
        lead_time_days=10,
        in_stock=True,
        is_eco_friendly=False,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=5,
        name="Cross-Laminated Timber (CLT) Slabs",
        code="MAT-CLT-05",
        category=MaterialCategory.STRUCTURAL,
        unit="sq.ft",
        unit_price=18.0,
        currency="USD",
        embodied_carbon=-120.0, # Carbon negative sink
        thermal_conductivity=0.13,
        durability_years=60,
        color_hex="#D97706",
        roughness=0.7,
        metalness=0.0,
        supplier_name="Nordic Timber Systems",
        lead_time_days=14,
        in_stock=True,
        is_eco_friendly=True,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=6,
        name="BIPV Monocrystalline Solar Roof Tiles",
        code="MAT-SOL-06",
        category=MaterialCategory.ROOFING,
        unit="sq.ft",
        unit_price=42.0,
        currency="USD",
        embodied_carbon=60.0,
        thermal_conductivity=0.2,
        durability_years=30,
        color_hex="#0284C7",
        roughness=0.2,
        metalness=0.8,
        supplier_name="Tesla Energy Tech",
        lead_time_days=8,
        in_stock=True,
        is_eco_friendly=True,
        created_at=datetime.now(timezone.utc)
    ),
    MaterialResponse(
        id=7,
        name="Zero-VOC Eco Matte Exterior Paint",
        code="MAT-PNT-07",
        category=MaterialCategory.PAINT,
        unit="Liters",
        unit_price=15.0,
        currency="USD",
        embodied_carbon=5.0,
        thermal_conductivity=0.01,
        durability_years=10,
        color_hex="#FFFFFF",
        roughness=0.9,
        metalness=0.0,
        supplier_name="Dulux Sustainable",
        lead_time_days=1,
        in_stock=True,
        is_eco_friendly=True,
        created_at=datetime.now(timezone.utc)
    )
]

@router.get("/", response_model=List[MaterialResponse])
async def list_materials():
    return DEFAULT_MATERIALS
