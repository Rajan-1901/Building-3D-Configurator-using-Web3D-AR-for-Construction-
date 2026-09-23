from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, JSON, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.core.database import Base

class ProjectStatus(str, enum.Enum):
    PLANNING = "PLANNING"
    AI_DESIGN = "AI_DESIGN"
    ESTIMATION = "ESTIMATION"
    IN_REVIEW = "IN_REVIEW"
    APPROVED = "APPROVED"
    UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION"
    COMPLETED = "COMPLETED"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PLANNING, nullable=False)
    
    # Plot & Site Information
    plot_width = Column(Float, default=40.0) # feet / meters
    plot_length = Column(Float, default=60.0)
    plot_area = Column(Float, default=2400.0) # sq.ft
    location = Column(String(255), default="Bangalore, India")
    soil_type = Column(String(100), default="Red Loam")
    zoning_code = Column(String(100), default="R-2 Residential")
    
    # Building Specifications
    building_type = Column(String(100), default="Modern Villa")
    architectural_style = Column(String(100), default="Modern Minimalist")
    num_floors = Column(Integer, default=2)
    bedrooms = Column(Integer, default=3)
    bathrooms = Column(Integer, default=3)
    target_budget = Column(Float, default=125000.0) # USD / INR normalized
    has_parking = Column(Boolean, default=True)
    has_garden = Column(Boolean, default=True)
    has_solar = Column(Boolean, default=True)
    has_rainwater = Column(Boolean, default=True)
    
    # 3D Config & Digital Twin State
    building_config = Column(JSON, default=dict)
    interior_layout = Column(JSON, default=dict)
    cost_breakdown = Column(JSON, default=dict)
    sustainability_metrics = Column(JSON, default=dict)
    
    # Timestamps & Versioning
    version = Column(Integer, default=1)
    thumbnail_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="projects")
    milestones = relationship("Milestone", back_populates="project", cascade="all, delete-orphan")
    inspections = relationship("DefectInspection", back_populates="project", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="project", cascade="all, delete-orphan")
    versions = relationship("ProjectVersion", back_populates="project", cascade="all, delete-orphan")

class ProjectVersion(Base):
    __tablename__ = "project_versions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    version_number = Column(Integer, nullable=False)
    change_summary = Column(String(255), nullable=False)
    snapshot_data = Column(JSON, nullable=False)
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    project = relationship("Project", back_populates="versions")
