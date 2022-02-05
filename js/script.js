// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var weatherKey = '6faf03ae96e6d2151f700b8f64b88f74';
var searchedCity = document.getElementById("city-input");
var searchButton = document.getElementById("city-search");
var weatherContainer = document.getElementById("weather-container");

var getLatLon = function (event) {
    event.preventDefault();
    var city = searchedCity.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var weatherLat = data.coord.lat;
            var weatherLon = data.coord.lon;
            getForcast(weatherLat, weatherLon, city);
        })
};

var getForcast = function (latitude, longitude, city) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            displayForcast(data, city);
        })
};

var displayCurrent = function (weather, city) {
    console.log(weather)
    console.log(weather.current);
    var currentDaily = weather.current;
    var dailyName = document.createElement("h3");
    dailyName.textContent = city;
    weatherContainer.appendChild(dailyName);

    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentDaily.weather[0].icon}@2x.png`);
    weatherContainer.appendChild(weatherIcon);
};



searchButton.addEventListener("click", getLatLon);