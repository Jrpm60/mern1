import express from 'express';
import { createEventController, getEventsController , getEventController} from '../controllers/eventController.js';

const router = express.Router();

// Route to create a new Event
router.post('/events', createEventController);

// Route to get all Events
router.get('/events', getEventsController);

// Route to get all Events
router.get('/events/:id', getEventController);

// Route to create a new Valoracion for an Event
router.post('/events/valoraciones', createValoracionController); 


export default router;