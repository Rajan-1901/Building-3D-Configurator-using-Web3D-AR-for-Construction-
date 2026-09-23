from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import logging

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router
from app.websocket.connection_manager import manager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("buildverse.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables asynchronously
    logger.info("Initializing database schema...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database schema initialized.")
    yield
    logger.info("Shutting down BuildVerse AI Backend...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise AI-Powered AR Construction Planning, Visualization & Digital Twin Platform API",
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "platform": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "status": "OPERATIONAL",
        "version": "2.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "HEALTHY", "services": ["database", "ai_engine", "digital_twin_ws", "cost_engine"]}

@app.websocket("/ws/{project_id}")
async def websocket_endpoint(websocket: WebSocket, project_id: str):
    await manager.connect(websocket, project_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Broadcast state changes to all clients connected to this project
            await manager.broadcast_to_project(project_id, data, exclude_ws=websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket, project_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket, project_id)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
