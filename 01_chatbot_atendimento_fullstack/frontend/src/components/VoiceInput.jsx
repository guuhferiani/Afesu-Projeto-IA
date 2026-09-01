import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export default function VoiceInput({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);

  // Verifica compatibilidade do navegador
  const isSpeechSupported = typeof window !== 'undefined' && 
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const startListening = () => {
    setErrorMessage('');

    // Validação de contexto seguro em navegadores móveis
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      alert('⚠️ Para usar o microfone no celular, a conexão precisa ser HTTPS ou via túnel seguro (ex: npx localtunnel).');
      return;
    }

    if (!isSpeechSupported) {
      alert('Seu navegador móvel não suporta a Web Speech API. Recomendamos abrir no Google Chrome (Android) ou Safari (iOS).');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMessage('');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && onTranscript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition event error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setErrorMessage('Permissão de microfone negada. Toque no cadeado da barra de endereço para permitir.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('Nenhuma voz detectada. Tente falar mais perto do celular.');
      } else {
        setErrorMessage('Falha ao capturar áudio.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Erro ao iniciar reconhecimento de voz:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Erro ao parar reconhecimento:', err);
      }
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Limpa o listener ao desmontar o componente
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        className={`btn-icon ${isListening ? 'recording' : ''}`}
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? 'Gravando... Toque para parar' : 'Falar pelo microfone'}
        style={{
          minWidth: '38px',
          minHeight: '38px',
          touchAction: 'manipulation'
        }}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      {/* Tooltip de feedback visual para Mobile / Desktop */}
      {isListening && (
        <span style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ef4444',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.3rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)',
          animation: 'pulse 1.5s infinite',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'inline-block'
          }} />
          Ouvindo no celular... Fale agora!
        </span>
      )}

      {/* Aviso de erro amigável */}
      {errorMessage && (
        <span style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1f1315',
          border: '1px solid #7f1d1d',
          color: '#f87171',
          fontSize: '0.72rem',
          padding: '0.3rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          whiteSpace: 'nowrap',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <AlertCircle size={13} /> {errorMessage}
        </span>
      )}
    </div>
  );
}
