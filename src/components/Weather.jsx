import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Weather = () => {
  //Geolocalización y consumo de API//
  const [weather, setWeather] = useState({});

  useEffect(()=>{

    let getPosition = (position) =>{
      let location = position.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=b09b261aa9f5356a2dbf1d2c054f0df6`)
        .then(res => setWeather(res.data));
    }

    let error = (error)=>{
      alert(error.message);
      console.warn(`Error: ${error.message}`);
    };
  
    let options = {
      enableHighAccuracy : true,
      timeout: 5000,
      maximumAge: 0
    }
  
    navigator.geolocation.getCurrentPosition(getPosition, error, options);

  }, []);

  console.log(weather);
 
  //declaración de booleano para botón//
  const [isCelsius, setIsCelsius] = useState(true);
  let celsius = ()=>{
    setIsCelsius(!isCelsius);
  }
  const toCelsius = weather.main?.temp-273.15;
  const toFahrenheit = (weather.main?.temp-273.15) * 1.8 + 32;
  
  
  return (
    <div className='box'>
      <h1>Weather Forecast</h1>
      <h2>{weather.name} / {weather.sys?.country}</h2>
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="icon"/>
      <h2>
        { isCelsius? toCelsius.toFixed(2) : toFahrenheit.toFixed(2)} {' '}
        { isCelsius? "°C" : "°F"}
      </h2>
      <p>{weather.weather?.[0].description}</p>
      <p>Humidity: {weather.main?.humidity} %</p>
      <p>Wind Speed: {weather.wind?.speed} m/s</p>
      <button onClick={celsius}>°F / °C</button>
    </div>
  );
};

export default Weather;