import React, { useEffect } from 'react'
import { getAvisoPrivacidad, getTerminosUso } from '../../services/legalContent'

const PURPLE       = '#3b1a6e'
const PURPLE2      = '#6d28d9'
const PURPLE_LIGHT = '#f3eeff'
const PURPLE_BORDER = '#ddd6fe'

const estilos = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem', backdropFilter: 'blur(2px)',
  },
  modal: {
    backgroundColor: '#fff', borderRadius: '12px', maxWidth: '680px', width: '100%',
    maxHeight: '82vh', display: 'flex', flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
  },
  header: {
    padding: '0',
    borderBottom: `1px solid ${PURPLE_BORDER}`,
    flexShrink: 0,
    background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE2} 100%)`,
  },
  headerInner: {
    padding: '1.1rem 1.5rem',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
  },
  headerTexto: { flex: 1 },
  headerEtiqueta: {
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.2rem',
  },
  titulo: { margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff' },
  badgeRol: {
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '999px', padding: '0.2rem 0.6rem',
    fontSize: '0.72rem', fontWeight: 600, marginTop: '0.4rem',
  },
  cerrar: {
    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
    fontSize: '1rem', cursor: 'pointer', color: '#fff',
    lineHeight: 1, padding: '0.3rem 0.5rem', borderRadius: '6px', flexShrink: 0,
  },
  cuerpo: { overflowY: 'auto', padding: '1.25rem 1.5rem', flex: 1 },

  // Sección específica del rol
  cardRol: {
    backgroundColor: PURPLE_LIGHT,
    border: `1.5px solid ${PURPLE_BORDER}`,
    borderLeft: `4px solid ${PURPLE2}`,
    borderRadius: '8px',
    padding: '0.9rem 1rem',
    marginBottom: '1rem',
  },
  cardRolEtiqueta: {
    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: PURPLE2, marginBottom: '0.3rem',
  },
  cardRolTitulo: { fontSize: '0.82rem', fontWeight: 700, color: PURPLE, marginBottom: '0.4rem' },
  cardRolTexto: { fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.65, whiteSpace: 'pre-line', margin: 0 },

  divider: { borderTop: `1px solid #f3f4f6`, margin: '0.75rem 0' },
  seccion: { marginBottom: '1rem' },
  subtitulo: { fontSize: '0.8rem', fontWeight: 700, color: PURPLE, marginBottom: '0.3rem' },
  parrafo: { fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.65, whiteSpace: 'pre-line', margin: 0 },

  footer: {
    padding: '0.9rem 1.5rem', borderTop: `1px solid ${PURPLE_BORDER}`,
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0,
    backgroundColor: '#fafafa',
  },
  btnCerrar: {
    backgroundColor: PURPLE2, color: '#fff', border: 'none',
    padding: '0.5rem 1.4rem', borderRadius: '8px',
    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
  },
}

/**
 * LegalModal — muestra Aviso de Privacidad o Términos y Condiciones.
 * Props:
 *   tipo     → 'privacidad' | 'terminos'
 *   rol      → 'estudiante' | 'arrendador'  (default: 'estudiante')
 *   onCerrar → función para cerrar el modal
 */
const LegalModal = ({ tipo, rol = 'estudiante', onCerrar }) => {
  const doc = tipo === 'privacidad'
    ? getAvisoPrivacidad(rol)
    : getTerminosUso(rol)

  // Índice de la sección específica del rol según el helper
  const idxRol = tipo === 'privacidad' ? 2 : 1
  const seccionRol     = doc.contenido[idxRol]
  const seccionesComunes = doc.contenido.filter((_, i) => i !== idxRol)

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCerrar])

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div style={estilos.overlay} onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}>
      <div style={estilos.modal} role="dialog" aria-modal="true" aria-labelledby="modal-titulo">

        {/* Cabecera morada */}
        <div style={estilos.header}>
          <div style={estilos.headerInner}>
            <div style={estilos.headerTexto}>
              <p style={estilos.headerEtiqueta}>RentIPN — Documento Legal</p>
              <h2 id="modal-titulo" style={estilos.titulo}>{doc.titulo}</h2>
              <span style={estilos.badgeRol}>
                {rol === 'estudiante' ? '🎓 Versión Estudiante IPN' : '🏠 Versión Arrendador'}
              </span>
            </div>
            <button style={estilos.cerrar} onClick={onCerrar} aria-label="Cerrar">✕</button>
          </div>
        </div>

        {/* Contenido */}
        <div style={estilos.cuerpo}>

          {/* Sección exclusiva del rol — destacada arriba */}
          <div style={estilos.cardRol}>
            <p style={estilos.cardRolEtiqueta}>📌 Exclusivo para {rol === 'estudiante' ? 'Estudiantes' : 'Arrendadores'}</p>
            <div style={estilos.cardRolTitulo}>{seccionRol.subtitulo}</div>
            <p style={estilos.cardRolTexto}>{seccionRol.texto}</p>
          </div>

          <div style={estilos.divider} />

          {/* Secciones comunes */}
          {seccionesComunes.map((seccion, i) => (
            <div key={i} style={estilos.seccion}>
              <div style={estilos.subtitulo}>{seccion.subtitulo}</div>
              <p style={estilos.parrafo}>{seccion.texto}</p>
            </div>
          ))}
        </div>

        {/* Pie */}
        <div style={estilos.footer}>
          <button style={estilos.btnCerrar} onClick={onCerrar}>Entendido</button>
        </div>

      </div>
    </div>
  )
}

export default LegalModal