import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve una lista de todos los productos disponibles.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "664f173bd4e2b36c50ac9b1a"
 *                   nombre:
 *                     type: string
 *                     example: "Guitarra eléctrica"
 *                   precio:
 *                     type: number
 *                     example: 499.99
 *                   enStock:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error del servidor
 */


// GET /api/v1/productos
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const productos = await db.collection('productos').find().toArray();
    res.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals

    const maxValue = parseFloat(req.query.maxPrice);
    const productos = await db.collection('productos').find({ precio: { $lt: maxValue } }).toArray();
    
    res.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

router.post('/', async (req, res) => {

  console.log('Petición POST recibida para /productos');
  console.log('Datos recibidos en req.body:', req.body); 


  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const newProducto = req.body;
    
    const result = await db.collection('productos').insertOne(newProducto);

    res.json(result);

  } catch (error) {
    console.error("Error Creando el producto:", error);
    res.status(500).json({ error: 'Failed to create producto' });
  }
});

/**
 * @swagger
 * /productos:
 *   delete:
 *     summary: Borrar productos
 *     description: Borra el pruducto elegudo.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "664f173bd4e2b36c50ac9b1a"
 *                   nombre:
 *                     type: string
 *                     example: "Guitarra eléctrica"
 *                   precio:
 *                     type: number
 *                     example: 499.99
 *                   enStock:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error del servidor
 */

router.delete('/:id', async (req, res) => {
  try {
    // You can implement your delete logic here, example:
    const db = req.app.locals.db;
    const id = req.params.id;

    res.json({ message: `DELETE producto with id: ${id}` });
  } catch (error) {
    console.error("Error deleting producto:", error);
    res.status(500).json({ error: 'Failed to delete producto' });
  }
});

export default router;