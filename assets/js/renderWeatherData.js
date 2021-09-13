//Contains functions that render weather data to the site.
let currentWeatherContainer = document.querySelector("#current-weather-container");
let cityNameElement = document.querySelector("#city-name");
let searchButton = document.querySelector("#search-button");
let searchBar = document.querySelector("#search-bar")


//Uses local storage to populate bar with recent cities
let renderSearchedCities

//Adds curr weather data from a weather response to the daily weather element
let renderCurrentWeather = function(weatherResponse) {
    let dataContainer = document.querySelector("#current-data");
    let imageContainer = document.querySelector("#current-icon")
    dataContainer.innerHTML = ""; 
    imageContainer.innerHTML = "";

    //add city name at top of container
    let city = searchBar.value;
    cityNameElement.textContent = city;

    //add data to container
    getWeatherData(city).then(function(response){
        console.log(response)
        temp = response.current.temp;
        wind = response.current.wind_speed;
        humidity = response.current.humidity;
        icon = response.current.weather[0].icon;

        console.log(temp);
        console.log(humidity);
        console.log(wind);
        console.log(icon)

        //append temperature
        let node = document.createElement("H1");
        let textnode = document.createTextNode(temp + " °F");
        node.appendChild(textnode);
        dataContainer.appendChild(node);

        //append Wind
        node = document.createElement("P");
        textnode = document.createTextNode("Wind: " + wind +" MPH");
        node.appendChild(textnode);
        dataContainer.appendChild(node);

        //append Humidity
        node = document.createElement("P");
        textnode = document.createTextNode("Humidity: " + humidity + "%");
        node.appendChild(textnode);
        dataContainer.appendChild(node);

        //append Icon
        node = document.createElement("IMG");
        node.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        imageContainer.appendChild(node);
        
    } )

    
}

searchButton.addEventListener("click", renderCurrentWeather);
searchBar.addEventListener("keydown", (e) => {if ((e.code) == "Enter") renderCurrentWeather()})

