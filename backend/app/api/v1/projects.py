from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from datetime import datetime, timezone
from app.core.database import get_db
from app.models.project import Project, ProjectVersion, ProjectStatus
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse, ProjectVersionResponse

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).order_by(Project.updated_at.desc()))
    projects = result.scalars().all()
    return [ProjectResponse.model_validate(p) for p in projects]

@router.post("/", response_model=ProjectResponse)
async def create_project(project_in: ProjectCreate, db: AsyncSession = Depends(get_db)):
    new_project = Project(
        title=project_in.title,
        description=project_in.description,
        owner_id=1, # Default user context
        status=project_in.status,
        plot_width=project_in.plot_width,
        plot_length=project_in.plot_length,
        plot_area=project_in.plot_area or (project_in.plot_width * project_in.plot_length),
        location=project_in.location,
        soil_type=project_in.soil_type,
        zoning_code=project_in.zoning_code,
        building_type=project_in.building_type,
        architectural_style=project_in.architectural_style,
        num_floors=project_in.num_floors,
        bedrooms=project_in.bedrooms,
        bathrooms=project_in.bathrooms,
        target_budget=project_in.target_budget,
        has_parking=project_in.has_parking,
        has_garden=project_in.has_garden,
        has_solar=project_in.has_solar,
        has_rainwater=project_in.has_rainwater,
        building_config=project_in.building_config,
        interior_layout=project_in.interior_layout,
        cost_breakdown=project_in.cost_breakdown,
        sustainability_metrics=project_in.sustainability_metrics,
        thumbnail_url=project_in.thumbnail_url
    )
    db.add(new_project)
    await db.commit()
    await db.refresh(new_project)
    return ProjectResponse.model_validate(new_project)

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).filter(Project.id == project_id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse.model_validate(project)

@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: int, project_update: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).filter(Project.id == project_id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    project.version += 1
    project.updated_at = datetime.now(timezone.utc)
    
    # Create version snapshot
    version_snapshot = ProjectVersion(
        project_id=project.id,
        version_number=project.version,
        change_summary="Building model & parameters updated",
        snapshot_data={
            "building_config": project.building_config,
            "cost_breakdown": project.cost_breakdown,
            "sustainability_metrics": project.sustainability_metrics
        },
        created_by="Lead Architect"
    )
    db.add(version_snapshot)
    
    await db.commit()
    await db.refresh(project)
    return ProjectResponse.model_validate(project)
