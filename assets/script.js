// OpenWeather API key f155825c2d9975029ce899c709c33acf

// Select elements
var iconElement = document.querySelector(".weather-icon");
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var notificationElement = document.querySelector(".notification");

// App data
var weather = {};

weather.temperature = {
    unit : "fahrenheit"
}

var key = "f155825c2d9975029ce899c709c33acf";

// Check if browser supports Geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else{
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
    }

// Set user's position
function setPosition(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error if issue with Geolocation
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather from API
function getWeather(latitude, longitude){
    var api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
console.log(api);
    fetch(api)
        .then(function(response){
            var data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country; 
        })
        .then(function(){
            displayWeather();
        });
}        

function displayWeather(){
    iconElement.innerHTML = `<img src="./assets/images/icons/${weather.icon}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}