import React from 'react';
import { FileText, Bot, Eye, BarChart3, Gamepad2, ArrowUpRight, CheckCircle, Code } from 'lucide-react';

export default function ProjectsOverview({ onOpenChat, onOpenChecklist }) {
  const projects = [
    {
      id: 'p1',
      num: '01',
      title: 'Chatbot de Suporte Inteligente Full-Stack',
      category: 'Situação de Aprendizagem 1 • IA Generativa',
      description: 'Assistente virtual de atendimento ao cliente escalável com RAG (base de conhecimento), API em FastAPI, Reconhecimento de Voz (STT) e frontend React.',
      stack: ['Python 3', 'FastAPI', 'React (Vite)', 'Web Speech API', 'RAG / JSON'],
      icon: Bot,
      status: 'Pronto / Ativo',
      statusClass: 'badge-done',
      pdfName: '01_Plano_Projeto_Chatbot_Suporte_IA.pdf'
    },
    {
      id: 'p2',
      num: '02',
      title: 'Dashboard de Visão Computacional em Tempo Real',
      category: 'Módulo de Visão Computacional • OpenCV + YOLO',
      description: 'Aplicação web integrada com webcam para detecção de rostos e múltiplos objetos em tempo real com caixas delimitadoras e contador de itens.',
      stack: ['Python', 'OpenCV', 'YOLOv8', 'React Feed', 'Canvas Overlay'],
      icon: Eye,
      status: 'Próxima Etapa',
      statusClass: 'badge-progress',
      pdfName: '02_Plano_Projeto_Visao_Computacional.pdf'
    },
    {
      id: 'p3',
      num: '03',
      title: 'Analisador de Sentimentos & Feedbacks (NLP)',
      category: 'Módulo de PLN • spaCy + NLTK',
      description: 'Painel analítico para processamento de avaliações de clientes, lematização, remoção de stopwords e classificação de polaridade (Positivo/Neutro/Negativo).',
      stack: ['Python', 'spaCy', 'NLTK', 'Scikit-Learn', 'React Charts'],
      icon: BarChart3,
      status: 'Próxima Etapa',
      statusClass: 'badge-progress',
      pdfName: '03_Plano_Projeto_Analise_Sentimentos_NLP.pdf'
    },
    {
      id: 'p4',
      num: '04',
      title: 'Jogo Pong com IA Adaptativa',
      category: 'Situação de Aprendizagem 2 • Modelos Personalizados',
      description: 'Jogo interativo Pong em React/Canvas onde o adversário é controlado por IA com calibração de tempo de reação e taxa de acerto.',
      stack: ['React', 'HTML5 Canvas', 'Q-Learning / Heurística', 'JavaScript Puro'],
      icon: Gamepad2,
      status: 'Próxima Etapa',
      statusClass: 'badge-progress',
      pdfName: '04_Plano_Projeto_Jogo_Pong_IA.pdf'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner de Apresentação */}
      <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.15))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-progress" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
              Trilha Oficial de 40 Horas • SENAI-SP & Afesu Veleiros
            </span>
            <h2 style={{ fontSize: '1.35rem' }}>4 Projetos Práticos Híbridos (Python + React)</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', maxWidth: '750px' }}>
              Esta grade foi projetada para cobrir 100% da ementa do curso, preparando os estudantes com portfólio real de Full-Stack AI.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="btn-primary" onClick={onOpenChat}>
              <Bot size={16} /> Testar Chatbot Ativo
            </button>
            <button className="btn-primary" style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--border-color)' }} onClick={onOpenChecklist}>
              <CheckCircle size={16} /> Ver Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Grid dos 4 Projetos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div key={proj.id} className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa'
                  }}>
                    <Icon size={22} />
                  </div>
                  <span className={`badge ${proj.statusClass}`}>{proj.status}</span>
                </div>

                <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {proj.category}
                </span>
                <h3 style={{ fontSize: '1.05rem', margin: '0.3rem 0 0.5rem 0' }}>{proj.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {proj.stack.map((st, i) => (
                    <span key={i} style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)'
                    }}>
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FileText size={13} /> {proj.pdfName}
                </span>
                {proj.id === 'p1' ? (
                  <button
                    onClick={onOpenChat}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#60a5fa',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Abrir Chat <ArrowUpRight size={14} />
                  </button>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>PDF Gerado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Seção de Documentação & PDFs */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} color="#10b981" /> Documentos & Planos de Implementação Exportados em PDF
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Todos os planos foram gerados com base na ementa oficial e estão salvos na pasta raiz do projeto:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem' }}>
          {[
            { name: 'Plano_Geral_Projetos_IA_Afesu.pdf', desc: 'Plano Geral e Regras de Negócio (40h)' },
            { name: '01_Plano_Projeto_Chatbot_Suporte_IA.pdf', desc: 'Projeto 1: Chatbot Full-Stack' },
            { name: '02_Plano_Projeto_Visao_Computacional.pdf', desc: 'Projeto 2: Visão Computacional' },
            { name: '03_Plano_Projeto_Analise_Sentimentos_NLP.pdf', desc: 'Projeto 3: Analisador de Sentimentos' },
            { name: '04_Plano_Projeto_Jogo_Pong_IA.pdf', desc: 'Projeto 4: Jogo Pong com IA' }
          ].map((doc, idx) => (
            <div key={idx} style={{
              background: 'rgba(30, 41, 59, 0.4)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FileText size={20} color="#3b82f6" />
              <div>
                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#ffffff' }}>{doc.name}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{doc.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
