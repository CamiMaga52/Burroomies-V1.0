import React, { useState, useEffect } from 'react'
import { updatePropiedad } from '../../services/adminService'
import './admin.css'

const FormPropiedad = ({ propiedad, onClose, onSuccess }) => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    propiedadTitulo: '', propiedadDescripcion: '', propiedadTipo: '',
    propiedadLugares: '', propiedadPrecio: '', propiedadEstatus: 'Disponible'
  })

  useEffect(() => {
    if (propiedad) {
      setFormData({
        propiedadTitulo: propiedad.propiedadTitulo || '',
        propiedadDescripcion: propiedad.propiedadDescripcion || '',
        propiedadTipo: propiedad.propiedadTipo || '',
        propiedadLugares: propiedad.propiedadLugares || '',
        propiedadPrecio: propiedad.propiedadPrecio || '',
        propiedadEstatus: propiedad.propiedadEstatus || 'Disponible'
      })
    }
  }, [propiedad])

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    if (name === 'propiedadTitulo')
      v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 43)
    if (name === 'propiedadDescripcion')
      v = value.slice(0, 200)
    if (name === 'propiedadLugares') {
      v = value.replace(/[^0-9]/g, '').slice(0, 2)
      const n = parseInt(v)
      if (!isNaN(n) && n > 10) v = '10'
      if (!isNaN(n) && n < 1) v = '1'
    }
    if (name === 'propiedadPrecio') {
      v = value.replace(/[^0-9.]/g, '')
      const parts = v.split('.')
      if (parts.length > 2) v = parts[0] + '.' + parts.slice(1).join('')
      if (parts[1] && parts[1].length > 2) v = parts[0] + '.' + parts[1].slice(0, 2)
      if (v && parseFloat(v) > 25000) v = '25000'
    }
    setFormData(prev => ({ ...prev, [name]: v }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!formData.propiedadTitulo || formData.propiedadTitulo.trim().length < 3) errs.propiedadTitulo = 'Mínimo 3 caracteres'
    else if (formData.propiedadTitulo.trim().length > 43) errs.propiedadTitulo = 'Máximo 43 caracteres'
    if (!formData.propiedadDescripcion || formData.propiedadDescripcion.trim().length < 10) errs.propiedadDescripcion = 'Mínimo 10 caracteres'
    else if (formData.propiedadDescripcion.trim().length > 200) errs.propiedadDescripcion = 'Máximo 200 caracteres'
    if (!formData.propiedadTipo) errs.propiedadTipo = 'Selecciona un tipo'
    if (!formData.propiedadLugares || parseInt(formData.propiedadLugares) < 1) errs.propiedadLugares = 'Debe ser al menos 1'
    else if (parseInt(formData.propiedadLugares) > 10) errs.propiedadLugares = 'Máximo 10 lugares'
    if (!formData.propiedadPrecio || parseFloat(formData.propiedadPrecio) < 1000) errs.propiedadPrecio = 'El precio mínimo es $1,000'
    else if (parseFloat(formData.propiedadPrecio) > 25000) errs.propiedadPrecio = 'El precio máximo es $25,000'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSaving(true); setError('')
    try {
      await updatePropiedad(propiedad.idPropiedad, {
        propiedadTitulo: formData.propiedadTitulo,
        propiedadDescripcion: formData.propiedadDescripcion,
        propiedadTipo: formData.propiedadTipo,
        propiedadLugares: parseInt(formData.propiedadLugares),
        propiedadPrecio: parseFloat(formData.propiedadPrecio),
        propiedadEstatus: formData.propiedadEstatus
      })
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar')
    } finally { setSaving(false) }
  }

  return (
    <>
      <div className="admin-modal-header">
        <h2 className="admin-modal-title">Editar Propiedad</h2>
        <button className="admin-modal-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-modal-body">
        {error && <div className="admin-form-notice error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-field">
            <label className="admin-form-label">Título *</label>
            <input
              className={`admin-form-input${errors.propiedadTitulo ? ' is-error' : ''}`}
              name="propiedadTitulo" value={formData.propiedadTitulo} onChange={handleChange} maxLength={45}
            />
            {errors.propiedadTitulo && <span className="admin-form-error">{errors.propiedadTitulo}</span>}
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Descripción *</label>
            <textarea
              className={`admin-form-input${errors.propiedadDescripcion ? ' is-error' : ''}`}
              name="propiedadDescripcion" value={formData.propiedadDescripcion} onChange={handleChange}
              maxLength={300} rows={3} style={{ resize: 'vertical', minHeight: '80px' }}
            />
            {errors.propiedadDescripcion && <span className="admin-form-error">{errors.propiedadDescripcion}</span>}
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Tipo *</label>
              <select
                className={`admin-form-input${errors.propiedadTipo ? ' is-error' : ''}`}
                name="propiedadTipo" value={formData.propiedadTipo} onChange={handleChange}
              >
                <option value="">Selecciona</option>
                {['Casa', 'Departamento', 'Habitación', 'Loft', 'Estudio'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.propiedadTipo && <span className="admin-form-error">{errors.propiedadTipo}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Estatus *</label>
              <select className="admin-form-input" name="propiedadEstatus" value={formData.propiedadEstatus} onChange={handleChange}>
                <option value="Disponible">Disponible</option>
                <option value="Sin Disponibilidad">Sin Disponibilidad</option>
                <option value="Desactivada">Desactivada</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Lugares *</label>
              <input
                className={`admin-form-input${errors.propiedadLugares ? ' is-error' : ''}`}
                type="number" name="propiedadLugares" value={formData.propiedadLugares} onChange={handleChange} min={1} max={10}
              />
              {errors.propiedadLugares && <span className="admin-form-error">{errors.propiedadLugares}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Precio mensual (MXN) *</label>
              <input
                className={`admin-form-input${errors.propiedadPrecio ? ' is-error' : ''}`}
                type="number" name="propiedadPrecio" value={formData.propiedadPrecio} onChange={handleChange} min={1000} max={25000} step="0.01"
              />
              {errors.propiedadPrecio && <span className="admin-form-error">{errors.propiedadPrecio}</span>}
              <span className="admin-form-hint">Entre $1,000 y $25,000 MXN</span>
            </div>
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

export default FormPropiedad