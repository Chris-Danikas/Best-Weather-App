const URL = "https://api.openweathermap.org/data/2.5/weather?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
const dailyURL = "https://api.openweathermap.org/data/2.5/forecast?id=252848&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
const dailyURLLarisa = "https://api.openweathermap.org/data/2.5/forecast?id=258576&APPID=7d8a1c597d7b9d3b30b5e42ef9fb621c&units=metric";
//I can also use &lang=el

let temp = document.getElementById("tempElem");
let desc = document.getElementById("desc");

window.addEventListener('load', () => {
    getTemp(URL); 
    //chartIt();
    displayDaily(dailyURL);
    chartIt();   
});


function getTemp(url){
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        desc.innerHTML = data.weather[0].description;
    })
}

async function getDaily(url){

    let response = await fetch(url);
    let data = await response.json();
    console.log("This is the response data : ", data);

    let cityName = data.city.name;
    let forecast = data.list;

    forecast.forEach(elem => {
        //converting the date to my format
        let date = new Date(elem.dt * 1000);
        let regex1 = /[A-Z]\w+ [A-Z]\w+ \d+/;
        let regex2 = /\d+:00/;

        let day = regex1.exec(date)[0];
        day = day.slice(0, 3) +" "+ day.slice(8, 10);
        let hour = regex2.exec(date)[0];

        let newDate = hour + " " + day;
        elem.dt_txt = newDate;
    });

    console.log({cityName, forecast})

    return {cityName, forecast};
}

async function displayDaily(){
    let data = await getDaily(dailyURL);
    
    ul = document.createElement("ul");
    data.forecast.forEach(elem => {
        let li = document.createElement("li");        
        
        let myDate = `${elem.dt_txt} ||  ${elem.main.temp} °C ${elem.weather[0].description}`;

        let text = document.createTextNode(myDate);
        li.appendChild(text);
        ul.appendChild(li);
    })

    document.body.appendChild(ul);   
}

async function chartIt(){
    
    let dataT = await getDaily(dailyURL);
    //let dataL = await getDaily(dailyURLLarisa);

    let xs = []; 
    let ysT = [];
    //let ysL = [];

    dataT.forecast.forEach(elem => {
        xs.push(elem.dt_txt);
        ysT.push(Math.round(elem.main.temp));
    })
    
    // dataL.forecast.forEach(elem => {
    //     ysL.push(Math.round(elem.main.temp));
    // })


    //console.log("here it is ", data);
    let ctx = document.getElementById('chart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xs,
            datasets: [{
                label: dataT.cityName + ' Temperature in C°',
                borderColor: 'rgba(250, 250, 250, 0.6)', 
                data: ysT,
                fill: false
                }
                
                // ,
                // {   
                // label: dataL.cityName + ' Temperature in C°',
                // borderColor: 'rgba(0, 250, 250, 0.6)',
                // data: ysL,
                // fill: false
                // }
            ]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a degree sign in the ticks
                        callback: function(value, index, values) {
                            return value + "°"; // ° = alt + 0176
                        }
                    }
                }]
            },
            layout: {
                padding: 50
            },
            tooltips: {

                // callbacks: {
                //     label: function(tooltipItem, data) {
                //         //https://www.chartjs.org/docs/latest/configuration/tooltip.html  sta callbacks
                //         var label = data.datasets[tooltipItem.datasetIndex].label;
                //         label = 'shit';

                //         return label;
                //     }
                // },

                bodyFontColor: 'rgba(0, 0, 0, 1)',
                bodyFontSize: 13,
                backgroundColor: 'rgba(250, 250, 250, 0.6)',

                titleAlign: 'center',  // ta docs exoun : _titleAlign  enw to swsto einai titleAlign
                titleMarginBottom: 10,
                titleFontColor: 'rgba(0, 0, 0, 1)',
                titleFontSize: 15,             
            }
        }
    });
}