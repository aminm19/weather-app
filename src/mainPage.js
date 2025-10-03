export function loadMainPage() {
    const app = document.getElementById('app');

    const mainPageHTML = `
        <div class="home-container">
            <h1 class="search-header">Please choose a location</h1>
            <div class="search-area">
                <input id="search-input" type="text" placeholder="Search City">
                <button id="search-button">Search</button>
            </div>
        </div>
    `;

    app.innerHTML = mainPageHTML;

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        const city = searchInput.value;
        if (city) {
            console.log(`Searching weather for ${city}`);
            // Here you can add the logic to fetch and display weather data
        } else {
            console.log('Please enter a city name');
        }
    });
}