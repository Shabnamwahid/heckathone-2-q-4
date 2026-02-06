from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession as SQLAlchemyAsyncSession
from typing import AsyncGenerator
import os
from config import settings

# Use Neon PostgreSQL database from environment variable
DATABASE_URL = settings.database_url_fixed

# Create async engine (for Neon PostgreSQL compatibility)
# Handle SSL properly for Neon PostgreSQL
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # debug ke liye
    # Pass SSL settings in connect_args to ensure secure connection
    connect_args={"ssl": "require"}
)

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        yield session