import React, { useState } from 'react'
import { buscarCP } from '../../services/cpService'
import { validarCampo } from '../../services/authService'
import { createArrendador } from '../../services/adminService'
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
    correo: 'Correo electrónico',
    curp: 'CURP',
    rfc: 'RFC'
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

const FormRegistroArrendador = ({ onClose, onSuccess }) => {
  const [enviando, setEnviando] = useState(false)
  const [modalError, setModalError] = useState(null)
  const [sugerenciasCP, setSugerenciasCP] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [buscandoCP, setBuscandoCP] = useState(false)
  const [errors, setErrors] = useState({})
  const [validando, setValidando] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)
  
  // Estado para indicadores visuales de unicidad
  const [unicidad, setUnicidad] = useState({
    correo: null, curp: null, rfc: null
  })

  const [formData, setFormData] = useState({
    nombres: '', apellidoPaterno: '', apellidoMaterno: '',
    correo: '', telefono: '', curp: '', fechaNacimiento: '',
    rfc: '', cp: '', calle: '', numExt: '', numInt: '',
    colonia: '', municipio: '', estado: '',
    password: '', confirmPassword: '',
  })

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
          correo: 'El correo electrónico ya está registrado', 
          curp: 'El CURP ya está registrado', 
          rfc: 'El RFC ya está registrado' 
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
    if (['correo', 'curp', 'rfc'].includes(name)) {
      await validarCampoUnico(name, value)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    
    // Restricciones de entrada
    if (name === 'nombres') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 60)
    if (name === 'apellidoPaterno') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'apellidoMaterno') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'telefono') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'curp') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 18)
    if (name === 'rfc') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 13)
    if (name === 'calle') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]/g, '').slice(0, 35)
    if (name === 'numExt' || name === 'numInt') v = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    if (name === 'correo') v = value.replace(/\s/g, '').slice(0, 35)
    
    setFormData(prev => ({ ...prev, [name]: v }))
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Resetear indicador de unicidad al modificar
    if (['correo', 'curp', 'rfc'].includes(name)) {
      setUnicidad(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleCPChange = async (e) => {
    const cpNumeros = e.target.value.replace(/[^0-9]/g, '').slice(0, 5)
    setFormData(prev => ({ ...prev, cp: cpNumeros, colonia: '', municipio: '', estado: '' }))
    
    // Limpiar errores de dirección al cambiar CP
    if (errors.cp || errors.colonia || errors.municipio || errors.estado) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.cp
        delete newErrors.colonia
        delete newErrors.municipio
        delete newErrors.estado
        return newErrors
      })
    }
    
    if (cpNumeros.length === 5) {
      setBuscandoCP(true)
      try {
        const resultados = await buscarCP(cpNumeros)
        if (resultados.length > 0) { 
          setSugerenciasCP(resultados)
          setMostrarSugerencias(true) 
        }
      } catch { } finally { 
        setBuscandoCP(false) 
      }
    } else { 
      setSugerenciasCP([])
      setMostrarSugerencias(false) 
    }
  }

  const seleccionarDireccion = (d) => {
    setFormData(prev => ({ 
      ...prev, 
      cp: d.d_codigo, 
      colonia: d.d_asenta, 
      municipio: d.D_mnpio, 
      estado: d.d_estado 
    }))
    setMostrarSugerencias(false)
    setSugerenciasCP([])
    
    // Limpiar errores de dirección al seleccionar
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.cp
      delete newErrors.colonia
      delete newErrors.municipio
      delete newErrors.estado
      return newErrors
    })
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
    
    // ── DATOS PERSONALES ──────────────────────────────────────────────
    
    // Nombres
    if (!formData.nombres || formData.nombres.trim().length < 3) {
      errs.nombres = !formData.nombres ? 'Los nombres son obligatorios' : 'Mínimo 3 caracteres'
    }
    
    // Apellido paterno
    if (!formData.apellidoPaterno || formData.apellidoPaterno.trim().length < 3) {
      errs.apellidoPaterno = !formData.apellidoPaterno ? 'El apellido paterno es obligatorio' : 'Mínimo 3 caracteres'
    }
    
    // Apellido materno (opcional)
    if (formData.apellidoMaterno && formData.apellidoMaterno.trim().length < 3) {
      errs.apellidoMaterno = 'Mínimo 3 caracteres'
    }
    
    // Correo
    if (!formData.correo) {
      errs.correo = 'El correo electrónico es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errs.correo = 'Formato de correo inválido'
    } else if (!validarDominio(formData.correo)) {
      errs.correo = 'Dominio no permitido. Usa Gmail, Hotmail, Outlook, Yahoo o IPN'
    }
    
    // Teléfono
    if (!formData.telefono) {
      errs.telefono = 'El teléfono es obligatorio'
    } else if (formData.telefono.length !== 10) {
      errs.telefono = 'Debe tener exactamente 10 dígitos'
    }
    
    // CURP
    if (!formData.curp) {
      errs.curp = 'El CURP es obligatorio'
    } else if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/.test(formData.curp)) {
      errs.curp = 'CURP inválido (4 letras, 6 números, 6 letras, 2 alfanuméricos)'
    }
    
    // Fecha de nacimiento
    if (!formData.fechaNacimiento) {
      errs.fechaNacimiento = 'La fecha de nacimiento es obligatoria'
    } else if (calcularEdad(formData.fechaNacimiento) < 18) {
      errs.fechaNacimiento = 'El arrendador debe ser mayor de 18 años'
    } else if (calcularEdad(formData.fechaNacimiento) > 100) {
      errs.fechaNacimiento = 'Fecha de nacimiento no válida'
    }
    
    // RFC
    if (!formData.rfc) {
      errs.rfc = 'El RFC es obligatorio'
    } else if (!/^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/.test(formData.rfc)) {
      errs.rfc = 'RFC inválido (4 letras, 6 números, 3 alfanuméricos)'
    }
    
    // ── DIRECCIÓN ─────────────────────────────────────────────────────
    
    if (!formData.cp || formData.cp.length !== 5) {
      errs.cp = !formData.cp ? 'El código postal es obligatorio' : 'Debe tener 5 dígitos'
    }
    
    if (!formData.colonia) {
      errs.colonia = 'Selecciona una colonia del listado (busca por CP)'
    }
    
    if (!formData.municipio) {
      errs.municipio = 'Selecciona un municipio del listado (busca por CP)'
    }
    
    if (!formData.estado) {
      errs.estado = 'Selecciona un estado del listado (busca por CP)'
    }
    
    if (!formData.calle || formData.calle.trim().length < 3) {
      errs.calle = !formData.calle ? 'La calle es obligatoria' : 'Mínimo 3 caracteres'
    }
    
    if (!formData.numExt || formData.numExt.trim().length < 1) {
      errs.numExt = 'El número exterior es obligatorio'
    }
    
    // ── CONTRASEÑA ────────────────────────────────────────────────────
    
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
    
    // ── MOSTRAR ERRORES CON SCROLL ────────────────────────────────────
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

    // ── VERIFICAR UNICIDAD ────────────────────────────────────────────
    const checks = await Promise.all([
      validarCampoUnico('correo', formData.correo),
      validarCampoUnico('curp', formData.curp),
      validarCampoUnico('rfc', formData.rfc),
    ])
    
    if (checks.includes(false)) {
      setTimeout(() => {
        const primerError = document.querySelector('.admin-form-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // ── ENVÍO AL BACKEND (LÓGICA ORIGINAL INTACTA) ────────────────────
    setEnviando(true)
    try {
      await createArrendador({
        nombres: formData.nombres.trim(),
        apellidoPaterno: formData.apellidoPaterno.trim(),
        apellidoMaterno: formData.apellidoMaterno.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono,
        curp: formData.curp,
        fechaNacimiento: formData.fechaNacimiento,
        rfc: formData.rfc,
        calle: formData.calle.trim(),
        numExt: formData.numExt.trim(),
        numInt: formData.numInt.trim(),
        cp: formData.cp,
        colonia: formData.colonia,
        municipio: formData.municipio,
        estado: formData.estado,
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
        <h2 className="admin-modal-title">Registrar Arrendador</h2>
        <button className="admin-modal-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-modal-body">
        <form onSubmit={handleSubmit} noValidate>
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
                maxLength={35}
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
              <label className="admin-form-label">Teléfono *</label>
              <input
                className={`admin-form-input${errors.telefono ? ' is-error' : ''}`}
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 5512345678"
              />
              <span className="admin-form-hint">10 dígitos, solo números</span>
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
              <label className="admin-form-label">RFC * (13 caracteres)</label>
              <input
                className={`admin-form-input${errors.rfc || unicidad.rfc === 'taken' ? ' is-error' : ''}`}
                name="rfc" 
                value={formData.rfc} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                maxLength={13}
                placeholder="Ej: HERS850101XXX"
              />
              {validando.rfc && <span className="admin-form-hint">⏳ Verificando disponibilidad...</span>}
              {errors.rfc && <span className="admin-form-error">{errors.rfc}</span>}
              {!errors.rfc && !validando.rfc && unicidad.rfc !== 'taken' && (
                <span className="admin-form-hint">Formato: 4 letras, 6 números, 3 alfanuméricos</span>
              )}
              {unicidad.rfc === 'ok' && <span className="admin-form-hint" style={{ color: '#16a34a' }}>✓ RFC disponible</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Fecha de Nacimiento *</label>
            <input
              className={`admin-form-input${errors.fechaNacimiento ? ' is-error' : ''}`}
              type="date" 
              name="fechaNacimiento" 
              value={formData.fechaNacimiento} 
              onChange={handleChange}
              max={(() => { 
                const d = new Date()
                d.setFullYear(d.getFullYear() - 18)
                return d.toISOString().split('T')[0] 
              })()}
              min={(() => { 
                const d = new Date()
                d.setFullYear(d.getFullYear() - 100)
                return d.toISOString().split('T')[0] 
              })()}
              style={{ width: 'auto' }}
            />
            <span className="admin-form-hint">Debe ser mayor de 18 años</span>
            {errors.fechaNacimiento && <span className="admin-form-error">{errors.fechaNacimiento}</span>}
          </div>

          <p className="admin-form-section">Domicilio</p>

          <div className="grid-cp">
            <div className="admin-form-field" style={{ position: 'relative' }}>
              <label className="admin-form-label">C.P. *</label>
              <input
                className={`admin-form-input${errors.cp ? ' is-error' : ''}`}
                name="cp" 
                value={formData.cp} 
                onChange={handleCPChange} 
                maxLength={5}
                placeholder="Ej: 07300"
              />
              {buscandoCP && <span className="admin-form-hint">⏳ Buscando direcciones...</span>}
              {!buscandoCP && <span className="admin-form-hint">5 dígitos. Se autocompletará la dirección</span>}
              {errors.cp && <span className="admin-form-error">{errors.cp}</span>}
              {mostrarSugerencias && sugerenciasCP.length > 0 && (
                <div className="cp-dropdown">
                  {sugerenciasCP.map((s, i) => (
                    <div key={i} className="cp-dropdown-item" onClick={() => seleccionarDireccion(s)}>
                      <strong>CP {s.d_codigo}</strong> — {s.d_asenta}, {s.D_mnpio}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Calle *</label>
              <input
                className={`admin-form-input${errors.calle ? ' is-error' : ''}`}
                name="calle" 
                value={formData.calle} 
                onChange={handleChange} 
                maxLength={35}
                placeholder="Ej: Av. Insurgentes"
              />
              <span className="admin-form-hint">Solo letras, números y espacios. Mínimo 3 caracteres</span>
              {errors.calle && <span className="admin-form-error">{errors.calle}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Ext *</label>
              <input
                className={`admin-form-input${errors.numExt ? ' is-error' : ''}`}
                name="numExt" 
                value={formData.numExt} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 123"
              />
              <span className="admin-form-hint">Solo letras y números</span>
              {errors.numExt && <span className="admin-form-error">{errors.numExt}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Int</label>
              <input 
                className="admin-form-input" 
                name="numInt" 
                value={formData.numInt} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 3B"
              />
              <span className="admin-form-hint">Opcional. Solo letras y números</span>
            </div>
          </div>

          <div className="grid-3">
            {[
              ['Colonia', 'colonia', '🔒 Autocompletado por CP'], 
              ['Municipio', 'municipio', '🔒 Autocompletado por CP'], 
              ['Estado', 'estado', '🔒 Autocompletado por CP']
            ].map(([lbl, key, hint]) => (
              <div key={key} className="admin-form-field">
                <label className="admin-form-label">{lbl}</label>
                <input 
                  className={`admin-form-input${errors[key] ? ' is-error' : ''}`} 
                  value={formData[key]} 
                  disabled 
                  style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                  placeholder="Busca por CP"
                />
                <span className="admin-form-hint">{hint}</span>
                {errors[key] && <span className="admin-form-error">{errors[key]}</span>}
              </div>
            ))}
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
              <label className="admin-form-label">Confirmar *</label>
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
          {enviando ? 'Registrando...' : 'Registrar Arrendador'}
        </button>
      </div>
    </>
  )
}

export default FormRegistroArrendador