# Unified start command - starts all services concurrently
start-all:
	@echo "🚀 Starting WebRTC Voice Agent - All Services..."
	@echo "📋 Starting Backend Server..."
	@echo "🤖 Starting LangGraph Agent..."
	@echo "🔄 Starting Pipeline Worker..."
	@echo "⚠️  Press Ctrl+C to stop all services"
	@echo ""
	@$(MAKE) -j3 start-backend start-agent start-pipeline

# Individual service commands
start-backend:
	@echo "[BACKEND] Starting FastAPI server on port 8000..."
	cd backend && poetry run python main.py

start-agent:
	@echo "[AGENT] Starting LangGraph development server..."
	cd backend && poetry run langgraph dev --no-browser

start-pipeline:
	@echo "[PIPELINE] Starting pipeline worker..."
	cd backend && poetry run python app/llm/pipeline.py dev

# Legacy aliases for backward compatibility
start: start-backend

# Frontend commands
start-frontend:
	@echo "[FRONTEND] Starting Next.js development server..."
	cd frontend && pnpm run dev

# Development setup
install:
	@echo "📦 Installing Python dependencies..."
	cd backend && poetry install
	@echo "📦 Installing Frontend dependencies..."
	cd frontend && pnpm install

install-python:
	cd backend && poetry install

install-frontend:
	cd frontend && pnpm install

# Utility commands
clean:
	@echo "🧹 Cleaning up..."
	cd backend && find . -type d -name "__pycache__" -exec rm -rf {} +
	cd frontend && rm -rf .next node_modules/.cache

clean-git:
	@echo "🗑️ Removing nested Git repositories..."
	@if exist "frontend\.git" rmdir /s /q "frontend\.git"
	@if exist "backend\.git" rmdir /s /q "backend\.git"
	@echo "✅ Git cleanup complete"

help:
	@echo "🎤 WebRTC Voice Agent - Available Commands:"
	@echo ""
	@echo "🚀 Main Commands:"
	@echo "  start-all       - Start all services (backend + agent + pipeline)"
	@echo "  start-backend   - Start FastAPI backend server only"
	@echo "  start-agent     - Start LangGraph agent server only"
	@echo "  start-pipeline  - Start pipeline worker only"
	@echo "  start-frontend  - Start Next.js frontend only"
	@echo ""
	@echo "📦 Setup Commands:"
	@echo "  install         - Install all dependencies (Python + Frontend)"
	@echo "  install-python  - Install Python dependencies only"
	@echo "  install-frontend- Install Frontend dependencies only"
	@echo ""
	@echo "🧹 Utility Commands:"
	@echo "  clean           - Clean cache and temporary files"
	@echo "  help            - Show this help message"
	@echo ""
	@echo "💡 Quick Start:"
	@echo "  1. make install     # Install dependencies"
	@echo "  2. make start-all   # Start all services"
	@echo "  3. make start-frontend  # In another terminal, start frontend"
	@echo ""
	@echo "🌐 Access Points:"
	@echo "  Backend API: http://localhost:8000"
	@echo "  LangGraph Studio: http://localhost:8123"
	@echo "  Frontend: http://localhost:3000"

default: help