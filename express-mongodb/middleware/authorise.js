import { roles } from './rbac.js';
import { ObjectId } from 'mongodb';

export function authorise(permission) {
  return (req, res, next) => {
    const userRole = req.role;

    // Check if role exists and has the permission
    if (roles[userRole] && roles[userRole].includes(permission)) {
      return next(); // allowed
    }

    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  };
}

// TO DO comprobar que el header x-user-id ==/:id
export function authoriseOwnership() {
    return (req, res, next) => {

        const userId = req.userId;

        if (userId == req.params.id) {
      return next(); // allowed
        }

        console.log(userId);
        console.log(req.params.id);

    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    };
  
}