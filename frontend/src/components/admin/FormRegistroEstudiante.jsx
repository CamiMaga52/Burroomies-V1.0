import React, { useState, useEffect } from 'react'
import { getUnidadesAcademicas, getCarrerasByUnidad } from '../../services/catalogosService'
import { validarCampo } from '../../services/authService'
import { createArrendatario } from '../../services/adminService'
import './admin.css'

const DOMINIOS_VALIDOS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'ipn.mx', 'alumno.ipn.mx']
const validarDominio = (correo) => DOMINIOS_VALIDOS.some(d => correo.toLowerCase().endsWith('@' + d))

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const ErrorModal = ({ mensaje, onCerrar }) => (
  <div style={{
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
  }}>
    <div style={{
      backgroundColor: '#fff', borderRadius: '12px', maxWidth: '420px', width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden'
    }}>
      <div style={{ backgroundColor: '#dc2626', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: 700 }}>Error al registrar</h3>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <p style={{ margin: '0 0 1.5rem 0', color: '#374151', fontSize: '0.9rem', lineHeight: 1.6 }}>{mensaje}</p>
        <button
          onClick={onCerrar}
          style={{
            width: '100%', padding: '0.65rem', backgroundColor: '#dc2626', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
)

// ─── Indicador de unicidad ──────────────────────────────────────────────────
const IndicadorUnicidad = ({ estado, campo }) => {
  const mensajes = {
    username: 'Nombre de usuario',
    correo: 'Correo electrónico',
    curp: 'CURP',
    boleta: 'Boleta'
  }
  
  if (!estado) return null
  
  if (estado === 'checking') {
    return <span className="admin-form-hint" style={{ color: '#6b7280' }}>⏳ Verificando disponibilidad...</span>
  }
  if (estado === 'ok') {
    return <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ {mensajes[campo]} disponible</span>
  }
  if (estado === 'taken') {
    return <span className="admin-form-error">✗ {mensajes[campo]} ya está registrado</span>
  }
  return null
}

const FormRegistroEstudiante = ({ onClose, onSuccess }) => {
  const [unidades, setUnidades] = useState([])
  const [carreras, setCarreras] = useState([])
  const [loading, setLoading] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [modalError, setModalError] = useState(null)
  const [errors, setErrors] = useState({})
  const [validando, setValidando] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)
  
  // Estado para indicadores visuales de unicidad
  const [unicidad, setUnicidad] = useState({
    username: null, correo: null, curp: null, boleta: null
  })

  const [formData, setFormData] = useState({
    username: '', nombres: '', apellidoPaterno: '', apellidoMaterno: '',
    correo: '', telefono: '', curp: '', fechaNacimiento: '',
    escuela: '', carreraId: '', boleta: '',
    password: '', confirmPassword: '',
  })

  useEffect(() => {
    const cargar = async () => {
      try { const data = await getUnidadesAcademicas(); setUnidades(data) } catch { }
    }
    cargar()
  }, [])

  useEffect(() => {
    const cargarCarreras = async () => {
      if (formData.escuela) {
        setLoading(true)
        try { const data = await getCarrerasByUnidad(formData.escuela); setCarreras(data) } catch { }
        finally { setLoading(false) }
      } else { setCarreras([]) }
    }
    cargarCarreras()
  }, [formData.escuela])

  const validarCampoUnico = async (campo, valor) => {
    if (!valor || valor.length < 3) {
      setUnicidad(prev => ({ ...prev, [campo]: null }))
      return true
    }
    
    setValidando(prev => ({ ...prev, [campo]: true }))
    setUnicidad(prev => ({ ...prev, [campo]: 'checking' }))
    
    try {
      const result = await validarCampo(campo, valor)
      if (result.existe) {
        const msgs = { 
          username: 'El nombre de usuario ya está registrado', 
          correo: 'El correo electrónico ya está registrado', 
          curp: 'El CURP ya está registrado', 
          boleta: 'La boleta ya está registrada' 
        }
        setErrors(prev => ({ ...prev, [campo]: msgs[campo] }))
        setUnicidad(prev => ({ ...prev, [campo]: 'taken' }))
        return false
      } else { 
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[campo]
          return newErrors
        })
        setUnicidad(prev => ({ ...prev, [campo]: 'ok' }))
        return true 
      }
    } catch { 
      setUnicidad(prev => ({ ...prev, [campo]: null }))
      return true 
    } finally { 
      setValidando(prev => ({ ...prev, [campo]: false })) 
    }
  }

  const handleBlur = async (e) => {
    const { name, value } = e.target
    if (['username', 'correo', 'curp', 'boleta'].includes(name)) {
      await validarCampoUnico(name, value)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    
    // Username: letras, números y guión bajo, sin espacios, 3-20 chars
    if (name === 'username') v = value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20)
    // Solo letras y espacios — nombres
    if (name === 'nombres') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 60)
    // Solo letras — apellidos (sin espacios)
    if (name === 'apellidoPaterno') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'apellidoMaterno') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    // Correo: sin espacios, máximo 35
    if (name === 'correo') v = value.replace(/\s/g, '').slice(0, 35)
    // Teléfono: solo números, exactamente 10
    if (name === 'telefono') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    // CURP: letras y números en mayúsculas, exactamente 18
    if (name === 'curp') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 18)
    // Boleta: solo números, exactamente 10
    if (name === 'boleta') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    
    setFormData(prev => ({ ...prev, [name]: v }))
    
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Resetear indicador de unicidad al modificar
    if (['username', 'correo', 'curp', 'boleta'].includes(name)) {
      setUnicidad(prev => ({ ...prev, [name]: null }))
    }
  }

  const validarPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/.test(p)

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const cumpleEsteAnio = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())
    if (hoy < cumpleEsteAnio) edad--
    return edad
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    
    // Username — 3 a 20 chars, solo letras/números/guión bajo
    if (!formData.username || formData.username.length < 3) {
      errs.username = !formData.username ? 'El nombre de usuario es obligatorio' : 'Mínimo 3 caracteres'
    } else if (formData.username.length > 20) {
      errs.username = 'Máximo 20 caracteres'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errs.username = 'Solo letras, números y guión bajo (_)'
    }
    
    // Nombres — mínimo 3 letras
    if (!formData.nombres || formData.nombres.trim().length < 3) {
      errs.nombres = !formData.nombres ? 'Los nombres son obligatorios' : 'Mínimo 3 caracteres'
    }
    
    if (!formData.apellidoPaterno || formData.apellidoPaterno.trim().length < 3) {
      errs.apellidoPaterno = !formData.apellidoPaterno ? 'El apellido paterno es obligatorio' : 'Mínimo 3 caracteres'
    }
    
    // Apellido materno es OPCIONAL
    if (formData.apellidoMaterno && formData.apellidoMaterno.trim().length < 3) {
      errs.apellidoMaterno = 'Mínimo 3 caracteres'
    }
    
    // Correo — formato y dominio
    if (!formData.correo) {
      errs.correo = 'El correo electrónico es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errs.correo = 'Formato de correo inválido'
    } else if (!validarDominio(formData.correo)) {
      errs.correo = 'Dominio no permitido. Usa Gmail, Hotmail, Outlook, Yahoo o IPN'
    }
    
    // Teléfono — exactamente 10 dígitos
    if (!formData.telefono) {
      errs.telefono = 'El teléfono es obligatorio'
    } else if (formData.telefono.length !== 10) {
      errs.telefono = 'Debe tener exactamente 10 dígitos'
    }
    
    // CURP — exactamente 18 con estructura válida
    if (!formData.curp) {
      errs.curp = 'El CURP es obligatorio'
    } else if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/.test(formData.curp)) {
      errs.curp = 'CURP inválido (4 letras, 6 números, 6 letras, 2 alfanuméricos)'
    }
    
    // Fecha de nacimiento — entre 17 y 100 años
    if (!formData.fechaNacimiento) {
      errs.fechaNacimiento = 'La fecha de nacimiento es obligatoria'
    } else if (calcularEdad(formData.fechaNacimiento) < 17) {
      errs.fechaNacimiento = 'El estudiante debe tener al menos 17 años'
    } else if (calcularEdad(formData.fechaNacimiento) > 100) {
      errs.fechaNacimiento = 'Fecha de nacimiento no válida'
    }
    
    // Datos académicos
    if (!formData.escuela) errs.escuela = 'Selecciona una escuela'
    if (!formData.carreraId) errs.carreraId = 'Selecciona una carrera'
    
    // Boleta — exactamente 10 dígitos
    if (!formData.boleta) {
      errs.boleta = 'La boleta es obligatoria'
    } else if (formData.boleta.length !== 10) {
      errs.boleta = 'La boleta debe tener exactamente 10 dígitos'
    }
    
    // Contraseña
    if (!formData.password) {
      errs.password = 'La contraseña es obligatoria'
    } else if (!validarPassword(formData.password)) {
      errs.password = 'Mínimo 8 caracteres, máximo 25, mayúscula, minúscula, número y símbolo (@$!%*?&)'
    }
    
    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    // ── MOSTRAR ERRORES CON SCROLL ──────────────────────
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setTimeout(() => {
        const primerError = document.querySelector('.admin-form-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    const checks = await Promise.all([
      validarCampoUnico('username', formData.username),
      validarCampoUnico('correo', formData.correo),
      validarCampoUnico('curp', formData.curp),
      validarCampoUnico('boleta', formData.boleta),
    ])
    
    if (checks.includes(false)) {
      // Scroll al error de unicidad
      setTimeout(() => {
        const primerError = document.querySelector('.admin-form-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    setEnviando(true)
    try {
      await createArrendatario({
        username: formData.username, 
        nombres: formData.nombres,
        apellidoPaterno: formData.apellidoPaterno, 
        apellidoMaterno: formData.apellidoMaterno,
        correo: formData.correo, 
        telefono: formData.telefono,
        curp: formData.curp, 
        fechaNacimiento: formData.fechaNacimiento,
        carreraId: parseInt(formData.carreraId), 
        boleta: formData.boleta,
        password: formData.password,
      })
      onSuccess()
    } catch (error) {
      setModalError(error.response?.data?.error || 'Error al registrar')
    } finally { 
      setEnviando(false) 
    }
  }

  return (
    <>
      {modalError && <ErrorModal mensaje={modalError} onCerrar={() => setModalError(null)} />}
      
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">Registrar Estudiante</h2>
        <button className="admin-modal-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-modal-body">
        <form onSubmit={handleSubmit} noValidate>
          <p className="admin-form-section">Datos de Cuenta</p>

          <div className="admin-form-field">
            <label className="admin-form-label">Nombre de usuario *</label>
            <input
              className={`admin-form-input${errors.username || unicidad.username === 'taken' ? ' is-error' : ''}`}
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              maxLength={20}
              placeholder="Ej: juan_perez"
            />
            {validando.username && <span className="admin-form-hint">⏳ Verificando disponibilidad...</span>}
            {errors.username && <span className="admin-form-error">{errors.username}</span>}
            {!errors.username && !validando.username && unicidad.username !== 'taken' && (
              <span className="admin-form-hint">3-20 caracteres. Solo letras, números y _ (sin espacios)</span>
            )}
            {unicidad.username === 'ok' && <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ Nombre de usuario disponible</span>}
          </div>

          <p className="admin-form-section">Datos Personales</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Nombres *</label>
              <input
                className={`admin-form-input${errors.nombres ? ' is-error' : ''}`}
                name="nombres" 
                value={formData.nombres} 
                onChange={handleChange} 
                maxLength={60}
                placeholder="Ej: Juan Carlos"
              />
              <span className="admin-form-hint">Solo letras y espacios. Mínimo 3 caracteres</span>
              {errors.nombres && <span className="admin-form-error">{errors.nombres}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Ap. Paterno *</label>
              <input
                className={`admin-form-input${errors.apellidoPaterno ? ' is-error' : ''}`}
                name="apellidoPaterno" 
                value={formData.apellidoPaterno} 
                onChange={handleChange} 
                maxLength={25}
                placeholder="Ej: Hernández"
              />
              <span className="admin-form-hint">Solo letras. Mínimo 3 caracteres</span>
              {errors.apellidoPaterno && <span className="admin-form-error">{errors.apellidoPaterno}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Ap. Materno (opcional)</label>
            <input
              className={`admin-form-input${errors.apellidoMaterno ? ' is-error' : ''}`}
              name="apellidoMaterno" 
              value={formData.apellidoMaterno} 
              onChange={handleChange} 
              maxLength={25}
              placeholder="Ej: López"
            />
            <span className="admin-form-hint">Opcional. Solo letras</span>
            {errors.apellidoMaterno && <span className="admin-form-error">{errors.apellidoMaterno}</span>}
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Correo electrónico *</label>
              <input
                className={`admin-form-input${errors.correo || unicidad.correo === 'taken' ? ' is-error' : ''}`}
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                maxLength={60}
                placeholder="Ej: juan@gmail.com"
              />
              {validando.correo && <span className="admin-form-hint">⏳ Verificando disponibilidad...</span>}
              {errors.correo && <span className="admin-form-error">{errors.correo}</span>}
              {!errors.correo && !validando.correo && unicidad.correo !== 'taken' && (
                <span className="admin-form-hint">Gmail, Hotmail, Outlook, Yahoo o IPN</span>
              )}
              {unicidad.correo === 'ok' && <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ Correo disponible</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Teléfono * (10 dígitos)</label>
              <input
                className={`admin-form-input${errors.telefono ? ' is-error' : ''}`}
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 5512345678"
              />
              <span className="admin-form-hint">Solo números. Exactamente 10 dígitos</span>
              {errors.telefono && <span className="admin-form-error">{errors.telefono}</span>}
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">CURP * (18 caracteres)</label>
              <input
                className={`admin-form-input${errors.curp || unicidad.curp === 'taken' ? ' is-error' : ''}`}
                name="curp" 
                value={formData.curp} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                maxLength={18}
                placeholder="Ej: HERS850101MDFRRN09"
              />
              {validando.curp && <span className="admin-form-hint">⏳ Verificando disponibilidad...</span>}
              {errors.curp && <span className="admin-form-error">{errors.curp}</span>}
              {!errors.curp && !validando.curp && unicidad.curp !== 'taken' && (
                <span className="admin-form-hint">Formato: 4 letras, 6 números, 6 letras, 2 alfanuméricos</span>
              )}
              {unicidad.curp === 'ok' && <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ CURP disponible</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Fecha de Nacimiento *</label>
              <input
                className={`admin-form-input${errors.fechaNacimiento ? ' is-error' : ''}`}
                type="date" 
                name="fechaNacimiento" 
                value={formData.fechaNacimiento} 
                onChange={handleChange}
                max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 17); return d.toISOString().split('T')[0] })()}
                min={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 100); return d.toISOString().split('T')[0] })()}
              />
              <span className="admin-form-hint">Debe tener al menos 17 años</span>
              {errors.fechaNacimiento && <span className="admin-form-error">{errors.fechaNacimiento}</span>}
            </div>
          </div>

          <p className="admin-form-section">Datos Académicos</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Escuela *</label>
              <select
                className={`admin-form-input${errors.escuela ? ' is-error' : ''}`}
                name="escuela" 
                value={formData.escuela} 
                onChange={handleChange}
              >
                <option value="">Selecciona una escuela</option>
                {unidades.map(u => (
                  <option key={u.idUnidadAcademica} value={u.idUnidadAcademica}>
                    {u.unidadAcademicaNombre} ({u.unidadAcademicaClave})
                  </option>
                ))}
              </select>
              {errors.escuela && <span className="admin-form-error">{errors.escuela}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Carrera *</label>
              <select
                className={`admin-form-input${errors.carreraId ? ' is-error' : ''}`}
                name="carreraId" 
                value={formData.carreraId} 
                onChange={handleChange}
                disabled={!formData.escuela || loading}
              >
                <option value="">{loading ? 'Cargando carreras...' : 'Selecciona una carrera'}</option>
                {carreras.map(c => (
                  <option key={c.idCarrera} value={c.idCarrera}>
                    {c.carreraNombre} ({c.carreraClave})
                  </option>
                ))}
              </select>
              {errors.carreraId && <span className="admin-form-error">{errors.carreraId}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Boleta *</label>
            <input
              className={`admin-form-input${errors.boleta || unicidad.boleta === 'taken' ? ' is-error' : ''}`}
              name="boleta" 
              value={formData.boleta} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              maxLength={10}
              placeholder="Ej: 2024030001"
            />
            {validando.boleta && <span className="admin-form-hint">⏳ Verificando disponibilidad...</span>}
            {errors.boleta && <span className="admin-form-error">{errors.boleta}</span>}
            {!errors.boleta && !validando.boleta && unicidad.boleta !== 'taken' && (
              <span className="admin-form-hint">10 dígitos, solo números</span>
            )}
            {unicidad.boleta === 'ok' && <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ Boleta disponible</span>}
          </div>

          <p className="admin-form-section">Contraseña</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Contraseña *</label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`admin-form-input${errors.password ? ' is-error' : ''}`}
                  type={mostrarPassword ? 'text' : 'password'}
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  maxLength={25}
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  title={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {mostrarPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="admin-form-error">{errors.password}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Confirmar contraseña *</label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`admin-form-input${errors.confirmPassword ? ' is-error' : ''}`}
                  type={mostrarPassword ? 'text' : 'password'}
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  maxLength={25}
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Repite la contraseña"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  title={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {mostrarPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && <span className="admin-form-error">{errors.confirmPassword}</span>}
            </div>
          </div>
          <span className="admin-form-hint">Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo (@$!%*?&)</span>
        </form>
      </div>

      <div className="admin-modal-footer">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-save" onClick={handleSubmit} disabled={enviando}>
          {enviando ? 'Registrando...' : 'Registrar Estudiante'}
        </button>
      </div>
    </>
  )
}

export default FormRegistroEstudiante