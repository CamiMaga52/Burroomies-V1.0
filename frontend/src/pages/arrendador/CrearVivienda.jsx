import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarArrendador from '../../components/common/NavbarArrendador'
import FooterInicio from '../../components/common/FooterInicio'
import { getServiciosCatalogo, buscarCP, crearPropiedad } from '../../services/propiedadService'
import '../../styles/Arrendador.css'

// ─── Lista de groserías para filtrar ──────────────────────────────────────
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

const CrearVivienda = () => {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
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

  const [servicios, setServicios] = useState({ Basico: [], Entretenimiento: [], Adicional: [] })
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([])
  const [fotos, setFotos] = useState([])
  const [previews, setPreviews] = useState([])
  const [buscandoCP, setBuscandoCP] = useState(false)
  const [cpValido, setCpValido] = useState(null)

  useEffect(() => { cargarServicios() }, [])

  const cargarServicios = async () => {
    try {
      const data = await getServiciosCatalogo()
      setServicios(data)
    } catch {
      setError('No se pudieron cargar los servicios. Por favor recarga la página.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    
    // ── Restricciones de entrada ──────────────────────────────────────────
    if (name === 'propiedadTitulo') {
      v = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '').slice(0, 30)
    }
    else if (name === 'propiedadDescripcion') {
      v = value.slice(0, 200)
    }
    else if (name === 'propiedadLugares') {
      v = value.replace(/[^0-9]/g, '')
      if (v) { const n = parseInt(v); if (n < 1) v = '1'; if (n > 8) v = '8' }
    }
    else if (name === 'propiedadPrecio') {
      v = value.replace(/[^0-9]/g, '')
      if (v && parseInt(v) > 25000) v = '25000'
    }
    else if (name === 'cp') {
      v = value.replace(/[^0-9]/g, '').slice(0, 5)
    }
    else if (name === 'direccionCalle') {
      v = value.slice(0, 100)
    }
    else if (name === 'direccionNumExt' || name === 'direccionNumInt') {
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
    } finally { setBuscandoCP(false) }
  }

  const toggleServicio = (id) => {
    setServiciosSeleccionados(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    // Limpiar error de servicios al seleccionar/deseleccionar
    if (errors.servicios) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.servicios
        return newErrors
      })
    }
  }

  const MAX_FOTO_MB = 2
  const MAX_FOTO_BYTES = MAX_FOTO_MB * 1024 * 1024

  const handleFotosChange = (e) => {
    const files = Array.from(e.target.files)
    const validos = ['image/jpeg', 'image/png', 'image/webp']

    const tipoInvalido = files.find(f => !validos.includes(f.type))
    if (tipoInvalido) {
      setError(`"${tipoInvalido.name}" no es válido. Solo se permiten imágenes JPG, PNG o WebP.`)
      return
    }

    const pesoExcedido = files.find(f => f.size > MAX_FOTO_BYTES)
    if (pesoExcedido) {
      const mb = (pesoExcedido.size / (1024 * 1024)).toFixed(1)
      setError(`"${pesoExcedido.name}" pesa ${mb} MB. El máximo permitido por foto es ${MAX_FOTO_MB} MB.`)
      return
    }

    if (files.length + fotos.length > 10) { 
      setError('Máximo 10 fotos permitidas')
      return 
    }

    setError('')
    setFotos(prev => [...prev, ...files])
    if (errors.fotos) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.fotos
        return newErrors
      })
    }
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const eliminarFoto = (index) => {
    setFotos(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => { 
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index) 
    })
  }

  // ── Validación COMPLETA con nuevos requisitos ────────────────────────────
  const validarFormulario = () => {
    const errs = {}
    
    // ── TÍTULO ────────────────────────────────────────────────────────────
    if (!formData.propiedadTitulo || formData.propiedadTitulo.trim().length === 0) {
      errs.propiedadTitulo = 'El título es obligatorio'
    } else if (formData.propiedadTitulo.trim().length < 6) {
      errs.propiedadTitulo = 'El título debe tener mínimo 6 caracteres'
    } else if (formData.propiedadTitulo.trim().length > 30) {
      errs.propiedadTitulo = 'El título no puede superar 30 caracteres'
    } else if (!/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/.test(formData.propiedadTitulo)) {
      errs.propiedadTitulo = 'El título debe contener al menos una letra'
    } else if (contieneGroserias(formData.propiedadTitulo)) {
      errs.propiedadTitulo = 'El título contiene palabras no permitidas'
    }
    
    // ── DESCRIPCIÓN ───────────────────────────────────────────────────────
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
    
    // ── TIPO ──────────────────────────────────────────────────────────────
    if (!formData.propiedadTipo) {
      errs.propiedadTipo = 'Selecciona un tipo de propiedad'
    }
    
    // ── LUGARES ───────────────────────────────────────────────────────────
    if (!formData.propiedadLugares || parseInt(formData.propiedadLugares) < 1) {
      errs.propiedadLugares = 'Debe tener al menos 1 lugar disponible'
    } else if (parseInt(formData.propiedadLugares) > 8) {
      errs.propiedadLugares = 'Máximo 8 lugares disponibles'
    }
    
    // ── PRECIO ────────────────────────────────────────────────────────────
    if (!formData.propiedadPrecio || formData.propiedadPrecio === '') {
      errs.propiedadPrecio = 'El precio es obligatorio'
    } else if (isNaN(formData.propiedadPrecio) || parseFloat(formData.propiedadPrecio) < 1000) {
      errs.propiedadPrecio = 'El precio mínimo es $1,000 MXN'
    } else if (parseFloat(formData.propiedadPrecio) > 25000) {
      errs.propiedadPrecio = 'El precio máximo es $25,000 MXN'
    }
    
    // ── PRECIO POR ────────────────────────────────────────────────────────
    if (!formData.propiedadPrecioPor) {
      errs.propiedadPrecioPor = 'Selecciona el tipo de precio'
    }
    
    // ── CP ────────────────────────────────────────────────────────────────
    if (!formData.cp || formData.cp.length === 0) {
      errs.cp = 'El código postal es obligatorio'
    } else if (formData.cp.length !== 5) {
      errs.cp = 'El código postal debe tener 5 dígitos'
    } else if (cpValido !== true) {
      errs.cp = 'Debes buscar y validar el CP antes de continuar'
    }
    
    // ── DIRECCIÓN ─────────────────────────────────────────────────────────
    if (!formData.direccionCalle || formData.direccionCalle.trim().length < 3) {
      errs.direccionCalle = !formData.direccionCalle ? 'La calle es obligatoria' : 'La calle debe tener mínimo 3 caracteres'
    }
    
    if (!formData.direccionNumExt) {
      errs.direccionNumExt = 'El número exterior es obligatorio'
    }
    
    if (!formData.colonia) {
      errs.colonia = 'Debes buscar un CP válido para autocompletar la colonia'
    }
    
    if (!formData.municipio) {
      errs.municipio = 'Debes buscar un CP válido para autocompletar el municipio'
    }
    
    if (!formData.estado) {
      errs.estado = 'Debes buscar un CP válido para autocompletar el estado'
    }
    
    // ── FOTOS ─────────────────────────────────────────────────────────────
    if (fotos.length < 3) {
      errs.fotos = `Debes subir mínimo 3 fotos (tienes ${fotos.length})`
    }
    if (fotos.length > 10) {
      errs.fotos = 'Máximo 10 fotos permitidas'
    }
    
    // ── SERVICIOS ─────────────────────────────────────────────────────────
    const basicosDisponibles = servicios.Basico || []
    if (basicosDisponibles.length === 0) {
      errs.servicios = 'Los servicios no cargaron correctamente. Por favor recarga la página.'
    } else {
      const tieneBasico = basicosDisponibles.some(s => serviciosSeleccionados.includes(s.idServicio))
      if (!tieneBasico) {
        errs.servicios = 'Debes seleccionar al menos un servicio básico'
      }
    }
    
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const erroresValidacion = validarFormulario()
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion)
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
    
    const arrendadorId = localStorage.getItem('arrendadorId')
    if (!arrendadorId) { navigate('/usuarios/inicio-sesion'); return }
    
    setCargando(true)
    setError('')
    setMensaje('')
    
    try {
      const fd = new FormData()
      Object.keys(formData).forEach(k => fd.append(k, formData[k]))
      fd.append('arrendador_idArrendador', arrendadorId)
      fd.append('servicios', JSON.stringify(serviciosSeleccionados))
      fotos.forEach(f => fd.append('fotos', f))
      await crearPropiedad(fd)
      setMensaje('Propiedad creada exitosamente')
      setTimeout(() => navigate('/arrendador/mis-viviendas'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear propiedad')
    } finally { 
      setCargando(false) 
    }
  }

  const inputCls = (field) => `arr-form-input${errors[field] ? ' is-error' : ''}`

  return (
    <div className="arr-page">
      <NavbarArrendador />
      <main className="arr-main" style={{ maxWidth: '820px' }}>
        <div className="arr-page-header">
          <div>
            <h1 className="arr-page-title">Crear Nueva Vivienda</h1>
            <p className="arr-page-hint">Completa todos los campos para publicar tu propiedad. Los campos con <span style={{ color: '#dc2626' }}>*</span> son obligatorios.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información Básica */}
          <div className="arr-form-card">
            <div className="arr-form-card-header">
              <div className="arr-form-card-header-icon">🏠</div>
              <div>
                <h3>Información Básica</h3>
                <p>Datos generales de tu propiedad</p>
              </div>
            </div>
            <div className="arr-form-card-body">
              <div className="arr-form-group">
                <label className="arr-form-label">Título de la propiedad <span>*</span></label>
                <input
                  type="text"
                  name="propiedadTitulo"
                  value={formData.propiedadTitulo}
                  onChange={handleChange}
                  placeholder="Ej: Loft moderno cerca de ESCOM"
                  maxLength={30}
                  className={inputCls('propiedadTitulo')}
                />
                <span className="arr-form-hint">Solo letras y espacios. Mínimo 6, máximo 30 caracteres</span>
                {errors.propiedadTitulo && <span className="arr-form-error">{errors.propiedadTitulo}</span>}
              </div>

              <div className="arr-form-group">
                <label className="arr-form-label">Descripción <span>*</span></label>
                <textarea
                  name="propiedadDescripcion"
                  value={formData.propiedadDescripcion}
                  onChange={handleChange}
                  placeholder="Describe tu propiedad en al menos 20 caracteres. No puede iniciar con números."
                  rows={4}
                  maxLength={200}
                  className={`arr-form-textarea${errors.propiedadDescripcion ? ' is-error' : ''}`}
                />
                <span className="arr-form-hint">{formData.propiedadDescripcion.length}/200 caracteres (mínimo 20)</span>
                {errors.propiedadDescripcion && <span className="arr-form-error">{errors.propiedadDescripcion}</span>}
              </div>

              <div className="arr-form-grid-3">
                <div className="arr-form-group">
                  <label className="arr-form-label">Tipo de vivienda <span>*</span></label>
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
                  <label className="arr-form-label">Lugares disponibles <span>*</span></label>
                  <input
                    type="number"
                    name="propiedadLugares"
                    value={formData.propiedadLugares}
                    onChange={handleChange}
                    min="1"
                    max="8"
                    placeholder="1-8"
                    className={inputCls('propiedadLugares')}
                  />
                  <span className="arr-form-hint">Mínimo 1, máximo 8</span>
                  {errors.propiedadLugares && <span className="arr-form-error">{errors.propiedadLugares}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Precio por <span>*</span></label>
                  <select name="propiedadPrecioPor" value={formData.propiedadPrecioPor} onChange={handleChange} className="arr-form-select">
                    <option value="Persona">Por persona</option>
                    <option value="Habitación">Por habitación</option>
                    <option value="Propiedad">Propiedad completa</option>
                  </select>
                  {errors.propiedadPrecioPor && <span className="arr-form-error">{errors.propiedadPrecioPor}</span>}
                </div>
              </div>

              <div className="arr-form-group">
                <label className="arr-form-label">Precio mensual (MXN) <span>*</span></label>
                <input
                  type="number"
                  name="propiedadPrecio"
                  value={formData.propiedadPrecio}
                  onChange={handleChange}
                  min="1000"
                  max="25000"
                  placeholder="Ej: 3500"
                  className={inputCls('propiedadPrecio')}
                />
                <span className="arr-form-hint">Entre $1,000 y $25,000 MXN por mes</span>
                {errors.propiedadPrecio && <span className="arr-form-error">{errors.propiedadPrecio}</span>}
              </div>
            </div>
          </div>

          {/* Dirección */} 
          <div className="arr-form-card">
            <div className="arr-form-card-header">
              <div className="arr-form-card-header-icon">📍</div>
              <div>
                <h3>Dirección</h3>
                <p>Ubicación de tu propiedad</p>
              </div>
            </div>
            <div className="arr-form-card-body">
              <div className="arr-form-group">
                <label className="arr-form-label">Código Postal <span>*</span></label>
                <div className="arr-cp-row">
                  <div className="arr-form-group">
                    <input
                      type="text"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      onBlur={handleBuscarCP}
                      maxLength="5"
                      placeholder="Ej: 07700"
                      className={inputCls('cp')}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleBuscarCP}
                    disabled={buscandoCP || formData.cp.length !== 5}
                    className="arr-btn-ghost"
                    style={{ height: '44px', borderRadius: '12px', flexShrink: 0 }}
                  >
                    {buscandoCP ? '⏳ Buscando...' : '🔍 Buscar CP'}
                  </button>
                </div>
                <span className="arr-form-hint">5 dígitos. Haz clic en "Buscar CP" para validar</span>
                {cpValido === true && <span className="arr-form-hint" style={{ color: '#16a34a' }}>✓ CP válido - Dirección autocompletada</span>}
                {cpValido === false && <span className="arr-form-error">✗ CP no encontrado en el sistema</span>}
                {errors.cp && <span className="arr-form-error">{errors.cp}</span>}
              </div>

              <div className="arr-form-group">
                <label className="arr-form-label">Calle <span>*</span></label>
                <input
                  type="text"
                  name="direccionCalle"
                  value={formData.direccionCalle}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ej: Av. Insurgentes Sur 123"
                  className={inputCls('direccionCalle')}
                />
                <span className="arr-form-hint">Mínimo 3 caracteres</span>
                {errors.direccionCalle && <span className="arr-form-error">{errors.direccionCalle}</span>}
              </div>

              <div className="arr-form-grid-2">
                <div className="arr-form-group">
                  <label className="arr-form-label">Número exterior <span>*</span></label>
                  <input
                    type="text"
                    name="direccionNumExt"
                    value={formData.direccionNumExt}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Ej: 123"
                    className={inputCls('direccionNumExt')}
                  />
                  <span className="arr-form-hint">Solo letras y números</span>
                  {errors.direccionNumExt && <span className="arr-form-error">{errors.direccionNumExt}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Número interior <span style={{ color: '#6b7280', fontWeight: 400 }}>(opcional)</span></label>
                  <input
                    type="text"
                    name="direccionNumInt"
                    value={formData.direccionNumInt}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Ej: 3B"
                    className="arr-form-input"
                  />
                  <span className="arr-form-hint">Opcional. Solo letras y números</span>
                </div>
              </div>

              <div className="arr-form-grid-3">
                <div className="arr-form-group">
                  <label className="arr-form-label">Colonia</label>
                  <input 
                    type="text" 
                    name="colonia" 
                    value={formData.colonia} 
                    readOnly 
                    className={`arr-form-input${errors.colonia ? ' is-error' : ''}`}
                    disabled 
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                    placeholder="Autocompletado"
                  />
                  <span className="arr-form-hint">🔒 Autocompletado por CP</span>
                  {errors.colonia && <span className="arr-form-error">{errors.colonia}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Municipio</label>
                  <input 
                    type="text" 
                    name="municipio" 
                    value={formData.municipio} 
                    readOnly 
                    className={`arr-form-input${errors.municipio ? ' is-error' : ''}`}
                    disabled 
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                    placeholder="Autocompletado"
                  />
                  <span className="arr-form-hint">🔒 Autocompletado por CP</span>
                  {errors.municipio && <span className="arr-form-error">{errors.municipio}</span>}
                </div>
                <div className="arr-form-group">
                  <label className="arr-form-label">Estado</label>
                  <input 
                    type="text" 
                    name="estado" 
                    value={formData.estado} 
                    readOnly 
                    className={`arr-form-input${errors.estado ? ' is-error' : ''}`}
                    disabled 
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                    placeholder="Autocompletado"
                  />
                  <span className="arr-form-hint">🔒 Autocompletado por CP</span>
                  {errors.estado && <span className="arr-form-error">{errors.estado}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="arr-form-card">
            <div className="arr-form-card-header">
              <div className="arr-form-card-header-icon">🛠</div>
              <div>
                <h3>Servicios</h3>
                <p>Selecciona al menos un servicio básico</p>
              </div>
            </div>
            <div className="arr-form-card-body">
              {errors.servicios && <div className="arr-alert arr-alert-error" style={{ marginBottom: '1rem' }}>⚠️ {errors.servicios}</div>}
              {Object.keys(servicios).map(cat => (
                <div key={cat} className="arr-services-section">
                  <p className="arr-services-cat-title">
                    {cat === 'Basico' ? '🔧 Servicios Básicos (mínimo 1 obligatorio)' :
                     cat === 'Entretenimiento' ? '📺 Entretenimiento (Opcional)' :
                     '✨ Adicionales (Opcional)'}
                  </p>
                  <div className="arr-services-grid">
                    {servicios[cat].map(s => (
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
          </div>

          {/* Fotos */}
          <div className="arr-form-card">
            <div className="arr-form-card-header">
              <div className="arr-form-card-header-icon">📷</div>
              <div>
                <h3>Fotos ({fotos.length}/10) <span>*</span></h3>
                <p>Mínimo 3 fotos — JPG, PNG o WebP · Máx. 2 MB por foto</p>
              </div>
            </div>
            <div className="arr-form-card-body">
              <label className="arr-upload-zone">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFotosChange}
                />
                <span className="arr-upload-label">📤 Seleccionar imágenes</span>
                <span className="arr-upload-hint">Haz clic para abrir el selector · Máx. 2 MB por imagen</span>
              </label>
              {errors.fotos && <span className="arr-form-error" style={{ marginTop: '0.5rem', display: 'block' }}>{errors.fotos}</span>}
              {previews.length > 0 && (
                <div className="arr-foto-grid">
                  {previews.map((preview, i) => (
                    <div key={i} className="arr-foto-item">
                      <img src={preview} alt={`Foto ${i + 1}`} />
                      <button type="button" className="arr-foto-remove" onClick={() => eliminarFoto(i)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && <div className="arr-alert arr-alert-error">⚠️ {error}</div>}
          {mensaje && <div className="arr-alert arr-alert-success">✅ {mensaje}</div>}

          <div className="arr-form-footer" style={{ marginTop: 0 }}>
            <button
              type="button"
              className="arr-btn-ghost"
              onClick={() => navigate('/arrendador/mis-viviendas')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="arr-btn-primary"
            >
              {cargando ? '⏳ Creando...' : '🏠 Crear Vivienda'}
            </button>
          </div>
        </form>
      </main>
      <FooterInicio />
    </div>
  )
}

export default CrearVivienda