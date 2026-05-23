from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class Document(BaseModel):
    id: str
    tenant_id: str
    filename: str
    content_type: str
    status: str = "processing"
    chunk_count: int = 0
    created_at: datetime = datetime.now()


class QueryRequest(BaseModel):
    tenant_id: str
    question: str
    conversation_id: Optional[str] = None
    max_chunks: int = 5


class QueryResponse(BaseModel):
    answer: str
    sources: list[dict]
    confidence: float
    conversation_id: str
    processing_time_ms: float


class Tenant(BaseModel):
    id: str
    name: str
    api_key: str
    created_at: datetime = datetime.now()


class IngestResponse(BaseModel):
    document_id: str
    status: str
    chunk_count: int
    message: str
