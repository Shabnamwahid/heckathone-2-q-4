from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Form
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import timedelta
from typing import Optional
import uuid
from argon2 import PasswordHasher

from models import User, UserCreate, UserRead
from dependencies import create_access_token, get_current_user
from db import get_async_session
from config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

ph = PasswordHasher()

@router.post("/register", response_model=UserRead)
async def register_user(
    user_create: UserCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """
    Register a new user account
    """
    # Check if user already exists
    from sqlmodel import select
    existing_user = await session.exec(select(User).where(User.email == user_create.email))
    existing_user_result = existing_user.first()

    if existing_user_result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = ph.hash(user_create.password)

    # Create new user
    user = User(
        email=user_create.email,
        full_name=user_create.full_name,
        hashed_password=hashed_password
    )

    session.add(user)
    await session.commit()
    await session.refresh(user)

    return user


@router.post("/login")
async def login_user(
    email: str = Form(...),
    password: str = Form(...),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Authenticate user and return JWT token
    """
    from sqlmodel import select

    # Find user by email
    result = await session.exec(select(User).where(User.email == email))
    user = result.first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify password
    try:
        ph.verify(user.hashed_password, password)

        # Check if password needs rehashing
        if ph.check_needs_rehash(user.hashed_password):
            user.hashed_password = ph.hash(password)
            session.add(user)
            await session.commit()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)  # 30 minutes expiry
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user.id),
        "email": user.email,
        "full_name": user.full_name
    }


@router.get("/me", response_model=UserRead)
async def get_current_user_info(
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Get authenticated user information
    """
    from sqlmodel import select

    # Convert the user_id to proper UUID format
    user_uuid = current_user["user_id"]
    if isinstance(user_uuid, str):
        user_uuid = uuid.UUID(user_uuid)
    result = await session.exec(select(User).where(User.id == user_uuid))
    user = result.first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user