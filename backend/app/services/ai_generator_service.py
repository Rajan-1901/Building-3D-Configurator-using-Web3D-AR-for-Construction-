import math
from typing import Dict, Any, List
from app.schemas.ai_generator import AIGenerateRequest, AIGenerationResult, BuildingElement3D, RoomLayout

class AIGeneratorService:
    @staticmethod
    def generate_building_design(req: AIGenerateRequest) -> AIGenerationResult:
        plot_area = req.plot_width * req.plot_length
        # Built up area typically 60-70% of plot footprint * number of floors
        ground_coverage_ratio = 0.65
        footprint_sqft = plot_area * ground_coverage_ratio
        built_up_area = footprint_sqft * req.num_floors
        
        # Base cost per sqft based on architectural style & budget
        style_cost_multiplier = {
            "Modern Minimalist": 62.0,
            "Scandinavian": 68.0,
            "Brutalist": 74.0,
            "Neo-Classical": 82.0,
            "Contemporary": 65.0,
        }.get(req.architectural_style, 65.0)
        
        estimated_cost = built_up_area * style_cost_multiplier
        
        # Sustainability & solar calculations
        roof_area = footprint_sqft
        solar_potential_kwh = (roof_area * 0.0929) * 5.2 * 365 * 0.18 if req.has_solar else 0 # m2 * irradiance * days * efficiency
        carbon_footprint = (built_up_area * 0.32) # ton CO2e baseline
        
        green_score = 65
        if req.has_solar: green_score += 15
        if req.has_rainwater: green_score += 10
        if req.has_garden: green_score += 10
        green_score = min(100, green_score)
        
        # Room distributions
        rooms: List[RoomLayout] = []
        room_types = [
            ("Master Bedroom with En-Suite", 1, 280, "16' x 17.5'", "East", 95, ["King Size Bed", "Wardrobe Suite", "Side Tables"]),
            ("Living & Grand Lounge", 1, 380, "19' x 20'", "North-East", 98, ["Sectional Sofa", "Coffee Table", "Entertainment Unit", "Accent Chairs"]),
            ("Chef's Gourmet Kitchen & Dining", 1, 320, "16' x 20'", "South-East", 90, ["Island Counter", "Dining Table 8-Seater", "Built-in Appliances"]),
            ("Guest Bedroom", 1 if req.num_floors == 1 else 2, 220, "14' x 15.7'", "North", 85, ["Queen Bed", "Workstation", "Wardrobe"]),
        ]
        
        if req.bedrooms >= 3:
            rooms.append(RoomLayout(
                room_id="room_bed_3",
                name="Executive Suite / Bedroom 3",
                floor=min(req.num_floors, 2),
                area_sqft=240,
                dimensions="15' x 16'",
                orientation="West",
                natural_light_score=88,
                suggested_furniture=["Queen Bed", "Bookshelf", "Lounge Chair"]
            ))
            
        if req.bedrooms >= 4:
            rooms.append(RoomLayout(
                room_id="room_bed_4",
                name="Penthouse Studio / Bedroom 4",
                floor=min(req.num_floors, 3),
                area_sqft=260,
                dimensions="16' x 16.2'",
                orientation="South",
                natural_light_score=92,
                suggested_furniture=["Custom Platform Bed", "Study Desk", "Balcony Lounger"]
            ))
            
        for i, (name, floor, area, dims, orient, light, furn) in enumerate(room_types):
            rooms.append(RoomLayout(
                room_id=f"room_{i+1}",
                name=name,
                floor=floor,
                area_sqft=area,
                dimensions=dims,
                orientation=orient,
                natural_light_score=light,
                suggested_furniture=furn
            ))

        # Generate 3D BIM Elements
        elements_3d: List[BuildingElement3D] = []
        
        # Base Foundation & Ground Floor Slab
        building_w = min(14.0, req.plot_width * 0.25)
        building_d = min(18.0, req.plot_length * 0.25)
        floor_height = 3.2
        
        # Ground Garden & Boundary
        if req.has_garden:
            elements_3d.append(BuildingElement3D(
                id="landscape_garden",
                type="garden",
                position=[0.0, 0.02, 0.0],
                scale=[building_w + 12.0, 0.05, building_d + 12.0],
                material_id="grass_lush",
                color="#10B981"
            ))
            
        # Foundation Slab
        elements_3d.append(BuildingElement3D(
            id="slab_foundation",
            type="floor",
            position=[0.0, 0.15, 0.0],
            scale=[building_w + 2.0, 0.3, building_d + 2.0],
            material_id="concrete_smooth",
            color="#94A3B8"
        ))
        
        # Generate Floors & Walls
        for floor_idx in range(req.num_floors):
            floor_y = 0.3 + (floor_idx * floor_height)
            
            # Floor Slab
            elements_3d.append(BuildingElement3D(
                id=f"slab_level_{floor_idx}",
                type="floor",
                position=[0.0, floor_y, 0.0],
                scale=[building_w, 0.25, building_d],
                material_id="wood_hardwood" if floor_idx > 0 else "tile_italian_marble",
                color="#CBD5E1"
            ))
            
            # Exterior Walls (North, South, East, West)
            wall_h = floor_height - 0.25
            wall_y = floor_y + (wall_h / 2.0)
            wall_thickness = 0.3
            
            # Main structure walls
            elements_3d.append(BuildingElement3D(
                id=f"wall_north_lvl_{floor_idx}",
                type="wall",
                position=[0.0, wall_y, -building_d / 2.0],
                scale=[building_w, wall_h, wall_thickness],
                material_id="concrete_facade",
                color="#F8FAFC" if req.architectural_style != "Brutalist" else "#64748B"
            ))
            elements_3d.append(BuildingElement3D(
                id=f"wall_south_lvl_{floor_idx}",
                type="wall",
                position=[0.0, wall_y, building_d / 2.0],
                scale=[building_w, wall_h, wall_thickness],
                material_id="concrete_facade",
                color="#F8FAFC" if req.architectural_style != "Brutalist" else "#64748B"
            ))
            elements_3d.append(BuildingElement3D(
                id=f"wall_east_lvl_{floor_idx}",
                type="wall",
                position=[building_w / 2.0, wall_y, 0.0],
                scale=[wall_thickness, wall_h, building_d],
                material_id="concrete_facade",
                color="#F1F5F9"
            ))
            elements_3d.append(BuildingElement3D(
                id=f"wall_west_lvl_{floor_idx}",
                type="wall",
                position=[-building_w / 2.0, wall_y, 0.0],
                scale=[wall_thickness, wall_h, building_d],
                material_id="concrete_facade",
                color="#F1F5F9"
            ))
            
            # Architectural Glass Panoramic Windows
            elements_3d.append(BuildingElement3D(
                id=f"window_facade_lvl_{floor_idx}",
                type="window",
                position=[0.0, wall_y, (building_d / 2.0) + 0.05],
                scale=[building_w * 0.6, wall_h * 0.75, 0.1],
                material_id="glass_low_e",
                color="#38BDF8"
            ))
            
            # Balconies on Upper Floors
            if floor_idx > 0:
                elements_3d.append(BuildingElement3D(
                    id=f"balcony_lvl_{floor_idx}",
                    type="balcony",
                    position=[0.0, floor_y, (building_d / 2.0) + 1.2],
                    scale=[building_w * 0.7, 0.2, 2.4],
                    material_id="timber_decking",
                    color="#D97706"
                ))
                
        # Roof Structure (Flat Modern Deck or Pitched)
        roof_y = 0.3 + (req.num_floors * floor_height)
        elements_3d.append(BuildingElement3D(
            id="roof_deck",
            type="roof",
            position=[0.0, roof_y, 0.0],
            scale=[building_w + 0.8, 0.3, building_d + 0.8],
            material_id="solar_integrated_roof" if req.has_solar else "concrete_smooth",
            color="#1E293B"
        ))
        
        # Solar Panel Matrix on Roof
        if req.has_solar:
            elements_3d.append(BuildingElement3D(
                id="solar_array_roof",
                type="solar_array",
                position=[0.0, roof_y + 0.25, 0.0],
                scale=[building_w * 0.75, 0.15, building_d * 0.65],
                material_id="photovoltaic_dark",
                color="#0284C7"
            ))

        # Parking Canopy
        if req.has_parking:
            elements_3d.append(BuildingElement3D(
                id="parking_garage_structure",
                type="parking",
                position=[(building_w / 2.0) + 3.0, 1.4, 0.0],
                scale=[4.5, 2.8, 6.0],
                material_id="steel_pergola",
                color="#334155"
            ))

        # Cost Breakdown Structure
        cost_breakdown = {
            "Civil & Structural": round(estimated_cost * 0.42, 2),
            "Finishes & Flooring": round(estimated_cost * 0.18, 2),
            "Electrical & Smart Automation": round(estimated_cost * 0.12, 2),
            "Plumbing & Sanitation": round(estimated_cost * 0.09, 2),
            "HVAC & Thermal Envelope": round(estimated_cost * 0.08, 2),
            "Architectural & Permitting": round(estimated_cost * 0.06, 2),
            "Contingency Reserve": round(estimated_cost * 0.05, 2),
        }

        material_recommendations = [
            {"name": "Low-Carbon AAC Blocks", "savings": "18% less thermal load", "impact": "Reduces HVAC energy by 22%"},
            {"name": "Double Glazed Low-E Solar Glass", "savings": "High daylight factor", "impact": "Prevents 85% infrared heat gain"},
            {"name": "Engineered Bamboo Flooring", "savings": "Eco-positive footprint", "impact": "Rapidly renewable carbon sink"},
            {"name": "BIPV Monocrystalline Solar Panels", "savings": "$1,450/yr offset", "impact": "Generates 8,400 kWh annual green power"},
        ]

        design_rationale = (
            f"The AI synthesized a {req.num_floors}-story {req.architectural_style} residence optimizing for "
            f"zoning setback compliance on a {req.plot_width}' x {req.plot_length}' parcel. Main living spaces "
            f"are oriented to capture East morning daylight while deep overhangs block aggressive afternoon solar radiation. "
            f"Equipped with integrated solar, rainwater recovery, and cross-ventilated room layouts."
        )

        return AIGenerationResult(
            project_title=f"{req.architectural_style} {req.building_type} at {req.location}",
            plot_area_sqft=plot_area,
            built_up_area_sqft=built_up_area,
            estimated_cost_usd=estimated_cost,
            carbon_footprint_ton=round(carbon_footprint, 1),
            green_building_score=green_score,
            solar_potential_kwh_yr=round(solar_potential_kwh, 1),
            design_rationale=design_rationale,
            rooms=rooms,
            building_config={
                "architectural_style": req.architectural_style,
                "num_floors": req.num_floors,
                "wall_color": "#F8FAFC",
                "roof_type": "flat_deck" if req.architectural_style != "Neo-Classical" else "hipped",
                "has_balcony": req.num_floors > 1,
                "has_garden": req.has_garden,
                "has_parking": req.has_parking,
                "has_solar": req.has_solar,
                "lighting_preset": "Day",
                "x_ray_mode": False
            },
            elements_3d=elements_3d,
            material_recommendations=material_recommendations,
            cost_breakdown=cost_breakdown
        )
