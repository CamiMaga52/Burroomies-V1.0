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

const FormRegistroArrendador = ({ onClose, onSuccess }) => {
  const [enviando, setEnviando] = useState(false)
  const [sugerenciasCP, setSugerenciasCP] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [buscandoCP, setBuscandoCP] = useState(false)
  const [errors, setErrors] = useState({})
  const [validando, setValidando] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)

  const [formData, setFormData] = useState({
    nombres: '', apellidoPaterno: '', apellidoMaterno: '',
    correo: '', telefono: '', curp: '', fechaNacimiento: '',
    rfc: '', cp: '', calle: '', numExt: '', numInt: '',
    colonia: '', municipio: '', estado: '',
    password: '', confirmPassword: '',
  })

  const validarCampoUnico = async (campo, valor) => {
    if (!valor || valor.length < 3) return true
    setValidando(prev => ({ ...prev, [campo]: true }))
    try {
      const result = await validarCampo(campo, valor)
      if (result.existe) {
        const msgs = { correo: 'El correo ya está registrado', curp: 'El CURP ya está registrado', rfc: 'El RFC ya está registrado' }
        setErrors(prev => ({ ...prev, [campo]: msgs[campo] }))
        return false
      } else {
        setErrors(prev => ({ ...prev, [campo]: null }))
        return true
      }
    } catch { return true }
    finally { setValidando(prev => ({ ...prev, [campo]: false })) }
  }

  const handleBlur = async (e) => {
    const { name, value } = e.target
    if (['correo', 'curp', 'rfc'].includes(name)) await validarCampoUnico(name, value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    if (['nombres', 'apellidoPaterno', 'apellidoMaterno'].includes(name)) {
      v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '')
    }
    if (name === 'telefono') v = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'curp') v = value.toUpperCase().slice(0, 18)
    if (name === 'rfc') v = value.toUpperCase().slice(0, 13)
    setFormData(prev => ({ ...prev, [name]: v }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleCPChange = async (e) => {
    const cpNumeros = e.target.value.replace(/[^0-9]/g, '').slice(0, 5)
    setFormData(prev => ({ ...prev, cp: cpNumeros, colonia: '', municipio: '', estado: '' }))
    if (cpNumeros.length === 5) {
      setBuscandoCP(true)
      try {
        const resultados = await buscarCP(cpNumeros)
        if (resultados.length > 0) { setSugerenciasCP(resultados); setMostrarSugerencias(true) }
      } catch { } finally { setBuscandoCP(false) }
    } else { setSugerenciasCP([]); setMostrarSugerencias(false) }
  }

  const seleccionarDireccion = (d) => {
    setFormData(prev => ({ ...prev, cp: d.d_codigo, colonia: d.d_asenta, municipio: d.D_mnpio, estado: d.d_estado }))
    setMostrarSugerencias(false); setSugerenciasCP([])
  }

  const validarPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(p)

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
    if (!formData.nombres) errs.nombres = 'Obligatorio'
    if (!formData.apellidoPaterno) errs.apellidoPaterno = 'Obligatorio'
    if (!formData.apellidoMaterno) errs.apellidoMaterno = 'Obligatorio'
    if (!formData.correo) errs.correo = 'Obligatorio'
    else if (!validarDominio(formData.correo)) errs.correo = 'Usa Gmail, Hotmail, Outlook, Yahoo o correo IPN'
    if (!formData.telefono || formData.telefono.length !== 10) errs.telefono = 'Debe tener 10 dígitos'
    if (!formData.curp || formData.curp.length !== 18) errs.curp = 'Debe tener 18 caracteres'
    if (!formData.fechaNacimiento) errs.fechaNacimiento = 'Obligatorio'
    else if (calcularEdad(formData.fechaNacimiento) < 18) errs.fechaNacimiento = 'El arrendador debe ser mayor de 18 años'
    if (!formData.rfc || formData.rfc.length < 12) errs.rfc = 'RFC inválido (12-13 caracteres)'
    if (!formData.cp || formData.cp.length !== 5) errs.cp = 'Debe tener 5 dígitos'
    if (!formData.calle) errs.calle = 'Obligatorio'
    if (!formData.numExt) errs.numExt = 'Obligatorio'
    if (!formData.password) errs.password = 'Obligatorio'
    else if (!validarPassword(formData.password)) errs.password = 'Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo'
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const checks = await Promise.all([
      validarCampoUnico('correo', formData.correo),
      validarCampoUnico('curp', formData.curp),
      validarCampoUnico('rfc', formData.rfc),
    ])
    if (checks.includes(false)) return

    setEnviando(true)
    try {
      await createArrendador({
        nombres: formData.nombres, apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno, correo: formData.correo,
        telefono: formData.telefono, curp: formData.curp,
        fechaNacimiento: formData.fechaNacimiento, rfc: formData.rfc,
        calle: formData.calle, numExt: formData.numExt, numInt: formData.numInt,
        cp: formData.cp, colonia: formData.colonia, municipio: formData.municipio,
        estado: formData.estado, password: formData.password,
      })
      onSuccess()
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrar')
    } finally { setEnviando(false) }
  }

  return (
    <>
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
                name="nombres" value={formData.nombres} onChange={handleChange} maxLength={80}
              />
              {errors.nombres && <span className="admin-form-error">{errors.nombres}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Ap. Paterno *</label>
              <input
                className={`admin-form-input${errors.apellidoPaterno ? ' is-error' : ''}`}
                name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} maxLength={60}
              />
              {errors.apellidoPaterno && <span className="admin-form-error">{errors.apellidoPaterno}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Ap. Materno *</label>
            <input
              className={`admin-form-input${errors.apellidoMaterno ? ' is-error' : ''}`}
              name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} maxLength={60}
            />
            {errors.apellidoMaterno && <span className="admin-form-error">{errors.apellidoMaterno}</span>}
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">Correo *</label>
              <input
                className={`admin-form-input${errors.correo ? ' is-error' : ''}`}
                type="email" name="correo" value={formData.correo} onChange={handleChange} onBlur={handleBlur} maxLength={100}
              />
              {validando.correo && <span className="admin-form-hint">Validando...</span>}
              {errors.correo && <span className="admin-form-error">{errors.correo}</span>}
              {!errors.correo && <span className="admin-form-hint">Gmail, Hotmail, Outlook, Yahoo o IPN</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Teléfono * (10 dígitos)</label>
              <input
                className={`admin-form-input${errors.telefono ? ' is-error' : ''}`}
                type="tel" name="telefono" value={formData.telefono} onChange={handleChange} maxLength={10}
              />
              {errors.telefono && <span className="admin-form-error">{errors.telefono}</span>}
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-field">
              <label className="admin-form-label">CURP * (18 car.)</label>
              <input
                className={`admin-form-input${errors.curp ? ' is-error' : ''}`}
                name="curp" value={formData.curp} onChange={handleChange} onBlur={handleBlur} maxLength={18}
              />
              {validando.curp && <span className="admin-form-hint">Validando...</span>}
              {errors.curp && <span className="admin-form-error">{errors.curp}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">RFC * (12-13 car.)</label>
              <input
                className={`admin-form-input${errors.rfc ? ' is-error' : ''}`}
                name="rfc" value={formData.rfc} onChange={handleChange} onBlur={handleBlur} maxLength={13}
              />
              {errors.rfc && <span className="admin-form-error">{errors.rfc}</span>}
            </div>
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Fecha de Nacimiento *</label>
            <input
              className={`admin-form-input${errors.fechaNacimiento ? ' is-error' : ''}`}
              type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange}
              style={{ width: 'auto' }}
            />
            {errors.fechaNacimiento && <span className="admin-form-error">{errors.fechaNacimiento}</span>}
          </div>

          <p className="admin-form-section">Domicilio</p>

          <div className="grid-cp">
            <div className="admin-form-field" style={{ position: 'relative' }}>
              <label className="admin-form-label">C.P. *</label>
              <input
                className={`admin-form-input${errors.cp ? ' is-error' : ''}`}
                name="cp" value={formData.cp} onChange={handleCPChange} maxLength={5}
              />
              {buscandoCP && <span className="admin-form-hint">Buscando...</span>}
              {errors.cp && <span className="admin-form-error">{errors.cp}</span>}
              {mostrarSugerencias && sugerenciasCP.length > 0 && (
                <div className="cp-dropdown">
                  {sugerenciasCP.map((s, i) => (
                    <div key={i} className="cp-dropdown-item" onClick={() => seleccionarDireccion(s)}>
                      {s.d_asenta}, {s.D_mnpio}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Calle *</label>
              <input
                className={`admin-form-input${errors.calle ? ' is-error' : ''}`}
                name="calle" value={formData.calle} onChange={handleChange} maxLength={100}
              />
              {errors.calle && <span className="admin-form-error">{errors.calle}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Ext *</label>
              <input
                className={`admin-form-input${errors.numExt ? ' is-error' : ''}`}
                name="numExt" value={formData.numExt} onChange={handleChange} maxLength={10}
              />
              {errors.numExt && <span className="admin-form-error">{errors.numExt}</span>}
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">No. Int</label>
              <input className="admin-form-input" name="numInt" value={formData.numInt} onChange={handleChange} maxLength={10} />
            </div>
          </div>

          <div className="grid-3">
            {[['Colonia', 'colonia'], ['Municipio', 'municipio'], ['Estado', 'estado']].map(([lbl, key]) => (
              <div key={key} className="admin-form-field">
                <label className="admin-form-label">{lbl}</label>
                <input className="admin-form-input" value={formData[key]} disabled />
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
                  name="password" value={formData.password} onChange={handleChange} maxLength={64}
                  style={{ paddingRight: '2.5rem' }}
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
                  name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} maxLength={64}
                  style={{ paddingRight: '2.5rem' }}
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