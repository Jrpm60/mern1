import { Router } from 'express';
import db from '../db.js';  // importar PouchDB
import {  validateQuery } from '../middleware/users.js';

const router = Router();

// Forma con router.use para NEXT

// router.use('/test1', async (req, res, next)=> {
//   console.log(`Logging: ${req.method}`);
//   next();
// })

// router.get('/test1', async (req, res,)=> {
//   res.json({message:"ok"});
// })

// Forma con function para NEXT

// function auditar (req, res, next) {
//   console.log("hola");
//   next();
// }

// router.get('/test1/:edad', validateUserId, async (req, res)=> {
//   const {edad} = req.params;
//   res.json({message:`edad ${edad} es OK`});
// })

router.get('/test1', validateQuery, async (req, res)=> {
  const {person, edad} = req.query;
  res.json({message:`id ${person} es OK`});
})

// FILTER, para USERS =============================

router.get('/search', async (req, res) => {
  const {nombre, edad} = req.query;
  
  try {
    const selector = {
/*       $and: [
        {nombre: nombre},
        {edad: {$gt: edad}}
      ]*/
    }  

    if (nombre) {
      selector.nombre = nombre ;      
    }

    if (edad) {
      selector.edad = {$gt : parseInt(edad)}     
    }

    console.log(selector)          
   
    const result = await db.find({
      selector,
      fields: ['_id', '_rev', 'nombre', 'edad'],
    
    });

    res.json(result);

} catch (error) {
    res.status(500).json({ error: 'Failed to find user' });
}

})


// CREATE, (Crud)  para USERS =============================
router.post('/', async (req, res) => {
    try {
        const user = req.body; // User data from request body
        user.type = "user";
              
        // Insert new user into the database
        const response = await db.post(user);
        
        // Respond with success
        res.status(201).json({ id: response.id, ...user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
  });
// READ, (cRud)  para USERS =============================
router.get('/', async (req, res) => {
    try {
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });

        // Extract user data from the documents
        const users = result.rows
        .filter(row => row.doc.type === 'user')
        .map(row => row.doc);
  
        // Send the users as JSON response
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
  });
// UPDATE, (crUd)  para USERS =============================
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;
  
    try {
      const existingUser = await db.get(id);
  
      const updatedDoc = {
        ...existingUser,
        ...updatedUser, // This will overwrite any matching fields
      };
  
      const response = await db.put(updatedDoc);
  
      res.status(200).json({
        id: response.id,
        rev: response.rev,
        ...updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
  }
  });

// DELETE, (cruD)  para USERS =============================
  router.delete('/:id', async (req, res) => {
    const {id} = req.params; 
    try {
        const user = await db.get(id);
        await db.remove(user);
        res.status(200).json({message: "ok"})
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
  }
  });

//==================================================================

export default router;