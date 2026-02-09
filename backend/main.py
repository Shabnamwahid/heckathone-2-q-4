# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio

# Import backend modules
import db
from routes.tasks import router as tasks_router
from routes.auth import router as auth_router
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

# Startup event - tables create kare
@app.on_event("startup")
async def startup_event():
    try:
        await db.create_db_and_tables()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

# Routes include - updated to include user_id in path
app.include_router(tasks_router, prefix="/api/{user_id}", tags=["tasks"])
app.include_router(auth_router, prefix="", tags=["auth"])

@app.get("/")
def root():
    return {"message": "Multi-User Todo API is running - Phase 2 Complete"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
