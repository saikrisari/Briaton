export const openLocationList = () => {
    const locationBtn = document.querySelector('.location__city');
    const locationCities = document.querySelectorAll('.location__sublink');
    const locationSublist = document.querySelector('.location__sublist');
    const locationCityName = document.querySelector('.location__city-name');

    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
        locationCityName.textContent = savedCity;
    }

    locationCities.forEach(city => {
        city.addEventListener('click', () => {
            const selectedCity = city.textContent;
            locationCityName.textContent = selectedCity;
            locationSublist.classList.remove('location__sublist--active');
            localStorage.setItem('selectedCity', selectedCity);

            locationBtn.classList.remove('location__city--active');
        });
    });

    locationBtn.addEventListener('click', () => {
        locationBtn.classList.toggle('location__city--active');
    });
};