import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 800, "AFESU VELEIROS / SENAI-SP | Programação em Inteligência Artificial Generativa")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 792, 540, 792)
            
        # Footer
        text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(540, 36, text)
        self.drawString(54, 36, "Projetos Práticos de IA (Python + JavaScript/React) - Carga Horária: 40h")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 48, 540, 48)
        
        self.restoreState()

def get_custom_styles():
    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#0f172a") # Slate 900
    brand_blue = colors.HexColor("#2563eb")    # Blue 600
    text_color = colors.HexColor("#334155")    # Slate 700
    
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=brand_blue,
        spaceAfter=15
    ))

    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=primary_color,
        spaceBefore=12,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='SubSectionHeader',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=brand_blue,
        spaceBefore=8,
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='CustomBody',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='CustomBullet',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_color,
        leftIndent=12,
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        name='CalloutText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1e293b")
    ))

    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    ))

    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=text_color
    ))

    return styles

def build_pdf(filename, title, subtitle, story_elements):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    doc.build(story_elements, canvasmaker=NumberedCanvas)
    print(f"[OK] Gerado com sucesso: {filename}")

def create_general_plan_pdf(output_path):
    styles = get_custom_styles()
    story = []

    # Title Banner
    story.append(Paragraph("PLANO GERAL DE PROJETOS E REGRA DE NEGÓCIOS", styles['DocTitle']))
    story.append(Paragraph("Aperfeiçoamento Profissional em Inteligência Artificial Generativa (40h)", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563eb"), spaceAfter=12))

    # Context Card
    info_data = [
        [
            Paragraph("<b>Instituição:</b> SENAI-SP / Afesu Veleiros", styles['TableCell']),
            Paragraph("<b>Carga Horária:</b> 40 Horas", styles['TableCell']),
        ],
        [
            Paragraph("<b>Público-Alvo:</b> A partir de 14 anos (Ensino Fundamental Concluído)", styles['TableCell']),
            Paragraph("<b>Stack:</b> Python 3 + JavaScript/React (Vite)", styles['TableCell']),
        ]
    ]
    info_table = Table(info_data, colWidths=[240, 240])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f1f5f9")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 10))

    # Section: Objetivos do Curso
    story.append(Paragraph("1. Objetivo Pedagógico & Regras de Negócio", styles['SectionHeader']))
    story.append(Paragraph(
        "Capacitar os estudantes a planejar, codificar, depurar e publicar soluções inteligentes integrando o ecossistema de <b>Inteligência Artificial em Python</b> (Machine Learning, Redes Neurais, Visão Computacional e NLP/LLMs) com interfaces modernas e interativas em <b>JavaScript / React</b>.",
        styles['CustomBody']
    ))
    story.append(Paragraph(
        "<b>Diferencial da Formação Full-Stack AI:</b> O aluno aprende não apenas a rodar modelos em linha de comando ou notebooks, mas a criar aplicações web completas, prontas para o mercado de trabalho.",
        styles['CustomBody']
    ))

    # Section: Matriz dos 4 Projetos Oficiais
    story.append(Paragraph("2. Trilha Oficial dos 4 Projetos Práticos", styles['SectionHeader']))
    
    proj_table_data = [
        [
            Paragraph("<b>Projeto / Módulo</b>", styles['TableHeader']),
            Paragraph("<b>Stack & Tecnologias</b>", styles['TableHeader']),
            Paragraph("<b>Descrição & Entregáveis</b>", styles['TableHeader'])
        ],
        [
            Paragraph("<b>01. Chatbot de Suporte com IA Generativa</b><br/><i>(Situação 1 da Ementa)</i>", styles['TableCell']),
            Paragraph("• Python (FastAPI)<br/>• React (Vite)<br/>• Web Speech API (STT)<br/>• RAG / Base Conhecimento", styles['TableCell']),
            Paragraph("Assistente virtual escalável para empresa de suporte. Interface com chat em tempo real, respostas contextualizadas e comando de voz.", styles['TableCell'])
        ],
        [
            Paragraph("<b>02. Dashboard de Visão Computacional</b><br/><i>(Módulo de CV)</i>", styles['TableCell']),
            Paragraph("• Python (OpenCV / YOLO)<br/>• React + Webcam Feed<br/>• TensorFlow.js (opcional)", styles['TableCell']),
            Paragraph("Detecção de múltiplos objetos e reconhecimento facial ao vivo pela webcam com caixas delimitadoras e alertas no navegador.", styles['TableCell'])
        ],
        [
            Paragraph("<b>03. Analisador de Sentimentos & Feedbacks</b><br/><i>(Módulo de NLP)</i>", styles['TableCell']),
            Paragraph("• Python (spaCy, NLTK, Scikit-learn)<br/>• React (Gráficos/Recharts)", styles['TableCell']),
            Paragraph("Painel interativo de análise de avaliações de clientes, classificação de satisfação (positivo/neutro/negativo) e métricas.", styles['TableCell'])
        ],
        [
            Paragraph("<b>04. Jogo Pong com IA Adaptativa</b><br/><i>(Situação 2 da Ementa)</i>", styles['TableCell']),
            Paragraph("• React + HTML5 Canvas<br/>• Algoritmo de Decisão/Q-Learn<br/>• JavaScript puro/ES6", styles['TableCell']),
            Paragraph("Jogo interativo onde a raquete adversária utiliza modelo de IA para interceptar a bola, com controle de dificuldade e métricas.", styles['TableCell'])
        ]
    ]
    
    proj_table = Table(proj_table_data, colWidths=[130, 150, 200])
    proj_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1e293b")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(proj_table)
    story.append(Spacer(1, 12))

    # Section: Cronograma 40h
    story.append(Paragraph("3. Sugestão de Distribuição de Carga Horária (40 Horas)", styles['SectionHeader']))
    crono_data = [
        [Paragraph("<b>Etapa</b>", styles['TableHeader']), Paragraph("<b>Conteúdos e Atividades</b>", styles['TableHeader']), Paragraph("<b>Carga</b>", styles['TableHeader'])],
        [Paragraph("Módulo 1", styles['TableCell']), Paragraph("Fundamentos de IA, Ética, Machine Learning Clássico e Scikit-Learn", styles['TableCell']), Paragraph("8h", styles['TableCell'])],
        [Paragraph("Módulo 2", styles['TableCell']), Paragraph("Redes Neurais Artificiais, Keras/TensorFlow e Arquiteturas Profundas", styles['TableCell']), Paragraph("8h", styles['TableCell'])],
        [Paragraph("Módulo 3", styles['TableCell']), Paragraph("Processamento de Linguagem Natural (spaCy/NLTK) & Projeto 3 (Dashboard)", styles['TableCell']), Paragraph("8h", styles['TableCell'])],
        [Paragraph("Módulo 4", styles['TableCell']), Paragraph("Visão Computacional (OpenCV, YOLO, STT) & Projeto 2 (Webcam)", styles['TableCell']), Paragraph("8h", styles['TableCell'])],
        [Paragraph("Módulo 5 & 6", styles['TableCell']), Paragraph("Situações de Aprendizagem: Projeto 1 (Chatbot Full-Stack) e Projeto 4 (Pong IA)", styles['TableCell']), Paragraph("8h", styles['TableCell'])],
    ]
    crono_table = Table(crono_data, colWidths=[65, 360, 55])
    crono_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#2563eb")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(crono_table)
    story.append(Spacer(1, 10))

    # Section: Critérios de Avaliação
    story.append(Paragraph("4. Competências e Critérios Avaliativos", styles['SectionHeader']))
    story.append(Paragraph("• <b>Capacidades Técnicas:</b> Capacidade de estruturar pipelines de dados, treinar/integrar modelos de IA, consumir APIs REST e desenvolver interfaces interativas.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Capacidades Socioemocionais:</b> Autogestão com checklist de tarefas, raciocínio lógico em depuração de erros, trabalho colaborativo e pensamento analítico.", styles['CustomBullet']))

    build_pdf(output_path, "Plano Geral de Projetos", "Afesu Veleiros", story)

def create_project_1_pdf(output_path):
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("PLANO DE IMPLEMENTAÇÃO - PROJETO 01", styles['DocTitle']))
    story.append(Paragraph("Chatbot de Suporte Inteligente Full-Stack (Python + React + Voz)", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563eb"), spaceAfter=12))

    story.append(Paragraph("1. Visão Geral da Situação de Aprendizagem", styles['SectionHeader']))
    story.append(Paragraph(
        "Este projeto atende diretamente à <b>Situação de Aprendizagem 1</b> da ementa oficial: criar uma solução escalável de atendimento ao cliente por inteligência artificial para um investidor de serviços no Brasil.",
        styles['CustomBody']
    ))

    story.append(Paragraph("2. Arquitetura da Solução", styles['SectionHeader']))
    story.append(Paragraph("• <b>Backend (Python / FastAPI):</b> Servidor assíncrono com endpoints `/api/chat`, `/api/knowledge-base` e `/api/metrics`. Mecanismo de busca semântica em base de dados com regras da empresa e integração com LLMs.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Frontend (JavaScript / React):</b> Interface de chat rica com envio de texto, suporte nativo a reconhecimento de fala (Web Speech API / STT), avaliação de respostas (*feedback*) e histórico de chamados.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Checklist Interativo Embutido:</b> Painel para o aluno acompanhar o passo a passo da construção e registrar seu progresso.", styles['CustomBullet']))

    story.append(Paragraph("3. Roteiro Passo a Passo de Desenvolvimento", styles['SectionHeader']))
    
    steps_data = [
        [Paragraph("<b>Etapa</b>", styles['TableHeader']), Paragraph("<b>Ações do Estudante / Professor</b>", styles['TableHeader'])],
        [Paragraph("Etapa 1", styles['TableCell']), Paragraph("Definição da base de conhecimento da empresa (produtos, horários, políticas e suporte) em formato JSON/TXT.", styles['TableCell'])],
        [Paragraph("Etapa 2", styles['TableCell']), Paragraph("Desenvolvimento da API FastAPI com processamento de intenções e respostas geradas por IA.", styles['TableCell'])],
        [Paragraph("Etapa 3", styles['TableCell']), Paragraph("Criação da interface de chat em React com Vite e componentes responsivos.", styles['TableCell'])],
        [Paragraph("Etapa 4", styles['TableCell']), Paragraph("Integração do microfone via Web Speech API para habilitar comando por voz no chatbot.", styles['TableCell'])],
        [Paragraph("Etapa 5", styles['TableCell']), Paragraph("Testes de atendimento, análise de logs e apresentação da solução para o investidor.", styles['TableCell'])],
    ]
    steps_table = Table(steps_data, colWidths=[70, 410])
    steps_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1e293b")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(steps_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("4. Checklist de Avaliação do Projeto", styles['SectionHeader']))
    story.append(Paragraph("✓ Backend FastAPI respondendo corretamente com status 200 nas rotas `/api/chat`.", styles['CustomBullet']))
    story.append(Paragraph("✓ Frontend React renderizando mensagens do usuário e do bot com formatação limpa.", styles['CustomBullet']))
    story.append(Paragraph("✓ Reconhecimento de voz (STT) transcrevendo áudio diretamente para a caixa de texto.", styles['CustomBullet']))
    story.append(Paragraph("✓ Tratamento de dúvidas não cobertas com resposta educada de encaminhamento humano.", styles['CustomBullet']))

    build_pdf(output_path, "Projeto 1: Chatbot Full-Stack", "Afesu Veleiros", story)

def create_project_2_pdf(output_path):
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("PLANO DE IMPLEMENTAÇÃO - PROJETO 02", styles['DocTitle']))
    story.append(Paragraph("Dashboard de Visão Computacional em Tempo Real (OpenCV + YOLO + React)", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563eb"), spaceAfter=12))

    story.append(Paragraph("1. Objetivo e Conteúdos Formativos", styles['SectionHeader']))
    story.append(Paragraph(
        "Desenvolver uma aplicação interativa que captura imagens e vídeo da webcam, processa frames com algoritmos de <b>Visão Computacional (OpenCV e YOLO)</b> e exibe em um painel React as detecções, contagem de pessoas/objetos e níveis de confiança.",
        styles['CustomBody']
    ))

    story.append(Paragraph("2. Funcionalidades do Projeto", styles['SectionHeader']))
    story.append(Paragraph("• <b>Detecção de Rostos e Expressões:</b> Utilizando classificadores Haar Cascade / MediaPipe.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Reconhecimento de Objetos (YOLO):</b> Identificação de mais de 80 classes cotidianas (celular, garrafa, cadeira, pessoa, etc.).", styles['CustomBullet']))
    story.append(Paragraph("• <b>Painel de Métricas no React:</b> Contador de objetos detectados, FPS (taxa de quadros) e alerta de segurança visual.", styles['CustomBullet']))

    story.append(Paragraph("3. Competências Exercitadas", styles['SectionHeader']))
    story.append(Paragraph("• Manipulação de matrizes de imagem com NumPy e OpenCV.", styles['CustomBullet']))
    story.append(Paragraph("• Renderização de bounding boxes sobre streaming de vídeo no Canvas.", styles['CustomBullet']))
    story.append(Paragraph("• Compreensão prática de limiares de confiança (*confidence threshold*) e IoU.", styles['CustomBullet']))

    build_pdf(output_path, "Projeto 2: Visão Computacional", "Afesu Veleiros", story)

def create_project_3_pdf(output_path):
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("PLANO DE IMPLEMENTAÇÃO - PROJETO 03", styles['DocTitle']))
    story.append(Paragraph("Analisador de Sentimentos & Feedbacks (NLP: spaCy + NLTK + React)", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563eb"), spaceAfter=12))

    story.append(Paragraph("1. Objetivo e Conteúdos Formativos", styles['SectionHeader']))
    story.append(Paragraph(
        "Construir uma ferramenta analítica de <b>Processamento de Linguagem Natural (PLN)</b> capaz de ingerir avaliações de clientes, realizar limpeza textual, extrair entidades nomeadas e classificar o tom emocional das mensagens.",
        styles['CustomBody']
    ))

    story.append(Paragraph("2. Pipeline de Processamento", styles['SectionHeader']))
    story.append(Paragraph("• <b>Tokenização & Lematização:</b> Redução de palavras ao lema com `spaCy`.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Remoção de Ruído:</b> Eliminação de pontuações, URLs e stop words em português.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Vetorização & Classificação:</b> TF-IDF e classificador Naive Bayes / Regressão Logística com `scikit-learn`.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Interface Gráfica:</b> Dashboard em React com medidor de satisfação (Positivo, Neutro, Negativo) e destaques de palavras-chave.", styles['CustomBullet']))

    build_pdf(output_path, "Projeto 3: Analisador de Sentimentos", "Afesu Veleiros", story)

def create_project_4_pdf(output_path):
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("PLANO DE IMPLEMENTAÇÃO - PROJETO 04", styles['DocTitle']))
    story.append(Paragraph("Jogo Pong com IA Adaptativa (React + Canvas + Q-Learning)", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563eb"), spaceAfter=12))

    story.append(Paragraph("1. Objetivo e Situação de Aprendizagem 2", styles['SectionHeader']))
    story.append(Paragraph(
        "Atendendo à recomendação metodológica da ementa (criação de IA para jogar Pong), este projeto implementa um ambiente de jogo interativo onde os estudantes compreendem na prática o funcionamento de <b>Modelos Personalizados e Aprendizado por Reforço / Heurísticas</b>.",
        styles['CustomBody']
    ))

    story.append(Paragraph("2. Funcionalidades e Modos de Jogo", styles['SectionHeader']))
    story.append(Paragraph("• <b>Modo Jogador vs IA:</b> O estudante controla uma raquete e enfrenta o agente inteligente.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Modo IA vs IA:</b> Visualização de duas inteligências disputando em velocidade acelerada.", styles['CustomBullet']))
    story.append(Paragraph("• <b>Ajuste de Parâmetros em Tempo Real:</b> Controle de taxa de aprendizado, tempo de reação e taxa de erro da IA.", styles['CustomBullet']))

    build_pdf(output_path, "Projeto 4: Jogo Pong com IA", "Afesu Veleiros", story)

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Generate all PDFs
    create_general_plan_pdf(os.path.join(base_dir, "Plano_Geral_Projetos_IA_Afesu.pdf"))
    create_project_1_pdf(os.path.join(base_dir, "01_Plano_Projeto_Chatbot_Suporte_IA.pdf"))
    create_project_2_pdf(os.path.join(base_dir, "02_Plano_Projeto_Visao_Computacional.pdf"))
    create_project_3_pdf(os.path.join(base_dir, "03_Plano_Projeto_Analise_Sentimentos_NLP.pdf"))
    create_project_4_pdf(os.path.join(base_dir, "04_Plano_Projeto_Jogo_Pong_IA.pdf"))
    print("\nTodos os PDFs foram gerados com sucesso na raiz do projeto!")
