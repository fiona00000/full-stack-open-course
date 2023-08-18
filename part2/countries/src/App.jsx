import axios from 'axios'
import { useState, useEffect } from 'react'

const Search = ({find, handleClick}) => {
  return (
    <>
      find countries <input value={find} onChange={handleClick} />
    </>
  )
}

const Countries = ({ countries }) => {
console.log(countries)
  return (
    <>
      {countries.map(country => {
        return (<p key={country.id}>{country.name.common}</p>)
      })}
    </>
  )
}

const Country = ({ country }) => {
  const languageObj = Object.keys(country.languages).map((id)=> {
  return { id: id, value: country.languages[id] };
  });

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br />
      <p><b>languages:</b></p>
      <ul>
        {languageObj.map((language) => {
          return <li key={language.id}>{language.value}</li>
        })} 

      </ul>
      <img src={country.flags.png}/>
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  useEffect(() => {
    console.log('Effect starting to retrieve data...')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Promise fulfilled')
        const countriesObject = response.data.map((country, idx) => ({
          ...country,
          id: idx + 1
        }))
        setCountries(countriesObject)
    })
  },[])

  const handleSearchChange = (event) => {
    setFind(event.target.value)
  }

  const resultCountries = find
    ? countries.filter(country => country.name.common.toUpperCase().includes(find.toUpperCase()))
    : ""

  const displayCountries = resultCountries.length > 10 ?
      "Too many matches, specify another filter"
    : resultCountries
  
  const resLen = resultCountries.length

  return (
    <div>
      <Search find={find} handleClick={handleSearchChange} />
      

      {resLen > 10 ?
        (<div>Too many matches, specify another filter</div>)
        : resLen === 1 ?
          (<Country country={resultCountries[0]} />)
          : resLen !== 0 && resLen <= 10 ?
            <Countries countries={resultCountries} />
          : null}
    </div>    
  )
}

export default App
