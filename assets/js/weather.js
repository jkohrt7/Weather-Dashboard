let getCityLatLong = function(cityName) {
    let requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
        + cityName
        + "&appid=acdc16ce9b81fc931de962a6dfeeba4f" //api key
    
    return fetch(requestUrl, {
        method: "GET",
        mode: "cors"
    })
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let getCurrentWeather = function(coordinatesPromise) {
    console.log(typeof(coordinatesPromise));
    let coordinates = coordinatesPromise.json(); 
    console.log(coordinates)
    let requestUrl = "https://api.openweathermap.org/data/2.5/onecall?"
     + "lat="
     + coordinates[0].lat 
     + "&lon="
     + coordinates[0].long
     + "&appid=acdc16ce9b81fc931de962a6dfeeba4f";

    return fetch(requestUrl, {
        method: 'GET',
        mode: "cors"
    })
}

//getCityLatLong("Atlanta").then(getCurrentWeather)
let getResponse = function(response){
    return response.json()
}

getCityLatLong("Atlanta").then(getResponse).then(getCurrentWeather)