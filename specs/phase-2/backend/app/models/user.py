from sqlmodel import SQLModel, Field, Relationship  
from typing import List  
import uuid  
  
class User(SQLModel, table=True):  
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)  
    email: str = Field(unique=True, index=True)  
    hashed_password: str  
    todos: List['Todo'] = Relationship(back_populates='user') 
