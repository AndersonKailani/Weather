document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');

    // cities data
    const cities = [
        { name: 'New York', lat: 40.7128, lon: -74.0060 },
        { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
        { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
        { name: 'Atlanta', lat: 33.7488, lon: -84.3877},
        { name: 'San Diego', lat:32.7157, lon: -117.1611},
        { name: 'Accident', lat:39.6287, lon: -79.3198},
        // Add more cities as needed
    ];

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ lat: city.lat, lon: city.lon });
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
});

  