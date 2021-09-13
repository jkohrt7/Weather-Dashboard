//Contains functions that render weather data to the site.
let currentWeatherContainer = document.querySelector("#current-weather-container");
let cityNameElement = document.querySelector("#city-name");
let searchButton = document.querySelector("#search-button");
let searchBar = document.querySelector("#search-bar")


//Uses local storage to populate bar with recent cities
let renderSearchedCities;

//Adds curr weather data from a weather response to the daily weather element
let renderCurrentWeather = function() {
    let dataContainer = document.querySelector("#current-data");
    let imageContainer = document.querySelector("#current-icon")
    dataContainer.innerHTML = ""; 
    imageContainer.innerHTML = "";

    //add city name at top of container
    let city = searchBar.value;
    city = city.substring(0,1).toUpperCase() + city.substring(1);
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

let renderFiveDayForecast = function () {
    let forecastContainer = document.querySelector("#forecast-container");
    forecastContainer.innerHTML = "";

    let city = searchBar.value;
    getWeatherData(city).then(function (response) {
        let forecastArray = response.daily;
        let highTemp;
        let lowTemp;
        let wind;
        let humidity;
        let icon;
        let dayNode;

        for(let i = 0; i < forecastArray.length - 3; i++) {
            
            highTemp = forecastArray[i].temp.max;
            lowTemp = forecastArray[i].temp.min;
            wind = forecastArray[i].wind_speed;
            humidity = forecastArray[i].humidity;
            icon = forecastArray[i].weather[0].icon;
            date = forecastArray[i].dt;

            dayNode = document.createElement("h4");

            //TODO add date
            let node = document.createElement("h4");
            let textnode = document.createTextNode(unixToDateTime(date).toLocaleString({weekday: 'long'}));
            node.appendChild(textnode);
            dayNode.appendChild(node);
            
            //add icon
            node  = document.createElement("IMG");
            node.src =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            dayNode.appendChild(node);

            //add High Temp
            node = document.createElement("P");
            textnode = document.createTextNode("High: " + Math.floor(highTemp) + " °F");
            node.appendChild(textnode);
            dayNode.appendChild(node);

            //Add low temp
            node = document.createElement("P");
            textnode = document.createTextNode("Low: " + Math.floor(lowTemp) + " °F");
            node.appendChild(textnode);
            dayNode.appendChild(node);

            //add wind
            node = document.createElement("P");
            textnode = document.createTextNode("Wind: " + wind + " MPH");
            node.appendChild(textnode);
            dayNode.appendChild(node);

            //add humidity
            node = document.createElement("P");
            textnode = document.createTextNode("Humidity: " + humidity + "%");
            node.appendChild(textnode);
            dayNode.appendChild(node);

            forecastContainer.appendChild(dayNode);
        }
    })
}

let renderAllWeather = function() {
    renderCurrentWeather();
    renderFiveDayForecast();
}

searchButton.addEventListener("click", renderAllWeather);
searchBar.addEventListener("keydown", (e) => {if ((e.code) == "Enter") renderAllWeather()})

//Date functions
let unixToDateTime = function(timestamp) {
    let timeInMilliseconds = timestamp * 1000;
    let isoDate = new Date(timeInMilliseconds).toJSON();
    return luxon.DateTime.fromISO(isoDate);
}

let renderDate = function() {
    let node = document.createElement("DIV")
    let textNode = document.createTextNode(luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_HUGE))
    node.appendChild(textNode);
    
    let dateContainer = document.querySelector("#date-container");
    dateContainer.appendChild(node);
}

let init = function() {
    renderDate();
}

init();