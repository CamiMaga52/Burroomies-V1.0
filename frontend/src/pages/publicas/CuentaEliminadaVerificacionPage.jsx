import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarSimple from '../../components/common/NavbarSimple'
import FooterInicio from '../../components/common/FooterInicio'

const CuentaEliminadaVerificacionPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f7ff' }}>
      <NavbarSimple />

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '48px 40px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          textAlign: 'center'
        }}>
          {/* Ícono */}
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#fff0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            border: '2px solid #ffd0d0'
          }}>
            <span style={{ fontSize: '40px' }}>🚫</span>
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#1A1633',
            margin: '0 0 12px'
          }}>
            Cuenta eliminada
          </h1>

          {/* Mensaje principal */}
          <p style={{
            fontSize: '15px',
            color: '#444',
            lineHeight: '1.6',
            margin: '0 0 20px'
          }}>
            Tu cuenta de estudiante fue eliminada porque <strong>no verificaste tu identidad dentro de los 60 días</strong> posteriores a tu registro.
          </p>

          {/* Caja informativa */}
          <div style={{
            backgroundColor: '#f5f3ff',
            border: '1px solid #d4ceff',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: '600', color: '#1A1633', fontSize: '14px' }}>
              ¿Qué puedo hacer?
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#555', fontSize: '14px', lineHeight: '1.8' }}>
              <li>Vuelve a crear una cuenta con tu correo institucional.</li>
              <li>Al registrarte, sube tu constancia de estudios para verificar tu identidad de inmediato.</li>
              <li>Si tienes dudas, contacta al soporte de RentIPN.</li>
            </ul>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => navigate('/registro')}
              style={{
                padding: '14px',
                backgroundColor: '#1A1633',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2348'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A1633'}
            >
              Registrarme nuevamente
            </button>

            <button
              onClick={() => navigate('/')}
              style={{
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#1A1633',
                border: '1px solid #ccc',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0eef7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>

      <FooterInicio />
    </div>
  )
}

export default CuentaEliminadaVerificacionPage