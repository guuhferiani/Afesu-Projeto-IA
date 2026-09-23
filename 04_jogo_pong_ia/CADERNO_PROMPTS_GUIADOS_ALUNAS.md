# 📘 Caderno de Prompts Guiados: Jogo Pong com IA Adaptativa
### Curso de Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40 Horas)
**SENAI-SP & AFESU Veleiros • Situação de Aprendizagem 2: Modelos Personalizados e Heurísticas**

---

## 🌟 Boas-vindas, Futura Desenvolvedora de IA!

Neste projeto prático, você vai construir do absoluto zero um dos jogos mais lendários da história da computação: o clássico **Pong** (criado originalmente pela Atari em 1972). 

Porém, você não criará um jogo qualquer. O seu objetivo é **desenvolver o "cérebro" de um Agente de Inteligência Artificial** capaz de:
1. Ler o ambiente de jogo (coordenadas da bola, velocidades e limites da quadra).
2. **Prever o futuro**: calcular exatamente onde a bola vai colidir através de reflexão vetorial (Raycasting).
3. Aprender a **regular sua inteligência**: calibrar tempo de reação humano e taxas de erro para criar partidas justas e divertidas.
4. **Tornar a IA transparente (XAI - Explainable AI)**: desenhar na tela as linhas que mostram o que a máquina está calculando em tempo real.

---

## 🗺️ Mapa da Trilha de Construção (8 Etapas)

| Etapa | Módulo | Conceito Prático | Arquivo Modular |
| :---: | :--- | :--- | :--- |
| **01** | **Arena Gráfica** | Canvas HTML5 e Game Loop a 60 FPS com `requestAnimationFrame` | [`prompts/01_setup_canvas_game_loop.md`](./prompts/01_setup_canvas_game_loop.md) |
| **02** | **Física Básica** | Vetores de velocidade ($v_x, v_y$) e ricochete nas bordas | [`prompts/02_fisica_bola_paredes.md`](./prompts/02_fisica_bola_paredes.md) |
| **03** | **Interação Humana** | Mapeamento de teclado (W/S, Setas) e mouse sem engasgos | [`prompts/03_raquetes_controles_jogador.md`](./prompts/03_raquetes_controles_jogador.md) |
| **04** | **Dinâmica de Colisão** | Ângulos dinâmicos de rebatida e aceleração de rali | [`prompts/04_colisoes_angulos_rebatida.md`](./prompts/04_colisoes_angulos_rebatida.md) |
| **05** | **Cérebro da Máquina** | Algoritmo de Previsão de Trajetória (Raycasting Simulado) | [`prompts/05_motor_ia_previsao_trajetoria.md`](./prompts/05_motor_ia_previsao_trajetoria.md) |
| **06** | **Calibração da IA** | Tempo de Reação (Latência) e Incerteza Estocástica (Noise) | [`prompts/06_calibracao_dificuldade_ruido.md`](./prompts/06_calibracao_dificuldade_ruido.md) |
| **07** | **Simulação Autônoma** | Modo IA vs IA para teste de estresse de dois agentes | [`prompts/07_modo_ia_vs_ia_simulacao.md`](./prompts/07_modo_ia_vs_ia_simulacao.md) |
| **08** | **Explicabilidade (XAI)** | Desenho de vetores de decisão e telemetria ao vivo | [`prompts/08_telemetria_visual_debug.md`](./prompts/08_telemetria_visual_debug.md) |

---

## 🛠️ Como Utilizar Este Caderno

1. **Escolha sua IA Generativa Parceira**: Você pode usar o **ChatGPT**, **Google Gemini**, **Claude** ou o assistente do seu ambiente de desenvolvimento.
2. **Copie o Prompt da Etapa Atual**: Abra o prompt correspondente na pasta [`prompts/`](./prompts/), leia a dica pedagógica e envie para a IA.
3. **Analise o Código Gerado**: Não dê apenas "copiar e colar"! Procure identificar onde estão as variáveis de física, onde o loop é chamado e como a IA toma a decisão.
4. **Teste no Navegador**: Abra o arquivo `index.html` ou teste no componente React integrado do portal.
5. **Personalize!** Altere as cores, aumente a velocidade ou mude o tamanho das raquetes para ver o impacto imediato na IA.

---

## 💡 Glossário Rápido de IA para Jogos

- **Agente Inteligente:** Qualquer programa de computador que observa o estado do ambiente através de sensores (ou variáveis) e toma ações para atingir um objetivo (no caso do Pong: não deixar a bola passar e marcar pontos).
- **Heurística:** Uma regra prática ou atalho de cálculo inteligente que encontra uma solução excelente sem precisar tentar todas as combinações do universo.
- **Raycasting:** Técnica geométrica que "dispara um raio invisível" na direção do movimento para descobrir onde e quando um objeto vai bater antes que ele realmente chegue lá.
- **Latência de Reação:** O intervalo de tempo entre o momento em que a máquina "vê" o estímulo e o momento em que ela envia o comando para agir. Em humanos, varia entre 150ms e 250ms.
- **Ruído (Noise):** Pequenas variações aleatórias introduzidas de propósito para tornar o comportamento da IA mais natural e menos robótico.
- **Explainable AI (XAI):** A área da Inteligência Artificial dedicada a tornar o raciocínio das máquinas transparente e compreensível para as pessoas.

---

## 🏆 Desafios Extras para Praticar

1. **Super Efeito (Spin):** Adicione uma aceleração lateral extra na bola se a raquete estiver em movimento no exato momento da colisão.
2. **Power-Ups Virtuais:** Faça aparecer um ícone no meio da quadra que dobra temporariamente o tamanho da raquete de quem conseguir acertá-lo!
3. **Efeitos Sonoros Retrô:** Use a **Web Audio API** do navegador para emitir bips clássicos de 8-bits a cada rebatida e a cada ponto.
