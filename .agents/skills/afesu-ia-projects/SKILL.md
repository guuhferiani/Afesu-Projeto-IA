---
name: afesu-ia-projects
description: >-
  Regras de negócio, diretrizes pedagógicas e arquitetura de software para os
  projetos do curso de Aperfeiçoamento Profissional em Inteligência Artificial Generativa
  (SENAI-SP / Afesu Veleiros - 40h). Use para orientar o desenvolvimento de projetos,
  exercícios práticos, integrações Python + React e avaliações do curso.
---

# Diretrizes e Regras de Negócio: Projetos de IA Generativa (Afesu Veleiros / SENAI-SP)

Este documento estabelece as regras de negócio, os padrões arquiteturais e a trilha pedagógica oficial para os projetos do curso de **Programação em Inteligência Artificial Generativa** (40 Horas).

---

## 🏛️ Contexto Institucional e Público-Alvo

- **Público**: Jovens a partir de 14 anos com ensino fundamental concluído e noções prévias de lógica/programação.
- **Abordagem Metodológica**: Aprendizagem baseada em projetos (PBL - *Project Based Learning*) e situações de aprendizagem contextualizadas no mercado de trabalho e impacto social.
- **Stack Tecnológico Oficial**:
  - **Backend / IA**: Python 3.10+ (`FastAPI`, `scikit-learn`, `TensorFlow`/`Keras`, `spaCy`, `NLTK`, `OpenCV`, `ultralytics/YOLO`, APIs de LLMs).
  - **Frontend / Interface**: JavaScript / React (`Vite`, CSS moderno/Tailwind, `Web Speech API`, `Canvas/HTML5`, `TensorFlow.js`).

---

## 🗺️ Trilha Oficial de Projetos (40 Horas)

### Projeto 1: Chatbot de Suporte Inteligente Full-Stack (Situação de Aprendizagem 1)
- **Tema**: Suporte ao cliente escalável com IA Generativa.
- **Backend (Python / FastAPI)**:
  - Base de conhecimento vetorial indexada sobre produtos/serviços.
  - Processamento de mensagens com LLM e regras de negócio.
  - Endpoint `/api/chat` e métricas de satisfação.
- **Frontend (React)**:
  - Widget de atendimento moderno e responsivo.
  - Suporte a entrada por Voz (**Speech-to-Text - STT**) nativo no navegador.
  - Histórico de mensagens e feedback de respostas (*like/dislike*).

### Projeto 2: Dashboard de Visão Computacional em Tempo Real
- **Tema**: Detecção de objetos e reconhecimento facial.
- **Stack**: Python (`OpenCV`, `YOLOv8`) + React (`Webcam capture` / `Canvas overlay`).
- **Entregáveis**: Identificação de rostos, classificação de objetos em tempo real com caixas delimitadoras e alertas visuais.

### Projeto 3: Analisador de Sentimentos e Feedbacks de Clientes
- **Tema**: Processamento de Linguagem Natural (PLN).
- **Stack**: Python (`spaCy`, `NLTK`, `scikit-learn`) + React (`Recharts`/Gráficos de sentimento).
- **Entregáveis**: Pipeline de limpeza de texto, lematização, remoção de stop words, classificação de satisfação (Positivo/Neutro/Negativo) e nuvem de palavras.

### Projeto 4: Jogo Pong com IA Adaptativa (Situação de Aprendizagem 2)
- **Tema**: Modelos Personalizados e Aprendizado por Reforço / Heurística.
- **Stack**: React + HTML5 Canvas + Algoritmo de IA.
- **Entregáveis**: Jogo interativo onde o jogador humano enfrenta um agente de IA com níveis de dificuldade e visualização do processo decisório da máquina.

---

## 📋 Critérios Avaliativos e Competências

### Competências Técnicas:
1. Identificar e aplicar conceitos de IA Generativa, Machine Learning e Redes Neurais.
2. Pré-processar dados tabulares, textuais e imagens.
3. Integrar modelos de IA com APIs REST modernas em Python e aplicações web em React.
4. Otimizar respostas e calibrar parâmetros de modelos.

### Competências Socioemocionais:
1. **Autogestão e Organização**: Uso de checklists e cumprimento de prazos.
2. **Pensamento Analítico**: Diagnóstico e resolução de erros de código e ajustes de acurácia.
3. **Autonomia e Criatividade**: Personalização das interfaces e enriquecimento das bases de conhecimento.
