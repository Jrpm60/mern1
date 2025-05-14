import db from '../db-sqlite.js';

export function informeActivos(estadoActivo) {
  return new Promise((resolve, reject) => {

    db.all(`SELECT * FROM miembros WHERE activo = ?`, [estadoActivo ? 1 : 0], function (err, rows) {
        if (err) {
        console.error("Error al obtener informe de miembros activos/inactivos:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}


export function informeAsistenciaPorTiempo(periodoInactividad) {
  return new Promise((resolve, reject) => {
    
    if (!periodoInactividad || typeof periodoInactividad !== 'string') {
      return reject(new Error('El periodo una cadena de texto (ej: "-1 month", "-90 days").'));
    }

    const query = `
      SELECT *
      FROM miembros
      WHERE
        ultima_asistencia IS NOT NULL
        AND ultima_asistencia < date('now', ?);
    `;

    db.all(query, [periodoInactividad], function (err, rows) {
      if (err) {
        console.error("Error de miembros inactivos por tiempo:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}