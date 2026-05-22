import { useState, useEffect } from 'react';

const TOAST_TYPES = {
  error:   { bg: '#FEE2E2', border: '#FECACA', color: '#991B1B', icon: '❌', title: 'Error' },
  success: { bg: '#D1FAE5', border: '#A7F3D0', color: '#065F46', icon: '✅', title: 'Éxito' },
  warning: { bg: '#FEF3C7', border: '#FDE68A', color: '#92400E', icon: '⚠️', title: 'Atención' },
  info:    { bg: '#EEEDFE', border: '#CECBF6', color: '#534AB7', icon: 'ℹ️', title: 'Info' },
};

const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const t = TOAST_TYPES[type] || TOAST_TYPES.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 9999,
      maxWidth: '420px',
      width: '90%',
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: '16px',
      padding: '1rem 1.25rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'opacity 0.3s, transform 0.3s',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{t.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: t.color, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
          {t.title}
        </div>
        <div style={{ color: t.color, fontSize: '0.84rem', lineHeight: 1.5, opacity: 0.85 }}>
          {message}
        </div>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '1rem', padding: '2px', flexShrink: 0, opacity: 0.6 }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;