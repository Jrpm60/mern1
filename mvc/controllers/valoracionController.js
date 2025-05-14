// Ejemplo de contenido de valoracionController.js
import Evento from '../models/Evento.js'; // Importa tu modelo de Evento (ajusta la ruta según tu estructura)
import Valoracion from '../models/Valoracion.js'; // Importa tu modelo de Valoracion (si lo tienes)

const createValoracionController = async (req, res) => {
  try {
    const { eventId, stars, opinion } = req.body;

    // Valida que eventId, stars y opinion estén presentes
    if (!eventId || stars === undefined || !opinion) {
      return res.status(400).json({ message: 'Faltan datos de valoración.' });
    }

    // Valida que la opinión tenga al menos 30 caracteres (como indicaste en el frontend)
    if (opinion.length < 30) {
      return res.status(400).json({ message: 'La opinión debe tener al menos 30 caracteres.' });
    }

    // Opcional: Verifica si el evento con el eventId existe
    const evento = await Evento.findById(eventId);
    if (!evento) {
      return res.status(404).json({ message: 'El evento con el ID proporcionado no existe.' });
    }

    // Crea una nueva valoración
    const nuevaValoracion = new Valoracion({
      evento: eventId, // Asocia la valoración al evento usando el eventId
      stars: stars,
      opinion: opinion,
      // Puedes añadir más campos si es necesario (usuario que valora, fecha, etc.)
    });

    // Guarda la valoración en la base de datos
    const valoracionGuardada = await nuevaValoracion.save();

    res.status(201).json({ message: 'Valoración creada con éxito.', valoracion: valoracionGuardada });

  } catch (error) {
    console.error('Error al crear la valoración:', error);
    res.status(500).json({ message: 'Error al guardar la valoración en el servidor.' });
  }
};

export { createValoracionController }; // Asegúrate de exportar la función