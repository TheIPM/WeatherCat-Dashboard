var weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting

  var locationInput = document.getElementById('location-input');
  var location = locationInput.value;

  getWeather(location);
});

function getWeather(location) {
    var apiKey = '16962282faecdfd494ff4b8f615e26b8';
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
    document.getElementById('forecast-container').innerHTML = '';
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var forecastData = data.list
      var filteredData = forecastData.filter(function(forecast) {
        var date = new Date(forecast.dt * 1000);
        var hours = date.getUTCHours();
        return hours === 12;
      });
      for(var i = 0; i < filteredData.length; i++) {
          var forecast = filteredData[i];
          var date = new Date(forecast.dt*1000);
          var temperature = forecast.main.temp - 273.15;
          var weatherDescription = forecast.weather[0].description;
          var weatherIcon = forecast.weather[0].icon;
          // Create new HTML element to display the forecast
          var forecastContainer = document.createElement('div');
          forecastContainer.innerHTML = `
              <div class="forecast-date">${date}</div>
              <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
              <div class="forecast-temp">${temperature}C</div>
              <div class="forecast-desc">${weatherDescription}</div>
          `;
          // Append the new element to the forecast container
          document.getElementById('forecast-container').appendChild(forecastContainer);
      }
      var temperature = data.list[0].main.temp - 273.15; // temperature in kelvin
      var temperatureElement = document.getElementById('temperature');
      temperatureElement.innerHTML = temperature + 'C';
    });
  }