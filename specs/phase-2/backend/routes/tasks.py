from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from models import Task, TaskCreate, TaskRead, TaskUpdate
from dependencies import get_current_user
from db import get_session
from uuid import UUID
from datetime import datetime

router = APIRouter()

@router.get("/tasks", response_model=List[TaskRead])
async def get_tasks(
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session),
    status: Optional[str] = Query(None, description="Filter by status: all, pending, completed"),
    sort: Optional[str] = Query(None, description="Sort by: created_at, updated_at, title")
):
    """Get all tasks for the current user"""
    user_id = current_user["user_id"]
    
    query = select(Task).where(Task.user_id == user_id)
    
    if status:
        if status == "pending":
            query = query.where(Task.completed == False)
        elif status == "completed":
            query = query.where(Task.completed == True)
    
    if sort:
        if sort == "created_at":
            query = query.order_by(Task.created_at)
        elif sort == "updated_at":
            query = query.order_by(Task.updated_at)
        elif sort == "title":
            query = query.order_by(Task.title)
    
    tasks = session.exec(query).all()
    return tasks

@router.post("/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Create a new task for the current user"""
    user_id = current_user["user_id"]
    
    task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed,
        user_id=user_id
    )
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task

@router.get("/tasks/{task_id}", response_model=TaskRead)
async def get_task(
    task_id: UUID,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get a specific task by ID"""
    user_id = current_user["user_id"]
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    
    return task

@router.put("/tasks/{task_id}", response_model=TaskRead)
async def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update a specific task"""
    user_id = current_user["user_id"]
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    # Update task fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: UUID,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Delete a specific task"""
    user_id = current_user["user_id"]
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    session.delete(task)
    session.commit()
    
    return {"detail": "Task deleted successfully"}

@router.patch("/tasks/{task_id}/complete", response_model=TaskRead)
async def toggle_task_completion(
    task_id: UUID,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Toggle the completion status of a task"""
    user_id = current_user["user_id"]
    
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task