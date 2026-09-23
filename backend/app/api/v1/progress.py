from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.schemas.progress import DefectInspectionResponse
from app.services.progress_service import ProgressService

router = APIRouter(prefix="/progress", tags=["Construction Progress & Defect Inspection"])

class ImageAnalyzeRequest(BaseModel):
    project_id: int
    image_url: str

@router.post("/inspect-defects", response_model=DefectInspectionResponse)
async def inspect_defects(req: ImageAnalyzeRequest):
    return ProgressService.analyze_site_image(req.project_id, req.image_url)
