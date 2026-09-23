from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, JSON, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.core.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    ARCHITECT = "ARCHITECT"
    ENGINEER = "ENGINEER"
    HOMEOWNER = "HOMEOWNER"
    CONTRACTOR = "CONTRACTOR"
    DEVELOPER = "DEVELOPER"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.ARCHITECT, nullable=False)
    avatar_url = Column(String(500), nullable=True)
    organization = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="author", cascade="all, delete-orphan")
