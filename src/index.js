import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Country = ({ country }) => {
  console.log(country.flags)
  return (
    <div>
      <h1><b>{country.name.common}</b></h1>
      <p><b>Capital: </b> {country.capital}</p>
      <p><b>Area: </b> {country.area}</p>

      <p><b>Languages: </b></p>
      <ol>
        {Object.values(country.languages).map(l =>
          <li key={l}>{l}</li>
        )}
      </ol>

      <img src={country.flags.png} alt="Flag" />

    </div>

  )
}

const Content = ({ countries }) => {
  if (countries.length === 0) {
    return <p>Ingrese país</p>
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />
    // <Country country={countries} />
  }
  if (countries.length < 10) {
    return countries.map(c => <p key={c.name.common}>{c.name.common}</p>)
  }
  if (countries.length > 10) {
    return <p>Demasiados paises, refine la busqueda</p>
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFound, setCountriesFound] = useState([])

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(json => setCountries(json))
  }, [])

  const manageChange = (e) => {
    setCountriesFound([])
    countries.forEach(c => {
      if (c.name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
        setCountriesFound(countries => countries.concat(c))
      }
    })
  }

  return (
    <>
      <input onChange={manageChange} type="text" placeholder='Ingrese país'></input>
      <br />
      <b>RESULTADO: </b>
      <Content countries={countriesFound} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
