export const initialChecklistData = [
  {
    moduleId: 1,
    title: "Módulo 1: Fundamentos de IA & Machine Learning Clássico",
    hours: "8h",
    description: "Conceitos de IA, ética, algoritmos supervisionados e não-supervisionados com Scikit-Learn.",
    items: [
      { id: "m1_1", text: "Definição de IA, história, aplicações no mercado e diretrizes éticas", completed: true },
      { id: "m1_2", text: "Coleta e preparação de dados tabulares com Pandas e NumPy", completed: true },
      { id: "m1_3", text: "Implementação de modelo supervisionado (Regressão / Classificação) com Scikit-Learn", completed: true },
      { id: "m1_4", text: "Avaliação do modelo: Cálculo de Acurácia, Matriz de Confusão e F1-Score", completed: false }
    ]
  },
  {
    moduleId: 2,
    title: "Módulo 2: Redes Neurais Artificiais & Deep Learning",
    hours: "8h",
    description: "Arquitetura de neurônios artificiais, funções de ativação e treinamento com Keras/TensorFlow.",
    items: [
      { id: "m2_1", text: "Compreensão de camadas densas, pesos, bias e funções de ativação (ReLU, Sigmoid, Softmax)", completed: true },
      { id: "m2_2", text: "Construção de modelo sequencial com Keras/TensorFlow", completed: false },
      { id: "m2_3", text: "Treinamento, cálculo de Loss (perda) e otimizadores (Adam, SGD)", completed: false },
      { id: "m2_4", text: "Validação cruzada e diagnóstico de Overfitting / Underfitting", completed: false }
    ]
  },
  {
    moduleId: 3,
    title: "Módulo 3: Processamento de Linguagem Natural (PLN) & Projeto 3",
    hours: "8h",
    description: "Modelagem textual, tokenização, análise de sentimentos com spaCy e NLTK.",
    items: [
      { id: "m3_1", text: "Pré-processamento de texto: Tokenização, Lematização e remoção de Stop Words", completed: false },
      { id: "m3_2", text: "Vetorização de texto (Bag of Words / TF-IDF / Embeddings)", completed: false },
      { id: "m3_3", text: "Treinamento do classificador de sentimentos de feedbacks de clientes", completed: false },
      { id: "m3_4", text: "Construção do Dashboard em React para exibição de métricas de satisfação", completed: false }
    ]
  },
  {
    moduleId: 4,
    title: "Módulo 4: Visão Computacional & Projeto 2",
    hours: "8h",
    description: "Processamento de imagens com OpenCV, detecção em tempo real com YOLO e integração com webcam.",
    items: [
      { id: "m4_1", text: "Manipulação de imagens e matrizes de cores (RGB/BGR/Grayscale) com OpenCV", completed: false },
      { id: "m4_2", text: "Detecção e reconhecimento facial com classificadores Haar Cascade / MediaPipe", completed: false },
      { id: "m4_3", text: "Inferência de detecção de múltiplos objetos com YOLOv8 em tempo real", completed: false },
      { id: "m4_4", text: "Integração do feed da webcam com a interface web no React", completed: false }
    ]
  },
  {
    moduleId: 5,
    title: "Módulo 5: Projeto 1 - Chatbot de Suporte Inteligente (Situação 1)",
    hours: "4h",
    description: "Desenvolvimento de solução escalável de atendimento com IA Generativa, RAG, FastAPI e React.",
    items: [
      { id: "m5_1", text: "Estruturação da Base de Conhecimento corporativa da empresa de suporte", completed: true },
      { id: "m5_2", text: "Desenvolvimento da API FastAPI com endpoints de chat, feedback e métricas", completed: true },
      { id: "m5_3", text: "Criação da interface de chat em React com streaming e histórico de mensagens", completed: true },
      { id: "m5_4", text: "Integração de entrada por comando de voz (Speech-to-Text) com Web Speech API", completed: true },
      { id: "m5_5", text: "Geração de relatório de viabilidade para o investidor", completed: false }
    ]
  },
  {
    moduleId: 6,
    title: "Módulo 6: Projeto 4 - Jogo Pong com IA Adaptativa (Situação 2)",
    hours: "4h",
    description: "Criação de jogo Pong com IA no React / Canvas para contextualizar modelos personalizados.",
    items: [
      { id: "m6_1", text: "Criação do loop de renderização do jogo Pong em HTML5 Canvas no React", completed: false },
      { id: "m6_2", text: "Implementação da física de colisão, rebote da bola e pontuação", completed: false },
      { id: "m6_3", text: "Desenvolvimento do algoritmo de IA para controle da raquete adversária", completed: false },
      { id: "m6_4", text: "Adição de painel de controle para calibrar tempo de reação e taxa de erro da IA", completed: false }
    ]
  }
];
