from typing import List, Dict
from app.schemas.cost import CostEstimateRequest, CostEstimateResponse, CostItem

class CostService:
    @staticmethod
    def calculate_cost(req: CostEstimateRequest) -> CostEstimateResponse:
        area = req.built_up_area_sqft or (req.plot_area_sqft * 0.65 * req.num_floors)
        grade_multiplier = {
            "STANDARD": 55.0,
            "PREMIUM": 75.0,
            "LUXURY": 110.0
        }.get(req.quality_grade, 75.0)

        base_cost = area * grade_multiplier
        
        materials_cost = round(base_cost * 0.44, 2)
        labor_cost = round(base_cost * 0.22, 2)
        electrical_cost = round(base_cost * 0.10, 2)
        plumbing_cost = round(base_cost * 0.08, 2)
        hvac_interior_cost = round(base_cost * 0.09, 2)
        permits_fee = round(base_cost * 0.03, 2)
        contingency = round(base_cost * 0.04, 2)
        
        subtotal = materials_cost + labor_cost + electrical_cost + plumbing_cost + hvac_interior_cost + permits_fee + contingency
        taxes_gst = round(subtotal * 0.05, 2)
        total = subtotal + taxes_gst

        items: List[CostItem] = [
            CostItem(category="Civil & Structural", item_name="TMT Fe550D Steel Rebar", quantity=round(area * 0.004, 1), unit="Tons", unit_rate=820.0, subtotal=round(area * 0.004 * 820, 2)),
            CostItem(category="Civil & Structural", item_name="Ready-Mix Concrete (M25/M30 Grade)", quantity=round(area * 0.035, 1), unit="m³", unit_rate=115.0, subtotal=round(area * 0.035 * 115, 2)),
            CostItem(category="Masonry & Walls", item_name="Autoclaved Aerated Concrete (AAC) Blocks", quantity=round(area * 1.4, 0), unit="Blocks", unit_rate=2.8, subtotal=round(area * 1.4 * 2.8, 2)),
            CostItem(category="Flooring & Tiling", item_name="Italian Calacatta Marble & Vitrified Glazed Tiles", quantity=round(area * 0.85, 0), unit="sq.ft", unit_rate=12.5, subtotal=round(area * 0.85 * 12.5, 2)),
            CostItem(category="Glazing & Fenestration", item_name="Low-E Double Glazed Acoustic Windows", quantity=round(area * 0.22, 0), unit="sq.ft", unit_rate=35.0, subtotal=round(area * 0.22 * 35.0, 2)),
            CostItem(category="Electrical & MEP", item_name="Concealed Copper Wiring, Modular Switches & Smart Panel", quantity=1.0, unit="Lump Sum", unit_rate=electrical_cost, subtotal=electrical_cost),
            CostItem(category="Plumbing & Sanitation", item_name="CPVC Piping, Rainwater Storage & Kohler Fixtures", quantity=1.0, unit="Lump Sum", unit_rate=plumbing_cost, subtotal=plumbing_cost),
            CostItem(category="Labor & Supervision", item_name="Certified Site Engineers & Skilled Masonry Teams", quantity=round(area, 0), unit="sq.ft", unit_rate=round(labor_cost / area, 2), subtotal=labor_cost),
        ]

        savings = [
            "Switching exterior plaster to fly-ash blended mortar saves approx $2,400.",
            "Bulk procuring structural steel via BuildVerse partner discounts saves 6.5%.",
            "Pre-planning MEP conduit channels reduces site rework by 40%."
        ]

        return CostEstimateResponse(
            total_cost=round(total, 2),
            cost_per_sqft=round(total / area, 2),
            materials_cost=materials_cost,
            labor_cost=labor_cost,
            electrical_cost=electrical_cost,
            plumbing_cost=plumbing_cost,
            hvac_interior_cost=hvac_interior_cost,
            permits_and_architect_fee=permits_fee,
            contingency_fund=contingency,
            taxes_gst=taxes_gst,
            currency="USD",
            items=items,
            savings_suggestions=savings
        )
