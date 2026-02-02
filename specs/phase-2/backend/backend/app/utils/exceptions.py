from fastapi import HTTPException, status
from typing import Dict, Any
from pydantic import ValidationError
from sqlmodel import Session
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class TodoException(Exception):
    """Base exception class for todo app"""
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class UserNotFoundException(TodoException):
    """Raised when a user is not found"""
    def __init__(self, message: str = "User not found"):
        super().__init__(message, status.HTTP_404_NOT_FOUND)


class TaskNotFoundException(TodoException):
    """Raised when a task is not found"""
    def __init__(self, message: str = "Task not found"):
        super().__init__(message, status.HTTP_404_NOT_FOUND)


class UnauthorizedAccessException(TodoException):
    """Raised when a user tries to access resources they don't own"""
    def __init__(self, message: str = "Unauthorized access"):
        super().__init__(message, status.HTTP_403_FORBIDDEN)


class DuplicateEmailException(TodoException):
    """Raised when trying to register with an existing email"""
    def __init__(self, message: str = "Email already registered"):
        super().__init__(message, status.HTTP_400_BAD_REQUEST)


def custom_http_exception_handler(request, exc: HTTPException):
    """Custom handler for HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "type": "HTTPException",
                "message": exc.detail
            }
        }
    )


def validation_exception_handler(request, exc: RequestValidationError):
    """Custom handler for validation errors"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": {
                "type": "ValidationError",
                "message": "Validation error in request data",
                "details": exc.errors()
            }
        }
    )


def general_exception_handler(request, exc: Exception):
    """General exception handler for unexpected errors"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "type": "InternalServerError",
                "message": "An unexpected error occurred"
            }
        }
    )