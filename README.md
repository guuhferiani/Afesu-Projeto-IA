# 🤖 Portal de Projetos em Inteligência Artificial Generativa
### Curso de Aperfeiçoamento Profissional (40 Horas) • SENAI-SP & AFESU Veleiros

Bem-vindo ao repositório oficial de projetos e materiais do curso de **Programação em Inteligência Artificial Generativa**.

Este projeto combina **Python** (Machine Learning, Redes Neurais, PLN, Visão Computacional e APIs de IA) com **JavaScript/React** (interfaces ricas, comandos de voz via Web Speech API, gráficos interativos e dashboards).

---

## 📁 Documentos e Planos em PDF Gerados

Todos os planos pedagógicos e especificações técnicas de cada projeto foram exportados em PDF de alta qualidade e estão disponíveis na raiz do projeto:

- 📄 [Plano_Geral_Projetos_IA_Afesu.pdf](./Plano_Geral_Projetos_IA_Afesu.pdf): Plano geral, diretrizes metodológicas e regras de negócio.
- 📄 [01_Plano_Projeto_Chatbot_Suporte_IA.pdf](./01_Plano_Projeto_Chatbot_Suporte_IA.pdf): Plano detalhado do Chatbot Full-Stack (Situação 1).
- 📄 [02_Plano_Projeto_Visao_Computacional.pdf](./02_Plano_Projeto_Visao_Computacional.pdf): Plano do Dashboard com OpenCV e YOLO.
- 📄 [03_Plano_Projeto_Analise_Sentimentos_NLP.pdf](./03_Plano_Projeto_Analise_Sentimentos_NLP.pdf): Plano do Analisador de Sentimentos com spaCy/NLTK.
- 📄 [04_Plano_Projeto_Jogo_Pong_IA.pdf](./04_Plano_Projeto_Jogo_Pong_IA.pdf): Plano do Jogo Pong com IA Adaptativa (Situação 2).

---

## 🚀 Como Executar o Projeto 1 & o Portal com Checklist

### Opção 1: Inicialização em 1 Clique (Windows)
Basta dar duplo clique no arquivo [`iniciar_projeto.bat`](./iniciar_projeto.bat). Ele abrirá automaticamente o servidor Python (porta 8000) e o frontend React (porta 3000).

### Opção 2: Inicialização Manual

#### 1. Backend (Python + FastAPI)
```bash
cd "01_chatbot_atendimento_fullstack/backend"
python main.py
```
*Acesse a documentação interativa Swagger em: http://127.0.0.1:8000/docs*

#### 2. Frontend (React + Vite)
```bash
cd "01_chatbot_atendimento_fullstack/frontend"
npm run dev
```
*Acesse o portal no navegador em: http://localhost:3000*

---

## 🎯 Funcionalidades Integradas na Interface Web

1. **Chatbot de Suporte com IA Generativa (Situação 1 da Ementa)**:
   - Respostas contextualizadas via base de conhecimento da empresa (*RAG*).
   - Suporte a comandos de voz (**Speech-to-Text / STT**) pelo microfone do navegador.
   - Avaliação de respostas (feedback positivo/negativo).
   - Exportação de histórico de atendimento em arquivo `.txt`.
2. **Checklist Interativo de Acompanhamento (40 Horas)**:
   - Acompanhamento de todas as capacidades técnicas e socioemocionais da ementa oficial.
   - Cálculo dinâmico da porcentagem de conclusão do curso.
   - Filtro por módulos temáticos.
   - Persistência automática no navegador (`localStorage`).
   - Exportação de relatórios de progresso da turma.
3. **Visão Geral dos 4 Projetos & Biblioteca de PDFs**:
   - Resumo das tecnologias e status de cada módulo.

---

## 🧠 Skill & Regras de Negócio do Antigravity
As diretrizes e regras de negócio do curso estão configuradas na skill:
- `.agents/skills/afesu-ia-projects/SKILL.md`
- `.agents/rules/regras_negocio_projetos.md`
