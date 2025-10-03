import { VC_API_KEY, GM_API_KEY } from './keys.js';
import { displayWeather } from './weatherPageDOM.js';


export function searchWeather(city) {
    console.log(`Searching weather for ${city}`);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${VC_API_KEY}`;
    // Fetch weather data from Visual Crossing API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            //displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}