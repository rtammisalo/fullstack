import { useState, useEffect } from "react"
import axios from 'axios'

const ShowWeather = ({ country }) => {
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [iconURL, setIconURL] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [notFound, setNotFound] = useState(false)
  const api_key = process.env.REACT_APP_API_KEY
  let capital = country.capital[0]
  let countryCode = country.altSpellings[0]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${api_key}&units=metric`)
      .then(response => {
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
        let iconCode = response.data.weather[0].icon
        setIconURL(`http://openweathermap.org/img/wn/${iconCode}@2x.png`)
        setWeatherDescription(response.data.weather[0].description)
        setNotFound(false)
      })
      .catch(() => setNotFound(true)) /* Doesn't get rid of the 404 Error for GET */
  }, [capital, countryCode, api_key])

  if (notFound) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        No weather data found
      </div>)
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {temperature} Celsius</div>
      <img src={iconURL} alt={weatherDescription} />
      <div>wind {wind} m/s</div>
    </div>
  )
}

export default ShowWeather