import { VC_API_KEY, GM_API_KEY } from './keys.js';
import { loadWeatherPageDOM, updateWeatherDOM } from './weatherPageDOM.js';
// Import weather icons
import sunnyIcon from './assets/sunny/icons8-sun-90.png';
import cloudyIcon from './assets/cloudy/icons8-cloud-90.png';
import rainyIcon from './assets/rainy/icons8-rain-64.png';
import snowyIcon from './assets/snowy/icons8-snow-96.png';
import thunderstormIcon from './assets/thunderstorm/icons8-storm-96.png';
import windyIcon from './assets/windy/icons8-wind-96.png';
import partlyCloudyIcon from './assets/partly_cloudy/icons8-partly-cloudy-day-96.png';
import nightIcon from './assets/night/icons8-moon-and-stars-90.png';


export async function searchWeather(city) {
    console.log(`Searching weather for ${city}`);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${VC_API_KEY}`;
    // Fetch weather data from Visual Crossing API
    const data = await fetch(url);
    if (!data.ok) {
        throw new Error('Network response was not ok');
    }
    let weatherData = await data.json();
    updateWeatherDOM(city, weatherData);
}

export function loadWeatherPage(city) {
    loadWeatherPageDOM(city);
    searchWeather(city);
}

// Function to get the appropriate icon based on Visual Crossing icon code
export function getWeatherIcon(iconCode) {
    const iconMap = {
        'clear-day': sunnyIcon,
        'clear-night': nightIcon,
        'partly-cloudy-day': partlyCloudyIcon,
        'partly-cloudy-night': partlyCloudyIcon,
        'cloudy': cloudyIcon,
        'fog': cloudyIcon,
        'wind': windyIcon,
        'rain': rainyIcon,
        'showers-day': rainyIcon,
        'showers-night': rainyIcon,
        'snow': snowyIcon,
        'snow-showers-day': snowyIcon,
        'snow-showers-night': snowyIcon,
        'thunder-rain': thunderstormIcon,
        'thunder-showers-day': thunderstormIcon,
        'thunder-showers-night': thunderstormIcon,
    };
    
    return iconMap[iconCode] || `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
}

export function getWeatherBackground(iconCode, isDaytime) {
    const iconMap = {
        'clear-day': 'day-clear',
        'clear-night': 'night-clear',
        'partly-cloudy-day': 'day-cloudy',
        'partly-cloudy-night': 'night-cloudy',
        'cloudy': isDaytime ? 'day-cloudy' : 'night-cloudy',
        'fog': isDaytime ? 'day-foggy' : 'night-foggy',
        'wind': isDaytime ? 'day-windy' : 'night-windy',
        'rain': isDaytime ? 'day-rainy' : 'night-rainy',
        'showers-day': 'day-rainy',
        'showers-night': 'night-rainy',
        'snow': isDaytime ? 'day-snowy' : 'night-snowy',
        'snow-showers-day': 'day-snowy',
        'snow-showers-night': 'night-snowy',
        'thunder-rain': isDaytime ? 'day-thunderstorm' : 'night-thunderstorm',
        'thunder-showers-day': 'day-thunderstorm',
        'thunder-showers-night': 'night-thunderstorm',
    };
    
    return iconMap[iconCode] || `day-clear`;
}