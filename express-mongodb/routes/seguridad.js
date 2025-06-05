// Colocar este archivo en /routes/ de express

import { Router } from 'express';
import { authorise } from '../middleware/authorise.js';
import { authoriseOwnership } from '../middleware/authorise.js';
import { ObjectId } from 'mongodb';



const router = Router();

const ALLOWED_API_KEYS = ['abc123', 'def456']; // deberiamos colocar en .env archivo

router.use((req, res, next)=> {

    const role = req.headers['x-api-role'];
    const userId = req.headers['x-user-id'];

    req.role = role;
    req.userId = userId;

    next();

});

// GET /api/v1/seguridad
router.get('/', authorise('read:any'), async (req, res) => {

    try {
        console.log("Here express");
        res.json({message: "exito", role: req.role});

    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});

// ===================================================================================

router.get('/:id', authoriseOwnership(), async (req, res) => {

  try {

    const db = req.app.locals.db; // get db instance from app.locals

    const usuario = await db.collection('usuarios').findOne({_id: new ObjectId(req.userId)});

    res.json(usuario);

    console.log(usuario);

  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: 'Failed to fetch usuarios' });
  }
});
//=====================================================================================

export default router;