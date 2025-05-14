import { Router } from 'express';
import db from '../db.js';  // importar PouchDB
import jwt from 'jsonwebtoken';

const router = Router();

// CREATE, (Crud)  para REGISTRO =============================
router.post('/', async (req, res) => {
    try {
        const registro = req.body; 
        registro.type = "registro";
        registro.time = new Date().toString()
        console.log(registro)
              
        // Insert new respuesta de Ingles into the database
        const response = await db.post(registro);
        
        // Respond with success
        res.status(201).json({ id: response.id, ...registro });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add registro' });
    }
  });

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' },
    { algorithm: 'HS256' } 
)
    
res.json({ token });




export default router;