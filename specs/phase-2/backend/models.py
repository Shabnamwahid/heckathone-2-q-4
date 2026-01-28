from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import uuid
from datetime import datetime
from pydantic import BaseModel


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True, max_length=255)


class User(UserBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str = Field(max_length=255)
    todos: Optional[list['Task']] = Relationship(back_populates="user")


class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=128)


class TaskBase(SQLModel):
    title: str = Field(min_length=1)
    description: Optional[str] = Field(default=None, max_length=500)
    completed: bool = Field(default=False)
    user_id: uuid.UUID = Field(foreign_key="user.id")


class Task(TaskBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user: Optional[User] = Relationship(back_populates="todos")


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1)
    description: Optional[str] = Field(default=None, max_length=500)
    completed: Optional[bool] = None