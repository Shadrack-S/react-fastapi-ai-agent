from fastapi import APIRouter

from app.core.config import get_settings
from app.api.schemas.response import HealthResponse

router = APIRouter(prefix="/health", tags=["health"])
settings = get_settings()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        app=settings.APP_NAME,
        version=settings.APP_VERSION,
        env=settings.APP_ENV
    )
