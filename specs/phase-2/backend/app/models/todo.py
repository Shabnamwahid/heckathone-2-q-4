from sqlmodel import SQLModel, Field, Relationship  
from typing import Optional  
import uuid  
  
class Todo(SQLModel, table=True):  
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)  
    title: str = Field()  
    completed: bool = Field(default=False)  
    user_id: uuid.UUID = Field(foreign_key='user.id')  
    user: Optional['User'] = Relationship(back_populates='todos') 
