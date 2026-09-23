from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, timezone
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserLogin, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.email == user_in.email))
    existing = result.scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
        organization=user_in.organization,
        phone=user_in.phone,
        avatar_url=user_in.avatar_url or f"https://api.dicebear.com/7.x/avataaars/svg?seed={user_in.full_name}"
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    token = create_access_token(new_user.id)
    return Token(access_token=token, token_type="bearer", user=UserResponse.model_validate(new_user))

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.email == credentials.email))
    user = result.scalars().first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    token = create_access_token(user.id)
    return Token(access_token=token, token_type="bearer", user=UserResponse.model_validate(user))

@router.post("/demo-login", response_model=Token)
async def demo_login(role: UserRole = UserRole.ARCHITECT, db: AsyncSession = Depends(get_db)):
    # Instant demo login for SIH & investor showcases
    email = f"demo.{role.lower()}@buildverse.ai"
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalars().first()
    
    if not user:
        user = User(
            email=email,
            hashed_password=get_password_hash("BuildVerse2026!"),
            full_name=f"Lead {role.capitalize()}",
            role=role,
            organization="BuildVerse Enterprise Labs",
            avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={role}"
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    token = create_access_token(user.id)
    return Token(access_token=token, token_type="bearer", user=UserResponse.model_validate(user))
