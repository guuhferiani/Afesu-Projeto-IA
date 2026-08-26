from chatbot_engine import ChatbotEngine

def test_engine():
    engine = ChatbotEngine()
    print("Testing Chatbot Engine...")
    print(f"Modo LLM Ativo: {engine.is_llm_active()}")
    
    # Test Greeting
    r1 = engine.process_message("Olá, tudo bem?")
    print("Greeting response:", r1["source"], "| Confiança:", r1["confidence"])
    assert r1["source"] in ("greeting", f"groq:{engine.groq_model}")
    
    # Test Pricing query
    r2 = engine.process_message("Quais são os planos e preços?")
    print("Pricing response:", r2["source"], "| Confiança:", r2["confidence"])
    assert "planos_precos" in r2["source"] or f"groq:{engine.groq_model}" in r2["source"]
    
    # Test Integration query
    r3 = engine.process_message("Como faço a integração com React e Python?")
    print("Integration response:", r3["source"], "| Confiança:", r3["confidence"])
    assert "integracao_api" in r3["source"] or f"groq:{engine.groq_model}" in r3["source"]
    
    print("\n[OK] Todos os testes do motor de IA passaram com sucesso!")

if __name__ == "__main__":
    test_engine()

