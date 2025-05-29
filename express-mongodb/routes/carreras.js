import { Router } from 'express';
import {ObjectId} from 'mongodb'
const router = Router();

// GET /api/v1/carreras
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const carreras = await db.collection('carreras_web').find({_id:new ObjectId(id)}).toArray();
    res.json(carreras);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

export default router;