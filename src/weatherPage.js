import { VC_API_KEY, GM_API_KEY } from './keys.js';
import { loadWeatherPageDOM, updateWeatherDOM } from './weatherPageDOM.js';


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
