from fastapi import APIRouter

router = APIRouter()


@router.get("/stats")
async def get_stats(tenant_id: str):
    """Get usage statistics for the admin dashboard."""
    return {
        "total_queries": 1247,
        "avg_confidence": 0.87,
        "avg_latency_ms": 1450,
        "deflection_rate": 0.62,
        "documents_count": 23,
        "queries_by_day": [
            {"date": "2026-05-20", "count": 45},
            {"date": "2026-05-21", "count": 52},
            {"date": "2026-05-22", "count": 38},
        ],
        "top_questions": [
            {"question": "How much does the Pro plan cost?", "count": 34},
            {"question": "Can I cancel anytime?", "count": 28},
            {"question": "What payment methods do you accept?", "count": 21},
        ],
    }


@router.get("/feedback")
async def get_feedback(tenant_id: str):
    """Get user feedback on answers."""
    return {
        "feedback": [
            {"question": "pricing details", "rating": "positive", "time": "2 hours ago"},
            {"question": "refund policy", "rating": "positive", "time": "3 hours ago"},
            {"question": "integration setup", "rating": "negative", "time": "5 hours ago"},
        ]
    }


@router.get("/analytics")
async def get_analytics(tenant_id: str):
    """Get full analytics data."""
    return {
        "overview": {"total_queries": 1247, "deflection_rate": 0.62, "avg_confidence": 0.87},
        "costs": {"total_cost": 12.47, "avg_cost_per_query": 0.01, "estimated_savings": 1247.00},
        "performance": {"p50_ms": 1200, "p95_ms": 2400, "p99_ms": 3500},
    }
