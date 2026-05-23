from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("")
async def list_tenants():
    """List all tenants."""
    return {
        "tenants": [
            {"id": "tenant_001", "name": "Acme Inc.", "document_count": 12, "created_at": "2026-05-01"},
            {"id": "tenant_002", "name": "Globex Corp", "document_count": 8, "created_at": "2026-05-10"},
        ]
    }


@router.post("")
async def create_tenant(name: str):
    """Create a new tenant."""
    return {
        "id": "tenant_003",
        "name": name,
        "api_key": "t_sk_live_abc123def456",
        "created_at": "2026-05-22T12:00:00Z",
    }


@router.delete("/{tenant_id}")
async def delete_tenant(tenant_id: str):
    """Delete a tenant and all its data."""
    return {"status": "deleted", "tenant_id": tenant_id}
