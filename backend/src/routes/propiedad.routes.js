const express = require('express');
const router = express.Router();
const { Propiedad, Arrendamiento, Fotos, Resena, Direccion, Servicio, CP } = require('../models/associations');
const { uploadFotos, comprimirYGuardar, eliminarFotoCloudinary } = require('../middlewares/uploadFotos');
const { Op } = require('sequelize');
const busquedaController = require('../controllers/busqueda.controller');

// Rutas de búsqueda para arrendatarios
router.get('/buscar', busquedaController.buscarPropiedades);
router.get('/servicios', busquedaController.obtenerServicios);
router.get('/detalle/:id', busquedaController.obtenerDetallePropiedad);


// =====================================================
// RUTAS ESPECÍFICAS (DEBEN IR PRIMERO)
// =====================================================

// Obtener propiedades de un arrendador
router.get('/arrendador/:idArrendador', async (req, res) => {
  try {
    const { idArrendador } = req.params;

    const propiedades = await Propiedad.findAll({
      where: { arrendador_idArrendador: idArrendador },
      include: [
        {
          model: Fotos,
          as: 'fotos',
          attributes: ['idFotos', 'fotosURL'],
          limit: 1
        },
        {
          model: Arrendamiento,
          as: 'arrendamientos',
          attributes: ['idArrendamiento', 'arrendamientoValArrendador', 'arrendamientoValEstudiante'],
          required: false
        }
      ],
      order: [['propiedadFechaRegis', 'DESC']]
    });

    // Calcular lugares ocupados (TODOS los arrendamientos)
    const propiedadesConLugares = propiedades.map(prop => {
      const lugaresOcupados = prop.arrendamientos ? prop.arrendamientos.length : 0;
      const lugaresDisponibles = prop.propiedadLugares - lugaresOcupados;
      
      return {
        ...prop.toJSON(),
        lugaresOcupados,
        lugaresDisponibles,
        tieneArrendamientos: lugaresOcupados > 0
      };
    });

    res.json(propiedadesConLugares);
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

// Obtener servicios del catálogo
router.get('/catalogo/servicios', async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      order: [
        ['servicioCategoria', 'ASC'],
        ['servicioNombre', 'ASC']
      ]
    });
    
    const agrupados = {
      Basico: servicios.filter(s => s.servicioCategoria === 'Basico'),
      Entretenimiento: servicios.filter(s => s.servicioCategoria === 'Entretenimiento'),
      Adicional: servicios.filter(s => s.servicioCategoria === 'Adicional')
    };
    
    res.json(agrupados);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Buscar dirección por CP
router.get('/buscar-cp/:cp', async (req, res) => {
  try {
    const { cp } = req.params;
    
    const direccion = await CP.findOne({
      where: { 
        d_codigo: cp,
        cpAceptadoSistema: 1
      }
    });
    
    if (!direccion) {
      return res.status(404).json({ error: 'CP no encontrado o no aceptado en el sistema' });
    }
    
    res.json({
      cp: direccion.d_codigo,
      colonia: direccion.d_asenta,
      municipio: direccion.D_mnpio,
      estado: direccion.d_estado
    });
  } catch (error) {
    console.error('Error al buscar CP:', error);
    res.status(500).json({ error: 'Error al buscar CP' });
  }
});

// Obtener propiedades disponibles de un arrendador
router.get('/disponibles/arrendador/:idArrendador', async (req, res) => {
  try {
    const { idArrendador } = req.params;

    const propiedades = await Propiedad.findAll({
      where: { 
        arrendador_idArrendador: idArrendador,
        propiedadEstatus: 'Disponible'
      },
      include: [
        {
          model: Fotos,
          as: 'fotos',
          attributes: ['fotosURL'],
          limit: 1
        },
        {
          model: Direccion,
          as: 'direccion',
          attributes: ['direccionCalle', 'direccionNumExt', 'direccionNumInt'],
          include: [
            {
              model: CP,
              as: 'cp',
              attributes: ['d_codigo', 'd_asenta', 'D_mnpio', 'd_estado']
            }
          ]
        }
      ]
    });

    const propiedadesConDisponibilidad = [];
    
    for (const prop of propiedades) {
      const lugaresOcupados = await Arrendamiento.count({
        where: {
          propiedad_idPropiedad: prop.idPropiedad  // Cuenta TODOS los arrendamientos
        }
      });
      
      if (lugaresOcupados < prop.propiedadLugares) {
        propiedadesConDisponibilidad.push({
          ...prop.toJSON(),
          lugaresOcupados,
          lugaresDisponibles: prop.propiedadLugares - lugaresOcupados
        });
      }
    }

    res.json(propiedadesConDisponibilidad);
  } catch (error) {
    console.error('Error al obtener propiedades disponibles:', error);
    res.status(500).json({ error: 'Error al obtener propiedades disponibles' });
  }
});

// =====================================================
// RUTAS CON PARÁMETRO ID (ESPECÍFICAS PRIMERO)
// =====================================================

// Obtener propiedad completa (para editar)
router.get('/:id/completo', async (req, res) => {
  try {
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id, {
      include: [
        {
          model: Fotos,
          as: 'fotos',
          attributes: ['idFotos', 'fotosURL']
        },
        {
          model: Direccion,
          as: 'direccion',
          include: [
            {
              model: CP,
              as: 'cp',
              attributes: ['idCP', 'd_codigo', 'd_asenta', 'D_mnpio', 'd_estado']
            }
          ]
        },
        {
          model: Servicio,
          as: 'servicios',
          through: { attributes: [] }
        }
      ]
    });

    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    // Contar arrendamientos activos para validar el mínimo de lugares al editar
    const arrendamientosActivos = await Arrendamiento.count({
      where: { propiedad_idPropiedad: id }
    });

    res.json({ ...propiedad.toJSON(), arrendamientosActivos });
  } catch (error) {
    console.error('Error al obtener propiedad completa:', error);
    res.status(500).json({ error: 'Error al obtener propiedad' });
  }
});

// Cambiar estado de propiedad
router.patch('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['Disponible', 'Sin Disponibilidad', 'Desactivada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    const propiedad = await Propiedad.findByPk(id);
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    // Calcular lugares ocupados
    const lugaresOcupados = await Arrendamiento.count({
      where: { propiedad_idPropiedad: id }
    });
    const lugaresDisponibles = propiedad.propiedadLugares - lugaresOcupados;

    // Si no hay lugares disponibles, no puede ponerse en Disponible
    if (estado === 'Disponible' && lugaresDisponibles <= 0) {
      return res.status(400).json({ error: 'No puedes activar la propiedad porque no tiene lugares disponibles' });
    }

    await propiedad.update({ propiedadEstatus: estado });

    res.json({ message: 'Estado actualizado exitosamente', propiedad, lugaresDisponibles });
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    res.status(500).json({ error: 'Error al cambiar estado' });
  }
});

// Actualizar estatus automáticamente según lugares disponibles
router.patch('/:id/actualizar-estatus', async (req, res) => {
  try {
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id);
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    // No tocar propiedades desactivadas manualmente
    if (propiedad.propiedadEstatus === 'Desactivada') {
      return res.json({ message: 'Propiedad desactivada, no se modifica', estatus: 'Desactivada' });
    }

    const lugaresOcupados = await Arrendamiento.count({
      where: { propiedad_idPropiedad: id }
    });
    const lugaresDisponibles = propiedad.propiedadLugares - lugaresOcupados;

    const nuevoEstatus = lugaresDisponibles > 0 ? 'Disponible' : 'Sin Disponibilidad';
    await propiedad.update({ propiedadEstatus: nuevoEstatus });

    res.json({ message: 'Estatus actualizado', estatus: nuevoEstatus, lugaresDisponibles });
  } catch (error) {
    console.error('Error al actualizar estatus:', error);
    res.status(500).json({ error: 'Error al actualizar estatus' });
  }
});

// =====================================================
// RUTA GENÉRICA POR ID (AL FINAL)
// =====================================================

// Obtener una propiedad por ID (básica)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id, {
      include: [
        {
          model: Fotos,
          as: 'fotos',
          attributes: ['idFotos', 'fotosURL']
        },
        {
          model: Arrendamiento,
          as: 'arrendamientos',
          attributes: ['idArrendamiento', 'arrendamientoValArrendador', 'arrendamientoValEstudiante'],
          where: {
            arrendamientoValArrendador: 0
          },
          required: false
        }
      ]
    });

    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    res.json(propiedad);
  } catch (error) {
    console.error('Error al obtener propiedad:', error);
    res.status(500).json({ error: 'Error al obtener propiedad' });
  }
});

// =====================================================
// CREAR PROPIEDAD
// =====================================================
router.post('/', uploadFotos.array('fotos', 10), comprimirYGuardar, async (req, res) => {
  try {
    const {
      propiedadTitulo,
      propiedadDescripcion,
      propiedadTipo,
      propiedadLugares,
      propiedadPrecio,
      propiedadPrecioPor,
      direccionCalle,
      direccionNumExt,
      direccionNumInt,
      cp,
      colonia,
      municipio,
      estado,
      arrendador_idArrendador,
      servicios
    } = req.body;

    // Verificar que el arrendador no tenga más de 3 propiedades
    const cantidadPropiedades = await Propiedad.count({
      where: { arrendador_idArrendador }
    });

    if (cantidadPropiedades >= 3) {
      return res.status(400).json({ error: 'Has alcanzado el límite de 3 propiedades' });
    }

    // Verificar fotos
    if (!req.fotosRutas || req.fotosRutas.length < 3) {
      return res.status(400).json({ error: 'Se requieren mínimo 3 fotos' });
    }

    // Buscar o crear CP
    let cpRecord = await CP.findOne({ where: { d_codigo: cp } });
    
    if (!cpRecord) {
      cpRecord = await CP.create({
        d_codigo: cp,
        d_asenta: colonia,
        D_mnpio: municipio,
        d_estado: estado,
        cpAceptadoSistema: 0
      });
    }

    // Crear dirección
    const nuevaDireccion = await Direccion.create({
      direccionCalle: direccionCalle,
      direccionNumExt: direccionNumExt,
      direccionNumInt: direccionNumInt || null,
      CP_idCP: cpRecord.idCP
    });

    // Crear propiedad
    const nuevaPropiedad = await Propiedad.create({
      propiedadTitulo,
      propiedadDescripcion,
      propiedadTipo,
      propiedadLugares: parseInt(propiedadLugares),
      propiedadPrecio: parseFloat(propiedadPrecio),
      propiedadPrecioPor: propiedadPrecioPor || 'Persona',
      propiedadEstatus: 'Disponible',
      propiedadFechaRegis: new Date(),
      direccion_idDireccion: nuevaDireccion.idDireccion,
      arrendador_idArrendador: parseInt(arrendador_idArrendador)
    });

    // Guardar fotos en DB
    const fotosPromises = req.fotosRutas.map(ruta => 
      Fotos.create({
        fotosURL: ruta,
        propiedad_idPropiedad: nuevaPropiedad.idPropiedad
      })
    );
    await Promise.all(fotosPromises);

    // Asignar servicios
    if (servicios) {
      const serviciosArray = JSON.parse(servicios);
      const { ServicioHasPropiedad } = require('../models/associations');
      const serviciosPromises = serviciosArray.map(idServicio =>
        ServicioHasPropiedad.create({
          servicio_idServicio: idServicio,
          propiedad_idPropiedad: nuevaPropiedad.idPropiedad
        })
      );
      await Promise.all(serviciosPromises);
    }

    res.status(201).json({
      message: 'Propiedad creada exitosamente',
      propiedadId: nuevaPropiedad.idPropiedad
    });

  } catch (error) {
    console.error('Error al crear propiedad:', error);
    res.status(500).json({ error: 'Error al crear propiedad' });
  }
});

// =====================================================
// ACTUALIZAR PROPIEDAD
// =====================================================
router.put('/:id', uploadFotos.array('fotos', 10), comprimirYGuardar, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      propiedadTitulo,
      propiedadDescripcion,
      propiedadTipo,
      propiedadLugares,
      propiedadPrecio,
      propiedadPrecioPor,
      direccionCalle,
      direccionNumExt,
      direccionNumInt,
      cp,
      colonia,
      municipio,
      estado,
      servicios,
      fotosExistentes
    } = req.body;

    const propiedad = await Propiedad.findByPk(id);
    
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    // Validar que los nuevos lugares no sean menores a los arrendamientos activos
    if (propiedadLugares !== undefined) {
      const arrendamientosActivos = await Arrendamiento.count({
        where: { propiedad_idPropiedad: id }
      });
      if (parseInt(propiedadLugares) < arrendamientosActivos) {
        return res.status(400).json({
          error: `No puedes reducir los lugares a ${propiedadLugares}. Hay ${arrendamientosActivos} arrendamiento(s) activo(s) que requieren al menos ${arrendamientosActivos} lugar(es).`
        });
      }
    }

    // Actualizar dirección
    const direccion = await Direccion.findByPk(propiedad.direccion_idDireccion);
    if (direccion) {
      let cpRecord = await CP.findOne({ where: { d_codigo: cp } });
      if (!cpRecord) {
        cpRecord = await CP.create({
          d_codigo: cp,
          d_asenta: colonia,
          D_mnpio: municipio,
          d_estado: estado,
          cpAceptadoSistema: 0
        });
      }

      await direccion.update({
        direccionCalle,
        direccionNumExt,
        direccionNumInt: direccionNumInt || null,
        CP_idCP: cpRecord.idCP
      });
    }

    // Actualizar propiedad
    await propiedad.update({
      propiedadTitulo,
      propiedadDescripcion,
      propiedadTipo,
      propiedadLugares: parseInt(propiedadLugares),
      propiedadPrecio: parseFloat(propiedadPrecio),
      propiedadPrecioPor: propiedadPrecioPor || 'Persona'
    });

    // Gestionar fotos existentes
    if (fotosExistentes) {
      const fotosMantener = JSON.parse(fotosExistentes);
      
      const fotosActuales = await Fotos.findAll({ where: { propiedad_idPropiedad: id } });
      for (const foto of fotosActuales) {
        if (!fotosMantener.includes(foto.idFotos)) {
          await eliminarFotoCloudinary(foto.fotosURL);
          await foto.destroy();
        }
      }
    }

    // Agregar nuevas fotos
    if (req.fotosRutas && req.fotosRutas.length > 0) {
      const fotosPromises = req.fotosRutas.map(ruta =>
        Fotos.create({
          fotosURL: ruta,
          propiedad_idPropiedad: id
        })
      );
      await Promise.all(fotosPromises);
    }

    // Actualizar servicios
    if (servicios) {
      const { ServicioHasPropiedad } = require('../models/associations');
      await ServicioHasPropiedad.destroy({ where: { propiedad_idPropiedad: id } });
      
      const serviciosArray = JSON.parse(servicios);
      const serviciosPromises = serviciosArray.map(idServicio =>
        ServicioHasPropiedad.create({
          servicio_idServicio: idServicio,
          propiedad_idPropiedad: id
        })
      );
      await Promise.all(serviciosPromises);
    }

    // Recalcular estatus según nuevos lugares disponibles
    if (propiedadLugares) {
      const propiedad2 = await Propiedad.findByPk(id);
      if (propiedad2 && propiedad2.propiedadEstatus !== 'Desactivada') {
        const ocupados = await Arrendamiento.count({ where: { propiedad_idPropiedad: id } });
        const disponibles = parseInt(propiedadLugares) - ocupados;
        const nuevoEstatus = disponibles > 0 ? 'Disponible' : 'Sin Disponibilidad';
        await propiedad2.update({ propiedadEstatus: nuevoEstatus });
      }
    }

    res.json({ message: 'Propiedad actualizada exitosamente' });

  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    res.status(500).json({ error: 'Error al actualizar propiedad' });
  }
});

// =====================================================
// ELIMINAR PROPIEDAD
// =====================================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id);
    
    if (!propiedad) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    // Verificar si tiene CUALQUIER arrendamiento existente
    const arrendamientosExistentes = await Arrendamiento.count({
      where: {
        propiedad_idPropiedad: id
      }
    });

    if (arrendamientosExistentes > 0) {
      return res.status(400).json({ 
        error: `No se puede eliminar. Esta propiedad tiene ${arrendamientosExistentes} arrendamiento(s) asociado(s). Primero debes finalizar y eliminar todos los arrendamientos.` 
      });
    }

    // Eliminar fotos de Cloudinary
    const fotos = await Fotos.findAll({ where: { propiedad_idPropiedad: id } });
    for (const foto of fotos) {
      await eliminarFotoCloudinary(foto.fotosURL);
    }

    // Eliminar servicios asociados
    const { ServicioHasPropiedad } = require('../models/associations');
    await ServicioHasPropiedad.destroy({ where: { propiedad_idPropiedad: id } });

    // Eliminar reseñas asociadas
    await Resena.destroy({ where: { propiedad_idPropiedad: id } });

    // Eliminar fotos de la DB
    await Fotos.destroy({ where: { propiedad_idPropiedad: id } });

    // Eliminar propiedad
    await propiedad.destroy();

    res.json({ message: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar propiedad:', error);
    res.status(500).json({ error: 'Error al eliminar propiedad', details: error.message });
  }
});

module.exports = router;