import { createEvent, getEvents, getEvent } from '../models/eventModel.js';

// Controller to create a new event
const createEventController = async (req, res) => {
  try {
    const event = await createEvent(req.body);  // Call model function
    res.status(201).json(event);  // Send the created event back
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Controller to get all events
const getEventsController = async (req, res) => {
  try {
    const events = await getEvents();  // Call model function
    res.status(200).json(events);  // Send events back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
};

const getEventController = async (req, res) => {
  try {
    const {id} = req.params;
    const event = await getEvent(id);  // Call model function
    res.status(200).json(event);  // Send events back
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
};

export { createEventController, getEventsController, getEventController };
