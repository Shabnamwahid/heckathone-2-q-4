from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from datetime import timedelta
from typing import Optional
from uuid import UUID

from ..database.database import get_session
from ..models.user import User, UserCreate, UserRead
from ..core.auth import auth_handler, ACCESS_TOKEN_EXPIRE_MINUTES, Token
from ..utils.exceptions import DuplicateEmailException, UserNotFoundException


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead)
def register_user(
    user_create: UserCreate,
    session: Session = Depends(get_session)
):
    """
    Register a new user account
    """
    # Check if user already exists
    existing_user = session.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise DuplicateEmailException()

    # Hash the password
    hashed_password = auth_handler.get_password_hash(user_create.password)

    # Create new user
    user = User(
        email=user_create.email,
        first_name=user_create.first_name,
        last_name=user_create.last_name,
        hashed_password=hashed_password
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.post("/login", response_model=Token)
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    """
    Authenticate user and return JWT token
    """
    user = auth_handler.authenticate_user(
        session, form_data.username, form_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_handler.create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
def logout_user():
    """
    Invalidate user session (client-side token removal)
    """
    # In a stateless JWT system, logout is handled client-side by removing the token
    # This endpoint could be extended to implement token blacklisting if needed
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserRead)
def get_current_user(user: User = Depends(auth_handler.get_current_user)):
    """
    Get authenticated user information
    """
    return user