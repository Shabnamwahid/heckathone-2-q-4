# main.py
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio

# Import backend modules
import db
from routes import tasks
from routes import auth
from dependencies import get_current_user
from config import settings

app = FastAPI(title="Multi-User Todo API", version="1.0.0")

# CORS middleware - frontend allow kare
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT middleware (global)
@app.middleware("http")
async def jwt_auth_middleware(request: Request, call_next):
    if request.url.path.startswith('/api/') and not request.url.path.startswith('/auth/'):
        authorization = request.headers.get('Authorization')
        if not authorization or not authorization.startswith('Bearer '):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid Authorization header",
                headers={"WWW-Authenticate": "Bearer"},
            )
        try:
            from fastapi.security import HTTPAuthorizationCredentials
            token = authorization.split(' ')[1]
            credentials = HTTPAuthorizationCredentials(scheme='Bearer', credentials=token)
            await get_current_user(credentials)
        except HTTPException:
            raise
    response = await call_next(request)
    return response

# Startup event - tables create kare
@app.on_event("startup")
async def startup_event():
    await db.create_db_and_tables()

# Routes include
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api", tags=["tasks"])

@app.get("/")
def root():
    return {"message": "Multi-User Todo API is running - Phase 2 Complete"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
