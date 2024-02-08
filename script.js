const dailyWeatherSection = document.getElementById("weather-daily");
const fiveDayWeatherSection = document.getElementById("weather-fiveday");

var apiKey = '097d5721ae644c9408ede974d9e4f16e'

var cityInput = " ";

// Allows city weather data to display on page once search button is clicked
$("#searchButton").on("click", function() {
    event.preventDefault();
    cityInput = $('#cityInput').val()
        if (cityInput !== " ") {
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
        // clears existing current weather data when new search is submitted
        $("#currentWeather").empty();

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
                "</div>"
            );

            // Save current weather data to local storage
            saveToLocalStorage("currentWeather", data);
        })
        .catch(function (error) {
            alert('Current forecast unavailable.');
        });
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
            var weatherLat = data[0].lat;
            console.log(weatherLat);
            var weatherLon = data[0].lon;
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
        fiveDayForecast.empty();

        for (var i = 0; i < data.list.length; i += 8) {
            var day = data.list[i];
            fiveDayForecast.append(
                "<div class='forecastBox fiveDay'>" +
                "<p>" + "Date: " + day.dt_txt + "</p>" +
                "<p>" + "Temperature: " + day.main.temp + " &deg;F</p>" +
                "<p>" + "Wind: " + day.wind.speed + "Mph</p>" +
                "<p>" + "Humidity: " + day.main.humidity + "%</p>" +
                "</div>"
            );

            // Save five-day forecast data to local storage
            saveToLocalStorage("fiveDayForecast", data);
        }
    })
    .catch(function (error) {
        alert('5-day forecast unavailable.');
        console.error(error);
    });
}

    function saveToLocalStorage(key, data) {
    // Check if local storage is supported
        if (typeof(Storage) !== "undefined") {
        // Save the data to local storage
        localStorage.setItem(key, JSON.stringify(data));
        } else {
        console.error("Local storage is not supported");
        }
}
// End of performCitySearch function

const historyCont = document.querySelector('.history');
const currentDay = document.querySelector('.currentday-cont');
const fiveDAyCont = document.querySelector('.fiveday-cont')
