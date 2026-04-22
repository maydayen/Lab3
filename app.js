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

const weatherLookup = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Depositing rime fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Moderate drizzle", icon: "🌦️" },
  55: { text: "Dense drizzle", icon: "🌧️" },
  61: { text: "Slight rain", icon: "🌦️" },
  63: { text: "Moderate rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Slight snow", icon: "❄️" },
  73: { text: "Moderate snow", icon: "❄️" },
  75: { text: "Heavy snow", icon: "❄️" },
  80: { text: "Rain showers", icon: "🌦️" },
  81: { text: "Rain showers", icon: "🌧️" },
  82: { text: "Violent rain showers", icon: "⛈️" },
  95: { text: "Thunderstorm", icon: "⛈️" }
};

function getWeatherInfo(code) {
  return weatherLookup[code] || { text: "Unknown weather", icon: "❔" };
}

function formatDay(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function showMessage(text) {
  message.textContent = text;
}

function clearMessage() {
  message.textContent = "";
}

function showErrorBanner(text) {
  errorText.textContent = text;
  errorBanner.classList.remove("hidden");
}

function hideErrorBanner() {
  errorBanner.classList.add("hidden");
}

function removeSkeletons() {
  document.querySelectorAll(".skeleton").forEach((el) => {
    el.classList.remove("skeleton", "skeleton-text", "skeleton-box");
  });
}

function addSkeletons() {
  cityNameEl.className = "skeleton skeleton-text";
  temperatureEl.className = "skeleton skeleton-text";
  descriptionEl.className = "skeleton skeleton-text";
  humidityEl.className = "skeleton skeleton-text";
  windSpeedEl.className = "skeleton skeleton-text";
  localTimeEl.className = "skeleton skeleton-text";
}

function validateCityInput(city) {
  if (!city.trim()) {
    showMessage("Please enter a city name.");
    return false;
  }

  if (city.trim().length < 2) {
    showMessage("Please enter at least 2 characters.");
    return false;
  }

  clearMessage();
  return true;
}