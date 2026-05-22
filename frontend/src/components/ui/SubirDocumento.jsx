import React, { useState } from 'react'

const SubirDocumento = ({ tipo, onFileSelect, file, setFile, required, label }) => {
  const [errorArchivo, setErrorArchivo] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setErrorArchivo(null)

    if (!selectedFile) return

    if (selectedFile.type !== 'application/pdf') {
      setErrorArchivo('Solo se permiten archivos PDF.')
      return
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setErrorArchivo('El archivo no debe superar 2 MB.')
      return
    }

    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  return (
    <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
      <label>
        {label || (tipo === 'constancia' ? 'Constancia de Estudios (PDF)' : 'Documento CURP (PDF)')}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        required={required && !file}
        style={{ display: 'block', marginTop: '0.5rem' }}
      />

      <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.4rem', marginBottom: 0 }}>
        Solo PDF · Máximo 2 MB
      </p>

      {errorArchivo && (
        <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#dc2626' }}>
          ❌ {errorArchivo}
        </div>
      )}

      {!errorArchivo && file && (
        <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'green' }}>
           Archivo seleccionado: {file.name}
        </div>
      )}
    </div>
  )
}

export default SubirDocumento