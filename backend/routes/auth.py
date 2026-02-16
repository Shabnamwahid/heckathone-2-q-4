from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from typing import Annotated, Dict
from datetime import timedelta
from uuid import UUID
import uuid
from pydantic import BaseModel

from models import User, UserCreate, UserRead
from config import settings
from db import get_async_session
from dependencies import create_access_token, verify_jwt_token
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate a hash for the given password."""
    return pwd_context.hash(password)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead)
async def register_user(
    user_create: UserCreate,
    session: AsyncSession = Depends(get_async_session)
):
    """
    Register a new user account
    """
    # Check if user already exists
    existing_user_query = select(User).where(User.email == user_create.email)
    result = await session.exec(existing_user_query)
    existing_user = result.first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )

    # Hash the password
    hashed_password = get_password_hash(user_create.password)

    # Create new user
    user = User(
        id=uuid.uuid4(),
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
    username: Annotated[str, Form(alias='username')],
    password: Annotated[str, Form(alias='password')],
    grant_type: Annotated[str, Form(alias='grant_type')] = "password",
    session: AsyncSession = Depends(get_async_session)
):
    if grant_type != "password":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid grant_type. Only 'password' is supported."
        )

    user_query = select(User).where(User.email == username)
    result = await session.exec(user_query)
    user = result.first()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=30)
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



@router.post("/logout")
def logout_user():
    """
    Logout endpoint (client-side token removal is sufficient for JWT)
    """
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserRead)
async def get_current_user(
    current_user: Dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """
    Get authenticated user information
    """
    # Get the user from the database using the user_id from the JWT token
    user_query = select(User).where(User.id == UUID(current_user["user_id"]))
    result = await session.exec(user_query)
    user = result.first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        created_at=user.created_at
    )