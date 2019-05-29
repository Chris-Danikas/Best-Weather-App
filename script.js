const URL = "https://api.openweathermap.org/data/2.5/weather?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
const hourlyURL = "https://api.openweathermap.org/data/2.5/forecast?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
//I can also use &lang=el

let temp = document.getElementById("tempElem");
let desc = document.getElementById("desc");

window.addEventListener('load', () => {
    getTemp(URL);    
});


function getTemp(url){
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        desc.innerHTML = data.weather[0].description;
        return fetch(hourlyURL);
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}