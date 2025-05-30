import { Router } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();

// GET /api/v1/carreras -> Obtener carreras por ID
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

// POST /api/v1/carreras -> Guardar nueva carrera
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const nuevoViaje = req.body;

    // Comprobar datos
    if (!nuevoViaje.lugar_recogida || !nuevoViaje.lugar_destino || !nuevoViaje.estado || !nuevoViaje.costo || !nuevoViaje.fecha_hora) {
      return res.status(400).json({ error: "Rellenar todos los campos." });
    }

    // ID del doc de Mongo
    const idUsuario = "000000000000000000000001";

    // push del nuevo viaje en el documento
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

export default router;