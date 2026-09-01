# 📘 Caderno de Prompts Guiados — Projeto 01: Chatbot Full-Stack com IA e Voz
### Curso de Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40h)
**AFESU Veleiros & SENAI-SP** | **Instrutor**: Gustavo Feriani

---

## 🎯 Como Utilizar Este Caderno
Este material foi estruturado para a prática de **Pair Programming com Inteligência Artificial**. 
1. **Fase 1 (Projeto Guiado):** Todas as alunas executam a sequência de prompts abaixo para construir a base técnica oficial (**AfesuTech**).
2. **Fase 2 (Projeto Autônomo):** Com a estrutura pronta e funcionando, cada grupo ou aluna aplica os prompts de customização para criar a sua própria solução de mercado (e-commerce, clínica, escola, pet shop, etc.).

### 📑 Arquivos Individuais de Prompts (Pasta `prompts/`):
* [Prompt 01: Base de Conhecimento JSON](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/01_base_conhecimento_json.md)
* [Prompt 02: Motor de IA & PLN em Python](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/02_chatbot_engine_python.md)
* [Prompt 03: API REST FastAPI](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/03_fastapi_backend_main.md)
* [Prompt 04: Testes Automatizados no Terminal](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/04_testes_backend.md)
* [Prompt 05: Setup Frontend React + Vite](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/05_setup_frontend_vite.md)
* [Prompt 06: Estilos index.css Glassmorphism](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/06_estilos_index_css.md)
* [Prompt 07: Reconhecimento de Voz (STT)](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/07_componente_voice_input.md)
* [Prompt 08: Formatador Markdown](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/08_componente_formatted_message.md)
* [Prompt 09: Janela Principal ChatWindow](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/09_componente_chat_window.md)
* [Prompt 10: App & Header](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/10_componentes_app_header.md)
* [Prompt 11: Nova Empresa (Fase Autônoma)](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/11_empresa_personalizada.md)
* [Prompt 12: Customização CSS da Marca](file:///c:/Users/Professor(a)/Documents/Gustavo%20Feriani/Projeto%20Afesu%20Veleiros%20-%20Prog%20Inteligencial%20Artificial/01_chatbot_atendimento_fullstack/prompts/12_customizacao_css_marca.md)

---

# 🚀 FASE 1: Construção Guiada Passo a Passo

---

## 📁 ETAPA 0: Estrutura Inicial de Pastas
> **Orientação:** No terminal ou explorador de arquivos, crie a pasta do projeto:
> - `01_chatbot_atendimento_fullstack/backend/`
> - `01_chatbot_atendimento_fullstack/frontend/`

---

## 🧠 CAMADA 1: Dados & Conhecimento (JSON)

### 💬 PROMPT 1 — Criação da Base de Conhecimento (`backend/base_conhecimento.json`)
```text
Atue como um Engenheiro de Conhecimento e Especialista em IA.
Crie um arquivo JSON chamado "base_conhecimento.json" para alimentar o motor de RAG de uma empresa fictícia de tecnologia chamada "AfesuTech Soluções Inteligentes".

O JSON deve conter exatamente:
1. "empresa": Nome oficial da empresa.
2. "descricao": Breve descrição do negócio e impacto de IA.
3. "topicos": Lista com 6 tópicos essenciais de suporte ao cliente contendo:
   - "id": identificador único (ex: "planos_precos", "suporte_tecnico", "integracao_api", "ia_generativa", "cancelamento_reembolso", "sobre")
   - "perguntas_chave": Lista de 4 a 6 formas que o cliente pode perguntar (incluindo variações formais e informais)
   - "resposta": Resposta clara, acolhedora, com formatação rica em Markdown e emojis
4. "faq_rapido": Lista com 4 perguntas frequentes sugeridas para acesso rápido.

Retorne apenas o código JSON válido e formatado em português.
```

---

## ⚙️ CAMADA 2: Motor de IA & Processamento de Linguagem Natural (PLN)

### 💬 PROMPT 2 — Motor de Inteligência Artificial (`backend/chatbot_engine.py`)
```text
Crie um arquivo Python chamado "chatbot_engine.py" com a classe "ChatbotEngine" para processar as mensagens do Chatbot.

Requisitos da classe:
1. Carregar automaticamente o arquivo "base_conhecimento.json".
2. Suporte a LLM Generativa (Groq API com modelo Llama-3) lendo variáveis do arquivo ".env" caso exista:
   - Método "_build_system_prompt()": constrói o prompt de sistema injetando o contexto da empresa, a base de conhecimento (RAG) e a data atual real em português.
   - Método "_call_groq_llm(user_message)": executa a requisição HTTP usando urllib (sem dependências externas pesadas) mantendo histórico de conversação multi-turn.
3. Motor Léxico e Fallback Offline (caso não haja chave de API):
   - Método "_preprocess_text(text)": converte para minúsculas, remove pontuação e filtra stopwords em português.
   - Método "_calculate_similarity(query_tokens, target_phrase)": calcula a taxa de sobreposição de termos.
   - Detecção de saudações ("olá", "bom dia", "oi").
   - Busca pelo melhor tópico com limiar de corte de similaridade.
   - Resposta de fallback elegante quando não encontrar correspondência.
4. Gestão de Métricas:
   - Dicionário com total de mensagens, resolvidas por base/LLM, fallbacks e feedbacks positivos/negativos.
   - Método "register_feedback(message_id, is_positive)".

Documente o código com comentários didáticos e claros.
```

---

## 🌐 CAMADA 3: Servidor de API REST com FastAPI

### 💬 PROMPT 3 — Criação da API REST (`backend/main.py`)
```text
Crie um arquivo "main.py" utilizando FastAPI para expor o "ChatbotEngine" via API REST.

O servidor deve conter:
1. Configuração de CORS (CORSMiddleware) liberando todas as origens para conexão com o frontend Vite/React.
2. Modelos Pydantic:
   - MessageRequest: campo "message" (obrigatório) e "session_id" (opcional).
   - FeedbackRequest: campo "message_id" (str) e "is_positive" (bool).
   - ChatResponse: "reply" (str), "source" (str), "confidence" (float), "timestamp" (float) e "suggested_actions" (List[str]).
3. Endpoints da API:
   - GET "/": status da API e lista de endpoints disponíveis.
   - POST "/api/chat": recebe a mensagem, processa no engine e retorna o ChatResponse.
   - GET "/api/knowledge-base": retorna a base de conhecimento carregada.
   - GET "/api/metrics": retorna o total de atendimentos e a taxa calculada de satisfação (%).
   - POST "/api/feedback": registra a avaliação de Like/Dislike.
4. Bloco de execução com uvicorn na porta 8000.
```

---

### 💬 PROMPT 4 — Testes Automatizados no Terminal (`backend/test_backend.py`)
```text
Crie um script de teste em Python chamado "test_backend.py" que importe a classe "ChatbotEngine" e execute testes automatizados no terminal para validar:
1. Saudação do usuário ("Olá, tudo bem?")
2. Pergunta que existe na base de conhecimento ("Quais são os planos e preços?")
3. Pergunta sobre integração ("Como faço a integração com React e Python?")

O script deve exibir no terminal o status da LLM, as respostas obtidas, a confiança e confirmar com [OK] se todos os testes passaram.
```

---

## 💻 CAMADA 4: Interface do Usuário com React, Vite e Voz

### 💬 PROMPT 5 — Setup do Projeto Frontend (Terminal)
> **Instrução:** Execute no terminal dentro da pasta raiz:
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install lucide-react marked
```

---

### 💬 PROMPT 6 — Estilo Global Glassmorphism & Dark Mode (`frontend/src/index.css`)
```text
Crie o arquivo "src/index.css" para o Chatbot com um Design System moderno, tema escuro (Dark Mode) e efeito de vidro (Glassmorphism).

O CSS deve conter:
1. Variáveis CSS (:root) para cores de fundo (#0a0a0c, #12131a), acentos em degradê (azul e ciano), bordas translúcidas e tipografia Inter/Segoe UI.
2. Estilização do cabeçalho com indicador pulsante de status da API (online/offline).
3. Balões de conversa distintos:
   - Balão do Usuário: alinhado à direita com gradiente e borda arredondada.
   - Balão da IA: alinhado à esquerda com fundo translúcido e ícone de robô.
4. Efeito visual para o botão de microfone (gravação ativa com animação de pulso vermelho).
5. Chips de botões de perguntas rápidas com efeito de hover suave.
6. Barra de rolagem customizada e responsividade para dispositivos móveis.
```

---

### 💬 PROMPT 7 — Componente de Entrada por Voz / STT Mobile (`frontend/src/components/VoiceInput.jsx`)
```text
Crie um componente React chamado "VoiceInput.jsx" que utilize a Web Speech API (window.SpeechRecognition ou window.webkitSpeechRecognition) nativa dos navegadores para entrada por voz, com suporte robusto para computadores e smartphones (Android/iOS).

Requisitos do componente:
1. Botão com ícone de microfone (Lucide React: Mic / MicOff).
2. Configuração de idioma para Português do Brasil ("pt-BR") e inicialização limpa a cada clique para máxima estabilidade em celulares.
3. Validação de contexto seguro (HTTPS) com aviso amigável caso o usuário acesse em HTTP não seguro no celular.
4. Estado visual "isListening" que exibe indicador animado flutuante ("Ouvindo no celular... Fale agora!").
5. Quando a fala for reconhecida com sucesso, envia o texto transcrito para a função de callback da prop "onTranscript(transcript)".
6. Tratamento de erros detalhado (permissão negada, ausência de fala detectada ou navegador incompatível).
7. Limpeza e encerramento do reconhecimento no cleanup do useEffect ao desmontar o componente.
8. Props aceitas: "onTranscript" (função de callback obrigatória) e "disabled" (booleano opcional).
```

> **📱 Dica para testar no celular:** Execute `npx localtunnel --port 3000` no terminal do computador e abra o link HTTPS gerado no navegador do smartphone para usar o microfone real!

---

### 💬 PROMPT 8 — Formatador de Markdown Seguro (`frontend/src/components/FormattedMessage.jsx`)
```text
Crie um componente React chamado "FormattedMessage.jsx" utilizando a biblioteca "marked" para converter respostas da IA com formatação Markdown (negrito, listas, links e quebras de linha) em HTML seguro.
```

---

### 💬 PROMPT 9 — Janela Principal de Chat (`frontend/src/components/ChatWindow.jsx`)
```text
Crie o componente React "ChatWindow.jsx" completo para a experiência de atendimento inteligente.

Funcionalidades obrigatórias:
1. Histórico de mensagens com mensagem de boas-vindas inicial.
2. Integração com o backend FastAPI:
   - Envio de perguntas para "POST /api/chat".
   - Indicador visual animado de carregamento ("IA digitando...").
3. Integração com o componente "VoiceInput.jsx" para preenchimento ou envio por voz.
4. Chips interativos com as perguntas frequentes retornadas pela API ("suggested_actions").
5. Botões de Feedback (Like / Dislike) em cada mensagem da IA que disparam "POST /api/feedback".
6. Barra de métricas no topo exibindo:
   - Total de mensagens trocadas
   - Taxa de satisfação do atendimento (%)
   - Modo de operação (LLM Ativa / RAG Base de Conhecimento)
7. Botão para exportar o histórico do atendimento em arquivo de texto (.txt).
8. Auto-scroll suave sempre para a última mensagem usando "useRef".
```

---

### 💬 PROMPT 10 — Header e Estrutura Principal (`frontend/src/App.jsx` e `Header.jsx`)
```text
1. Crie o componente "src/components/Header.jsx" com o logotipo "Afesu Veleiros / SENAI-SP", identificação do curso de IA e bolinha com status de conexão com a API.
2. Atualize o "src/App.jsx" para gerenciar a verificação periódica de saúde da API (health check em /api/metrics) e renderizar a barra superior junto com o "ChatWindow.jsx".
```

---

# 🌟 FASE 2: Desafio de Autonomia (Crie Sua Própria Empresa)

> **Instrução para as alunas:** Agora que o chatbot está 100% funcionando, escolham um segmento de mercado para criar a **sua própria solução de IA** e apliquem os 2 prompts abaixo:

### 💬 PROMPT 11 — Gerador de Empresa Personalizada
```text
Atue como um consultor de negócios e IA. 
Quero personalizar o chatbot para uma nova empresa do seguinte segmento: [DIGITE AQUI O SEU RAMO, ex: Loja de Roupas Sustentáveis, Clínica Veterinária, Escola de Cursos, Pet Shop].

O nome da minha empresa é: [DIGITE O NOME DA SUA EMPRESA].

Gere um novo arquivo "base_conhecimento.json" completo com:
1. "empresa" e "descricao" da minha marca.
2. 6 tópicos de suporte realistas e estratégicos para os clientes do meu negócio.
3. Respostas bem formatadas com emojis e tom de voz alinhado à marca.
4. Lista de "faq_rapido" com as 4 dúvidas mais comuns.
```

---

### 💬 PROMPT 12 — Customização Visual da Marca no CSS
```text
Tenho o arquivo "index.css" do Chatbot e quero mudar a paleta de cores para combinar com a identidade visual da minha empresa [NOME DA EMPRESA], que utiliza tons de [EX: Roxo e Rosa Neon / Verde Esmeralda e Dourado / Laranja e Azul].

Me mostre apenas o bloco de variáveis ":root" atualizado com as novas cores primárias, secundárias e efeitos de brilho correspondentes.
```
