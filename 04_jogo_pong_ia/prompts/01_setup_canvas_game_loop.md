# Prompt 01: Setup do Canvas e Game Loop a 60 FPS

## 🎯 Objetivo Didático
Criar a arena gráfica do jogo utilizando o elemento `<canvas>` do HTML5 e programar o **Game Loop** (ciclo de atualização e desenho contínuo) a 60 quadros por segundo utilizando `requestAnimationFrame`.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Especialista em Jogos Web com JavaScript e Canvas HTML5.

Preciso criar a estrutura base do clássico jogo Pong para uma aula prática de Inteligência Artificial.

Requisitos Técnicos:
1. Um arquivo HTML com um elemento <canvas id="pongCanvas" width="800" height="480"></canvas>.
2. Um script em JavaScript que:
   - Obtenha o contexto 2D do Canvas (ctx).
   - Implemente uma função `gameLoop(timestamp)` chamada a cada quadro usando `requestAnimationFrame(gameLoop)`.
   - Limpe o fundo da quadra com a cor escura (#0a0a0c) a cada frame.
   - Desenhe a linha central divisória tracejada (efeito retrô quadra de tênis de mesa) e um círculo estético no centro da quadra.
3. Código limpo, moderno (ES6+), bem estruturado e com comentários explicativos em português explicando o que é o Game Loop e por que não usamos setInterval.
```

---

## 💡 Dica Pedagógica para as Alunas
*O Game Loop é o "coração que bate" em qualquer jogo digital. A cada segundo, ele redesenha a tela 60 vezes seguidas. Se você apenas desenhasse uma vez, a tela ficaria estática para sempre.*
