import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";

import userRouter from './routes/userRoutes.js';
import eventRouter from './routes/eventRoutes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/v1', userRouter);
app.use('/api/v1', eventRouter);



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});