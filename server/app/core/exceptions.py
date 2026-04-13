from fastapi import HTTPException, status


class LLMProviderError(HTTPException):
    """Raised when the LLM provider returns an error or times out."""

    def __init__(self, detail: str = "LLM provider error") -> None:
        super().__init__(status_code=status.HTTP_502_BAD_GATEWAY, detail=detail)


class SessionNotFoundError(HTTPException):
    """Raised when a session/conversation ID does not exist."""

    def __init__(self, session_id: str) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session '{session_id}' not found.",
        )


class InvalidRequestError(HTTPException):
    """Raised for malformed or logically invalid requests."""

    def __init__(self, detail: str = "Invalid request") -> None:
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)


class AuthenticationError(HTTPException):
    """Raised when authentication fails."""

    def __init__(self, detail: str = "Could not validate credentials") -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class VectorStoreError(HTTPException):
    """Raised when the vector store operation fails."""

    def __init__(self, detail: str = "Vector store error") -> None:
        super().__init__(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=detail)