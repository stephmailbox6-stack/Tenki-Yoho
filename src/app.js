function updateTenkiYoho(response) {
  let temperatureElement = document.querySelector("#tenki-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#tenki-city");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
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
