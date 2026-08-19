from chatbot_engine import ChatbotEngine

def test_engine():
    engine = ChatbotEngine()
    print("Testing Chatbot Engine...")
    
    # Test Greeting
    r1 = engine.process_message("Olá, tudo bem?")
    print("Greeting response:", r1["source"], "| Confiança:", r1["confidence"])
    assert r1["source"] == "greeting"
    
    # Test Pricing query
    r2 = engine.process_message("Quais são os planos e preços?")
    print("Pricing response:", r2["source"], "| Confiança:", r2["confidence"])
    assert "knowledge_base:planos_precos" in r2["source"]
    
    # Test Integration query
    r3 = engine.process_message("Como faço a integração com React e Python?")
    print("Integration response:", r3["source"], "| Confiança:", r3["confidence"])
    assert "knowledge_base:integracao_api" in r3["source"]
    
    print("\n[OK] Todos os testes do motor de IA passaram com sucesso!")

if __name__ == "__main__":
    test_engine()
