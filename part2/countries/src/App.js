import { useState, useEffect } from 'react'
import axios from 'axios'

const COUNTRYBASEURL = 'https://restcountries.com/v2/all'
const APIKEY = process.env.REACT_APP_API_KEY

const SearchDisplay = ({ searchValue, handleSearchValueChange }) => {
  return (
    <>
      Search for a country:  <input value={searchValue} onChange={handleSearchValueChange}></input>
    </>
  )
}

const CountriesDisplay = ({ countries, handleShowInformation }) => {
  if (countries.length >= 10) {
    return(
      <div>
        Too many countries to list please refine your search.
      </div>
    )
  }
  else if (countries.length > 1 && countries.length < 10) {
    return(
    <ul>
      {countries.map(country => <li key={country.name}>{country.name} <button onClick= {() => handleShowInformation(country)}>{`Show information for ${country.name}`}</button></li>)}
    </ul>
    )
  }
  else if (countries.length === 1) {
    return(
      <CountryDisplay country={countries[0]} />
    )
  }
  else {
    return(
      <h1>Enter the name of a country</h1>
    )
  }

}

const CountryDisplay = ({ country }) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={`${country.flags.png}`} alt={`Picture of ${country.name} flag`} />
    </div>
  )
}

/*
const WeatherDisplay = ({ country }) => {
  const [weather, setWeather] = useState([])
  //console.log(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${APIKEY}`)
  //const weather = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${APIKEY}`)
  //console.log(weather)
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${APIKEY}`)
    .then(response => setWeather(response.data))
    .catch(error => {
      setWeather([])
    })
  
  if (weather === []) return <></>

  return(
    <>
      <h2>{`Weather for ${country.capital}`}</h2>
      <p>Temperature: {weather.main.temp}</p>
      <p>Wind:  {weather.wind.speed}</p>
    </>
  )
}
*/
const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])

  useEffect(() => {
    axios
      .get(COUNTRYBASEURL)
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.log(error)
        alert("Could not load data")
      })
  }, [])

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
    const tempDisplayCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
    setDisplayCountries(tempDisplayCountries)
  }

  const handleShowInformation = (country) => {
    setDisplayCountries(displayCountries.filter(c => c.name === country.name))
    setSearchValue(country.name)
  }

  const handleReset = () => {
    setSearchValue('')
    setDisplayCountries([])
  }

  return (
    <div>
      <SearchDisplay searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} />
      <button onClick={() => handleReset()}>Reset</button>
      <CountriesDisplay countries={displayCountries} handleShowInformation={handleShowInformation}/>
    </div>
  );
}

export default App;
