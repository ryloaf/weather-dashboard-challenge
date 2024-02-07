const dailyWeatherSection = document.getElementById("weather-daily");
const fiveDayWeatherSection = document.getElementById("weather-fiveday");

var apiKey = '097d5721ae644c9408ede974d9e4f16e'

var cityInput = " ";

$("#searchButton").on("click", function() {
    event.preventDefault();
    cityInput = $('#cityInput').val()
        if (cityInput !== " ") {
            // Local storage settings within this If statement
            console.log(cityInput);
        }
    var stateInput=prompt("Enter state."); 
    performCitySearch(cityInput, stateInput);
  });

function performCitySearch(cityInput, stateInput) {

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput +","+ stateInput + "&appid=" + apiKey + "&units=imperial";
    var urlGeoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput +","+ stateInput + "&appid=" + apiKey + "&units=imperial";

    console.log(urlCurrent);
    if (cityInput !== " ") {
        fetch(urlCurrent)
        .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.json();
     
        })
        .then(function (data) {
            console.log(data);
            var currentWeather = $("#currentWeather");
            currentWeather.append(
            "<div class='todayWeather'>" +
            "<h4>" + data.name + "</h4>" +
            "<p>" + "Temperature: " + data.main.temp  + " &deg;F</p>" +
            "<p>" + "Wind: " + data.wind.speed + "Mph</p>" +
            "<p>" + "Humidity: " + data.main.humidity + "%</p>" +
            "</div>")
        })
        .catch(function (error) {
            alert('Current forecast unavailable.');
        })
    }
       console.log(urlGeoCode);
        if (cityInput !== " ") {
            fetch(urlGeoCode)
            .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.json();
        })
            .then(function (data){
            
            console.log(data);
            var weatherLat = data[0].lat
            console.log(weatherLat);

            console.log(data);
            var weatherLon = data[0].lon
            console.log(weatherLon);
            
            fiveDayFunction(weatherLat, weatherLon);
        })
    }
}

function fiveDayFunction(weatherLat, weatherLon) {

var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + weatherLat + "&lon=" + weatherLon + "&appid=" + apiKey + "&units=imperial";


        fetch(urlFiveDay)
        .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.json();
        })    
        .then(function (data) {
            
            console.log(data);
            var fiveDayForecast = $("#fiveDayForecast");
            fiveDayForecast.append(
            "<div class='fiveDay'>" +
            "<h4>" + data.name + "</h4>" +
            "<p>" + "Temperature: " + data.list[0].main.temp  + " &deg;F</p>" +
            "<p>" + "Wind: " + data.list[0].wind.speed + "Mph</p>" +
            "<p>" + "Humidity: " + data.list[0].main.humidity + "%</p>" +
            "</div>")
        })
        .catch(function (error) {
            alert('5-day forecast unavailable.');
            console.error(error)
        })

    }
// End of performCitySearch function


// const historyCont = document.querySelector('.history');
// const currentDay = document.querySelector('.currentday-cont');
// const fiveDAyCont = document.querySelector('.5day-cont')