const apiKey = 

const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");

searchButton.addEventListener("click", () => {
  const city = cityInput.Value;
  if (city) {
    fetchWeather(city);
  }

});

function fetchWeather(city) {
  const apiUrl = ``;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
      .then(data  => displayWeather(data))
      .catch(error => {
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
      });
    })

}

function displayWeather(data) {
  const { name, main, weather,wind} = data;
  weatherDisplay.innerHTML = `
  <p><strong>City:</strong> ${name}</p>
  <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>`;
}