# 🚀 Portal de Projetos em Inteligência Artificial Generativa
### Curso de Aperfeiçoamento Profissional (40 Horas) • SENAI-SP & AFESU Veleiros

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SENAI](https://img.shields.io/badge/SENAI--SP-Formação%20Continuada-E30613?style=for-the-badge)
![Afesu](https://img.shields.io/badge/AFESU-Veleiros-0F766E?style=for-the-badge)

</div>

---

## 📌 Visão Geral do Projeto

Este repositório contém a **suíte completa de projetos práticos, materiais pedagógicos, documentação oficial e aplicação Full-Stack** desenvolvida para o curso de **Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40 Horas)**, realizado pela **AFESU Veleiros** em parceria com o **SENAI-SP**.

A formação adota a metodologia de **Aprendizagem Baseada em Projetos (PBL)**, integrando a robustez do ecossistema de **Inteligência Artificial em Python** com interfaces web modernas e interativas em **JavaScript / React**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PORTAL WEB FULL-STACK AI (React)                    │
│   • Checklist Interativo de Acompanhamento (Progresso em Tempo Real)    │
│   • Chatbot com Reconhecimento de Voz (Web Speech API / STT)            │
│   • Biblioteca de PDFs e Especificações de Projetos                     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ API REST / JSON
┌────────────────────────────────────▼────────────────────────────────────┐
│                    BACKEND DE IA GENERATIVA (Python FastAPI)            │
│   • Motor de IA Conversacional com RAG (Base de Conhecimento)          │
│   • Endpoints de Atendimento, Métricas e Feedback (/api/chat)           │
│   • Processamento de Linguagem Natural e Visão Computacional            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ Trilha Oficial dos 4 Projetos Práticos

| # | Projeto | Módulo da Ementa | Stack Tecnológico | Entregáveis Principais |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Chatbot de Suporte Inteligente** | Situação de Aprendizagem 1 *(IA Generativa)* | `Python`, `FastAPI`, `React`, `Web Speech API`, `RAG` | Assistente virtual para empresa de suporte escalável com entrada por voz, respostas contextualizadas e métricas de satisfação. |
| **02** | **Dashboard de Visão Computacional** | Módulo de Visão Computacional | `Python`, `OpenCV`, `YOLOv8`, `React Webcam` | Detecção de múltiplos objetos e reconhecimento facial em tempo real pela webcam com bounding boxes e contadores. |
| **03** | **Analisador de Sentimentos & Feedbacks** | Módulo de PLN | `Python`, `spaCy`, `NLTK`, `Scikit-Learn`, `Recharts` | Pipeline de limpeza textual, lematização e dashboard de classificação emocional de avaliações de clientes. |
| **04** | **Jogo Pong com IA Adaptativa** | Situação de Aprendizagem 2 *(Modelos Personalizados)* | `React`, `HTML5 Canvas`, `Heurística / Q-Learning` | Jogo interativo clássico onde o agente de IA ajusta seu tempo de reação e taxa de acerto contra o jogador humano. |

---

## 📄 Documentos & Planos de Implementação em PDF

Todos os planos de aula e diretrizes foram gerados e estão disponíveis na raiz do repositório:

- 📑 [**Plano_Geral_Projetos_IA_Afesu.pdf**](./Plano_Geral_Projetos_IA_Afesu.pdf): Plano geral do curso (40h), matriz curricular, competências técnicas e socioemocionais.
- 📑 [**01_Plano_Projeto_Chatbot_Suporte_IA.pdf**](./01_Plano_Projeto_Chatbot_Suporte_IA.pdf): Especificação técnica do Chatbot Full-Stack.
- 📑 [**02_Plano_Projeto_Visao_Computacional.pdf**](./02_Plano_Projeto_Visao_Computacional.pdf): Roteiro prático de Visão Computacional e YOLO.
- 📑 [**03_Plano_Projeto_Analise_Sentimentos_NLP.pdf**](./03_Plano_Projeto_Analise_Sentimentos_NLP.pdf): Pipeline e arquitetura de Análise de Sentimentos.
- 📑 [**04_Plano_Projeto_Jogo_Pong_IA.pdf**](./04_Plano_Projeto_Jogo_Pong_IA.pdf): Estrutura do jogo Pong e modelagem de IA.
- 📑 [**PROGRAMAÇÃO EM INTELIGENCIA ARTIFICIAL GENERATIVA.pdf**](./PROGRAMAÇÃO%20EM%20INTELIGENCIA%20ARTIFICIAL%20GENERATIVA.pdf): Plano de curso oficial SENAI-SP (2023).

---

## ⚡ Como Executar a Aplicação

### Pré-requisitos
- **Python 3.10+**
- **Node.js 18+** e **npm**
- Navegador moderno (Google Chrome ou Microsoft Edge recomendados para suporte a reconhecimento de voz)

### 🌟 Opção 1: Inicialização em 1 Clique (Windows)
Dê um duplo clique no arquivo [`iniciar_projeto.bat`](./iniciar_projeto.bat). Ele iniciará automaticamente o servidor backend e a interface web.

### 🛠️ Opção 2: Inicialização Manual via Terminal

#### 1. Iniciar o Backend Python (FastAPI):
```bash
cd "01_chatbot_atendimento_fullstack/backend"
pip install fastapi uvicorn pydantic reportlab
python main.py
```
> O backend estará acessível em `http://127.0.0.1:8000`
> Documentação interativa Swagger: `http://127.0.0.1:8000/docs`

#### 2. Iniciar o Frontend React (Vite):
```bash
cd "01_chatbot_atendimento_fullstack/frontend"
npm install
npm run dev
```
> Acesse o portal no navegador em `http://localhost:3000`

---

## 🧭 Recursos da Interface Web

1. **Janela de Atendimento do Chatbot**:
   - Integração com a base de conhecimento corporativa (*RAG*).
   - Suporte a comandos de voz (**Speech-to-Text / STT**) através do botão de microfone.
   - Avaliação de respostas (feedback positivo/negativo) com persistência de métricas.
   - Sugestões de perguntas rápidas (*chips*).
   - Exportação do histórico da conversa em arquivo `.txt`.
2. **Checklist Interativo de Acompanhamento (40 Horas)**:
   - Visualização do percentual total de conclusão do curso.
   - Filtro por módulos da ementa.
   - Persistência automática no navegador (`localStorage`).
   - Exportação de relatório da turma em `.txt`.
3. **Biblioteca de Projetos e PDFs**:
   - Resumo das tecnologias e acesso direto aos planos exportados.

---

## 📂 Estrutura de Diretórios

```text
Projeto Afesu Veleiros - Prog Inteligencial Artificial/
├── .agents/                                  # Configurações e Skills Antigravity
│   ├── rules/regras_negocio_projetos.md     # Regras de desenvolvimento
│   └── skills/afesu-ia-projects/SKILL.md    # Skill de diretrizes pedagógicas
│
├── 01_chatbot_atendimento_fullstack/        # Projeto 1: Chatbot Full-Stack
│   ├── backend/
│   │   ├── main.py                          # Servidor FastAPI
│   │   ├── chatbot_engine.py                # Motor NLP / RAG
│   │   ├── base_conhecimento.json           # Base documental da empresa
│   │   └── test_backend.py                  # Testes unitários
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx                      # Navegação por abas
│       │   ├── index.css                    # Design system e glassmorphism
│       │   ├── components/
│       │   │   ├── ChatWindow.jsx           # Chat com streaming e métricas
│       │   │   ├── VoiceInput.jsx           # Entrada por voz (Web Speech API)
│       │   │   ├── ProjectChecklist.jsx     # Checklist interativo
│       │   │   └── ProjectsOverview.jsx     # Catálogo de projetos
│       │   └── data/checklistData.js        # Matriz de itens do checklist
│       ├── package.json
│       └── vite.config.js
│
├── scripts/
│   └── gerar_pdfs_planos.py                 # Script gerador dos PDFs
│
├── 01_Plano_Projeto_Chatbot_Suporte_IA.pdf
├── 02_Plano_Projeto_Visao_Computacional.pdf
├── 03_Plano_Projeto_Analise_Sentimentos_NLP.pdf
├── 04_Plano_Projeto_Jogo_Pong_IA.pdf
├── Plano_Geral_Projetos_IA_Afesu.pdf
├── PROGRAMAÇÃO EM INTELIGENCIA ARTIFICIAL GENERATIVA.pdf
├── iniciar_projeto.bat
└── README.md
```

---

## 👥 Créditos e Realização

- **Instituições**: SENAI-SP & AFESU Veleiros
- **Professor / Instrutor**: Gustavo Feriani
- **Área Tecnológica**: Tecnologia da Informação - Software & Inteligência Artificial
