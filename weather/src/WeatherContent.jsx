import React from 'react'
import './WeatherContent.css'
import snow from '/Images/snow.jpg'
import Wind from '/Images/Wind Speed.png'
import Humidity from '/Images/Humidity.png'


const WeatherContent = ({city,country,temp,feel,text,humidity,wind,icon}) => {
  
  return (
    <>
    <div className='weather-content'>
      <div className='weather-image-containor'><img src={icon} alt="Weather Image" className='weather-image'/></div>
      <div className='text-content'>
      <div className='Temperature'>{temp}<sup> 0</sup>C</div>
      <div className='feel'>Feels Like <sup className='feel-sup'>0</sup>{feel}</div>
        <div className='city-name'>{city}</div>
        <div className='country'>{country}</div>
        <div className='text'>{text}</div>    
      </div>
      <div className='Extra'>
        <div className='Extra-content'>
          <span className='humidity-image-containor'><img src={Humidity} alt="Humidity Image" className='humidity-image' /></span>
          <span className='humidity'>
            <div>
              {humidity} %
            </div>
            <div>
              Humidity
            </div>
          </span>
        </div>
        <div className='Extra-content'>
          <span className='windSpeed-image-containor'><img src={Wind} alt="Wind Image" className='wind-image' /></span>
          <span className='windSpeed'>
            <div>
              {wind} km/h
            </div>
            <div>
              Wind Speed
            </div>
          </span>
        </div>
      </div>
      <footer ><div className='designer-title'>Design By </div><div className='designer'>Fazeen</div></footer>
    </div>
    </>
  )
}

export default WeatherContent
