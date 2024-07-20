import React, { useEffect, useState } from 'react'
import './App.css'

import AppIcon from "/Images/weatherIcon.png"
import searchIcon from "/Images/search icon.jpg"
import WeatherContent from './WeatherContent'
import clearSkyD from "/Images/Clear Sky D.png"
import clearSkyN from "/Images/ClearSky N.png"
import fewCloudsD from "/Images/Few clouds D.png"
import fewCloudsN from "/Images/Few Clouds N.png"
import cloudD from "/Images/cloud D.png"
import cloudN from "/Images/Cloud N.png"
import cloudsD from "/Images/Broken clouds D.png"
import cloudsN from "/Images/Broken clouds N.png"
import lightRainD from "/Images/light-rain D.png"
import lightRainN from "/Images/light-rain N.png"
import heavyRainD from "/Images/heavy-rain D.png"
import heavyRainN from "/Images/heavy-rain N.png"
import HazeD from "/Images/Haze D.png"
import HazeN from "/Images/Haze N.png"




const App = () => {
  const [city,setCity]=useState("City Name")
  const [country,setCountry]=useState("country")
  const [temp,setTemp]=useState(0)
  const [feel,setFeel]=useState(null)
  const [text,setText]=useState(null)
  const [humidity,setHumidity]=useState(null)
  const [wind,setWind]=useState(null)
  const [entry,setEntry]=useState(null)
  const [icon,setIcon]=useState(AppIcon)
  const [loading,setLoading]=useState(null)
  const [notFound,setNotfound]=useState(null)
  const [err,setErr]=useState(null);

  const API_key="9d50c38dd50bb951c229c761f3c731bb";
   
  const WeatherIconMap = {
    "01d":clearSkyD,
    "01n":clearSkyN,
    "02d":fewCloudsD,
    "02n":fewCloudsN,
    "03d":cloudD,
    "03n":cloudN,
    "04d":cloudsD,
    "04n":cloudsN,
    "09n":lightRainD,
    "09n":lightRainN,
    "10d":heavyRainD,
    "10n":heavyRainN,
    "50d":HazeD,
    "50n":HazeN,
  };

  const search = async ()=>{

    const API_url=`https://api.openweathermap.org/data/2.5/weather?q=${entry}&appid=${API_key}&units=Metric`
    
    try{
      const res=await fetch(API_url);
      const data=await res.json();
      console.log(data);
      if(data.cod ==="404"){
        console.error("City Not Found");
        setNotfound(true);
        setLoading(false);
      }
      
      setCity(data.name);
      setCountry(data.sys.country);
      setText(data.weather[0].description);
      setTemp(Math.floor(data.main.temp));
      setFeel(Math.floor(data.main.feels_like));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      const iconCode = data.weather[0].icon;
      setIcon(WeatherIconMap[iconCode]);
      setNotfound(false);
      setLoading(false);
      
    }catch (error){
       console.error("An error occured : ",error);
       setErr("Error Occured while searching City.");
    }finally{
      setLoading(false);
    }
  }

const ChangeHandler = (e) =>{
  setLoading(false);
  setErr(false);
  setNotfound(false);
  setEntry(e.target.value);
};

const changeKeyDown = (e) => {
  if(e.key === "Enter"){
    search();
  }
}

// useEffect(()=>{
//   search();
// },[])
  return (
    <>
      <div className='Main-containor'>
        <div className='Search-containor'>
          <input type="text" className='search-Bar' placeholder='Search City' onChange={ChangeHandler} onKeyDown={changeKeyDown}/>
          <div className='Image-containor' onClick={()=>{search()}}><img src={searchIcon} alt="search icon" className='Search-image'/></div>
        </div>
      
      {!loading && !notFound && <WeatherContent icon={icon} city={city} country={country} temp={temp} feel={feel} text={text} humidity={humidity} wind={wind} /> }
      {err && <div className='err'>{err}</div>}
      {loading && <div className='loading'>Loading</div>}
      {notFound && <div className='notFound'>City Not Found</div>}
      </div>
    </>
  )
}

export default App
