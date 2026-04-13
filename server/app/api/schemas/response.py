
from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    env: str

# Chat-related responses

class MessageOut(BaseModel):
    id: str
    role: str
    content: str
    created_at: str

class HistoryResponse(BaseModel):
    session_id: str
    messages: list[MessageOut]
      
class ChatResponse(BaseModel):
    session_id: str
    message: MessageOut
    input_tokens: int
    output_tokens: int