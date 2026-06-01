import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NavbarInicio from '../../components/common/NavbarSimple'
import FooterRegistro from '../../components/common/FooterRegistro'
import { getTerminosUso } from '../../services/legalContent'

const PURPLE       = '#3b1a6e'
const PURPLE2      = '#6d28d9'
const PURPLE_LIGHT = '#f3eeff'
const PURPLE_BORDER = '#ddd6fe'

const s = {
  page: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' },
  main: { flex: 1, maxWidth: '820px', width: '100%', margin: '0 auto', padding: '2rem 1.5rem' },

  hero: {
    background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE2} 100%)`,
    borderRadius: '14px',
    padding: '2rem 2rem 1.75rem',
    marginBottom: '1.75rem',
    color: '#fff',
  },
  heroEtiqueta: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75, marginBottom: '0.4rem' },
  heroTitulo: { fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem' },
  heroSub: { fontSize: '0.875rem', opacity: 0.85, margin: 0 },

  selectorWrap: { display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' },
  tabBase: {
    flex: 1,
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: `2px solid ${PURPLE_BORDER}`,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#fff',
    color: '#6b7280',
  },
  tabActivo: {
    backgroundColor: PURPLE_LIGHT,
    borderColor: PURPLE2,
    color: PURPLE,
    boxShadow: `0 0 0 3px ${PURPLE_BORDER}`,
  },

  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: PURPLE_LIGHT,
    color: PURPLE2,
    border: `1px solid ${PURPLE_BORDER}`,
    borderRadius: '999px',
    padding: '0.3rem 0.9rem',
    fontSize: '0.78rem',
    fontWeight: 700,
    marginBottom: '1.25rem',
  },

  cardRol: {
    backgroundColor: PURPLE_LIGHT,
    border: `1.5px solid ${PURPLE_BORDER}`,
    borderLeft: `4px solid ${PURPLE2}`,
    borderRadius: '10px',
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem',
  },
  cardRolEtiqueta: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: PURPLE2, marginBottom: '0.4rem' },
  cardRolTitulo: { fontSize: '0.9rem', fontWeight: 700, color: PURPLE, marginBottom: '0.6rem' },
  cardRolTexto: { fontSize: '0.855rem', color: '#4b5563', lineHeight: 1.75, whiteSpace: 'pre-line', margin: 0 },

  card: { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.75rem 2rem', marginBottom: '1rem' },
  seccion: { marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' },
  seccionUltima: { marginBottom: 0, paddingBottom: 0, borderBottom: 'none' },
  seccionTitulo: { fontSize: '0.875rem', fontWeight: 700, color: PURPLE, marginBottom: '0.5rem' },
  seccionTexto: { fontSize: '0.855rem', color: '#4b5563', lineHeight: 1.75, whiteSpace: 'pre-line', margin: 0 },

  fechaActualizacion: { fontSize: '0.78rem', color: '#9ca3af', marginTop: '1.5rem', textAlign: 'right' },
}

const TerminosUsoPage = () => {
  const [searchParams] = useSearchParams()
  const rolInicial = searchParams.get('rol') === 'arrendador' ? 'arrendador' : 'estudiante'
  const [rol, setRol] = useState(rolInicial)

  const doc = getTerminosUso(rol)

  // La sección específica del rol es índice 1 (después del splice en getTerminosUso)
  const seccionRol = doc.contenido[1]
  const seccionesComunes = doc.contenido.filter((_, i) => i !== 1)

  return (
    <div style={s.page}>
      <NavbarInicio />
      <main style={s.main}>

        {/* Hero */}
        <div style={s.hero}>
          <p style={s.heroEtiqueta}>RentIPN — Documento Legal</p>
          <h1 style={s.heroTitulo}>Términos y Condiciones de Uso</h1>
          <p style={s.heroSub}>Consulta las condiciones de uso del sistema según tu rol en la plataforma.</p>
        </div>

        {/* Selector de rol */}
        <div style={s.selectorWrap}>
          <button
            style={{ ...s.tabBase, ...(rol === 'estudiante' ? s.tabActivo : {}) }}
            onClick={() => setRol('estudiante')}
          >
            🎓 Soy Estudiante IPN
          </button>
          <button
            style={{ ...s.tabBase, ...(rol === 'arrendador' ? s.tabActivo : {}) }}
            onClick={() => setRol('arrendador')}
          >
            🏠 Soy Arrendador
          </button>
        </div>

        {/* Badge */}
        <div style={s.badge}>
          {rol === 'estudiante' ? '🎓 Mostrando versión para Estudiantes IPN' : '🏠 Mostrando versión para Arrendadores'}
        </div>

        {/* Sección específica del rol — destacada */}
        <div style={s.cardRol}>
          <p style={s.cardRolEtiqueta}>📌 Exclusivo para {rol === 'estudiante' ? 'Estudiantes' : 'Arrendadores'}</p>
          <div style={s.cardRolTitulo}>{seccionRol.subtitulo}</div>
          <p style={s.cardRolTexto}>{seccionRol.texto}</p>
        </div>

        {/* Secciones comunes */}
        <div style={s.card}>
          {seccionesComunes.map((seccion, i) => (
            <div key={i} style={i === seccionesComunes.length - 1 ? s.seccionUltima : s.seccion}>
              <div style={s.seccionTitulo}>{seccion.subtitulo}</div>
              <p style={s.seccionTexto}>{seccion.texto}</p>
            </div>
          ))}
        </div>

        <p style={s.fechaActualizacion}>Última actualización: mayo 2026</p>
      </main>
      <FooterRegistro />
    </div>
  )
}

export default TerminosUsoPage