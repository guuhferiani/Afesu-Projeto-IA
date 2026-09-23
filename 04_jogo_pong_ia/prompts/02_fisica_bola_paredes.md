# Prompt 02: Física da Bola e Colisão com as Bordas

## 🎯 Objetivo Didático
Modelar a cinemática básica em 2D: posição $(x, y)$, velocidade vetorial $(v_x, v_y)$, e aplicar a lei de reflexão elástica simples quando a bola atinge as paredes superior e inferior da quadra.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Desenvolvedor de Jogos 2D e Professor de Física Computacional.

Continuando o jogo Pong no Canvas HTML5, preciso adicionar a bolinha do jogo com física de movimento e ricochete nas paredes.

Requisitos Técnicos:
1. Crie uma classe ou objeto `Ball`:
   - Propriedades: `x`, `y`, `radius = 7`, `speed = 7`, `vx`, `vy`.
   - Método `reset(direction)`: posiciona a bola no centro da quadra (x: 400, y: 240) e lança em um ângulo aleatório suave (-30° a +30°) em direção ao jogador da esquerda (-1) ou da direita (+1).
   - Método `update()`: soma `vx` ao `x` e `vy` ao `y`.
   - Colisão com as bordas: se a bola tocar no teto (y <= 0) ou no chão (y >= 480), inverta a velocidade vertical (`vy = -vy`).
   - Método `draw(ctx)`: desenha a bola preenchida em branco (#ffffff) com `ctx.arc()`.
2. Adicione ao Game Loop para que a bola se mova suavemente e ricocheteie infinitamente nas paredes superior e inferior.
3. Adicione comentários explicando a fórmula matemática de inversão de vetor no impacto.
```

---

## 💡 Dica Pedagógica para as Alunas
*Pense na bola como uma coordenada de GPS que muda de posição a cada milissegundo. Quando o valor de Y encosta no teto (0), nós apenas multiplicamos a velocidade vertical por -1 para ela começar a descer.*
