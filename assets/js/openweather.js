//Returns a Promise containing weather data given a city's name
let getWeatherData = function(cityName) {
    //use the city's name to create a GET http request for the geo API endpoint
    let requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q="
        + cityName
        + "&appid=acdc16ce9b81fc931de962a6dfeeba4f" //api key
    
    //Use geo API endpoint to return the city coordinates
    return fetch(requestUrl, {
        method: "GET",
        mode: "cors"
    }).then(function (response) {
        let dataPromise = response.json();
        return dataPromise;
    }).then(function(coordinatesResponse) {
        
        //Use the promised lat and lon city values to create an API call to the onecall API endpoint
        let requestUrl = "https://api.openweathermap.org/data/2.5/onecall?"
        + "lat="
        + coordinatesResponse[0].lat 
        + "&lon="
        + coordinatesResponse[0].lon
        + "&appid=acdc16ce9b81fc931de962a6dfeeba4f";

        //Use the API to return a Promise of the weather data.
        return fetch(requestUrl, {
            method: 'GET',
            mode: "cors"
        }).then(function(weatherResponse) {
            
            let dataPromise = weatherResponse.json();
            return dataPromise;
        })
    })
}

//should probably go in the main script.
//Adds curr weather data from a weather response to the daily weather element
let appendCurrentWeather = function(weatherResponse) {
    let forecastArr = weatherResponse.current;
}

getWeatherData("Atlanta").then(function(response){
    console.log(response)
} )