from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Dict, Any
from models import Task, TaskCreate, TaskRead, TaskUpdate
from jose import jwt
from jwt.exceptions import InvalidTokenError
from config import settings
from db import get_async_session
from uuid import UUID
from datetime import datetime

security = HTTPBearer()

router = APIRouter()

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Verify JWT token and return user info
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(credentials.credentials, settings.better_auth_secret, algorithms=[settings.jwt_algorithm])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        if user_id is None:
            raise credentials_exception

        return {"user_id": user_id, "email": email}
    except InvalidTokenError:
        raise credentials_exception


def verify_user_authorization(user_id_from_path: str, current_user: dict = Depends(verify_jwt_token)):
    """
    Verify that the user_id in the JWT matches the user_id in the path
    """
    if current_user["user_id"] != user_id_from_path:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this user's resources"
        )
    return current_user

@router.get("/tasks", response_model=List[TaskRead])
async def get_tasks(
    user_id: str,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Get all tasks for the specified user"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's tasks")

    query = select(Task).where(Task.user_id == UUID(user_id))
    result = await session.exec(query)
    tasks = result.all()
    return tasks

@router.post("/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Create a new task for the specified user"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks for this user")

    task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed,
        user_id=UUID(user_id)
    )

    session.add(task)
    await session.commit()
    await session.refresh(task)

    return task

@router.get("/tasks/{task_id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    task_id: UUID,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Get a specific task by ID"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's tasks")

    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if str(task.user_id) != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")

    return task

@router.put("/tasks/{task_id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    task_id: UUID,
    task_update: TaskUpdate,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Update a specific task"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update tasks for this user")

    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if str(task.user_id) != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    # Update task fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    task.updated_at = datetime.utcnow()
    session.add(task)
    await session.commit()
    await session.refresh(task)

    return task

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: UUID,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Delete a specific task"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete tasks for this user")

    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if str(task.user_id) != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")

    await session.delete(task)
    await session.commit()

@router.patch("/tasks/{task_id}/toggle", response_model=TaskRead)
async def toggle_task_completion(
    user_id: str,
    task_id: UUID,
    current_user: dict = Depends(verify_jwt_token),
    session: AsyncSession = Depends(get_async_session)
):
    """Toggle the completion status of a task"""
    # Check if the user_id in the path matches the token user_id
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update tasks for this user")

    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if str(task.user_id) != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    task.completed = not task.completed
    task.updated_at = datetime.utcnow()
    session.add(task)
    await session.commit()
    await session.refresh(task)

    return task