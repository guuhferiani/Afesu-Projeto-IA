@echo off
echo ========================================================
echo   PORTAL DE PROJETOS DE IA - AFESU VELEIROS / SENAI-SP
echo ========================================================
echo.
echo Iniciando Backend Python (FastAPI na porta 8000)...
start "Backend FastAPI (IA)" cmd /k "cd /d "%~dp001_chatbot_atendimento_fullstack\backend" && python main.py"

echo Iniciando Frontend React (Vite na porta 3000)...
start "Frontend React" cmd /k "cd /d "%~dp001_chatbot_atendimento_fullstack\frontend" && npm run dev"

echo.
echo Servidores iniciados!
echo Abra o navegador em: http://localhost:3000
echo ========================================================
pause
