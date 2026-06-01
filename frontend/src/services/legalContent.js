// ─── legalContent.js ────────────────────────────────────────────────────────
// Fuente única de verdad para el contenido legal.
// Importado tanto por LegalModal (registro) como por las páginas legales.

export const AVISO_PRIVACIDAD = {
  titulo: 'Aviso de Privacidad',
  comun: [
    {
      subtitulo: '1. Identidad del Responsable',
      texto: `RentIPN (en adelante "el Sistema") es un proyecto académico estudiantil responsable del tratamiento de sus datos personales, desarrollado conforme a los principios establecidos en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
Para ejercer sus derechos o resolver dudas puede contactarnos en: rent.ipn.contacto@gmail.com`
    },
    {
      subtitulo: '2. Marco Legal Aplicable',
      texto: `El tratamiento de sus datos personales se realiza conforme a los principios de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP): licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.

Al registrarse en el sistema, usted otorga su consentimiento expreso para el tratamiento de sus datos personales conforme a lo descrito en este aviso.`
    },
    {
      subtitulo: '4. Finalidades del Tratamiento',
      texto: `Sus datos se utilizan para:
• Primarias (necesarias para el servicio): crear y gestionar su cuenta, verificar su identidad mediante extracción automatizada de datos del documento oficial, permitir la publicación y búsqueda de arrendamientos, y enviar comunicaciones relacionadas con el uso del sistema.
• Secundarias (opcionales): enviar avisos sobre nuevas funcionalidades o actualizaciones del sistema.

Los correos electrónicos se utilizan únicamente para: verificación de correo electrónico al registrarse y recuperación de contraseña. No se envían correos con fines publicitarios.`
    },
    {
      subtitulo: '5. Transferencia de Datos a Terceros',
      texto: `Sus datos podrán compartirse con:
• Proveedores tecnológicos que prestan servicios de infraestructura (alojamiento, procesamiento de documentos vía API de PDF.co), bajo acuerdos de confidencialidad.
• No se realizan transferencias con fines comerciales a terceros ajenos al sistema. No se venden sus datos personales.`
    },
    {
      subtitulo: '6. Plazo de Conservación',
      texto: `Los datos personales se conservan mientras la cuenta del usuario permanezca activa. Al eliminar la cuenta, los datos personales se eliminan. Sin embargo, los datos relacionados con reseñas publicadas se conservan de forma anónima para preservar el historial de las propiedades.

DOCUMENTOS DE VERIFICACIÓN: El archivo PDF (constancia de estudios o CURP) se procesa durante el registro mediante la API de PDF.co para extraer los datos del código QR y compararlos con la información del formulario. Una vez completada la verificación, el archivo no se almacena en los servidores del sistema.`
    },
    {
      subtitulo: '7. Derechos ARCO',
      texto: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales, conforme a lo establecido en la LFPDPPP. Para ejercerlos envíe un correo a rent.ipn.contacto@gmail.com indicando: nombre completo, derecho que desea ejercer y descripción del dato involucrado. El sistema responderá en un plazo máximo de 15 días hábiles a partir de la fecha de recepción de la solicitud.`
    },
    {
      subtitulo: '8. Transferencias Internacionales',
      texto: `El servicio de extracción de datos PDF.co puede operar servidores fuera de México. Se exige contractualmente un nivel de protección equivalente al establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).`
    },
    {
      subtitulo: '9. Seguridad de los Datos',
      texto: `RentIPN implementa las siguientes medidas para proteger sus datos personales:
• En transferencia: toda comunicación entre su dispositivo y los servidores del sistema utiliza protocolo HTTPS/TLS, lo que garantiza que los datos viajan cifrados.
• En reposo: las contraseñas se almacenan con cifrado bcrypt. Los datos personales se almacenan en servidores con acceso restringido.
• Los documentos PDF subidos para verificación se procesan en memoria y no se almacenan en los servidores del sistema una vez completada la verificación.

En caso de una vulneración de seguridad que afecte sus datos personales, el sistema lo notificará conforme a lo establecido en la LFPDPPP.`
    },
    {
      subtitulo: '10. Uso de Cookies',
      texto: `El sistema utiliza cookies de sesión para mantener el inicio de sesión activo durante el uso del sistema. Estas cookies son necesarias para el funcionamiento del servicio. No se utilizan cookies de terceros ni cookies con fines publicitarios o de rastreo.`
    },
    {
      subtitulo: '11. Menores de Edad',
      texto: `Los estudiantes deben tener al menos 17 años para registrarse. Los menores de 18 años declaran contar con el consentimiento de sus padres o tutores al completar el registro. Los arrendadores deben ser mayores de 18 años. El sistema no recopila datos de menores sin el consentimiento adecuado.`
    },
    {
      subtitulo: '12. Cambios al Aviso',
      texto: `Cualquier modificación a este aviso será notificada a través del correo electrónico registrado en la cuenta del usuario o mediante un aviso visible en el sistema al iniciar sesión.`
    }
  ],
  datosPorRol: {
    estudiante: {
      subtitulo: '3. Datos Personales Recabados',
      texto: `Como estudiante, se recaban los siguientes datos personales:
• Datos de identificación: nombre completo, CURP, fecha de nacimiento.
• Datos de contacto: correo electrónico, número de teléfono.
• Datos académicos: boleta, carrera y unidad académica del IPN, constancia de estudios (PDF).
• Datos de autenticación: contraseña (almacenada con cifrado bcrypt).

VERIFICACIÓN DE IDENTIDAD: La constancia de estudios se procesa durante el registro mediante la API de PDF.co, que extrae los datos del código QR del documento y los compara con la información ingresada en el formulario. El estudiante dispone de una prórroga de 60 días para subir su constancia si no lo hace al momento del registro. Mientras la cuenta no esté verificada, se bloquean los medios de contacto con arrendadores. El archivo PDF no se almacena después de la verificación.

DATOS SENSIBLES: El CURP es considerado un dato personal de tratamiento especial conforme a la LFPDPPP. Su uso se limita exclusivamente a la verificación de identidad dentro del sistema. No se comparte con terceros salvo los proveedores tecnológicos descritos en este aviso.`
    },
    arrendador: {
      subtitulo: '3. Datos Personales Recabados',
      texto: `Como arrendador, se recaban los siguientes datos personales:
• Datos de identificación: nombre completo, CURP, fecha de nacimiento, RFC.
• Datos de contacto: correo electrónico, número de teléfono.
• Datos de domicilio: calle, número exterior/interior, colonia, municipio, estado y código postal.
• Documento CURP en formato PDF para verificación de identidad.
• Datos de autenticación: contraseña (almacenada con cifrado bcrypt).

VERIFICACIÓN DE IDENTIDAD: El CURP en PDF se procesa durante el registro mediante la API de PDF.co, que extrae los datos del código QR del documento y los compara con la información ingresada en el formulario. Este paso es obligatorio. El archivo PDF no se almacena después de la verificación.

DATOS SENSIBLES: El CURP es considerado un dato personal de tratamiento especial conforme a la LFPDPPP. Su uso se limita exclusivamente a la verificación de identidad dentro del sistema. No se comparte con terceros salvo los proveedores tecnológicos descritos en este aviso.`
    }
  }
}

export const TERMINOS_USO = {
  titulo: 'Términos y Condiciones de Uso',
  comun: [
    {
      subtitulo: '1. Identidad y Naturaleza del Servicio',
      texto: `RentIPN es una plataforma digital de publicidad que permite el contacto entre estudiantes del Instituto Politécnico Nacional (IPN) que buscan arrendamiento y personas físicas que ofrecen inmuebles en renta en las zonas aledañas a la Unidad Profesional Adolfo López Mateos (UPALM).

IMPORTANTE: RentIPN actúa exclusivamente como intermediario de difusión. El sistema:
• No forma parte de ningún contrato de arrendamiento.
• No cobra, procesa ni recibe pagos de ningún tipo entre usuarios.
• No interviene en negociaciones económicas entre arrendadores y arrendatarios.
• No garantiza la celebración de ningún contrato de arrendamiento.
• No es responsable de los acuerdos, pagos o compromisos que las partes celebren fuera de la plataforma.`
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
      subtitulo: '4. Veracidad de las Publicaciones',
      texto: `RentIPN no verifica físicamente las propiedades publicadas por los arrendadores. El sistema no garantiza ni se hace responsable de:
• La exactitud de las fotografías, descripciones, precios o condiciones de los inmuebles publicados.
• La disponibilidad real de los inmuebles al momento de ser contactados.
• El estado físico, legal o de habitabilidad de las propiedades.
• Cualquier diferencia entre la información publicada y las condiciones reales del inmueble.

El arrendador es el único responsable de la veracidad, actualización y exactitud de la información que publica. RentIPN se reserva el derecho de retirar publicaciones que reciban reportes fundados de información falsa o engañosa.`
    },
    {
      subtitulo: '5. Deslinde por Conflictos entre Usuarios',
      texto: `RentIPN no es mediador, árbitro ni parte en las relaciones entre arrendadores y arrendatarios. El sistema no se hace responsable de:
• Conflictos derivados del incumplimiento de acuerdos de renta, ya sean verbales o escritos.
• Daños al inmueble, pérdida de depósitos, falta de pago u otras disputas económicas.
• Situaciones de acoso, discriminación o conductas inapropiadas entre usuarios fuera de la plataforma.
• Cualquier daño patrimonial o moral derivado de la relación entre usuarios.

Para cualquier conflicto legal derivado de un arrendamiento, las partes deberán acudir a las instancias legales correspondientes. RentIPN puede colaborar proporcionando registros del sistema cuando una autoridad competente lo requiera formalmente.`
    },
    {
      subtitulo: '6. Propiedad Intelectual',
      texto: `El diseño, código fuente, logotipos y contenidos del sistema son propiedad de RentIPN o de sus licenciantes. No se permite su reproducción, distribución o modificación sin autorización expresa por escrito. Los anuncios publicados por los usuarios son responsabilidad de quien los publica.`
    },
    {
      subtitulo: '7. Limitación de Responsabilidad',
      texto: `RentIPN opera como intermediario tecnológico de publicidad. No se hace responsable de:
• La veracidad de los anuncios publicados por los usuarios.
• Los acuerdos económicos o legales celebrados entre arrendadores y arrendatarios.
• Daños derivados del uso de la plataforma por parte de terceros.
• La exactitud de los datos extraídos por la API de PDF.co (el usuario es responsable de verificar que sus datos sean correctos).
• Interrupciones del servicio por causas ajenas al sistema (fallas de infraestructura, mantenimiento, etc.).`
    },
    {
      subtitulo: '8. Suspensión y Cancelación',
      texto: `El sistema se reserva el derecho de suspender o cancelar cuentas que:
• Incumplan estos términos de uso.
• Proporcionen documentos falsos o alterados.
• Publiquen reseñas con lenguaje inapropiado (el sistema valida automáticamente la presencia de groserías).
• Sean reportadas por conducta inadecuada.

Las cuentas de estudiantes que no verifiquen su identidad en un plazo de 60 días posteriores al registro serán eliminadas automáticamente.`
    },
    {
      subtitulo: '9. Proceso de verificación de Identidad',
      texto: `El sistema verifica la identidad de los usuarios mediante el siguiente proceso:

1. El usuario sube su documento oficial (constancia de estudios IPN para estudiantes, CURP para arrendadores) en formato PDF durante el registro.
2. El sistema utiliza la API de PDF.co para extraer los datos del código QR del documento.
3. Los datos extraídos se comparan automáticamente con la información ingresada en el formulario de registro.
4. Si los datos coinciden, la cuenta queda verificada. Si no coinciden, se notifica al usuario para que corrija la información.
5. Una vez completada la verificación, el archivo PDF se elimina de los servidores. No se conservan copias.

• El procesamiento ocurre durante el registro.
• Los estudiantes disponen de una prórroga de 60 días para subir su constancia.
• Mientras la cuenta no esté verificada, el estudiante no puede contactar arrendadores ni ser ligado a un arrendamiento.`
    },
    {
      subtitulo: '10. Sistema de Reseñas',
      texto: `El módulo de reseñas opera bajo las siguientes reglas:

• Pueden publicar reseñas los estudiantes verificados que hayan finalizado un arrendamiento.
• Para finalizar un arrendamiento, tanto el estudiante como el arrendador deben confirmar la finalización.
• El sistema verifica automáticamente que la reseña no contenga groserías.
• Si un estudiante elimina su cuenta, sus reseñas se conservan y se ligan a un perfil genérico para preservar el historial de la propiedad.
• Los arrendadores no pueden eliminar reseñas de sus propiedades.`
    },
    {
      subtitulo: '11. Restricción Geográfica',
      texto: `Las viviendas publicadas deben estar ubicadas en los códigos postales colindantes a la UPALM IPN definidos por el sistema. Estos CPs están basados en la división territorial de SEPOMEX y pueden consultarse en la sección "Zonas Cercanas" de la plataforma. Las publicaciones fuera de estas zonas serán rechazadas.`
    },
    {
      subtitulo: '12. Obligaciones Fiscales de los Arrendadores',
      texto: `RentIPN es una plataforma de publicidad y NO actúa como agente retenedor ni intermediario fiscal ante el Servicio de Administración Tributaria (SAT) ni ante ninguna otra autoridad hacendaria.

El arrendador reconoce y acepta expresamente que:
• RentIPN no procesa, cobra, retiene ni transfiere pagos de renta entre usuarios, por lo que no le corresponde ninguna obligación fiscal derivada de dichos pagos.
• El arrendador es el único responsable de cumplir con sus obligaciones fiscales derivadas del arrendamiento de inmuebles, incluyendo la emisión de comprobantes fiscales digitales (CFDI), la declaración de ingresos por arrendamiento ante el SAT conforme al artículo 114 y siguientes de la Ley del Impuesto sobre la Renta (LISR), y el pago de los impuestos correspondientes.
• RentIPN no asesora, orienta ni se responsabiliza por el cumplimiento o incumplimiento de las obligaciones fiscales de ningún usuario.
• Cualquier consecuencia fiscal, sanción, multa o requerimiento del SAT derivado de la actividad de arrendamiento es responsabilidad exclusiva del arrendador.

Se recomienda a los arrendadores consultar a un contador o asesor fiscal para cumplir correctamente con sus obligaciones ante el SAT.`
    },
    {
      subtitulo: '13. Aceptación de Términos y Deslinde de Responsabilidad',
      texto: `Al completar el proceso de registro en RentIPN, el usuario declara haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones de Uso, así como el Aviso de Privacidad correspondiente a su rol.

Esta aceptación tiene carácter vinculante y produce los siguientes efectos:
• El usuario reconoce que RentIPN actúa exclusivamente como intermediario de publicidad y no como parte en ninguna relación de arrendamiento.
• El usuario libera a RentIPN, sus desarrolladores, colaboradores y al Instituto Politécnico Nacional de cualquier responsabilidad civil, penal, fiscal o de cualquier otra naturaleza derivada del uso del sistema o de las relaciones entre usuarios.
• El usuario asume plena responsabilidad por la veracidad de la información que proporciona al registrarse y durante el uso del sistema.
• El usuario acepta que cualquier reclamación deberá dirigirse directamente a la contraparte involucrada, y no a RentIPN.

La aceptación de estos términos queda registrada con fecha, hora e identificador de cuenta al momento del registro.`
    },
    {
      subtitulo: '14. Legislación Aplicable',
      texto: `Estos términos se rigen por las leyes de los Estados Unidos Mexicanos, incluyendo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y la Ley del Impuesto sobre la Renta (LISR). Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.`
    },
    {
      subtitulo: '15. Contacto',
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
• Garantizar que la información publicada sobre sus inmuebles sea veraz, actualizada y no engañosa.

El acceso es personal; compartir credenciales está prohibido.`
    }
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getAvisoPrivacidad = (rol) => {
  const secciones = [...AVISO_PRIVACIDAD.comun]
  secciones.splice(2, 0, AVISO_PRIVACIDAD.datosPorRol[rol])
  return { titulo: AVISO_PRIVACIDAD.titulo, contenido: secciones }
}

export const getTerminosUso = (rol) => {
  const secciones = [...TERMINOS_USO.comun]
  secciones.splice(1, 0, TERMINOS_USO.condicionesPorRol[rol])
  return { titulo: TERMINOS_USO.titulo, contenido: secciones }
}