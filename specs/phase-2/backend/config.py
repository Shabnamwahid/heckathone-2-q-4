from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://username:password@localhost/dbname"
    better_auth_secret: str = "your-better-auth-secret-key"
    jwt_algorithm: str = "HS256"
    frontend_url: Optional[str] = "http://localhost:3000"
    
    class Config:
        env_file = ".env"

settings = Settings()