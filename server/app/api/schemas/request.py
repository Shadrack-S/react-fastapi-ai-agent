from pydantic import BaseModel, Field


# ── Requests ──────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=8000, description="User message text")
    session_id: str | None = Field(
        default=None,
        description="Existing conversation ID; omit to start a new conversation",
    )
    stream: bool = Field(default=False, description="Stream response via SSE")

