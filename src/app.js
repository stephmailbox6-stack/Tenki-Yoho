function selectSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city-form");
  let cityElement = document.querySelector("#tenki-city");
  cityElement.innerHTML = searchInputElement.value;
}

let searchFormElement = document.querySelector("#tenki-search-form");
searchFormElement.addEventListener("submit", selectSubmit);
