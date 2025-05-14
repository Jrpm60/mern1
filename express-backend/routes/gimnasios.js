import { Router } from 'express';
import { informeActivos, informeAsistenciaPorTiempo } from '../models/gimnasioModel.js';

const router = Router();

router.get('/informe_activos/:estado', async (req, res) => {

    const estado = parseInt(req.params.estado, 10); // Convierte el parámetro de la URL a número

    
    if (isNaN(estado) || (estado !== 0 && estado !== 1)) { // Validar que el estado sea 0 o 1
        return res.status(400).json({ message: 'El parámetro debe ser 0 (inactivo) o 1 (activo).' });
    }

    try {
        const miembros = await informeActivos(estado); 
        res.status(200).json(miembros);
    } catch (error) {
        console.error("Error en la ruta ", error.message);
        res.status(500).json({ message: 'Error al obtener informe ', error: error.message });
    }
});


router.get('/informe_asistencia', async (req, res) => {

    const periodoInactividad = '-100 days';

/*     if (!periodoInactividad) {
        return res.status(400).json({
            message: 'Se requiere el parámetro "periodo" (ej: "-1 month", "-90 days") '
        });
    }
 */
    try {
        const miembros = await informeAsistenciaPorTiempo(periodoInactividad);
        res.status(200).json(miembros);
    } catch (error) {
        console.error("Error en la ruta ", error.message);
        res.status(500).json({ message: 'Error al obtener informe ', error: error.message });
    }
});


export default router;
