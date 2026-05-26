import React, { useState } from 'react'
import NavbarInicio from '../../components/common/NavbarSimple'
import FooterInicio from '../../components/common/FooterInicio'

const FaqPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [mensajeEnviado, setMensajeEnviado] = useState(false)
  const [error, setError] = useState('')

    const preguntas = [
    // ===== REGISTRO Y VERIFICACIÓN =====
    {
      pregunta: '¿Cómo me registro como estudiante?',
      respuesta: 'Ve a la página de Registro, selecciona "Estudiante IPN", llena tus datos personales y académicos, y crea una contraseña segura. Puedes subir tu constancia de estudios en PDF al momento del registro para verificar tu identidad, o postergarlo hasta 60 días.'
    },
    {
      pregunta: '¿Cómo me registro como arrendador?',
      respuesta: 'Ve a la página de Registro, selecciona "Arrendador", llena tus datos personales y tu domicilio. Es obligatorio subir tu CURP en formato PDF para verificar tu identidad en ese momento.'
    },
    {
      pregunta: '¿Qué pasa si no verifico mi correo electrónico?',
      respuesta: 'No podrás iniciar sesión hasta que ingreses el código de verificación enviado a tu correo. Todos los usuarios deben verificar su correo para acceder al sistema.'
    },
    {
      pregunta: '¿Qué pasa si no verifico mi identidad como estudiante?',
      respuesta: 'Tienes una prórroga de 60 días para subir tu constancia de estudios en PDF. Si no lo haces en ese plazo, tu cuenta será eliminada automáticamente al momento de iniciar sesión.'
    },
    {
      pregunta: '¿Qué restricciones tengo si no verifico mi identidad?',
      respuesta: 'Como estudiante sin identidad verificada, no podrás ver los datos de contacto de los arrendadores (teléfono y correo) ni ser registrado en un arrendamiento por un arrendador. Debes subir tu constancia de estudios para acceder a estas funciones.'
    },

    // ===== BÚSQUEDA Y PROPIEDADES =====
    {
      pregunta: '¿En qué colonias puedo encontrar propiedades?',
      respuesta: 'Todas las propiedades registradas en RentIPN se encuentran en los códigos postales colindantes a la Unidad Profesional Adolfo López Mateos (UPALM) del IPN, en la alcaldía Gustavo A. Madero. Puedes consultar las zonas exactas en la sección "Zonas Cercanas" de la plataforma.'
    },
    {
      pregunta: '¿Cómo busco una propiedad?',
      respuesta: 'Una vez que inicies sesión como estudiante verificado, puedes buscar propiedades usando filtros por ubicación, precio, tipo de propiedad o servicios incluidos.'
    },
    {
      pregunta: '¿Los precios son por persona o por propiedad?',
      respuesta: 'Depende de cada publicación. El arrendador indica al registrar su vivienda si el precio es por persona, por habitación o por la propiedad completa. Revisa la etiqueta "Precio por" en cada publicación.'
    },
    {
      pregunta: '¿Las propiedades tienen fecha de vencimiento?',
      respuesta: 'No. Las propiedades no caducan automáticamente. El arrendador decide si mantenerlas activas, desactivarlas, ponerlas como "Sin disponibilidad" o eliminarlas cuando lo considere.'
    },

    // ===== CONTACTO Y ARRENDAMIENTOS =====
    {
      pregunta: '¿Cómo contacto a un arrendador?',
      respuesta: 'Cuando encuentres una propiedad de tu interés, en la publicación verás los datos de contacto del arrendador (teléfono y correo). Necesitas tener tu identidad verificada para ver estos datos.'
    },
    {
      pregunta: '¿Se manejan contratos o pagos dentro de la plataforma?',
      respuesta: 'No. RentIPN es una plataforma de publicidad. No manejamos chats, solicitudes de arrendamiento, ni pagos dentro del sistema. Todo acuerdo, contrato y pago se realiza directamente entre el arrendador y el estudiante fuera de la plataforma.'
    },
    {
      pregunta: '¿Cómo se registra un arrendamiento en el sistema?',
      respuesta: 'El arrendador es quien registra el arrendamiento en su cuenta, indicando el estudiante involucrado, la propiedad rentada, la fecha de inicio y los detalles del acuerdo.'
    },
    {
      pregunta: '¿Puedo rentar varias propiedades al mismo tiempo?',
      respuesta: 'Como estudiante, solo puedes estar registrado en un arrendamiento a la vez. Para rentar otra propiedad, el arrendamiento actual debe ser finalizado tanto por ti como por el arrendador.'
    },
    {
      pregunta: '¿Cómo finalizo un arrendamiento?',
      respuesta: 'Tanto el estudiante como el arrendador deben confirmar la finalización desde sus respectivas cuentas. Cuando ambas partes hayan confirmado, el arrendamiento se elimina del sistema. Si eres estudiante, al finalizar podrás dejar una reseña de la propiedad.'
    },

    // ===== CONTRATO DE ARRENDAMIENTO (PDF) =====
    {
      pregunta: '¿RentIPN genera un contrato de arrendamiento?',
      respuesta: 'Sí, el sistema genera un PDF con los datos del contrato de arrendamiento que puedes descargar desde tu cuenta. Incluye los datos del arrendador, arrendatario, propiedad, monto de la renta y las cláusulas básicas del acuerdo.'
    },
    {
      pregunta: '¿El PDF del contrato es legalmente vinculante?',
      respuesta: 'No. El documento PDF generado por RentIPN tiene carácter meramente INFORMATIVO. No constituye un documento legal vinculante ni reemplaza un contrato formal de arrendamiento ante las autoridades competentes. Se recomienda a ambas partes consultar con un profesional legal para formalizar su relación contractual.'
    },
    {
      pregunta: '¿Qué información incluye el contrato PDF?',
      respuesta: 'El PDF incluye: número de contrato, fecha de inicio, tiempo en renta, monto mensual, datos completos del arrendador y arrendatario (nombre, correo, teléfono), dirección completa de la propiedad, y 15 cláusulas que cubren aspectos como duración, renta, depósito, uso del inmueble, mantenimiento, servicios, visitas, modificaciones, rescisión, obligaciones fiscales y jurisdicción.'
    },
    {
      pregunta: '¿RentIPN se hace responsable de los contratos?',
      respuesta: 'No. RentIPN no forma parte de ningún contrato de arrendamiento. No asume responsabilidad civil, penal, fiscal o de cualquier otra naturaleza derivada de los acuerdos o disputas entre arrendador y arrendatario. El documento PDF es solo una herramienta informativa.'
    },
    {
      pregunta: '¿Quién es responsable de los impuestos de la renta?',
      respuesta: 'El arrendador es el único responsable de cumplir con sus obligaciones fiscales ante el SAT, incluyendo la declaración de ingresos por arrendamiento. RentIPN no procesa pagos, no retiene impuestos y no tiene ninguna obligación fiscal derivada de la relación entre las partes.'
    },

    // ===== RESEÑAS =====
    {
      pregunta: '¿Quién puede publicar una reseña?',
      respuesta: 'Solo los estudiantes verificados que hayan finalizado un arrendamiento. Al confirmar la finalización, el sistema te pedirá tu calificación y comentario sobre la propiedad.'
    },
    {
      pregunta: '¿Los arrendadores pueden eliminar reseñas?',
      respuesta: 'No. Los arrendadores no pueden eliminar reseñas de sus propiedades. Si un estudiante elimina su cuenta, sus reseñas se conservan de forma anónima para preservar el historial de la propiedad.'
    },
    {
      pregunta: '¿Las reseñas son obligatorias?',
      respuesta: 'No son obligatorias, pero ayudan a otros estudiantes a tomar mejores decisiones y a los arrendadores a mejorar sus servicios. Al finalizar un arrendamiento puedes dejar tu calificación y comentario.'
    },

    // ===== SEGURIDAD Y PRIVACIDAD =====
    {
      pregunta: '¿Mis datos personales están seguros?',
      respuesta: 'Sí. Tus contraseñas se almacenan con cifrado bcrypt. Los documentos PDF que subes para verificación (constancia o CURP) se procesan para extraer los datos del código QR, pero no se almacenan en nuestros servidores después de la verificación. Toda la comunicación usa HTTPS/TLS. Consulta nuestro Aviso de Privacidad para más detalles.'
    },
    {
      pregunta: '¿RentIPN verifica que las propiedades existan físicamente?',
      respuesta: 'No. RentIPN no verifica físicamente las propiedades ni garantiza que las fotos o descripciones coincidan con la realidad. Somos una plataforma de publicidad. Te recomendamos visitar la propiedad y conocer al arrendador antes de cualquier acuerdo.'
    },
    {
      pregunta: '¿Qué hago si encuentro información falsa en una publicación?',
      respuesta: 'Puedes contactarnos a través del formulario de esta página o escribir a rent.ipn.contacto@gmail.com para reportarlo. RentIPN se reserva el derecho de retirar publicaciones con reportes fundados de información falsa o engañosa.'
    },

    // ===== CUENTA =====
    {
      pregunta: '¿Qué hago si olvidé mi contraseña?',
      respuesta: 'En la pantalla de inicio de sesión hay un enlace para recuperar tu contraseña. Recibirás un correo con instrucciones para restablecerla.'
    },

    // ===== VARIOS =====
    {
      pregunta: '¿Puedo registrarme como arrendador si soy estudiante?',
      respuesta: 'Sí, si cumples con los requisitos de arrendador (ser mayor de 18 años, tener CURP y RFC vigentes) puedes registrarte en ese rol para publicar propiedades. No hay conflicto con tu cuenta de estudiante.'
    },
    {
      pregunta: '¿Hay propiedades solo para mujeres?',
      respuesta: 'Sí, algunos arrendadores publican propiedades exclusivas para mujeres estudiantes. Estas publicaciones lo especifican claramente en el título y la descripción.'
    },
    {
      pregunta: '¿RentIPN cobra alguna comisión?',
      respuesta: 'No. RentIPN es un proyecto académico estudiantil completamente gratuito. No cobramos comisiones, no procesamos pagos y no retenemos dinero de ninguna transacción.'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError('')

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setError('Por favor, llena todos los campos')
      setEnviando(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Ingresa un correo electrónico válido')
      setEnviando(false)
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMensajeEnviado(true)
        setFormData({ nombre: '', email: '', mensaje: '' })
      } else {
        setError('Error al enviar el mensaje. Intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarInicio />
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>❓ Preguntas Frecuentes</h1>
        
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
          {preguntas.map((item, index) => (
            <div key={index} style={{ 
              backgroundColor: '#f9f9f9', 
              padding: '1rem', 
              borderRadius: '8px',
              borderLeft: '4px solid #5e60ce'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{item.pregunta}</h3>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>{item.respuesta}</p>
            </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '2rem', 
          borderRadius: '10px',
          marginTop: '2rem'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>📧 ¿No encontraste lo que buscabas?</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
            Escríbenos directamente y te responderemos lo antes posible
          </p>

          {mensajeEnviado ? (
            <div style={{ 
              backgroundColor: '#d4edda', 
              color: '#155724', 
              padding: '1rem', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              ✅ ¡Mensaje enviado! Te responderemos a la brevedad.
              <br />
              <button 
                onClick={() => setMensajeEnviado(false)}
                style={{ marginTop: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.3rem 1rem', borderRadius: '3px', cursor: 'pointer' }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              {error && (
                <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Tu nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Tu correo:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Mensaje:</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  placeholder="Escribe tu pregunta o comentario aquí..."
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#5e60ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  opacity: enviando ? 0.7 : 1
                }}
              >
                {enviando ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </main>
      <FooterInicio />
    </div>
  )
}

export default FaqPage