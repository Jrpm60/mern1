import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import usersRouter from './routes/users.js';
import cochesRouter from './routes/coches.js';
import inglesRouter from './routes/ingles.js';
import motivacionRouter from './routes/motivacion.js';
import {logger} from './middleware/logger.js';
import conversionRouter from './routes/conversion.js';
import gimnasiosRouter from './routes/gimnasios.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/coches', cochesRouter);
app.use('/api/v1/ingles', inglesRouter);
app.use('/api/v1/motivacion', motivacionRouter);
app.use('/api/v1/conversion', conversionRouter);
app.use('/api/v1/gimnasios', gimnasiosRouter);
app.use('/api/v2/conversion', conversionRouter);



//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
