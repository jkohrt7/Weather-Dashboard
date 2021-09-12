//Returns a Response containing city coordinates given that city's name
let getCityCoordinates = function(cityName) {
    let requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q="
        + cityName
        + "&appid=acdc16ce9b81fc931de962a6dfeeba4f" //api key
    
    //Use API to return a promise of the city coordinates
    return fetch(requestUrl, {
        method: "GET",
        mode: "cors"
    }).then(function (response) {
        let dataPromise = response.json();
        return dataPromise;
    })
}

//Returns a Response containing weather data given city coordinates
let getWeatherData = function(coordinatesResponse) {
    //Use response to construct lat and lon API query params
    let requestUrl = "https://api.openweathermap.org/data/2.5/onecall?"
     + "lat="
     + coordinatesResponse[0].lat 
     + "&lon="
     + coordinatesResponse[0].lon
     + "&appid=acdc16ce9b81fc931de962a6dfeeba4f";

    //Use the API to return a promise of the weather data.
    return fetch(requestUrl, {
        method: 'GET',
        mode: "cors"
    }).then(function(weatherResponse) {
        let dataPromise = weatherResponse.json();
        return dataPromise;
    })
}

let appendForecast = function(weatherResponse) {
    console.log(weatherResponse);
    let forecastArr = weatherResponse.daily;
}

getCityCoordinates("Atlanta").then(getWeatherData).then(appendForecast);