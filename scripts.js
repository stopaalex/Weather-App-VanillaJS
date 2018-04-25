
var tempType = 'imperial';

const card = document.querySelector('.card');
const sun = document.querySelector('.sun');
const rain = document.querySelector('.rain');
const haze = document.querySelector('.haze');

const cityInfo = document.querySelector('#cityInfo');
// Weather
const weatherText = document.querySelector('#weatherText .weather-type');
const weatherImg = document.querySelector('#weatherImg img');
// Temps
const temps = document.querySelector('#temps');
const currentTempCont = document.querySelector('#temps .current-temp');
const highTempCont = document.querySelector('#temps .highs-lows .temp-high');
const lowTempCont = document.querySelector('#temps .highs-lows .temp-low');

const zipBtn = document.querySelector('#searchZip');
var zip;



function getZipData(zipCode) {
    if (!zipCode) {
        var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + '22201' + '&key=AIzaSyDalUj2S8wriBt-HGwa-si6xUYKoCxR11s';
    } else {
        var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=AIzaSyDalUj2S8wriBt-HGwa-si6xUYKoCxR11s';
    }
    fetch(url2)
        .then(function (blob) {
            return blob.json()
                .then(function (data) {
                    var location = data.results[0];

                    var address = location.formatted_address;

                    cityInfo.textContent = address;

                    if (!zipCode) {
                        getWeather(location.address_components[0].short_name, true);
                    } else if (isNaN(zipCode)) {
                        getWeather(location.address_components[0].short_name, false);
                    } else {
                        getWeather(zipCode, true);
                    }
                });
        });
}

function getWeather(zipCode, checkForNum) {
    if (!checkForNum) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + zipCode + ',us&units=' + tempType + '&appid=d47f5e0ca7fe361331cb5e11a3c95a30';
    } else {
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=' + tempType + '&appid=d47f5e0ca7fe361331cb5e11a3c95a30';
    }
    fetch(url)
        .then(function (blob) {
            return blob.json()
                .then(function (data) {
                    var weather = data;
                    // Display Weather
                    var weatherType = weather.weather[0].main;
                    weatherText.textContent = weatherType;
                    weatherImg.src = 'icons/' + weatherType.toLowerCase() + '.svg';
                    // console.log(weatherType.toLowerCase());
                    if (weatherType.toLowerCase() === 'clear') {
                        sun.style.opacity = '1';
                    } else {
                        sun.style.opacity = '0';
                    }
                    if (weatherType.toLowerCase() === 'rain' || weatherType.toLowerCase() === 'showers' || weatherType.toLowerCase() === 'drizzle') {
                        rain.style.opacity = '0.75';
                    } else if (weatherType.toLowerCase() === 'mist') {
                        rain.style.opacity = '0.25';
                    } else {
                        rain.style.opacity = '0';
                    }
                    if(weatherType.toLowerCase() === 'haze') {
                        haze.style.opacity = '1';
                    } else {
                        haze.style.opacity = '0';
                    }
                    
                    
                    // Display Temps
                    var currentTemp = Math.round(weather.main.temp);
                    var highTemp = Math.round(weather.main.temp_max);
                    var lowTemp = Math.round(weather.main.temp_min);
                    currentTempCont.textContent = currentTemp + '°F';
                    highTempCont.textContent = highTemp + '°F';
                    lowTempCont.textContent = lowTemp + '°F';

                    // Update Card Color based on cloudiness
                    var cloudiness = 100 - weather.clouds.all;
                    card.style.background = 'hsla(200, ' + cloudiness + '%, 93%, 0.8)'
                    console.log(cloudiness);

                    // Clear input
                    document.querySelector('#zipCodeSearch').value = '';

                });
        });
}

function getWeatherFromZip() {
    var zip = document.querySelector('#zipCodeSearch').value;
    getZipData(zip);
}

function isEnterPressed(e) {
    var inputFocused = (document.activeElement === (document.querySelector('#zipCodeSearch')));
    if (e.key === 'Enter' && inputFocused) {
        getWeatherFromZip();
    } else {
        return
    }

}

function initialize() {
    zipBtn.addEventListener('click', getWeatherFromZip);
    getZipData();

    window.addEventListener('keypress', isEnterPressed);
}

initialize();
