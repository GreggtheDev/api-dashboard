document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const city = document.getElementById('city').value; // Get the city name from the input field
    const startDate = document.getElementById('start-date').value; // Get the start date from the input field
    const endDate = document.getElementById('end-date').value; // Get the end date from the input field
    
    const response = await fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, startDate, endDate }) // Send the city name and dates in the request body
    });
    
    const data = await response.json();
    const weatherResult = document.getElementById('weather-result');
    
    if (response.ok) {
        weatherResult.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
        `;
        
        // Assume we have historical data as an array of temperatures
        const historicalData = data.historical; // This should be fetched from the API
        const labels = historicalData.map(entry => entry.date); // Dates
        const temperatures = historicalData.map(entry => entry.temp); // Temperatures
        
        const ctx = document.getElementById('weather-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature over Time',
                    data: temperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        weatherResult.innerHTML = `<p>${data.error}</p>`;
    }
});
