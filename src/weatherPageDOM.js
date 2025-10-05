export function loadWeatherPageDOM(city) {
    const app = document.getElementById('app');

    const weatherPageHTML = `
        <div class="background-container"></div>
        <div class="weather-container">
            <div class="left">
                <div class="new-search">
                    <button id="new-search-button">New Search</button>
                </div>
                <div class="weather">
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
                        <p class="day-name">Mon</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <p class="day-temp" id="day-1-temp">22°C</p>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name">Tue</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <p class="day-temp" id="day-2-temp">23°C</p>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name">Wed</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <p class="day-temp" id="day-3-temp">24°C</p>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name">Thu</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <p class="day-temp" id="day-4-temp">25°C</p>
                    </div>
                    <div class="day-forecast">
                        <p class="day-name">Fri</p>
                        <img class="day-icon" src="https://www.weatherbit.io/static/img/icons/c02d.png" alt="Cloudy">
                        <p class="day-temp" id="day-5-temp">26°C</p>
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
    
    if (timezone) {
        currentDate = new Date().toLocaleDateString('en-US', { timeZone: timezone });
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
    
    timeElem.textContent = currentTime;
    dateElem.textContent = currentDate;

    // dummy data
    if (temperatureElem) {
        temperatureElem.textContent = temperature + '°F';
    }
    if (descriptionElem) {
        descriptionElem.textContent = description;
    }
    if (weatherIconElem) {
        weatherIconElem.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
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

    if (data && data.days && data.days.length >= 5) {
        day1TempElem.textContent = `${data.days[0].temp}°F`;
        day2TempElem.textContent = `${data.days[1].temp}°F`;
        day3TempElem.textContent = `${data.days[2].temp}°F`;
        day4TempElem.textContent = `${data.days[3].temp}°F`;
        day5TempElem.textContent = `${data.days[4].temp}°F`;
    } else {
        day1TempElem.textContent = '--°F';
        day2TempElem.textContent = '--°F';
        day3TempElem.textContent = '--°F';
        day4TempElem.textContent = '--°F';
        day5TempElem.textContent = '--°F';
    }
}
