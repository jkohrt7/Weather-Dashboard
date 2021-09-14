//Contains functions that render weather data to the site.

//Adds curr weather data from a weather response to the daily weather element
let renderCurrentWeather = function() {
    let dataContainer = document.querySelector("#current-data");
    let imageContainer = document.querySelector("#current-icon")

    
    let city = document.querySelector("#search-bar").value;
    city = city.substring(0,1).toUpperCase() + city.substring(1);

    //add data to container
    getWeatherData(city).then(function(response){
        if(response instanceof Error) {
            console.log("save me from error hell")
            return;
        }

        //Update HTML
        dataContainer.innerHTML = ""; 
        imageContainer.innerHTML = "";
        document.querySelector("#city-name").textContent = city;
        document.querySelector("#current-weather-styling").style = "visibility: visible";

        //set values from response
        let temp = response.current.temp;
        let wind = response.current.wind_speed;
        let humidity = response.current.humidity;
        let icon = response.current.weather[0].icon;
        let uvi = response.current.uvi;

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

        //append UVI
        node = document.createElement("P");

        //Need a span for the title...
        let titleSpanNode = document.createElement("SPAN");
        textnode = document.createTextNode("UV Index: ");
        titleSpanNode.appendChild(textnode);
        node.appendChild(titleSpanNode);
        
        //...and for the dynamically colored UV Index
        let colorSpanNode = document.createElement("SPAN");
        if(uvi <= 4) {
            colorSpanNode.style = "background-color: green; color: white; border-radius: 3px; padding: 2px"
        } 
        else if (uvi <=7 ) {
            colorSpanNode.style = "background-color: orange; color: white; border-radius: 3px; padding: 2px"
        }
        else {
            colorSpanNode.style = "background-color: red; color: white; border-radius: 3px; padding: 2px"
        }
        textnode = document.createTextNode(uvi);
        colorSpanNode.appendChild(textnode);
        node.appendChild(colorSpanNode);
        
        dataContainer.appendChild(node);

        //append Icon
        node = document.createElement("IMG");
        node.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        imageContainer.appendChild(node);
        
    });

}

//Adds forecast weather data from API response to the forecast container
let renderFiveDayForecast = function () {
    let forecastContainer = document.querySelector("#forecast-container");
    let city = document.querySelector("#search-bar").value;

    getWeatherData(city).then(function (response) {
        //Update html
        forecastContainer.innerHTML = "";
        document.querySelector("#forecast-styling").style = "visibility: visible";
    
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

            dayNode = document.createElement("div");

            //add date
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
        };
    });
};

//Updates all necessary components when search is conducted
let renderNewValues = function() {

    //Only do something if the API call works.
    getWeatherData(document.querySelector("#search-bar").value).then((response) =>
        {
            if(response instanceof Error) {
                console.log("renderNewValues error")
                return;
            }
            else {
                renderCurrentWeather(); 
                renderFiveDayForecast();
                addCity(document.querySelector("#search-bar").value);
                renderSearchedCities();
            }
        }
    )


}

//Events triggered using enter or button. Cannot be triggered more than once/sec to avoid fees.
document.querySelector("#search-button")
        .addEventListener("click", () => {
            if(Date.now() - apiDelay > 1000) {
                renderNewValues();
                apiDelay = Date.now();
            }
        });

document.querySelector("#search-bar")
        .addEventListener("keydown", (e) => {
            if ((e.code) == "Enter") {
                if(Date.now() - apiDelay > 1000) {
                    renderNewValues();
                    apiDelay = Date.now();
                }
            }
        })

//Date functions (helpers)
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
    renderSearchedCities();
}

init();