// Part1: Display Date & Time
let now = new Date();
let h4 = document.querySelector("h4");
let h3 = document.querySelector("h3");
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
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

h4.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
h3.innerHTML = `${currentHour}: ${currentMinute}`;

// Part2: Add search engine

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-location");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let apiKey = "751f58f905d4f428f0ffbf70ca07ab69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchLocation);

// Bonus
function myLocation(position) {
  console.log(position);
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "751f58f905d4f428f0ffbf70ca07ab69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

// Display Temperature & others
function displayTemperature(response) {
  let location = response.data.name;
  let locationName = document.querySelector("h2");
  locationName.innerHTML = `${location}`;

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
  humidityPercentage.innerHTML = `Humidity 💦  ${humidity}%`;
}

//let celsius = Math.round(temperature);

//function toCelsius(event) {
//event.preventDefault();
//let currentTemp = document.querySelector(".temperature-value");
// currentTemp.innerHTML = `${celsius}°`;
//let feelLikeTemp = document.querySelector(".feel-like");
//feelLikeTemp.innerHTML = `Feels like ${celsius}°`;
//}
//let tempCelsius = document.querySelector("#cel");
//tempCelsius.addEventListener("click", toCelsius);

//function toFahrenheit(event) {
//event.preventDefault();
//let fahrenheit = Math.round((celsius * 9) / 5 + 32);
//let currentTemp = document.querySelector(".temperature-value");
//currentTemp.innerHTML = `${fahrenheit}°`;
//et feelLikeTemp = document.querySelector(".feel-like");
//feelLikeTemp.innerHTML = `Feels like ${fahrenheit}°`;
//}
//let tempFah = document.querySelector("#fah");
//tempFah.addEventListener("click", toFahrenheit);
