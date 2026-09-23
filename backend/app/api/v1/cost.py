from fastapi import APIRouter
from app.schemas.cost import CostEstimateRequest, CostEstimateResponse
from app.services.cost_service import CostService

router = APIRouter(prefix="/cost", tags=["Cost Estimation"])

@router.post("/estimate", response_model=CostEstimateResponse)
async def estimate_cost(req: CostEstimateRequest):
    return CostService.calculate_cost(req)
