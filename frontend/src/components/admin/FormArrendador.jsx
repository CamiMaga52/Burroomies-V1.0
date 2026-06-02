import React, { useState, useEffect } from 'react'
import { buscarCP } from '../../services/cpService'
import { updateArrendador } from '../../services/adminService'
import './admin.css'

const FormArrendador = ({ arrendador, onClose, onSuccess }) => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [sugerenciasCP, setSugerenciasCP] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [buscandoCP, setBuscandoCP] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    usuarioApePat: '', usuarioApeMat: '', usuarioNom: '',
    usuarioCorreo: '', usuarioTel: '', usuarioCurp: '',
    usuarioFechaNac: '', arrendadorRFC: '',
    direccionCalle: '', direccionNumExt: '', direccionNumInt: '',
    cp: '', colonia: '', municipio: '', estado: ''
  })

  const isVerified = arrendador?.arrendadorFechaVerificacion !== null

  useEffect(() => {
    if (arrendador) {
      setFormData({
        usuarioApePat: arrendador.usuario?.usuarioApePat || '',
        usuarioApeMat: arrendador.usuario?.usuarioApeMat || '',
        usuarioNom: arrendador.usuario?.usuarioNom || '',
        usuarioCorreo: arrendador.usuario?.usuarioCorreo || '',
        usuarioTel: arrendador.usuario?.usuarioTel || '',
        usuarioCurp: arrendador.usuario?.usuarioCurp || '',
        usuarioFechaNac: arrendador.usuario?.usuarioFechaNac || '',
        arrendadorRFC: arrendador.arrendadorRFC || '',
        direccionCalle: arrendador.direccion?.direccionCalle || '',
        direccionNumExt: arrendador.direccion?.direccionNumExt || '',
        direccionNumInt: arrendador.direccion?.direccionNumInt || '',
        cp: arrendador.direccion?.cp?.d_codigo || '',
        colonia: arrendador.direccion?.cp?.d_asenta || '',
        municipio: arrendador.direccion?.cp?.D_mnpio || '',
        estado: arrendador.direccion?.cp?.d_estado || ''
      })
    }
  }, [arrendador])

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    
    // Restricciones de entrada
    if (name === 'usuarioNom') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 35)
    if (name === 'usuarioApePat') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'usuarioApeMat') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'usuarioTel') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'usuarioCurp') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 18)
    if (name === 'arrendadorRFC') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 13)
    if (name === 'direccionCalle') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]/g, '').slice(0, 35)
    if (name === 'direccionNumExt' || name === 'direccionNumInt') v = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    
    setFormData(prev => ({ ...prev, [name]: v }))
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    
    // ── DATOS PERSONALES ──────────────────────────────────────────────
    
    // Nombres
    if (!formData.usuarioNom || formData.usuarioNom.trim().length < 3) {
      errs.usuarioNom = !formData.usuarioNom ? 'Los nombres son obligatorios' : 'Mínimo 3 caracteres'
    }
    
    // Apellido paterno
    if (!formData.usuarioApePat || formData.usuarioApePat.trim().length < 3) {
      errs.usuarioApePat = !formData.usuarioApePat ? 'El apellido paterno es obligatorio' : 'Mínimo 3 caracteres'
    }
    
    // Apellido materno (opcional)
    if (formData.usuarioApeMat && formData.usuarioApeMat.trim().length < 3) {
      errs.usuarioApeMat = 'Mínimo 3 caracteres'
    }
    
    // Teléfono
    if (!formData.usuarioTel) {
      errs.usuarioTel = 'El teléfono es obligatorio'
    } else if (formData.usuarioTel.length !== 10) {
      errs.usuarioTel = 'Debe tener exactamente 10 dígitos'
    }
    
    // Fecha de nacimiento
    if (!formData.usuarioFechaNac) {
      errs.usuarioFechaNac = 'La fecha de nacimiento es obligatoria'
    } else {
      const hoy = new Date()
      const nac = new Date(formData.usuarioFechaNac)
      let edad = hoy.getFullYear() - nac.getFullYear()
      if (hoy < new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate())) edad--
      if (edad < 18) {
        errs.usuarioFechaNac = 'El arrendador debe ser mayor de 18 años'
      } else if (edad > 100) {
        errs.usuarioFechaNac = 'Fecha de nacimiento no válida'
      }
    }
    
    // ── DOCUMENTOS (si no está verificado) ────────────────────────────
    
    if (!isVerified) {
      // CURP
      if (!formData.usuarioCurp) {
        errs.usuarioCurp = 'El CURP es obligatorio'
      } else if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/.test(formData.usuarioCurp)) {
        errs.usuarioCurp = 'CURP inválido (4 letras, 6 números, 6 letras, 2 alfanuméricos)'
      }
      
      // RFC
      if (!formData.arrendadorRFC) {
        errs.arrendadorRFC = 'El RFC es obligatorio'
      } else if (!/^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/.test(formData.arrendadorRFC)) {
        errs.arrendadorRFC = 'RFC inválido (4 letras, 6 números, 3 alfanuméricos)'
      }
    }
    
    // ── DIRECCIÓN ─────────────────────────────────────────────────────
    
    if (!formData.cp || formData.cp.length !== 5) {
      errs.cp = !formData.cp ? 'El código postal es obligatorio' : 'El CP debe tener 5 dígitos'
    }
    
    if (!formData.colonia) {
      errs.colonia = 'Selecciona una colonia del listado'
    }
    
    if (!formData.municipio) {
      errs.municipio = 'Selecciona un municipio del listado'
    }
    
    if (!formData.estado) {
      errs.estado = 'Selecciona un estado del listado'
    }
    
    if (!formData.direccionCalle || formData.direccionCalle.trim().length < 3) {
      errs.direccionCalle = !formData.direccionCalle ? 'La calle es obligatoria' : 'Mínimo 3 caracteres'
    }
    
    if (!formData.direccionNumExt || formData.direccionNumExt.trim().length < 1) {
      errs.direccionNumExt = 'El número exterior es obligatorio'
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

    // ── ENVÍO AL BACKEND (LÓGICA ORIGINAL INTACTA) ────────────────────
    setSaving(true)
    setError('')
    
    const usuarioData = {
      usuarioNom: formData.usuarioNom.trim(),
      usuarioApePat: formData.usuarioApePat.trim(),
      usuarioApeMat: formData.usuarioApeMat.trim(),
      usuarioTel: formData.usuarioTel,
      usuarioFechaNac: formData.usuarioFechaNac,
      ...(!isVerified && { usuarioCurp: formData.usuarioCurp })
    }
    
    const arrendadorData = { arrendadorRFC: formData.arrendadorRFC }
    
    const direccionData = {
      calle: formData.direccionCalle.trim(),
      numExt: formData.direccionNumExt.trim(),
      numInt: formData.direccionNumInt.trim(),
      cp: formData.cp,
      colonia: formData.colonia,
      municipio: formData.municipio,
      estado: formData.estado
    }
    
    try {
      await updateArrendador(arrendador.idArrendador, usuarioData, arrendadorData, direccionData)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar')
    } finally { 
      setSaving(false) 
    }
  }

  return (
    <>
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">
          {arrendador ? 'Editar Arrendador' : 'Registrar Arrendador'}
        </h2>
        <button className="admin-modal-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-modal-body">
        {error && <div className="admin-form-notice error">{error}</div>}
        {isVerified && (
          <div className="admin-form-notice verified">
            ✓ Arrendador verificado — CURP, RFC y correo electrónico no se pueden editar.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <p className="admin-form-section">Datos Personales</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Nombres *</label>
              <input
                className={`admin-form-input${errors.usuarioNom ? ' is-error' : ''}`}
                name="usuarioNom" 
                value={formData.usuarioNom} 
                onChange={handleChange} 
                maxLength={35}
                placeholder="Ej: Juan Carlos"
              />
              <span className="admin-form-hint">Solo letras y espacios. Mínimo 3 caracteres</span>
              {errors.usuarioNom && <span className="admin-form-error">{errors.usuarioNom}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Ap. Paterno *</label>
              <input
                className={`admin-form-input${errors.usuarioApePat ? ' is-error' : ''}`}
                name="usuarioApePat" 
                value={formData.usuarioApePat} 
                onChange={handleChange} 
                maxLength={25}
                placeholder="Ej: Hernández"
              />
              <span className="admin-form-hint">Solo letras. Mínimo 3 caracteres</span>
              {errors.usuarioApePat && <span className="admin-form-error">{errors.usuarioApePat}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Ap. Materno (opcional)</label>
            <input 
              className={`admin-form-input${errors.usuarioApeMat ? ' is-error' : ''}`}
              name="usuarioApeMat" 
              value={formData.usuarioApeMat} 
              onChange={handleChange} 
              maxLength={25}
              placeholder="Ej: López"
            />
            <span className="admin-form-hint">Opcional. Solo letras</span>
            {errors.usuarioApeMat && <span className="admin-form-error">{errors.usuarioApeMat}</span>}
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Correo electrónico</label>
              <input 
                className="admin-form-input" 
                value={formData.usuarioCorreo} 
                disabled 
              />
              <span className="admin-form-hint">No modificable</span>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Teléfono *</label>
              <input
                className={`admin-form-input${errors.usuarioTel ? ' is-error' : ''}`}
                type="tel" 
                name="usuarioTel" 
                value={formData.usuarioTel} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 5512345678"
              />
              <span className="admin-form-hint">10 dígitos, solo números</span>
              {errors.usuarioTel && <span className="admin-form-error">{errors.usuarioTel}</span>}
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">CURP {!isVerified ? '*' : ''}</label>
              <input
                className={`admin-form-input${errors.usuarioCurp ? ' is-error' : ''}`}
                name="usuarioCurp" 
                value={formData.usuarioCurp} 
                onChange={handleChange} 
                disabled={isVerified} 
                maxLength={18}
                placeholder="Ej: HERS850101MDFRRN09"
              />
              {!isVerified && <span className="admin-form-hint">18 caracteres. Formato: 4 letras, 6 números, 6 letras, 2 alfanuméricos</span>}
              {isVerified && <span className="admin-form-hint">🔒 Verificado - No modificable</span>}
              {errors.usuarioCurp && <span className="admin-form-error">{errors.usuarioCurp}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">RFC {!isVerified ? '*' : ''}</label>
              <input
                className={`admin-form-input${errors.arrendadorRFC ? ' is-error' : ''}`}
                name="arrendadorRFC" 
                value={formData.arrendadorRFC} 
                onChange={handleChange} 
                disabled={isVerified} 
                maxLength={13}
                placeholder="Ej: HERS850101XXX"
              />
              {!isVerified && <span className="admin-form-hint">13 caracteres. Formato: 4 letras, 6 números, 3 alfanuméricos</span>}
              {isVerified && <span className="admin-form-hint">🔒 Verificado - No modificable</span>}
              {errors.arrendadorRFC && <span className="admin-form-error">{errors.arrendadorRFC}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Fecha de Nacimiento *</label>
            <input
              className={`admin-form-input${errors.usuarioFechaNac ? ' is-error' : ''}`}
              type="date" 
              name="usuarioFechaNac" 
              value={formData.usuarioFechaNac} 
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
            {errors.usuarioFechaNac && <span className="admin-form-error">{errors.usuarioFechaNac}</span>}
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
                className={`admin-form-input${errors.direccionCalle ? ' is-error' : ''}`} 
                name="direccionCalle" 
                value={formData.direccionCalle} 
                onChange={handleChange} 
                maxLength={35}
                placeholder="Ej: Av. Insurgentes"
              />
              <span className="admin-form-hint">Solo letras, números y espacios</span>
              {errors.direccionCalle && <span className="admin-form-error">{errors.direccionCalle}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Ext *</label>
              <input 
                className={`admin-form-input${errors.direccionNumExt ? ' is-error' : ''}`} 
                name="direccionNumExt" 
                value={formData.direccionNumExt} 
                onChange={handleChange} 
                maxLength={10}
                placeholder="Ej: 123"
              />
              <span className="admin-form-hint">Solo letras y números</span>
              {errors.direccionNumExt && <span className="admin-form-error">{errors.direccionNumExt}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Int</label>
              <input 
                className="admin-form-input" 
                name="direccionNumInt" 
                value={formData.direccionNumInt} 
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
        </form>
      </div>

      <div className="admin-modal-footer">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-save" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </>
  )
}

export default FormArrendador