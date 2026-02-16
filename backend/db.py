from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator
from config import settings
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

import re

# Handle different database types appropriately
if settings.database_url.startswith("sqlite"):
    # For SQLite, we need to use the async SQLite driver
    # Replace sqlite:// with sqlite+aiosqlite://
    sqlite_url = settings.database_url.replace("sqlite:///", "sqlite+aiosqlite:///")
    engine = create_async_engine(sqlite_url, echo=True)
else:
    # For PostgreSQL, ensure we use the async driver
    # Convert psycopg2 URL to asyncpg URL if needed
    db_url = settings.database_url
    if db_url.startswith("postgresql://") and not "driver=asyncpg" in db_url:
        # Convert standard PostgreSQL URL to asyncpg format
        db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")
    elif db_url.startswith("postgres://"):  # Also handle the shorthand version
        # Convert shorthand PostgreSQL URL to asyncpg format
        db_url = db_url.replace("postgres://", "postgresql+asyncpg://")
    
    # If it's a NeonDB connection with sslmode=require, we need to handle it properly
    if 'neon.tech' in db_url and 'sslmode=require' in db_url:
        # For NeonDB, use the proper SSL settings
        engine = create_async_engine(db_url, echo=True)
    else:
        # For other PostgreSQL connections
        engine = create_async_engine(db_url, echo=True, connect_args={"ssl": None})

# Async session maker
async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Create tables
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# Async session generator
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
