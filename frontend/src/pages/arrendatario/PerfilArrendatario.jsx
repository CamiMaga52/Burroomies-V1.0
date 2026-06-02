import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarArrendatario from '../../components/common/NavbarArrendatario'
import FooterInicio from '../../components/common/FooterInicio'
import api from '../../services/api'

const PerfilArrendatario = () => {
  const navigate = useNavigate()
  
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [mensajeExito, setMensajeExito] = useState('')
  
  // Campos editables
  const [nombres, setNombres] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefono, setTelefono] = useState('')
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameDisponible, setUsernameDisponible] = useState(true)
  const [usernameVerificando, setUsernameVerificando] = useState(false)

  // Errores por campo
  const [errors, setErrors] = useState({})

  // Estado para modales
  const [modal, setModal] = useState({ isOpen: false, type: '', message: '', title: '' })

  // Ref para debounce del username
  const debounceTimer = useRef(null)

  useEffect(() => {
    cargarPerfil()
  }, [])

  const mostrarModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message })
  }

  const cerrarModal = () => {
    setModal({ isOpen: false, type: '', message: '', title: '' })
  }

  const cargarPerfil = async () => {
    try {
      setLoading(true)
      const userId = localStorage.getItem('userId')
      const arrendatarioId = localStorage.getItem('arrendatarioId')
      
      if (!userId || !arrendatarioId) {
        setError('No has iniciado sesión')
        setLoading(false)
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/perfil-arrendatario`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
          'x-arrendatario-id': arrendatarioId
        }
      })

      if (!response.ok) throw new Error('Error al cargar perfil')

      const data = await response.json()
      setPerfil(data)
      
      setNombres(data.usuario?.usuarioNom || '')
      setApellidoPaterno(data.usuario?.usuarioApePat || '')
      setApellidoMaterno(data.usuario?.usuarioApeMat || '')
      setTelefono(data.usuario?.usuarioTel || '')
      setUsername(data.arrendatarioUser || '')
      
    } catch (error) {
      setError('No se pudo cargar tu perfil')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const verificarUsername = async (usernameNuevo) => {
    if (usernameNuevo === perfil?.arrendatarioUser) {
      setUsernameDisponible(true)
      setUsernameError('')
      setUsernameVerificando(false)
      return
    }
    
    // Validación de formato antes de llamar al backend
    if (usernameNuevo.length < 3) {
      setUsernameDisponible(false)
      setUsernameError('Mínimo 3 caracteres')
      setUsernameVerificando(false)
      return
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(usernameNuevo)) {
      setUsernameDisponible(false)
      setUsernameError('Solo letras, números y guión bajo')
      setUsernameVerificando(false)
      return
    }
    
    setUsernameVerificando(true)
    setUsernameError('')
    
    try {
      const response = await api.post('/auth/validar-campo', {
        campo: 'username',
        valor: usernameNuevo
      })
      
      if (response.data.existe) {
        setUsernameDisponible(false)
        setUsernameError('Este username ya está en uso')
      } else {
        setUsernameDisponible(true)
        setUsernameError('')
      }
    } catch (error) {
      console.error('Error al verificar username:', error)
      setUsernameError('Error al verificar disponibilidad')
      setUsernameDisponible(false)
    } finally {
      setUsernameVerificando(false)
    }
  }

  const handleUsernameChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase().slice(0, 20)
    setUsername(valor)
    
    // Limpiar error del campo
    if (errors.username) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.username
        return newErrors
      })
    }
    
    // Debounce para verificar (evita llamadas mientras escribe)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    
    if (valor === perfil?.arrendatarioUser) {
      setUsernameDisponible(true)
      setUsernameError('')
      setUsernameVerificando(false)
      return
    }
    
    if (valor.length < 3) {
      setUsernameDisponible(false)
      setUsernameError('Mínimo 3 caracteres')
      setUsernameVerificando(false)
      return
    }
    
    setUsernameVerificando(true)
    debounceTimer.current = setTimeout(() => {
      verificarUsername(valor)
    }, 600)
  }

  // Funciones de restricción para cada campo
  const handleNombresChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 60)
    setNombres(valor)
    if (errors.nombres) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.nombres
      return newErrors
    })
  }

  const handleApellidoPaternoChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 35)
    setApellidoPaterno(valor)
    if (errors.apellidoPaterno) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.apellidoPaterno
      return newErrors
    })
  }

  const handleApellidoMaternoChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 35)
    setApellidoMaterno(valor)
    if (errors.apellidoMaterno) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.apellidoMaterno
      return newErrors
    })
  }

  const handleTelefonoChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    setTelefono(valor)
    if (errors.telefono) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.telefono
      return newErrors
    })
  }

  const validarFormulario = () => {
    const errs = {}
    const nom = nombres.trim()
    const ape = apellidoPaterno.trim()
    const apeMat = apellidoMaterno.trim()
    const tel = telefono.trim()
    const usr = username.trim()

    if (!nom || nom.length < 2) {
      errs.nombres = !nom ? 'Los nombres son obligatorios' : 'Mínimo 2 caracteres'
    }
    
    if (!ape || ape.length < 2) {
      errs.apellidoPaterno = !ape ? 'El apellido paterno es obligatorio' : 'Mínimo 2 caracteres'
    }
    
    if (apeMat && apeMat.length < 2) {
      errs.apellidoMaterno = 'Mínimo 2 caracteres'
    }
    
    if (!tel) {
      errs.telefono = 'El teléfono es obligatorio'
    } else if (tel.length !== 10) {
      errs.telefono = 'Debe tener exactamente 10 dígitos'
    }
    
    if (!usr || usr.length < 3) {
      errs.username = !usr ? 'El nombre de usuario es obligatorio' : 'Mínimo 3 caracteres'
    }
    
    if (!usernameDisponible && usr !== perfil?.arrendatarioUser) {
      errs.username = usernameError || 'Nombre de usuario no disponible'
    }
    
    return errs
  }

  // ─── Función helper para verificar si el formulario es válido ──────────
  const esFormularioValido = () => {
    const nom = nombres.trim()
    const ape = apellidoPaterno.trim()
    const tel = telefono.trim()
    const usr = username.trim()
    
    return (
      nom.length >= 2 &&
      ape.length >= 2 &&
      tel.length === 10 &&
      usr.length >= 3 &&
      (usernameDisponible || usr === perfil?.arrendatarioUser) &&
      !usernameVerificando
    )
  }

  const handleGuardar = async () => {
    const errs = validarFormulario()
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll al primer error
      setTimeout(() => {
        const primerError = document.querySelector('.perfil-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    try {
      setGuardando(true)
      const userId = localStorage.getItem('userId')
      const arrendatarioId = localStorage.getItem('arrendatarioId')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/actualizar-perfil-arrendatario`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
          'x-arrendatario-id': arrendatarioId
        },
        body: JSON.stringify({
          usuarioNom: nombres.trim(),
          usuarioApePat: apellidoPaterno.trim(),
          usuarioApeMat: apellidoMaterno.trim(),
          usuarioTel: telefono.trim(),
          arrendatarioUser: username.trim()
        })
      })

      if (!response.ok) throw new Error('Error al guardar')

      const data = await response.json()
      setPerfil(data.perfil)
      setEditando(false)
      setErrors({})
      setMensajeExito('Perfil actualizado exitosamente')
      
      setTimeout(() => setMensajeExito(''), 3000)
    } catch (error) {
      mostrarModal('error', 'Error', 'Error al guardar los cambios')
      console.error('Error:', error)
    } finally {
      setGuardando(false)
    }
  }

  const handleCancelar = () => {
    setNombres(perfil?.usuario?.usuarioNom || '')
    setApellidoPaterno(perfil?.usuario?.usuarioApePat || '')
    setApellidoMaterno(perfil?.usuario?.usuarioApeMat || '')
    setTelefono(perfil?.usuario?.usuarioTel || '')
    setUsername(perfil?.arrendatarioUser || '')
    setUsernameError('')
    setUsernameDisponible(true)
    setUsernameVerificando(false)
    setErrors({})
    setEditando(false)
  }

  const handleEliminarCuenta = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const arrendatarioId = localStorage.getItem('arrendatarioId')

      if (!userId || !arrendatarioId) {
        mostrarModal('error', 'Error', 'No has iniciado sesión')
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/eliminar-cuenta-arrendatario`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
          'x-arrendatario-id': arrendatarioId
        }
      })

      const data = await response.json()

      if (response.ok) {
        mostrarModal('success', 'Cuenta eliminada', data.message || 'Cuenta eliminada exitosamente')
        setTimeout(() => {
          localStorage.clear()
          navigate('/')
        }, 2000)
      } else {
        mostrarModal('error', 'Error', data.error || 'Error al eliminar la cuenta')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarModal('error', 'Error', 'Error al eliminar la cuenta')
    }
  }

  const confirmarEliminarCuenta = () => {
    mostrarModal('confirm', '⚠️ Eliminar Cuenta', '¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer. Tus datos personales serán eliminados, pero tus reseñas se conservarán de forma anónima.')
  }

  const usuario = perfil?.usuario || {}
  const carrera = perfil?.carrera || {}

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavbarArrendatario />
        <div style={{ flex: 1, textAlign: 'center', padding: '60px' }}>
          <p style={{ color: '#666' }}>Cargando perfil...</p>
        </div>
        <FooterInicio />
      </div>
    )
  }

  // ─── Determinar si el botón debe estar deshabilitado ──────────────────
  const botonDeshabilitado = guardando || !esFormularioValido()

  return (
  <div className="atr-page">
    <NavbarArrendatario />
    <div className="atr-main">
      <h1 className="atr-page-title">👤 Mi Perfil</h1>

        {/* Mensaje de éxito */}
        {mensajeExito && (
          <div style={{
            padding: '15px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ✅ {mensajeExito}
          </div>
        )}

        {error ? (
          <div style={{
            padding: '20px',
            backgroundColor: '#ffe6e6',
            color: '#dc3545',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        ) : perfil ? (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '30px'
          }}>
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#1a237e',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold'
              }}>
                {usuario.usuarioNom?.charAt(0) || '?'}
              </div>
              <h2 style={{ marginTop: '15px', color: '#333' }}>
                {usuario.usuarioNom} {usuario.usuarioApePat} {usuario.usuarioApeMat || ''}
              </h2>
              <p style={{ color: '#666', margin: '5px 0' }}>@{perfil.arrendatarioUser}</p>
            </div>

            {/* Datos */}
            {!editando ? (
              <>
                <div style={infoSectionStyle}>
                  <h3 style={sectionTitleStyle}>📋 Información Personal</h3>
                  
                  <InfoRow label="Nombre" value={usuario.usuarioNom} />
                  <InfoRow label="Apellido Paterno" value={usuario.usuarioApePat} />
                  <InfoRow label="Apellido Materno" value={usuario.usuarioApeMat || '—'} />
                  <InfoRow label="Correo electrónico" value={usuario.usuarioCorreo} bloqueado />
                  <InfoRow label="Teléfono" value={usuario.usuarioTel || '—'} />
                  <InfoRow label="CURP" value={usuario.usuarioCurp} bloqueado />
                  <InfoRow label="Fecha de Nacimiento" value={usuario.usuarioFechaNac ? new Date(usuario.usuarioFechaNac).toLocaleDateString('es-MX') : '—'} bloqueado />
                </div>

                <div style={infoSectionStyle}>
                  <h3 style={sectionTitleStyle}>🎓 Información Académica</h3>
                  
                  <InfoRow label="Boleta" value={perfil.arrendatarioBoleta} bloqueado />
                  <InfoRow label="Nombre de usuario" value={`@${perfil.arrendatarioUser}`} />
                  <InfoRow label="Carrera" value={carrera.carreraNombre || '—'} />
                </div>

                <button 
                  onClick={() => setEditando(true)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a237e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    marginTop: '20px'
                  }}
                >
                  ✏️ Editar Perfil
                </button>

                {/* BOTÓN ELIMINAR CUENTA */}
                <div style={{ marginTop: '15px', borderTop: '1px solid #e0e0e0', paddingTop: '15px' }}>
                  <button 
                    onClick={confirmarEliminarCuenta}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    🗑️ Eliminar Cuenta
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={infoSectionStyle}>
                  <h3 style={sectionTitleStyle}>✏️ Editar Información</h3>
                  
                  <InputField 
                    label="Nombres" 
                    value={nombres} 
                    onChange={handleNombresChange} 
                    maxLength={60}
                    placeholder="Ej: Juan Carlos"
                    hint="Solo letras y espacios. Mínimo 2 caracteres"
                    error={errors.nombres}
                  />
                  
                  <InputField 
                    label="Apellido Paterno" 
                    value={apellidoPaterno} 
                    onChange={handleApellidoPaternoChange} 
                    maxLength={35}
                    placeholder="Ej: Hernández"
                    hint="Solo letras. Mínimo 2 caracteres"
                    error={errors.apellidoPaterno}
                  />
                  
                  <InputField 
                    label="Apellido Materno (opcional)" 
                    value={apellidoMaterno} 
                    onChange={handleApellidoMaternoChange} 
                    maxLength={35}
                    placeholder="Ej: López"
                    hint="Opcional. Solo letras"
                    error={errors.apellidoMaterno}
                  />
                  
                  <InputField 
                    label="Teléfono" 
                    value={telefono} 
                    onChange={handleTelefonoChange} 
                    type="tel" 
                    maxLength={10}
                    placeholder="Ej: 5512345678"
                    hint="10 dígitos, solo números"
                    error={errors.telefono}
                  />
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={labelStyle}>
                      Nombre de usuario *
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      maxLength={20}
                      placeholder="Ej: juan_perez"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: (errors.username || usernameError) ? '2px solid #dc3545' : 
                                username === perfil?.arrendatarioUser ? '1px solid #ddd' :
                                usernameDisponible && !usernameVerificando ? '2px solid #28a745' : '1px solid #ddd',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ marginTop: '4px' }}>
                      {usernameVerificando && <small style={{ color: '#6b7280' }}>⏳ Verificando disponibilidad...</small>}
                      {(errors.username || usernameError) && <small className="perfil-error" style={{ color: '#dc3545', display: 'block' }}>{errors.username || usernameError}</small>}
                      {!errors.username && !usernameError && !usernameVerificando && username !== perfil?.arrendatarioUser && usernameDisponible && username.length >= 3 && (
                        <small style={{ color: '#28a745', display: 'block' }}>✓ Disponible</small>
                      )}
                      {!errors.username && !usernameError && !usernameVerificando && (
                        <small style={{ color: '#6b7280', display: 'block' }}>3-20 caracteres. Solo letras, números y guión bajo</small>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <p style={{ fontWeight: 'bold', color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                      🔒 Información no editable:
                    </p>
                    <InfoRow label="Correo electrónico" value={usuario.usuarioCorreo} bloqueado />
                    <InfoRow label="CURP" value={usuario.usuarioCurp} bloqueado />
                    <InfoRow label="Boleta" value={perfil.arrendatarioBoleta} bloqueado />
                    <InfoRow label="Fecha de Nacimiento" value={usuario.usuarioFechaNac ? new Date(usuario.usuarioFechaNac).toLocaleDateString('es-MX') : '—'} bloqueado />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button 
                    onClick={handleCancelar}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleGuardar}
                    disabled={botonDeshabilitado}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: botonDeshabilitado ? '#ccc' : '#1a237e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: botonDeshabilitado ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    {guardando ? 'Guardando...' : '💾 Guardar Cambios'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>

      {/* ===== MODAL PERSONALIZADO ===== */}
      {modal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '450px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            {/* Icono según tipo */}
            <p style={{ fontSize: '40px', marginBottom: '15px' }}>
              {modal.type === 'confirm' ? '⚠️' : modal.type === 'success' ? '✅' : '❌'}
            </p>
            
            {/* Título */}
            <h3 style={{ 
              marginBottom: '15px', 
              color: modal.type === 'confirm' ? '#e65100' : modal.type === 'success' ? '#28a745' : '#dc3545',
              fontSize: '18px'
            }}>
              {modal.title}
            </h3>
            
            {/* Mensaje */}
            <p style={{ 
              color: '#555', 
              fontSize: '14px', 
              marginBottom: '25px', 
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}>
              {modal.message}
            </p>
            
            {/* Botones */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {modal.type === 'confirm' ? (
                <>
                  <button 
                    onClick={cerrarModal}
                    style={{
                      padding: '10px 25px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      cerrarModal()
                      handleEliminarCuenta()
                    }}
                    style={{
                      padding: '10px 25px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    Sí, eliminar
                  </button>
                </>
              ) : (
                <button 
                  onClick={cerrarModal}
                  style={{
                    padding: '10px 25px',
                    backgroundColor: '#1a237e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Entendido
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <FooterInicio />
    </div>
  )
}

// Componentes auxiliares
const InfoRow = ({ label, value, bloqueado }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '14px'
  }}>
    <span style={{ color: '#666' }}>{label}</span>
    <span style={{ 
      color: bloqueado ? '#999' : '#333',
      fontWeight: '500'
    }}>
      {bloqueado ? '🔒 ' : ''}{value}
    </span>
  </div>
)

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '5px',
  fontSize: '14px',
  color: '#333'
}

const InputField = ({ label, value, onChange, type = 'text', maxLength, placeholder, hint, error }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={labelStyle}>
      {label} {label.includes('(opcional)') ? '' : '*'}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: error ? '2px solid #dc3545' : '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box'
      }}
    />
    {error && <small className="perfil-error" style={{ color: '#dc3545', display: 'block', marginTop: '4px' }}>{error}</small>}
    {!error && hint && <small style={{ color: '#6b7280', display: 'block', marginTop: '4px' }}>{hint}</small>}
  </div>
)

const infoSectionStyle = {
  marginBottom: '25px',
  paddingBottom: '15px',
  borderBottom: '1px solid #e0e0e0'
}

const sectionTitleStyle = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '15px'
}

export default PerfilArrendatario