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
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', background: 'var(--bg-surface)' }}>
        <div style={{ flex: '1', minWidth: '260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="#ffffff" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Acompanhamento da Ementa</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Execução de entregas práticas e competências do curso de 40 Horas.
          </p>

          <div style={{
            height: '6px',
            background: '#27272a',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginTop: '0.85rem'
          }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercentage}%`,
                background: '#ffffff',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          background: 'var(--bg-card)',
          padding: '0.75rem 1.1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Conclusão</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              {progressPercentage}%
            </span>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Tarefas</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {completedItems} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/ {totalItems}</span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <button className="btn-icon" style={{ width: '32px', height: '32px' }} onClick={exportReport} title="Exportar relatório (.txt)">
              <Download size={14} />
            </button>
            <button className="btn-icon" style={{ width: '32px', height: '32px' }} onClick={resetChecklist} title="Resetar checklist">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtros por Módulo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        overflowX: 'auto',
        paddingBottom: '0.35rem'
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
          <Filter size={13} /> Filtrar:
        </span>

        <button
          className="chip-btn"
          style={filterModuleId === 'all' ? { background: '#ffffff', color: '#0a0a0a', fontWeight: 600 } : {}}
          onClick={() => setFilterModuleId('all')}
        >
          Todos ({modules.length})
        </button>

        {modules.map((m) => {
          const isDone = m.items.every((i) => i.completed);
          const isSelected = filterModuleId === String(m.moduleId);
          return (
            <button
              key={m.moduleId}
              className="chip-btn"
              style={isSelected ? { background: '#ffffff', color: '#0a0a0a', fontWeight: 600 } : {}}
              onClick={() => setFilterModuleId(String(m.moduleId))}
            >
              Módulo {m.moduleId} {isDone ? '✔' : ''}
            </button>
          );
        })}
      </div>

      {/* Lista de Módulos e Itens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filteredModules.map((module) => {
          const modTotal = module.items.length;
          const modDone = module.items.filter((i) => i.completed).length;
          const isComplete = modDone === modTotal;

          return (
            <div key={module.moduleId} className="glass-card" style={{ padding: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{module.title}</h3>
                    <span className={`badge ${isComplete ? 'badge-done' : modDone > 0 ? 'badge-progress' : 'badge-pending'}`}>
                      {isComplete ? 'Concluído' : modDone > 0 ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {module.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {module.hours}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isComplete ? '#ffffff' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {modDone}/{modTotal}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {module.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.45rem 0.65rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.03)'
                    }}
                    onClick={() => toggleItem(module.moduleId, item.id)}
                  >
                    <input
                      type="checkbox"
                      className="checklist-checkbox"
                      checked={item.completed}
                      onChange={() => {}}
                    />
                    <span
                      style={{ fontSize: '0.85rem', flex: 1, color: item.completed ? 'var(--text-dim)' : 'var(--text-secondary)' }}
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
