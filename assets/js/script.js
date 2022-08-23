var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var weatherInfoEl = document.querySelector(".weather-info");
var cityNameEl = document.querySelector(".city-name");

const APIkey = "881b71ce57e0bfdb7dfc729ffa72bc98";

var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = nameInputEl.value.trim();
    console.log(cityName);
    if (cityName) {
        getCurrentWeather(cityName);
        // clear old content
        weatherInfoEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var getCurrentWeather = function (name) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=" + APIkey;
    var secondUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=metric&count=5&appid=" + APIkey;


    // make a get request to url
    fetch(apiUrl).then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, name);
                });
            } else {
                alert('Error: City not found');
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Openweather API");
        });

    fetch(secondUrl).then(function (secondResponse) {
        secondResponse.json().then(function (secondData) {
            console.log(secondData);
        })
    })
};

function displayWeather(data, name) {

    weatherInfoEl.textContent = data['main']['temp'];

}

userFormEl.addEventListener("submit", formSubmitHandler);