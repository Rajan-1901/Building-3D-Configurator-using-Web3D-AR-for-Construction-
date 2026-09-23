from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime
from app.schemas.user import UserResponse

class CommentBase(BaseModel):
    content: str
    position_3d: Optional[Dict[str, float]] = None # {"x": 1.2, "y": 2.0, "z": -0.5}
    element_id: Optional[str] = None
    parent_id: Optional[int] = None

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    project_id: int
    author_id: int
    is_resolved: bool
    created_at: datetime
    author: Optional[UserResponse] = None

    class Config:
        from_attributes = True

class DigitalTwinStateUpdate(BaseModel):
    project_id: int
    timestamp: datetime
    active_floor: int
    selected_element_id: Optional[str] = None
    weather_simulation: Optional[str] = "sunny"
    lighting_time: Optional[str] = "14:00"
    sensor_telemetry: Optional[Dict[str, Any]] = None # e.g. concrete cure temperature, humidity, stress
