
var tempType = 'imperial';

const cityInfo = document.querySelector('#cityInfo');
const weatherText = document.querySelector('#weatherText .weather-type');
const weatherImg = document.querySelector('#weatherImg img');
const zipBtn = document.querySelector('#searchZip');
var zip;



function getZipData(zipCode) {
    if (!zipCode) {
        var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + '22201' + '&key=AIzaSyDalUj2S8wriBt-HGwa-si6xUYKoCxR11s';
    } else {
        var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=AIzaSyDalUj2S8wriBt-HGwa-si6xUYKoCxR11s';
    }
    fetch(url2)
    .then(function(blob) {
        return blob.json()
        .then(function(data) {
            var location = data.results[0];
            
            var city = location.address_components[1].short_name;
            var state = location.address_components[3].short_name;

            cityInfo.textContent = city + ', ' + state;

            getWeather(location.address_components[0].short_name);
        });
    });
}

function getWeather(zipCode) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=' + tempType + '&appid=d47f5e0ca7fe361331cb5e11a3c95a30';
    fetch(url)
    .then(function(blob) {
        return blob.json()
        .then(function(data) {
            var weather = data;
            var weatherType = weather.weather[0].main;
            weatherText.textContent = weatherType;
            weatherImg.src = 'icons/' + weatherType.toLowerCase() + '.svg';
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
