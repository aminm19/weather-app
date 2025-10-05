import { loadMainPage, initializeAutocomplete } from './mainPage.js';
import './styles.css'
import { VC_API_KEY, GM_API_KEY } from './keys.js';


function loadPlacesAPI() {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GM_API_KEY}&loading=async&libraries=places&callback=initPlaces`;
        script.async = true;
        script.defer = true;
        
        // Create callback function
        window.initPlaces = () => {
            delete window.initPlaces; // Clean up
            resolve();
        };

        script.onerror = () => reject(new Error('Places API failed to load'));
        document.head.appendChild(script);
    });
}

// Load main page immediately, then load API in background

async function initApp() {
    loadMainPage();
    
    // Load API in background
    try {
        await loadPlacesAPI();
        console.log('Google Places API loaded successfully');
        // Now that API is loaded, initialize autocomplete
        await initializeAutocomplete();
    } catch (error) {
        console.error('Failed to load Places API:', error);
        console.log('Autocomplete will not be available');
    }
}

initApp();