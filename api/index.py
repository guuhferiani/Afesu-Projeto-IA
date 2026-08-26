import sys
import os

# Configura o path para importar os módulos do backend
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "01_chatbot_atendimento_fullstack", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from main import app
