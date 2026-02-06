from pydantic_settings import BaseSettings
from typing import Optional
from urllib.parse import urlparse, parse_qs, urlencode
from sqlalchemy.engine import URL


class Settings(BaseSettings):
    database_url: str
    better_auth_secret: str
    jwt_algorithm: str = "HS256"
    frontend_url: Optional[str] = "http://localhost:3000"

    class Config:
        env_file = ".env"

    @property
    def database_url_fixed(self):
        """
        Fixes the database URL for Neon PostgreSQL compatibility by removing
        sslmode parameter which causes issues with asyncpg
        """
        # Parse the original URL using SQLAlchemy's URL class
        from sqlalchemy import make_url, URL
        url_obj = make_url(self.database_url)
        query = dict(url_obj.query)

        # Remove sslmode parameter which causes the TypeError
        if "sslmode" in query:
            sslmode_value = query.pop("sslmode")
            # Optionally log the removed parameter
            print(f"Removed sslmode parameter: {sslmode_value}")

        # Create a new URL without the problematic sslmode parameter
        fixed_url = URL.create(
            drivername=url_obj.drivername,
            username=url_obj.username,
            password=url_obj.password,
            host=url_obj.host,
            port=url_obj.port,
            database=url_obj.database,
            query=query
        )
        
        # Print the fixed URL for debugging
        print(f"Fixed URL: {fixed_url}")
        return fixed_url

settings = Settings()