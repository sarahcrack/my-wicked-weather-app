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

// Forecast

function formatDays(timestamp) {
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  let currentDate = new Date(timestamp);
  let day = days[currentDate.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  // console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
      <div class="col-sm-2">
        <p class="forecast-days"><u><strong>${formatDays(
          forecast.dt * 1000
        )}</strong></u><p>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" id="forecast-icon">
                <div class="min-max-temp">
                    <span class="max-temp" id="forecast-max">${Math.round(
                      forecast.temp.max
                    )}</span><span class="forecast-max-unit">°</span> |
                    <span class="min-temp" id="forecast-min">${Math.round(
                      forecast.temp.min
                    )}</span><span class="forecast-min-unit">°</span></div>
                    <div class="daily-description">${forecast.weather[0].main}
                    </div>              
      </div>`;
  }
}

function whatToPack(response) {
  let sentence = document.querySelector("#what-to-pack");
  let weatherCondition = response.data.weather[0].main;
  let temperatureCondition = response.data.main.feels_like;
  if (weatherCondition === "Clouds") {
    sentence.innerHTML = `"Don't forget to pack your jacket, sunglasses and umbrella just in case!" 👍🏼`;
  } else if (
    weatherCondition === "Rain" ||
    weatherCondition === "Drizzle" ||
    weatherCondition === "Thunderstorm"
  ) {
    sentence.innerHTML = `"Don't forget to pack your umbrella!" ☂️`;
  } else if (weatherCondition === "Snow") {
    sentence.innerHTML = `"Don't forget to pack your hat and gloves!" ❄️`;
  } else if (weatherCondition === "Clear" && temperatureCondition >= 15) {
    sentence.innerHTML = `"Don't forget to pack your sunglasses!"`;
  } else if (weatherCondition === "Clear" && temperatureCondition < 15) {
    sentence.innerHTML = `"Don't forget to pack your coat and hat!" 🧥`;
  } else {
    sentence.innerHTML = `"Don't forget to pack your jacket, sunglasses, umbrella, hat and gloves just in case!" 👍🏼`;
  }
}

// }

// City Search Engine
function showWeather(response) {
  // console.log(response.data);
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

  // Sunrise and Sunset - UPDATE TO LOCAL TIME OF CITY SEARCHED?
  let sunriseTimestamp =
    response.data.sys.sunrise + response.data.timezone * 1000;
  let sunriseDate = new Date(sunriseTimestamp * 1000);
  let sunriseHours = sunriseDate.getUTCHours();
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`;
  }
  let sunriseMinutes = "0" + sunriseDate.getUTCMinutes();
  let formattedSunrise = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;
  document.querySelector("#sunrise").innerHTML = formattedSunrise;

  let sunsetTimestamp =
    response.data.sys.sunset + response.data.timezone * 1000;
  let sunsetDate = new Date(sunsetTimestamp * 1000);
  let sunsetHours = sunsetDate.getUTCHours();
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`;
  }
  let sunsetMinutes = "0" + sunsetDate.getUTCMinutes();
  let formattedSunset = `${sunsetHours}:${sunsetMinutes.substr(-2)}`;
  document.querySelector("#sunset").innerHTML = formattedSunset;

  whatToPack(response);

  // WEATHER FORECAST API CALL
  let apiKey = "fde153f3844b17e39f35c5a4dda52b52";
  let units = "metric";
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
