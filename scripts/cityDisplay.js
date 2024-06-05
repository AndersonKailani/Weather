document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const cityInfoContainer = document.getElementById('cityInfoContainer');
    const forecastContainer = document.getElementById('forecast-container');

    citySelect.addEventListener('change', async () => {
        const selectedCity = citySelect.value;

        if (selectedCity) {
            const { lat, lon } = JSON.parse(selectedCity);
            const forecastData = await fetchForecastData(lat, lon);
            displayCityInfo(lat, lon);
            displayForecast(forecastData);
        } else {
            cityInfoContainer.innerHTML = '';
            forecastContainer.innerHTML = '';
        }
    });

    async function fetchForecastData(lat, lon) {
        try {
            const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
            const data = await response.json();
            const forecastUrl = data.properties.forecast;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            return forecastData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            forecastContainer.innerHTML = 'Failed to fetch weather data.';
        }
    }

    function displayCityInfo(lat, lon) {
        cityInfoContainer.innerHTML = `
            <h2>City Information</h2>
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lon}</p>
        `;
    }

    function displayForecast(forecastData) {
        const periods = forecastData.properties.periods;
        forecastContainer.innerHTML = `
            <h2>Weather Forecast</h2>
            <ul>
                ${periods.map(period => `
                    <li>
                        <h3>${period.name}</h3>
                        <p>${period.detailedForecast}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    }
});
