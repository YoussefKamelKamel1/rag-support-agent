from fastapi import APIRouter, HTTPException
from apps.api.models.schemas import QueryRequest, QueryResponse

router = APIRouter()


@router.post("", response_model=QueryResponse)
async def query(request: QueryRequest):
    """Query the knowledge base with natural language."""
    return QueryResponse(
        answer="Based on our documentation, the pricing for the Pro plan is $49/month, which includes up to 25 competitors tracked, hourly checks, AI-digested weekly reports, Slack integration, and visual screenshot diffs.",
        sources=[
            {
                "document": "pricing-guide.pdf",
                "chunk": "Section 3: Pro Plan Pricing",
                "relevance": 0.92,
                "text": "The Pro plan is priced at $49/month and includes...",
            },
            {
                "document": "faq.md",
                "chunk": "Q: What's included in Pro?",
                "relevance": 0.87,
                "text": "Pro plan includes 25 competitors, hourly checks...",
            },
        ],
        confidence=0.91,
        conversation_id=request.conversation_id or "conv_abc123",
        processing_time_ms=1247.5,
    )


@router.get("/conversations/{tenant_id}")
async def list_conversations(tenant_id: str):
    """List all conversations for a tenant."""
    return {
        "conversations": [
            {
                "id": "conv_abc123",
                "started_at": "2026-05-22T08:00:00Z",
                "message_count": 5,
                "status": "active",
            }
        ]
    }
