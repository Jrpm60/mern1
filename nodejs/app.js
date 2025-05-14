// Import the express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send the "Hello, World!" message as a response
});

// Set the app to listen on port 5001
app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});