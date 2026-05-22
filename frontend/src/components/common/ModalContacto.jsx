import React from 'react';

const ModalContacto = ({ onClose }) => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose} // Cierra al hacer clic fuera
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '420px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(83,74,183,0.2)',
          border: '1px solid #E8E6F3',
        }}
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem' 
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.3rem', 
            fontWeight: 700, 
            color: '#1A1633' 
          }}>
            📬 Contacto
          </h3>
          <button 
            onClick={onClose} 
            style={{ 
              background: '#EEEDFE', 
              border: 'none', 
              fontSize: '1.1rem', 
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#534AB7',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#534AB7';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#EEEDFE';
              e.currentTarget.style.color = '#534AB7';
            }}
          >
            ✕
          </button>
        </div>

        {/* Correo */}
        <div style={{ 
          marginBottom: '1.25rem', 
          padding: '1.25rem', 
          backgroundColor: '#F8F7FF', 
          borderRadius: '12px',
          border: '1px solid #EEEDFE',
        }}>
          <div style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#534AB7',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            📧 Correo Electrónico
          </div>
          <a 
            href="mailto:rent.ipn.contacto@gmail.com" 
            style={{ 
              color: '#1A1633', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#534AB7'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#1A1633'}
          >
            rent.ipn.contacto@gmail.com
          </a>
        </div>

        {/* Redes Sociales */}
        <div style={{ 
          padding: '1.25rem', 
          backgroundColor: '#F8F7FF', 
          borderRadius: '12px',
          border: '1px solid #EEEDFE',
        }}>
          <div style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#534AB7',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.75rem',
          }}>
            🌐 Redes Sociales
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Facebook */}
            <a 
              href="https://facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                color: '#4A4668', 
                textDecoration: 'none', 
                fontSize: '0.9rem', 
                fontWeight: 500,
                padding: '0.6rem 0.75rem', 
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EEEDFE';
                e.currentTarget.style.color = '#1877F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#4A4668';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📘</span> Facebook
            </a>
            
            {/* Instagram */}
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                color: '#4A4668', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.6rem 0.75rem', 
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EEEDFE';
                e.currentTarget.style.color = '#E4405F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#4A4668';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📷</span> Instagram
            </a>
            
            {/* Twitter / X */}
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                color: '#4A4668', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.6rem 0.75rem', 
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EEEDFE';
                e.currentTarget.style.color = '#1DA1F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#4A4668';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🐦</span> Twitter / X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContacto;