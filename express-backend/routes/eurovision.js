import pool from '../db-pg.js';
import { Router } from 'express';

const router = Router();

router.get('/actuaciones', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eurovision.actuacion;");
    //console.log(result);
    res.send(result.rows);
  } catch (err) {
    console.error('Error al obtener las actuaciones:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos de las actuaciones' });
  }
});

router.get('/listavalidacion', async (req, res) => {
  try {
    const valid = await pool.query
    (
      `SELECT DISTINCT eurovision.votaciones.id_votante, eurovision.votante.email
      FROM eurovision.votaciones
      JOIN eurovision.votante ON eurovision.votaciones.id_votante = eurovision.votante.id_votante`      
      );

    console.log(valid);
    res.send(valid.rows);
  } catch (err) {
    console.error('Error al obtener las actuaciones:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos de las actuaciones' });
  }
});



export default router; 