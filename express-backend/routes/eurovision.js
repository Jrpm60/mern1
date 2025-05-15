import pool from '../db-pg.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eurovision.actuacion;");
    //console.log(result);
    res.send(result.rows);
  } catch (err) {
    console.error('Error al obtener las actuaciones:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos de las actuaciones' });
  }
});

export default router; 