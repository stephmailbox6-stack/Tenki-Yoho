function updateTenkiYoho(response) {
  let temperatureElement = document.querySelector("#tenki-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#tenki-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="tenki-icon"/>`;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = refreshDate(date);

  getTenkiForecast(response.data.city);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(updateTenkiYoho);
}

function selectSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city-form");

  searchCity(searchInputElement.value);
}

function getTenkiForecast(city) {
  let apiKey = "53f4f49c434fot046a20cc0f96d8ebba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayMyForecast);
}

function displayMyForecast(response) {
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="tenki-forecast-day">
   <div class="tenki-forecast-date">${day}</div>
   <div class="tenki-forecast-icon">🌤️</div>
   <div class="tenki-forecast-temperatures">
    <div class="tenki-forecast-temperature">
      <strong> 15°</strong>
    </div>
    <div class="tenki-forecast-temperature">19°</div>
  </div>
</div>`;
  });

  let forecast = document.querySelector("#tenki-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#tenki-search-form");
searchFormElement.addEventListener("submit", selectSubmit);

searchCity("Manchester");
