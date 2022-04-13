import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CountryView = ({ country }) => {
  let name = country.name.common
  return (
    <div>
      <h1><b>{country.name.common}</b></h1>
      <p><b>Capital: </b> {country.capital}</p>
      <p><b>Area: </b>{country.area} km<sup>2</sup></p>

      <p><b>Languages: </b></p>
      <ol>
        {Object.values(country.languages).map(l =>
          <li key={l}>{l}</li>
        )}
      </ol>

      <img src={country.flags.png} alt="Flag" />
      <br/>
      <a href={"https://es.wikipedia.org/wiki/".concat(name)}>Mas información del país</a>

    </div>

  )
}

const Content = ({ countriesFound, setCountriesFound }) => {
  if (countriesFound.length === 0) {
    return <p>Ingrese país</p>
  }
  if (countriesFound.length === 1) {
    return <CountryView country={countriesFound[0]} />
  }
  if (countriesFound.length < 10) {
    return <ul>
      {countriesFound.map((c, i) =>
        <li key={i}>
          <b>{c.name.common}  </b>
          <button onClick={() => manageShowClick(c, setCountriesFound)}>Show</button>
        </li>)

      }
    </ul >
  }
  if (countriesFound.length > 10) {
    return <p>Demasiados paises, refine la busqueda</p>
  }
}

const manageShowClick = (c, setCountriesFound) => {
  setCountriesFound([c])
  document.getElementById("input").value = c.name.common
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
      <input id="input" onChange={manageChange} type="text" placeholder='Ingrese país'></input>
      <br />
      <b>RESULTADO: </b>
      <Content countriesFound={countriesFound} setCountriesFound={setCountriesFound} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
