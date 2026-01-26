from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy.orm import sessionmaker
from typing import Generator
import os

# Use SQLite database
DATABASE_URL = "sqlite:///./todo_app.db"

# Create sync engine
engine = create_engine(
    DATABASE_URL,
    echo=True
)

# Create session maker for sync sessions
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)

def get_session() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session