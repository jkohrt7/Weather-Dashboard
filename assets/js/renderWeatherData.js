//Contains functions that render weather data to the site.
let currentWeatherContainer = document.querySelector("#current-weather-container");
let cityNameElement = document.querySelector("#city-name");
let searchButton = document.querySelector("#search-button");
let searchBar = document.querySelector("#search-bar")

//Uses local storage to populate bar with recent cities
let renderSearchedCities

//Adds curr weather data from a weather response to the daily weather element
let renderCurrentWeather = function(weatherResponse) {
    let city = searchBar.value;
    cityNameElement.textContent = city;
    getWeatherData(city).then(function(response){
        console.log(response)
    } )
}

searchButton.addEventListener("click", renderCurrentWeather);
searchBar.addEventListener("keydown", (e) => {if ((e.code) == "Enter") renderCurrentWeather()})

