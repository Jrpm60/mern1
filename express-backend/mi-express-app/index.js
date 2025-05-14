// Import the Express library
import express from "express";

// Create an Express app
const app = express();

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

