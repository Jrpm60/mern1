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

router.post('/votar', async (req, res) => {
  try {
    const { email, pais, votos } = req.body;

    if (!email || !pais || !Array.isArray(votos)) {
      return res.status(400).json({ error: 'Datos incompletos o mal formateados' });
    }

    // Buscar id_pais a partir del código (por ejemplo "ESP")
    const paisResult = await pool.query(
      'SELECT id_pais FROM eurovision.paises WHERE id_pais = $1',
      [pais]
    );

    if (paisResult.rows.length === 0) {
      return res.status(400).json({ error: 'Código de país no válido' });
    }

    const id_pais = paisResult.rows[0].id_pais;

    // Buscar id_votante por email (sabemos que aún no existe, pero lo dejamos por seguridad)
    let votanteResult = await pool.query(
      'SELECT id_votante FROM eurovision.votante WHERE email = $1',
      [email]
    );

    let id_votante;
    if (votanteResult.rows.length > 0) {
      id_votante = votanteResult.rows[0].id_votante;
    } else {
      const insertVotante = await pool.query(
        'INSERT INTO eurovision.votante (email, id_pais) VALUES ($1, $2) RETURNING id_votante',
        [email, id_pais]
      );
      id_votante = insertVotante.rows[0].id_votante;
    }

    // Insertar votos
    await pool.query('BEGIN');
    for (const voto of votos) {
      await pool.query(
        'INSERT INTO eurovision.votaciones (id_votante, id_actu, voto) VALUES ($1, $2, $3)',
        [id_votante, voto.id_actu, voto.voto]
      );
    }
    await pool.query('COMMIT');

    res.json({ message: 'Votos recibidos correctamente' });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error al guardar los votos:', err);
    res.status(500).json({ error: 'Error al guardar los votos' });
  }
});


export default router; 