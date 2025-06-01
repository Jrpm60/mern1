//express-mongodb/routes/carreras.js

import { Router } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();

//================== GET /api/v1/carreras -> VER CARRERAS /:ID ==========================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = req.app.locals.db; // Obtener instancia de la BD
    const carreras = await db.collection('carreras_web').find({ _id: new ObjectId(id) }).toArray();
    res.json(carreras);
  } catch (error) {
    console.error("Error al obtener carreras:", error);
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
});

// =================== POST /api/v1/carreras -> NUEVA CARRERA (PARA USUARIO ...000001) ========================
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const nuevoViaje = req.body;

    // GESTION DE errores : CAMPOS RELLENADOS 100%
    if (!nuevoViaje.lugar_recogida || !nuevoViaje.lugar_destino || !nuevoViaje.estado || !nuevoViaje.costo || !nuevoViaje.fecha_hora) {
      return res.status(400).json({ error: "Rellenar todos los campos." });
    }

    // USUARIO
    const idUsuario = "000000000000000000000001";

    // PUSH
    const result = await db.collection('carreras_web').updateOne(
      { _id: new ObjectId(idUsuario) }, 
      { $push: { viajes: nuevoViaje } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "No existe el documento." });
    }

    res.status(201).json({ message: "Viaje Reservado!", viaje: nuevoViaje });
  } catch (error) {
    console.error("Error al agregar el viaje:", error);
    res.status(500).json({ error: "Error al agregar el viaje." });
  }
});

// =================== PUT /viaje/:userId/:idViaje -> ACTUALIZACION ESTADO (VIAJE) ========================

router.put('/viaje/:userId/:idViaje', async (req, res) => {
  const { userId, idViaje } = req.params;
  const { estado } = req.body; 

  // Validar que se ha proporcionado un nuevo estado
  if (!estado) { 
    return res.status(400).json({ error: "Se necesita el nuevo estado" });}

  try {
    const db = req.app.locals.db; // Instanciar la base de datos

    // Realizar la actualización en MongoDB

    const result = await db.collection('carreras_web').updateOne(
      {
        _id: new ObjectId(userId), // Identificar el documento
        "viajes.id_viaje.$oid": idViaje // Identifiacar viaje en el documento
      },
      {
        $set: { "viajes.$.estado": estado } // Set para actualizar el estado
      }
    );

    // Gestion de errores
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Usuario o viaje no encontrado." });
    }

    if (result.modifiedCount === 0) {
      return res.status(304).json({ message: "El estado no ha cambiado." });
    }

    // Respuesta exitosa
    res.status(200).json({ message: "Estado actualizado.", idViaje, nuevoEstado: estado });

  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar el estado." });
  }
});

export default router;