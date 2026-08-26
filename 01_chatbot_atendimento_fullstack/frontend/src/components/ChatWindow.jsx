import React, { useState, useEffect, useRef } from 'react';
import { Send, ThumbsUp, ThumbsDown, RefreshCw, Download, Copy, Check, BarChart2, Layers } from 'lucide-react';
import VoiceInput from './VoiceInput';
import FormattedMessage from './FormattedMessage';

export default function ChatWindow({ apiOnline }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual da **AfesuTech**.\nEstou à disposição para esclarecer dúvidas sobre nossos serviços, planos, suporte técnico e arquitetura de sistemas. Como posso ajudar você hoje?',
      source: 'sistema',
      confidence: 1.0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Quais os planos e preços?',
        'Como funciona a integração com React e Python?',
        'Qual a arquitetura utilizada?',
        'Como funciona o suporte 24/7?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [metrics, setMetrics] = useState({
    total_messages: 1,
    resolved_by_kb: 0,
    positive_feedbacks: 0,
    negative_feedbacks: 0,
    satisfaction_rate: 100.0
  });

  const copyToClipboard = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {
      console.log('Metrics fetch offline');
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text || !text.trim() || loading) return;

    const userMsgId = 'usr_' + Date.now();
    const newMsg = {
      id: userMsgId,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), session_id: 'afesu_session_1' })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg = {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: data.reply,
          source: data.source,
          confidence: data.confidence,
          suggestedActions: data.suggested_actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      setTimeout(() => {
        const fallbackMsg = {
          id: 'bot_offline_' + Date.now(),
          sender: 'bot',
          text: 'Recebi sua mensagem. O backend local está em sincronização. Você pode consultar sobre planos, suporte e integrações.',
          source: 'local_fallback',
          confidence: 0.8,
          suggestedActions: ['Quais os planos e preços?', 'Como funciona o suporte 24/7?'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 400);
    } finally {
      setLoading(false);
      fetchMetrics();
    }
  };

  const handleFeedback = async (msgId, isPositive) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === msgId ? { ...msg, feedback: isPositive ? 'liked' : 'disliked' } : msg))
    );

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: msgId, is_positive: isPositive })
      });
      fetchMetrics();
    } catch (e) {
      console.log('Feedback registered locally');
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setInputText(transcript);
    handleSendMessage(transcript);
  };

  const clearChat = () => {
    if (window.confirm('Deseja reiniciar o histórico da conversa?')) {
      setMessages([
        {
          id: 'welcome_reset',
          sender: 'bot',
          text: 'Histórico reiniciado. Como posso ajudar você agora?',
          source: 'sistema',
          confidence: 1.0,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: ['Quais os planos e preços?', 'Como integrar com React e Python?']
        }
      ]);
    }
  };

  const exportChat = () => {
    const content = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'USUÁRIO' : 'AFESUTECH'}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atendimento_${Date.now()}.txt`;
    a.click();
  };

  const lastBotMessage = messages.filter((m) => m.sender === 'bot').slice(-1)[0];

  return (
    <div className="chat-container">
      {/* Coluna Principal: Chat */}
      <div className="chat-box">
        {/* Cabeçalho do Chat */}
        <div style={{
          padding: '0.85rem 1.15rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-surface)'
        }}>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Assistente de Atendimento
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Projeto 01 • Python FastAPI + React
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button className="btn-icon" onClick={exportChat} title="Exportar histórico (.txt)">
              <Download size={15} />
            </button>
            <button className="btn-icon" onClick={clearChat} title="Reiniciar conversa">
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Lista de Mensagens */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
            >
              {msg.sender === 'bot' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <span className="meta-tag">
                    {msg.source?.includes('groq') ? 'Groq GPT-120B' : (msg.source || 'Sistema')}
                  </span>
                  {msg.confidence !== undefined && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {Math.round(msg.confidence * 100)}%
                    </span>
                  )}
                </div>
              )}

              {msg.sender === 'bot' ? (
                <FormattedMessage content={msg.text} />
              ) : (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.5rem',
                paddingTop: '0.35rem',
                borderTop: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                fontSize: '0.7rem',
                color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-dim)'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{msg.timestamp}</span>

                {msg.sender === 'bot' && (
                  <div className="message-feedback">
                    <button
                      className="feedback-btn"
                      onClick={() => copyToClipboard(msg.id, msg.text)}
                      title="Copiar texto"
                    >
                      {copiedId === msg.id ? <Check size={13} style={{ color: '#ffffff' }} /> : <Copy size={13} />}
                    </button>
                    {msg.id !== 'welcome' && (
                      <>
                        <button
                          className={`feedback-btn ${msg.feedback === 'liked' ? 'liked' : ''}`}
                          onClick={() => handleFeedback(msg.id, true)}
                          title="Resposta correta"
                        >
                          <ThumbsUp size={13} />
                        </button>
                        <button
                          className={`feedback-btn ${msg.feedback === 'disliked' ? 'disliked' : ''}`}
                          onClick={() => handleFeedback(msg.id, false)}
                          title="Resposta incorreta"
                        >
                          <ThumbsDown size={13} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-bubble message-bot" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                animation: 'pulseRecording 1s infinite'
              }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Gerando resposta...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões Rápidas (Chips) */}
        {lastBotMessage?.suggestedActions && lastBotMessage.suggestedActions.length > 0 && (
          <div className="quick-chips" style={{ padding: '0.5rem 1.15rem 0', background: 'var(--bg-surface)' }}>
            {lastBotMessage.suggestedActions.map((action, i) => (
              <button key={i} className="chip-btn" onClick={() => handleSendMessage(action)}>
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Barra de Entrada de Mensagem */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <div className="input-form">
            <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />

            <input
              type="text"
              className="chat-input"
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
            />

            <button type="submit" className="btn-primary" disabled={loading || !inputText.trim()}>
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>

      {/* Coluna Lateral: Métricas e Arquitetura */}
      <div className="sidebar-panel">
        <div className="info-card">
          <h4>
            <BarChart2 size={15} /> Métricas de Atendimento
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Mensagens</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                {metrics?.metrics?.total_messages || messages.length}
              </span>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Satisfação</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                {metrics?.satisfaction_rate !== undefined ? `${metrics.satisfaction_rate}%` : '100%'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <p>• Motor de RAG & Base Vetorial</p>
            <p>• Reconhecimento de Voz (STT)</p>
          </div>
        </div>

        <div className="info-card">
          <h4>
            <Layers size={15} /> Especificações Técnicas
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
            <div className="stat-item">
              <span className="stat-label">Backend</span>
              <span className="stat-val">FastAPI (Python)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Frontend</span>
              <span className="stat-val">React 18 + Vite</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Modelo LLM</span>
              <span className="stat-val">Groq LPU (120B)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Entrada de Voz</span>
              <span className="stat-val">Web Speech API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
