async function getWeather(event) {
    event.preventDefault(); // Prevents the default form submission behavior if the button is inside a form

    // Show the loading spinner and hide the weather icon initially
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-icon').style.display = 'none';

    // Retrieve the city name from the input field
    const city = document.getElementById('city').value;

    // Check if a city name has been provided
    if (!city) {
        alert('Please enter a city name.'); // Alert the user if the input is empty
        document.getElementById('loading').style.display = 'none'; // Hide the loading spinner
        return; // Exit the function early
    }

    // API key and URL for the OpenWeatherMap API
    const apiKey = 'd3cde4f1a4e7aac18604763ef1237d04';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch weather data from the API
        const response = await fetch(url);
        // Parse the response as JSON
        const data = await response.json();

        // Hide the loading spinner when data is fetched
        document.getElementById('loading').style.display = 'none';

        // Check if the API response is successful (status code 200)
        if (data.cod === 200) {
            // Update the weather information displayed on the page
            document.getElementById('weather-output').innerHTML = `Weather in ${city}: ${data.weather[0].description}`;
            document.getElementById('temp').innerHTML = `${data.main.temp}`;
            document.getElementById('humidity').innerHTML = `${data.main.humidity}`;
            document.getElementById('wind-speed').innerHTML = `${data.wind.speed}`;
            // Update the weather icon based on the API response
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById('weather-icon').style.display = 'block';
        } else {
            // Display a message if the city is not found
            document.getElementById('weather-output').innerHTML = `City not found.`;
        }
    } catch (error) {
        // Log any errors to the console and show an error message
        console.error('Error fetching data:', error);
        document.getElementById('weather-output').innerHTML = `Error fetching data.`;
    }
}
// Example usage of Lodash
console.log(_.chunk(['a', 'b', 'c', 'd'], 2));  // [['a', 'b'], ['c', 'd']]
