#!/usr/bin/env python3
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os

# Import using relative paths since we're in the backend package
import db
from routes import tasks
from routes import auth
from dependencies import get_current_user

app = FastAPI(title="Multi-User Todo API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", os.getenv("FRONTEND_URL", "")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global JWT verification middleware
@app.middleware("http")
async def jwt_auth_middleware(request: Request, call_next):
    # Apply JWT verification to all /api routes except auth routes
    if request.url.path.startswith('/api/') and not request.url.path.startswith('/auth/'):
        # Extract token from Authorization header
        authorization = request.headers.get('Authorization')
        if not authorization or not authorization.startswith('Bearer '):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid Authorization header",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Verify the token by calling get_current_user
        try:
            from fastapi.security import HTTPAuthorizationCredentials
            token = authorization.split(' ')[1]
            credentials = HTTPAuthorizationCredentials(scheme='Bearer', credentials=token)
            await get_current_user(credentials)
        except HTTPException:
            raise

    response = await call_next(request)
    return response

@app.on_event("startup")
def startup_event():
    db.create_db_and_tables()

# Include auth and task routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api", tags=["tasks"])

@app.get("/")
def root():
    return {"message": "Multi-User Todo API is running - Phase 2 Complete"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)