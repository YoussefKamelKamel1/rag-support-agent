from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from apps.api.models.schemas import IngestResponse

router = APIRouter()


@router.post("/document", response_model=IngestResponse)
async def ingest_document(
    tenant_id: str = Form(...),
    file: UploadFile = File(...),
):
    """Ingest a document into the knowledge base."""
    allowed_types = [
        "application/pdf",
        "text/plain",
        "text/markdown",
        "text/html",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")

    content = await file.read()

    return IngestResponse(
        document_id="doc_" + file.filename,
        status="queued",
        chunk_count=0,
        message=f"Document '{file.filename}' queued for processing.",
    )


@router.post("/webpage")
async def ingest_webpage(tenant_id: str, url: str):
    """Ingest a webpage into the knowledge base."""
    return {
        "status": "queued",
        "message": f"Webpage {url} queued for processing.",
    }


@router.get("/documents")
async def list_documents(tenant_id: str):
    """List all documents in a tenant's knowledge base."""
    return {
        "documents": [
            {
                "id": "doc_1",
                "filename": "pricing-guide.pdf",
                "status": "ready",
                "chunks": 45,
                "created_at": "2026-05-20T10:00:00Z",
            },
            {
                "id": "doc_2",
                "filename": "faq.md",
                "status": "ready",
                "chunks": 12,
                "created_at": "2026-05-21T14:30:00Z",
            },
            {
                "id": "doc_3",
                "filename": "api-docs.html",
                "status": "processing",
                "chunks": 0,
                "created_at": "2026-05-22T09:15:00Z",
            },
        ]
    }
