import React, { useState, useEffect } from "react";
import axios from 'axios'
import ShowCountries from "./components/ShowCountries";

const SearchCountries = ({ newSearch, newSearchHandle }) => (
  <div>
    find countries
    <input value={newSearch} onChange={newSearchHandle} />
  </div>
)

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const newSearchHandle = (event) => {
    setNewSearch(event.target.value.toLowerCase())
  }

  return (
    <div>
      <SearchCountries newSearch={newSearch} newSearchHandle={newSearchHandle} />
      <ShowCountries filter={newSearch} countries={countries} />
    </div>
  );
}

export default App;