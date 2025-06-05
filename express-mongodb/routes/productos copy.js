import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 * name: Productos
 * description: Gestión de la API de productos
 */

/**
 * @swagger
 * /productos:
 * get:
 * summary: Obtener todos los productos
 * description: Recupera una lista de todos los productos disponibles.
 * tags:
 * - Productos
 * responses:
 * 200:
 * description: Lista de productos obtenida exitosamente.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Producto'
 * 500:
 * description: Error del servidor al obtener productos.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: Failed to fetch productos
 */
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

/**
 * @swagger
 * /productos/search:
 * get:
 * summary: Buscar productos por precio máximo
 * description: Recupera productos cuyo precio es menor que el valor máximo especificado.
 * tags:
 * - Productos
 * parameters:
 * - in: query
 * name: maxPrice
 * schema:
 * type: number
 * format: float
 * required: true
 * description: El precio máximo para filtrar los productos.
 * example: 99.99
 * responses:
 * 200:
 * description: Productos filtrados por precio obtenidos exitosamente.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Producto'
 * 500:
 * description: Error del servidor al buscar productos por precio.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: Failed to fetch productos
 */
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

/**
 * @swagger
 * /productos:
 * post:
 * summary: Crear un nuevo producto
 * description: Crea un nuevo producto en la base de datos.
 * tags:
 * - Productos
 * requestBody:
 * description: Objeto del producto a crear.
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoInput'
 * responses:
 * 200:
 * description: Producto creado exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * acknowledged:
 * type: boolean
 * insertedId:
 * type: string
 * 500:
 * description: Error del servidor al crear el producto.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: Failed to create producto
 */
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
 * /productos/{id}:
 * delete:
 * summary: Eliminar un producto por ID
 * description: Elimina un producto específico de la base de datos usando su ID.
 * tags:
 * - Productos
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: El ID único del producto a eliminar.
 * example: 60c72b2f9f1b2c001c8e4d3c
 * responses:
 * 200:
 * description: Producto eliminado exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: DELETE producto with id: 60c72b2f9f1b2c001c8e4d3c
 * 500:
 * description: Error del servidor al eliminar el producto.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: Failed to delete producto
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

/**
 * @swagger
 * components:
 * schemas:
 * Producto:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: El ID único del producto (generado por la base de datos).
 * example: 60c72b2f9f1b2c001c8e4d3c
 * nombre:
 * type: string
 * description: Nombre del producto.
 * example: Laptop
 * precio:
 * type: number
 * format: float
 * description: Precio del producto.
 * example: 1200.50
 * descripcion:
 * type: string
 * description: Breve descripción del producto.
 * example: Potente laptop para juegos y trabajo.
 * required:
 * - nombre
 * - precio
 * ProductoInput:
 * type: object
 * properties:
 * nombre:
 * type: string
 * description: Nombre del producto.
 * example: Teclado Mecánico
 * precio:
 * type: number
 * format: float
 * description: Precio del producto.
 * example: 85.00
 * descripcion:
 * type: string
 * description: Breve descripción del producto.
 * example: Teclado RGB con switches táctiles.
 * required:
 * - nombre
 * - precio
 */