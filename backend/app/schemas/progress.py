from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.progress import MilestoneStatus

class MilestoneBase(BaseModel):
    title: str
    description: Optional[str] = None
    planned_start: Optional[datetime] = None
    planned_end: Optional[datetime] = None
    status: MilestoneStatus = MilestoneStatus.PENDING
    completion_percentage: float = 0.0
    budget_allocated: float = 0.0
    actual_spent: float = 0.0

class MilestoneCreate(MilestoneBase):
    pass

class MilestoneResponse(MilestoneBase):
    id: int
    project_id: int
    actual_completion: Optional[datetime] = None

    class Config:
        from_attributes = True

class DefectItem(BaseModel):
    defect_type: str # e.g. "Hairline Crack", "Efflorescence", "Tile Misalignment", "Reinforcement Exposure"
    severity: str # "LOW", "MEDIUM", "HIGH", "CRITICAL"
    confidence: float # 0.0 to 1.0
    bounding_box: List[float] = [] # [x, y, w, h] normalized
    location_description: str
    suggested_action: str

class DefectInspectionResponse(BaseModel):
    id: int
    project_id: int
    image_url: str
    detected_defects: List[DefectItem]
    completion_estimated: float
    inspection_notes: Optional[str] = None
    inspector_name: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
