from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import uuid
from datetime import datetime

class Todo(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field()
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    user_id: uuid.UUID = Field(foreign_key='user.id')
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user: Optional['User'] = Relationship(back_populates='todos')
