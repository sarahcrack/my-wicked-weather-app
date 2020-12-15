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

// // Temperature conversion
// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector("#current-temperature");
//   currentTemperature.innerHTML = ("#currentTemperature.value" * 9) / 5 + 32;
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let currentTemperature = document.querySelector("#current-temperature");
//   currentTemperature.innerHTML = 19;
// }

// let fahrenheitLink = document.querySelector("#units-fahrenheit");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#units-celsius");
// celsiusLink.addEventListener("click", convertToCelsius);

// City Search Engine

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#country").innerHTML = response.data.sys.country;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
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

// let goBtn = document.querySelector("button");
// goBtn.addEventListener("click", citySearch);

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

search("London");
