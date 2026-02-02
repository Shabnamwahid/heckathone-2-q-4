from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks, auth
from .database.database import create_db_and_tables
from .utils.exceptions import (
    custom_http_exception_handler,
    validation_exception_handler,
    general_exception_handler
)
from fastapi.exceptions import RequestValidationError
from fastapi import HTTPException
from .core.config import settings


# Create FastAPI app instance
app = FastAPI(
    title=settings.APP_NAME,
    description="Phase II backend for the Evolution of Todo project with authentication and task management",
    version="2.0.0",
    debug=settings.DEBUG
)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(tasks.router)
app.include_router(auth.router)


# Add exception handlers
app.add_exception_handler(HTTPException, custom_http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)


@app.on_event("startup")
def on_startup():
    """Create database tables on startup"""
    create_db_and_tables()


@app.get("/")
def read_root():
    """Root endpoint for health check"""
    return {"message": "Welcome to the Todo App API - Phase II"}


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "2.0.0"}