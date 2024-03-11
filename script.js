document.addEventListener('DOMContentLoaded', function() {
    function createCard(countryData) {
        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('col-lg-4', 'col-sm-12', 'mb-4','mt-4'); // Add column classes
    
        // Create card
        const card = document.createElement('div');
        card.classList.add('card', 'border', 'bg-light'); // Add card classes
        card.setAttribute('style', 'color: white; background: linear-gradient(to right,#d3c39e,#56645e);')
    
        //  card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header','text-center');
        cardHeader.setAttribute('style','color:white;')
        cardHeader.style.backgroundColor='black'
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = countryData.name.common;
        cardHeader.appendChild(cardTitle);
    
        //  card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body','text-center');
       
    
        // Populate card with country data
        cardBody.innerHTML = `
        <img src="${countryData.flags.png}" class="card-img-top mx-auto d-block" alt="Flag" style="width: 250px; height: auto;"> <!-- Center align the image -->
            <p class="card-text ">Capital: ${countryData.capital}</p>
            
            <p class="card-text ">Region: ${countryData.region}</p>
            <p class="card-text">Country Code: ${countryData.altSpellings[0]}</p>
            <p class="card-text">Latitude: ${countryData.latlng[0]}</p>
            <p class="card-text">Longitude: ${countryData.latlng[1]}</p>
            
        `;
    
        //  button
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'btn-weather');
        button.setAttribute('data-country', countryData.name.common);
        button.textContent = 'Click for Weather';
    
       // Event listener for the button
button.addEventListener('click', function() {
    fetchWeather(countryData.name.common, cardBody);
});

    
        // Append elements to card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(button);
    
        // Append card to card container
        cardContainer.appendChild(card);
       


    
        return cardContainer;
    }
    
    
    

    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                //  cards for each country and append to the container
                const container = document.getElementById('container');
                const row = document.getElementById('row');
                // Add row and column classes
                container.appendChild(row);
                data.forEach(country => {
                    const card = createCard(country);
                    row.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching countries:', error));
    }

    
    function fetchWeather(country, cardBody) {
        const apiKey = '961d2801d42cbab875ca09c574e8de71'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update card body with weather information
                cardBody.innerHTML += `
                    <p class="card-text">Weather: ${data.weather[0].main}</p>
                    <p class="card-text">Temperature: ${data.main.temp} K</p>
                    <p class="card-text">Humidity: ${data.main.humidity} %</p>
                `;
            })
            .catch(error => console.error('Error fetching weather:', error));
    }
    

  
    fetchCountries();
});







 