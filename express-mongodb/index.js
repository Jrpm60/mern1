//express-mongodb/index.js

import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import connectDB from './db-mongodb.js'; 
import seguridadRouter from './routes/seguridad.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/api/v1/seguridad', seguridadRouter);


async function startServer() {
  try {
    // Connect to MongoDB and store the DB instance in app.locals
    const db = await connectDB();
    app.locals.db = db;

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit the process with failure code
  }
}

startServer();