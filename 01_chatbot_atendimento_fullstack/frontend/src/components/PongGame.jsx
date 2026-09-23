import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, Pause, RotateCcw, Brain, User, Activity, Zap, Eye, Trophy, 
  HelpCircle, Maximize2, Minimize2, ZoomIn, ZoomOut, Lightbulb, X, Flame 
} from 'lucide-react';

export default function PongGame() {
  const canvasRef = useRef(null);
  
  // Estados do Jogo no React
  const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING', 'PAUSED'
  const [gameMode, setGameMode] = useState('HUMAN_VS_AI'); // 'HUMAN_VS_AI' | 'AI_VS_AI'
  const [difficulty, setDifficulty] = useState('medio'); // 'facil' | 'medio' | 'dificil' | 'imbativel'
  const [reactionDelay, setReactionDelay] = useState(80);
  const [noisePercent, setNoisePercent] = useState(12);
  const [showRaycast, setShowRaycast] = useState(true);

  // Estados de Visualização (Zoom e Modo Foco sem Scroll)
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(90); // 80, 90, 100 (%)
  const [showHintBanner, setShowHintBanner] = useState(true);

  // Funcionalidade 1: Modo Boost / Turbo
  const [boostCharge, setBoostCharge] = useState(0); // 0 a 100%
  const [isManualBoost, setIsManualBoost] = useState(false);

  // Placar e Telemetria
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [rally, setRally] = useState(0);
  const [maxRally, setMaxRally] = useState(0);
  const [ballSpeed, setBallSpeed] = useState(7.0);
  const [aiAccuracy, setAiAccuracy] = useState(100);

  // Referência interna mutável para o loop de alta performance a 60 FPS
  const gameRef = useRef({
    ball: { x: 400, y: 240, vx: 5, vy: 3, radius: 7, speed: 7.0, baseSpeed: 7.0, maxSpeed: 15.0 },
    p1: { x: 24, y: 200, width: 12, height: 80, speed: 7.5, score: 0 },
    p2: { x: 764, y: 200, width: 12, height: 80, speed: 6.8, score: 0 },
    boost: {
      charge: 0,
      multiplier: 1.85, // Super velocidade: 7.5 * 1.85 = ~14 px/f
      isActive: false
    },
    aiP2: {
      predictedY: 240,
      lastCalc: 0,
      raycastPoints: [],
      hits: 0,
      opportunities: 0
    },
    aiP1: {
      predictedY: 240,
      lastCalc: 0,
      raycastPoints: []
    },
    keys: {},
    rallyCount: 0,
    maxRallyCount: 0,
    animationId: null
  });

  // Alternador de Pausa / Reprodução
  const togglePlayPause = () => {
    setGameState((prev) => {
      if (prev === 'PLAYING') return 'PAUSED';
      return 'PLAYING';
    });
  };

  // Trava a rolagem do body quando em Modo Foco
  useEffect(() => {
    if (isFocusMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFocusMode]);

  // Atualiza parâmetros de dificuldade no motor
  useEffect(() => {
    const g = gameRef.current;
    if (difficulty === 'facil') {
      g.p2.speed = 4.5;
      setReactionDelay(180);
      setNoisePercent(25);
    } else if (difficulty === 'medio') {
      g.p2.speed = 6.8;
      setReactionDelay(80);
      setNoisePercent(12);
    } else if (difficulty === 'dificil') {
      g.p2.speed = 9.0;
      setReactionDelay(25);
      setNoisePercent(4);
    } else if (difficulty === 'imbativel') {
      g.p2.speed = 14.0;
      setReactionDelay(0);
      setNoisePercent(0);
    }
  }, [difficulty]);

  // Loop Principal do Canvas (ÚNICO E PERSISTENTE)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 480;

    const g = gameRef.current;

    const resetBall = (direction = 1) => {
      g.ball.x = width / 2;
      g.ball.y = height / 2;
      g.ball.speed = g.ball.baseSpeed;
      const angle = (Math.random() * Math.PI / 3) - (Math.PI / 6);
      g.ball.vx = direction * g.ball.speed * Math.cos(angle);
      g.ball.vy = g.ball.speed * Math.sin(angle);
      g.rallyCount = 0;
      setRally(0);
      setBallSpeed(g.ball.speed);
    };

    const calcularTrajetoria = (ball, targetX, isLeft) => {
      const points = [{ x: ball.x, y: ball.y }];
      let sx = ball.x;
      let sy = ball.y;
      let svx = ball.vx;
      let svy = ball.vy;
      let steps = 0;

      while (steps < 1200) {
        steps++;
        sx += svx;
        sy += svy;

        if (sy - ball.radius <= 0) {
          sy = ball.radius;
          svy = -svy;
          points.push({ x: sx, y: sy });
        } else if (sy + ball.radius >= height) {
          sy = height - ball.radius;
          svy = -svy;
          points.push({ x: sx, y: sy });
        }

        const crossed = isLeft ? (sx <= targetX) : (sx >= targetX);
        if (crossed) {
          points.push({ x: targetX, y: sy });
          break;
        }
      }
      return { targetY: sy, points };
    };

    const updatePaddleAI = (paddle, aiState, isLeft, now) => {
      const movingTowards = isLeft ? (g.ball.vx < 0) : (g.ball.vx > 0);

      if (movingTowards) {
        if (now - aiState.lastCalc >= reactionDelay) {
          const { targetY, points } = calcularTrajetoria(g.ball, paddle.x, isLeft);
          const errorOffset = (Math.random() - 0.5) * (noisePercent * 3.5);
          aiState.predictedY = Math.max(30, Math.min(height - 30, targetY + errorOffset));
          aiState.raycastPoints = points;
          aiState.lastCalc = now;
        }

        const paddleCenter = paddle.y + paddle.height / 2;
        const diff = aiState.predictedY - paddleCenter;
        if (Math.abs(diff) > 4) {
          const step = Math.sign(diff) * Math.min(Math.abs(diff), paddle.speed);
          paddle.y = Math.max(0, Math.min(height - paddle.height, paddle.y + step));
        }
      } else {
        aiState.raycastPoints = [];
        const center = height / 2;
        const paddleCenter = paddle.y + paddle.height / 2;
        const diff = center - paddleCenter;
        if (Math.abs(diff) > 4) {
          paddle.y += Math.sign(diff) * 2.5;
        }
      }
    };

    const loop = (now) => {
      // 1. ATUALIZAÇÕES QUANDO EM JOGO
      let isBoosting = false;

      if (gameState === 'PLAYING') {
        // Cálculo do Modo Boost / Turbo
        const isBoostRequested = g.keys['Shift'] || g.keys['b'] || g.keys['B'] || isManualBoost;
        isBoosting = isBoostRequested && g.boost.charge > 0;
        g.boost.isActive = isBoosting;

        if (isBoosting) {
          // Consome gradualmente a barra de boost
          g.boost.charge = Math.max(0, g.boost.charge - 0.35);
          setBoostCharge(Math.round(g.boost.charge));
        }

        // Velocidade dinâmica do P1 (normal ou turbo)
        const currentP1Speed = isBoosting ? (g.p1.speed * g.boost.multiplier) : g.p1.speed;

        // Controle P1
        if (gameMode === 'HUMAN_VS_AI') {
          if (g.keys['w'] || g.keys['W'] || g.keys['ArrowUp']) {
            g.p1.y = Math.max(0, g.p1.y - currentP1Speed);
          }
          if (g.keys['s'] || g.keys['S'] || g.keys['ArrowDown']) {
            g.p1.y = Math.min(height - g.p1.height, g.p1.y + currentP1Speed);
          }
        } else {
          updatePaddleAI(g.p1, g.aiP1, true, now);
        }

        // Controle P2 (IA)
        updatePaddleAI(g.p2, g.aiP2, false, now);

        // Física da Bola
        g.ball.x += g.ball.vx;
        g.ball.y += g.ball.vy;

        // Rebater no Teto / Chão
        if (g.ball.y - g.ball.radius <= 0) {
          g.ball.y = g.ball.radius;
          g.ball.vy = -g.ball.vy;
        } else if (g.ball.y + g.ball.radius >= height) {
          g.ball.y = height - g.ball.radius;
          g.ball.vy = -g.ball.vy;
        }

        // Colisão com Raquete 1 (Esquerda) -> CARREGA A BARRA DE BOOST!
        if (g.ball.vx < 0 &&
            g.ball.x - g.ball.radius <= g.p1.x + g.p1.width &&
            g.ball.x + g.ball.radius >= g.p1.x &&
            g.ball.y >= g.p1.y &&
            g.ball.y <= g.p1.y + g.p1.height) {
          
          g.rallyCount++;
          setRally(g.rallyCount);
          if (g.rallyCount > g.maxRallyCount) {
            g.maxRallyCount = g.rallyCount;
            setMaxRally(g.rallyCount);
          }

          // Aumenta o Boost a cada rebatida bem-sucedida (+25%)
          g.boost.charge = Math.min(100, g.boost.charge + 25);
          setBoostCharge(Math.round(g.boost.charge));

          g.ball.speed = Math.min(g.ball.maxSpeed, g.ball.speed + 0.35);
          setBallSpeed(Number(g.ball.speed.toFixed(1)));
          const hit = (g.ball.y - (g.p1.y + g.p1.height / 2)) / (g.p1.height / 2);
          const angle = hit * (Math.PI / 3);
          g.ball.vx = g.ball.speed * Math.cos(angle);
          g.ball.vy = g.ball.speed * Math.sin(angle);
        }

        // Colisão com Raquete 2 (Direita / IA)
        if (g.ball.vx > 0 &&
            g.ball.x + g.ball.radius >= g.p2.x &&
            g.ball.x - g.ball.radius <= g.p2.x + g.p2.width &&
            g.ball.y >= g.p2.y &&
            g.ball.y <= g.p2.y + g.p2.height) {
          
          g.rallyCount++;
          setRally(g.rallyCount);
          if (g.rallyCount > g.maxRallyCount) {
            g.maxRallyCount = g.rallyCount;
            setMaxRally(g.rallyCount);
          }

          g.aiP2.hits++;
          g.aiP2.opportunities++;
          const taxa = Math.round((g.aiP2.hits / g.aiP2.opportunities) * 100);
          setAiAccuracy(taxa);

          g.ball.speed = Math.min(g.ball.maxSpeed, g.ball.speed + 0.35);
          setBallSpeed(Number(g.ball.speed.toFixed(1)));
          const hit = (g.ball.y - (g.p2.y + g.p2.height / 2)) / (g.p2.height / 2);
          const angle = hit * (Math.PI / 3);
          g.ball.vx = -g.ball.speed * Math.cos(angle);
          g.ball.vy = g.ball.speed * Math.sin(angle);
        }

        // Pontuação
        if (g.ball.x < 0) {
          // Ponto IA
          g.p2.score++;
          setScoreP2(g.p2.score);
          resetBall(1);
        } else if (g.ball.x > width) {
          // Ponto Humano (IA errou)
          g.p1.score++;
          setScoreP1(g.p1.score);
          g.aiP2.opportunities++;
          const taxa = Math.round((g.aiP2.hits / g.aiP2.opportunities) * 100);
          setAiAccuracy(taxa);
          resetBall(-1);
        }
      }

      // 2. RENDERIZAÇÃO NO CANVAS
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, width, height);

      // Linha central
      ctx.save();
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Círculo central
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Desenho do Raycast / Telemetria Visual da IA
      if (showRaycast) {
        if (g.aiP2.raycastPoints && g.aiP2.raycastPoints.length > 1) {
          ctx.save();
          ctx.strokeStyle = 'rgba(251, 113, 133, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(g.aiP2.raycastPoints[0].x, g.aiP2.raycastPoints[0].y);
          for (let i = 1; i < g.aiP2.raycastPoints.length; i++) {
            ctx.lineTo(g.aiP2.raycastPoints[i].x, g.aiP2.raycastPoints[i].y);
          }
          ctx.stroke();
          ctx.fillStyle = '#fb7185';
          ctx.beginPath();
          ctx.arc(g.p2.x, g.aiP2.predictedY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (gameMode === 'AI_VS_AI' && g.aiP1.raycastPoints && g.aiP1.raycastPoints.length > 1) {
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(g.aiP1.raycastPoints[0].x, g.aiP1.raycastPoints[0].y);
          for (let i = 1; i < g.aiP1.raycastPoints.length; i++) {
            ctx.lineTo(g.aiP1.raycastPoints[i].x, g.aiP1.raycastPoints[i].y);
          }
          ctx.stroke();
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(g.p1.x + g.p1.width, g.aiP1.predictedY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Desenho da Raquete P1 (com efeito visual especial de Boost quando ativo!)
      if (isBoosting) {
        ctx.save();
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(g.p1.x - 2, g.p1.y - 2, g.p1.width + 4, g.p1.height + 4);
        
        // Rastro de velocidade do Boost
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(g.p1.x - 7, g.p1.y + 4, 3, g.p1.height - 8);
        ctx.restore();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(g.p1.x, g.p1.y, g.p1.width, g.p1.height);
      }

      // Raquete P2 (IA)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(g.p2.x, g.p2.y, g.p2.width, g.p2.height);

      // Bola
      ctx.beginPath();
      ctx.arc(g.ball.x, g.ball.y, g.ball.radius, 0, Math.PI * 2);
      ctx.fill();

      g.animationId = requestAnimationFrame(loop);
    };

    g.animationId = requestAnimationFrame(loop);

    // Eventos de Teclado (com PAUSA em P / Espaço e BOOST em Shift / B)
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'Space', ' '].includes(e.key) || e.code === 'Space') {
        e.preventDefault();
      }
      
      g.keys[e.key] = true;

      // Atalho de Pausa: tecla 'P', 'p' ou 'Espaço'
      if (e.key === 'p' || e.key === 'P' || e.code === 'Space') {
        togglePlayPause();
      }

      if (e.key === 'Escape') {
        setIsFocusMode(false);
      }
    };

    const handleKeyUp = (e) => {
      g.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(g.animationId);
    };
  }, [gameState, gameMode, reactionDelay, noisePercent, showRaycast, isManualBoost]);

  // Controle por Mouse / Touch no Canvas
  const handleMouseMove = (e) => {
    if (gameMode !== 'HUMAN_VS_AI' || gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleY = 480 / rect.height;
    const mouseY = (e.clientY - rect.top) * scaleY;
    gameRef.current.p1.y = Math.max(0, Math.min(480 - gameRef.current.p1.height, mouseY - gameRef.current.p1.height / 2));
  };

  const handleTouchMove = (e) => {
    if (gameMode !== 'HUMAN_VS_AI' || gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const scaleY = 480 / rect.height;
    const touchY = (e.touches[0].clientY - rect.top) * scaleY;
    gameRef.current.p1.y = Math.max(0, Math.min(480 - gameRef.current.p1.height, touchY - gameRef.current.p1.height / 2));
  };

  const handleResetScores = () => {
    gameRef.current.p1.score = 0;
    gameRef.current.p2.score = 0;
    gameRef.current.rallyCount = 0;
    gameRef.current.boost.charge = 0;
    gameRef.current.aiP2.hits = 0;
    gameRef.current.aiP2.opportunities = 0;
    setScoreP1(0);
    setScoreP2(0);
    setRally(0);
    setBoostCharge(0);
    setAiAccuracy(100);
  };

  // Render dos Controles Laterais
  const renderSidebarControls = (isCompact = false) => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isCompact ? '0.5rem' : '0.75rem',
      maxHeight: isFocusMode ? 'calc(100vh - 120px)' : 'none',
      overflowY: isFocusMode ? 'auto' : 'visible'
    }}>
      {/* Botões de Ação Rápida: Pausar e Reiniciar */}
      <div className="glass-card" style={{ padding: isCompact ? '0.55rem' : '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
        <button
          onClick={togglePlayPause}
          style={{
            background: gameState === 'PLAYING' ? '#27272a' : '#ffffff',
            color: gameState === 'PLAYING' ? '#ffffff' : '#000000',
            border: 'none',
            borderRadius: '6px',
            padding: '0.45rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            transition: 'all 0.15s ease'
          }}
        >
          {gameState === 'PLAYING' ? <><Pause size={13} /> Pausar (P)</> : <><Play size={13} /> Retomar (P)</>}
        </button>

        <button
          onClick={handleResetScores}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            borderRadius: '6px',
            padding: '0.45rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}
        >
          <RotateCcw size={12} /> Reiniciar
        </button>
      </div>

      {/* Seletor de Modo */}
      <div className="glass-card" style={{ padding: isCompact ? '0.6rem' : '0.85rem' }}>
        <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
          Modo de Jogo
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
          <button
            className={`tab-btn ${gameMode === 'HUMAN_VS_AI' ? 'active' : ''}`}
            style={{ padding: '0.4rem', fontSize: '0.72rem', justifyContent: 'center' }}
            onClick={() => { setGameMode('HUMAN_VS_AI'); handleResetScores(); }}
          >
            <User size={12} /> Humano vs IA
          </button>
          <button
            className={`tab-btn ${gameMode === 'AI_VS_AI' ? 'active' : ''}`}
            style={{ padding: '0.4rem', fontSize: '0.72rem', justifyContent: 'center' }}
            onClick={() => { setGameMode('AI_VS_AI'); handleResetScores(); }}
          >
            <Brain size={12} /> IA vs IA
          </button>
        </div>
      </div>

      {/* Dificuldade da IA */}
      <div className="glass-card" style={{ padding: isCompact ? '0.6rem' : '0.85rem' }}>
        <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
          Nível do Agente
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.3rem' }}>
          {[
            { id: 'facil', label: 'Fácil' },
            { id: 'medio', label: 'Médio' },
            { id: 'dificil', label: 'Difícil' },
            { id: 'imbativel', label: 'Imbatível' }
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setDifficulty(lvl.id)}
              style={{
                background: difficulty === lvl.id ? '#27272a' : 'transparent',
                color: difficulty === lvl.id ? '#ffffff' : 'var(--text-muted)',
                border: `1px solid ${difficulty === lvl.id ? '#71717a' : 'var(--border-color)'}`,
                borderRadius: '6px',
                padding: '0.35rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calibração de Hiperparâmetros */}
      <div className="glass-card" style={{ padding: isCompact ? '0.6rem' : '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
          Calibração de Parâmetros
        </h4>

        {/* Latência de Reação */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.15rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tempo de Reação:</span>
            <span style={{ fontWeight: 600 }}>{reactionDelay} ms</span>
          </div>
          <input
            type="range"
            min="0"
            max="250"
            step="10"
            value={reactionDelay}
            onChange={(e) => setReactionDelay(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
          />
        </div>

        {/* Ruído / Erro */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.15rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Taxa de Erro / Ruído:</span>
            <span style={{ fontWeight: 600 }}>{noisePercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={noisePercent}
            onChange={(e) => setNoisePercent(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
          />
        </div>

        {/* Alternar Raycast Visual */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showRaycast}
            onChange={(e) => setShowRaycast(e.target.checked)}
            style={{ accentColor: '#ffffff' }}
          />
          <span>Exibir Previsão (Raycast)</span>
        </label>
      </div>

      {/* Telemetria em Tempo Real */}
      <div className="glass-card" style={{ padding: isCompact ? '0.6rem' : '0.85rem' }}>
        <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
          Telemetria ao Vivo
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>Velocidade</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{ballSpeed} px/f</span>
          </div>
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>Rali Atual</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{rally} batidas</span>
          </div>
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>Recorde</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{maxRally} batidas</span>
          </div>
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>Acerto IA</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{aiAccuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      
      {/* Barra de Recomendações e Ferramentas de Zoom / Tela Cheia (apenas no modo normal) */}
      {!isFocusMode && showHintBanner && (
        <div className="glass-card" style={{
          padding: '0.65rem 1rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lightbulb size={16} color="#fbbf24" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-main)' }}>
              <b>Dica de Visibilidade:</b> Em telas pequenas ou notebooks, use o <b>Modo Foco</b> ou ajuste o <b>Zoom</b> para ver o jogo e todos os controles juntos sem nenhuma rolagem.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Controles de Zoom */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '0.2rem'
            }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', padding: '0 0.4rem', textTransform: 'uppercase' }}>Zoom:</span>
              {[80, 90, 100].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  style={{
                    background: zoomLevel === z ? '#27272a' : 'transparent',
                    color: zoomLevel === z ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {z}%
                </button>
              ))}
            </div>

            {/* Botão de Modo Foco / Tela Cheia */}
            <button
              onClick={() => setIsFocusMode(true)}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Maximize2 size={13} /> Modo Foco (Sem Rolagem)
            </button>

            <button
              onClick={() => setShowHintBanner(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.2rem' }}
              title="Fechar dica"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* CONTAINER PRINCIPAL DO JOGO */}
      <div style={isFocusMode ? {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxSizing: 'border-box'
      } : {
        display: 'flex',
        flexDirection: 'column',
        transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
        transformOrigin: 'top center',
        transition: 'transform 0.2s ease',
        marginBottom: zoomLevel !== 100 ? `-${(100 - zoomLevel) * 3}px` : '0'
      }}>
        
        {/* Barra Superior quando em Modo Foco */}
        {isFocusMode && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.65rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="badge badge-done">Modo Foco Ativo</span>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Arena Pong com IA Adaptativa</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pressione <code>ESC</code> para sair</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-card)', padding: '0.25rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Placar:</span>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>{scoreP1} : {scoreP2}</span>
              </div>

              <button
                onClick={togglePlayPause}
                style={{
                  background: gameState === 'PLAYING' ? '#27272a' : '#ffffff',
                  color: gameState === 'PLAYING' ? '#ffffff' : '#000000',
                  border: '1px solid #71717a',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                {gameState === 'PLAYING' ? <><Pause size={13} /> Pausar (P)</> : <><Play size={13} /> Retomar (P)</>}
              </button>

              <button
                onClick={() => setIsFocusMode(false)}
                style={{
                  background: '#27272a',
                  color: '#ffffff',
                  border: '1px solid #71717a',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Minimize2 size={13} /> Sair do Modo Foco (ESC)
              </button>
            </div>
          </div>
        )}

        {/* Grid: Arena do Jogo (Esquerda) + Controles (Direita) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: '1rem',
          flex: isFocusMode ? 1 : 'none',
          minHeight: 0
        }}>
          
          {/* LADO ESQUERDO: ARENA DO JOGO */}
          <div className="glass-card" style={{
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isFocusMode ? 'center' : 'flex-start',
            gap: '0.65rem',
            minHeight: 0
          }}>
            
            {/* Placar e Botões de Controle Rápido (no modo normal) */}
            {!isFocusMode && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {gameMode === 'HUMAN_VS_AI' ? 'Jogador (Humano)' : 'Agente IA 1 (Azul)'}
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{scoreP1}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--border-color)', fontWeight: 300 }}>:</span>
                  
                  {/* Botão de Pausar / Retomar */}
                  <button
                    onClick={togglePlayPause}
                    title="Pausar ou Retomar a partida (Teclas P ou Espaço)"
                    style={{
                      background: gameState === 'PLAYING' ? 'var(--bg-card-subtle)' : '#ffffff',
                      color: gameState === 'PLAYING' ? 'var(--text-main)' : '#000000',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.55rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    {gameState === 'PLAYING' ? <><Pause size={12} /> Pausar (P)</> : <><Play size={12} /> Retomar (P)</>}
                  </button>

                  <button
                    onClick={() => setIsFocusMode(true)}
                    title="Expandir para tela cheia sem rolagem"
                    style={{
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Maximize2 size={12} /> Modo Foco
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Agente IA 2 (Rosa)
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{scoreP2}</div>
                </div>
              </div>
            )}

            {/* BARRA DO MODO BOOST / TURBO */}
            <div style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: `1px solid ${boostCharge >= 100 ? '#38bdf8' : 'var(--border-color)'}`,
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              transition: 'border-color 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}>
                <Zap size={15} color={boostCharge > 0 ? '#38bdf8' : '#71717a'} />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>MODO BOOST</span>
                    {boostCharge >= 100 && (
                      <span style={{ fontSize: '0.62rem', background: '#0369a1', color: '#e0f2fe', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                        TURBO PRONTO!
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {boostCharge > 0 ? 'Segure SHIFT para acelerar 2x' : 'Acerte a bola para carregar (+25%)'}
                  </div>
                </div>
              </div>

              {/* Trilho da Barra de Progresso */}
              <div style={{ flex: 1, background: '#18181b', height: '8px', borderRadius: '999px', overflow: 'hidden', border: '1px solid #27272a' }}>
                <div style={{
                  height: '100%',
                  width: `${boostCharge}%`,
                  background: boostCharge >= 100 
                    ? 'linear-gradient(90deg, #38bdf8, #60a5fa, #ffffff)' 
                    : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                  transition: 'width 0.2s ease',
                  boxShadow: boostCharge > 0 ? '0 0 10px rgba(56, 189, 248, 0.5)' : 'none'
                }} />
              </div>

              {/* Botão de Turbo para Mouse / Touch */}
              <button
                onMouseDown={() => setIsManualBoost(true)}
                onMouseUp={() => setIsManualBoost(false)}
                onTouchStart={() => setIsManualBoost(true)}
                onTouchEnd={() => setIsManualBoost(false)}
                disabled={boostCharge <= 0}
                style={{
                  background: boostCharge > 0 ? '#38bdf8' : '#27272a',
                  color: boostCharge > 0 ? '#000000' : '#71717a',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: boostCharge > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  userSelect: 'none'
                }}
              >
                <Flame size={12} /> {Math.round(boostCharge)}% TURBO
              </button>
            </div>

            {/* O ÚNICO CANVAS DO JOGO (PERMANECE MONTADO E ATIVO EM AMBOS OS MODOS!) */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: isFocusMode ? 'none' : '800px',
              maxHeight: isFocusMode ? 'calc(100vh - 170px)' : 'none',
              aspectRatio: '800 / 480',
              background: '#09090b',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={480}
                style={{ width: '100%', height: '100%', display: 'block', cursor: 'ns-resize' }}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              />

              {/* Overlay de Início / Pausa */}
              {gameState !== 'PLAYING' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  textAlign: 'center',
                  padding: '1.5rem'
                }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    maxWidth: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    {gameState === 'PAUSED' ? (
                      <Pause size={30} color="#38bdf8" />
                    ) : (
                      <Brain size={30} color="#ffffff" />
                    )}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                      {gameState === 'MENU' ? 'Arena Pong com IA' : 'Partida Pausada'}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {gameState === 'MENU'
                        ? 'Desafie o agente de IA adaptativo ou assista a duas máquinas competindo.'
                        : 'Pressione Espaço, tecla P ou clique abaixo para continuar a jogada.'}
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '0.25rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.5rem 1rem' }}
                      onClick={() => setGameState('PLAYING')}
                    >
                      <Play size={14} /> {gameState === 'MENU' ? 'Iniciar Partida' : 'Continuar Jogando'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dicas de Controle na base do Canvas */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              gap: '0.4rem'
            }}>
              <span>⌨️ <b>Teclas:</b> <code>W / S</code> ou <code>↑ / ↓</code></span>
              <span>⚡ <b>Boost:</b> Segure <code>SHIFT</code></span>
              <span>⏸️ <b>Pausa:</b> Tecla <code>P</code> ou <code>Espaço</code></span>
              <button
                onClick={handleResetScores}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} /> Zerar Placar
              </button>
            </div>
          </div>

          {/* LADO DIREITO: CONTROLES E TELEMETRIA DA IA */}
          {renderSidebarControls(isFocusMode)}
        </div>
      </div>

    </div>
  );
}
