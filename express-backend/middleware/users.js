import { param, query, validationResult } from 'express-validator';

/**
 * Middleware to validate the 'id' parameter in the request.
 * @function validateUserId
 * @returns {Array} Array of express-validator validation chain
 */
export const validateQuery = [

    query('person').notEmpty().withMessage('La Persona es obligatoria'),
        
  
    // Middleware to handle validation results
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });  // Send validation errors as response
      }
      next();  // Continue if validation passes
    }
  ];
  