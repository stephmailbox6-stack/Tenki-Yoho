function updateTenkiYoho(response) {
  let temperatureElement = document.querySelector("#tenki-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#tenki-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = refreshDate(date);
}

function refreshDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10 || minutes < 10) {
    hours = `0${hours}`;
    minutes = `${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "53f4f49c434fot046a20cc0f96d8ebba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateTenkiYoho);
}

function selectSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city-form");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#tenki-search-form");
searchFormElement.addEventListener("submit", selectSubmit);

searchCity("Manchester");
