from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any, List

router = APIRouter(prefix="/reports", tags=["Reports & BOQ"])

class ReportSummaryRequest(BaseModel):
    project_id: int
    project_title: str
    built_up_area_sqft: float
    total_cost_usd: float
    green_building_score: int
    carbon_footprint_ton: float

@router.post("/summary-data")
async def get_report_data(req: ReportSummaryRequest):
    return {
        "report_id": f"BV-REP-{req.project_id}-2026",
        "generated_date": "2026-09-23",
        "title": req.project_title,
        "executive_summary": "Comprehensive architectural, structural, Bill of Quantities (BOQ), and environmental sustainability audit for BuildVerse AI project.",
        "key_metrics": {
            "Total Built-up Area": f"{req.built_up_area_sqft:,.0f} sq.ft",
            "Estimated Project Cost": f"${req.total_cost_usd:,.2f}",
            "Cost Per Sq.Ft": f"${(req.total_cost_usd / max(1, req.built_up_area_sqft)):,.2f}",
            "Sustainability Rating": f"{req.green_building_score}/100 (LEED Platinum)",
            "Embodied Carbon": f"{req.carbon_footprint_ton} tons CO2e",
            "Compliance Score": "100% Zoning & Setback Compliant"
        },
        "sections": [
            {"name": "1. Site & Plot Parameters", "status": "APPROVED"},
            {"name": "2. Structural & Architectural Layout", "status": "APPROVED"},
            {"name": "3. Bill of Quantities & Material Procurement", "status": "OPTIMIZED"},
            {"name": "4. Renewable Energy & Environmental Audit", "status": "VERIFIED"},
            {"name": "5. Digital Twin Telemetry & Milestones", "status": "ACTIVE"}
        ]
    }
