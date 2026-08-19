from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import time

from chatbot_engine import ChatbotEngine

app = FastAPI(
    title="API de Atendimento com IA Generativa - AfesuTech",
    description="Backend oficial do Projeto 1 - Curso de Programação em IA Generativa (Afesu Veleiros / SENAI-SP)",
    version="1.0.0"
)

# Configuração de CORS para permitir requisições do Frontend React (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = ChatbotEngine()

class MessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default_session"

class FeedbackRequest(BaseModel):
    message_id: str
    is_positive: bool

class ChatResponse(BaseModel):
    reply: str
    source: str
    confidence: float
    timestamp: float
    suggested_actions: List[str]

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "AfesuTech AI Support Backend",
        "version": "1.0.0",
        "endpoints": ["/api/chat", "/api/knowledge-base", "/api/metrics", "/api/feedback"]
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(payload: MessageRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="A mensagem não pode ser vazia.")
    
    result = engine.process_message(payload.message)
    return ChatResponse(
        reply=result["response"],
        source=result["source"],
        confidence=result["confidence"],
        timestamp=time.time(),
        suggested_actions=result.get("suggested_actions", [])
    )

@app.get("/api/knowledge-base")
def get_knowledge_base():
    return engine.knowledge_base

@app.get("/api/metrics")
def get_metrics():
    return {
        "status": "active",
        "metrics": engine.metrics,
        "satisfaction_rate": (
            round((engine.metrics["positive_feedbacks"] / max(1, (engine.metrics["positive_feedbacks"] + engine.metrics["negative_feedbacks"]))) * 100, 1)
            if (engine.metrics["positive_feedbacks"] + engine.metrics["negative_feedbacks"]) > 0 else 100.0
        )
    }

@app.post("/api/feedback")
def feedback_endpoint(payload: FeedbackRequest):
    return engine.register_feedback(payload.message_id, payload.is_positive)

if __name__ == "__main__":
    import uvicorn
    print("Iniciando servidor de API na porta 8000...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
