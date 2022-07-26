import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

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
    personsService
      .getPersons()
      .then(newPersons => { setPersons(newPersons) })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      === undefined) {
      personsService
        .createPerson({ name: newName, number: newNumber })
        .then(newPerson => { setPersons(persons.concat(newPerson)) })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (selectedPerson) => {
    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      personsService.deletePerson(selectedPerson)
        .catch(error => alert('Selected person does not exist'))
      setPersons(persons.filter(person => person.id !== selectedPerson.id))
    }
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
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )

}

export default App