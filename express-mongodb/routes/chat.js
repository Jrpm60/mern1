//express-mongodb/routes/chat.js


import { Router } from 'express';

const router = Router();

// GET /api/v1/chats
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const chats = await db.collection('chatroom').find().toArray();
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});


export default router;