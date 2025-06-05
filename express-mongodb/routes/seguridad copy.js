// Colocar este archivo en /routes/ de express

import { Router } from 'express';
import { authorise } from '../middleware/authorise.js';
import { authoriseOwnership } from '../middleware/authorise.js';
import { ObjectId } from 'mongodb';

/**
 * @swagger
 * tags:
 * name: Seguridad
 * description: Endpoints relacionados con la seguridad y autorización de usuarios.
 *
 * components:
 * securitySchemes:
 * ApiKeyAuth:
 * type: apiKey
 * in: header
 * name: x-api-key
 * RoleAuth:
 * type: apiKey
 * in: header
 * name: x-api-role
 * UserIdAuth:
 * type: apiKey
 * in: header
 * name: x-user-id
 * schemas:
 * Usuario:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: ID único del usuario (generado por la base de datos).
 * example: "60c72b2f9f1b2c001c8e4d3c"
 * nombre:
 * type: string
 * description: Nombre del usuario.
 * example: "Juan Pérez"
 * email:
 * type: string
 * format: email
 * description: Correo electrónico del usuario.
 * example: "juan.perez@example.com"
 * role:
 * type: string
 * description: Rol del usuario en el sistema.
 * enum: [admin, user, guest]
 * example: "user"
 *
 * paths:
 * /seguridad:
 * get:
 * summary: Obtener estado de seguridad (con autorización de rol)
 * description: Devuelve un mensaje de éxito y el rol del usuario si la autorización es exitosa.
 * tags:
 * - Seguridad
 * security:
 * - RoleAuth: []
 * parameters:
 * - in: header
 * name: x-api-role
 * schema:
 * type: string
 * enum: [admin, user, guest]
 * required: true
 * description: Rol del usuario para la autorización.
 * example: "admin"
 * responses:
 * '200':
 * description: Éxito en la autorización.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "exito"
 * role:
 * type: string
 * example: "admin"
 * '403':
 * description: Acceso denegado debido a rol insuficiente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Unauthorized: Insufficient role"
 * '500':
 * description: Error del servidor al obtener la seguridad.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Failed to fetch seguridad"
 *
 * /seguridad/{id}:
 * get:
 * summary: Obtener datos de usuario por ID (con autorización de propiedad)
 * description: Recupera los datos de un usuario específico. La autorización de propiedad asegura que solo el propio usuario o un admin puedan ver su información.
 * tags:
 * - Seguridad
 * security:
 * - UserIdAuth: []
 * - ApiKeyAuth: [] # Si usas una API Key general para acceder al endpoint
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: El ID del usuario a recuperar.
 * example: "60c72b2f9f1b2c001c8e4d3c"
 * - in: header
 * name: x-user-id
 * schema:
 * type: string
 * required: true
 * description: El ID del usuario autenticado (debe coincidir con el ID del path o ser admin).
 * example: "60c72b2f9f1b2c001c8e4d3c"
 * - in: header
 * name: x-api-role
 * schema:
 * type: string
 * enum: [admin, user, guest]
 * description: Rol del usuario para la autorización (necesario para el middleware `authoriseOwnership`).
 * example: "user"
 * responses:
 * '200':
 * description: Datos del usuario obtenidos exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * '403':
 * description: Acceso denegado. El usuario no tiene permiso para ver esta información.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Unauthorized: You don't own this resource or lack admin privileges"
 * '404':
 * description: Usuario no encontrado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Usuario not found"
 * '500':
 * description: Error del servidor al obtener el usuario.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Failed to fetch usuarios"
 */

const router = Router();

const ALLOWED_API_KEYS = ['abc123', 'def456']; // deberiamos colocar en .env archivo

router.use((req, res, next)=> {

    const role = req.headers['x-api-role'];
    const userId = req.headers['x-user-id'];

    req.role = role;
    req.userId = userId;

    next();

});

// GET /api/v1/seguridad
router.get('/', authorise('read:any'), async (req, res) => {

    try {
        console.log("Here express");
        res.json({message: "exito", role: req.role});

    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});

// ===================================================================================

router.get('/:id', authoriseOwnership(), async (req, res) => {

  try {

    const db = req.app.locals.db; // get db instance from app.locals

    const usuario = await db.collection('usuarios').findOne({_id: new ObjectId(req.userId)});

    res.json(usuario);

    console.log(usuario);

  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: 'Failed to fetch usuarios' });
  }
});
//=====================================================================================

export default router;