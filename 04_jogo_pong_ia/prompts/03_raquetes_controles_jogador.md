# Prompt 03: Raquetes e Mapeamento de Controles do Jogador

## 🎯 Objetivo Didático
Desenvolver as raquetes dos jogadores (Player 1 na esquerda e Player 2 na direita) e mapear a interação do usuário humano através de eventos de teclado (W/S e Setas) e mouse.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Engenheiro de Software Web focado em Jogos.

No nosso jogo Pong em JavaScript, agora precisamos criar as raquetes dos competidores e permitir que o jogador humano controle a raquete da esquerda.

Requisitos Técnicos:
1. Crie uma classe `Paddle`:
   - Propriedades: `x`, `y`, `width = 12`, `height = 80`, `speed = 7.5`, `score = 0`.
   - Limites de movimentação: a raquete nunca deve ultrapassar os limites superior (y = 0) ou inferior (y = 480 - height) da quadra.
   - Métodos `moveUp()` e `moveDown()`.
   - Método `draw(ctx)`: desenha um retângulo branco limpo na tela.
2. Posicionamento:
   - Raquete 1 (Jogador Humano): x = 24.
   - Raquete 2 (Oponente/IA): x = 764.
3. Captura de Entrada (Input Handlers):
   - Escute os eventos `keydown` e `keyup` no `window` para manter um mapa de teclas pressionadas (`keysPressed`).
   - Suporte tanto as teclas W/S quanto as Setas Cima/Baixo.
   - Bônus: adicione suporte para mover a raquete verticalmente ao mover o cursor do mouse sobre o Canvas.
4. Explique como evitar o "travamento" de teclas do navegador usando o dicionário booleano de teclas.
```

---

## 💡 Dica Pedagógica para as Alunas
*Ao invés de mover a raquete diretamente no evento 'keydown', guardamos que a tecla está pressionada (`keys['w'] = true`). Assim, o movimento fica ultra suave a 60 FPS dentro do loop principal.*
