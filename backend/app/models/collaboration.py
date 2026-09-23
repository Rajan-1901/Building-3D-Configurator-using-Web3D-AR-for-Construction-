from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    position_3d = Column(JSON, nullable=True) # {x: 2.1, y: 1.0, z: -3.4} for BIM 3D pin annotations
    element_id = Column(String(100), nullable=True) # e.g. "wall_second_floor_north"
    parent_id = Column(Integer, ForeignKey("comments.id"), nullable=True)
    is_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    project = relationship("Project", back_populates="comments")
    author = relationship("User", back_populates="comments")
