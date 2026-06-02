import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavbarInicio from '../../components/common/NavbarRegistro'
import FooterInicio from '../../components/common/FooterInicio'
import '../../styles/VerificarCorreo.css'

const RestablecerPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const correo = location.state?.correo || ''

  const [paso, setPaso] = useState(1)
  const [codigo, setCodigo] = useState('')
  const [nuevaPassword, setNuevaPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const [errors, setErrors] = useState({})

  if (!correo) {
    navigate('/usuarios/inicio-sesion')
    return null
  }

  // ─── Validación de contraseña ──────────────────────────────────────────
  const validarPassword = (p) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/.test(p)
  }

  // ─── Helper: ¿Es válido el paso 2? ────────────────────────────────────
  const esPaso2Valido = () => {
    return (
      nuevaPassword.length >= 8 &&
      nuevaPassword.length <= 25 &&
      validarPassword(nuevaPassword) &&
      confirmarPassword.length >= 8 &&
      nuevaPassword === confirmarPassword
    )
  }

  const handleVerificarCodigo = async (e) => {
    e.preventDefault()
    setError('')

    if (codigo.length !== 8) {
      setError('El código debe tener 8 dígitos')
      return
    }

    setCargando(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verificar-codigo-recuperacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo })
      })

      const data = await response.json()

      if (response.ok) {
        setPaso(2)
      } else {
        setError(data.error || 'Código incorrecto')
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const handleRestablecerPassword = async (e) => {
    e.preventDefault()
    setError('')
    setErrors({})
    const errs = {}

    // Validar nueva contraseña
    if (!nuevaPassword) {
      errs.nuevaPassword = 'La contraseña es obligatoria'
    } else if (nuevaPassword.length < 8) {
      errs.nuevaPassword = 'Mínimo 8 caracteres'
    } else if (nuevaPassword.length > 25) {
      errs.nuevaPassword = 'Máximo 25 caracteres'
    } else if (!validarPassword(nuevaPassword)) {
      errs.nuevaPassword = 'Debe contener mayúscula, minúscula, número y símbolo (@$!%*?&)'
    }

    // Validar confirmación
    if (!confirmarPassword) {
      errs.confirmarPassword = 'Confirma tu contraseña'
    } else if (nuevaPassword !== confirmarPassword) {
      errs.confirmarPassword = 'Las contraseñas no coinciden'
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setCargando(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/restablecer-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, nuevaPassword })
      })

      const data = await response.json()

      if (response.ok) {
        setExito(true)
        setTimeout(() => {
          navigate('/usuarios/inicio-sesion')
        }, 3000)
      } else {
        setError(data.error || 'Error al restablecer')
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const handleReenviarCodigo = async () => {
    setCargando(true)
    setError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/recuperar-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo })
      })

      const data = await response.json()

      if (response.ok) {
        alert('Código reenviado a tu correo electrónico')
      } else {
        setError(data.error || 'Error al reenviar')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setCargando(false)
    }
  }

  // ─── Handlers con restricciones ──────────────────────────────────────────
  const handleCodigoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCodigo(valor)
    setError('')
  }

  const handleNuevaPasswordChange = (e) => {
    const valor = e.target.value.slice(0, 25)
    setNuevaPassword(valor)
    if (errors.nuevaPassword) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.nuevaPassword
        return newErrors
      })
    }
  }

  const handleConfirmarPasswordChange = (e) => {
    const valor = e.target.value.slice(0, 25)
    setConfirmarPassword(valor)
    if (errors.confirmarPassword) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.confirmarPassword
        return newErrors
      })
    }
  }

  return (
    <div className="verificar-page">
      <NavbarInicio />
      
      <div className="verificar-container">
        <div className="verificar-card">
          <div className="verificar-header">
            <div className="verificar-icon">
              {exito ? '✅' : paso === 1 ? '📧' : '🔐'}
            </div>
            <h2>
              {exito 
                ? '¡Contraseña restablecida!' 
                : paso === 1 
                  ? 'Verificar código' 
                  : 'Nueva contraseña'
              }
            </h2>
            <p>
              {exito 
                ? 'Serás redirigido al inicio de sesión...' 
                : paso === 1 
                  ? `Enviamos un código de 8 dígitos a ${correo}`
                  : 'Ingresa tu nueva contraseña (8-25 caracteres)'
              }
            </p>
          </div>
          
          <div className="verificar-body">

            {error && (
              <div className="verificar-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* PASO 1: Ingresar código */}
            {!exito && paso === 1 && (
              <form onSubmit={handleVerificarCodigo}>
                <div className="verificar-code-group">
                  <label className="verificar-code-label">Código de verificación (8 dígitos)</label>
                  <input
                    type="text"
                    className="verificar-code-input"
                    value={codigo}
                    onChange={handleCodigoChange}
                    placeholder="12345678"
                    maxLength={8}
                    required
                  />
                  <span className="verificar-hint" style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                    Solo números. Exactamente 8 dígitos
                  </span>
                </div>

                <button
                  type="submit"
                  className="verificar-btn verificar-btn-primary"
                  disabled={cargando || codigo.length !== 8}
                >
                  {cargando ? 'Verificando...' : 'Verificar código →'}
                </button>

                <button
                  type="button"
                  className="verificar-btn verificar-btn-secondary"
                  onClick={handleReenviarCodigo}
                  disabled={cargando}
                >
                  📧 Reenviar código
                </button>
              </form>
            )}

            {/* PASO 2: Nueva contraseña */}
            {!exito && paso === 2 && (
              <form onSubmit={handleRestablecerPassword}>
                <div className="verificar-code-group">
                  <label className="verificar-code-label">Nueva contraseña *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={mostrarPassword ? 'text' : 'password'}
                      className={`verificar-code-input${errors.nuevaPassword ? ' is-error' : ''}`}
                      value={nuevaPassword}
                      onChange={handleNuevaPasswordChange}
                      placeholder="Mínimo 8, máximo 25 caracteres"
                      maxLength={25}
                      style={{ 
                        letterSpacing: 'normal',
                        borderColor: errors.nuevaPassword ? '#dc3545' : undefined
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      title={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {mostrarPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <span className="verificar-hint" style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                    {nuevaPassword.length}/25 caracteres
                  </span>
                  {errors.nuevaPassword && (
                    <span className="verificar-error" style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
                      {errors.nuevaPassword}
                    </span>
                  )}
                </div>

                <div className="verificar-code-group">
                  <label className="verificar-code-label">Confirmar contraseña *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={mostrarPassword ? 'text' : 'password'}
                      className={`verificar-code-input${errors.confirmarPassword ? ' is-error' : ''}`}
                      value={confirmarPassword}
                      onChange={handleConfirmarPasswordChange}
                      placeholder="Repite tu nueva contraseña"
                      maxLength={25}
                      style={{ 
                        letterSpacing: 'normal',
                        borderColor: errors.confirmarPassword ? '#dc3545' : undefined
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      title={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {mostrarPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmarPassword && (
                    <span className="verificar-error" style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
                      {errors.confirmarPassword}
                    </span>
                  )}
                </div>

                <div className="verificar-info" style={{ marginBottom: '1.5rem' }}>
                  <label>Requisitos de la contraseña:</label>
                  <ul>
                    <li style={{ color: nuevaPassword.length >= 8 ? '#16a34a' : '#666' }}>
                      {nuevaPassword.length >= 8 ? '✅' : '○'} Mínimo 8 caracteres
                    </li>
                    <li style={{ color: nuevaPassword.length <= 25 ? '#16a34a' : '#666' }}>
                      {nuevaPassword.length <= 25 ? '✅' : '○'} Máximo 25 caracteres
                    </li>
                    <li style={{ color: /[A-Z]/.test(nuevaPassword) ? '#16a34a' : '#666' }}>
                      {/[A-Z]/.test(nuevaPassword) ? '✅' : '○'} Al menos una mayúscula
                    </li>
                    <li style={{ color: /[a-z]/.test(nuevaPassword) ? '#16a34a' : '#666' }}>
                      {/[a-z]/.test(nuevaPassword) ? '✅' : '○'} Al menos una minúscula
                    </li>
                    <li style={{ color: /\d/.test(nuevaPassword) ? '#16a34a' : '#666' }}>
                      {/\d/.test(nuevaPassword) ? '✅' : '○'} Al menos un número
                    </li>
                    <li style={{ color: /[@$!%*?&]/.test(nuevaPassword) ? '#16a34a' : '#666' }}>
                      {/[@$!%*?&]/.test(nuevaPassword) ? '✅' : '○'} Al menos un símbolo (@$!%*?&)
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="verificar-btn verificar-btn-primary"
                  disabled={cargando || !esPaso2Valido()}
                >
                  {cargando ? 'Restableciendo...' : 'Restablecer Contraseña →'}
                </button>
              </form>
            )}

            <div className="verificar-hint">
              <button
                onClick={() => navigate('/usuarios/inicio-sesion')}
                className="verificar-back-btn"
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <FooterInicio />
    </div>
  )
}

export default RestablecerPasswordPage