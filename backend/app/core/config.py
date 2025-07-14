"""Configuration and settings for the WebRTC Voice Agent API."""

from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=".env")


class Settings(BaseSettings):
    """Application settings using Pydantic BaseSettings for environment variable management."""
    
    # LiveKit Configuration
    livekit_api_key: str = Field(..., env="LIVEKIT_API_KEY", description="LiveKit API key")
    livekit_api_secret: str = Field(..., env="LIVEKIT_API_SECRET", description="LiveKit API secret")
    livekit_url: str = Field(..., env="LIVEKIT_URL", description="LiveKit server URL")
    
    # AI Services Configuration
    openai_api_key: str = Field(..., env="OPENAI_API_KEY", description="OpenAI API key")
    eleven_api_key: str = Field(..., env="ELEVEN_API_KEY", description="ElevenLabs API key")
    
    # Optional: LangSmith Configuration
    langsmith_api_key: Optional[str] = Field(None, env="LANGSMITH_API_KEY", description="LangSmith API key")
    langsmith_project: str = Field("LanggraLivekit", env="LANGSMITH_PROJECT", description="LangSmith project name")
    langsmith_tracing: bool = Field(True, env="LANGSMITH_TRACING", description="Enable LangSmith tracing")
    
    # API Configuration
    api_v1_str: str = Field("/api/v1", description="API version 1 prefix")
    project_name: str = Field("WebRTC Voice Agent", description="Project name")
    version: str = Field("1.0.0", description="API version")
    
    # Server Configuration
    host: str = Field("0.0.0.0", env="HOST", description="Server host")
    port: int = Field(8000, env="PORT", description="Server port")
    debug: bool = Field(False, env="DEBUG", description="Debug mode")
    
    # CORS Configuration
    allowed_origins: List[str] = Field(["*"], env="ALLOWED_ORIGINS", description="CORS allowed origins")
    allowed_methods: List[str] = Field(["*"], env="ALLOWED_METHODS", description="CORS allowed methods")
    allowed_headers: List[str] = Field(["*"], env="ALLOWED_HEADERS", description="CORS allowed headers")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )


# Create global settings instance
settings = Settings()
