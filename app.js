// Import necessary modules
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 3000; // Define the port to run the server

// CORS configuration to allow requests from any origin
const corsOptions = {
    origin: '*',
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

// Use CORS middleware to handle CORS requests
app.use(cors(corsOptions));

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle weather data requests
app.post('/weather', async (req, res) => {
    const city = req.body.city; // Get the city name from the request body
    const apiKey = process.env.WEATHER_API_KEY; // Get the API key from environment variables
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Construct the API URL

    try {
        const response = await axios.get(url); // Fetch data from the weather API
        const data = response.data; // Get the data from the API response
        res.json(data); // Send the data back to the client
    } catch (error) {
        res.status(500).json({ error: error.response.data.message }); // Handle errors and send error message
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
