import { getWeatherIcon, getWeatherBackground } from './weatherPage.js';


export function loadWeatherPageDOM(city) {
    const app = document.getElementById('app');

    const weatherPageHTML = `
        <div class="background-container"></div>
        <div class="weather-container">
            <div class="left">
                <div class="new-search">
                    <button id="new-search-button">New Search</button>
                </div>
                <div class="weather" id="weather">
                    <div class="top-row">
                        <div class="left-side">
                            <h2 id="location">${city}</h2>
                            <h5 id="date">October 10, 2023</h5>
                        </div>
                        <h3 id="time">12:00 PM</h3>
                    </div>
                    <h1 id="temperature">--°C</h1>
                    <h3 id="description">Weather Description</h3>
                    <img id="weather-icon" src="" alt="Weather Icon">
                </div>
            </div>
            <div class="info">
                <div class="details">
                    <h3>Details</h3>
                    <p id="humidity">Humidity: --%</p>
                    <p id="wind-speed">Wind Speed: -- m/s</p>
                    <p id="pressure">Pressure: -- hPa</p>
                    <p id="probability">Rain Probability: --%</p>
                    <p id="uv-index">UV Index: --</p>
                </div>
            </div>
            <div class="weekly">
                <h3>Weekly Forecast</h3>
                <div class="weekly-forecast">
                    <div class="day-forecast">
                        <p class="day-name" id="day-1-name">Mon</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <div class="week-temps">
                            <p class="day-temp" id="day-1-temp">22°C</p>
                            <p class="day-low-temp" id="day-1-low-temp">21°C</p>
                        </div>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name" id="day-2-name">Tue</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <div class="week-temps">
                            <p class="day-temp" id="day-2-temp">23°C</p>
                            <p class="day-low-temp" id="day-2-low-temp">22°C</p>
                        </div>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name" id="day-3-name">Wed</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <div class="week-temps">
                            <p class="day-temp" id="day-3-temp">24°C</p>
                            <p class="day-low-temp" id="day-3-low-temp">22°C</p>
                        </div>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name" id="day-4-name">Thu</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <div class="week-temps">
                            <p class="day-temp" id="day-4-temp">25°C</p>
                            <p class="day-low-temp" id="day-4-low-temp">22°C</p>
                        </div>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name" id="day-5-name">Fri</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <div class="week-temps">
                            <p class="day-temp" id="day-5-temp">26°C</p>
                            <p class="day-low-temp" id="day-5-low-temp">22°C</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    app.innerHTML = weatherPageHTML;
    const newSearchButton = document.getElementById('new-search-button');
    newSearchButton.addEventListener('click', () => {
        //TODO: make new search functional
    });
}

export function updateWeatherDOM(city, data) {
    console.log('Updating weather DOM with data:', data);
    const locationElem = document.getElementById('location');
    const temperatureElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
    const weatherIconElem = document.getElementById('weather-icon');
    const humidityElem = document.getElementById('humidity');
    const windSpeedElem = document.getElementById('wind-speed');
    const pressureElem = document.getElementById('pressure');
    const timeElem = document.getElementById('time');
    const dateElem = document.getElementById('date');
    const probabilityElem = document.getElementById('probability');
    const uvIndexElem = document.getElementById('uv-index');
    const weatherElem = document.getElementById('weather');

    const temperature = data ? data.currentConditions.temp : '--';
    const description = data ? data.currentConditions.conditions : 'N/A';
    const iconCode = data ? data.currentConditions.icon : 'unknown';
    const humidity = data ? data.currentConditions.humidity : '--';
    const windSpeed = data ? data.currentConditions.windspeed : '--';
    const pressure = data ? data.currentConditions.pressure : '--';
    const date = data ? new Date(data.days[0].datetime).toLocaleDateString() : 'N/A';
    const probability = data ? data.currentConditions.precipprob : '--';
    const uvIndex = data ? data.currentConditions.uvindex : '--';

    if (dateElem) {
        dateElem.textContent = date;
    }

    if (uvIndexElem) {
        uvIndexElem.textContent = `UV Index: ${uvIndex}`;
    }

    if (probabilityElem) {
        probabilityElem.textContent = `Rain Probability: ${probability}%`;
    }

    // Get current time for the location's timezone
    //API doesnt provide current time, only time of last weather reading update
    const timezone = data ? data.timezone : null;
    let currentTime;
    let currentDate;
    let currentDay;
    
    if (timezone) {
        currentDate = new Date().toLocaleDateString('en-US', { timeZone: timezone });
        let currentDateObj = new Date(currentDate);
        currentDay = currentDateObj.getDay();
        // Use the location's timezone to show current time there
        currentTime = new Date().toLocaleTimeString('en-US', { 
            timeZone: timezone,
            hour: '2-digit', 
            minute: '2-digit' 
        });
    } else {
        // Fallback to local time if no timezone info
        currentTime = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    if (weatherElem) {
    let isDaytime;
    // Get the current hour in 24-hour format for proper comparison
    let currentHour;
    if (timezone) {
        currentHour = new Date().toLocaleTimeString('en-US', { 
            timeZone: timezone,
            hour12: false,
            hour: '2-digit'
        });
    } else {
        currentHour = new Date().getHours();
    }
    
    // Convert to number for proper comparison (6 AM to 6 PM = 6 to 18)
    const hour = parseInt(currentHour);
    isDaytime = hour >= 6 && hour < 18;
    
    let backgroundClass = getWeatherBackground(iconCode, isDaytime);
    weatherElem.classList.add(`${backgroundClass}`);
    }
    
    timeElem.textContent = currentTime;
    dateElem.textContent = currentDate;

    if (temperatureElem) {
        temperatureElem.textContent = temperature + '°F';
    }
    if (descriptionElem) {
        descriptionElem.textContent = description;
    }
    if (weatherIconElem && iconCode && iconCode !== 'unknown') {
        weatherIconElem.src = getWeatherIcon(iconCode);
        weatherIconElem.alt = description;
    }
    if (humidityElem) {
        humidityElem.textContent = `Humidity: ${humidity}%`;
    }
    if (windSpeedElem) {
        windSpeedElem.textContent = `Wind Speed: ${windSpeed} mph`;
    }
    if (pressureElem) {
        pressureElem.textContent = `Pressure: ${pressure} hPa`;
    }
    if (locationElem) {
        locationElem.textContent = city;
    }


    const day1TempElem = document.getElementById('day-1-temp');
    const day2TempElem = document.getElementById('day-2-temp');
    const day3TempElem = document.getElementById('day-3-temp');
    const day4TempElem = document.getElementById('day-4-temp');
    const day5TempElem = document.getElementById('day-5-temp');
    const day1LowTempElem = document.getElementById('day-1-low-temp');
    const day2LowTempElem = document.getElementById('day-2-low-temp');
    const day3LowTempElem = document.getElementById('day-3-low-temp');
    const day4LowTempElem = document.getElementById('day-4-low-temp');
    const day5LowTempElem = document.getElementById('day-5-low-temp');

    if (data && data.days && data.days.length >= 5) {
        day1TempElem.textContent = `${data.days[0].tempmax}°F`;
        day2TempElem.textContent = `${data.days[1].tempmax}°F`;
        day3TempElem.textContent = `${data.days[2].tempmax}°F`;
        day4TempElem.textContent = `${data.days[3].tempmax}°F`;
        day5TempElem.textContent = `${data.days[4].tempmax}°F`;
        day1LowTempElem.textContent = `${data.days[0].tempmin}°F`;
        day2LowTempElem.textContent = `${data.days[1].tempmin}°F`;
        day3LowTempElem.textContent = `${data.days[2].tempmin}°F`;
        day4LowTempElem.textContent = `${data.days[3].tempmin}°F`;
        day5LowTempElem.textContent = `${data.days[4].tempmin}°F`;
    } else {
        day1TempElem.textContent = '--°F';
        day2TempElem.textContent = '--°F';
        day3TempElem.textContent = '--°F';
        day4TempElem.textContent = '--°F';
        day5TempElem.textContent = '--°F';
        day1LowTempElem.textContent = '--°F';
        day2LowTempElem.textContent = '--°F';
        day3LowTempElem.textContent = '--°F';
        day4LowTempElem.textContent = '--°F';
        day5LowTempElem.textContent = '--°F';
    }

    const day1NameElem = document.getElementById('day-1-name');
    const day2NameElem = document.getElementById('day-2-name');
    const day3NameElem = document.getElementById('day-3-name');
    const day4NameElem = document.getElementById('day-4-name');
    const day5NameElem = document.getElementById('day-5-name');

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (day1NameElem) {
        day1NameElem.textContent = dayNames[(currentDay + 1) % 7];
    }
    if (day2NameElem) {
        day2NameElem.textContent = dayNames[(currentDay + 2) % 7];
    }
    if (day3NameElem) {
        day3NameElem.textContent = dayNames[(currentDay + 3) % 7];
    }
    if (day4NameElem) {
        day4NameElem.textContent = dayNames[(currentDay + 4) % 7];
    }
    if (day5NameElem) {
        day5NameElem.textContent = dayNames[(currentDay + 5) % 7];
    }
}
