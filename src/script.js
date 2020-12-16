// Date and Time
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let currentDate = date.getDate();
  if (currentDate == 1 || currentDate == 21 || currentDate == 31) {
    currentDate = `${currentDate}st`;
  } else if (currentDate == 2 || currentDate == 22) {
    currentDate = `${currentDate}nd`;
  } else if (currentDate == 3 || currentDate == 23) {
    currentDate = `${currentDate}rd`;
  } else {
    currentDate = `${currentDate}th`;
  }

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];

  let formattedDate = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
  return formattedDate;
}

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = formatDate(now);

function formatTime(time) {
  let currentTimeHour = time.getHours();
  if (currentTimeHour < 10) {
    currentTimeHour = `0${currentTimeHour}`;
  }
  let currentTimeMinutes = time.getMinutes();
  if (currentTimeMinutes < 10) {
    currentTimeMinutes = `0${currentTimeMinutes}`;
  }
  let formattedTime = `${currentTimeHour}:${currentTimeMinutes}`;
  return formattedTime;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

// City Search Engine

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#country").innerHTML = response.data.sys.country;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 2.237
  );

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  // What to Pack - UPDATE BASED ON MAIN WEATHER DESCRIPTION
  let weatherCondition = response.data.weather[0].main.value;
  if ((weatherCondition = "Clouds")) {
    document.querySelector("#what-to-pack").innerHTML = "jacket";
  } else if (weatherCondition == "Rain") {
    document.querySelector("#what-to-pack").innerHTML = "umbrella";
  }

  // Sunrise and Sunset - UPDATE TO LOCAL TIME OF CITY SEARCHED?
  let sunriseTimestamp = response.data.sys.sunrise;
  let sunriseDate = new Date(sunriseTimestamp * 1000);
  let sunriseHours = sunriseDate.getHours();
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`;
  }
  let sunriseMinutes = "0" + sunriseDate.getMinutes();
  let formattedSunrise = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;
  document.querySelector("#sunrise").innerHTML = formattedSunrise;

  let sunsetTimestamp = response.data.sys.sunset;
  let sunsetDate = new Date(sunsetTimestamp * 1000);
  let sunsetHours = sunsetDate.getHours();
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`;
  }
  let sunsetMinutes = "0" + sunsetDate.getMinutes();
  let formattedSunset = `${sunsetHours}:${sunsetMinutes.substr(-2)}`;
  document.querySelector("#sunset").innerHTML = formattedSunset;
}

function search(city) {
  let apiKey = "fde153f3844b17e39f35c5a4dda52b52";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", citySearch);

// Current Location

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "fde153f3844b17e39f35c5a4dda52b52";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocationBtn = document.querySelector("#currentLocationBtn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// // Temperature conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#units-fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#units-celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("London");
