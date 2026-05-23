from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.api.core.config import settings
from apps.api.routers import ingest, query, admin, tenants

app = FastAPI(
    title="RAG Support Agent API",
    description="Production-grade Retrieval-Augmented Generation support agent",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router, prefix="/api/v1/ingest", tags=["ingest"])
app.include_router(query.router, prefix="/api/v1/query", tags=["query"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(tenants.router, prefix="/api/v1/tenants", tags=["tenants"])


@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}
