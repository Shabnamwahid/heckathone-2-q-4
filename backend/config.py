from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    database_url: str
    better_auth_secret: str
    frontend_url: Optional[str] = "http://127.0.0.1:3001"
    jwt_algorithm: str = "HS256"

    class Config:
        env_file = ".env"

settings = Settings()

