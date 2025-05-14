import { Router } from 'express';
import db from '../db.js';  // importar PouchDB

const router = Router();

// FILTER, para USERS =============================

router.get('/search', async (req, res) => {
  const {precio} = req.query;
  
  try {
    const selector = {
/*       $and: [
        {nombre: nombre},
        {edad: {$gt: edad}}
      ]*/
    }  

    if (precio) {
      selector.precio = precio ;      
    }

    console.log(selector)          
   
    const result = await db.find({
      selector,
      fields: ['_id', '_rev', 'marca', 'modelo', 'año', 'color', 'puertas', 'precio', 'imagen', 'type'],
    
    });

    res.json(result);

} catch (error) {
    res.status(500).json({ error: 'Failed to find user' });
}

})

// VER DATOS DE LA BBDD parte COCHES =============================
router.get('/', async (req, res) => {

    // http://localhost:5000/api/v1/coches?summary=count
    const {summary} = req.query;
    try {
        // Fetch all documents from the 'coches_db'
        const result = await db.allDocs({ include_docs: true });

        // Extract user data from the documents
        const coches = result.rows
        .filter(row => row.doc.type === 'coche')
        .map(row => row.doc);

        if(summary === "count") {
            res.json({respuesta: coches.length})                     
        }
        else if(summary === "average") {
          //http://localhost:5000/api/v1/coches?summary=average
          if (coches.length === 0) {
              res.json({ respuesta: 0 }); // O algún otro valor por defecto o mensaje
              return;
          }
          let suma=0
          coches.forEach(element => {
          suma += parseFloat(element.precio); // Asegurarse de que el precio sea un número
          })
          const resultado = suma/coches.length;
          res.json({respuesta: resultado})
      }
        else {
            // Send the users as JSON response
            res.json(coches);
        }  

    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve coches' });
    }
  });
// PONER DATOS DE LA BBDD parte coches =============================
  router.post('/', async (req, res) => {
    try {
        const coche = req.body; // User data from request body
        coche.type = "coche";
              
        // Insert new user into the database
        const response = await db.post(coche);
        
        // Respond with success
        res.status(201).json({ id: response.id, ...coche });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add coche' });
    }
  });
// BORRAR DATOS DE LA BBDD parte coches =============================
  router.delete('/:id', async (req, res) => {
    const {id} = req.params; 
  
    try {
  
      const coche = await db.get(id);
     
      await db.remove(coche);
  
      res.status(200).json({message: "ok"})
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete coche' });
  }
  });
// MODIFICAR DATOS DE LA BBDD parte USERS =============================
  router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updatedCoche = req.body;
  
    try {
      const existingCoche = await db.get(id);
  
      const updatedDoc = {
        ...existingCoche,
        ...updatedCoche, // This will overwrite any matching fields
      };
  
      const response = await db.put(updatedDoc);
  
      res.status(200).json({
        id: response.id,
        rev: response.rev,
        ...updatedCoche,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete coche' });
  }
  });
//==================================================================


  export default router;