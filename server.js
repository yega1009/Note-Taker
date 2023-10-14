// Import required modules and route files
const express = require('express');
const api = require('./routes/api');  
const html = require('./routes/html');  

// Define port for the server to listen on
const PORT = process.env.PORT || 3001;

// Initialize express application
const app = express();

// Middleware to parse JSON payloads in incoming requests
app.use(express.json());

// Middleware to parse URL-encoded payloads in incoming requests
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Attach API and HTML routes to the application
app.use(api);
app.use(html);

// Start server on the specified port
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
