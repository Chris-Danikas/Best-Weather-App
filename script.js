const URL = "https://api.openweathermap.org/data/2.5/weather?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
const dailyURL = "https://api.openweathermap.org/data/2.5/forecast?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
//I can also use &lang=el

let temp = document.getElementById("tempElem");
let desc = document.getElementById("desc");

window.addEventListener('load', () => {
    getTemp(URL); 
    displayDaily();   
});


function getTemp(url){
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        desc.innerHTML = data.weather[0].description;
    })
}

async function getDaily(url){
    let forecast = [];

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);
    forecast = data.list; 

    return forecast;
}

async function displayDaily(){
    let forecast = await getDaily(dailyURL);
    console.log(forecast);

    ul = document.createElement("ul");
    forecast.forEach(elem => {
        let li = document.createElement("li");

        let date = new Date(elem.dt * 1000);
        let regex1 = /[A-Z]\w+ [A-Z]\w+ \d+/;
        let regex2 = /\d+:00/;

        let day = regex1.exec(date)[0];
        let hour = regex2.exec(date)[0];
        
        let myDate = `${day.slice(0, 3)} ${day.slice(8, 10)} -- ${hour} ||  ${elem.main.temp} °C ${elem.weather[0].description}`;

        let text = document.createTextNode(myDate);
        li.appendChild(text);
        ul.appendChild(li);
    })

    document.body.appendChild(ul);
    
}