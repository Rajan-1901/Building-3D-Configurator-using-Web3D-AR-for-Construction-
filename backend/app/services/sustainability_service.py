from app.schemas.sustainability import SustainabilityAnalysisRequest, SustainabilityAnalysisResponse

class SustainabilityService:
    @staticmethod
    def analyze_sustainability(req: SustainabilityAnalysisRequest) -> SustainabilityAnalysisResponse:
        # Solar energy calculation (kWh / year)
        # Solar area = 70% of roof area
        usable_solar_area_m2 = (req.roof_area_sqft * 0.7) * 0.0929
        solar_annual_kwh = usable_solar_area_m2 * req.location_solar_irradiance_kwh_m2_day * 365 * 0.19 if req.has_solar else 0.0
        solar_savings_usd = round(solar_annual_kwh * 0.16, 2) # avg $0.16 / kWh
        
        # Rainwater harvesting (Liters / year)
        # Roof area (m2) * rainfall (mm) * runoff coefficient (0.85)
        roof_area_m2 = req.roof_area_sqft * 0.0929
        rainwater_harvest_liters = round(roof_area_m2 * req.location_annual_rainfall_mm * 0.85, 0) if req.has_rainwater else 0.0

        # Carbon metrics
        embodied_carbon_ton = round((req.built_up_area_sqft * 0.28), 1)
        operational_carbon_ton = round((req.built_up_area_sqft * 0.045), 1)
        carbon_offset_solar_ton = round((solar_annual_kwh * 0.0007), 1)

        # Green score calculation
        score = 50
        if req.has_solar: score += 20
        if req.has_rainwater: score += 15
        if req.wall_material == "aac_blocks": score += 8
        if req.insulation_type == "rockwool": score += 7
        score = min(98, score)

        leed_rating = "Certified"
        if score >= 80: leed_rating = "Platinum"
        elif score >= 70: leed_rating = "Gold"
        elif score >= 60: leed_rating = "Silver"

        recs = [
            f"Equipping the {req.roof_area_sqft:.0f} sq.ft roof with BIPV panels offsets {carbon_offset_solar_ton} tons of CO2 annually.",
            f"The rainwater catchment tank can store up to {rainwater_harvest_liters:,.0f} liters, covering 65% of landscaping irrigation.",
            "Utilizing aerated low-thermal conductivity concrete cuts seasonal cooling demand by up to 24%."
        ]

        return SustainabilityAnalysisResponse(
            green_building_score=score,
            leed_rating_level=leed_rating,
            carbon_embodied_ton=embodied_carbon_ton,
            carbon_operational_annual_ton=operational_carbon_ton,
            carbon_offset_solar_ton=carbon_offset_solar_ton,
            net_carbon_rating="A+" if score >= 85 else "A",
            solar_annual_generation_kwh=round(solar_annual_kwh, 1),
            solar_annual_savings_usd=solar_savings_usd,
            rainwater_annual_harvest_liters=rainwater_harvest_liters,
            natural_ventilation_efficiency=88.5,
            thermal_comfort_index="Optimal",
            recommendations=recs
        )
