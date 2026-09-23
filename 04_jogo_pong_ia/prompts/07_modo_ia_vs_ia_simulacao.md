# Prompt 07: Modo IA vs IA (Simulação Autônoma)

## 🎯 Objetivo Didático
Implementar um ambiente de simulação autônoma onde duas instâncias do agente inteligente competem entre si, permitindo observar ralis longos, comparar diferentes parametrizações e compreender testes de estresse em agentes autônomos.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Engenheiro de Inteligência Artificial e Simulação Computacional.

No meu projeto Pong com IA, quero criar um modo de jogo "IA vs IA" onde duas instâncias do modelo de decisão jogam de forma 100% autônoma.

Requisitos Técnicos:
1. Reutilização de Classe:
   - Instancie dois agentes de IA: `aiPlayerLeft` e `aiPlayerRight`.
   - Adapte a função de previsão de trajetória para que ela saiba se a raquete está na esquerda (alvo em x = 24) ou na direita (alvo em x = 764).
2. Seletor de Modo:
   - Adicione um botão de alternância entre "Humano vs IA" e "IA vs IA".
   - No modo "IA vs IA", desabilite a escuta de teclas do jogador e deixe o agente esquerdo assumir o controle total da raquete 1.
3. Demonstração de IA Autônoma:
   - Mostre como essa simulação serve para demonstrar a estabilidade do algoritmo e benchmark de ralis sem intervenção humana.
4. Forneça o código demonstrando como alternar entre os dois modos de forma limpa.
```

---

## 💡 Dica Pedagógica para as Alunas
*Colocar duas IAs para jogar uma contra a outra é o método usado para treinar modelos de Aprendizado por Reforço (como o AlphaGo ou IAs de xadrez). As máquinas jogam milhões de partidas contra si mesmas para aprender estratégias avançadas.*
