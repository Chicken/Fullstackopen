import React from "react"

const Country = ({ country, weather }) => (
    <>
        <h2>{country.name}</h2>
        <p>
            Capital {country.capital} <br />
            Population {country.population}
        </p>
        <h3>Languages</h3>
        <ul>
            {
                country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)
            }
        </ul>
        <img style={{ width: "256px" }} alt={`Flag of ${country.name}`} src={country.flag} />
        {
            weather ? (
                <>
                    <h3>Weather in {country.capital}</h3>
                    <p><b>Temperature:</b> {weather.main.temp} C</p>
                    <p><b>Wind speed:</b> {weather.wind.speed} m/s</p>
                    <img alt={weather.weather[0].description} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}/>
                </>
            ) : <></>
        }
    </>
)

export default Country
