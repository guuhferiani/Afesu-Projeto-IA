import React from 'react';
import { Terminal, Circle } from 'lucide-react';

export default function Header({ apiOnline }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-main)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.85rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: '#ffffff',
            color: '#0a0a0a',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '-0.03em'
          }}>
            AV
          </div>
          <div>
            <h1 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Afesu Veleiros <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>/</span> Projetos de IA
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              SENAI-SP • 40 Horas
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: apiOnline ? 'var(--status-online)' : 'var(--status-offline)'
            }} />
            <span>API {apiOnline ? 'Online' : 'Conectando'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

