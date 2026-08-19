import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Award, Filter, RotateCcw, Download, Sparkles } from 'lucide-react';
import { initialChecklistData } from '../data/checklistData';

const STORAGE_KEY = 'afesu_ia_checklist_v1';

export default function ProjectChecklist() {
  const [modules, setModules] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialChecklistData;
    } catch (e) {
      return initialChecklistData;
    }
  });

  const [filterModuleId, setFilterModuleId] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    } catch (e) {
      console.error('Error saving checklist:', e);
    }
  }, [modules]);

  // Calculate statistics
  let totalItems = 0;
  let completedItems = 0;

  modules.forEach((mod) => {
    mod.items.forEach((item) => {
      totalItems++;
      if (item.completed) completedItems++;
    });
  });

  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const toggleItem = (moduleId, itemId) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.moduleId === moduleId) {
          return {
            ...mod,
            items: mod.items.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          };
        }
        return mod;
      })
    );
  };

  const resetChecklist = () => {
    if (window.confirm('Tem certeza que deseja reiniciar o checklist para os valores padrão?')) {
      setModules(initialChecklistData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportReport = () => {
    let report = `========================================================\n`;
    report += `RELATÓRIO DE PROGRESSO DO CURSO DE IA GENERATIVA (40H)\n`;
    report += `AFESU VELEIROS / SENAI-SP\n`;
    report += `Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n`;
    report += `Progresso Geral: ${completedItems} de ${totalItems} tarefas (${progressPercentage}% concluído)\n`;
    report += `========================================================\n\n`;

    modules.forEach((mod) => {
      const modTotal = mod.items.length;
      const modDone = mod.items.filter((i) => i.completed).length;
      const modPct = Math.round((modDone / modTotal) * 100);
      report += `[${modPct}%] ${mod.title} (${modDone}/${modTotal} concluídas - ${mod.hours})\n`;
      mod.items.forEach((item) => {
        report += `  ${item.completed ? '[X]' : '[ ]'} ${item.text}\n`;
      });
      report += `\n`;
    });

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_progresso_ia_afesu_${Date.now()}.txt`;
    a.click();
  };

  const filteredModules =
    filterModuleId === 'all'
      ? modules
      : modules.filter((m) => m.moduleId === parseInt(filterModuleId, 10));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Card Superior de Progresso Geral */}
      <div className="glass-card checklist-header-card">
        <div style={{ flex: '1', minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={24} color="#3b82f6" />
            <h2 style={{ fontSize: '1.2rem' }}>Acompanhamento do Avanço dos Projetos</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Monitore a execução das entregas práticas e capacidades da ementa oficial (40 Horas).
          </p>

          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Progresso Total</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '800', color: progressPercentage === 100 ? '#10b981' : '#60a5fa' }}>
              {progressPercentage}%
            </span>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Tarefas Concluídas</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff' }}>
              {completedItems} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/ {totalItems}</span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button className="btn-icon" onClick={exportReport} title="Exportar relatório de progresso (.txt)">
              <Download size={16} />
            </button>
            <button className="btn-icon" onClick={resetChecklist} title="Resetar checklist">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtros por Módulo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
          <Filter size={14} /> Filtrar Módulo:
        </span>

        <button
          className={`chip ${filterModuleId === 'all' ? 'active' : ''}`}
          style={filterModuleId === 'all' ? { background: '#2563eb', color: '#ffffff', borderColor: '#3b82f6' } : {}}
          onClick={() => setFilterModuleId('all')}
        >
          Todos ({modules.length})
        </button>

        {modules.map((m) => {
          const isDone = m.items.every((i) => i.completed);
          return (
            <button
              key={m.moduleId}
              className="chip"
              style={filterModuleId === String(m.moduleId) ? { background: '#2563eb', color: '#ffffff', borderColor: '#3b82f6' } : {}}
              onClick={() => setFilterModuleId(String(m.moduleId))}
            >
              Módulo {m.moduleId} {isDone ? '✔' : ''}
            </button>
          );
        })}
      </div>

      {/* Lista de Módulos e Itens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredModules.map((module) => {
          const modTotal = module.items.length;
          const modDone = module.items.filter((i) => i.completed).length;
          const isComplete = modDone === modTotal;

          return (
            <div key={module.moduleId} className="glass-card module-card">
              <div className="module-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff' }}>{module.title}</h3>
                    <span className={`badge ${isComplete ? 'badge-done' : modDone > 0 ? 'badge-progress' : 'badge-pending'}`}>
                      {isComplete ? 'Concluído' : modDone > 0 ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {module.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} /> {module.hours}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isComplete ? '#34d399' : '#60a5fa' }}>
                    {modDone}/{modTotal}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {module.items.map((item) => (
                  <div
                    key={item.id}
                    className="checklist-item"
                    onClick={() => toggleItem(module.moduleId, item.id)}
                  >
                    <input
                      type="checkbox"
                      className="checklist-checkbox"
                      checked={item.completed}
                      onChange={() => {}} // Handler no container
                    />
                    <span
                      style={{ fontSize: '0.88rem', flex: 1 }}
                      className={item.completed ? 'item-completed' : ''}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
