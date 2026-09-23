# Prompt 05: O Cérebro da Máquina — Previsão de Trajetória (Raycasting)

## 🎯 Objetivo Didático
Entender como um agente de IA toma decisões não apenas reagindo à posição atual da bola, mas **calculando o futuro** através de simulação física (Raycasting e reflexão geométrica).

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Engenheiro de Inteligência Artificial e Modelagem Matemática.

No jogo Pong em JavaScript, quero substituir o controle manual do Jogador 2 por um Agente Autônomo de IA inteligente.

Requisitos do Algoritmo de IA:
1. Comportamento Condicional:
   - Se a bola estiver se afastando da IA (movendo-se para a esquerda), a raquete deve retornar suavemente para o centro da quadra (posição defensiva neutra).
   - Se a bola estiver vindo na direção da IA (vx > 0), o agente deve calcular onde a bola vai chegar.
2. Função `calcularTrajetoriaFutura(ball, targetX)`:
   - Crie uma simulação rápida (loop virtual com clone das coordenadas da bola).
   - Projete passo a passo a movimentação da bola considerando as colisões virtuais com o teto e chão.
   - Interrompa o cálculo assim que a bola alcançar a linha X da raquete da IA (`simX >= targetX`).
   - Retorne o valor final previsto de Y (`targetY`).
3. Movimentação da Raquete:
   - Implemente o método `paddle.moveTo(targetY)` com velocidade limitada para que a raquete não "se teletransporte", mas se desloque de forma fluida e crível.
4. Adicione comentários detalhados explicando a diferença entre uma "IA Reativa Simples" (que apenas segue a bola) e uma "IA Preditiva" (que antecipa o futuro).
```

---

## 💡 Dica Pedagógica para as Alunas
*Uma IA simples apenas corre atrás da bola como um cachorrinho. Uma IA preditiva pensa como uma jogadora de tênis profissional: ela calcula onde a bola vai pingar e já se posiciona lá antes mesmo da bola chegar!*
