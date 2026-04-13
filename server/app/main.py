from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.routes import health

app =FastAPI()

settings = get_settings()

origins = ["*"] if settings.APP_ENV == "development" else [
    settings.APP_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers

app.include_router(health.router,prefix=settings.API_PREFIX)
