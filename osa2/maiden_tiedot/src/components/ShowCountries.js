const ShowCountry = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>
    capital {country.capital[0]}<br />
    area {country.area}<br />
    <h2>languages:</h2>
    <ul>
      {Object.entries(country.languages)
        .map((keyValuePair) => <li key={keyValuePair[0]}>{keyValuePair[1]}</li>)}
    </ul>
    <img src={country.flags.png}
      alt={`Flag of ${country.name.common}`} />
  </>
)

const Button = ({ countryName, setNewSearch }) => {
  return (<button onClick={() => setNewSearch(countryName.toLowerCase())}>show</button>)
}

const ShowCountries = ({ filter, countries, setNewSearch }) => {
  const filteredCountries = countries
    .filter((country) => country.name.common.toLowerCase().includes(filter))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length !== 1) {
    return (
      <div>
        {filteredCountries
          .map((country) => (
            <div key={country.name.official}>
              {country.name.common}
              <Button countryName={country.name.common} setNewSearch={setNewSearch} />
            </div>
          ))}
      </div>
    )
  }
  return (
    <div><ShowCountry country={filteredCountries[0]} /></div>
  )
}

export default ShowCountries