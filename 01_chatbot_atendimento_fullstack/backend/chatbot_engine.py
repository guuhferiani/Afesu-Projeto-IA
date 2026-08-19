import json
import os
import re
import math
from typing import Dict, Any, List, Tuple

class ChatbotEngine:
    def __init__(self, kb_path: str = None):
        if kb_path is None:
            kb_path = os.path.join(os.path.dirname(__file__), "base_conhecimento.json")
        self.kb_path = kb_path
        self.knowledge_base = self._load_knowledge_base()
        self.conversation_history: List[Dict[str, str]] = []
        self.metrics = {
            "total_messages": 0,
            "resolved_by_kb": 0,
            "fallback_used": 0,
            "positive_feedbacks": 0,
            "negative_feedbacks": 0
        }

    def _load_knowledge_base(self) -> Dict[str, Any]:
        if os.path.exists(self.kb_path):
            with open(self.kb_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"empresa": "Suporte IA", "topicos": [], "faq_rapido": []}

    def _preprocess_text(self, text: str) -> List[str]:
        """Normalização e tokenização básica de texto em português."""
        text = text.lower()
        # Remove pontuações e caracteres especiais
        text = re.sub(r"[^\w\s]", " ", text)
        stop_words = {
            "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das",
            "em", "no", "na", "nos", "nas", "por", "para", "com", "sem", "que", "e", "ou",
            "como", "qual", "quais", "onde", "quando", "quem", "por que", "porque", "é", "são"
        }
        tokens = [t.strip() for t in text.split() if t.strip() and t.strip() not in stop_words]
        return tokens

    def _calculate_similarity(self, query_tokens: List[str], target_phrase: str) -> float:
        """Calcula similaridade semântica / Jaccard ponderada por correspondência de termos."""
        target_tokens = set(self._preprocess_text(target_phrase))
        if not query_tokens or not target_tokens:
            return 0.0
        
        matches = sum(1 for token in query_tokens if any(token in t or t in token for t in target_tokens))
        union = len(set(query_tokens).union(target_tokens))
        return matches / max(union, 1)

    def process_message(self, user_message: str) -> Dict[str, Any]:
        """Processa a mensagem do usuário e busca a resposta mais assertiva."""
        self.metrics["total_messages"] += 1
        raw_msg = user_message.strip()
        tokens = self._preprocess_text(raw_msg)
        
        # Saudações comuns e cumprimentos
        greeting_words = {"ola", "olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí", "e ai", "hello", "hey"}
        lower_msg = raw_msg.lower()
        if any(g in lower_msg for g in greeting_words) and len(tokens) <= 4:
            return {
                "response": f"Olá! Bem-vindo(a) à **{self.knowledge_base.get('empresa', 'AfesuTech')}**! 👋\nComo posso ajudar você hoje? Você pode perguntar sobre nossos planos, integrações com React/Python, suporte técnico ou escolher uma das opções rápidas abaixo.",
                "source": "greeting",
                "confidence": 1.0,
                "suggested_actions": self.knowledge_base.get("faq_rapido", [])
            }

        # Busca na base de tópicos
        best_topic = None
        best_score = 0.0

        for topic in self.knowledge_base.get("topicos", []):
            for key_phrase in topic.get("perguntas_chave", []):
                score = self._calculate_similarity(tokens, key_phrase)
                # Bônus se houver substring exata
                if key_phrase.lower() in raw_msg.lower():
                    score += 0.4
                if score > best_score:
                    best_score = score
                    best_topic = topic

        # Se encontrou resposta na base de conhecimento com boa confiança
        if best_topic and best_score >= 0.25:
            self.metrics["resolved_by_kb"] += 1
            return {
                "response": best_topic["resposta"],
                "source": f"knowledge_base:{best_topic['id']}",
                "confidence": round(min(best_score, 1.0), 2),
                "suggested_actions": [f for f in self.knowledge_base.get("faq_rapido", []) if f != raw_msg][:3]
            }

        # Fallback inteligente com orientação
        self.metrics["fallback_used"] += 1
        return {
            "response": (
                "Entendi sua dúvida, mas ainda estou aprendendo sobre esse assunto específico! 🤖\n\n"
                "Você pode reformular a pergunta ou escolher um dos temas mais procurados abaixo:\n"
                "• **Planos e Preços** (Starter, Pro, Enterprise)\n"
                "• **Integração com Python & React** (FastAPI / APIs)\n"
                "• **Suporte Técnico 24/7 e SLA**\n"
                "• **Arquitetura de IA Generativa & RAG**"
            ),
            "source": "fallback",
            "confidence": 0.1,
            "suggested_actions": self.knowledge_base.get("faq_rapido", [])
        }

    def register_feedback(self, message_id: str, is_positive: bool) -> Dict[str, Any]:
        if is_positive:
            self.metrics["positive_feedbacks"] += 1
        else:
            self.metrics["negative_feedbacks"] += 1
        return {"status": "ok", "metrics": self.metrics}
