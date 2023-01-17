var weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var locationInput = document.getElementById('location-input');
  var location = locationInput.value;
  localStorage.setItem(location, location);
  getWeather(location);
});

function getWeather(location) {
  var apiKey = '16962282faecdfd494ff4b8f615e26b8';
  var url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var forecastData = data.list.slice(0,40);
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var currentDay = '';
      var forecastContainer = document.getElementById('forecast-container');
      forecastContainer.innerHTML = '';
      for(var i = 0; i < forecastData.length; i++) {
          var forecast = forecastData[i];
          var date = new Date(forecast.dt*1000);
          var day = days[date.getUTCDay()];
          var hours = date.getUTCHours();
          var windSpeed = forecast.wind.speed;
          var humidity = forecast.main.humidity;
          if (currentDay !== day && hours === 12) {
              currentDay = day;
              var temperature = (forecast.main.temp - 273.15).toFixed(1);
              var weatherDescription = forecast.weather[0].description;
              var weatherIcon = forecast.weather[0].icon;
              // NEW HTML TO DISPLAY 
              var forecastContainer = document.createElement('div');
              forecastContainer.innerHTML = `
                  <div class="forecast-date">${day}</div>
                  <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
                  <div class="forecast-temp">${temperature}C</div>
                  <div class="forecast-wind-speed">Wind Speed: ${windSpeed}</div>
                  <div class="forecast-humidity">Humidity: ${humidity}%</div>
                  <div class="forecast-desc">${weatherDescription}</div>
              `;
              // Append it to foreest container 
              document.getElementById('forecast-container').appendChild(forecastContainer);
          }
      }
      updateSearchHistory();
    });
}

function updateSearchHistory() {
  var searchHistoryContainer = document.getElementById('search-history-container');
  searchHistoryContainer.innerHTML = '';
  for (var i = 0; i < localStorage.length; i++) {
    var location = localStorage.key(i);
    var locationLink = document.createElement('a');
    locationLink.href = '#';
    locationLink.innerText = location;

    (function(seahisloc) {
      locationLink.addEventListener('click', function() {
        getWeather(seahisloc);
      });
    })(location);

    searchHistoryContainer.appendChild(locationLink);
    
  }
}

