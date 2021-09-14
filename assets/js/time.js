//Functions related to fetching and rendering times.
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