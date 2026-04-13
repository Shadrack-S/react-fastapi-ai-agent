from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_ENV: str = "development"
    APP_VERSION: str = "1.0.0"
    APP_NAME: str = "Generative AI Chatbot"
    APP_URL: str = "http://localhost:8000"

    API_PREFIX: str = "/api/v1"  
    PORT: int = 8000

    DATABASE_URL: str | None = None
    GROQ_API_KEY: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()