// OpenWeatherMap API key (replace with your own)
const apiKey = "36a254a55603a545ba6ab595aa8663ab";

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const enteredLocationEl = document.getElementById('enteredLocation');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weatherDescription');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const weatherIconEl = document.getElementById('weatherIcon');

// Fetch weather data based on location name
function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("Error: Location not found. Please try again.");
        return;
      }

      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconCode = data.weather[0].icon;
      const iconPath = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      enteredLocationEl.textContent = cityName; // Update location display
      temperatureEl.textContent = `${temperature}°C`;
      weatherDescriptionEl.textContent = description;
      feelsLikeEl.textContent = `Feels Like: ${feelsLike}°C`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windSpeedEl.textContent = `Wind Speed: ${windSpeed} m/s`;
      weatherIconEl.src = iconPath;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again later.");
    });
}

// Event listener for Enter key press and search button click
searchInput.addEventListener('keydown', event => {
  if (event.key === "Enter" && searchInput.value.trim() !== "") {
    const enteredLocation = searchInput.value;
    enteredLocationEl.textContent = enteredLocation; // Update location display before fetching

    const location = searchInput.value;
    fetchWeatherData(location);
    searchInput.value = ""; // Clear search input after submit
  }
});

// Event listener for search button click (optional)
searchButton.addEventListener('click', () => {
  if (searchInput.value.trim() !== "") {
    const enteredLocation = searchInput.value;
    enteredLocationEl.textContent = enteredLocation; // Update location display before fetching

    const location = searchInput.value;
    fetchWeatherData(location);
    searchInput.value = ""; // Clear search input after submit
  }
});
