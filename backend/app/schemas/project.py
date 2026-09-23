from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.project import ProjectStatus

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING
    plot_width: float = 40.0
    plot_length: float = 60.0
    plot_area: float = 2400.0
    location: str = "Bangalore, India"
    soil_type: str = "Red Loam"
    zoning_code: str = "R-2 Residential"
    building_type: str = "Modern Villa"
    architectural_style: str = "Modern Minimalist"
    num_floors: int = 2
    bedrooms: int = 3
    bathrooms: int = 3
    target_budget: float = 125000.0
    has_parking: bool = True
    has_garden: bool = True
    has_solar: bool = True
    has_rainwater: bool = True
    building_config: Dict[str, Any] = {}
    interior_layout: Dict[str, Any] = {}
    cost_breakdown: Dict[str, Any] = {}
    sustainability_metrics: Dict[str, Any] = {}
    thumbnail_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    building_config: Optional[Dict[str, Any]] = None
    interior_layout: Optional[Dict[str, Any]] = None
    cost_breakdown: Optional[Dict[str, Any]] = None
    sustainability_metrics: Optional[Dict[str, Any]] = None
    thumbnail_url: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: int
    owner_id: int
    version: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectVersionResponse(BaseModel):
    id: int
    project_id: int
    version_number: int
    change_summary: str
    snapshot_data: Dict[str, Any]
    created_by: str
    created_at: datetime

    class Config:
        from_attributes = True
