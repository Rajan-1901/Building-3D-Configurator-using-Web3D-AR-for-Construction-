from fastapi import APIRouter
from app.schemas.ai_generator import AIGenerateRequest, AIGenerationResult
from app.services.ai_generator_service import AIGeneratorService

router = APIRouter(prefix="/ai", tags=["AI Building Generator"])

@router.post("/generate-building", response_model=AIGenerationResult)
async def generate_building(req: AIGenerateRequest):
    return AIGeneratorService.generate_building_design(req)
