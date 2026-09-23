from fastapi import APIRouter
from app.schemas.sustainability import SustainabilityAnalysisRequest, SustainabilityAnalysisResponse
from app.services.sustainability_service import SustainabilityService

router = APIRouter(prefix="/sustainability", tags=["Sustainability"])

@router.post("/analyze", response_model=SustainabilityAnalysisResponse)
async def analyze_sustainability(req: SustainabilityAnalysisRequest):
    return SustainabilityService.analyze_sustainability(req)
