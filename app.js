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

// Route to handle GET requests to the /api/query endpoint
app.get('/api/query', async (req, res) => {
    // Extract the query parameter from the request URL
    const query = req.query.query;

    try {
        // Make a GET request to the external API using Axios
        const response = await axios.get(`https://imdb-top-100-movies.p.rapidapi.com/`, {
            params: {
                q: query, // Pass the query parameter to the API
                apiKey: 'b68b3c3879msh7059cbd5c743b0cp1d5c4cjsnabece6219323' // Include the API key in the request
            }
        });

        // Extract the data from the API response
        const data = response.data;

        // Send the data back to the client as a JSON response
        res.json(data);
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a 500 status code and an error message to the client
        res.status(500).json({ error: 'An error occurred while fetching data from the API' });
    }
});