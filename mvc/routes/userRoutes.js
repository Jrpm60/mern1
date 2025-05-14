import express from 'express';
import { createUserController, getUsersController } from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/users', createUserController);

// Route to get all users
router.get('/users', getUsersController);

export default router;