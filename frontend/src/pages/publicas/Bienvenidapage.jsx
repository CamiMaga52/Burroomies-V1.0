import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarRegistro from '../../components/common/NavbarRegistro';
import FooterRegistro from '../../components/common/FooterInicio';
import burroSaludo from '../../assets/burro.png';
import '../../styles/VerificarCorreo.css';

/* ════════════════════════════════
   ESTILOS (coherentes con HomePage)
════════════════════════════════ */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #ffffff 50%, #F8F7FF 100%)',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 5vw',
  },
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '2.5rem 2rem',
    maxWidth: '520px',
    width: '100%',
    boxShadow: '0 8px 40px rgba(83,74,183,0.12)',
    border: '1px solid #E8E6F3',
    textAlign: 'center',
  },
  mascot: {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 8px 24px rgba(83,74,183,0.2))',
    animation: 'float 4s ease-in-out infinite',
  },
  iconCircle: (bg, color) => ({
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    margin: '0 auto 1.5rem',
  }),
  title: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#1A1633',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#4A4668',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  alertBox: (bg, border, color) => ({
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: '16px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    textAlign: 'left',
  }),
  alertTitle: (color) => ({
    fontWeight: 700,
    color: color,
    marginBottom: '0.25rem',
    fontSize: '0.9rem',
  }),
  alertText: (color) => ({
    fontSize: '0.84rem',
    color: color,
    lineHeight: 1.6,
  }),
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#EEEDFE',
    color: '#534AB7',
    border: '1px solid #CECBF6',
    borderRadius: '50px',
    padding: '6px 16px',
    fontSize: '0.82rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  button: (bg, hoverBg) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px 24px',
    borderRadius: '50px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: bg,
    color: '#ffffff',
    boxShadow: `0 4px 16px ${bg}44`,
    transition: 'background 0.2s, transform 0.2s',
    textDecoration: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }),
};

/* ════════════════════════════════
   COMPONENTE
════════════════════════════════ */
const BienvenidaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rol = location.state?.rol;
  const verificadoConDocumento = location.state?.verificadoConDocumento;
  const pendiente = rol === 'estudiante' && verificadoConDocumento === false;

  // ── Estudiante con verificación pendiente ──────────────────────────────────
  if (pendiente) {
    return (
      <div style={styles.page}>
        <NavbarRegistro />

        <div style={styles.container}>
          <div style={styles.card}>
            {/* Mascota */}
            <img src={burroSaludo} alt="Mascota RentIPN" style={styles.mascot} />

            {/* Ícono de advertencia */}
            <div style={styles.iconCircle('#FEF3C7', '#F59E0B')}>⚠️</div>

            {/* Título */}
            <h2 style={styles.title}>¡Bienvenid@ a RentIPN!</h2>
            <p style={styles.subtitle}>
              Tu cuenta ha sido creada exitosamente.
            </p>

            {/* Alerta de verificación pendiente */}
            <div style={styles.alertBox('#FFFBEB', '#FDE68A', '#92400E')}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>⏳</span>
                <div>
                  <div style={styles.alertTitle('#92400E')}>
                    Verificación de identidad pendiente
                  </div>
                  <div style={styles.alertText('#78350F')}>
                    Tienes <strong>60 días</strong> para subir tu constancia de estudios y verificar tu identidad.
                    Si no lo haces antes de esa fecha, <strong>tu cuenta será eliminada automáticamente</strong>.
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#92400E', marginTop: '0.5rem' }}>
                    Puedes hacerlo desde tu cuenta en cualquier momento.
                  </div>
                </div>
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={() => navigate('/usuarios/inicio-sesion')}
              style={styles.button('#534AB7', '#3C3489')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3C3489';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#534AB7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </div>

        <FooterRegistro />
      </div>
    );
  }

  // ── Cuenta verificada ─────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <NavbarRegistro />

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Mascota */}
          <img src={burroSaludo} alt="Mascota RentIPN" style={styles.mascot} />

          {/* Ícono de éxito */}
          <div style={styles.iconCircle('#D1FAE5', '#10B981')}>🎉</div>

          {/* Título */}
          <h2 style={styles.title}>¡Bienvenid@!</h2>
          <p style={styles.subtitle}>
            Tu cuenta ha sido creada y verificada exitosamente.
          </p>

          {/* Badge de verificado */}
          <div style={styles.badge}>
            <span>✅</span> Identidad verificada
          </div>

          {/* Texto según rol */}
          <p style={{ color: '#4A4668', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {rol === 'arrendador'
              ? 'Ya puedes publicar tus inmuebles y conectar con estudiantes.'
              : 'Ya puedes buscar opciones de arrendamiento cerca de la UPALM.'}
          </p>

          {/* Botón */}
          <button
            onClick={() => navigate('/usuarios/inicio-sesion')}
            style={styles.button('#534AB7', '#3C3489')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3C3489';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#534AB7';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Iniciar sesión
          </button>
        </div>
      </div>

      <FooterRegistro />
    </div>
  );
};

export default BienvenidaPage;