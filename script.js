function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  function showResponse(response) {
    event.preventDefault();
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  }

  let city = cityInput.value;
  let apiKey = "6a0a99fe1a7b6c33c3a6641707ad73c7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showResponse);
}
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", search);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a17a18dcaf1b3015a8ae057fbdda325d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  updateHeading(temperature, city);
}
function updateHeading(newTemperature, newCity) {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${newTemperature}º`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity}`;
}
function loadTemperature() {
  navigator.geolocation.getCurrentPosition(handlePosition);
  event.preventDefault();
}
let button = document.querySelector("#current-button");
button.addEventListener("click", loadTemperature);

let now = new Date();

let h2 = document.querySelector("h2");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

h2.innerHTML = `${day}<br />${hours}:${minutes}`;
