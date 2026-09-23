# Prompt 06: Calibração de Dificuldade, Tempo de Reação e Ruído Estocástico

## 🎯 Objetivo Didático
Compreender como transformar um modelo de IA matematicamente "perfeito" e imbatível em um oponente jogável, humano e divertido através de hiperparâmetros de latência e ruído estocástico (Noise).

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Game Designer e Especialista em Calibração de IA para Jogos.

Minha IA preditiva de Pong calcula perfeitamente onde a bola vai bater e nunca perde uma partida. Preciso torná-la adaptável com 4 níveis de dificuldade: Fácil, Médio, Difícil e Imbatível.

Requisitos Técnicos:
1. Adicione os seguintes hiperparâmetros ao Agente de IA:
   - `reactionDelay` (Tempo de reação em milissegundos): a IA só recalcula o destino da bola após esse intervalo de tempo, simulando o tempo de processamento neural.
   - `noisePercent` (Taxa de erro/incerteza): adiciona um deslocamento aleatório `(Math.random() - 0.5) * offset` na coordenada prevista, simulando imprecisão humana.
   - `paddle.speed`: ajusta a agilidade máxima da raquete da IA.
2. Definição dos Perfis de Dificuldade:
   - **Fácil**: Velocidade baixa (4.5 px/f), tempo de reação lento (180ms), ruído alto (25%).
   - **Médio**: Velocidade moderada (6.8 px/f), tempo de reação equilibrado (80ms), ruído médio (12%).
   - **Difícil**: Velocidade ágil (9.0 px/f), tempo de reação rápido (25ms), ruído baixo (4%).
   - **Imbatível**: Velocidade máxima (14.0 px/f), tempo de reação zero (0ms), ruído zero (0%).
3. Mostre como conectar sliders de controle (input range) em HTML/JavaScript para que o usuário possa calibrar esses valores dinamicamente durante a partida.
```

---

## 💡 Dica Pedagógica para as Alunas
*Em Inteligência Artificial, fazer um robô ser "perfeito" muitas vezes é a parte mais fácil. O verdadeiro desafio de engenharia é ensinar a máquina a cometer erros realistas para interagir de forma agradável com seres humanos.*
