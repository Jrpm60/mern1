import { Router } from 'express';
import db from '../db.js';  // importar PouchDB
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/BADlogin.js';

// Dummy user (normally from a DB)
const users = [
   // { id: 1, username: 'admin', password: bcrypt.hashSync('password', 10) }
   { id: 1, username: 'admin', password: 'password' },
   { id: 2, username: 'mary', password: 'password2' }
  ];

const router = Router();

const JWT_SECRET = '12345'; 

//login route 
//curl -X POST http://localhost:5000/api/v1/login  -H "Content-Type: application/json"  -d '{"username":"admin", "password":"password"}'
//{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDQ5MTEyMTIsImV4cCI6MTc0NDkxNDgxMn0.gSgpWcF9O43rZJVDWf9xjbRsuALGBcJH6jjfvLvmNos"}

router.post('/', async (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user || (password != user.password)) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log({userId: user.id, username: user.username});

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' },
        { algorithm: 'HS256' } 
    )
        
    res.json({ token });

  });
  

// curl http://localhost:5000/api/v1/login/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDQ5MTEyMTIsImV4cCI6MTc0NDkxNDgxMn0.gSgpWcF9O43rZJVDWf9xjbRsuALGBcJH6jjfvLvmNos"
router.get('/profile', authenticateToken, (req, res) => {
  // req.user is now available
  res.json({
      message: 'Welcome to the protected route!',
      user: req.user
  });
});

  
export default router;