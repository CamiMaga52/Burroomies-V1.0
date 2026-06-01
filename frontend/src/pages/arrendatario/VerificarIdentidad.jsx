import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarArrendatario from '../../components/common/NavbarArrendatario'
import FooterInicio from '../../components/common/FooterInicio'
import SubirDocumento from '../../components/ui/SubirDocumento'
import '../../styles/Arrendatario.css'

const VerificarIdentidad = () => {
  const navigate = useNavigate()
  const [constanciaFile, setConstanciaFile] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [erroresDetalle, setErroresDetalle] = useState([])

  const handleEnviar = async () => {
    if (!constanciaFile) {
      setError('Debes seleccionar tu constancia en PDF')
      return
    }

    if (constanciaFile.type !== 'application/pdf') {
      setError('Solo se aceptan archivos en formato PDF.')
      return
    }

    if (constanciaFile.size > 2 * 1024 * 1024) {
      const mb = (constanciaFile.size / (1024 * 1024)).toFixed(1)
      setError(`El archivo pesa ${mb} MB. El máximo permitido es 2 MB.`)
      return
    }

    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/usuarios/inicio-sesion')
      return
    }

    try {
      setEnviando(true)
      setError(null)
      setErroresDetalle([])

      const fd = new FormData()
      fd.append('userId', userId)
      fd.append('constancia', constanciaFile)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verificar-identidad`, {
        method: 'POST',
        body: fd
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data.error || 'Error al procesar'
        const qr = msg.toLowerCase().includes('qr') || msg.toLowerCase().includes('leer') || msg.toLowerCase().includes('escanear')
        const coincide = msg.toLowerCase().includes('coincid') || msg.toLowerCase().includes('datos') || msg.toLowerCase().includes('nombre') || msg.toLowerCase().includes('curp') || msg.toLowerCase().includes('boleta')
        if (qr) {
          setError('No se pudo leer el código QR del PDF. Asegúrate de que el documento sea legible y esté vigente.')
        } else if (coincide) {
          setError('Los datos del documento no coinciden con los de tu registro. Verifica que sea tu constancia correcta.')
        } else {
          setError(msg)
        }
        if (data.detalles) setErroresDetalle(data.detalles)
        return
      }

      localStorage.setItem('arrendatarioVerificado', 'true')
      navigate('/arrendatario/verificacion-exitosa')

    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.')
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="atr-page">
      <NavbarArrendatario />

      <div className="atr-verify-wrapper">
        <div className="atr-verify-card" style={{ borderColor: '#534AB7' }}>
          
          {/* Header */}
          <div className="atr-verify-header atr-verify-header-primary">
            <div className="atr-verify-header-icon">📤</div>
            <div className="atr-verify-header-title">Verificar mi identidad</div>
            <div className="atr-verify-header-sub">
              Sube tu constancia de estudios vigente del IPN
            </div>
          </div>

          <div className="atr-verify-body">

            {/* Instrucciones */}
            <div className="atr-instructions-box">
              <div className="atr-instructions-title">📋 Requisitos del documento:</div>
              {[
                'Debe ser tu constancia de estudios vigente del IPN',
                'Formato PDF únicamente',
                'El código QR debe ser legible y estar vigente',
                'Los datos deben coincidir exactamente con tu registro'
              ].map((item, i) => (
                <div key={i} className="atr-req-item">
                  <div className="atr-req-check">✓</div>
                  <div className="atr-req-text">{item}</div>
                </div>
              ))}
            </div>

            {/* Subir documento */}
            <SubirDocumento
              tipo="constancia"
              onFileSelect={(file) => { setConstanciaFile(file); setError(null); setErroresDetalle([]) }}
              file={constanciaFile}
              setFile={setConstanciaFile}
              required={false}
              label="Constancia de Estudios (PDF)"
            />

            {/* Errores */}
            {error && (
              <div className="atr-alert atr-alert-error" style={{ marginBottom: '1.25rem' }}>
                <div className="atr-alert-icon">❌</div>
                <div className="atr-alert-body">
                  <div className="atr-alert-title">{error}</div>
                  {erroresDetalle.length > 0 && (
                    <div className="atr-alert-desc">
                      <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
                        {erroresDetalle.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="atr-btn-group">
              <button
                onClick={handleEnviar}
                disabled={enviando || !constanciaFile}
                className="atr-btn-primary"
                style={{
                  opacity: enviando || !constanciaFile ? 0.6 : 1,
                  cursor: enviando || !constanciaFile ? 'not-allowed' : 'pointer'
                }}
              >
                {enviando ? '⏳ Verificando documento...' : '✅ Verificar mi identidad'}
              </button>
              <button
                onClick={() => navigate('/arrendatario/verificacion-pendiente')}
                className="atr-btn-ghost"
              >
                ← Volver
              </button>
            </div>

          </div>
        </div>
      </div>

      <FooterInicio />
    </div>
  )
}

export default VerificarIdentidad