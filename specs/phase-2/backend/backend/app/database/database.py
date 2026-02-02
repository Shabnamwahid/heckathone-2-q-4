from sqlmodel import create_engine, Session
from sqlalchemy import event
from sqlalchemy.engine import Engine
from typing import Generator
import sqlite3
from ..core.config import settings


# Create engine
engine = create_engine(settings.DATABASE_URL, echo=settings.DEBUG)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


def create_db_and_tables():
    """Create database tables"""
    from ..models.user import User
    from ..models.task import Task
    from sqlmodel import SQLModel
    
    SQLModel.metadata.create_all(engine)


# Enable foreign key support for SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()