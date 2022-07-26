import axios from 'axios'
import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Filter = ({ filter, handleChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      === undefined) {
      axios
        .post('http://localhost:3001/persons', { name: newName, number: newNumber })
        .then(response => { setPersons(persons.concat(response.data)) })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange} />
      <PersonForm addPersonHandler={addPerson}
        newName={newName} nameHandler={handleNameChange}
        newNumber={newNumber} numberHandler={handleNumberChange} />
      <Persons persons={persons} filter={newFilter} />
    </div>
  )

}

export default App