from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from passlib.context import CryptContext
from models import User, UserCreate
from db import get_async_session
from dependencies import create_access_token
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register(user: UserCreate, session: AsyncSession = Depends(get_async_session)):
    result = await session.exec(select(User).where(User.email == user.email))
    existing = result.first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    db_user = User(email=user.email, full_name=user.full_name, hashed_password=hashed_password)
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return {"id": db_user.id, "email": db_user.email, "full_name": db_user.full_name, "created_at": db_user.created_at}

from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(login_request: LoginRequest, session: AsyncSession = Depends(get_async_session)):
    result = await session.exec(select(User).where(User.email == login_request.email))
    db_user = result.first()
    if not db_user or not pwd_context.verify(login_request.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": str(db_user.id)})
    return {"access_token": token, "token_type": "bearer", "user": {"id": db_user.id, "email": db_user.email, "full_name": db_user.full_name}}
