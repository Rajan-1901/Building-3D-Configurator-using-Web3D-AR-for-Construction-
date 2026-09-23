from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.core.database import Base

class MilestoneStatus(str, enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    DELAYED = "DELAYED"

class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    planned_start = Column(DateTime, nullable=True)
    planned_end = Column(DateTime, nullable=True)
    actual_completion = Column(DateTime, nullable=True)
    status = Column(Enum(MilestoneStatus), default=MilestoneStatus.PENDING)
    completion_percentage = Column(Float, default=0.0)
    budget_allocated = Column(Float, default=0.0)
    actual_spent = Column(Float, default=0.0)

    project = relationship("Project", back_populates="milestones")

class DefectInspection(Base):
    __tablename__ = "defect_inspections"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    image_url = Column(String(500), nullable=False)
    detected_defects = Column(JSON, default=list) # [{type: 'Crack', confidence: 0.94, severity: 'HIGH', bbox: [...]}]
    completion_estimated = Column(Float, default=0.0)
    inspection_notes = Column(Text, nullable=True)
    inspector_name = Column(String(255), default="AI Computer Vision Agent")
    status = Column(String(50), default="ANALYZED") # PENDING, ANALYZED, RESOLVED
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    project = relationship("Project", back_populates="inspections")
