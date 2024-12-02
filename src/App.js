import React, { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [forecastData, setForecastData] = useState('')
  const [loading, setLoading] = useState(false)



  const apiKey = process.env.REACT_APP_API_KEY;

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found or API call failed');
      }

      const data = await response.json();
      setWeatherData(data);
      setLoading(false)

    } catch (error) {
      console.log(error.message);
      setWeatherData(null);
      setLoading(false)
    }
  };

  const fetchForecast = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found or API call failed');
      }

      const data = await response.json();
      setForecastData(data);
      setLoading(false)

    } catch (error) {
      console.log(error.message);
      setWeatherData(null);
      setLoading(false)

    }
  };

  const handleSubmit = () => {
    fetchWeather()
    fetchForecast()
  }

  return (
    <div className="page">
      <div className='navbar'>
        <h1 className='weatherheading'>Weather App</h1>
      </div>
      <div className='bottom-section'>
        <h1 className='selectcity'>Select a city</h1>
        <input type='text' placeholder='Enter a city...' className='cinput' value={city} onChange={handleCityChange} />
        <button className='subcity' onClick={() => { handleSubmit() }}>Submit</button>

        {loading && (
          <p>Loading...</p>
        )}

        {weatherData && (
          <div className="weather-container">
            <h2 className='cityName'>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description.toUpperCase()}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}

        {forecastData && (
          <div className="forecast-container">
            <h2 className='citydes'>Forecast for {forecastData.city.name}, {forecastData.city.country}</h2>
            <div className="forecast-list">
              {forecastData.list.map((forecast, index) => {
                const date = new Date(forecast.dt * 1000); // Convert UNIX timestamp to Date
                return (
                  <div className="forecast-item" key={index}>
                    <h3>{date.toLocaleString()}</h3>
                    <p>{forecast.weather[0].description.toUpperCase()}</p>
                    <p>Temperature: {forecast.main.temp}°C</p>
                    <p>Humidity: {forecast.main.humidity}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
