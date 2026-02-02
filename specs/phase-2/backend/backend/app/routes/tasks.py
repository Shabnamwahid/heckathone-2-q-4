from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime
from uuid import UUID

from ..database.database import get_session
from ..models.task import Task, TaskCreate, TaskUpdate, TaskRead
from ..models.user import User
from ..core.middleware import verify_token
from ..core.auth import auth_handler
from ..utils.exceptions import TaskNotFoundException, UnauthorizedAccessException


router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("/", response_model=List[TaskRead])
def get_tasks(
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sort: str = Query("created_at", enum=["created_at", "updated_at", "title"]),
    order: str = Query("desc", enum=["asc", "desc"]),
    completed: Optional[bool] = Query(None)
):
    """
    Retrieve all tasks for the authenticated user only
    """
    # Base query filtered by current user
    query = select(Task).where(Task.user_id == current_user.id)
    
    # Apply completion filter if provided
    if completed is not None:
        query = query.where(Task.completed == completed)
    
    # Apply sorting
    if sort == "created_at":
        if order == "asc":
            query = query.order_by(Task.created_at.asc())
        else:
            query = query.order_by(Task.created_at.desc())
    elif sort == "updated_at":
        if order == "asc":
            query = query.order_by(Task.updated_at.asc())
        else:
            query = query.order_by(Task.updated_at.desc())
    elif sort == "title":
        if order == "asc":
            query = query.order_by(Task.title.asc())
        else:
            query = query.order_by(Task.title.desc())
    
    # Apply pagination
    query = query.offset(offset).limit(limit)
    
    tasks = session.exec(query).all()
    return tasks


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session)
):
    """
    Create a new task assigned to the authenticated user
    """
    # Create task with the authenticated user's ID
    task = Task(
        **task_create.dict(),
        user_id=current_user.id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    task_id: UUID,
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session)
):
    """
    Retrieve a specific task by ID, ensuring it belongs to the authenticated user
    """
    task = session.get(Task, task_id)

    # Check if task exists and belongs to current user
    if not task:
        raise TaskNotFoundException()

    if task.user_id != current_user.id:
        raise UnauthorizedAccessException()

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session)
):
    """
    Update an existing task, validating ownership by authenticated user
    """
    task = session.get(Task, task_id)

    # Check if task exists and belongs to current user
    if not task:
        raise TaskNotFoundException()

    if task.user_id != current_user.id:
        raise UnauthorizedAccessException()

    # Update task fields if provided
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    task.updated_at = datetime.now()
    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.patch("/{task_id}/toggle", response_model=TaskRead)
def toggle_task_completion(
    task_id: UUID,
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a task, validating ownership by authenticated user
    """
    task = session.get(Task, task_id)

    # Check if task exists and belongs to current user
    if not task:
        raise TaskNotFoundException()

    if task.user_id != current_user.id:
        raise UnauthorizedAccessException()

    # Toggle completion status
    task.completed = not task.completed
    task.updated_at = datetime.now()

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: UUID,
    current_user: User = Depends(verify_token),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task, validating ownership by authenticated user
    """
    task = session.get(Task, task_id)

    # Check if task exists and belongs to current user
    if not task:
        raise TaskNotFoundException()

    if task.user_id != current_user.id:
        raise UnauthorizedAccessException()

    session.delete(task)
    session.commit()

    return