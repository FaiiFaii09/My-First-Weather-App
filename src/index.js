// Part1: Display Date & Time
function formatDate(timestamp) {
  let now = new Date(timestamp);

  let currentDate = now.getDate();
  let currentYear = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let currentHour = now.getHours();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentHour}: ${currentMinute}`;
}

// Display Temperature & others
function displayCurrentWeather(response) {
  console.log(response.data);
  let location = response.data.name;
  let locationName = document.querySelector("#city");
  locationName.innerHTML = `${location}`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature-value");
  currentTemp.innerHTML = `${temperature}°C`;

  let feelLike = Math.round(response.data.main.feels_like);
  let feelLikeTemp = document.querySelector(".feel-like");
  feelLikeTemp.innerHTML = `Feels like ${feelLike}°C`;

  let max = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = `High ↑ ${max}°C`;

  let min = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#low");
  minTemp.innerHTML = `Low ↓ ${min}°C`;

  let humidity = response.data.main.humidity;
  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `Humidity    ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind   ${wind} km/h`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatHours(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  console.log(response.data);
}

// Search User's Current Position
function myLocation(position) {
  console.log(position);
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "751f58f905d4f428f0ffbf70ca07ab69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

// Add search engine

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-location");
  let locationName = document.querySelector("#city");
  locationName.innerHTML = `${searchInput.value}`;
  locationSearch(searchInput.value);
}
function locationSearch(city) {
  let apiKey = "751f58f905d4f428f0ffbf70ca07ab69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);

  // Add API Forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchLocation);

// Unit Converter
function convertToFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsiusTemp);
