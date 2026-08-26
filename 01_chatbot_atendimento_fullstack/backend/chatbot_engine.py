import json
import os
import re
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional

def load_dotenv(env_path: Optional[str] = None):
    """Carregador leve de variáveis do arquivo .env sem dependências externas."""
    if env_path is None:
        env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip("'\"")
                if k and v and k not in os.environ:
                    os.environ[k] = v

# Carrega as variáveis do .env
load_dotenv()

from datetime import datetime

class ChatbotEngine:
    def __init__(self, kb_path: str = None):
        if kb_path is None:
            kb_path = os.path.join(os.path.dirname(__file__), "base_conhecimento.json")
        self.kb_path = kb_path
        self.knowledge_base = self._load_knowledge_base()
        self.conversation_history: List[Dict[str, str]] = []
        
        # Configuração da Groq LLM
        self.groq_api_key = os.environ.get("GROQ_API_KEY", "").strip()
        self.groq_model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile").strip()
        self.temperature = float(os.environ.get("TEMPERATURE", "0.7"))
        
        self.metrics = {
            "total_messages": 0,
            "resolved_by_kb": 0,
            "resolved_by_llm": 0,
            "fallback_used": 0,
            "positive_feedbacks": 0,
            "negative_feedbacks": 0
        }

    def _load_knowledge_base(self) -> Dict[str, Any]:
        if os.path.exists(self.kb_path):
            with open(self.kb_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"empresa": "AfesuTech", "topicos": [], "faq_rapido": []}

    def is_llm_active(self) -> bool:
        """Verifica se há uma chave de API da Groq válida configurada."""
        return bool(
            self.groq_api_key 
            and self.groq_api_key.startswith("gsk_") 
            and "COLE_SUA_CHAVE" not in self.groq_api_key
            and len(self.groq_api_key) >= 30
        )

    def _build_system_prompt(self) -> str:
        """Gera o prompt do sistema com RAG injetando a base de conhecimento e contexto temporal real."""
        empresa = self.knowledge_base.get("empresa", "AfesuTech Soluções Inteligentes")
        descricao = self.knowledge_base.get("descricao", "Empresa pioneira em IA e suporte automatizado.")
        
        # Data atual formatada em português para ancoragem temporal
        now = datetime.now()
        meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
        dias_semana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]
        data_formatada = f"{now.day} de {meses[now.month - 1]} de {now.year} ({dias_semana[now.weekday()]})"

        kb_text = f"EMPRESA: {empresa}\nDESCRIÇÃO: {descricao}\n\nBASE DE CONHECIMENTO OFICIAL:\n"
        for t in self.knowledge_base.get("topicos", []):
            kb_text += f"- Tópico: {t.get('id')} | Pergunta/Tema: {', '.join(t.get('perguntas_chave', []))}\n  Resposta Oficial: {t.get('resposta')}\n\n"

        prompt = f"""Você é o assistente virtual de inteligência artificial da **{empresa}**, desenvolvido em parceria pelas alunas da AFESU Veleiros e SENAI-SP.

CONTEXTO TEMPORAL:
- Data Atual: {data_formatada}.
- Ano Atual: {now.year}.
- Sempre utilize esta data ({data_formatada}) como a referência temporal REAL de hoje para quaisquer cálculos de datas, idades, anos de aniversário e eventos atuais.

DIRETRIZES DE ATENDIMENTO:
1. Seja sempre acolhedor, gentil, profissional e entusiasta da tecnologia.
2. Utilize formatação Markdown agradável com tópicos, negrito e emojis quando apropriado.
3. Para dúvidas sobre a {empresa}, planos, suporte, integrações e preços, SEMPRE utilize as informações da base de conhecimento abaixo com fidelidade.
4. Para perguntas gerais, curiosidades, bate-papo (ex: esportes, música, filmes, dicas de estudo, programação ou tecnologia), responda com simpatia e precisão, conectando com o universo de inovação/IA quando fizer sentido.
5. Seja conciso e direto, evitando respostas excessivamente longas a menos que o usuário solicite um passo a passo.

{kb_text}"""
        return prompt

    def _call_groq_llm(self, user_message: str) -> Optional[str]:
        """Chama a API da Groq Cloud usando a biblioteca padrão (urllib)."""
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }

        # Constrói o histórico para manter contexto multi-turn (últimas 8 mensagens)
        messages_payload = [{"role": "system", "content": self._build_system_prompt()}]
        for turn in self.conversation_history[-8:]:
            messages_payload.append(turn)
        messages_payload.append({"role": "user", "content": user_message})

        data = {
            "model": self.groq_model,
            "messages": messages_payload,
            "temperature": self.temperature,
            "max_tokens": 800
        }

        try:
            req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=12) as response:
                if response.status == 200:
                    resp_data = json.loads(response.read().decode("utf-8"))
                    content = resp_data["choices"][0]["message"]["content"]
                    
                    # Salva no histórico de conversação
                    self.conversation_history.append({"role": "user", "content": user_message})
                    self.conversation_history.append({"role": "assistant", "content": content})
                    return content
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"[Groq LLM HTTP Error {e.code}]: {err_body}")
        except Exception as e:
            print(f"[Groq LLM Connection Error]: {e}")
        return None

    def _preprocess_text(self, text: str) -> List[str]:
        """Normalização e tokenização básica de texto em português para busca léxica."""
        text = text.lower()
        text = re.sub(r"[^\w\s]", " ", text)
        stop_words = {
            "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das",
            "em", "no", "na", "nos", "nas", "por", "para", "com", "sem", "que", "e", "ou",
            "como", "qual", "quais", "onde", "quando", "quem", "por que", "porque", "é", "são"
        }
        return [t.strip() for t in text.split() if t.strip() and t.strip() not in stop_words]

    def _calculate_similarity(self, query_tokens: List[str], target_phrase: str) -> float:
        target_tokens = set(self._preprocess_text(target_phrase))
        if not query_tokens or not target_tokens:
            return 0.0
        matches = sum(1 for token in query_tokens if any(token in t or t in token for t in target_tokens))
        union = len(set(query_tokens).union(target_tokens))
        return matches / max(union, 1)

    def process_message(self, user_message: str) -> Dict[str, Any]:
        """Processa a mensagem do usuário via LLM Generativa (se ativa) ou motor léxico/RAG."""
        self.metrics["total_messages"] += 1
        raw_msg = user_message.strip()

        # 1. Se a Groq LLM estiver configurada, gera resposta inteligente e natural
        if self.is_llm_active():
            llm_reply = self._call_groq_llm(raw_msg)
            if llm_reply:
                self.metrics["resolved_by_llm"] += 1
                return {
                    "response": llm_reply,
                    "source": f"groq:{self.groq_model}",
                    "confidence": 0.98,
                    "suggested_actions": self.knowledge_base.get("faq_rapido", [])[:3]
                }

        # 2. Fallback offline: busca léxica e base de conhecimento JSON
        tokens = self._preprocess_text(raw_msg)
        
        # Saudações comuns
        greeting_words = {"ola", "olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí", "e ai", "hello", "hey"}
        lower_msg = raw_msg.lower()
        if any(g in lower_msg for g in greeting_words) and len(tokens) <= 4:
            return {
                "response": f"Olá! Bem-vindo(a) à **{self.knowledge_base.get('empresa', 'AfesuTech')}**! 👋\nComo posso ajudar você hoje? Você pode perguntar sobre nossos planos, integrações com React/Python, suporte técnico ou escolher uma das opções rápidas abaixo.",
                "source": "greeting",
                "confidence": 1.0,
                "suggested_actions": self.knowledge_base.get("faq_rapido", [])
            }

        best_topic = None
        best_score = 0.0

        for topic in self.knowledge_base.get("topicos", []):
            for key_phrase in topic.get("perguntas_chave", []):
                score = self._calculate_similarity(tokens, key_phrase)
                if key_phrase.lower() in raw_msg.lower():
                    score += 0.4
                if score > best_score:
                    best_score = score
                    best_topic = topic

        if best_topic and best_score >= 0.35:
            self.metrics["resolved_by_kb"] += 1
            return {
                "response": best_topic["resposta"],
                "source": f"knowledge_base:{best_topic['id']}",
                "confidence": round(min(best_score, 1.0), 2),
                "suggested_actions": [f for f in self.knowledge_base.get("faq_rapido", []) if f != raw_msg][:3]
            }

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
