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
  
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        var temperature = data.list[0].main.temp; // temperature in kelvin
        var temperatureInCelsius = temperature - 273.15;
        var temperatureElement = document.getElementById('temperature');
        temperatureElement.innerHTML = temperatureInCelsius + 'C';
      });
      
  }

