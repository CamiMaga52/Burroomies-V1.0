import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavbarSimple from '../../components/common/NavbarSimple'
import FooterInicio from '../../components/common/FooterInicio'
import { loginUsuario, reenviarCodigo } from '../../services/authService'
import '../../styles/Login.css'
import burroLogo from '../../assets/burro.png'

const UsuariosInicioSesionPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const rol = localStorage.getItem('rol')
    const fechaUIS = localStorage.getItem('usuarioFechaUIS')

    if (rol && fechaUIS) {
      const horas = (Date.now() - parseInt(fechaUIS)) / (1000 * 60 * 60)
      if (horas >= 5) {
        localStorage.clear()
        return
      }
      if (rol === 'arrendador') navigate('/arrendador/mis-viviendas')
      else if (rol === 'arrendatario') navigate('/arrendatario/buscar-vivienda')
    }
  }, [])

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [mostrarPassword, setMostrarPassword] = useState(false)

  // Estados para recuperar contraseña
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false)
  const [correoRecuperar, setCorreoRecuperar] = useState('')
  const [enviandoRecuperar, setEnviandoRecuperar] = useState(false)
  const [mensajeRecuperar, setMensajeRecuperar] = useState('')
  const [errorRecuperar, setErrorRecuperar] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')

    try {
      const data = await loginUsuario(correo, password)

      // ── ARRENDADOR ──────────────────────────────────────────────
      if (data.rol === 'arrendador') {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('rol', data.rol)
        localStorage.setItem('correo', data.correo)
        localStorage.setItem('arrendadorId', data.arrendadorId)
        if (data.token) localStorage.setItem('token', data.token)
        localStorage.setItem('usuarioFechaUIS', Date.now().toString())

        if (!data.correoVerificado) {
          await reenviarCodigo(data.correo)
          navigate('/verificar-correo-login', {
            state: {
              correo: data.correo,
              userId: data.userId,
              rol: 'arrendador',
              arrendadorId: data.arrendadorId
            }
          })
          return
        }
        localStorage.setItem('correoVerificado', '1')
        navigate('/arrendador/mis-viviendas')
        return
      }

      // ── ARRENDATARIO ─────────────────────────────────────────────
      if (data.rol === 'arrendatario') {

        // 1️⃣ Verificar correo primero (sin guardar en localStorage aún)
        if (!data.correoVerificado) {
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('correo', data.correo)
          localStorage.setItem('arrendatarioId', data.arrendatarioId)
          localStorage.setItem('fechaRegistro', data.fechaRegistro)
          localStorage.setItem('arrendatarioVerificado', data.arrendatarioVerificado)
          if (data.token) localStorage.setItem('token', data.token)
          localStorage.setItem('usuarioFechaUIS', Date.now().toString())
          if (data.arrendatarioFechaVerificacion) {
            localStorage.setItem('arrendatarioFechaVerificacion', data.arrendatarioFechaVerificacion)
          }
          await reenviarCodigo(data.correo)
          navigate('/verificar-correo-login', {
            state: {
              correo: data.correo,
              userId: data.userId,
              rol: 'arrendatario',
              arrendatarioId: data.arrendatarioId,
              fechaRegistro: data.fechaRegistro,
              arrendatarioVerificado: data.arrendatarioVerificado
            }
          })
          return
        }

        // 2️⃣ Correo verificado + identidad verificada → entrar directo
        if (data.arrendatarioVerificado) {
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('correo', data.correo)
          localStorage.setItem('arrendatarioId', data.arrendatarioId)
          localStorage.setItem('fechaRegistro', data.fechaRegistro)
          localStorage.setItem('arrendatarioVerificado', data.arrendatarioVerificado)
          if (data.token) localStorage.setItem('token', data.token)
          localStorage.setItem('usuarioFechaUIS', Date.now().toString())
          localStorage.setItem('correoVerificado', '1')
          if (data.arrendatarioFechaVerificacion) {
            localStorage.setItem('arrendatarioFechaVerificacion', data.arrendatarioFechaVerificacion)
          }
          navigate('/arrendatario/buscar-vivienda')
          return
        }

        // 3️⃣ Correo verificado pero identidad NO verificada → checar expiración ANTES de guardar sesión
        const respExp = await fetch(`${import.meta.env.VITE_API_URL}/auth/verificar-expiracion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.userId })
        })

        if (!respExp.ok) {
          // Si el backend falla, mostramos error en lugar de dejar pasar
          setError('No se pudo verificar el estado de tu cuenta. Intenta de nuevo.')
          return
        }

        const expData = await respExp.json()

        if (expData.expirado && expData.eliminado) {
          // Cuenta eliminada → NO guardar nada en localStorage, ir directo a la página de eliminación
          navigate('/cuenta-eliminada-verificacion')
          return
        }

        // 4️⃣ No expiró → guardar sesión y mandar a verificación pendiente
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('rol', data.rol)
        localStorage.setItem('correo', data.correo)
        localStorage.setItem('arrendatarioId', data.arrendatarioId)
        localStorage.setItem('fechaRegistro', data.fechaRegistro)
        localStorage.setItem('arrendatarioVerificado', data.arrendatarioVerificado)
        if (data.token) localStorage.setItem('token', data.token)
        localStorage.setItem('usuarioFechaUIS', Date.now().toString())
        localStorage.setItem('correoVerificado', '1')
        if (data.arrendatarioFechaVerificacion) {
          localStorage.setItem('arrendatarioFechaVerificacion', data.arrendatarioFechaVerificacion)
        }
        navigate('/arrendatario/verificacion-pendiente')
      }

    } catch (err) {
      const status = err.response?.status
      const msg    = err.response?.data?.error || ''
      if (status === 404 || msg.toLowerCase().includes('no encontrado') || msg.toLowerCase().includes('no registrado') || msg.toLowerCase().includes('not found')) {
        setError('Este correo no está registrado en el sistema. Verifica que sea el correcto o regístrate.')
      } else if (status === 401 || msg.toLowerCase().includes('contraseña') || msg.toLowerCase().includes('incorrecta')) {
        setError('Contraseña incorrecta. Verifica tus datos e intenta de nuevo.')
      } else {
        setError(msg || 'Error al iniciar sesión. Intenta de nuevo.')
      }
    } finally {
      setCargando(false)
    }
  }

  // ============ RECUPERAR CONTRASEÑA ============
  const handleRecuperarPassword = async (e) => {
    e.preventDefault()
    
    if (!correoRecuperar.trim()) {
      setErrorRecuperar('Ingresa tu correo electrónico')
      return
    }

    setEnviandoRecuperar(true)
    setErrorRecuperar('')
    setMensajeRecuperar('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/recuperar-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correoRecuperar })
      })

      const data = await response.json()

      if (response.ok) {
        setMensajeRecuperar('Código enviado. Redirigiendo...')
        setTimeout(() => {
          setMostrarRecuperar(false)
          navigate('/restablecer-password', {
            state: { correo: correoRecuperar }
          })
        }, 1000)
      } else {
        setErrorRecuperar(data.error || 'Error al enviar el código')
      }
    } catch (err) {
      setErrorRecuperar('Error de conexión. Intenta de nuevo.')
    } finally {
      setEnviandoRecuperar(false)
    }
  }

  return (
    <div className="login-page">
      <NavbarSimple />
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <img 
                src={burroLogo} 
                alt="RentIPN" 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
            </div>
            <h2>¡Bienvenido de vuelta!</h2>
            <p>Ingresa tus datos para acceder a tu cuenta</p>
          </div>
          
          <div className="login-body">
            <form onSubmit={handleSubmit}>
              <div className="login-group">
                <label className="login-label">
                  Correo electrónico <span>*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="email"
                    className="login-input"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="ej.correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="login-group">
                <label className="login-label">
                  Contraseña <span>*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    className="login-input login-input-icon"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    tabIndex={-1}
                  >
                    {mostrarPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Link de recuperar contraseña */}
                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarRecuperar(true)
                      setErrorRecuperar('')
                      setMensajeRecuperar('')
                      setCorreoRecuperar('')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6c63ff',
                      cursor: 'pointer',
                      fontSize: '13px',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              {error && (
                <div className="login-error">
                  <span className="login-error-icon">⚠️</span>
                  <span className="login-error-text">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="login-btn"
                disabled={cargando}
              >
                {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>

              <div className="login-divider">
                <div className="login-divider-line"></div>
                <span className="login-divider-text">¿No tienes cuenta?</span>
                <div className="login-divider-line"></div>
              </div>

              <div className="login-register-link">
                <Link to="/registro">Regístrate aquí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* ===== MODAL RECUPERAR CONTRASEÑA ===== */}
      {mostrarRecuperar && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '420px',
            width: '90%',
            boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                width: '60px', height: '60px',
                background: '#f0eef7', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 15px'
              }}>
                <span style={{ fontSize: '30px' }}>🔐</span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1A1633', fontSize: '20px' }}>
                Recuperar Contraseña
              </h3>
              <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>

            {mensajeRecuperar && (
              <div style={{
                padding: '12px', backgroundColor: '#d4edda', color: '#155724',
                borderRadius: '8px', marginBottom: '15px',
                textAlign: 'center', fontSize: '13px', fontWeight: 'bold'
              }}>
                ✅ {mensajeRecuperar}
              </div>
            )}

            {errorRecuperar && (
              <div style={{
                padding: '12px', backgroundColor: '#ffebee', color: '#c62828',
                borderRadius: '8px', marginBottom: '15px',
                textAlign: 'center', fontSize: '13px'
              }}>
                ❌ {errorRecuperar}
              </div>
            )}

            {!mensajeRecuperar && (
              <form onSubmit={handleRecuperarPassword}>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={correoRecuperar}
                    onChange={(e) => { setCorreoRecuperar(e.target.value); setErrorRecuperar('') }}
                    placeholder="correo@ejemplo.com"
                    style={{
                      width: '100%', padding: '12px', borderRadius: '8px',
                      border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setMostrarRecuperar(false)}
                    style={{
                      flex: 1, padding: '12px', backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd', borderRadius: '8px',
                      cursor: 'pointer', fontSize: '14px', fontWeight: '500'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={enviandoRecuperar}
                    style={{
                      flex: 1, padding: '12px',
                      backgroundColor: enviandoRecuperar ? '#ccc' : '#1A1633',
                      color: 'white', border: 'none', borderRadius: '8px',
                      cursor: enviandoRecuperar ? 'not-allowed' : 'pointer',
                      fontSize: '14px', fontWeight: 'bold'
                    }}
                    onMouseEnter={(e) => { if (!enviandoRecuperar) e.currentTarget.style.backgroundColor = '#2a2348' }}
                    onMouseLeave={(e) => { if (!enviandoRecuperar) e.currentTarget.style.backgroundColor = '#1A1633' }}
                  >
                    {enviandoRecuperar ? '⏳ Enviando...' : 'Enviar enlace'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <FooterInicio />
    </div>
  )
}

export default UsuariosInicioSesionPage