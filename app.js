const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const retryBtn = document.getElementById("retryBtn");

const message = document.getElementById("message");
const errorBanner = document.getElementById("errorBanner");
const errorText = document.getElementById("errorText");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const localTimeEl = document.getElementById("localTime");

const forecastContainer = document.getElementById("forecastContainer");
const recentSearchesEl = document.getElementById("recentSearches");

let lastSearchedCity = "";
let debounceTimer;
let currentWeatherData = null;
let currentUnit = "C";