//Uses local storage to populate bar with recent cities
let renderSearchedCities = function() {
    
    //get the cities from localStorage into an array
    let cityArr = window.localStorage.getItem("cityHistory");
    if(cityArr) {
        cityArr = JSON.parse(window.localStorage.getItem("cityHistory"));
    } else {
        cityArr = [];
    }

    let cityElement = document.querySelector(".city-history");
    cityElement.innerHTML = "";
    let name;
    let node;
    let textnode;
    
    for (let i = cityArr.length - 1; i >= 0; i--){
        name = cityArr[i];
        node = document.createElement("LI");
        textnode = document.createTextNode(name);

        node.onclick = ()=> {
            if(Date.now() - apiDelay > 1000) {
                document.querySelector("#search-bar").value = cityArr[i];
                renderCurrentWeather();
                renderFiveDayForecast();
                apiDelay = Date.now();
            }
            
        };
        
        node.appendChild(textnode);
        cityElement.appendChild(node);
    }

};

//Adds a city to local storage and to the 
let addCity = function() {
    let newCity = document.querySelector("#search-bar").value;
    //make sure there's a value
    if(!newCity){
        return;
    }
    
    newCity = newCity.substring(0,1).toUpperCase() + newCity.substring(1);

    //get the cities from localStorage into an array
    let cityArr = window.localStorage.getItem("cityHistory");
    if(cityArr) {
        cityArr = JSON.parse(window.localStorage.getItem("cityHistory"));
    } else {
        cityArr = [];
    }

    //check the length. If it is greater than 10, slice off the first element before appending
    if (cityArr.length >= 10) {
        cityArr = cityArr.slice(1);
    }
    cityArr.push(newCity);

    //add it back to localStorage
    localStorage.setItem("cityHistory", JSON.stringify(cityArr));
}