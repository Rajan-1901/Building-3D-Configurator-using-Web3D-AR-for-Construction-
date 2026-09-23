from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "BuildVerse AI"
    TAGLINE: str = "Design. Visualize. Build. Experience."
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "buildverse-ai-super-secret-enterprise-jwt-key-2026-production-ready"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days

    DATABASE_URL: str = "sqlite+aiosqlite:///./buildverse.db"

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
    ]

    ENABLE_AI_SIMULATION: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
