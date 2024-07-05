// Add an event listener to the form to handle submissions
document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const city = document.getElementById('city').value; // Get the city name from the input field
    const response = await fetch('/weather', {
        method: 'POST', // Send a POST request
        headers: {
            'Content-Type': 'application/json' // Specify the request content type
        },
        body: JSON.stringify({ city }) // Send the city name in the request body
    });
    
    const data = await response.json(); // Parse the JSON response
    const weatherResult = document.getElementById('weather-result'); // Get the element to display the result
    
    if (response.ok) { // If the response is successful
        weatherResult.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
        `; // Display the weather data
    } else {
        weatherResult.innerHTML = `<p>${data.error}</p>`; // Display an error message if the response is not successful
    }
});
