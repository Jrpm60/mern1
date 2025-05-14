import db from '../db.js';  // importar PouchDB
const DOC_TYPE = "user";  

// Function to create a new user
const createUser = async (userData) => {
    const user = {
        type: DOC_TYPE,  // Distinguishes this doc as a 'user'
        ...userData,
    };
    const response = await db.post(user); // let PouchDB generate the _id
    return { _id: response.id, _rev: response.rev, ...user,  };
  };
  
  // Function to get all users
  const getUsers = async () => {
    const result = await db.allDocs({ include_docs: true });
    return result.rows
        .map(row => row.doc)
        .filter(doc => doc.type === DOC_TYPE);
  };
  
export { createUser, getUsers };
