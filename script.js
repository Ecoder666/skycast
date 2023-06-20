
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const weatherContainer = document.getElementById("cards");

searchButton.addEventListener("click", searchWeather);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});

function searchWeather() {
  const city = searchInput.value.trim();

  if (city !== "") {
    const apiKey = "c69acd701394be8de3014a3025775582";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        renderWeatherData(data);
        updateLocationText(city);
      })
      .catch((error) => console.log(error));
  } else {
    alert("Please enter a city name.");
  }
}

function renderWeatherData(data) {
  const nameElement = document.getElementById("name");
  nameElement.innerHTML = data.name ? data.name : "N/A";

  const tempElement = document.getElementById("temp");
  tempElement.innerHTML = `Temperature: ${data.main.temp}F`;

  const weatherElement = document.getElementById("weather");
  weatherElement.innerHTML = `Weather: ${data.weather[0].description}`;

  const pressureElement = document.getElementById("pressure");
  pressureElement.innerHTML = `Air Pressure: ${data.main.pressure}hpa`;

  const humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `Humidity: ${data.main.humidity}%`;
}

weatherContainer.addEventListener("mousemove", (e) => {
  const cards = document.getElementsByClassName("card");
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
});

const locationButton = document.getElementById("locationButton");

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation API");
  }
});

function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiKey = "c69acd701394be8de3014a3025775582";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderWeatherData(data);
      updateLocationText(data.name);
    })
    .catch((error) => console.log(error));
}

function onError(error) {
  console.log(error);
  alert("Error occurred while retrieving location.");
}

function updateLocationText(location) {
  const locationElement = document.getElementById("locationText");
  locationElement.textContent = location;
}
