import { Router } from 'express';
import db from '../db.js';  // importar PouchDB

const router = Router();


// VER DATOS DE LA BBDD parte MOTIVACION =============================

router.get('/', async (req, res) => {
  try {
      // Fetch all documents from the 'users_db'
      const result = await db.allDocs({ include_docs: true });
      console.log(result)
      // Extract user data from the documents
      const motivacion = result.rows
      .filter(row => row.doc.type === 'motivacion')
      .map(row => row.doc);

      // Send the users as JSON response
      res.json(motivacion);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve motivacion' });
  }
});
// PONER DATOS DE LA BBDD parte motivacion =============================
  router.post('/', async (req, res) => {
    try {
        const motivacion = req.body; // User data from request body
        motivacion.type = "motivacion";
              
        // Insert new user into the database
        const response = await db.post(motivacion);
        console.log(response);
        
        // Respond with success
        res.status(201).json({ id: response.id, ...motivacion });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add motivacion' });
    }
  });

  export default router;