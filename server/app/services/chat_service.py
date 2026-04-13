from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import Settings
from app.llm.clients.base import BaseLLMClient

class ChatService:
    def __init__(
        self,
        db:AsyncSession,
        llm_client: BaseLLMClient,
        settings: Settings,
    )