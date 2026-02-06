from sqlmodel import create_engine, SQLModel
from ..models import User, Task

DATABASE_URL = 'sqlite:///./todo_app.db'

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
