/**
 * Motor do Jogo Pong com IA Adaptativa - Afesu Veleiros & SENAI-SP
 * Situação de Aprendizagem 2: Modelos Personalizados e Heurísticas de Decisão
 */

// --- 1. CLASSE DA BOLA ---
class Ball {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radius = 7;
    this.baseSpeed = 7.0;
    this.maxSpeed = 15.0;
    this.reset();
  }

  reset(direction = 1) {
    this.x = this.canvasWidth / 2;
    this.y = this.canvasHeight / 2;
    this.speed = this.baseSpeed;
    
    // Ângulo aleatório inicial (-30° a +30°)
    const angle = (Math.random() * Math.PI / 3) - (Math.PI / 6);
    this.vx = direction * this.speed * Math.cos(angle);
    this.vy = this.speed * Math.sin(angle);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Colisão com teto e chão
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.vy = -this.vy;
    } else if (this.y + this.radius >= this.canvasHeight) {
      this.y = this.canvasHeight - this.radius;
      this.vy = -this.vy;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// --- 2. CLASSE DA RAQUETE ---
class Paddle {
  constructor(x, canvasHeight, isAI = false) {
    this.x = x;
    this.canvasHeight = canvasHeight;
    this.width = 12;
    this.height = 80;
    this.y = (canvasHeight - this.height) / 2;
    this.baseSpeed = 7.5;
    this.speed = this.baseSpeed;
    this.score = 0;
    this.isAI = isAI;
    this.targetY = this.y + this.height / 2;
  }

  reset() {
    this.y = (this.canvasHeight - this.height) / 2;
    this.targetY = this.y + this.height / 2;
  }

  moveUp() {
    this.y = Math.max(0, this.y - this.speed);
  }

  moveDown() {
    this.y = Math.min(this.canvasHeight - this.height, this.y + this.speed);
  }

  moveTo(targetCenterY) {
    const centerY = this.y + this.height / 2;
    const diff = targetCenterY - centerY;

    if (Math.abs(diff) > 4) {
      const step = Math.sign(diff) * Math.min(Math.abs(diff), this.speed);
      this.y = Math.max(0, Math.min(this.canvasHeight - this.height, this.y + step));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

// --- 3. AGENTE DE IA (TOMADA DE DECISÃO E PREVISÃO) ---
class AIAgent {
  constructor(paddle, isLeft = false) {
    this.paddle = paddle;
    this.isLeft = isLeft; // false = direita (Player 2), true = esquerda (Player 1 no modo IA vs IA)
    
    // Parâmetros configuráveis da IA
    this.reactionDelay = 80; // milissegundos
    this.noisePercent = 15;   // % de erro no cálculo do alvo
    this.showRaycast = true;

    // Estado interno do agente
    this.predictedY = paddle.canvasHeight / 2;
    this.lastCalculationTime = 0;
    this.raycastPoints = [];
    this.rebatidas = 0;
    this.totalOportunidades = 0;
  }

  setDifficulty(level) {
    switch (level) {
      case 'facil':
        this.paddle.speed = 4.5;
        this.reactionDelay = 180;
        this.noisePercent = 25;
        break;
      case 'medio':
        this.paddle.speed = 6.8;
        this.reactionDelay = 80;
        this.noisePercent = 12;
        break;
      case 'dificil':
        this.paddle.speed = 9.0;
        this.reactionDelay = 25;
        this.noisePercent = 4;
        break;
      case 'imbativel':
        this.paddle.speed = 14.0;
        this.reactionDelay = 0;
        this.noisePercent = 0;
        break;
    }
  }

  /**
   * Algoritmo de Previsão de Trajetória da Bola (Raycasting Simulado)
   * Prevê onde a bola colidirá na linha X da raquete da IA.
   */
  calcularTrajetoriaFutura(ball) {
    const points = [{ x: ball.x, y: ball.y }];
    let simX = ball.x;
    let simY = ball.y;
    let simVx = ball.vx;
    let simVy = ball.vy;

    const targetX = this.paddle.x;
    const maxPassos = 1500;
    let passos = 0;

    while (passos < maxPassos) {
      passos++;
      simX += simVx;
      simY += simVy;

      // Colisão simulada com paredes superior/inferior
      if (simY - ball.radius <= 0) {
        simY = ball.radius;
        simVy = -simVy;
        points.push({ x: simX, y: simY });
      } else if (simY + ball.radius >= ball.canvasHeight) {
        simY = ball.canvasHeight - ball.radius;
        simVy = -simVy;
        points.push({ x: simX, y: simY });
      }

      // Atingiu ou ultrapassou a linha da raquete
      const cruzou = this.isLeft ? (simX <= targetX) : (simX >= targetX);
      if (cruzou) {
        points.push({ x: targetX, y: simY });
        break;
      }
    }

    this.raycastPoints = points;
    return simY;
  }

  update(ball, currentTime) {
    const movingTowardsMe = this.isLeft ? (ball.vx < 0) : (ball.vx > 0);

    if (movingTowardsMe) {
      // Simula tempo de reação
      if (currentTime - this.lastCalculationTime >= this.reactionDelay) {
        const rawY = this.calcularTrajetoriaFutura(ball);

        // Aplica ruído (imperfeição/incerteza proporcional)
        const errorOffset = (Math.random() - 0.5) * (this.noisePercent * 3.5);
        this.predictedY = Math.max(20, Math.min(ball.canvasHeight - 20, rawY + errorOffset));
        this.lastCalculationTime = currentTime;
      }

      this.paddle.moveTo(this.predictedY);
    } else {
      // Quando a bola está se afastando, a IA retorna suavemente para o centro da quadra
      this.raycastPoints = [];
      const centroQuadra = ball.canvasHeight / 2;
      this.paddle.moveTo(centroQuadra);
    }
  }

  drawDebug(ctx) {
    if (!this.showRaycast || this.raycastPoints.length < 2) return;

    ctx.save();
    ctx.strokeStyle = this.isLeft ? 'rgba(56, 189, 248, 0.4)' : 'rgba(251, 113, 133, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(this.raycastPoints[0].x, this.raycastPoints[0].y);
    for (let i = 1; i < this.raycastPoints.length; i++) {
      ctx.lineTo(this.raycastPoints[i].x, this.raycastPoints[i].y);
    }
    ctx.stroke();

    // Desenha marcador no alvo previsto
    const lastPoint = this.raycastPoints[this.raycastPoints.length - 1];
    ctx.fillStyle = this.isLeft ? '#38bdf8' : '#fb7185';
    ctx.beginPath();
    ctx.arc(lastPoint.x, this.predictedY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// --- 4. CONTROLADOR PRINCIPAL DO JOGO PONG ---
class PongGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ball = new Ball(this.width, this.height);
    this.p1 = new Paddle(24, this.height, false); // Esquerda
    this.p2 = new Paddle(this.width - 36, this.height, true); // Direita

    this.aiP2 = new AIAgent(this.p2, false);
    this.aiP1 = new AIAgent(this.p1, true); // Para modo IA vs IA

    this.mode = 'HUMAN_VS_AI'; // 'HUMAN_VS_AI' ou 'AI_VS_AI'
    this.state = 'MENU';       // 'MENU', 'PLAYING', 'PAUSED'
    this.rally = 0;
    this.keysPressed = {};
    this.boostCharge = 0;
    this.isManualBoost = false;

    this.setupEventListeners();
    this.setupUI();
    this.lastFrameTime = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'Space', ' '].includes(e.key) || e.code === 'Space') {
        e.preventDefault();
      }
      this.keysPressed[e.key] = true;
      if (e.code === 'Space' || e.key === 'p' || e.key === 'P') {
        this.togglePlayPause();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.key] = false;
    });

    // Controle opcional por movimento do Mouse
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.mode === 'HUMAN_VS_AI' && this.state === 'PLAYING') {
        const rect = this.canvas.getBoundingClientRect();
        const scaleY = this.height / rect.height;
        const mouseY = (e.clientY - rect.top) * scaleY;
        this.p1.y = Math.max(0, Math.min(this.height - this.p1.height, mouseY - this.p1.height / 2));
      }
    });
  }

  setupUI() {
    const btnStart = document.getElementById('btnStartGame');
    if (btnStart) btnStart.onclick = () => this.startGame();

    // Modos
    const btnHvAI = document.getElementById('btnModeHvAI');
    const btnAIvAI = document.getElementById('btnModeAIvAI');
    const labelP1 = document.getElementById('label-player-1');

    if (btnHvAI && btnAIvAI) {
      btnHvAI.onclick = () => {
        this.mode = 'HUMAN_VS_AI';
        btnHvAI.classList.add('active');
        btnAIvAI.classList.remove('active');
        if (labelP1) labelP1.innerText = 'Jogador 1 (Humano)';
        this.resetGame();
      };
      btnAIvAI.onclick = () => {
        this.mode = 'AI_VS_AI';
        btnAIvAI.classList.add('active');
        btnHvAI.classList.remove('active');
        if (labelP1) labelP1.innerText = 'Agente IA (Azul)';
        this.resetGame();
      };
    }

    // Dificuldade
    document.querySelectorAll('.btn-diff').forEach((btn) => {
      btn.onclick = () => {
        document.querySelectorAll('.btn-diff').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const diff = btn.dataset.diff;
        this.aiP2.setDifficulty(diff);
        this.updateParamUI();
      };
    });

    // Sliders
    const sReaction = document.getElementById('sliderReaction');
    const sNoise = document.getElementById('sliderNoise');
    const chkRay = document.getElementById('chkRaycast');

    if (sReaction) {
      sReaction.oninput = (e) => {
        const val = parseInt(e.target.value);
        this.aiP2.reactionDelay = val;
        document.getElementById('valReaction').innerText = `${val} ms`;
      };
    }

    if (sNoise) {
      sNoise.oninput = (e) => {
        const val = parseInt(e.target.value);
        this.aiP2.noisePercent = val;
        document.getElementById('valNoise').innerText = `${val}%`;
      };
    }

    if (chkRay) {
      chkRay.onchange = (e) => {
        this.aiP2.showRaycast = e.target.checked;
        this.aiP1.showRaycast = e.target.checked;
      };
    }
  }

  updateParamUI() {
    const sReaction = document.getElementById('sliderReaction');
    const sNoise = document.getElementById('sliderNoise');
    if (sReaction) {
      sReaction.value = this.aiP2.reactionDelay;
      document.getElementById('valReaction').innerText = `${this.aiP2.reactionDelay} ms`;
    }
    if (sNoise) {
      sNoise.value = this.aiP2.noisePercent;
      document.getElementById('valNoise').innerText = `${this.aiP2.noisePercent}%`;
    }
  }

  startGame() {
    this.state = 'PLAYING';
    const overlay = document.getElementById('gameOverlay');
    if (overlay) overlay.classList.add('hidden');
  }

  togglePlayPause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      const overlay = document.getElementById('gameOverlay');
      const title = document.getElementById('overlayTitle');
      const sub = document.getElementById('overlaySubtitle');
      if (title) title.innerText = 'Jogo Pausado';
      if (sub) sub.innerText = 'Pressione ESPAÇO para retomar a partida';
      if (overlay) overlay.classList.remove('hidden');
    } else if (this.state === 'PAUSED' || this.state === 'MENU') {
      this.startGame();
    }
  }

  resetGame() {
    this.p1.score = 0;
    this.p2.score = 0;
    this.rally = 0;
    this.updateScores();
    this.ball.reset();
  }

  updateScores() {
    const elP1 = document.getElementById('score-p1');
    const elP2 = document.getElementById('score-p2');
    if (elP1) elP1.innerText = this.p1.score;
    if (elP2) elP2.innerText = this.p2.score;
  }

  update(now) {
    if (this.state !== 'PLAYING') return;

    // 0. Modo Boost / Turbo
    const isBoostRequested = this.keysPressed['Shift'] || this.keysPressed['b'] || this.keysPressed['B'] || this.isManualBoost;
    this.isBoosting = isBoostRequested && this.boostCharge > 0;

    if (this.isBoosting) {
      this.boostCharge = Math.max(0, this.boostCharge - 0.35);
      this.updateBoostUI();
    }

    const currentP1Speed = this.isBoosting ? (this.p1.speed * 1.85) : this.p1.speed;

    // 1. Movimento do Jogador 1 (Teclado)
    if (this.mode === 'HUMAN_VS_AI') {
      if (this.keysPressed['w'] || this.keysPressed['W'] || this.keysPressed['ArrowUp']) {
        this.p1.y = Math.max(0, this.p1.y - currentP1Speed);
      }
      if (this.keysPressed['s'] || this.keysPressed['S'] || this.keysPressed['ArrowDown']) {
        this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + currentP1Speed);
      }
    } else {
      // Modo IA vs IA: p1 é controlado por aiP1
      this.aiP1.update(this.ball, now);
    }

    // 2. Movimento do Jogador 2 (IA)
    this.aiP2.update(this.ball, now);

    // 3. Atualização da Física da Bola
    this.ball.update();

    // 4. Verificação de Colisão com Raquete 1 (Esquerda)
    if (this.ball.vx < 0 &&
        this.ball.x - this.ball.radius <= this.p1.x + this.p1.width &&
        this.ball.x + this.ball.radius >= this.p1.x &&
        this.ball.y >= this.p1.y &&
        this.ball.y <= this.p1.y + this.p1.height) {
      
      this.rebaterNaRaquete(this.p1, 1);
    }

    // 5. Verificação de Colisão com Raquete 2 (Direita / IA)
    if (this.ball.vx > 0 &&
        this.ball.x + this.ball.radius >= this.p2.x &&
        this.ball.x - this.ball.radius <= this.p2.x + this.p2.width &&
        this.ball.y >= this.p2.y &&
        this.ball.y <= this.p2.y + this.p2.height) {
      
      this.rebaterNaRaquete(this.p2, -1);
      this.aiP2.rebatidas++;
      this.aiP2.totalOportunidades++;
    }

    // 6. Verificação de Ponto
    if (this.ball.x < 0) {
      // Ponto para P2
      this.p2.score++;
      this.updateScores();
      this.rally = 0;
      this.ball.reset(1);
    } else if (this.ball.x > this.width) {
      // Ponto para P1 (IA errou)
      this.p1.score++;
      this.aiP2.totalOportunidades++;
      this.updateScores();
      this.rally = 0;
      this.ball.reset(-1);
    }

    // 7. Telemetria
    this.updateTelemetry();
  }

  rebaterNaRaquete(paddle, direction) {
    this.rally++;
    // Acelera sutilmente a bola a cada rebatida
    this.ball.speed = Math.min(this.ball.maxSpeed, this.ball.speed + 0.35);

    // Calcula o ângulo baseado em onde a bola bateu na raquete
    const hitOffset = (this.ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
    const maxAngle = Math.PI / 3; // 60 graus
    const bounceAngle = hitOffset * maxAngle;

    this.ball.vx = direction * this.ball.speed * Math.cos(bounceAngle);
    this.ball.vy = this.ball.speed * Math.sin(bounceAngle);

    // Carrega o Boost a cada acerto da raquete do jogador (+25%)
    if (paddle === this.p1) {
      this.boostCharge = Math.min(100, this.boostCharge + 25);
      this.updateBoostUI();
    }
  }

  updateBoostUI() {
    const fill = document.getElementById('boostFill');
    const status = document.getElementById('boostStatus');
    if (fill) fill.style.width = `${this.boostCharge}%`;
    if (status) {
      if (this.boostCharge >= 100) {
        status.innerText = '🔥 TURBO PRONTO! Segure SHIFT';
      } else if (this.boostCharge > 0) {
        status.innerText = `Segure SHIFT para acelerar 2x (${Math.round(this.boostCharge)}%)`;
      } else {
        status.innerText = 'Acerte a bola para carregar (+25%)';
      }
    }
  }

  updateTelemetry() {
    const elSpeed = document.getElementById('teleSpeed');
    const elRally = document.getElementById('teleRally');
    const elTarget = document.getElementById('teleTarget');
    const elAcc = document.getElementById('teleAccuracy');

    if (elSpeed) elSpeed.innerText = `${this.ball.speed.toFixed(1)} px/f`;
    if (elRally) elRally.innerText = `${this.rally} rebatidas`;
    if (elTarget) elTarget.innerText = `${Math.round(this.aiP2.predictedY)} px`;
    if (elAcc) {
      const taxa = this.aiP2.totalOportunidades > 0 
        ? Math.round((this.aiP2.rebatidas / this.aiP2.totalOportunidades) * 100) 
        : 100;
      elAcc.innerText = `${taxa}%`;
    }
  }

  draw() {
    // Fundo da quadra
    this.ctx.fillStyle = '#0a0a0c';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Linha central pontilhada
    this.ctx.save();
    this.ctx.strokeStyle = '#27272a';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([8, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();

    // Círculo central estético
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 45, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();

    // Desenho de Debug / Raycast da IA
    if (this.mode === 'AI_VS_AI') {
      this.aiP1.drawDebug(this.ctx);
    }
    this.aiP2.drawDebug(this.ctx);

    // Desenho da Raquete P1 (com efeito especial se Boost estiver ativo)
    if (this.isBoosting) {
      this.ctx.save();
      this.ctx.shadowColor = '#38bdf8';
      this.ctx.shadowBlur = 16;
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.fillRect(this.p1.x - 2, this.p1.y - 2, this.p1.width + 4, this.p1.height + 4);
      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      this.ctx.fillRect(this.p1.x - 7, this.p1.y + 4, 3, this.p1.height - 8);
      this.ctx.restore();
    } else {
      this.p1.draw(this.ctx);
    }

    this.p2.draw(this.ctx);
    this.ball.draw(this.ctx);
  }

  animate(now) {
    this.update(now);
    this.draw();
    requestAnimationFrame(this.animate);
  }
}

// Inicialização automática quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
  new PongGame('pongCanvas');
});
