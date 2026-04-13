from fastapi import APIRouter
from app.api.schemas.response import ChatResponse,HistoryResponse,MessageOut
from app.api.schemas.request import ChatRequest
router = APIRouter(prefix="/chat", tags=["chat"])

async def send_message(
    message: str,
    session_id: str | None = None,
    stream: bool = False,
)->ChatResponse:
    """
    Handle incoming chat messages, manage conversation sessions, and generate responses.

    Parameters:
    - message: The user's input message.
    - session_id: Optional ID for an existing conversation; if not provided, a new session is created.
    - stream: If True, the response will be streamed back to the client via Server-Sent Events (SSE).

    Returns:
    - A structured response containing the session ID, generated message, and token counts.
    """