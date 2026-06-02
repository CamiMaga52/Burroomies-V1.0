import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarArrendador from '../../components/common/NavbarArrendador'
import FooterInicio from '../../components/common/FooterInicio'
import { getPerfilArrendador, actualizarPerfilArrendador } from '../../services/authService'
import { buscarCP } from '../../services/cpService'

const PerfilArrendador = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [buscandoCP, setBuscandoCP] = useState(false)

  // Errores por campo
  const [errors, setErrors] = useState({})

  // Estado para modales
  const [modal, setModal] = useState({ isOpen: false, type: '', message: '', title: '' })

  const [perfil, setPerfil] = useState({
    usuario: {
      usuarioNom: '',
      usuarioApePat: '',
      usuarioApeMat: '',
      usuarioCorreo: '',
      usuarioTel: '',
      usuarioCurp: '',
      usuarioFechaNac: ''
    },
    arrendadorRFC: '',
    direccion: {
      direccionCalle: '',
      direccionNumExt: '',
      direccionNumInt: '',
      cp: {
        d_codigo: '',
        d_asenta: '',
        D_mnpio: '',
        d_estado: ''
      }
    }
  })

  // Campos editables
  const [nombres, setNombres] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefono, setTelefono] = useState('')
  const [calle, setCalle] = useState('')
  const [numExt, setNumExt] = useState('')
  const [numInt, setNumInt] = useState('')
  const [cp, setCP] = useState('')
  const [colonia, setColonia] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [estado, setEstado] = useState('')

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
      if (!userId) {
        navigate('/usuarios/inicio-sesion')
        return
      }
      const data = await getPerfilArrendador(userId)
      setPerfil(data)
      
      // Llenar campos
      setNombres(data.usuario?.usuarioNom || '')
      setApellidoPaterno(data.usuario?.usuarioApePat || '')
      setApellidoMaterno(data.usuario?.usuarioApeMat || '')
      setTelefono(data.usuario?.usuarioTel || '')
      setCalle(data.direccion?.direccionCalle || '')
      setNumExt(data.direccion?.direccionNumExt || '')
      setNumInt(data.direccion?.direccionNumInt || '')
      setCP(data.direccion?.cp?.d_codigo || '')
      setColonia(data.direccion?.cp?.d_asenta || '')
      setMunicipio(data.direccion?.cp?.D_mnpio || '')
      setEstado(data.direccion?.cp?.d_estado || '')
      
    } catch (err) {
      setError('Error al cargar perfil')
    } finally {
      setLoading(false)
    }
  }

  // ── Handlers con restricciones ──────────────────────────────────────────
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

  const handleCalleChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]/g, '').slice(0, 100)
    setCalle(valor)
    if (errors.calle) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.calle
      return newErrors
    })
  }

  const handleNumExtChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    setNumExt(valor)
    if (errors.numExt) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.numExt
      return newErrors
    })
  }

  const handleNumIntChange = (e) => {
    const valor = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    setNumInt(valor)
  }

  const handleCPChange = async (e) => {
    const valorCP = e.target.value.replace(/\D/g, '').slice(0, 5)
    setCP(valorCP)
    
    // Limpiar errores de CP
    if (errors.cp) setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.cp
      return newErrors
    })
    
    if (valorCP.length === 5) {
      setBuscandoCP(true)
      try {
        const resultados = await buscarCP(valorCP)
        if (resultados && resultados.length > 0) {
          setColonia(resultados[0].d_asenta || '')
          setMunicipio(resultados[0].D_mnpio || '')
          setEstado(resultados[0].d_estado || '')
        } else {
          setColonia('')
          setMunicipio('')
          setEstado('')
        }
      } catch (err) {
        setColonia('')
        setMunicipio('')
        setEstado('')
      } finally {
        setBuscandoCP(false)
      }
    } else {
      setColonia('')
      setMunicipio('')
      setEstado('')
    }
  }

  // ── Validación ──────────────────────────────────────────────────────────
  const validarFormulario = () => {
    const errs = {}
    const nom = nombres.trim()
    const ape = apellidoPaterno.trim()
    const apeMat = apellidoMaterno.trim()
    const tel = telefono.trim()
    const cal = calle.trim()
    const ext = numExt.trim()
    const cpv = cp.trim()

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
    
    if (!cal || cal.length < 3) {
      errs.calle = !cal ? 'La calle es obligatoria' : 'Mínimo 3 caracteres'
    }
    
    if (!ext) {
      errs.numExt = 'El número exterior es obligatorio'
    }
    
    if (!cpv || cpv.length !== 5) {
      errs.cp = !cpv ? 'El código postal es obligatorio' : 'Debe tener 5 dígitos'
    }
    
    return errs
  }

  const handleGuardar = async () => {
    const errs = validarFormulario()
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setError('')
      // Scroll al primer error
      setTimeout(() => {
        const primerError = document.querySelector('.perfil-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    setGuardando(true)
    setError('')
    setMensajeExito('')
    setErrors({})

    try {
      const userId = localStorage.getItem('userId')
      const datos = {
        usuarioNom: nombres.trim(),
        usuarioApePat: apellidoPaterno.trim(),
        usuarioApeMat: apellidoMaterno.trim(),
        usuarioTel: telefono.trim(),
        direccionCalle: calle.trim(),
        direccionNumExt: numExt.trim(),
        direccionNumInt: numInt.trim(),
        cp: cp.trim()
      }

      await actualizarPerfilArrendador(userId, datos)
      
      // Recargar perfil
      const dataActualizada = await getPerfilArrendador(userId)
      setPerfil(dataActualizada)
      
      setMensajeExito('Perfil actualizado exitosamente')
      setEditando(false)
      setTimeout(() => setMensajeExito(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar perfil')
    } finally {
      setGuardando(false)
    }
  }

  const handleCancelar = () => {
    setNombres(perfil.usuario?.usuarioNom || '')
    setApellidoPaterno(perfil.usuario?.usuarioApePat || '')
    setApellidoMaterno(perfil.usuario?.usuarioApeMat || '')
    setTelefono(perfil.usuario?.usuarioTel || '')
    setCalle(perfil.direccion?.direccionCalle || '')
    setNumExt(perfil.direccion?.direccionNumExt || '')
    setNumInt(perfil.direccion?.direccionNumInt || '')
    setCP(perfil.direccion?.cp?.d_codigo || '')
    setColonia(perfil.direccion?.cp?.d_asenta || '')
    setMunicipio(perfil.direccion?.cp?.D_mnpio || '')
    setEstado(perfil.direccion?.cp?.d_estado || '')
    setErrors({})
    setError('')
    setEditando(false)
  }

  const handleEliminarCuenta = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const arrendadorId = localStorage.getItem('arrendadorId')

      if (!userId || !arrendadorId) {
        mostrarModal('error', 'Error', 'No has iniciado sesión')
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/eliminar-cuenta-arrendador`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
          'x-arrendador-id': arrendadorId
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
    mostrarModal('confirm', '⚠️ Eliminar Cuenta', '¿Estás seguro de eliminar tu cuenta?\n\nEsta acción no se puede deshacer. Se eliminarán tus propiedades, arrendamientos y datos personales.')
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavbarArrendador />
        <div style={{ flex: 1, textAlign: 'center', padding: '60px' }}>
          <p style={{ color: '#666' }}>Cargando perfil...</p>
        </div>
        <FooterInicio />
      </div>
    )
  }

  const usuario = perfil?.usuario || {}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarArrendador />

      <div style={{ flex: 1, maxWidth: '700px', margin: '0 auto', padding: '20px', width: '100%' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>👤 Mi Perfil</h1>

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

        {/* Error general */}
        {error && (
          <div style={{
            padding: '15px',
            backgroundColor: '#ffe6e6',
            color: '#dc3545',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}

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
          </div>

          {!editando ? (
            <>
              {/* Datos Personales */}
              <div style={infoSectionStyle}>
                <h3 style={sectionTitleStyle}>📋 Datos Personales</h3>
                <InfoRow label="Nombre" value={usuario.usuarioNom} />
                <InfoRow label="Apellido Paterno" value={usuario.usuarioApePat} />
                <InfoRow label="Apellido Materno" value={usuario.usuarioApeMat || '—'} />
                <InfoRow label="Correo electrónico" value={usuario.usuarioCorreo} bloqueado />
                <InfoRow label="Teléfono" value={usuario.usuarioTel || '—'} />
                <InfoRow label="CURP" value={usuario.usuarioCurp} bloqueado />
                <InfoRow label="RFC" value={perfil.arrendadorRFC} bloqueado />
                <InfoRow label="Fecha de Nacimiento" value={usuario.usuarioFechaNac ? new Date(usuario.usuarioFechaNac).toLocaleDateString('es-MX') : '—'} bloqueado />
              </div>

              {/* Dirección */}
              <div style={infoSectionStyle}>
                <h3 style={sectionTitleStyle}>📍 Dirección</h3>
                <InfoRow label="Calle" value={perfil.direccion?.direccionCalle || '—'} />
                <InfoRow label="Número Exterior" value={perfil.direccion?.direccionNumExt || '—'} />
                <InfoRow label="Número Interior" value={perfil.direccion?.direccionNumInt || '—'} />
                <InfoRow label="Código Postal" value={perfil.direccion?.cp?.d_codigo || '—'} />
                <InfoRow label="Colonia" value={perfil.direccion?.cp?.d_asenta || '—'} />
                <InfoRow label="Municipio" value={perfil.direccion?.cp?.D_mnpio || '—'} />
                <InfoRow label="Estado" value={perfil.direccion?.cp?.d_estado || '—'} />
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

              {/* Botón Eliminar Cuenta */}
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
              {/* Editar Datos Personales */}
              <div style={infoSectionStyle}>
                <h3 style={sectionTitleStyle}>✏️ Editar Datos Personales</h3>
                
                <InputField 
                  label="Nombres *" 
                  value={nombres} 
                  onChange={handleNombresChange} 
                  maxLength={60}
                  placeholder="Ej: Juan Carlos"
                  hint="Solo letras y espacios. Mínimo 2 caracteres"
                  error={errors.nombres}
                />
                
                <InputField 
                  label="Apellido Paterno *" 
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
                  label="Teléfono *" 
                  value={telefono} 
                  onChange={handleTelefonoChange} 
                  type="tel" 
                  maxLength={10}
                  placeholder="Ej: 5512345678"
                  hint="10 dígitos, solo números"
                  error={errors.telefono}
                />

                <div style={{ marginTop: '20px' }}>
                  <p style={{ fontWeight: 'bold', color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                    🔒 Información no editable:
                  </p>
                  <InfoRow label="Correo electrónico" value={usuario.usuarioCorreo} bloqueado />
                  <InfoRow label="CURP" value={usuario.usuarioCurp} bloqueado />
                  <InfoRow label="RFC" value={perfil.arrendadorRFC} bloqueado />
                  <InfoRow label="Fecha de Nacimiento" value={usuario.usuarioFechaNac ? new Date(usuario.usuarioFechaNac).toLocaleDateString('es-MX') : '—'} bloqueado />
                </div>
              </div>

              {/* Editar Dirección */}
              <div style={infoSectionStyle}>
                <h3 style={sectionTitleStyle}>✏️ Editar Dirección</h3>
                
                <InputField 
                  label="Calle *" 
                  value={calle} 
                  onChange={handleCalleChange} 
                  maxLength={100}
                  placeholder="Ej: Av. Insurgentes Sur 123"
                  hint="Solo letras, números y espacios. Mínimo 3 caracteres"
                  error={errors.calle}
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <InputField 
                    label="Número Exterior *" 
                    value={numExt} 
                    onChange={handleNumExtChange} 
                    maxLength={10}
                    placeholder="Ej: 123"
                    hint="Solo letras y números"
                    error={errors.numExt}
                  />
                  <InputField 
                    label="Número Interior" 
                    value={numInt} 
                    onChange={handleNumIntChange} 
                    maxLength={10}
                    placeholder="Ej: 3B"
                    hint="Opcional. Solo letras y números"
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    value={cp}
                    onChange={handleCPChange}
                    maxLength={5}
                    placeholder="Ej: 07300"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: errors.cp ? '2px solid #dc3545' : '1px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {buscandoCP && <small style={{ color: '#6b7280', display: 'block', marginTop: '4px' }}>⏳ Buscando dirección...</small>}
                  {!buscandoCP && <small style={{ color: '#6b7280', display: 'block', marginTop: '4px' }}>5 dígitos. Se autocompletará colonia, municipio y estado</small>}
                  {errors.cp && <small className="perfil-error" style={{ color: '#dc3545', display: 'block', marginTop: '4px' }}>{errors.cp}</small>}
                </div>
                
                <div style={{ marginTop: '20px' }}>
                  <p style={{ fontWeight: 'bold', color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                    🔒 Autocompletado por CP:
                  </p>
                  <InfoRow label="Colonia" value={colonia || '—'} bloqueado />
                  <InfoRow label="Municipio" value={municipio || '—'} bloqueado />
                  <InfoRow label="Estado" value={estado || '—'} bloqueado />
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
                  disabled={guardando}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: guardando ? '#ccc' : '#1a237e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: guardando ? 'not-allowed' : 'pointer',
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
            <p style={{ fontSize: '40px', marginBottom: '15px' }}>
              {modal.type === 'confirm' ? '⚠️' : modal.type === 'success' ? '✅' : '❌'}
            </p>
            
            <h3 style={{ 
              marginBottom: '15px', 
              color: modal.type === 'confirm' ? '#e65100' : modal.type === 'success' ? '#28a745' : '#dc3545',
              fontSize: '18px'
            }}>
              {modal.title}
            </h3>
            
            <p style={{ 
              color: '#555', 
              fontSize: '14px', 
              marginBottom: '25px', 
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}>
              {modal.message}
            </p>
            
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

const InputField = ({ label, value, onChange, type = 'text', maxLength, placeholder, hint, error }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>
      {label}
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

export default PerfilArrendador