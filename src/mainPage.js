import { VC_API_KEY, GM_API_KEY } from './keys.js';
import { loadWeatherPage } from './weatherPage.js';

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
        } else {
            console.log('Please enter a city name');
        }
    });

    // Note: initializeAutocomplete will be called from index.js after API loads
}

export async function initializeAutocomplete() {
    try {
        // Import the PlaceAutocompleteElement from Google Maps Places library
        const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");
        
        // Create a new PlaceAutocompleteElement
        const autocompleteElement = new PlaceAutocompleteElement({
            includedPrimaryTypes: ['locality', 'administrative_area_level_1'], // Cities and regions
            requestedLanguage: 'en',
            requestedRegion: 'us' // You can change this to your preferred region
        });

        // Replace the regular input with the autocomplete element
        const searchInput = document.getElementById('search-input');
        const searchArea = document.querySelector('.search-area');
        
        // Hide the original input
        searchInput.style.display = 'none';
        
        // Add CSS class and attributes for styling
        autocompleteElement.className = 'places-autocomplete';
        autocompleteElement.setAttribute('placeholder', 'Search City');
        
        // Insert the autocomplete element before the search button
        const searchButton = document.getElementById('search-button');
        searchArea.insertBefore(autocompleteElement, searchButton);

        // Listen for place selection
        autocompleteElement.addEventListener('gmp-select', (event) => {
            const placePrediction = event.placePrediction;
            
            try {
                // Convert PlacePrediction to Place object
                const place = placePrediction.toPlace();
                console.log('Selected place:', place);
                console.log('Place properties:', Object.keys(place));
                
                // Place object does not contain city name, just use prediciton text
                const selectedCity = placePrediction.text?.text;

                console.log(`Selected city: ${selectedCity}`);
                
                // Load weather page and get weather info from Visual Crossing API
                loadWeatherPage(selectedCity);
            } catch (error) {
                console.error('Error getting place details:', error);
            }
        });

        // Handle error events
        autocompleteElement.addEventListener('gmp-error', (event) => {
            console.error('Places API error:', event);
        });

    } catch (error) {
        console.error('Failed to initialize Google Places Autocomplete:', error);
        console.log('Falling back to regular text input');
    }
}