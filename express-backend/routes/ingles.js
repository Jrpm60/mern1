import { Router } from 'express';
import db from '../db.js';  // importar PouchDB

const router = Router();

// CREATE, (Crud)  para INGLES =============================
router.post('/', async (req, res) => {
    try {
        const ingles = req.body; // Ingles data from request body
        ingles.type = "ingles";
        ingles.time = new Date().toString()
        console.log(ingles)
              
        // Insert new respuesta de Ingles into the database
        const response = await db.post(ingles);
        
        // Respond with success
        res.status(201).json({ id: response.id, ...ingles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add respuesta' });
    }
  });
// READ, (cRud)  para INGLES =============================
router.get('/', async (req, res) => {
    try {
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });
        console.log(result)
        // Extract user data from the documents
        const ingles = result.rows
        .filter(row => row.doc.type === 'ingles')
        .map(row => row.doc);

        ingles.sort((firstItem, secondItem) => new Date(secondItem.time) - new Date(firstItem.time));
        console.log(ingles);
        // Send the users as JSON response
        res.json(ingles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve respuestas' });
    }
  });

export default router;