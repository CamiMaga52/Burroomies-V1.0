import React, { useState, useEffect } from 'react'
import { getPropiedadCompleta, actualizarPropiedad, getServiciosCatalogo, buscarCP } from '../../services/propiedadService'
import '../../styles/Arrendador.css'

// ─── Lista de groserías ──────────────────────────────────────────────────────
const GROSERIAS = [
  'puto', 'puta', 'chinga', 'chingada', 'chingado', 'madre', 'verga', 'cabron', 'cabrón',
  'pendejo', 'pendeja', 'culero', 'culera', 'joto', 'jota', 'pinche', 'perra', 'perro',
  'mierda', 'idiota', 'estupido', 'estupida', 'imbecil', 'imbécil', 'pendejada',
  'chingon', 'chingón', 'mamada', 'mamon', 'mamón', 'nalgas', 'culo', 'pedo',
  'huevon', 'huevón', 'wey', 'guey', 'buey', 'pinchi', 'pvt0', 'pvt4', 'pt0', 'pt4',
  'm1erda', 'm13rda', 'ch1nga', 'ch1ng4', 'c4bron', 'c4br0n', 'p3nd3j0', 'p3nd3j4'
]

const contieneGroserias = (texto) => {
  const palabras = texto.toLowerCase().split(/\s+/)
  return palabras.some(palabra => GROSERIAS.includes(palabra))
}

const ModalDetalleVivienda = ({ propiedad, onClose, onUpdate }) => {
  const [editando, setEditando] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    propiedadTitulo: '',
    propiedadDescripcion: '',
    propiedadTipo: 'Departamento',
    propiedadLugares: 1,
    propiedadPrecio: '',
    propiedadPrecioPor: 'Persona',
    direccionCalle: '',
    direccionNumExt: '',
    direccionNumInt: '',
    cp: '',
    colonia: '',
    municipio: '',
    estado: ''
  })

  const [serviciosCatalogo, setServiciosCatalogo] = useState({ Basico: [], Entretenimiento: [], Adicional: [] })
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([])
  const [fotosExistentes, setFotosExistentes] = useState([])
  const [nuevasFotos, setNuevasFotos] = useState([])
  const [previewsNuevas, setPreviewsNuevas] = useState([])
  const [buscandoCP, setBuscandoCP] = useState(false)
  const [cpValido, setCpValido] = useState(null)
  const [arrendamientosActivos, setArrendamientosActivos] = useState(0)

  useEffect(() => {
    cargarDatosCompletos()
    cargarServicios()
  }, [propiedad.idPropiedad])

  const cargarDatosCompletos = async () => {
    setCargandoDatos(true)
    try {
      const data = await getPropiedadCompleta(propiedad.idPropiedad)
      setFormData({
        propiedadTitulo: data.propiedadTitulo || '',
        propiedadDescripcion: data.propiedadDescripcion || '',
        propiedadTipo: data.propiedadTipo || 'Departamento',
        propiedadLugares: data.propiedadLugares || 1,
        propiedadPrecio: data.propiedadPrecio || '',
        propiedadPrecioPor: data.propiedadPrecioPor || 'Persona',
        direccionCalle: data.direccion?.direccionCalle || '',
        direccionNumExt: data.direccion?.direccionNumExt || '',
        direccionNumInt: data.direccion?.direccionNumInt || '',
        cp: data.direccion?.cp?.d_codigo || '',
        colonia: data.direccion?.cp?.d_asenta || '',
        municipio: data.direccion?.cp?.D_mnpio || '',
        estado: data.direccion?.cp?.d_estado || ''
      })
      setFotosExistentes(data.fotos || [])
      if (data.servicios?.length > 0) setServiciosSeleccionados(data.servicios.map(s => s.idServicio))
      setArrendamientosActivos(data.arrendamientosActivos || 0)
      setCpValido(data.direccion?.cp?.d_codigo ? true : null)
    } catch { 
      setError('Error al cargar los datos de la propiedad') 
    } finally { 
      setCargandoDatos(false) 
    }
  }

  const cargarServicios = async () => {
    try { 
      const data = await getServiciosCatalogo()
      setServiciosCatalogo(data) 
    } catch { 
      /* silenced */ 
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value

    if (name === 'propiedadTitulo') {
      v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 30)
    }

    if (name === 'propiedadDescripcion') {
      v = value.slice(0, 200)
    }

    if (name === 'propiedadLugares') {
      v = value.replace(/[^0-9]/g, '')
      const num = parseInt(v)
      if (!isNaN(num) && num < arrendamientosActivos) v = String(arrendamientosActivos)
      if (!isNaN(num) && num > 8) v = '8'
    }

    if (name === 'propiedadPrecio') {
      v = value.replace(/[^0-9]/g, '')
      if (v && parseInt(v) > 25000) v = '25000'
    }

    if (name === 'cp') {
      v = value.replace(/[^0-9]/g, '').slice(0, 5)
    }

    if (name === 'direccionCalle') {
      v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.#]/g, '').slice(0, 60)
    }

    if (name === 'direccionNumExt' || name === 'direccionNumInt') {
      v = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    }

    setFormData({ ...formData, [name]: v })
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBuscarCP = async () => {
    if (formData.cp.length !== 5) return
    setBuscandoCP(true)
    setCpValido(null)
    setError('')
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.cp
      return newErrors
    })
    try {
      const data = await buscarCP(formData.cp)
      setFormData(prev => ({ ...prev, colonia: data.colonia, municipio: data.municipio, estado: data.estado }))
      setCpValido(true)
    } catch { 
      setCpValido(false)
      setFormData(prev => ({ ...prev, colonia: '', municipio: '', estado: '' }))
    } finally { 
      setBuscandoCP(false) 
    }
  }

  const toggleServicio = (id) => {
    setServiciosSeleccionados(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    if (errors.servicios) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.servicios
        return newErrors
      })
    }
  }

  const handleNuevasFotos = (e) => {
    const files = Array.from(e.target.files)
    const validos = ['image/jpeg', 'image/png', 'image/webp']
    
    const tipoInvalido = files.find(f => !validos.includes(f.type))
    if (tipoInvalido) {
      setError(`"${tipoInvalido.name}" no es válido. Solo JPG, PNG o WebP.`)
      return
    }
    
    const MAX_FOTO_MB = 2
    const MAX_FOTO_BYTES = MAX_FOTO_MB * 1024 * 1024
    const pesoExcedido = files.find(f => f.size > MAX_FOTO_BYTES)
    if (pesoExcedido) {
      const mb = (pesoExcedido.size / (1024 * 1024)).toFixed(1)
      setError(`"${pesoExcedido.name}" pesa ${mb} MB. Máximo ${MAX_FOTO_MB} MB.`)
      return
    }
    
    if (fotosExistentes.length + nuevasFotos.length + files.length > 10) { 
      setError('Máximo 10 fotos en total')
      return 
    }
    
    setError('')
    if (errors.fotos) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.fotos
        return newErrors
      })
    }
    setNuevasFotos(prev => [...prev, ...files])
    setPreviewsNuevas(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const eliminarFotoExistente = (idFoto) => {
    if (fotosExistentes.length - 1 + nuevasFotos.length < 3) { 
      setError('Debes mantener al menos 3 fotos')
      return 
    }
    setFotosExistentes(prev => prev.filter(f => f.idFotos !== idFoto))
  }

  const eliminarNuevaFoto = (index) => {
    setNuevasFotos(prev => prev.filter((_, i) => i !== index))
    setPreviewsNuevas(prev => { 
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index) 
    })
  }

  // ── Validación completa ──────────────────────────────────────────────────
  const validarFormulario = () => {
    const errs = {}
    const totalFotos = fotosExistentes.length + nuevasFotos.length
    
    // Título
    if (!formData.propiedadTitulo || formData.propiedadTitulo.trim().length === 0) {
      errs.propiedadTitulo = 'El título es obligatorio'
    } else if (formData.propiedadTitulo.trim().length < 6) {
      errs.propiedadTitulo = 'El título debe tener mínimo 6 caracteres'
    } else if (formData.propiedadTitulo.trim().length > 30) {
      errs.propiedadTitulo = 'El título no puede superar 30 caracteres'
    } else if (contieneGroserias(formData.propiedadTitulo)) {
      errs.propiedadTitulo = 'El título contiene palabras no permitidas'
    }
    
    // Descripción
    if (!formData.propiedadDescripcion || formData.propiedadDescripcion.trim().length === 0) {
      errs.propiedadDescripcion = 'La descripción es obligatoria'
    } else if (formData.propiedadDescripcion.trim().length < 20) {
      errs.propiedadDescripcion = `La descripción debe tener mínimo 20 caracteres (tienes ${formData.propiedadDescripcion.trim().length})`
    } else if (formData.propiedadDescripcion.trim().length > 200) {
      errs.propiedadDescripcion = 'La descripción no puede superar 200 caracteres'
    } else if (/^[0-9]/.test(formData.propiedadDescripcion.trim())) {
      errs.propiedadDescripcion = 'La descripción no puede iniciar con un número'
    } else if (contieneGroserias(formData.propiedadDescripcion)) {
      errs.propiedadDescripcion = 'La descripción contiene palabras no permitidas'
    }
    
    // Tipo
    if (!formData.propiedadTipo) {
      errs.propiedadTipo = 'Selecciona un tipo de propiedad'
    }
    
    // Lugares
    if (!formData.propiedadLugares || parseInt(formData.propiedadLugares) < 1) {
      errs.propiedadLugares = 'Debe tener al menos 1 lugar'
    } else if (parseInt(formData.propiedadLugares) > 8) {
      errs.propiedadLugares = 'Máximo 8 lugares permitidos'
    } else if (parseInt(formData.propiedadLugares) < arrendamientosActivos) {
      errs.propiedadLugares = `No puedes reducir a menos de ${arrendamientosActivos} (${arrendamientosActivos} arrendamiento(s) activo(s))`
    }
    
    // Precio
    if (!formData.propiedadPrecio || formData.propiedadPrecio === '') {
      errs.propiedadPrecio = 'El precio es obligatorio'
    } else if (isNaN(formData.propiedadPrecio) || parseFloat(formData.propiedadPrecio) < 1000) {
      errs.propiedadPrecio = 'El precio mínimo es $1,000 MXN'
    } else if (parseFloat(formData.propiedadPrecio) > 25000) {
      errs.propiedadPrecio = 'El precio máximo es $25,000 MXN'
    }
    
    // Precio por
    if (!formData.propiedadPrecioPor) {
      errs.propiedadPrecioPor = 'Selecciona el tipo de precio'
    }
    
    // CP
    if (!formData.cp || formData.cp.length === 0) {
      errs.cp = 'El código postal es obligatorio'
    } else if (formData.cp.length !== 5) {
      errs.cp = 'El código postal debe tener 5 dígitos'
    } else if (cpValido !== true && formData.cp !== formData.cpOriginal) {
      errs.cp = 'Debes buscar y validar el CP'
    }
    
    // Calle
    if (!formData.direccionCalle || formData.direccionCalle.trim().length < 3) {
      errs.direccionCalle = !formData.direccionCalle ? 'La calle es obligatoria' : 'Mínimo 3 caracteres'
    }
    
    // Número exterior
    if (!formData.direccionNumExt) {
      errs.direccionNumExt = 'El número exterior es obligatorio'
    }
    
    // Fotos
    if (totalFotos < 3) {
      errs.fotos = `Debes tener mínimo 3 fotos (tienes ${totalFotos})`
    }
    if (totalFotos > 10) {
      errs.fotos = 'Máximo 10 fotos permitidas'
    }
    
    // Servicios
    const basicosDisponibles = serviciosCatalogo.Basico || []
    if (basicosDisponibles.length > 0) {
      const tieneBasico = basicosDisponibles.some(s => serviciosSeleccionados.includes(s.idServicio))
      if (!tieneBasico) {
        errs.servicios = 'Debes seleccionar al menos un servicio básico'
      }
    }
    
    return errs
  }

  const handleGuardar = async () => {
    const errs = validarFormulario()
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setError('Por favor corrige los errores en el formulario')
      // ── SCROLL AL PRIMER ERROR ──────────────────────────────────────────
      setTimeout(() => {
        const primerError = document.querySelector('.arr-form-error')
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }
    
    setCargando(true)
    setError('')
    setMensaje('')
    setErrors({})
    
    try {
      const fd = new FormData()
      Object.keys(formData).forEach(k => { 
        if (formData[k] !== null && formData[k] !== undefined) fd.append(k, formData[k]) 
      })
      fd.append('servicios', JSON.stringify(serviciosSeleccionados))
      fd.append('fotosExistentes', JSON.stringify(fotosExistentes.map(f => f.idFotos)))
      nuevasFotos.forEach(f => fd.append('fotos', f))
      await actualizarPropiedad(propiedad.idPropiedad, fd)
      setMensaje('¡Propiedad actualizada exitosamente!')
      setTimeout(() => { onUpdate(); onClose() }, 1500)
    } catch (err) { 
      setError(err.response?.data?.error || 'Error al actualizar la propiedad') 
    } finally { 
      setCargando(false) 
    }
  }

  const todosLosServicios = [
    ...serviciosCatalogo.Basico,
    ...serviciosCatalogo.Entretenimiento,
    ...serviciosCatalogo.Adicional
  ]

  const inputCls = (field) => `arr-form-input${errors[field] ? ' is-error' : ''}`

  if (cargandoDatos) return (
    <div className="arr-modal-overlay">
      <div className="arr-modal arr-modal-md">
        <div className="arr-modal-body" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="arr-loading">Cargando datos de la propiedad...</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="arr-modal-overlay">
      <div className="arr-modal arr-modal-lg">
        <div className="arr-modal-header">
          <h3 className="arr-modal-title">
            {editando ? '✏️ Editar Vivienda' : `📋 ${formData.propiedadTitulo}`}
          </h3>
          <button className="arr-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="arr-modal-body">
          {!editando ? (
            // ── MODO VER ──────────────────────────────────────────────────
            <>
              <div className="arr-info-section">
                <p className="arr-info-section-title">🏠 Datos de la Propiedad</p>
                <div className="arr-info-grid">
                  <div className="arr-info-item">
                    <p className="arr-info-label">Tipo</p>
                    <p className="arr-info-value">{propiedad.propiedadTipo}</p>
                  </div>
                  <div className="arr-info-item">
                    <p className="arr-info-label">Precio</p>
                    <p className="arr-info-value price">${propiedad.propiedadPrecio}/mes</p>
                  </div>
                  <div className="arr-info-item">
                    <p className="arr-info-label">Lugares</p>
                    <p className="arr-info-value">{propiedad.lugaresDisponibles} disponibles / {propiedad.propiedadLugares} totales</p>
                  </div>
                  <div className="arr-info-item">
                    <p className="arr-info-label">Estatus</p>
                    <p className="arr-info-value">{propiedad.propiedadEstatus}</p>
                  </div>
                </div>
              </div>

              <div className="arr-info-section">
                <p className="arr-info-section-title">📍 Dirección</p>
                <div className="arr-info-grid cols-1">
                  <div className="arr-info-item">
                    <p className="arr-info-value">
                      {formData.direccionCalle} #{formData.direccionNumExt}
                      {formData.direccionNumInt && ` Int. ${formData.direccionNumInt}`}, Col. {formData.colonia}, {formData.municipio}, {formData.estado}, CP {formData.cp}
                    </p>
                  </div>
                </div>
              </div>

              <div className="arr-info-section">
                <p className="arr-info-section-title">📝 Descripción</p>
                <p className="arr-info-value">{propiedad.propiedadDescripcion}</p>
              </div>

              {fotosExistentes.length > 0 && (
                <div className="arr-info-section">
                  <p className="arr-info-section-title">📸 Fotos ({fotosExistentes.length})</p>
                  <div className="arr-foto-grid">
                    {fotosExistentes.map(foto => (
                      <div key={foto.idFotos} className="arr-foto-item">
                        <img src={foto.fotosURL.startsWith('http') ? foto.fotosURL : `http://localhost:5000${foto.fotosURL}`} alt="Foto" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {serviciosSeleccionados.length > 0 && (
                <div className="arr-info-section">
                  <p className="arr-info-section-title">🛠 Servicios ({serviciosSeleccionados.length})</p>
                  <div className="arr-service-tags">
                    {todosLosServicios.filter(s => serviciosSeleccionados.includes(s.idServicio)).map(s => (
                      <span key={s.idServicio} className="arr-service-tag">{s.servicioNombre}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // ── MODO EDICIÓN ──────────────────────────────────────────────
            <>
              {error && <div className="arr-alert arr-alert-error">⚠️ {error}</div>}
              {errors.servicios && <div className="arr-alert arr-alert-error" style={{ marginBottom: '1rem' }}>⚠️ {errors.servicios}</div>}
              
              <div className="arr-form-group">
                <label className="arr-form-label">Título <span style={{ color: '#dc2626' }}>*</span></label>
                <input 
                  type="text" 
                  name="propiedadTitulo" 
                  value={formData.propiedadTitulo} 
                  onChange={handleChange} 
                  className={inputCls('propiedadTitulo')}
                  maxLength={30}
                  placeholder="Ej: Loft moderno cerca de ESCOM"
                />
                <span className="arr-form-hint">Solo letras y espacios. Mínimo 6, máximo 30 caracteres</span>
                {errors.propiedadTitulo && <span className="arr-form-error">{errors.propiedadTitulo}</span>}
              </div>

              <div className="arr-form-group">
                <label className="arr-form-label">Descripción <span style={{ color: '#dc2626' }}>*</span></label>
                <textarea 
                  name="propiedadDescripcion" 
                  value={formData.propiedadDescripcion} 
                  onChange={handleChange} 
                  rows={3} 
                  className={`arr-form-textarea${errors.propiedadDescripcion ? ' is-error' : ''}`}
                  maxLength={200}
                  placeholder="Describe tu propiedad en al menos 20 caracteres"
                />
                <span className="arr-form-hint">{formData.propiedadDescripcion.length}/200 caracteres (mínimo 20)</span>
                {errors.propiedadDescripcion && <span className="arr-form-error">{errors.propiedadDescripcion}</span>}
              </div>

              <div className="arr-form-grid-3" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                <div className="arr-form-group">
                  <label className="arr-form-label">Tipo <span style={{ color: '#dc2626' }}>*</span></label>
                  <select name="propiedadTipo" value={formData.propiedadTipo} onChange={handleChange} className="arr-form-select">
                    <option value="Departamento">Departamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Habitación">Habitación</option>
                    <option value="Loft">Loft</option>
                    <option value="Estudio">Estudio</option>
                  </select>
                  {errors.propiedadTipo && <span className="arr-form-error">{errors.propiedadTipo}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Lugares <span style={{ color: '#dc2626' }}>*</span></label>
                  <input 
                    type="number" 
                    name="propiedadLugares" 
                    value={formData.propiedadLugares} 
                    onChange={handleChange} 
                    min={arrendamientosActivos > 0 ? arrendamientosActivos : 1} 
                    max="8" 
                    className={inputCls('propiedadLugares')}
                  />
                  <span className="arr-form-hint">Mínimo 1, máximo 8</span>
                  {arrendamientosActivos > 0 && (
                    <span className="arr-form-hint" style={{ color: '#b45309', fontSize: '0.75rem' }}>
                      ⚠️ Mínimo {arrendamientosActivos} ({arrendamientosActivos} arrendamiento{arrendamientosActivos > 1 ? 's' : ''} activo{arrendamientosActivos > 1 ? 's' : ''})
                    </span>
                  )}
                  {errors.propiedadLugares && <span className="arr-form-error">{errors.propiedadLugares}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Precio ($) <span style={{ color: '#dc2626' }}>*</span></label>
                  <input 
                    type="number" 
                    name="propiedadPrecio" 
                    value={formData.propiedadPrecio} 
                    onChange={handleChange} 
                    min="1000" 
                    max="25000" 
                    className={inputCls('propiedadPrecio')}
                    placeholder="Ej: 3500"
                  />
                  <span className="arr-form-hint">$1,000 - $25,000</span>
                  {errors.propiedadPrecio && <span className="arr-form-error">{errors.propiedadPrecio}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Precio por <span style={{ color: '#dc2626' }}>*</span></label>
                  <select name="propiedadPrecioPor" value={formData.propiedadPrecioPor} onChange={handleChange} className="arr-form-select">
                    <option value="Persona">Por persona</option>
                    <option value="Habitación">Por habitación</option>
                    <option value="Propiedad">Propiedad completa</option>
                  </select>
                  {errors.propiedadPrecioPor && <span className="arr-form-error">{errors.propiedadPrecioPor}</span>}
                </div>
              </div>

              {/* Dirección */}
              <div className="arr-form-card" style={{ marginBottom: '1rem', boxShadow: 'none', border: '1px solid var(--gray-100)' }}>
                <div className="arr-form-card-header" style={{ padding: '0.75rem 1rem' }}>
                  <div className="arr-form-card-header-icon" style={{ width: 28, height: 28, fontSize: '0.85rem' }}>📍</div>
                  <div><h3 style={{ fontSize: '0.9rem' }}>Dirección</h3></div>
                </div>
                <div className="arr-form-card-body" style={{ padding: '1rem' }}>
                  <div className="arr-cp-row" style={{ marginBottom: '0.75rem' }}>
                    <div className="arr-form-group" style={{ marginBottom: 0 }}>
                      <input 
                        type="text" 
                        name="cp" 
                        value={formData.cp} 
                        onChange={handleChange} 
                        maxLength="5" 
                        placeholder="Código Postal" 
                        className={inputCls('cp')}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={handleBuscarCP} 
                      disabled={buscandoCP || formData.cp.length !== 5} 
                      className="arr-btn-ghost arr-btn-sm" 
                      style={{ height: '44px', flexShrink: 0 }}
                    >
                      {buscandoCP ? '⏳...' : '🔍 Buscar CP'}
                    </button>
                  </div>
                  <span className="arr-form-hint">5 dígitos</span>
                  {cpValido === true && <span className="arr-form-hint" style={{ color: '#16a34a' }}>✓ CP válido</span>}
                  {cpValido === false && <span className="arr-form-error">✗ CP no aceptado</span>}
                  {errors.cp && <span className="arr-form-error">{errors.cp}</span>}
                  
                  <div className="arr-form-grid-3" style={{ marginTop: '0.5rem' }}>
                    <div className="arr-form-group" style={{ gridColumn: '1 / 3' }}>
                      <input 
                        type="text" 
                        name="direccionCalle" 
                        value={formData.direccionCalle} 
                        onChange={handleChange} 
                        placeholder="Calle" 
                        className={inputCls('direccionCalle')}
                      />
                      {errors.direccionCalle && <span className="arr-form-error">{errors.direccionCalle}</span>}
                    </div>
                    <div className="arr-form-group">
                      <input 
                        type="text" 
                        name="direccionNumExt" 
                        value={formData.direccionNumExt} 
                        onChange={handleChange} 
                        placeholder="# Ext" 
                        className={inputCls('direccionNumExt')}
                        maxLength={5}
                      />
                      {errors.direccionNumExt && <span className="arr-form-error">{errors.direccionNumExt}</span>}
                    </div>
                  </div>
                  <div className="arr-form-group">
                    <input 
                      type="text" 
                      name="direccionNumInt" 
                      value={formData.direccionNumInt} 
                      onChange={handleChange} 
                      placeholder="# Interior (opcional)" 
                      className="arr-form-input"
                      maxLength={5}
                    />
                  </div>
                  {formData.colonia && (
                    <div className="arr-address-auto" style={{ fontSize: '0.85rem', color: '#374151', padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '8px', marginTop: '0.5rem' }}>
                      🔒 Col. {formData.colonia}, {formData.municipio}, {formData.estado}
                    </div>
                  )}
                </div>
              </div>

              {/* Servicios */}
              <div className="arr-form-group">
                <label className="arr-form-label">Servicios</label>
                {Object.keys(serviciosCatalogo).map(cat => (
                  <div key={cat} className="arr-services-section">
                    <p className="arr-services-cat-title">
                      {cat === 'Basico' ? '🔧 Básicos (mínimo 1 obligatorio)' : 
                       cat === 'Entretenimiento' ? '📺 Entretenimiento (Opcional)' : 
                       '✨ Adicionales (Opcional)'}
                    </p>
                    <div className="arr-services-grid">
                      {serviciosCatalogo[cat].map(s => (
                        <label
                          key={s.idServicio}
                          className={`arr-service-chip${serviciosSeleccionados.includes(s.idServicio) ? ' selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={serviciosSeleccionados.includes(s.idServicio)}
                            onChange={() => toggleServicio(s.idServicio)}
                          />
                          {serviciosSeleccionados.includes(s.idServicio) ? '✓' : '○'} {s.servicioNombre}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fotos */}
              <div className="arr-form-group">
                <label className="arr-form-label">
                  Fotos ({fotosExistentes.length + nuevasFotos.length}/10) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <span className="arr-form-hint">Mínimo 3, máximo 10. JPG, PNG o WebP. Máx. 2 MB por foto</span>

                {fotosExistentes.length > 0 && (
                  <div className="arr-foto-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
                    {fotosExistentes.map(foto => (
                      <div key={foto.idFotos} className="arr-foto-item">
                        <img src={foto.fotosURL.startsWith('http') ? foto.fotosURL : `http://localhost:5000${foto.fotosURL}`} alt="Foto" />
                        <button type="button" className="arr-foto-remove" onClick={() => eliminarFotoExistente(foto.idFotos)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}

                {previewsNuevas.length > 0 && (
                  <div className="arr-foto-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
                    {previewsNuevas.map((p, i) => (
                      <div key={i} className="arr-foto-item">
                        <img src={p} alt="Nueva" />
                        <button type="button" className="arr-foto-remove" onClick={() => eliminarNuevaFoto(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="arr-upload-zone" style={{ marginTop: '0.75rem' }}>
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleNuevasFotos} />
                  <span className="arr-upload-label">📤 Agregar más fotos</span>
                  <span className="arr-upload-hint">JPG, PNG o WebP · Máx. 2 MB por imagen</span>
                </label>
                {errors.fotos && <span className="arr-form-error" style={{ marginTop: '0.5rem', display: 'block' }}>{errors.fotos}</span>}
              </div>

              {mensaje && <div className="arr-alert arr-alert-success">✅ {mensaje}</div>}
            </>
          )}
        </div>

        <div className="arr-modal-footer">
          {!editando ? (
            <>
              <button className="arr-btn-ghost arr-btn-sm" onClick={onClose}>Cerrar</button>
              <button className="arr-btn-primary arr-btn-sm" onClick={() => { setEditando(true); setError(''); setErrors({}) }}>✏️ Editar Propiedad</button>
            </>
          ) : (
            <>
              <button
                className="arr-btn-ghost arr-btn-sm"
                onClick={() => { setEditando(false); setError(''); setErrors({}); cargarDatosCompletos() }}
              >
                Cancelar
              </button>
              <button className="arr-btn-primary arr-btn-sm" disabled={cargando} onClick={handleGuardar}>
                {cargando ? '⏳ Guardando...' : '💾 Guardar Cambios'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalDetalleVivienda