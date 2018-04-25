'use strict';

const cityName = document.querySelector('#cityName');

var zip = '22201';
var lat = 0;
var long = 0;
var tempType = 'imperial';

// var weather = {}
var location = {};

var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=' + tempType + '&appid=d47f5e0ca7fe361331cb5e11a3c95a30';
var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=AIzaSyDalUj2S8wriBt-HGwa-si6xUYKoCxR11s';

function getZipData(weatherData) {
    fetch(url2)
    .then(function(blob) {
        return blob.json()
        .then(function(data) {
            location = data.results[0];
            console.log(data.results[0]);
        });
    });
}

function getWeather() {
    fetch(url)
    .then(function(blob) {
        return blob.json()
        .then(function(data) {
            getZipData(data);
        });
    });
}

getZipData();