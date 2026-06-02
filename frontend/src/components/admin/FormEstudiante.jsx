import React, { useState, useEffect } from 'react'
import { getUnidadesAcademicas, getCarrerasByUnidad } from '../../services/catalogosService'
import { updateArrendatario } from '../../services/adminService'
import './admin.css'

const FormEstudiante = ({ arrendatario, onClose, onSuccess }) => {
  const [unidades, setUnidades] = useState([])
  const [carreras, setCarreras] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  const isVerified = arrendatario?.arrendatarioVerificado === 1

  const [formData, setFormData] = useState({
    usuarioNom: '', usuarioApePat: '', usuarioApeMat: '',
    usuarioCorreo: '', usuarioTel: '', usuarioCurp: '',
    usuarioFechaNac: '', arrendatarioBoleta: '',
    carrera_idCarrera: '', escuelaId: ''
  })

  useEffect(() => {
    if (arrendatario) {
      setFormData({
        usuarioNom: arrendatario.usuario?.usuarioNom || '',
        usuarioApePat: arrendatario.usuario?.usuarioApePat || '',
        usuarioApeMat: arrendatario.usuario?.usuarioApeMat || '',
        usuarioCorreo: arrendatario.usuario?.usuarioCorreo || '',
        usuarioTel: arrendatario.usuario?.usuarioTel || '',
        usuarioCurp: arrendatario.usuario?.usuarioCurp || '',
        usuarioFechaNac: arrendatario.usuario?.usuarioFechaNac || '',
        arrendatarioBoleta: arrendatario.arrendatarioBoleta || '',
        carrera_idCarrera: arrendatario.carrera_idCarrera || '',
        escuelaId: arrendatario.carrera?.unidadAcademica?.idUnidadAcademica || ''
      })
      if (arrendatario.carrera?.unidadAcademica?.idUnidadAcademica) cargarCarreras(arrendatario.carrera.unidadAcademica.idUnidadAcademica)
    }
  }, [arrendatario])

  useEffect(() => {
    const cargar = async () => {
      try { const data = await getUnidadesAcademicas(); setUnidades(data) } catch { }
    }
    cargar()
  }, [])

  const cargarCarreras = async (id) => {
    setLoading(true)
    try { const data = await getCarrerasByUnidad(id); setCarreras(data) } catch { }
    finally { setLoading(false) }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    
    // Aplicar restricciones de entrada
    if (name === 'usuarioNom') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 35)
    if (name === 'usuarioApePat') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'usuarioApeMat') v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').slice(0, 25)
    if (name === 'usuarioTel') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'usuarioCurp') v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 18)
    if (name === 'arrendatarioBoleta') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    
    setFormData(prev => ({ ...prev, [name]: v }))
    
    if (name === 'escuelaId') {
      setFormData(prev => ({ ...prev, escuelaId: v, carrera_idCarrera: '' }))
      cargarCarreras(v)
      return
    }
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // ─── Helper: ¿Es válido el formulario? ──────────────────────────────────
  const esFormularioValido = () => {
    const nom = formData.usuarioNom.trim()
    const ape = formData.usuarioApePat.trim()
    const tel = formData.usuarioTel.trim()
    const fecha = formData.usuarioFechaNac
    const escuela = formData.escuelaId
    const carrera = formData.carrera_idCarrera

    // Validaciones básicas obligatorias para todos
    const basicoOk = (
      nom.length >= 3 &&
      ape.length >= 3 &&
      tel.length === 10 &&
      fecha &&
      escuela &&
      carrera
    )

    if (!basicoOk) return false

    // Si no está verificado, CURP y boleta también son obligatorios
    if (!isVerified) {
      const curp = formData.usuarioCurp.trim()
      const boleta = formData.arrendatarioBoleta.trim()
      if (curp.length !== 18 || boleta.length !== 10) return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    
    // ── VALIDACIONES MEJORADAS ────────────────────────────
    
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
      if (edad < 17) errs.usuarioFechaNac = 'El estudiante debe tener al menos 17 años'
      else if (edad > 100) errs.usuarioFechaNac = 'Fecha de nacimiento no válida'
    }
    
    // CURP (si no está verificado)
    if (!isVerified) {
      if (!formData.usuarioCurp) {
        errs.usuarioCurp = 'El CURP es obligatorio'
      } else if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/.test(formData.usuarioCurp)) {
        errs.usuarioCurp = 'CURP inválido (4 letras, 6 números, 6 letras, 2 alfanuméricos)'
      }
    }
    
    // Escuela y carrera
    if (!formData.escuelaId) errs.escuelaId = 'Selecciona una escuela'
    if (!formData.carrera_idCarrera) errs.carrera_idCarrera = 'Selecciona una carrera'
    
    // Boleta (si no está verificado)
    if (!isVerified) {
      if (!formData.arrendatarioBoleta) {
        errs.arrendatarioBoleta = 'La boleta es obligatoria'
      } else if (formData.arrendatarioBoleta.length !== 10) {
        errs.arrendatarioBoleta = 'La boleta debe tener exactamente 10 dígitos'
      }
    }
    
    // ── MOSTRAR ERRORES CON SCROLL ──────────────────────
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll al primer error
      setTimeout(() => {
        const primerError = document.querySelector('.admin-form-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // ── ENVÍO AL BACKEND (LÓGICA ORIGINAL) ─────────────
    setSaving(true)
    setError('')
    
    const usuarioData = {
      usuarioNom: formData.usuarioNom,
      usuarioApePat: formData.usuarioApePat,
      usuarioApeMat: formData.usuarioApeMat,
      usuarioTel: formData.usuarioTel,
      usuarioFechaNac: formData.usuarioFechaNac,
      ...(!isVerified && { usuarioCurp: formData.usuarioCurp })
    }
    
    const arrendatarioData = {
      arrendatarioBoleta: formData.arrendatarioBoleta,
      carrera_idCarrera: formData.carrera_idCarrera
    }
    
    try {
      await updateArrendatario(arrendatario.idArrendatario, usuarioData, arrendatarioData)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar')
    } finally { 
      setSaving(false) 
    }
  }

  // ─── Botón deshabilitado ──────────────────────────────────────────────
  const botonDeshabilitado = saving || !esFormularioValido()

  return (
    <>
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">
          {arrendatario ? 'Editar Estudiante' : 'Registrar Estudiante'}
        </h2>
        <button className="admin-modal-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-modal-body">
        {error && <div className="admin-form-notice error">{error}</div>}
        {isVerified && (
          <div className="admin-form-notice verified">
            ✓ Estudiante verificado — CURP, boleta, correo electrónico y nombre de usuario no se pueden editar.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <p className="admin-form-section">Datos Personales</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Nombres *</label>
              <input
                className={`admin-form-input${errors.usuarioNom ? ' is-error' : ''}`}
                name="usuarioNom" value={formData.usuarioNom} onChange={handleChange} maxLength={35}
                placeholder="Ej: Juan Carlos"
              />
              <span className="admin-form-hint">Solo letras y espacios. Mínimo 3 caracteres</span>
              {errors.usuarioNom && <span className="admin-form-error">{errors.usuarioNom}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Ap. Paterno *</label>
              <input
                className={`admin-form-input${errors.usuarioApePat ? ' is-error' : ''}`}
                name="usuarioApePat" value={formData.usuarioApePat} onChange={handleChange} maxLength={25}
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
              name="usuarioApeMat" value={formData.usuarioApeMat} onChange={handleChange} maxLength={25}
              placeholder="Ej: López"
            />
            <span className="admin-form-hint">Opcional. Solo letras</span>
            {errors.usuarioApeMat && <span className="admin-form-error">{errors.usuarioApeMat}</span>}
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Correo electrónico</label>
              <input className="admin-form-input" value={formData.usuarioCorreo} disabled />
              <span className="admin-form-hint">No modificable</span>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Teléfono * (10 dígitos)</label>
              <input
                className={`admin-form-input${errors.usuarioTel ? ' is-error' : ''}`}
                type="tel" name="usuarioTel" value={formData.usuarioTel} onChange={handleChange} maxLength={10}
                placeholder="Ej: 5512345678"
              />
              <span className="admin-form-hint">Solo números. Exactamente 10 dígitos</span>
              {errors.usuarioTel && <span className="admin-form-error">{errors.usuarioTel}</span>}
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">CURP {!isVerified ? '*' : ''}</label>
              <input
                className={`admin-form-input${errors.usuarioCurp ? ' is-error' : ''}`}
                name="usuarioCurp" value={formData.usuarioCurp} onChange={handleChange} disabled={isVerified} maxLength={18}
                placeholder="Ej: HERS850101MDFRRN09"
              />
              {!isVerified && <span className="admin-form-hint">Formato: 4 letras, 6 números, 6 letras, 2 alfanuméricos</span>}
              {isVerified && <span className="admin-form-hint">🔒 Verificado - No modificable</span>}
              {errors.usuarioCurp && <span className="admin-form-error">{errors.usuarioCurp}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Fecha de Nacimiento *</label>
              <input
                className={`admin-form-input${errors.usuarioFechaNac ? ' is-error' : ''}`}
                type="date" name="usuarioFechaNac" value={formData.usuarioFechaNac} onChange={handleChange}
                max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 17); return d.toISOString().split('T')[0] })()}
                min={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 100); return d.toISOString().split('T')[0] })()}
              />
              <span className="admin-form-hint">Debe tener al menos 17 años</span>
              {errors.usuarioFechaNac && <span className="admin-form-error">{errors.usuarioFechaNac}</span>}
            </div>
          </div>

          <p className="admin-form-section">Datos Académicos</p>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Escuela *</label>
              <select 
                className={`admin-form-input${errors.escuelaId ? ' is-error' : ''}`} 
                name="escuelaId" value={formData.escuelaId} onChange={handleChange}
              >
                <option value="">Selecciona una escuela</option>
                {unidades.map(u => (
                  <option key={u.idUnidadAcademica} value={u.idUnidadAcademica}>
                    {u.unidadAcademicaNombre} ({u.unidadAcademicaClave})
                  </option>
                ))}
              </select>
              {errors.escuelaId && <span className="admin-form-error">{errors.escuelaId}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Carrera *</label>
              <select
                className={`admin-form-input${errors.carrera_idCarrera ? ' is-error' : ''}`}
                name="carrera_idCarrera" value={formData.carrera_idCarrera} onChange={handleChange}
                disabled={!formData.escuelaId || loading}
              >
                <option value="">{loading ? 'Cargando carreras...' : 'Selecciona una carrera'}</option>
                {carreras.map(c => (
                  <option key={c.idCarrera} value={c.idCarrera}>
                    {c.carreraNombre} ({c.carreraClave})
                  </option>
                ))}
              </select>
              {errors.carrera_idCarrera && <span className="admin-form-error">{errors.carrera_idCarrera}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Boleta {!isVerified ? '*' : ''}</label>
            <input
              className={`admin-form-input${errors.arrendatarioBoleta ? ' is-error' : ''}`}
              name="arrendatarioBoleta" value={formData.arrendatarioBoleta} onChange={handleChange}
              disabled={isVerified} maxLength={10}
              placeholder="Ej: 2024030001"
            />
            {!isVerified && <span className="admin-form-hint">10 dígitos, solo números</span>}
            {isVerified && <span className="admin-form-hint">🔒 Verificado - No modificable</span>}
            {errors.arrendatarioBoleta && <span className="admin-form-error">{errors.arrendatarioBoleta}</span>}
          </div>
        </form>
      </div>

      <div className="admin-modal-footer">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button 
          className="btn-save" 
          onClick={handleSubmit} 
          disabled={botonDeshabilitado}
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </>
  )
}

export default FormEstudiante