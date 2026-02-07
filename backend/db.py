from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

# Load .env
load_dotenv()

# Fetch DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Remove sslmode parameter from DATABASE_URL to prevent asyncpg conflicts
parsed_url = urlparse(DATABASE_URL)
query_params = parse_qs(parsed_url.query)
# Remove sslmode from query parameters
query_params.pop('sslmode', None)
# Reconstruct the query string without sslmode
new_query = '&'.join([f'{key}={value[0]}' for key, value in query_params.items()])
cleaned_database_url = urlunparse((
    parsed_url.scheme,
    parsed_url.netloc,
    parsed_url.path,
    parsed_url.params,
    new_query,
    parsed_url.fragment
))

# Create async engine
engine = create_async_engine(cleaned_database_url, echo=True, connect_args={"ssl": None})

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
