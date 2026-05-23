from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://demo:demo@localhost:5432/rag-support"
    openai_api_key: str = ""
    llm_model: str = "gpt-4o"
    embedding_model: str = "text-embedding-3-large"
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = ""
    admin_api_key: str = "dev-admin-key"
    cors_origins: str = "http://localhost:3000"
    langfuse_public_key: str = ""
    langfuse_secret_key: str = ""

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
