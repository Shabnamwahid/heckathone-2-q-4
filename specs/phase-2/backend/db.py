from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy.orm import sessionmaker
from config import settings  # Changed from relative to absolute import
from typing import Generator
import os

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", settings.database_url)

# Create sync engine
engine = create_engine(DATABASE_URL, echo=True)

# Create session maker for sync sessions
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

async def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session