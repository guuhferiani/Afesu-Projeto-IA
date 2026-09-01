# 💬 Prompt 07: Reconhecimento de Voz (STT) com Web Speech API

* **Projeto:** 01 — Chatbot de Suporte Full-Stack (AfesuTech)
* **Camada:** Camada 4 — Multimodalidade & Acessibilidade
* **Arquivo Alvo:** `frontend/src/components/VoiceInput.jsx`

---

## 🎯 Objetivo
Construir o componente React de entrada por voz nativa no navegador (Speech-to-Text) com suporte ao português do Brasil (`pt-BR`) e animação visual de gravação.

---

## 📋 Prompt para Copiar e Executar na IA

```text
Crie um componente React chamado "VoiceInput.jsx" que utilize a Web Speech API (window.SpeechRecognition ou window.webkitSpeechRecognition) nativa dos navegadores para entrada por voz.

Requisitos:
1. Botão com ícone de microfone (Lucide React).
2. Configuração de idioma para Português do Brasil ('pt-BR').
3. Estado visual "isListening" que aplica classe animada enquanto o usuário estiver falando.
4. Quando a fala for reconhecida, envia o texto transcrito para a prop "onTranscript(text)".
5. Tratamento de erros amigável (microfone bloqueado ou navegador incompatível).
6. Props: "onTranscript" (função de callback) e "disabled" (booleano).
```
