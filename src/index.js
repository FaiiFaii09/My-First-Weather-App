//  Display Date & Time
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
  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}: ${minutes}`;
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
  currentTemp.innerHTML = `${temperature}`;

  let feelLike = Math.round(response.data.main.feels_like);
  let feelLikeTemp = document.querySelector(".feel-like");
  feelLikeTemp.innerHTML = `Feels like ${feelLike}ºC`;

  let max = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `High ↑ ${max} ºC`;

  let min = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `Low ↓ ${min} ºC`;

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

  maxTemperature = response.data.main.temp_max;

  minTemperature = response.data.main.temp_min;

  feelLikeTemperature = response.data.main.feels_like;
}
// Hourly forecast
function displayForecast(response) {
  console.log();
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML = forecastElement.innerHTML += `<div class="card">
                <h6 class="card-title"> ${formatHours(forecast.dt * 1000)}</h6>
                <div class="card-body">
                    <img src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png" class="card-img-bottom"/>
                    <p class="card-text">
                        <strong>
                        <span class="forecast-high">
                             ${Math.round(forecast.main.temp_max)}
                        </span>º     
                        </strong>
                        <span class="forecast-low">
                             ${Math.round(forecast.main.temp_min)}
                          </span>º 
                    </p>
                </div>
            </div>`;
  }
}

// Search User's Current Position
function myLocation(position) {
  console.log(position);
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "751f58f905d4f428f0ffbf70ca07ab69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
  // Add API Forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  let temperatureElement = document.querySelector(".temperature-value");
  let unitElement = document.querySelector("#unit");
  let maxElement = document.querySelector("#max");
  let minElement = document.querySelector("#min");
  let feelLikeElement = document.querySelector(".feel-like");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  //Remove the Fahrenheit event and add the celsius event
  celsiusLink.addEventListener("click", convertToCelsiusTemp);
  fahrenheitLink.removeEventListener("click", convertToFahrenheitTemp);

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  unitElement.innerHTML = "ºF";

  maxElement.innerHTML = `High ↑ ${Math.round(
    (maxTemperature * 9) / 5 + 32
  )}ºF`;

  minElement.innerHTML = `Low ↓ ${Math.round((minTemperature * 9) / 5 + 32)}ºF`;
  feelLikeElement.innerHTML = `Feels like ${Math.round(
    (feelLikeTemperature * 9) / 5 + 32
  )}ºF`;

  // convert to Fahrenheit in the hourly forecast portion
  let highElement = document.querySelectorAll(".forecast-high");
  let lowElement = document.querySelectorAll(".forecast-low");
  highElement.forEach(function (high) {
    let currentTemp = high.innerHTML;
    high.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}`;
    return highElement;
  });

  lowElement.forEach(function (low) {
    let currentTemp = low.innerHTML;
    low.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}`;
    return lowElement;
  });
}

function convertToCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  //Remove the celsius event and add the fahrenheit event
  celsiusLink.removeEventListener("click", convertToCelsiusTemp);
  fahrenheitLink.addEventListener("click", convertToFahrenheitTemp);

  let temperatureElement = document.querySelector(".temperature-value");
  let unitElement = document.querySelector("#unit");
  let maxElement = document.querySelector("#max");
  let minElement = document.querySelector("#min");
  let feelLikeElement = document.querySelector(".feel-like");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  unitElement.innerHTML = "ºC";
  maxElement.innerHTML = `High ↑ ${Math.round(maxTemperature)}ºC`;
  minElement.innerHTML = `Low ↓ ${Math.round(minTemperature)}ºC`;
  feelLikeElement.innerHTML = `Feels like ${Math.round(feelLikeTemperature)}ºC`;

  // convert to Celsius in the hourly forecast portion
  let highElement = document.querySelectorAll(".forecast-high");
  let lowElement = document.querySelectorAll(".forecast-low");
  highElement.forEach(function (high) {
    let currentTemp = high.innerHTML;
    high.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
  });

  lowElement.forEach(function (low) {
    let currentTemp = low.innerHTML;
    low.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
  });
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsiusTemp);

locationSearch("Bangkok");
