# 📋 Pré-Requisitos para o Desenvolvimento dos Projetos de IA
### Curso de Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40h)
**AFESU Veleiros & SENAI-SP** | **Instrutor**: Gustavo Feriani

Este documento detalha todos os pré-requisitos técnicos, de ambiente e de conhecimentos necessários para que alunas e professores desenvolvam os 4 projetos práticos do curso com tranquilidade.

---

## 💻 1. Requisitos de Hardware & Equipamentos

| Item | Requisito Mínimo | Recomendado | Observações |
| :--- | :--- | :--- | :--- |
| **Computador** | Processador Dual-Core (Intel i3 ou AMD Ryzen 3), 4 GB RAM | Processador Quad-Core (Intel i5 ou Ryzen 5), 8 GB+ RAM | Computador ou notebook com Windows 10/11, Linux ou macOS. |
| **Microfone** | Integrado ao notebook ou headset | Headset com redução de ruídos | **Essencial para o Projeto 01** (Reconhecimento de Voz / STT). |
| **Câmera / Webcam** | Câmera USB ou integrada (720p) | Câmera HD (1080p) | **Essencial para o Projeto 02** (Visão Computacional e Detecção Facial). |
| **Internet** | Conexão de 5 Mbps estável | Conexão de 15 Mbps+ | Para download de pacotes (`pip`, `npm`) e chamadas de APIs de IA. |

---

## 🛠️ 2. Softwares & Ferramentas Instaladas

### 🔹 2.1. Ambiente de Execução & Linguagens
1. **Python 3.10 ou superior**:
   - Download oficial: [python.org](https://www.python.org/downloads/)
   - ⚠️ **Importante no Windows:** Marcar a opção *"Add Python to PATH"* durante a instalação.
2. **Node.js (LTS - versão 18 ou superior) & npm**:
   - Download oficial: [nodejs.org](https://nodejs.org/) (inclui o gerenciador `npm` e `npx`).
3. **Git (Controle de Versão)**:
   - Download oficial: [git-scm.com](https://git-scm.com/)

### 🔹 2.2. Editor de Código (IDE) & Extensões
* **Visual Studio Code (VS Code)** ou IDE Antigravity:
  * Extensão **Python** (Microsoft).
  * Extensão **ES7+ React/Redux/React-Native snippets**.
  * Extensão **Live Preview** ou **Thunder Client** (opcional, para testar APIs).

### 🔹 2.3. Navegador de Internet
* **Google Chrome**, **Microsoft Edge** ou **Brave**:
  * ⚠️ **Atenção:** Navegadores baseados em Chromium possuem suporte nativo à **Web Speech API** (`SpeechRecognition`), indispensável para a entrada por voz do Projeto 1.

---

## 🔑 3. Contas & Chaves de API Gratuitas

1. **Conta no GitHub**:
   - Para versionar os projetos, criar o portfólio das alunas e publicar os trabalhos.
2. **Conta no Groq Cloud (Opcional para Modo LLM)**:
   - Site: [console.groq.com](https://console.groq.com/)
   - Permite gerar chave de API gratuita (`GROQ_API_KEY`) para respostas ultra-rápidas com modelos como **Llama 3.3 70B**.
   - *Nota:* O Projeto 01 possui **motor de fallback offline**, funcionando perfeitamente mesmo sem chave de API.

---

## 📚 4. Conhecimentos Prévios Recomendados (Perfil das Alunas)

As alunas terão apoio pedagógico contínuo e uso de **Pair Programming com IA**, mas é vantajoso que tenham:
- **Ensino Fundamental concluído** (idade mínima: 14 anos).
- **Noções básicas de lógica de programação** (conceitos de variáveis, condições `if/else`, listas/arrays e funções).
- **Noções básicas de uso do computador** (criar pastas, salvar arquivos, abrir o terminal de comandos).
- **Curiosidade e autonomia** para testar prompts, diagnosticar respostas e personalizar interfaces.

---

## 🧪 5. Checklist de Verificação Rápida do Ambiente (Terminal)

Abra o terminal (PowerShell, Prompt de Comando ou Bash) e execute os comandos abaixo para validar o computador:

```bash
# 1. Verificar a versão do Python (deve ser 3.10+)
python --version

# 2. Verificar a versão do Node.js (deve ser v18+)
node --version

# 3. Verificar a versão do NPM
npm --version

# 4. Verificar o Git
git --version
```

Se todos os comandos retornarem suas respectivas versões sem erros, **o ambiente está 100% pronto para iniciar as aulas!** 🚀
