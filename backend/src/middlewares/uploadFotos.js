const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Usar memoria (no disco)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (JPEG, PNG, WEBP)'), false);
  }
};

const uploadFotos = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10
  }
});

// Subir a Cloudinary después de comprimir con sharp
const comprimirYGuardar = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const arrendadorId = req.body.arrendadorId || 'temp';
    const timestamp = Date.now();
    const urlsGuardadas = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      // Comprimir con sharp a WebP
      const bufferComprimido = await sharp(file.buffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 60 })
        .toBuffer();

      // Subir a Cloudinary
      const resultado = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'rentipn/fotos',
            public_id: `arrendador_${arrendadorId}_${timestamp}_${i + 1}`,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(bufferComprimido);
      });

      urlsGuardadas.push(resultado.secure_url);
    }

    req.fotosRutas = urlsGuardadas;
    next();
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
    res.status(500).json({ error: 'Error al procesar las imágenes' });
  }
};

// Eliminar foto de Cloudinary por URL
const eliminarFotoCloudinary = async (url) => {
  try {
    // Extraer public_id desde la URL
    const partes = url.split('/');
    const archivo = partes[partes.length - 1].split('.')[0];
    const carpeta = partes[partes.length - 2];
    const publicId = `${carpeta}/${archivo}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error al eliminar foto de Cloudinary:', error);
  }
};

module.exports = { uploadFotos, comprimirYGuardar, eliminarFotoCloudinary };