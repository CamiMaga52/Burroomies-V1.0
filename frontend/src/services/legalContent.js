// ─── legalContent.js ────────────────────────────────────────────────────────
// Fuente única de verdad para el contenido legal.
// Importado tanto por LegalModal (registro) como por las páginas legales.

export const AVISO_PRIVACIDAD = {
  titulo: 'Aviso de Privacidad',
  comun: [
    {
      subtitulo: '1. Identidad del Responsable',
      texto: `RentIPN (en adelante "el Sistema") es responsable del tratamiento de sus datos personales.
Para ejercer sus derechos o resolver dudas puede contactarnos en: rent.ipn.contacto@gmail.com`
    },
    {
      subtitulo: '3. Finalidades del Tratamiento',
      texto: `Sus datos se utilizan para:
• Primarias (necesarias para el servicio): crear y gestionar su cuenta, verificar su identidad mediante extracción automatizada de datos del documento oficial, permitir la publicación y búsqueda de arrendamientos, y enviar comunicaciones relacionadas con el uso del sistema.
• Secundarias (opcionales): enviar avisos sobre nuevas funcionalidades o actualizaciones del sistema.`
    },
    {
      subtitulo: '4. Transferencia de Datos a Terceros',
      texto: `Sus datos podrán compartirse con:
• Proveedores tecnológicos que prestan servicios de infraestructura (alojamiento, procesamiento de documentos vía API de PDF.co), bajo acuerdos de confidencialidad.
• No se realizan transferencias con fines comerciales a terceros ajenos al sistema. No se venden sus datos personales.`
    },
    {
      subtitulo: '5. Plazo de Conservación',
      texto: `Los datos personales se conservan mientras la cuenta del usuario permanezca activa. Al eliminar la cuenta, los datos personales se suprimen en un plazo máximo de 30 días naturales, salvo obligación legal de retención.

DOCUMENTOS DE VERIFICACIÓN: El archivo PDF (constancia de estudios o CURP) se procesa durante el registro mediante la API de PDF.co para extraer los datos del código QR y compararlos con la información del formulario. Una vez completada la validación, el archivo no se almacena en los servidores del sistema.`
    },
    {
      subtitulo: '6. Derechos ARCO',
      texto: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercerlos envíe un correo a rent.ipn.contacto@gmail.com indicando: nombre completo, derecho que desea ejercer y descripción del dato involucrado. El sistema responderá en un plazo máximo de 15 días hábiles a partir de la fecha de recepción de la solicitud.`
    },
    {
      subtitulo: '7. Transferencias Internacionales',
      texto: `El servicio de extracción de datos PDF.co puede operar servidores fuera de México. Se exige contractualmente un nivel de protección equivalente al establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).`
    },
    {
      subtitulo: '8. Uso de Cookies',
      texto: `El sistema utiliza cookies de sesión para mantener el inicio de sesión activo durante el uso del sistema. Estas cookies son necesarias para el funcionamiento del servicio. No se utilizan cookies de terceros ni cookies con fines publicitarios o de rastreo.`
    },
    {
      subtitulo: '9. Menores de Edad',
      texto: `Los estudiantes deben tener al menos 17 años para registrarse. Los menores de 18 años declaran contar con el consentimiento de sus padres o tutores al completar el registro. Los arrendadores deben ser mayores de 18 años. El sistema se reserva el derecho de solicitar confirmación por escrito de la autorización parental.`
    },
    {
      subtitulo: '10. Cambios al Aviso',
      texto: `Cualquier modificación a este aviso será notificada a través del correo registrado en la cuenta del usuario o mediante un aviso visible en el sistema al iniciar sesión.`
    }
  ],
  datosPorRol: {
    estudiante: {
      subtitulo: '2. Datos Personales Recabados',
      texto: `Como estudiante, se recaban los siguientes datos personales:
• Datos de identificación: nombre completo, CURP, fecha de nacimiento.
• Datos de contacto: correo electrónico, número de teléfono.
• Datos académicos: boleta, carrera y unidad académica del IPN, constancia de estudios (PDF).
• Datos de autenticación: contraseña (almacenada con cifrado bcrypt).

VERIFICACIÓN DE IDENTIDAD: La constancia de estudios se procesa durante el registro mediante la API de PDF.co, que extrae los datos del código QR del documento y los compara con la información ingresada en el formulario. El estudiante dispone de una prórroga de 60 días para subir su constancia si no lo hace al momento del registro. Mientras la cuenta no esté verificada, se bloquean los medios de contacto con arrendadores. El archivo PDF no se almacena después de la validación.`
    },
    arrendador: {
      subtitulo: '2. Datos Personales Recabados',
      texto: `Como arrendador, se recaban los siguientes datos personales:
• Datos de identificación: nombre completo, CURP, fecha de nacimiento, RFC.
• Datos de contacto: correo electrónico, número de teléfono.
• Datos de domicilio: calle, número exterior/interior, colonia, municipio, estado y código postal.
• Documento CURP en formato PDF para verificación de identidad.
• Datos de autenticación: contraseña (almacenada con cifrado bcrypt).

VERIFICACIÓN DE IDENTIDAD: El CURP en PDF se procesa durante el registro mediante la API de PDF.co, que extrae los datos del código QR del documento y los compara con la información ingresada en el formulario. Este paso es obligatorio. El archivo PDF no se almacena después de la validación.`
    }
  }
}

export const TERMINOS_USO = {
  titulo: 'Términos y Condiciones de Uso',
  comun: [
    {
      subtitulo: '1. Identidad y Objeto',
      texto: `RentIPN es una plataforma digital que permite el contacto entre estudiantes del Instituto Politécnico Nacional (IPN) que buscan arrendamiento y personas físicas que ofrecen inmuebles en renta en las zonas aledañas a la Unidad Profesional Adolfo López Mateos (UPALM). El sistema no forma parte de ningún contrato de arrendamiento.`
    },
    {
      subtitulo: '3. Uso Permitido',
      texto: `El sistema debe usarse para:
• Publicar o buscar opciones de arrendamiento habitacional en los códigos postales autorizados por el sistema.
• Contactar a las partes interesadas.
• Publicar reseñas sobre experiencias de arrendamiento.

Queda prohibido:
• Publicar información falsa.
• Usar el sistema para actividades ilícitas.
• Acosar, intimidar o discriminar a otros usuarios.
• Publicar reseñas sin haber finalizado un arrendamiento.
• Intentar vulnerar el funcionamiento de la plataforma.`
    },
    {
      subtitulo: '4. Propiedad Intelectual',
      texto: `El diseño, código fuente, logotipos y contenidos del sistema son propiedad de RentIPN o de sus licenciantes. No se permite su reproducción, distribución o modificación sin autorización expresa por escrito. Los anuncios publicados por los usuarios son responsabilidad de quien los publica.`
    },
    {
      subtitulo: '5. Limitación de Responsabilidad',
      texto: `RentIPN opera como intermediario tecnológico. No se hace responsable de:
• La veracidad de los anuncios publicados por los usuarios.
• Los acuerdos económicos o legales celebrados entre arrendadores y arrendatarios.
• Daños derivados del uso de la plataforma por parte de terceros.
• La exactitud de los datos extraídos por la API de PDF.co (el usuario es responsable de verificar que sus datos sean correctos).`
    },
    {
      subtitulo: '6. Suspensión y Cancelación',
      texto: `El sistema se reserva el derecho de suspender o cancelar cuentas que:
• Incumplan estos términos de uso.
• Proporcionen documentos falsos o alterados.
• Publiquen reseñas con lenguaje inapropiado (el sistema verifica automáticamente la presencia de groserías).
• Sean reportadas por conducta inadecuada.

Las cuentas de estudiantes que no verifiquen su identidad en un plazo de 60 días posteriores al registro serán eliminadas automáticamente.`
    },
    {
      subtitulo: '7. Proceso de Verificación de Identidad',
      texto: `El sistema verifica la identidad de los usuarios mediante el siguiente proceso:

1. El usuario sube su documento oficial (constancia de estudios IPN para estudiantes, CURP para arrendadores) en formato PDF durante el registro.

2. El sistema utiliza la API de PDF.co para extraer los datos del código QR del documento.

3. Los datos extraídos se comparan automáticamente con la información ingresada en el formulario de registro.

4. Si los datos coinciden, la cuenta queda verificada. Si no coinciden, se notifica al usuario para que corrija la información.

5. Una vez completada la validación, el archivo PDF se elimina de los servidores. No se conservan copias.

• El procesamiento ocurre durante el registro.
• Los estudiantes disponen de una prórroga de 60 días para subir su constancia.
• Mientras la cuenta no esté verificada, el estudiante no puede contactar arrendadores ni ser ligado a un arrendamiento.`
    },
    {
      subtitulo: '8. Sistema de Reseñas',
      texto: `El módulo de reseñas opera bajo las siguientes reglas:

• Pueden publicar reseñas los estudiantes verificados que hayan finalizado un arrendamiento.
• Para finalizar un arrendamiento, tanto el estudiante como el arrendador deben confirmar la finalización.
• El sistema verifica automáticamente que la reseña no contenga groserías.
• Si un estudiante elimina su cuenta, sus reseñas se conservan y se ligan a un perfil genérico para preservar el historial de la propiedad.
• Los arrendadores no pueden eliminar reseñas de sus propiedades.`
    },
    {
      subtitulo: '9. Restricción Geográfica',
      texto: `Las viviendas publicadas deben estar ubicadas en los códigos postales colindantes a la UPALM IPN definidos por el sistema. Estos CPs están basados en la división territorial de SEPOMEX y pueden consultarse en la sección "Zonas Cercanas" de la plataforma. Las publicaciones fuera de estas zonas serán rechazadas.`
    },
    {
      subtitulo: '10. Legislación Aplicable',
      texto: `Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.`
    },
    {
      subtitulo: '11. Contacto',
      texto: `Para reportes, quejas o aclaraciones: rent.ipn.contacto@gmail.com`
    }
  ],
  condicionesPorRol: {
    estudiante: {
      subtitulo: '2. Condiciones de Acceso como Estudiante',
      texto: `Para registrarse como Estudiante debe:
• Ser alumno activo del Instituto Politécnico Nacional (IPN).
• Tener al menos 17 años de edad. Si es menor de 18, declara contar con consentimiento de sus padres o tutores.
• Proporcionar una boleta escolar válida.
• Subir su constancia de estudios vigente en formato PDF para verificación de identidad (al momento del registro o dentro de los 60 días posteriores).
• Si no verifica su identidad en el plazo de 60 días, su cuenta será eliminada automáticamente.
• Mientras la cuenta no esté verificada, no podrá acceder a los medios de contacto de los arrendadores ni ser ligado a un arrendamiento.

El acceso es personal; compartir credenciales está prohibido.`
    },
    arrendador: {
      subtitulo: '2. Condiciones de Acceso como Arrendador',
      texto: `Para registrarse como Arrendador debe:
• Ser mayor de 18 años de edad.
• Proporcionar un documento CURP válido en formato PDF para verificar su identidad. Este paso es obligatorio.
• Contar con un RFC vigente.
• Ser propietario o contar con la facultad legal para arrendar el inmueble que publique.
• Publicar inmuebles ubicados en los códigos postales autorizados por el sistema.

El acceso es personal; compartir credenciales está prohibido.`
    }
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getAvisoPrivacidad = (rol) => {
  const secciones = [...AVISO_PRIVACIDAD.comun]
  secciones.splice(1, 0, AVISO_PRIVACIDAD.datosPorRol[rol])
  return { titulo: AVISO_PRIVACIDAD.titulo, contenido: secciones }
}

export const getTerminosUso = (rol) => {
  const secciones = [...TERMINOS_USO.comun]
  secciones.splice(1, 0, TERMINOS_USO.condicionesPorRol[rol])
  return { titulo: TERMINOS_USO.titulo, contenido: secciones }
}