from fastapi import HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from jose.exceptions import JWTError
import httpx
import asyncio
from typing import Dict, Any, Optional
from config import settings
import json

security = HTTPBearer()

class JWTVerificationError(Exception):
    """Custom exception for JWT verification errors"""
    pass

async def get_jwks():
    """Fetch JWKS from the frontend auth endpoint"""
    frontend_url = settings.frontend_url or "http://127.0.0.1:3001"
    jwks_url = f"{frontend_url}/api/auth/jwks"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(jwks_url)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as e:
        raise JWTVerificationError(f"Failed to fetch JWKS: {str(e)}")
    except httpx.HTTPStatusError as e:
        raise JWTVerificationError(f"JWKS endpoint returned status {e.response.status_code}")

async def verify_better_auth_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Verify JWT token issued by Better Auth using JWKS
    """
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not credentials or not credentials.credentials:
        raise credentials_exception
    
    token = credentials.credentials
    
    try:
        # Fetch JWKS from frontend
        jwks = await get_jwks()
        
        # Decode token without verification first to get kid
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        
        if not kid:
            raise credentials_exception
            
        # Find the matching key in JWKS
        key = None
        for jwk in jwks.get("keys", []):
            if jwk.get("kid") == kid:
                key = jwk
                break
        
        if not key:
            raise credentials_exception
        
        # Verify the token using the found key
        payload = jwt.decode(
            token,
            key,
            algorithms=[key.get("alg", "RS256")],
            options={"verify_aud": False}  # Disable audience verification for simplicity
        )
        
        user_id = payload.get("sub")
        if not user_id:
            raise credentials_exception
            
        return {
            "user_id": user_id,
            "email": payload.get("email"),
            "name": payload.get("name")
        }
    except JWTError:
        raise credentials_exception
    except JWTVerificationError:
        raise credentials_exception
    except Exception:
        raise credentials_exception

async def verify_user_authorization(user_id_from_path: str, current_user: dict = Depends(verify_better_auth_token)):
    """
    Verify that the authenticated user matches the user_id in the path
    """
    if current_user["user_id"] != user_id_from_path:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to access this user's resources"
        )
    return current_user