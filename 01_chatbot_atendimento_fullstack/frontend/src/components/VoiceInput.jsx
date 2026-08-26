import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export default function VoiceInput({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const reco = new SpeechRecognition();
      reco.continuous = false;
      reco.interimResults = false;
      reco.lang = 'pt-BR';

      reco.onstart = () => {
        setIsListening(true);
        setErrorMsg('');
      };

      reco.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && onTranscript) {
          onTranscript(transcript);
        }
      };

      reco.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Acesso ao microfone bloqueado.');
        } else {
          setErrorMsg('Não foi possível reconhecer o áudio.');
        }
      };

      reco.onend = () => {
        setIsListening(false);
      };

      setRecognition(reco);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Seu navegador não suporta a Web Speech API. Recomendamos Google Chrome ou Microsoft Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.error('Error starting recognition:', err);
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        className={`btn-icon ${isListening ? 'recording' : ''}`}
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? 'Gravando... Clique para parar' : 'Entrada por voz'}
      >
        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
      </button>

      {isListening && (
        <span style={{
          position: 'absolute',
          bottom: '46px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ffffff',
          color: '#0a0a0a',
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '0.2rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.15s ease'
        }}>
          Ouvindo voz...
        </span>
      )}
    </div>
  );
}
