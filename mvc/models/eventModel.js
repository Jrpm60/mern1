import db from '../db.js';  // importar PouchDB
const DOC_TYPE = "event";  

// Function to create a new event
const createEvent = async (eventData) => {
    const event = {
        type: DOC_TYPE,  // Distinguishes this doc as a 'event'
        ...eventData,
    };
    const response = await db.post(event); // let PouchDB generate the _id
    return { _id: response.id, _rev: response.rev, ...event,  };
  };
  
  // Function to get all events
  const getEvents = async () => {
    const result = await db.allDocs({ include_docs: true });
    return result.rows
        .map(row => row.doc)
        .filter(doc => doc.type === DOC_TYPE);
  };

  const getEvent = async (id) => {
    const result = await db.get(id);
    return result;
  };

  
export { createEvent, getEvents, getEvent };
