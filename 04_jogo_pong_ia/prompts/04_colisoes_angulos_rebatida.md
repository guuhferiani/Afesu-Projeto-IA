# Prompt 04: Detecção de Colisão e Ângulo de Rebatida

## 🎯 Objetivo Didático
Implementar a detecção de colisão entre círculos e retângulos (AABB) e introduzir física dinâmica de tênis de mesa: a bola ricocheteia com um ângulo diferente dependendo de qual parte da raquete ela atingiu.

---

## 📝 Prompt para Enviar à IA Generativa

```text
Atue como um Especialista em Física de Jogos e Simulações 2D.

No nosso jogo Pong em JavaScript, precisamos programar a colisão entre a bola e as duas raquetes, adicionando uma dinâmica de rebatida divertida e realista.

Requisitos Técnicos:
1. Detecção de Colisão:
   - Verifique se as coordenadas da bola interceptam a área retangular da raquete da esquerda (quando a bola se move para a esquerda) ou da direita (quando se move para a direita).
2. Cálculo de Ângulo Dinâmico:
   - Calcule o ponto de impacto relativo em relação ao centro da raquete:
     `offset = (ball.y - paddleCenterY) / (paddleHeight / 2)`. Esse valor varia de -1.0 (topo) a +1.0 (base).
   - Multiplique esse offset pelo ângulo máximo de reflexão (por exemplo, 60 graus ou Math.PI / 3).
   - Recalcule as novas velocidades vetoriais:
     `vx = direction * speed * Math.cos(angle)`
     `vy = speed * Math.sin(angle)`
3. Aceleração Progressiva:
   - A cada rebatida bem-sucedida, incremente levemente a velocidade da bola (`speed += 0.35`) até um limite máximo (ex: 15 px/frame), tornando os ralis mais emocionantes.
4. Pontuação e Reset:
   - Se a bola passar da borda esquerda (x < 0), dê ponto para o Jogador 2 e reinicie a bola.
   - Se passar da borda direita (x > 800), dê ponto para o Jogador 1.
```

---

## 💡 Dica Pedagógica para as Alunas
*Se a bola batesse e sempre voltasse no mesmo ângulo reto, o jogo seria monótono. Ao rebater nas pontas da raquete, a jogadora consegue dar "efeito" e direcionar a bola para os cantos da quadra.*
