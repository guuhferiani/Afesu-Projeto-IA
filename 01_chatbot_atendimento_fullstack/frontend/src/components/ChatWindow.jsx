import React, { useState, useEffect, useRef } from 'react';
import { Send, ThumbsUp, ThumbsDown, Sparkles, RefreshCw, Database, Cpu, Zap, Download, Bot, User, Copy, Check } from 'lucide-react';
import VoiceInput from './VoiceInput';
import FormattedMessage from './FormattedMessage';

export default function ChatWindow({ apiOnline }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Olá! Sou o assistente de inteligência artificial da **AfesuTech** 🚀\nEstou aqui para tirar dúvidas sobre nossos planos de atendimento automatizado, integrações técnicas com Python/React e arquitetura de IA. Como posso ajudar você hoje?',
      source: 'greeting',
      confidence: 1.0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Quais os planos e preços?',
        'Como funciona a integração com React e Python?',
        'Qual a arquitetura de IA utilizada?',
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
          suggestedActions: data.suggested_actions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Falha na resposta do servidor');
      }
    } catch (err) {
      // Fallback amigável local se a API não estiver respondendo
      setTimeout(() => {
        const fallbackMsg = {
          id: 'bot_offline_' + Date.now(),
          sender: 'bot',
          text: 'Recebi sua mensagem! O backend em FastAPI está sendo conectado. Você pode testar perguntas sobre **planos**, **integração**, **IA generativa** e **suporte**.',
          source: 'local_fallback',
          confidence: 0.8,
          suggestedActions: ['Quais os planos e preços?', 'Como funciona o suporte 24/7?'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 500);
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
    if (window.confirm('Deseja limpar todo o histórico da conversa?')) {
      setMessages([
        {
          id: 'welcome_reset',
          sender: 'bot',
          text: 'Histórico reiniciado. Como posso ajudar você agora?',
          source: 'system',
          confidence: 1.0,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: ['Quais os planos e preços?', 'Como integrar com React e Python?']
        }
      ]);
    }
  };

  const exportChat = () => {
    const content = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'CLIENTE' : 'IA AFESUTECH'}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_atendimento_ia_${Date.now()}.txt`;
    a.click();
  };

  const lastBotMessage = messages.filter((m) => m.sender === 'bot').slice(-1)[0];

  return (
    <div className="chat-container">
      {/* Coluna Principal: Chat */}
      <div className="glass-card chat-box">
        {/* Cabeçalho da Janela de Chat */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }} />
            <div>
              <h3 style={{ fontSize: '0.95rem' }}>AfesuTech AI Support (Situação de Aprendizagem 1)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                RAG Base de Conhecimento • FastAPI • Web Speech STT
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button className="btn-icon" onClick={exportChat} title="Exportar histórico (.txt)">
              <Download size={16} />
            </button>
            <button className="btn-icon" onClick={clearChat} title="Reiniciar conversa">
              <RefreshCw size={16} />
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
                    <Sparkles size={12} /> {msg.source?.includes('groq') ? 'IA Generativa (Groq GPT-120B)' : (msg.source || 'IA Generativa')}
                  </span>
                  {msg.confidence !== undefined && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      Confiança: {Math.round(msg.confidence * 100)}%
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
                borderTop: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                fontSize: '0.7rem',
                color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-dim)'
              }}>
                <span>{msg.timestamp}</span>

                {msg.sender === 'bot' && (
                  <div className="message-feedback" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                    <button
                      className="feedback-btn"
                      onClick={() => copyToClipboard(msg.id, msg.text)}
                      title="Copiar resposta"
                    >
                      {copiedId === msg.id ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                    </button>
                    {msg.id !== 'welcome' && (
                      <>
                        <button
                          className={`feedback-btn ${msg.feedback === 'liked' ? 'liked' : ''}`}
                          onClick={() => handleFeedback(msg.id, true)}
                          title="Útil"
                        >
                          <ThumbsUp size={13} />
                        </button>
                        <button
                          className={`feedback-btn ${msg.feedback === 'disliked' ? 'disliked' : ''}`}
                          onClick={() => handleFeedback(msg.id, false)}
                          title="Não foi útil"
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
              <Sparkles size={16} className="animate-spin" style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gerando resposta inteligente com IA...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões Rápidas (Chips) */}
        {lastBotMessage?.suggestedActions && lastBotMessage.suggestedActions.length > 0 && (
          <div className="quick-chips">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', width: '100%', marginBottom: '2px' }}>
              Sugestões de perguntas rápidas:
            </span>
            {lastBotMessage.suggestedActions.map((action, i) => (
              <button key={i} className="chip" onClick={() => handleSendMessage(action)}>
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
          <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />

          <input
            type="text"
            className="chat-input"
            placeholder="Digite sua dúvida ou use o microfone..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />

          <button type="submit" className="btn-primary" disabled={loading || !inputText.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Coluna Lateral: Métricas e Arquitetura */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} color="#3b82f6" /> Métricas em Tempo Real
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Total de Mensagens</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffffff' }}>
                {metrics?.metrics?.total_messages || messages.length}
              </span>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Satisfação</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981' }}>
                {metrics?.satisfaction_rate !== undefined ? `${metrics.satisfaction_rate}%` : '100%'}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <p>✓ Resoluções via Base de Conhecimento (RAG)</p>
            <p>✓ Reconhecimento de Voz (STT) ativo</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#8b5cf6" /> Stack do Projeto 01
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.8rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }} />
              <strong>Backend:</strong> Python 3 + FastAPI REST API
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }} />
              <strong>Frontend:</strong> React (Vite) + CSS Glassmorphism
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <strong>Voz (STT):</strong> Web Speech API no Navegador
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
              <strong>IA:</strong> RAG & NLP para intenções e respostas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
