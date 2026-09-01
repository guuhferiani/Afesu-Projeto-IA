# 🧠 Guia Didático: Metáforas, Conceitos & Quizzes para cada Prompt
### Projeto 01: Chatbot Full-Stack com IA e Voz | AFESU Veleiros & SENAI-SP
**Elaborado para:** Apresentações de Slides, Materiais de Apoio e Quizzes no **Google NotebookLM**

---

## 🧭 Como Usar Este Material
Cada prompt possui:
1. **🎯 O que estamos construindo?** (Explicação rápida e sem termos difíceis).
2. **✨ A Metáfora do Dia a Dia** (Uma analogia do mundo real para prender a atenção das alunas).
3. **💻 O Conceito de Tecnologia por trás** (O termo técnico real que elas estão aprendendo).
4. **❓ Pergunta para Quiz (Google NotebookLM)** (Pergunta pronta com alternativa correta e justificativa).

---

# 🚀 FASE 1: Construção Guiada (Passo a Passo)

---

## 📂 ETAPA 0: Criando as Pastas (`backend` e `frontend`)

* **🎯 O que faz:** Separa o projeto em duas metades organizadas: o lado do servidor (cérebro) e o lado visual (tela).
* **✨ Metáfora:** É como construir uma casa dividida entre a **Cozinha dos Fundos** (onde a mágica e as receitas acontecem) e o **Salão de Festas** (onde os convidados ficam confortáveis).
* **💻 Conceito Técnico:** Arquitetura Cliente-Servidor (*Client-Server Architecture*).
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Por que separamos um sistema web em pastas `backend` e `frontend`?  
  > **A)** Para deixar o código mais bonito apenas.  
  > **B)** Para separar a lógica de processamento e dados (backend) da interface visual com o usuário (frontend). *(Correta)*  
  > **C)** Porque o Python não roda se estiver na mesma pasta do JavaScript.  
  > *Justificativa:* Manter a lógica de dados separada da interface é um dos princípios fundamentais da engenharia de software para garantir segurança e organização.

---

## 🧠 CAMADA 1: Dados & Conhecimento (JSON)

### 💬 PROMPT 01: Base de Conhecimento (`base_conhecimento.json`)

* **🎯 O que faz:** Cria a "memória da empresa" com informações reais sobre planos, regras, preços e perguntas frequentes.
* **✨ Metáfora:** **O Livro de Regras / A Cola da Prova.** Imagine que a IA é uma aluna super inteligente, mas que nunca estudou as regras da AfesuTech. Esse arquivo JSON é a "apostila de consulta rápida" que a IA lê antes de responder qualquer cliente, para não inventar coisas da cabeça dela!
* **💻 Conceito Técnico:** **RAG (*Retrieval-Augmented Generation*) & Estrutura JSON (Chave-Valor).** Evita a famosa "alucinação" da IA Generativa alimentando o modelo com dados factuais.
* **❓ Pergunta de Quiz:**
  > **Pergunta:** O que acontece se uma Inteligência Artificial responder a um cliente sem uma Base de Conhecimento (RAG)?  
  > **A)** Ela desliga o computador imediatamente.  
  > **B)** Ela pode alucinar, inventando preços falsos ou respostas incorretas. *(Correta)*  
  > **C)** Ela só consegue responder com emojis.  
  > *Justificativa:* Modelos generativos são preditores estatísticos de palavras; sem uma base de dados real, eles tendem a inventar respostas plausíveis porém falsas (alucinações).

---

## ⚙️ CAMADA 2: Motor de IA em Python

### 💬 PROMPT 02: Motor de IA & PLN (`chatbot_engine.py`)

* **🎯 O que faz:** Constrói o "cérebro" do robô. Ele lê a mensagem do usuário, limpa o texto, consulta a IA ou calcula qual tópico da base é o mais parecido.
* **✨ Metáfora:** **O Detetive que Elimina Pistas Falsas.** Quando alguém manda uma mensagem cheia de palavras comuns como *"Olá, queria saber sobre os..."*, o motor joga fora as palavras vazias (palavras de enfeite) e foca apenas nas palavras-chave importantes (*"planos", "preços"*), como um detetive comparando impressões digitais!
* **💻 Conceito Técnico:** **PLN (Processamento de Linguagem Natural), Tokenização, Remoção de *Stop Words* e Cálculo de Similaridade.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** No Processamento de Linguagem Natural (PLN), o que são as chamadas "Stop Words"?  
  > **A)** Palavras que travam o código Python com erros.  
  > **B)** Palavras muito comuns (como "de", "para", "o", "a") que adicionam pouco significado na busca e podem ser filtradas. *(Correta)*  
  > **C)** Palavras que só a IA entende.  
  > *Justificativa:* Stop words são preposições, artigos e conectivos removidos no pré-processamento para focar nas palavras com real valor semântico.

---

### 💬 PROMPT 03: Servidor Web com FastAPI (`main.py`)

* **🎯 O que faz:** Cria a "porta de entrada" na internet para que qualquer aplicativo (site, celular, WhatsApp) possa conversar com o nosso robô em Python.
* **✨ Metáfora:** **O Garçom Express do Restaurante.** O cliente (React) faz o pedido na mesa. O garçom (FastAPI) leva o pedido correndo até a cozinha (Engine Python), espera ficar pronto e traz o prato de volta em formato de pacote fechado (JSON).
* **💻 Conceito Técnico:** **API REST, Protocolo HTTP (`POST`/`GET`), Validação com Pydantic e CORS.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Qual é a função principal do FastAPI no projeto do Chatbot?  
  > **A)** Desenhar os botões e cores da tela.  
  > **B)** Servir como uma ponte (API REST) que recebe perguntas via internet, envia para o motor de IA e devolve a resposta. *(Correta)*  
  > **C)** Gravar o áudio do microfone da aluna.  
  > *Justificativa:* O FastAPI é o framework web que expõe as funções do Python através de rotas HTTP acessíveis pelo navegador.

---

### 💬 PROMPT 04: Testes Automatizados no Terminal (`test_backend.py`)

* **🎯 O que faz:** Roda simulações no terminal para checar se o cérebro da IA está respondendo saudações e dúvidas antes de a gente gastar tempo desenhando a tela.
* **✨ Metáfora:** **O Test-Drive antes de Colocar o Carro na Pista.** Antes de pintar o carro e colocar bancos de couro, você liga o motor e testa o acelerador e o freio para garantir que nada vai explodir no meio do caminho!
* **💻 Conceito Técnico:** **Testes Automatizados de Unidade / Integração (*Testing & Quality Assurance*).**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Por que é uma boa prática criar um script de teste antes de programar o frontend?  
  > **A)** Para ter certeza de que o backend e a IA estão funcionando sem depender de cliques na tela. *(Correta)*  
  > **B)** Porque o React é obrigado a ler o arquivo de teste.  
  > **C)** Para deixar o computador mais rápido.  
  > *Justificativa:* Testar o backend de forma isolada economiza tempo e facilita descobrir a origem de eventuais erros no sistema.

---

## 💻 CAMADA 4: Interface Web com React & Vite

### 💬 PROMPT 05: Setup do Frontend React + Vite

* **🎯 O que faz:** Cria o esqueleto moderno do aplicativo web e baixa ferramentas para ícones (`lucide-react`) e textos bonitos (`marked`).
* **✨ Metáfora:** **Montar a Prancheta e a Caixa de Lápis de Cor.** É como pegar uma folha em branco novinha e colocar na mesa as canetas mais modernas e os adesivos que vamos usar no desenho.
* **💻 Conceito Técnico:** **Single Page Application (SPA), Bundler Vite e Gerenciamento de Pacotes (`npm`).**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** O que o comando `npm install lucide-react` faz no nosso projeto?  
  > **A)** Liga a internet do laboratório.  
  > **B)** Baixa uma biblioteca com centenas de ícones prontos e modernos para usarmos nos botões. *(Correta)*  
  > **C)** Traduz o código de Python para JavaScript.  
  > *Justificativa:* O `npm` é o gerenciador de pacotes que faz o download de bibliotecas utilitárias criadas por outros desenvolvedores.

---

### 💬 PROMPT 06: Estilização Glassmorphism & Dark Mode (`index.css`)

* **🎯 O que faz:** Deixa o site com visual profissional, fundo escuro, efeito de vidro fosco translúcido e animações brilhantes.
* **✨ Metáfora:** **O Cenário de Filme de Ficção Científica / Painel do Spotify.** Ao invés de um site branco e sem graça dos anos 90, criamos um visual moderno com estética *Cyberpunk/Glass*, parecendo uma interface de nave espacial ou do ChatGPT Plus!
* **💻 Conceito Técnico:** **Design Tokens, CSS Glassmorphism (`backdrop-filter`), Flexbox e Animações CSS.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Qual é a vantagem de definir cores em variáveis `:root` no arquivo CSS?  
  > **A)** O site ganha mais curtidas automaticamente.  
  > **B)** Permite mudar o tema e as cores do site inteiro em um só lugar com facilidade. *(Correta)*  
  > **C)** O código fica protegido contra vírus.  
  > *Justificativa:* Centralizar tokens de design em variáveis CSS facilita a manutenção e a personalização de temas.

---

### 💬 PROMPT 07: Reconhecimento de Voz Mobile (`VoiceInput.jsx`)

* **🎯 O que faz:** Transforma o microfone do celular ou computador em uma "orelha digital" que escuta a voz da aluna e digita a pergunta sozinha.
* **✨ Metáfora:** **A Siri / Alexa Embutida no Nosso Site.** Ao invés de ficar digitando no tecladinho do celular, a usuária simplesmente aperta o botão, fala o que quer e a mágica acontece na hora!
* **💻 Conceito Técnico:** **Web Speech API (`SpeechRecognition`), Multimodalidade, Speech-to-Text (STT) e Permissões de Áudio em HTTPS.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Por que o navegador do celular pede permissão para acessar o microfone?  
  > **A)** Para economizar bateria do aparelho.  
  > **B)** Por motivos de privacidade e segurança do usuário, garantindo que nenhum site escute sem autorização. *(Correta)*  
  > **C)** Porque a voz precisa ser traduzida para o inglês primeiro.  
  > *Justificativa:* O acesso a periféricos de áudio e vídeo requer autorização explícita do usuário em conexões seguras.

---

### 💬 PROMPT 08: Formatador de Markdown Seguro (`FormattedMessage.jsx`)

* **🎯 O que faz:** Transforma asteriscos e traços que a IA manda em negrito, tópicos organizados e links clicáveis na tela.
* **✨ Metáfora:** **O Alfaiate / Tradutor de Emoções.** Se a IA responder `**Preço:** R$ 199`, esse componente veste essa resposta com roupas de gala, transformando em **Preço:** R$ 199 bem destacado na tela!
* **💻 Conceito Técnico:** **Markdown Parsing, Sanitização de HTML e Renderização Dinâmica.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** O que a biblioteca `marked` faz dentro do nosso componente React?  
  > **A)** Conta quantas letras o usuário digitou.  
  > **B)** Converte texto com marcações Markdown (como negrito e listas) em código HTML formatado. *(Correta)*  
  > **C)** Apaga mensagens antigas do chat.  
  > *Justificativa:* O parser de markdown interpreta caracteres especiais de formatação e os transforma em tags HTML correspondentes.

---

### 💬 PROMPT 09: Janela Principal do Chatbot (`ChatWindow.jsx`)

* **🎯 O que faz:** É a tela onde tudo se encontra: balões de conversa, indicador de *"Digitando..."*, botões de Like/Dislike, chips de perguntas rápidas e botão de baixar a conversa.
* **✨ Metáfora:** **A Sala VIP de Atendimento ao Cliente.** É onde o cliente se senta na poltrona confortável e é atendido com rapidez, podendo avaliar o serviço com um "joinha" ou escolher opções rápidas no cardápio de perguntas!
* **💻 Conceito Técnico:** **Gerenciamento de Estado no React (`useState`), Efeitos Colaterais (`useEffect`), Referências de DOM (`useRef`) e Comunicação Assíncrona (`fetch`).**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Para que serve o hook `useRef` na janela do chat?  
  > **A)** Para mudar a cor do texto para vermelho.  
  > **B)** Para rolar a barra de rolagem automaticamente até o fim toda vez que chega uma nova mensagem. *(Correta)*  
  > **C)** Para salvar as fotos das alunas no banco de dados.  
  > *Justificativa:* O `useRef` permite acessar o elemento do DOM diretamente e chamar o método `scrollIntoView()` com rolagem suave.

---

### 💬 PROMPT 10: Cabeçalho & Conexão Principal (`App.jsx` e `Header.jsx`)

* **🎯 O que faz:** Cria a barra do topo com a marca da Afesu Veleiros/SENAI e uma bolinha luminosa (verde/vermelha) que mostra em tempo real se o backend está vivo.
* **✨ Metáfora:** **O Semáforo / Painel de Instrumentos do Avião.** É a luz no painel que diz para o piloto se o motor está ligado e funcionando ou se precisa dar a partida!
* **💻 Conceito Técnico:** **Polling / Health Check de API e Composição de Componentes.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** O que significa a bolinha verde "API Online" no cabeçalho da nossa aplicação?  
  > **A)** Que o celular da aluna está com 100% de bateria.  
  > **B)** Que o frontend React conseguiu se comunicar com sucesso com o servidor FastAPI do backend. *(Correta)*  
  > **C)** Que a aula já acabou.  
  > *Justificativa:* Um health check periódico consulta a API para confirmar que os serviços estão respondendo com status 200 OK.

---

# 🌟 FASE 2: Desafio de Autonomia (Crie Sua Própria Empresa)

---

### 💬 PROMPT 11: Criação da Empresa Própria (`base_conhecimento.json`)

* **🎯 O que faz:** Substitui os dados da AfesuTech pelo negócio dos sonhos da aluna (ex: uma marca de maquiagem, clínica de pets, loja de tênis ou confeitaria).
* **✨ Metáfora:** **Criar o Seu Próprio Negócio no Mundo Real.** É o momento de se tornar a CEO da sua própria startup e ensinar a sua IA a vender os seus produtos e serviços com o tom de voz da sua marca!
* **💻 Conceito Técnico:** **Engenharia de Conhecimento e Customização de Domínio de IA.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** O que uma aluna precisa alterar para transformar o chatbot da AfesuTech em um chatbot de uma Pet Shop?  
  > **A)** Reescrever todo o código Python do zero.  
  > **B)** Apenas alterar os tópicos, perguntas e respostas no arquivo `base_conhecimento.json`. *(Correta)*  
  > **C)** Comprar um computador novo.  
  > *Justificativa:* Como o sistema foi construído de forma modular, basta trocar o arquivo de dados para que o motor atenda a qualquer nicho de mercado.

---

### 💬 PROMPT 12: Customização Visual da Marca no CSS (`index.css`)

* **🎯 O que faz:** Muda as cores, brilhos e identidade visual do chat para combinar com a logo e o estilo da nova empresa.
* **✨ Metáfora:** **A Roupa Nova da Loja.** Pintar a fachada da loja com as cores da marca (ex: rosa chiclete para moda, verde folha para sustentabilidade, azul escuro para segurança).
* **💻 Conceito Técnico:** **Customização de Identidade Visual e UI/UX Theming.**
* **❓ Pergunta de Quiz:**
  > **Pergunta:** Qual é o impacto de alinhar as cores do CSS com a proposta da empresa?  
  > **A)** Melhora a experiência do usuário (UX) e gera confiança na identidade visual da marca. *(Correta)*  
  > **B)** Apenas faz o código carregar mais rápido.  
  > **C)** Desativa o modo escuro.  
  > *Justificativa:* Uma identidade visual coerente fortalece a percepção de profissionalismo e usabilidade do produto digital.

---

## 📊 Tabela Resumo: Para Apresentação Rápida em Slides

| Prompt | O que Constrói? | Metáfora para a Turma | Termo Técnico Real |
| :--- | :--- | :--- | :--- |
| **01** | `base_conhecimento.json` | 📖 A Cola da Prova / O Cardápio | **RAG & Base de Conhecimento** |
| **02** | `chatbot_engine.py` | 🕵️ O Detetive de Palavras | **PLN, Stopwords & Similaridade** |
| **03** | `main.py` | 🏃 O Garçom Express | **API REST, FastAPI & CORS** |
| **04** | `test_backend.py` | 🚗 O Test-Drive antes da Pista | **Testes Automatizados de Software** |
| **05** | Setup React + Vite | 🎨 A Caixa de Lápis de Cor | **SPA & Gerenciamento de Pacotes** |
| **06** | `index.css` | 🚀 O Cenário de Nave Espacial | **Glassmorphism & Design Tokens** |
| **07** | `VoiceInput.jsx` | 🎙️ A Orelha Biônica / Siri | **Web Speech API & STT Mobile** |
| **08** | `FormattedMessage.jsx` | 👗 O Alfaiate de Textos | **Markdown Parsing & Sanitização** |
| **09** | `ChatWindow.jsx` | 🛋️ A Sala VIP de Atendimento | **Estado no React & Hooks (`useState`)** |
| **10** | `App.jsx` + `Header.jsx` | 🚦 O Semáforo / Painel de Controle | **Health Check & Composição React** |
| **11** | Empresa Própria | 👑 Virando CEO da sua Startup | **Engenharia de Conhecimento** |
| **12** | Cores da Marca | 🎨 A Fachada da Nova Loja | **UI/UX & Customização de Temas** |
