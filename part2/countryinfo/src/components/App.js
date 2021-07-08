import React, { useEffect, useState } from "react"
import axios from "axios"
import Country from "./Country"

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({data}) => setCountries(data))
  }, [])

  const getWeather = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=en`)
      .then(({data}) => {
        setWeather(data)
      })
  } 

  const filtered = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(filtered.length === 1) {
    if(country !== filtered[0]) {
      getWeather(filtered[0].capital)
      setCountry(filtered[0])
    }
  } else {
    if(country !== null ) {
      setWeather(null)
      setCountry(null)
    }
  }

  return (
    <>
      <h1>Country search</h1>
      <p>Find: <input onChange={(e) => setFilter(e.target.value)} value={filter} /></p>
      {
        country ? (
          <Country country={country} weather={weather} />
        ) : (
          filtered.length > 10 ? (
            <p>Too many matches, be more specific</p>
          ) : (
            filtered.map((country) => <p key={country.name}>{country.name} <button onClick={() => setFilter(country.name)}>Show</button></p>)
          )
        )
      }
    </>
  )
}

export default App
