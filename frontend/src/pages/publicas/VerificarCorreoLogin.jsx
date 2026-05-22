import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarInicio from '../../components/common/NavbarInicio'
import FooterInicio from '../../components/common/FooterInicio'
import { verificarCodigoLogin, reenviarCodigo, actualizarCorreo, validarCampo } from '../../services/authService'
import '../../styles/VerificarCorreo.css'

const VerificarCorreoLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [userId, setUserId] = useState(null)
  const [rol, setRol] = useState(null)
  const [arrendadorId, setArrendadorId] = useState(null)
  const [arrendatarioId, setArrendatarioId] = useState(null)
  const [fechaRegistro, setFechaRegistro] = useState(null)
  const [arrendatarioVerificadoInicial, setArrendatarioVerificadoInicial] = useState(null)

  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [tiempoReenvio, setTiempoReenvio] = useState(60)

  const [modoEdicion, setModoEdicion] = useState(false)
  const [nuevoCorreo, setNuevoCorreo] = useState('')

  useEffect(() => {
    const state = location.state
    if (!state?.correo) {
      navigate('/usuarios/inicio-sesion')
      return
    }
    setCorreo(state.correo)
    setNuevoCorreo(state.correo)
    setUserId(state.userId)
    setRol(state.rol)
    setArrendadorId(state.arrendadorId || null)
    setArrendatarioId(state.arrendatarioId || null)
    setFechaRegistro(state.fechaRegistro || null)
    setArrendatarioVerificadoInicial(state.arrendatarioVerificado ?? null)
  }, [location, navigate])

  useEffect(() => {
    if (tiempoReenvio <= 0) return
    const timer = setTimeout(() => setTiempoReenvio(tiempoReenvio - 1), 1000)
    return () => clearTimeout(timer)
  }, [tiempoReenvio])

  const handleVerificar = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    setMensaje('')
    try {
      const data = await verificarCodigoLogin(correo, codigo)
      setMensaje('¡Correo verificado! Redirigiendo...')
      setTimeout(() => {
        if (rol === 'arrendador') {
          localStorage.setItem('correoVerificado', '1')
          localStorage.setItem('userId', userId)
          localStorage.setItem('rol', rol)
          localStorage.setItem('arrendadorId', arrendadorId)
          navigate('/arrendador/mis-arrendamientos')
          return
        }
        if (rol === 'arrendatario') {
        const verificadoIdentidad = data.arrendatarioVerificado === 1 || arrendatarioVerificadoInicial === 1
        if (verificadoIdentidad) {
            navigate('/arrendatario/buscar-vivienda')
            return
        }
        // Dejar que el backend decida si expiró o no
        navigate('/verificar-expiracion', { state: { userId } })
        }
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al verificar el código')
    } finally {
      setCargando(false)
    }
  }

  const handleReenviar = async () => {
    setCargando(true)
    setError('')
    setMensaje('')
    try {
      await reenviarCodigo(correo)
      setMensaje('Código reenviado. Revisa tu correo.')
      setTiempoReenvio(60)
      setCodigo('')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al reenviar el código')
    } finally {
      setCargando(false)
    }
  }

  const handleActualizarCorreo = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!nuevoCorreo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCorreo)) {
      setError('Ingresa un correo electrónico válido')
      return
    }

    setCargando(true)
    try {
      const resultado = await validarCampo('correo', nuevoCorreo)
      if (resultado.existe) {
        setError('Este correo ya está registrado por otra cuenta')
        setCargando(false)
        return
      }
      await actualizarCorreo(correo, nuevoCorreo)
      setCorreo(nuevoCorreo)
      setModoEdicion(false)
      setTiempoReenvio(0)
      setCodigo('')
      setMensaje('Correo actualizado. Se envió un nuevo código.')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar el correo')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="verificar-correo-page">
      <NavbarInicio />

      <main className="verificar-correo-main">
        <div className="verificar-correo-card">
          <div className="verificar-correo-icon">📧</div>

          <h2 className="verificar-correo-title">Verificación de Correo</h2>
          <p className="verificar-correo-subtitle">
            Ingresa el código de 8 dígitos que enviamos a{' '}
            <strong className="verificar-correo-highlight">{correo}</strong>
          </p>

          <div className="verificar-correo-edit-box">
            {!modoEdicion ? (
              <button
                type="button"
                className="verificar-correo-edit-link"
                onClick={() => { setModoEdicion(true); setError(''); setMensaje('') }}
              >
                ¿Correo incorrecto o no te llega? Actualizar correo
              </button>
            ) : (
              <form onSubmit={handleActualizarCorreo} className="verificar-correo-edit-form">
                <label className="verificar-correo-edit-label">Nuevo correo:</label>
                <input
                  type="email"
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  placeholder="nuevo@correo.com"
                  className="verificar-correo-edit-input"
                  required
                />
                <div className="verificar-correo-edit-btns">
                  <button type="submit" disabled={cargando} className="verificar-correo-btn-sm verificar-correo-btn-sm-primary">
                    {cargando ? 'Actualizando...' : 'Actualizar'}
                  </button>
                  <button
                    type="button"
                    className="verificar-correo-btn-sm verificar-correo-btn-sm-ghost"
                    onClick={() => { setModoEdicion(false); setNuevoCorreo(correo); setError('') }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          <form onSubmit={handleVerificar}>
            <div className="verificar-correo-input-group">
              <label className="verificar-correo-input-label">Código de verificación</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
                placeholder="12345678"
                className="verificar-correo-code-input"
                required
              />
            </div>

            {error && (
              <div className="verificar-correo-alert verificar-correo-alert-error">
                <span>⚠️</span> {error}
              </div>
            )}
            {mensaje && (
              <div className="verificar-correo-alert verificar-correo-alert-success">
                <span>✓</span> {mensaje}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando || codigo.length !== 8}
              className="verificar-correo-btn verificar-correo-btn-primary"
            >
              {cargando ? 'Verificando...' : 'Verificar Código'}
            </button>

            <button
              type="button"
              onClick={handleReenviar}
              disabled={cargando || tiempoReenvio > 0}
              className="verificar-correo-btn verificar-correo-btn-secondary"
            >
              {tiempoReenvio > 0 ? `Reenviar código en ${tiempoReenvio}s` : 'Reenviar código'}
            </button>
          </form>

          <p className="verificar-correo-hint">
            Revisa tu bandeja de entrada y spam. El código expira en 12 horas.
          </p>

          <button
            type="button"
            className="verificar-correo-back-link"
            onClick={() => navigate('/usuarios/inicio-sesion')}
          >
            ← Volver al inicio de sesión
          </button>
        </div>
      </main>

      <FooterInicio />
    </div>
  )
}

export default VerificarCorreoLogin