import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ProjectChecklist from './components/ProjectChecklist';
import ProjectsOverview from './components/ProjectsOverview';
import { LayoutDashboard, MessageSquare, CheckSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [apiOnline, setApiOnline] = useState(false);

  // Check API health status
  const checkApiStatus = async () => {
    try {
      const res = await fetch('/api/metrics', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        setApiOnline(true);
      } else {
        setApiOnline(false);
      }
    } catch (e) {
      setApiOnline(false);
    }
  };

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-layout">
      <Header apiOnline={apiOnline} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {/* Navegação por Abas */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={15} /> Visão Geral & Ementa
          </button>

          <button
            className={`tab-btn ${activeTab === 'chatbot' ? 'active' : ''}`}
            onClick={() => setActiveTab('chatbot')}
          >
            <MessageSquare size={15} /> Projeto 01: Chatbot
          </button>

          <button
            className={`tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <CheckSquare size={15} /> Checklist (40h)
          </button>
        </div>

        {/* Conteúdo Dinâmico da Aba Selecionada */}
        {activeTab === 'overview' && (
          <ProjectsOverview
            onOpenChat={() => setActiveTab('chatbot')}
            onOpenChecklist={() => setActiveTab('checklist')}
          />
        )}

        {activeTab === 'chatbot' && <ChatWindow apiOnline={apiOnline} />}

        {activeTab === 'checklist' && <ProjectChecklist />}
      </main>
    </div>
  );
}
