import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerDetallePropiedad } from '../../services/propiedadService'
import NavbarArrendatario from '../../components/common/NavbarArrendatario'
import FooterInicio from '../../components/common/FooterInicio'
import '../../styles/Arrendatario.css'

const RESENAS_POR_PAGINA = 5

const DetallePropiedad = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [propiedad, setPropiedad] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fotoActiva, setFotoActiva] = useState(0)
  const [filtroSentimiento, setFiltroSentimiento] = useState('todas')
  const [paginaActual, setPaginaActual] = useState(1)
  const [estaVerificado, setEstaVerificado] = useState(false)
  const [esRenovacion, setEsRenovacion] = useState(false)

  useEffect(() => {
    cargarPropiedad()
    verificarEstadoVerificacion()
  }, [id])

  useEffect(() => {
    setPaginaActual(1)
  }, [filtroSentimiento])

  const verificarEstadoVerificacion = async () => {
    const fechaVerificacion = localStorage.getItem('arrendatarioFechaVerificacion')

    if (fechaVerificacion && fechaVerificacion !== 'null' && fechaVerificacion !== 'undefined') {
      const ahora = new Date()
      const fechaVer = new Date(fechaVerificacion)
      const mesesTranscurridos = (ahora.getFullYear() - fechaVer.getFullYear()) * 12 + (ahora.getMonth() - fechaVer.getMonth())

      if (mesesTranscurridos >= 6) {
        setEstaVerificado(false)
        setEsRenovacion(true)
        return
      } else {
        setEstaVerificado(true)
        setEsRenovacion(false)
        localStorage.setItem('arrendatarioVerificado', 'true')
        return
      }
    }

    try {
      const userId = localStorage.getItem('userId')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/estado-verificacion`, {
        headers: { 'x-user-id': userId }
      })
      const data = await response.json()

      if (data.success) {
        if (data.fechaVerificacion) {
          localStorage.setItem('arrendatarioFechaVerificacion', data.fechaVerificacion)
          const ahora = new Date()
          const fechaVer = new Date(data.fechaVerificacion)
          const mesesTranscurridos = (ahora.getFullYear() - fechaVer.getFullYear()) * 12 + (ahora.getMonth() - fechaVer.getMonth())

          if (mesesTranscurridos >= 6) {
            setEstaVerificado(false)
            setEsRenovacion(true)
          } else {
            setEstaVerificado(true)
            setEsRenovacion(false)
            localStorage.setItem('arrendatarioVerificado', 'true')
          }
        } else {
          setEstaVerificado(false)
          setEsRenovacion(false)
          localStorage.setItem('arrendatarioVerificado', 'false')
        }
      }
    } catch (error) {
      console.error('Error al obtener estado:', error)
      setEstaVerificado(false)
      setEsRenovacion(false)
    }
  }

  const cargarPropiedad = async () => {
    try {
      setLoading(true)
      const response = await obtenerDetallePropiedad(id)
      if (response.success) {
        setPropiedad(response.data)
      }
    } catch (error) {
      setError('Error al cargar la propiedad')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const serviciosBasicos = propiedad?.servicios?.filter(s => s.servicioCategoria === 'Basico') || []
  const serviciosEntretenimiento = propiedad?.servicios?.filter(s => s.servicioCategoria === 'Entretenimiento') || []
  const serviciosAdicionales = propiedad?.servicios?.filter(s => s.servicioCategoria === 'Adicional') || []

  const obtenerResenasFiltradas = () => {
    if (!propiedad?.resenas) return []
    if (filtroSentimiento !== 'todas') {
      return propiedad.resenas.filter(r => r.sentimiento?.toLowerCase() === filtroSentimiento)
    }
    return propiedad.resenas
  }

  const resenasFiltradas = obtenerResenasFiltradas()
  const totalPaginas = Math.ceil(resenasFiltradas.length / RESENAS_POR_PAGINA)
  const inicio = (paginaActual - 1) * RESENAS_POR_PAGINA
  const resenasPaginadas = resenasFiltradas.slice(inicio, inicio + RESENAS_POR_PAGINA)

  const contarSentimientos = (sentimiento) => {
    if (!propiedad?.resenas) return 0
    return propiedad.resenas.filter(r => r.sentimiento?.toLowerCase() === sentimiento).length
  }

  const totalPositivas = contarSentimientos('positivo')
  const totalNeutras = contarSentimientos('neutral')
  const totalNegativas = contarSentimientos('negativo')

  if (loading) {
    return (
      <div className="atr-page">
        <NavbarArrendatario />
        <div className="atr-loading">Cargando propiedad...</div>
        <FooterInicio />
      </div>
    )
  }

  if (error || !propiedad) {
    return (
      <div className="atr-page">
        <NavbarArrendatario />
        <div className="atr-main">
          <div className="atr-alert atr-alert-error">
            <span className="atr-alert-icon">⚠️</span>
            <div>
              <p className="atr-alert-title">{error || 'Propiedad no encontrada'}</p>
            </div>
          </div>
          <button onClick={() => navigate('/arrendatario/buscar-vivienda')} className="atr-btn-ghost" style={{ width: 'auto' }}>
            ← Volver a resultados
          </button>
        </div>
        <FooterInicio />
      </div>
    )
  }

  const estatusBadgeClass =
    propiedad.estatus === 'Disponible' ? 'atr-badge atr-badge-success' :
    propiedad.estatus === 'Sin Disponibilidad' ? 'atr-badge atr-badge-warning' :
    'atr-badge' // fallback rojo inline si no hay clase

  return (
    <div className="atr-page">
      <NavbarArrendatario />

      <div className="atr-detail-container">
        {/* Botón volver */}
        <button
          onClick={() => navigate('/arrendatario/buscar-vivienda')}
          className="atr-btn-back"
        >
          ← Regresar
        </button>

        <div className="atr-detail-grid">
          {/* ── Columna principal ── */}
          <div className="atr-detail-main">

            {/* Galería de fotos */}
            <div className="atr-detail-gallery">
              {propiedad.fotos && propiedad.fotos.length > 0 ? (
                <>
                  <div className="atr-gallery-main">
                    <img
                      src={propiedad.fotos[fotoActiva].fotosURL}
                      alt={`Foto ${fotoActiva + 1}`}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentNode.innerHTML = '<div class="atr-gallery-placeholder">🏠</div>'
                      }}
                    />
                  </div>
                  {propiedad.fotos.length > 1 && (
                    <div className="atr-gallery-thumbs">
                      {propiedad.fotos.map((foto, index) => (
                        <img
                          key={foto.idFotos}
                          src={foto.fotosURL}
                          alt={`Miniatura ${index + 1}`}
                          onClick={() => setFotoActiva(index)}
                          className={`atr-gallery-thumb${index === fotoActiva ? ' active' : ''}`}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="atr-gallery-placeholder">🏠</div>
              )}
            </div>

            {/* Información principal */}
            <div className="atr-detail-card">
              <h1 className="atr-detail-title">{propiedad.titulo}</h1>

              <div className="atr-detail-badges">
                <span className="atr-badge atr-badge-primary">{propiedad.tipo}</span>
                <span
                  className="atr-badge"
                  style={{
                    backgroundColor:
                      propiedad.estatus === 'Disponible' ? '#16A34A' :
                      propiedad.estatus === 'Sin Disponibilidad' ? '#F59E0B' : '#DC2626',
                    color: 'white'
                  }}
                >
                  {propiedad.estatus}
                </span>
              </div>

              <div className="atr-detail-price-row">
                <div>
                  <div className="atr-detail-price">
                    ${Number(propiedad.precio).toLocaleString('es-MX')}
                    <span className="atr-detail-price-period">
                      {' '}/mes · por {propiedad.precioPor?.toLowerCase() || 'persona'}
                    </span>
                  </div>
                </div>
                <div className="atr-detail-meta">
                  <p style={{ margin: '0 0 4px' }}>👥 {propiedad.lugares} lugares disponibles</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#7a7899' }}>
                    📅 Publicado el {formatFecha(propiedad.fechaRegistro)}
                  </p>
                </div>
              </div>

              <div className="atr-detail-section">
                <h3>Descripción</h3>
                <p>{propiedad.descripcion}</p>
              </div>

              <hr className="atr-divider" />

              <div className="atr-detail-section">
                <h3>📍 Dirección</h3>
                <p>
                  {propiedad.direccion.calle} #{propiedad.direccion.numExt}
                  {propiedad.direccion.numInt && ` Int. ${propiedad.direccion.numInt}`}<br />
                  Col. {propiedad.direccion.colonia}<br />
                  {propiedad.direccion.municipio}, {propiedad.direccion.estado}<br />
                  C.P. {propiedad.direccion.cp}
                </p>
              </div>

              <hr className="atr-divider" />

              {/* Servicios por categoría */}
              <div className="atr-detail-section">
                <h3>Servicios incluidos</h3>

                {serviciosBasicos.length > 0 && (
                  <div className="atr-service-category">
                    <h4 style={{ color: '#1a237e' }}>🔌 Servicios Básicos</h4>
                    <div className="atr-service-tags">
                      {serviciosBasicos.map(s => (
                        <span key={s.idServicio} className="atr-service-tag basic">{s.servicioNombre}</span>
                      ))}
                    </div>
                  </div>
                )}

                {serviciosEntretenimiento.length > 0 && (
                  <div className="atr-service-category">
                    <h4 style={{ color: '#2e7d32' }}>🎮 Entretenimiento</h4>
                    <div className="atr-service-tags">
                      {serviciosEntretenimiento.map(s => (
                        <span key={s.idServicio} className="atr-service-tag entertainment">{s.servicioNombre}</span>
                      ))}
                    </div>
                  </div>
                )}

                {serviciosAdicionales.length > 0 && (
                  <div className="atr-service-category">
                    <h4 style={{ color: '#00838f' }}>✨ Servicios Adicionales</h4>
                    <div className="atr-service-tags">
                      {serviciosAdicionales.map(s => (
                        <span key={s.idServicio} className="atr-service-tag additional">{s.servicioNombre}</span>
                      ))}
                    </div>
                  </div>
                )}

                {propiedad.servicios.length === 0 && (
                  <p className="atr-text-muted">No hay servicios registrados</p>
                )}
              </div>
            </div>

            {/* Sección de Reseñas */}
            <div className="atr-reviews-card">
              <h2>Reseñas y Calificaciones</h2>

              {propiedad.calificaciones.totalResenas > 0 ? (
                <>
                  {/* Stats de calificaciones */}
                  <div className="atr-reviews-stats">
                    <div>
                      <div className="atr-review-stat-value">
                        {propiedad.calificaciones.promedioCalGen ? `${propiedad.calificaciones.promedioCalGen}/5` : 'N/A'}
                      </div>
                      <div className="atr-review-stat-label">⭐ General</div>
                    </div>

                    {serviciosBasicos.length > 0 && (
                      <div>
                        <div className="atr-review-stat-value">
                          {propiedad.calificaciones.promedioCalSerBasic === null
                            ? <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>✨ Nuevo</span>
                            : propiedad.calificaciones.promedioCalSerBasic > 0
                              ? `${propiedad.calificaciones.promedioCalSerBasic}/5`
                              : 'N/A'
                          }
                        </div>
                        <div className="atr-review-stat-label">🔌 Serv. Básicos</div>
                      </div>
                    )}

                    {serviciosEntretenimiento.length > 0 && (
                      <div>
                        <div className="atr-review-stat-value">
                          {propiedad.calificaciones.promedioCalSerComEnt === null
                            ? <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>✨ Nuevo</span>
                            : propiedad.calificaciones.promedioCalSerComEnt > 0
                              ? `${propiedad.calificaciones.promedioCalSerComEnt}/5`
                              : 'N/A'
                          }
                        </div>
                        <div className="atr-review-stat-label">🎮 Entretenimiento</div>
                      </div>
                    )}

                    {serviciosAdicionales.length > 0 && (
                      <div>
                        <div className="atr-review-stat-value">
                          {propiedad.calificaciones.promedioCalSerAdicio === null
                            ? <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>✨ Nuevo</span>
                            : propiedad.calificaciones.promedioCalSerAdicio > 0
                              ? `${propiedad.calificaciones.promedioCalSerAdicio}/5`
                              : 'N/A'
                          }
                        </div>
                        <div className="atr-review-stat-label">✨ Adicionales</div>
                      </div>
                    )}
                  </div>

                  <hr className="atr-divider" />

                  {/* Filtros de sentimiento */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {[
                      { key: 'todas', label: `📋 Todas (${propiedad.resenas.length})`, color: '#534AB7', bg: '#534AB7' },
                      { key: 'positivo', label: `😊 Positivas (${totalPositivas})`, color: '#2e7d32', bg: '#e8f5e9' },
                      { key: 'neutral', label: `😐 Neutras (${totalNeutras})`, color: '#e65100', bg: '#fff3e0' },
                      { key: 'negativo', label: `😞 Negativas (${totalNegativas})`, color: '#c62828', bg: '#ffebee' },
                    ].map(({ key, label, color, bg }) => (
                      <button
                        key={key}
                        onClick={() => setFiltroSentimiento(key)}
                        style={{
                          padding: '8px 16px',
                          border: `1px solid ${filtroSentimiento === key ? color : '#ddd'}`,
                          backgroundColor: filtroSentimiento === key ? (key === 'todas' ? color : bg) : 'white',
                          color: filtroSentimiento === key ? (key === 'todas' ? 'white' : color) : '#555',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: filtroSentimiento === key ? 'bold' : 'normal',
                          transition: 'all 0.15s'
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}

              {/* Lista de reseñas */}
              {propiedad.resenas && propiedad.resenas.length > 0 ? (
                <div className="atr-reviews-list">
                  {resenasPaginadas.length > 0 ? (
                    <>
                      {resenasPaginadas.map(resena => (
                        <div key={resena.id} className="atr-review-item">
                          <div className="atr-review-header">
                            <strong>{resena.autor?.nombre || 'Anónimo'}</strong>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                              <span
                                className="atr-review-sentiment"
                                style={{
                                  backgroundColor:
                                    resena.sentimiento?.toLowerCase() === 'positivo' ? '#e8f5e9' :
                                    resena.sentimiento?.toLowerCase() === 'negativo' ? '#ffebee' : '#fff3e0',
                                  color:
                                    resena.sentimiento?.toLowerCase() === 'positivo' ? '#2e7d32' :
                                    resena.sentimiento?.toLowerCase() === 'negativo' ? '#c62828' : '#e65100'
                                }}
                              >
                                {resena.sentimiento?.toLowerCase() === 'positivo' ? '😊 Positivo' :
                                 resena.sentimiento?.toLowerCase() === 'negativo' ? '😞 Negativo' : '😐 Neutro'}
                              </span>
                              <span style={{ color: '#999', fontSize: '12px' }}>{formatFecha(resena.fecha)}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span className="atr-review-stars">⭐ Calificación general {resena.calGen}/5</span>
                            {resena.duracionRenta && (
                              <span style={{
                                color: '#666',
                                fontSize: '12px',
                                backgroundColor: '#f5f5f5',
                                padding: '3px 8px',
                                borderRadius: '10px'
                              }}>
                                🕒 Tiempo de renta: {resena.duracionRenta} {resena.duracionRenta === 1 ? 'mes' : 'meses'}
                              </span>
                            )}
                          </div>

                          <p className="atr-review-text">{resena.descripcion}</p>
                        </div>
                      ))}

                      {/* Paginación */}
                      {totalPaginas > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => setPaginaActual(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            style={{
                              padding: '6px 12px',
                              border: '1px solid #ddd',
                              backgroundColor: 'white',
                              borderRadius: '5px',
                              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
                              fontSize: '13px',
                              opacity: paginaActual === 1 ? 0.5 : 1
                            }}
                          >
                            ← Anterior
                          </button>

                          {[...Array(totalPaginas)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPaginaActual(i + 1)}
                              style={{
                                padding: '6px 12px',
                                border: '1px solid',
                                borderColor: paginaActual === i + 1 ? '#534AB7' : '#ddd',
                                backgroundColor: paginaActual === i + 1 ? '#534AB7' : 'white',
                                color: paginaActual === i + 1 ? 'white' : '#555',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: paginaActual === i + 1 ? 'bold' : 'normal'
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}

                          <button
                            onClick={() => setPaginaActual(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                            style={{
                              padding: '6px 12px',
                              border: '1px solid #ddd',
                              backgroundColor: 'white',
                              borderRadius: '5px',
                              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
                              fontSize: '13px',
                              opacity: paginaActual === totalPaginas ? 0.5 : 1
                            }}
                          >
                            Siguiente →
                          </button>
                        </div>
                      )}

                      {resenasFiltradas.length > 0 && (
                        <p style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '10px' }}>
                          Mostrando {inicio + 1}–{Math.min(inicio + RESENAS_POR_PAGINA, resenasFiltradas.length)} de {resenasFiltradas.length} reseñas
                          {filtroSentimiento !== 'todas' && ` (filtradas por "${filtroSentimiento}")`}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="atr-reviews-empty">
                      No hay reseñas {filtroSentimiento !== 'todas' ? `de tipo "${filtroSentimiento}"` : ''} para mostrar
                    </p>
                  )}
                </div>
              ) : (
                <p className="atr-reviews-empty">No hay reseñas para mostrar</p>
              )}
            </div>
          </div>

          {/* ── Sidebar — Arrendador ── */}
          <div className="atr-detail-sidebar">
            <div className="atr-landlord-card">
              <h3>Arrendador</h3>

              <div className="atr-landlord-info">
                <div className="atr-landlord-avatar-lg">
                  {propiedad.arrendador.nombre.charAt(0)}
                </div>
                <div className="atr-landlord-name-lg">{propiedad.arrendador.nombre}</div>
              </div>

              <div className="atr-contact-info">
                <h4>📞 Contacto</h4>
                {estaVerificado ? (
                  <>
                    <div className="atr-contact-item">
                      <div className="atr-contact-label">Correo electrónico:</div>
                      <div className="atr-contact-value">{propiedad.arrendador.correo}</div>
                    </div>
                    <div className="atr-contact-item">
                      <div className="atr-contact-label">Teléfono:</div>
                      <div className="atr-contact-value">{propiedad.arrendador.telefono || 'No disponible'}</div>
                    </div>
                  </>
                ) : (
                  <div style={{ position: 'relative' }}>
                    {/* Datos con blur */}
                    <div style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
                      <div className="atr-contact-item">
                        <div className="atr-contact-label">Correo electrónico:</div>
                        <div className="atr-contact-value">arrendador@correo.com</div>
                      </div>
                      <div className="atr-contact-item">
                        <div className="atr-contact-label">Teléfono:</div>
                        <div className="atr-contact-value">55 1234 5678</div>
                      </div>
                    </div>

                    {/* Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      borderRadius: '6px',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '20px', marginBottom: '6px' }}>🔒</span>
                      <p style={{ fontSize: '11px', color: '#333', margin: '0 0 10px 0', lineHeight: '1.4', fontWeight: '600' }}>
                        {esRenovacion
                          ? 'Tu verificación expiró hace más de 6 meses. Renueva para ver los datos de contacto.'
                          : 'Verifica tu identidad para ver los datos de contacto'
                        }
                      </p>
                      <button
                        onClick={() => navigate(esRenovacion ? '/arrendatario/renovar-identidad' : '/arrendatario/verificar-identidad')}
                        style={{
                          padding: '7px 12px',
                          backgroundColor: esRenovacion ? '#e65100' : '#534AB7',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}
                      >
                        {esRenovacion ? '🔄 Renovar ahora' : '📤 Verificar ahora'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterInicio />
    </div>
  )
}

export default DetallePropiedad