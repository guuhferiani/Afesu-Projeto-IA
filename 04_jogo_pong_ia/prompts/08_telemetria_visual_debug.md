# Prompt 08: Telemetria Visual & Linhas de Decisão da IA (Debug Raycast)

## 🎯 Objetivo Didático
Desenvolver a **Explicabilidade da IA (XAI - Explainable AI)**: tornar o "pensamento invisível" da máquina visível aos olhos humanos, desenhando vetores de previsão no Canvas e exibindo um painel de telemetria em tempo real.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Engenheiro Especialista em Visualização de Dados e Explicabilidade de IA (Explainable AI / XAI).

No jogo Pong com IA, precisamos criar recursos visuais para que as alunas e visitantes vejam como a IA está "pensando" em tempo real.

Requisitos Técnicos:
1. Linhas de Previsão de Trajetória (Raycast Visual):
   - Enquanto a bola se move em direção à IA, guarde os pontos de ricochete calculados na simulação `[{x, y}]`.
   - Desenhe linhas tracejadas sutis (`ctx.setLineDash([4, 4])`) conectando a bola atual até o ponto final na raquete.
   - Desenhe um ponto colorido destacando exatamente onde a IA prevê que a bola vai passar.
2. Painel de Telemetria ao Vivo na Tela:
   - Exiba indicadores numéricos em tempo real:
     • Velocidade atual da bola (px/frame)
     • Contador do Rali atual (número de rebatidas consecutivas sem ponto)
     • Recorde de Rali da sessão
     • Taxa de Acerto da IA (% de rebatidas bem-sucedidas em relação aos chutes recebidos)
3. Controle de Exibição:
   - Adicione um checkbox "Exibir Linhas de Previsão da IA" para ligar e desligar essa visualização.
4. Explique por que a explicabilidade visual é um dos tópicos mais quentes e importantes no mercado de IA profissional.
```

---

## 💡 Dica Pedagógica para as Alunas
*Modelos de IA muitas vezes são chamados de "caixas pretas" porque ninguém vê o que acontece por dentro. Quando desenhamos as linhas de previsão na tela, abrimos essa caixa preta para que qualquer pessoa entenda a lógica da máquina!*
