# 🎓 Roteiro de Aulas & Prompts Práticos — Projeto 1: Chatbot de Suporte Full-Stack
### Curso de Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40h)
**AFESU Veleiros & SENAI-SP** | **Instrutor**: Gustavo Feriani

---

## 🎯 Objetivo Pedagógico
Capacitar as alunas a construírem, passo a passo, uma solução completa de **Atendimento ao Cliente com IA Generativa e Reconhecimento de Voz**, integrando um backend em **Python (FastAPI + NLP/RAG)** a um frontend moderno em **React (Vite + Web Speech API)**.

A metodologia utiliza o **Pair Programming com IA**: as alunas utilizam os prompts estruturados para guiar o assistente de IA, entendem a arquitetura de cada componente gerado, personalizam as regras de negócio e testam a aplicação na prática.

---

## 🗺️ Visão Geral das Aulas do Projeto 1

```
┌────────────────────────────────────────────────────────────────────────┐
│  AULA 1: Fundamentos de IA Generativa & Base de Conhecimento (JSON)   │
├────────────────────────────────────────────────────────────────────────┤
│  AULA 2: Motor de PLN/RAG e API REST com Python & FastAPI             │
├────────────────────────────────────────────────────────────────────────┤
│  AULA 3: Interface Web Interativa do Chatbot em React (Vite)          │
├────────────────────────────────────────────────────────────────────────┤
│  AULA 4: Entrada por Voz (Web Speech API / STT) & Métricas de Sucesso  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 AULA 1: Fundamentos de IA, RAG e Base de Conhecimento

### 💡 Conceitos Trabalhados com a Turma:
- O que é **IA Generativa** e por que modelos de linguagem podem "alucinar" se não tiverem uma base factual.
- O conceito de **RAG (Retrieval-Augmented Generation)**: consultar dados confiáveis antes de responder.
- Estruturação de dados no formato **JSON (Chave-Valor)**.

---

### 💬 Prompt 1.1 — Criação da Empresa e Base de Conhecimento JSON
> **Instrução para as alunas:** Copiem o prompt abaixo e peçam para a IA gerar a base da empresa fictícia que vocês escolherem (ex: empresa de tecnologia, e-commerce de moda, clínica, etc.).

```text
Atue como um especialista em IA Generativa e Engenharia de Conhecimento.
Preciso criar uma base de dados no formato JSON chamada "base_conhecimento.json" para alimentar o chatbot de suporte de uma empresa fictícia chamada "AfesuTech" (empresa de tecnologia e soluções de IA).

A base deve conter:
1. "empresa": Nome da empresa e breve descrição.
2. "faq_rapido": Uma lista de 4 perguntas frequentes curtas que o usuário pode clicar direto.
3. "topicos": Uma lista de pelo menos 5 tópicos de suporte. Cada tópico deve ter:
   - "id": identificador único (ex: "planos_precos")
   - "titulo": Título amigável
   - "perguntas_chave": Lista de 4 a 6 variações de como o cliente pode perguntar esse tema (sinônimos)
   - "resposta": Resposta clara, acolhedora, formatada com emojis e markdown
   - "palavras_chave": Termos técnicos essenciais para busca

Retorne apenas o JSON válido e bem formatado em português.
```

---

### 💬 Prompt 1.2 — Enriquecimento e Testes de Perguntas
> **Instrução para as alunas:** Usem este prompt para testar se a base cobre diferentes formas de o usuário falar.

```text
Analise a base de conhecimento JSON criada e adicione 3 novas formas informais ou com gírias que jovens e clientes usam no dia a dia para as perguntas-chave (ex: "quanto custa?", "rola desconto?", "tem suporte no zap?"). 
Certifique-se de que a estrutura continue 100% compatível com o JSON anterior.
```

---

## ⚙️ AULA 2: Motor de PLN (RAG) e Backend Python (FastAPI)

### 💡 Conceitos Trabalhados com a Turma:
- **Processamento de Linguagem Natural (PLN)**: Tokenização, remoção de *Stop Words* (palavras vazias como "de", "para", "o", "a") e normalização de texto.
- **Cálculo de Similaridade**: Como a máquina mede a proximidade entre a pergunta do usuário e a base documental.
- **APIs REST com FastAPI**: Rotas HTTP (`GET`, `POST`), serialização com `Pydantic` e CORS.

---

### 💬 Prompt 2.1 — Motor de Inteligência Artificial (`chatbot_engine.py`)
> **Instrução para as alunas:** Vamos criar o cérebro que lê o JSON e busca a resposta correta para a pergunta do usuário.

```text
Crie um módulo Python chamado "chatbot_engine.py" que implemente a classe "ChatbotEngine".
Ela deve:
1. Carregar a "base_conhecimento.json" criada na aula anterior.
2. Ter um método "_preprocess_text(text: str)" que converte o texto para minúsculas, remove pontuação e filtra stopwords em português.
3. Ter um método "_calculate_similarity(query_tokens, target_phrase)" para calcular a taxa de correspondência entre as palavras da pergunta do usuário e as frases da base.
4. Ter o método principal "process_message(user_message: str)" que:
   - Detecta saudações comuns ("olá", "bom dia", "oi") e responde amigavelmente.
   - Percorre os tópicos da base e encontra a resposta com maior pontuação de similaridade.
   - Retorna um fallback inteligente caso a pontuação seja menor que o limiar de corte (0.25).
   - Retorna a resposta, o nível de confiança (0.0 a 1.0), a fonte da informação e sugestões rápidas.
5. Manter um dicionário de métricas (total de mensagens, resolvidas pela base, fallbacks e feedbacks).

Documente o código com comentários simples e didáticos para estudantes de programação.
```

---

### 💬 Prompt 2.2 — Servidor Web API com FastAPI (`main.py`)
> **Instrução para as alunas:** Agora vamos criar a API para que qualquer site ou aplicativo possa conversar com nossa IA.

```text
Crie um arquivo "main.py" utilizando FastAPI para expor o "ChatbotEngine" via API REST.
O servidor deve conter:
1. Configuração de CORS (FastAPI CORSMiddleware) liberando origens locais para conexão com o frontend React.
2. Modelos Pydantic para validação de dados:
   - MessageRequest: campo "message" (obrigatório) e "session_id".
   - ChatResponse: "reply", "source", "confidence", "timestamp", "suggested_actions".
   - FeedbackRequest: "message_id" e "is_positive" (booleano).
3. Endpoints:
   - GET "/": status da API.
   - POST "/api/chat": recebe a mensagem do usuário, processa pelo engine e retorna o ChatResponse.
   - GET "/api/metrics": retorna o total de atendimentos e taxa de satisfação.
   - POST "/api/feedback": registra likes e dislikes dos usuários para medir a acurácia.
4. Bloco de execução com uvicorn na porta 8000.
```

---

### 💬 Prompt 2.3 — Teste Automatizado do Backend (`test_backend.py`)
> **Instrução para as alunas:** Vamos rodar um teste no terminal para garantir que o cérebro da IA está respondendo antes de criar a tela.

```text
Escreva um script de teste em Python chamado "test_backend.py" que instancie a classe "ChatbotEngine" e teste 3 cenários:
1. Uma saudação ("Olá, boa tarde!")
2. Uma dúvida que existe na base ("Quais são os planos e preços disponíveis?")
3. Uma dúvida que NÃO existe na base ("Como fazer um bolo de chocolate?")

O script deve imprimir a pergunta, a resposta obtida, a confiança e se o teste passou com sucesso.
```

---

## 🎨 AULA 3: Interface Web Moderna com React & Vite

### 💡 Conceitos Trabalhados com a Turma:
- Componentização no **React** (Props, State com `useState`, Efeitos com `useEffect`, Referências com `useRef`).
- Comunicação assíncrona com `fetch` (consumo de API REST).
- Design System: **Glassmorphism**, Tema Escuro (*Dark Mode*), acessibilidade e responsividade.

---

### 💬 Prompt 3.1 — Configuração do Projeto Vite + React
> **Instrução para as alunas:** Vamos criar o projeto frontend e instalar as dependências de ícones e componentes.

```text
Me mostre o passo a passo com comandos do terminal para criar um projeto React com Vite na pasta "frontend", usando JavaScript padrão, e instalar a biblioteca "lucide-react" para ícones modernos.
```

---

### 💬 Prompt 3.2 — Componente Principal da Janela de Chat (`ChatWindow.jsx`)
> **Instrução para as alunas:** Vamos criar a tela do Chatbot com histórico de mensagens, balões do usuário e da IA, sugestões rápidas e botões de feedback.

```text
Crie um componente React chamado "ChatWindow.jsx" com as seguintes características:
1. Estado de mensagens com uma mensagem inicial de boas-vindas do robô.
2. Campo de entrada de texto com botão de envio e rolagem automática para a última mensagem usando "useRef".
3. Conexão real com a rota "POST /api/chat" do backend FastAPI:
   - Envia o texto digitado.
   - Mostra indicador de carregamento ("Digitando resposta...") enquanto a IA processa.
   - Exibe a resposta formatada na tela.
4. Botões de ação rápida (chips de sugestões) que, ao serem clicados, enviam a pergunta direto para o chat.
5. Botões de feedback com ícones de polegar (Like / Dislike) em cada mensagem da IA, enviando a avaliação para "POST /api/feedback".
6. Botão para exportar o histórico da conversa em arquivo ".txt".
7. Layout responsivo com design moderno escuro e efeito de vidro (glassmorphism).
```

---

## 🎙️ AULA 4: Entrada por Voz (STT), Métricas e Apresentação

### 💡 Conceitos Trabalhados com a Turma:
- **Speech-to-Text (STT)** no navegador utilizando a **Web Speech API** nativa.
- Acessibilidade e interfaces por comando de voz.
- Painel de métricas em tempo real (Taxa de Satisfação dos Clientes).
- Teste de aceitação e apresentação do projeto (Pitch).

---

### 💬 Prompt 4.1 — Componente de Reconhecimento de Voz (`VoiceInput.jsx`)
> **Instrução para as alunas:** Vamos permitir que qualquer pessoa possa falar no microfone e o texto seja digitado automaticamente no chat!

```text
Crie um componente React chamado "VoiceInput.jsx" que utilize a "Web Speech API" (window.SpeechRecognition / window.webkitSpeechRecognition) nativa dos navegadores.
Ele deve conter:
1. Botão com ícone de microfone (Lucide React).
2. Ao clicar, inicia o reconhecimento de voz configurado para Português do Brasil ("pt-BR").
3. Feedback visual animado de gravação (efeito pulsante vermelho enquanto estiver ouvindo).
4. Ao finalizar a fala, passa o texto transcrito para a função de callback "onTranscript".
5. Tratamento de erros caso o microfone esteja bloqueado ou o navegador não suporte a API.
```

---

### 💬 Prompt 4.2 — Painel de Métricas e Conclusão
> **Instrução para as alunas:** Vamos adicionar o contador de atendimentos e a porcentagem de satisfação no topo da tela.

```text
Adicione no topo do "ChatWindow.jsx" uma barra de status com indicadores visuais:
- Total de mensagens trocadas
- Quantidade de dúvidas resolvidas pela base
- Taxa percentual de satisfação (Likes vs Dislikes)
- Indicador de status do backend (Online / Offline com bolinha verde/vermelha)
```

---

## 🏆 Roteiro de Avaliação e Desafios Extras para as Alunas

### 🌟 Desafios de Personalização (Para alunas que terminarem antes):
1. **Personalização da Marca**: Alterar o nome da empresa, as cores primárias no CSS e adicionar o logo do seu grupo.
2. **Novos Tópicos na Base**: Adicionar pelo menos 3 novos tópicos de suporte com respostas detalhadas no `base_conhecimento.json`.
3. **Text-to-Speech (Voz da IA)**: Usar `window.speechSynthesis` para fazer a IA ler as respostas em voz alta para o usuário.

### 📋 Checklist de Entrega da Aluna:
- [ ] A base de conhecimento JSON está preenchida e válida.
- [ ] O backend em FastAPI responde às mensagens na rota `/api/chat`.
- [ ] A interface React exibe os balões de conversa com visual moderno.
- [ ] O botão de microfone transcreve a voz com sucesso em português.
- [ ] O sistema de feedback registra os likes e calcula a satisfação.
- [ ] A turma realizou a demonstração prática do chatbot em funcionamento!
