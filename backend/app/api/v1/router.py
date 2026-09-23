from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.projects import router as projects_router
from app.api.v1.ai_building import router as ai_router
from app.api.v1.materials import router as materials_router
from app.api.v1.cost import router as cost_router
from app.api.v1.sustainability import router as sustainability_router
from app.api.v1.progress import router as progress_router
from app.api.v1.collaboration import router as collaboration_router
from app.api.v1.reports import router as reports_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(projects_router)
api_router.include_router(ai_router)
api_router.include_router(materials_router)
api_router.include_router(cost_router)
api_router.include_router(sustainability_router)
api_router.include_router(progress_router)
api_router.include_router(collaboration_router)
api_router.include_router(reports_router)
