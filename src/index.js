import { loadMainPage } from './mainPage.js';
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

// Load API, then load main page

async function initApp() {
    await loadPlacesAPI();
    loadMainPage();
}

initApp().catch(error => {
    console.error('Failed to load Places API:', error);
    loadMainPage();
});