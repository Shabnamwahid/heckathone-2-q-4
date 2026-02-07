from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    database_url: str
    better_auth_secret: str
    frontend_url: Optional[str] = "http://localhost:3000"

    class Config:
        env_file = ".env"

settings = Settings()

