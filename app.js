// Import the required modules
const express = require('express');
const axios = require('axios');
const path = require('path');

// Create an instance of an Express application
const app = express();

// Define the port number to listen on, using the environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));