from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/todo_db"  # Default fallback
    better_auth_secret: str = "your-super-secret-key-change-this-in-production"
    frontend_url: Optional[str] = "http://127.0.0.1:3001"
    jwt_algorithm: str = "HS256"

    class Config:
        env_file = ".env"

settings = Settings()

